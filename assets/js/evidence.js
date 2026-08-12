/* ==========================================================================
   Evidence — merkezî kanıt koleksiyonu / central evidence library

   Başvurudaki tüm kanıtlar tek bir listede tutulur (`evidence.library`).
   Her kanıt bir veya birden çok ESG standardına etiketlenebilir; ESG
   adımları kendi kanıt listelerini tutmaz, koleksiyondan etikete göre
   okurlar. Bağ bu yüzden iki yönlü çalışır:

     • Belgeler bölümünde bir kanıta standart etiketi eklemek, o kanıtı
       ilgili ESG adımında anında görünür kılar.
     • ESG adımında kanıt eklemek, kanıtı koleksiyona yazar ve o adımın
       etiketini otomatik olarak iliştirir.

   Kanıt kaydı:
     { id, name, url, file: {name,size,data}, note, tags: ["3.1", …] }

   `tags` içindeki OTHER değeri "tasnif dışı" anlamına gelir: kanıt
   koleksiyonda durur ama hiçbir ESG standardına bağlanmaz.
   ========================================================================== */

window.Evidence = (function () {
  "use strict";

  var KEY = "evidence.library";
  var OTHER = "other";

  function S() {
    return window.Store;
  }

  /** Koleksiyonun tamamı. Her zaman dizi döner. */
  function all() {
    var v = S().get(KEY);
    return Array.isArray(v) ? v : [];
  }

  function save(list) {
    S().set(KEY, list);
  }

  /** Çakışmayan kimlik üretir; mevcut kayıtların en büyüğünden devam eder. */
  function nextId(list) {
    var max = 0;
    list.forEach(function (it) {
      var m = /^EV-(\d+)$/.exec(it.id || "");
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return "EV-" + (max + 1);
  }

  function find(id) {
    var list = all();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /** Bir standarda etiketlenmiş kanıtlar. */
  function byStandard(code) {
    return all().filter(function (it) {
      return (it.tags || []).indexOf(code) !== -1;
    });
  }

  /** Hiçbir standarda bağlanmamış kanıtlar (tasnif dışı ya da etiketsiz). */
  function unclassified() {
    return all().filter(function (it) {
      var tags = (it.tags || []).filter(function (t) {
        return t !== OTHER;
      });
      return tags.length === 0;
    });
  }

  /** Kanıt ekler ve üretilen kimliği döner. */
  function add(item) {
    var list = all().slice();
    var rec = {
      id: nextId(list),
      name: item.name || "",
      url: item.url || "",
      file: item.file || null,
      note: item.note || "",
      tags: (item.tags || []).slice(),
    };
    list.push(rec);
    save(list);
    return rec.id;
  }

  /** Var olan kanıtın alanlarını günceller. */
  function update(id, patch) {
    var list = all().slice();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id !== id) continue;
      var next = {};
      Object.keys(list[i]).forEach(function (k) {
        next[k] = list[i][k];
      });
      Object.keys(patch).forEach(function (k) {
        next[k] = patch[k];
      });
      list[i] = next;
      save(list);
      return true;
    }
    return false;
  }

  function remove(id) {
    save(all().filter(function (it) {
      return it.id !== id;
    }));
  }

  /** Standardı kanıta ekler / kanıttan çıkarır. */
  function tag(id, code) {
    var it = find(id);
    if (!it) return false;
    var tags = (it.tags || []).slice();
    if (tags.indexOf(code) === -1) tags.push(code);
    // Bir standarda bağlanan kanıt artık tasnif dışı değildir.
    if (code !== OTHER) {
      tags = tags.filter(function (t) {
        return t !== OTHER;
      });
    }
    return update(id, { tags: tags });
  }

  function untag(id, code) {
    var it = find(id);
    if (!it) return false;
    return update(id, {
      tags: (it.tags || []).filter(function (t) {
        return t !== code;
      }),
    });
  }

  /* ------------------------------------------------------------------
     Dış kaynaklar / external sources

     Formun bazı adımları kendi belge alanlarını taşır: dış değerlendirme
     raporu, ona ait ek bağlantılar ve kuruluş/tescil dokümanları. Bunlar
     ESG tasnifine girmediğinden koleksiyona kopyalanmaz — koleksiyonda
     kendi klasörleriyle *türetilerek* listelenir. Kayıt tek yerde
     durduğu için eşitleme sorunu doğmaz; kanıt hangi adımda giriliyorsa
     orada düzenlenir.
     ------------------------------------------------------------------ */
  var SOURCES = [
    {
      tag: "src.priorReview",
      label: { tr: "Dış Değerlendirme Raporu", en: "External Review Report" },
      step: { tab: "type", step: "prior-review" },
      when: hasPriorReview,
      /* Rapor tek bir kanıttır: dosya ve/veya bağlantı olarak verilir. */
      read: function (store) {
        var file = store.get("priorReview.report");
        var url = store.get("priorReview.reportUrl");
        if (!file && !url) return [];
        var agency = store.get("priorReview.agency");
        var year = store.get("priorReview.year");
        return [{
          id: "SRC-priorReview",
          name: window.I18N.pick({
            tr: "Dış değerlendirme raporu",
            en: "External review report",
          }),
          url: url || "",
          file: file || null,
          note: [agency, year].filter(Boolean).join(" · "),
        }];
      },
    },
    {
      tag: "src.extraDocs",
      label: { tr: "Ek Bağlantılar ve Belgeler", en: "Additional Links and Documents" },
      step: { tab: "type", step: "prior-review" },
      when: hasPriorReview,
      read: function (store) {
        return rowsOf(store, "priorReview.extraDocs", function (r, i) {
          return {
            id: "SRC-extraDocs-" + i,
            name: r.name || "",
            url: r.url || "",
            file: null,
            note: "",
          };
        });
      },
    },
    {
      tag: "src.legalDocs",
      label: { tr: "Kuruluş ve Tescil Dokümanları", en: "Founding and Registration Documents" },
      step: { tab: "agency", step: "legal" },
      read: function (store) {
        return rowsOf(store, "legal.documents", function (r, i) {
          return {
            id: "SRC-legalDocs-" + i,
            name: r.name || "",
            url: r.url || "",
            file: r.file || null,
            note: [r.authority, r.issuedAt].filter(Boolean).join(" · "),
          };
        });
      },
    },
  ];

  function rowsOf(store, path, map) {
    var v = store.get(path);
    return Array.isArray(v) ? v.map(map) : [];
  }

  /* "Hayır" yanıtından sonra alanlar gizlenir ama daha önce girilmiş
     değerler mağazada kalabilir; gizli adımın belgeleri listelenmemeli. */
  function hasPriorReview(store) {
    return store.get("priorReview.has") === "evet";
  }

  /** Dış kaynak klasörleri; her biri `items` ile birlikte döner. */
  function sources() {
    var store = S();
    return SOURCES.map(function (src) {
      var items = src.when && !src.when(store) ? [] : src.read(store);
      return {
        tag: src.tag,
        label: src.label,
        step: src.step,
        items: items.filter(isUsable).map(function (it) {
          it.external = src.tag;
          it.tags = [src.tag];
          return it;
        }),
      };
    });
  }

  /** Dış kaynaklardan türeyen tüm kanıtlar, tek listede. */
  function externals() {
    var out = [];
    sources().forEach(function (s) {
      out = out.concat(s.items);
    });
    return out;
  }

  function sourceLabel(tag) {
    for (var i = 0; i < SOURCES.length; i++) {
      if (SOURCES[i].tag === tag) return SOURCES[i].label;
    }
    return null;
  }

  /** Kanıt en az bir erişim yolu taşımalı: bağlantı veya dosya. */
  function isUsable(it) {
    if (!it) return false;
    if (!it.name || !String(it.name).trim()) return false;
    return !!(String(it.url || "").trim() || (it.file && it.file.name));
  }

  /**
   * Eski biçimden geçiş: kanıtlar standart başına ayrı dizilerde
   * (esg.<kod>.evidence) tutuluyordu. İçe aktarılan eski başvurular
   * sessizce kanıt kaybetmesin diye bir kez koleksiyona taşınır.
   */
  function migrateLegacy() {
    if (all().length) return 0;
    var store = S();
    var moved = 0;
    var list = [];
    var codes = [];
    ["part1", "part2", "part3"].forEach(function (part) {
      (window.ESG[part] || []).forEach(function (s) {
        codes.push(s.code);
      });
    });
    codes.forEach(function (code) {
      var rows = store.get("esg." + code + ".evidence");
      if (!Array.isArray(rows)) return;
      rows.forEach(function (r) {
        if (!r || (!r.name && !r.url)) return;
        // Aynı ad+bağlantı birden çok standartta geçiyorsa tek kayıt tutulur.
        var existing = null;
        for (var i = 0; i < list.length; i++) {
          if (list[i].name === (r.name || "") && list[i].url === (r.url || "")) {
            existing = list[i];
            break;
          }
        }
        if (existing) {
          if (existing.tags.indexOf(code) === -1) existing.tags.push(code);
          return;
        }
        list.push({
          id: "EV-" + (list.length + 1),
          name: r.name || "",
          url: r.url || "",
          file: null,
          note: r.ref || "",
          tags: [code],
        });
        moved++;
      });
    });
    if (moved) save(list);
    return moved;
  }

  return {
    OTHER: OTHER,
    all: all,
    find: find,
    byStandard: byStandard,
    unclassified: unclassified,
    sources: sources,
    externals: externals,
    sourceLabel: sourceLabel,
    add: add,
    update: update,
    remove: remove,
    tag: tag,
    untag: untag,
    isUsable: isUsable,
    migrateLegacy: migrateLegacy,
  };
})();

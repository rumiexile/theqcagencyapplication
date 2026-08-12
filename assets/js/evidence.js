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

  /** Var olan kanıdın alanlarını günceller. */
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
    add: add,
    update: update,
    remove: remove,
    tag: tag,
    untag: untag,
    isUsable: isUsable,
    migrateLegacy: migrateLegacy,
  };
})();

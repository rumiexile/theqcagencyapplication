/* ==========================================================================
   Validate — alan doğrulama ve tamamlanma hesabı
   Field validation and completion accounting
   ========================================================================== */

window.Validate = (function () {
  "use strict";

  var t = function (k, p) {
    return window.I18N.t(k, p);
  };

  /* ------------------------------------------------------------------
     Koşullu görünürlük / conditional visibility
     showIf: { field: "applicationKind", equals: "yenileme" }
     showIf: { field: "applicationKind", in: ["yenileme", "kapsam"] }
     ------------------------------------------------------------------ */
  function matches(c, store) {
    var v = store.get(c.field);
    if (c.equals !== undefined) return v === c.equals;
    if (c.in !== undefined) return c.in.indexOf(v) !== -1;
    if (c.truthy !== undefined) return !!v === !!c.truthy;
    return true;
  }

  function isVisible(field, store) {
    if (!field.showIf) return true;
    var c = field.showIf;
    // all: koşulların tamamı · any: en az biri · yoksa tek koşul
    if (c.all) {
      return c.all.every(function (x) {
        return matches(x, store);
      });
    }
    if (c.any) {
      return c.any.some(function (x) {
        return matches(x, store);
      });
    }
    return matches(c, store);
  }

  /**
   * Sekme muafiyeti / tab exemption.
   * EQAR kayıtlı bir ajans tarafından yapılmış dış değerlendirme raporu
   * sunulduğunda ESG 3 ve ESG 2 bölümleri zorunlu olmaktan çıkar.
   */
  function kosulTutar(c, store) {
    if (!c) return false;
    var v = store.get(c.field);
    if (c.equals !== undefined) return v === c.equals;
    if (c.in !== undefined) return c.in.indexOf(v) !== -1;
    return false;
  }

  function isTabExempt(tab, store) {
    return kosulTutar(tab.exemptIf, store);
  }

  /**
   * Devralınan bölüm — muafiyetten farklıdır.
   *
   * Muaf bölüm hiç istenmez ve tamamlanma toplamına girmez. Devralınan
   * bölüm ise istenir: başvurunun eksiksiz olması için verinin bulunması
   * gerekir. Fark, verinin bu başvuruda yeniden yazılmıyor olmasıdır —
   * önceki başvurudan gelir. Bu yüzden toplamdan düşülmez, yalnızca
   * kullanıcıya nereyi doldurması gerektiği söylenir.
   */
  function isTabCarriedOver(tab, store) {
    if (isTabExempt(tab, store)) return false; // muafiyet önce gelir
    return kosulTutar(tab.carriedOverIf, store);
  }

  function isEmpty(v) {
    if (v === undefined || v === null) return true;
    if (typeof v === "string") return v.trim() === "";
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === "object") return Object.keys(v).length === 0;
    return false;
  }

  /* ------------------------------------------------------------------
     Tek alan doğrulama / validate a single field
     Dönüş: null (geçerli) veya hata mesajı
     ------------------------------------------------------------------ */
  function validateField(field, store) {
    if (!isVisible(field, store)) return null;
    if (!field.id) return null;

    var v = store.get(field.id);

    /* --- "en az biri" kuralı ---------------------------------------
       requireOneOf: listelenen alanlardan en az biri dolu olmalıdır.
       Örn. kanıt ya dosya olarak ya da bağlantı olarak verilebilir. */
    if (field.requireOneOf) {
      var satisfied = field.requireOneOf.some(function (id) {
        return !isEmpty(store.get(id));
      });
      if (!satisfied) return t("validate.requireOneOf");
      if (isEmpty(v)) return null; // kural başka alandan karşılandı
    }

    /* --- bileşik alanlar --- */
    if (field.type === "repeater") {
      var rows = Array.isArray(v) ? v : [];
      var min = field.minItems || (field.required ? 1 : 0);
      if (rows.length < min) return t("validate.minItems", { n: min });
      for (var r = 0; r < rows.length; r++) {
        for (var f = 0; f < field.itemFields.length; f++) {
          var sub = field.itemFields[f];
          if (sub.required && isEmpty(rows[r][sub.id])) {
            return t("validate.required");
          }
          if (sub.minLength && rows[r][sub.id] && String(rows[r][sub.id]).trim().length < sub.minLength) {
            return t("validate.minLength", { n: sub.minLength });
          }
        }
        /* Satır düzeyinde "en az biri" kuralı — ör. her doküman ya
           dosya olarak ya da bağlantı olarak verilmelidir. */
        if (field.rowRequireOneOf) {
          var row = rows[r];
          var got = field.rowRequireOneOf.some(function (id) {
            return !isEmpty(row[id]);
          });
          if (!got) return t("validate.requireOneOf");
        }
      }
      return null;
    }

    if (field.type === "programme-picker") {
      var sel = Array.isArray(v) ? v : [];
      var m = field.minItems || (field.required ? 1 : 0);
      if (sel.length < m) return t("validate.minItems", { n: m });
      return null;
    }

    if (field.type === "checkboxes") {
      var chosen = Array.isArray(v) ? v : [];
      var need = field.minItems || (field.required ? 1 : 0);
      if (chosen.length < need) return t("validate.minItems", { n: need });
      return null;
    }

    if (field.type === "esg1-coverage") {
      if (!field.required) return null;
      var cov = v || {};
      var missing = 0;
      window.ESG.part1.forEach(function (s) {
        var row = cov[s.code.replace(".", "_")] || {};
        // Her standart için kapsama düzeyi ve yeterli uzunlukta açıklama
        if (isEmpty(row.level) || isEmpty(row.how) || String(row.how).trim().length < 100) {
          missing++;
        }
      });
      if (missing > 0) return t("validate.summary", { n: missing });
      return null;
    }

    if (field.type === "file-upload") {
      if (!field.required) return null;
      if (!v || !v.name) return t("validate.required");
      return null;
    }

    /* Kanıt koleksiyonu — Belgeler bölümü.
       Kullanılabilir kanıt: adı olan ve bağlantı ya da dosya taşıyan. */
    if (field.type === "evidence-library") {
      if (!field.required) return null;
      var lib = window.Evidence.all().filter(window.Evidence.isUsable);
      var needLib = field.minItems || 1;
      if (lib.length < needLib) return t("validate.minItems", { n: needLib });
      return null;
    }

    /* Bir ESG standardına bağlanmış kanıtlar; kaynak yine koleksiyondur. */
    if (field.type === "evidence-picker") {
      if (!field.required) return null;
      var attached = window.Evidence.byStandard(field.standard).filter(window.Evidence.isUsable);
      var needAtt = field.minItems || 1;
      if (attached.length < needAtt) return t("validate.minItems", { n: needAtt });
      return null;
    }

    if (field.type === "document-list") {
      if (!field.required) return null;
      var picked = (v && v.checked) || [];
      if (picked.length === 0) return t("validate.minItems", { n: 1 });
      return null;
    }

    /* --- basit alanlar --- */
    if (field.required && isEmpty(v)) return t("validate.required");
    if (isEmpty(v)) return null; // zorunlu değilse boş geçilebilir

    var s = String(v).trim();

    if (field.minLength && s.length < field.minLength) {
      return t("validate.minLength", { n: field.minLength });
    }
    if (field.maxLength && s.length > field.maxLength) {
      return t("validate.maxLength", { n: field.maxLength });
    }
    /* Kelime sınırı — uzun anlatım alanlarında karakter yerine kelime
       üzerinden sınır konur (ör. 6000 kelimelik faaliyet anlatımı). */
    if (field.minWords || field.maxWords) {
      var wc = s ? s.split(/\s+/).length : 0;
      if (field.minWords && wc < field.minWords) {
        return t("validate.minWords", { n: field.minWords });
      }
      if (field.maxWords && wc > field.maxWords) {
        return t("validate.maxWords", { n: field.maxWords });
      }
    }
    /* Biçim kalıbı — sicil/kimlik numaraları gibi sabit desenli alanlar için.
       Hata iletisi alanın kendi diline sahip olduğundan şemadan gelir. */
    if (field.pattern && !new RegExp(field.pattern).test(s)) {
      return field.patternMessage
        ? window.I18N.pick(field.patternMessage)
        : t("validate.pattern");
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) {
      return t("validate.email");
    }
    if (field.type === "url" && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(s)) {
      return t("validate.url");
    }
    if (field.type === "number") {
      var n = Number(s);
      if (isNaN(n)) return t("validate.number");
      if (field.min !== undefined && n < field.min) return t("validate.year");
      if (field.max !== undefined && n > field.max) return t("validate.year");
    }
    return null;
  }

  /* ------------------------------------------------------------------
     Adım / sekme doğrulama
     ------------------------------------------------------------------ */
  function validateStep(step, store) {
    var errors = {};
    step.fields.forEach(function (f) {
      var e = validateField(f, store);
      if (e) errors[f.id] = e;
    });
    return errors;
  }

  function stepErrorCount(step, store) {
    return Object.keys(validateStep(step, store)).length;
  }

  /**
   * Adım durumu:
   *  "empty"    — hiç veri girilmemiş
   *  "partial"  — kısmen dolu, hâlâ hata var
   *  "complete" — tüm zorunlu alanlar geçerli
   */
  function stepState(step, store) {
    var required = 0;
    var touched = 0;
    step.fields.forEach(function (f) {
      if (!f.id || !isVisible(f, store)) return;
      if (f.required) required++;
      if (!isEmpty(store.get(f.id))) touched++;
    });
    var errs = stepErrorCount(step, store);
    if (errs === 0 && required > 0) return "complete";
    if (errs === 0 && required === 0 && touched > 0) return "complete";
    if (errs === 0 && required === 0) return "complete";
    if (touched === 0) return "empty";
    return "partial";
  }

  /* ------------------------------------------------------------------
     Genel tamamlanma yüzdesi
     Zorunlu ve görünür alanların kaçının geçerli olduğunu ölçer.
     ------------------------------------------------------------------ */
  function progress(tabs, store) {
    var total = 0;
    var done = 0;
    tabs.forEach(function (tab) {
      if (isTabExempt(tab, store)) return; // muaf bölüm toplama girmez
      tab.steps.forEach(function (step) {
        if (!isVisible(step, store)) return; // koşulu sağlanmayan adım toplama girmez
        step.fields.forEach(function (f) {
          if (!f.id || !f.required || !isVisible(f, store)) return;
          total++;
          if (!validateField(f, store)) done++;
        });
      });
    });
    return {
      total: total,
      done: done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
      missing: total - done,
    };
  }

  function tabProgress(tab, store) {
    var total = 0;
    var done = 0;
    if (isTabExempt(tab, store)) return { total: 0, done: 0, percent: 100, exempt: true };
    tab.steps.forEach(function (step) {
      step.fields.forEach(function (f) {
        if (!f.id || !f.required || !isVisible(f, store)) return;
        total++;
        if (!validateField(f, store)) done++;
      });
    });
    return { total: total, done: done, percent: total === 0 ? 100 : Math.round((done / total) * 100) };
  }

  return {
    isVisible: isVisible,
    isTabExempt: isTabExempt,
    isTabCarriedOver: isTabCarriedOver,
    isEmpty: isEmpty,
    field: validateField,
    step: validateStep,
    stepErrorCount: stepErrorCount,
    stepState: stepState,
    progress: progress,
    tabProgress: tabProgress,
  };
})();

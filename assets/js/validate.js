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
  function isVisible(field, store) {
    if (!field.showIf) return true;
    var c = field.showIf;
    var v = store.get(c.field);
    if (c.equals !== undefined) return v === c.equals;
    if (c.in !== undefined) return c.in.indexOf(v) !== -1;
    if (c.truthy !== undefined) return !!v === !!c.truthy;
    return true;
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
        if (isEmpty(row.how)) missing++;
      });
      if (missing > 0) return t("validate.summary", { n: missing });
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
      tab.steps.forEach(function (step) {
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
    isEmpty: isEmpty,
    field: validateField,
    step: validateStep,
    stepErrorCount: stepErrorCount,
    stepState: stepState,
    progress: progress,
    tabProgress: tabProgress,
  };
})();

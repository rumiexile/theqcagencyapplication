/* ==========================================================================
   i18n — Türkçe / English
   Uygulama arayüz metinleri. İçerik metinleri (ESG standartları, program
   adları, form etiketleri) kendi veri dosyalarında {tr, en} olarak tutulur.
   ========================================================================== */

window.I18N = (function () {
  "use strict";

  var STRINGS = {
    tr: {
      "app.title": "Kalite Güvencesi Ajansı Başvuru Sistemi",
      "app.subtitle": "YÖKAK · Yetkilendirme ve Tanınma",
      "app.org": "Yükseköğretim Kalite Kurulu",

      "header.application": "Başvuru",
      "header.noType": "Başvuru türü seçilmedi",
      "header.lang": "Dil",
      "header.theme": "Tema",
      "header.themeLight": "Açık tema",
      "header.themeDark": "Koyu tema",
      "header.save": "Kaydet",
      "header.export": "Dışa aktar",
      "header.import": "İçe aktar",
      "header.reset": "Sıfırla",
      "header.print": "Yazdır",

      "save.saved": "Kaydedildi",
      "save.saving": "Kaydediliyor…",
      "save.never": "Henüz kaydedilmedi",
      "save.at": "Son kayıt",

      "nav.steps": "Adımlar",
      "nav.progress": "Tamamlanma",
      "nav.next": "Sonraki adım",
      "nav.prev": "Önceki adım",
      "nav.submit": "Başvuruyu Gönder",
      "nav.review": "Önizleme",

      "summary.title": "Başvuru Özeti",
      "summary.type": "Başvuru türü",
      "summary.agency": "Ajans",
      "summary.programmes": "Program",
      "summary.completed": "Tamamlanan",
      "summary.required": "Zorunlu alan",
      "summary.missing": "Eksik",

      "field.required": "zorunlu",
      "field.optional": "isteğe bağlı",
      "field.selectPlaceholder": "Seçiniz…",
      "field.chars": "karakter",
      "field.words": "kelime",
      "field.min": "en az",
      "field.max": "en fazla",

      "validate.required": "Bu alan zorunludur.",
      "validate.email": "Geçerli bir e-posta adresi giriniz.",
      "validate.url": "Geçerli bir adres giriniz (https:// ile başlamalı).",
      "validate.minLength": "En az {n} karakter giriniz.",
      "validate.maxLength": "En fazla {n} karakter girebilirsiniz.",
      "validate.minItems": "En az {n} kayıt eklemelisiniz.",
      "validate.number": "Geçerli bir sayı giriniz.",
      "validate.year": "Geçerli bir yıl giriniz (1900–2100).",
      "validate.summary": "{n} alan düzeltilmeli",
      "validate.requireOneOf": "Dosya veya bağlantıdan en az birini sağlayınız.",
      "validate.stepIncomplete": "Bu adımda eksik veya hatalı alanlar var.",

      "repeater.add": "Ekle",
      "repeater.remove": "Kaldır",
      "repeater.empty": "Henüz kayıt eklenmedi.",
      "repeater.item": "Kayıt",

      "programme.search": "Program ara…",
      "programme.selected": "seçili program",
      "programme.selectAll": "Tümünü seç",
      "programme.clearAll": "Temizle",
      "programme.none": "Bu alanda eşleşen program yok.",
      "programme.criteriaFor": "Programa özel ölçütler",
      "programme.generalTitle": "Genel Ölçütler",
      "programme.specificTitle": "Programa Özel Ölçütler",
      "programme.noSelection":
        "Ölçüt girebilmek için önce yukarıdan en az bir program seçiniz.",
      "programme.areaCount": "program",

      "esg.standard": "Standart",
      "esg.guidance": "Rehber ilkeler",
      "esg.practice": "Ajansın uygulaması",
      "esg.evidence": "Kanıtlar",
      "esg.compliance": "Öz değerlendirme",
      "esg.coverage": "Kapsama biçimi",
      "evidence.suggestedTitle": "Önerilen kanıtlar",
      "evidence.suggestedHint":
        "Bu standart için sunulması önerilen kanıtlar. Liste bağlayıcı değildir; bilgilendirme amaçlıdır.",
      "esg1.mappedCriteria": "Bu standarda eşlenen genel ölçütleriniz",
      "esg1.noMapped":
        "Genel ölçütlerinizden hiçbiri bu standarda eşlenmemiş. ESG 2.1 bütüncül kapsama beklediğinden, bu standardın nasıl karşılandığını aşağıda açıklamanız gerekir.",

      "review.title": "Başvuru Önizlemesi",
      "review.empty": "— boş —",
      "review.download": "JSON olarak indir",
      "review.print": "Yazdır / PDF",

      "toast.saved": "Başvuru kaydedildi.",
      "toast.exported": "Başvuru dosyası indirildi.",
      "toast.imported": "Başvuru içe aktarıldı.",
      "toast.importError": "Dosya okunamadı. Geçerli bir başvuru dosyası seçiniz.",
      "toast.reset": "Form sıfırlandı.",
      "toast.stepBlocked": "Devam etmeden önce eksik alanları tamamlayınız.",
      "toast.submitted": "Başvuru tamamlandı. Dosyayı indirip YÖKAK'a iletiniz.",

      "confirm.resetTitle": "Formu sıfırla",
      "confirm.resetBody":
        "Girilen tüm veriler silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?",
      "confirm.cancel": "Vazgeç",
      "confirm.confirm": "Evet, sıfırla",

      "exempt.badge": "Muaf",
      "exempt.title": "Bu bölüm muaf tutulmuştur",
      "exempt.body":
        "EQAR'a kayıtlı bir ajans ({agency}) tarafından yapılan dış değerlendirme raporunu sunduğunuz için bu bölümü doldurmanız zorunlu değildir. İsterseniz yine de doldurabilirsiniz; alanlar tamamlanma oranına dâhil edilmez.",

      "a11y.skip": "Ana içeriğe geç",
      "a11y.tabs": "Başvuru bölümleri",
      "a11y.steps": "Bölüm adımları",
      "a11y.remove": "Kaydı kaldır",
    },

    en: {
      "app.title": "Quality Assurance Agency Application System",
      "app.subtitle": "YÖKAK · Authorisation & Recognition",
      "app.org": "Higher Education Quality Council of Türkiye",

      "header.application": "Application",
      "header.noType": "No application type selected",
      "header.lang": "Language",
      "header.theme": "Theme",
      "header.themeLight": "Light theme",
      "header.themeDark": "Dark theme",
      "header.save": "Save",
      "header.export": "Export",
      "header.import": "Import",
      "header.reset": "Reset",
      "header.print": "Print",

      "save.saved": "Saved",
      "save.saving": "Saving…",
      "save.never": "Not saved yet",
      "save.at": "Last saved",

      "nav.steps": "Steps",
      "nav.progress": "Completion",
      "nav.next": "Next step",
      "nav.prev": "Previous step",
      "nav.submit": "Submit application",
      "nav.review": "Review",

      "summary.title": "Application summary",
      "summary.type": "Application type",
      "summary.agency": "Agency",
      "summary.programmes": "Programmes",
      "summary.completed": "Completed",
      "summary.required": "Required fields",
      "summary.missing": "Missing",

      "field.required": "required",
      "field.optional": "optional",
      "field.selectPlaceholder": "Select…",
      "field.chars": "characters",
      "field.words": "words",
      "field.min": "min",
      "field.max": "max",

      "validate.required": "This field is required.",
      "validate.email": "Enter a valid e-mail address.",
      "validate.url": "Enter a valid address (must start with https://).",
      "validate.minLength": "Enter at least {n} characters.",
      "validate.maxLength": "Enter no more than {n} characters.",
      "validate.minItems": "Add at least {n} entries.",
      "validate.number": "Enter a valid number.",
      "validate.year": "Enter a valid year (1900–2100).",
      "validate.summary": "{n} field(s) need attention",
      "validate.requireOneOf": "Provide at least a file or a link.",
      "validate.stepIncomplete": "This step has missing or invalid fields.",

      "repeater.add": "Add",
      "repeater.remove": "Remove",
      "repeater.empty": "No entries added yet.",
      "repeater.item": "Entry",

      "programme.search": "Search programmes…",
      "programme.selected": "programmes selected",
      "programme.selectAll": "Select all",
      "programme.clearAll": "Clear",
      "programme.none": "No matching programmes in this field.",
      "programme.criteriaFor": "Programme-specific criteria",
      "programme.generalTitle": "General criteria",
      "programme.specificTitle": "Programme-specific criteria",
      "programme.noSelection":
        "Select at least one programme above before entering criteria.",
      "programme.areaCount": "programmes",

      "esg.standard": "Standard",
      "esg.guidance": "Guidelines",
      "esg.practice": "The agency's practice",
      "esg.evidence": "Evidence",
      "esg.compliance": "Self-assessment",
      "esg.coverage": "How it is covered",
      "evidence.suggestedTitle": "Suggested evidence",
      "evidence.suggestedHint":
        "Evidence suggested for this standard. The list is indicative and provided for guidance only.",
      "esg1.mappedCriteria": "Your general criteria mapped to this standard",
      "esg1.noMapped":
        "None of your general criteria is mapped to this standard. As ESG 2.1 expects holistic coverage, explain below how this standard is addressed.",

      "review.title": "Application preview",
      "review.empty": "— empty —",
      "review.download": "Download as JSON",
      "review.print": "Print / PDF",

      "toast.saved": "Application saved.",
      "toast.exported": "Application file downloaded.",
      "toast.imported": "Application imported.",
      "toast.importError": "Could not read the file. Select a valid application file.",
      "toast.reset": "Form has been reset.",
      "toast.stepBlocked": "Complete the missing fields before continuing.",
      "toast.submitted":
        "Application complete. Download the file and submit it to YÖKAK.",

      "confirm.resetTitle": "Reset form",
      "confirm.resetBody":
        "All entered data will be deleted. This cannot be undone. Continue?",
      "confirm.cancel": "Cancel",
      "confirm.confirm": "Yes, reset",

      "exempt.badge": "Exempt",
      "exempt.title": "This section is exempted",
      "exempt.body":
        "Because you submitted an external review report by an EQAR-registered agency ({agency}), completing this section is not required. You may still fill it in; its fields are excluded from the completion rate.",

      "a11y.skip": "Skip to main content",
      "a11y.tabs": "Application sections",
      "a11y.steps": "Section steps",
      "a11y.remove": "Remove entry",
    },
  };

  var current = "tr";
  var listeners = [];

  return {
    get lang() {
      return current;
    },

    /** Dili ayarla / set language */
    set: function (lang) {
      if (lang !== "tr" && lang !== "en") return;
      current = lang;
      document.documentElement.lang = lang;
      listeners.forEach(function (fn) {
        fn(lang);
      });
    },

    /** Dil değişimini dinle / subscribe to language change */
    onChange: function (fn) {
      listeners.push(fn);
    },

    /** Anahtar çevir / translate a key. t('validate.minLength', {n: 50}) */
    t: function (key, params) {
      var table = STRINGS[current] || STRINGS.tr;
      var s = table[key];
      if (s === undefined) s = (STRINGS.tr[key] !== undefined ? STRINGS.tr[key] : key);
      if (params) {
        Object.keys(params).forEach(function (k) {
          s = s.replace(new RegExp("\\{" + k + "\\}", "g"), params[k]);
        });
      }
      return s;
    },

    /**
     * {tr, en} nesnesinden geçerli dildeki değeri döndürür.
     * Düz string verilirse olduğu gibi döner.
     */
    pick: function (value) {
      if (value === null || value === undefined) return "";
      if (typeof value === "string") return value;
      return value[current] !== undefined ? value[current] : value.tr || value.en || "";
    },
  };
})();

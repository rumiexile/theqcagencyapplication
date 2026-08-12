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
      "programme.allLevels": "Tümü",
      "programme.selected": "seçili program",
      "programme.selectAll": "Tümünü seç",
      "programme.clearAll": "Temizle",
      "programme.none": "Bu alanda eşleşen program yok.",
      "programme.levelEmpty":
        "Bu öğretim düzeyi için program listesi henüz tanımlanmamıştır.",
      "programme.criteriaFor": "Programa özel ölçütler",
      "programme.generalTitle": "Genel Ölçütler",
      "programme.specificTitle": "Programa Özel Ölçütler",
      "programme.noSelection":
        "Ölçüt girebilmek için önce yukarıdan en az bir program seçiniz.",
      "programme.areaCount": "program",

      "evidence.accessHint":
        "Kanıta erişilebilmesi için bağlantı veya dosyadan en az biri verilmelidir; ikisi birden de eklenebilir.",
      "evidence.accessRequired": "Bağlantı veya dosyadan en az birini sağlayınız.",
      "evidence.cancel": "Vazgeç",
      "evidence.edit": "Düzenle",
      "evidence.editTitle": "Kanıdı düzenle",
      "evidence.itemsSuffix": "kanıt",
      "evidence.newTitle": "Yeni kanıt",
      "evidence.otherFolder": "Tasnif dışı",
      "evidence.save": "Kaydet",
      "evidence.add": "Kanıt ekle",
      "evidence.addNew": "Yeni kanıt ekle",
      "evidence.addNewNote":
        "Eklediğiniz kanıt Belgeler bölümündeki koleksiyona da yazılır ve bu standarda bağlanır.",
      "evidence.addFile": "Dosya yükle",
      "evidence.clearFile": "Dosyayı kaldır",
      "evidence.createAndAttach": "Ekle ve bu standarda bağla",
      "evidence.detach": "Bu standarttan çıkar",
      "evidence.empty": "Henüz kanıt eklenmedi. Başvurunuzda kullanacağınız belgeleri buraya yükleyiniz.",
      "evidence.file": "Dosya",
      "evidence.link": "Bağlantıyı aç",
      "evidence.name": "Kanıt adı",
      "evidence.nameRequired": "Kanıt adı zorunludur.",
      "evidence.namePlaceholder": "ör. Değerlendirici Eğitim Yönergesi",
      "evidence.noAccess": "Bağlantı veya dosya eklenmedi",
      "evidence.noneForStandard": "Bu standarda henüz kanıt bağlanmadı.",
      "evidence.note": "Açıklama",
      "evidence.notePlaceholder": "ör. Md. 12, s. 4",
      "evidence.other": "Tasnif dışı",
      "evidence.otherGroup": "Sınıflandırma dışı",
      "evidence.pickFromLibrary": "Koleksiyondan seç",
      "evidence.remove": "Kanıdı sil",
      "evidence.replaceFile": "Dosyayı değiştir",
      "evidence.tagsHint":
        "Kanıdın hangi ESG standartlarını desteklediğini işaretleyiniz; kanıt o standartların adımlarına kendiliğinden yerleşir.",
      "evidence.tagsLabel": "Bu kanıt hangi standartları destekliyor?",
      "evidence.untagged": "etiketsiz",
      "evidence.url": "Bağlantı (URL)",
      "evidence.unnamed": "(adsız kanıt)",
      "evidence.migrated": "Önceki biçimdeki {n} kanıt koleksiyona taşındı.",

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

      "type.yetkilendirme": "Yetkilendirme",
      "type.taninma": "Tanınma",

      "done.title": "Başvurunuz tamamlandı",
      "done.lead":
        "Başvurunuz için bir başvuru numarası oluşturuldu. Bu numarayı saklayınız; " +
        "YÖKAK ile yapacağınız tüm yazışmalarda kullanılacaktır.",
      "done.appNo": "Başvuru numarası",
      "done.copy": "Numarayı kopyala",
      "done.copied": "Başvuru numarası kopyalandı.",
      "done.fromMis": "MİS ön başvuru kaydı: {id}",
      "done.keepNote":
        "Başvurunuz yalnızca bu tarayıcıda saklanmaktadır. Kaydınızın kaybolmaması " +
        "için başvuru örneğini dışa aktarıp güvenli bir yerde saklayınız.",
      "done.export": "Başvuru örneğini dışa aktar",
      "done.exported": "Başvuru örneği indirildi.",
      "done.email": "E-postama gönder",
      "done.emailTarget":
        "E-posta, başvuruda belirttiğiniz {email} adresine hazırlanır. " +
        "Dışa aktardığınız dosyayı e-postaya eklemeyi unutmayınız.",
      "done.close": "Kapat",
      "done.mailSubject": "YÖKAK Kalite Güvencesi Ajansı Başvurusu — {no}",
      "done.mailGreeting": "Başvurunuz tamamlanmıştır. Özeti aşağıdadır.",
      "done.mailAgency": "Kuruluş",
      "done.mailType": "Başvuru türü",
      "done.mailDate": "Tamamlanma tarihi",
      "done.mailAttachNote":
        "Not: Başvurunun tam örneğini içeren JSON dosyasını bu e-postaya ekleyiniz.",

      "mis.applied": "MİS ön başvurusundan {n} alan dolduruldu.",
      "mis.keptExisting": "{n} alan zaten dolu olduğu için korundu.",
      "mis.invalid": "MİS ön başvuru verisi okunamadı: {reason}",

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
      "programme.allLevels": "All levels",
      "programme.selected": "programmes selected",
      "programme.selectAll": "Select all",
      "programme.clearAll": "Clear",
      "programme.none": "No matching programmes in this field.",
      "programme.levelEmpty":
        "The programme list for this degree level has not been defined yet.",
      "programme.criteriaFor": "Programme-specific criteria",
      "programme.generalTitle": "General criteria",
      "programme.specificTitle": "Programme-specific criteria",
      "programme.noSelection":
        "Select at least one programme above before entering criteria.",
      "programme.areaCount": "programmes",

      "evidence.accessHint":
        "To make the evidence reachable, provide a link or a file — you may add both.",
      "evidence.accessRequired": "Provide at least a link or a file.",
      "evidence.cancel": "Cancel",
      "evidence.edit": "Edit",
      "evidence.editTitle": "Edit evidence",
      "evidence.itemsSuffix": "items",
      "evidence.newTitle": "New evidence",
      "evidence.otherFolder": "Unclassified",
      "evidence.save": "Save",
      "evidence.add": "Add evidence",
      "evidence.addNew": "Add new evidence",
      "evidence.addNewNote":
        "Anything you add is also written to the library in the Documents section and attached to this standard.",
      "evidence.addFile": "Upload file",
      "evidence.clearFile": "Remove file",
      "evidence.createAndAttach": "Add and attach to this standard",
      "evidence.detach": "Detach from this standard",
      "evidence.empty": "No evidence yet. Upload the documents you will use in your application here.",
      "evidence.file": "File",
      "evidence.link": "Open link",
      "evidence.name": "Evidence name",
      "evidence.nameRequired": "The evidence name is required.",
      "evidence.namePlaceholder": "e.g. Reviewer Training Regulation",
      "evidence.noAccess": "No link or file provided",
      "evidence.noneForStandard": "No evidence attached to this standard yet.",
      "evidence.note": "Note",
      "evidence.notePlaceholder": "e.g. Art. 12, p. 4",
      "evidence.other": "Unclassified",
      "evidence.otherGroup": "Outside the classification",
      "evidence.pickFromLibrary": "Choose from the library",
      "evidence.remove": "Delete evidence",
      "evidence.replaceFile": "Replace file",
      "evidence.tagsHint":
        "Tick the ESG standards this evidence supports; it will then appear automatically in those steps.",
      "evidence.tagsLabel": "Which standards does this evidence support?",
      "evidence.untagged": "untagged",
      "evidence.url": "Link (URL)",
      "evidence.unnamed": "(unnamed evidence)",
      "evidence.migrated": "{n} evidence items from the previous format were moved into the library.",

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

      "type.yetkilendirme": "Authorisation",
      "type.taninma": "Recognition",

      "done.title": "Your application is complete",
      "done.lead":
        "An application number has been generated. Keep it — it will be used in " +
        "all correspondence with YÖKAK.",
      "done.appNo": "Application number",
      "done.copy": "Copy the number",
      "done.copied": "Application number copied.",
      "done.fromMis": "MİS pre-application record: {id}",
      "done.keepNote":
        "Your application is stored only in this browser. Export a copy and keep " +
        "it somewhere safe so your record is not lost.",
      "done.export": "Export a copy of the application",
      "done.exported": "Copy of the application downloaded.",
      "done.email": "Send to my e-mail",
      "done.emailTarget":
        "The e-mail is prepared for {email}, the address given in your application. " +
        "Remember to attach the file you exported.",
      "done.close": "Close",
      "done.mailSubject": "YÖKAK Quality Assurance Agency Application — {no}",
      "done.mailGreeting": "Your application is complete. A summary follows.",
      "done.mailAgency": "Organisation",
      "done.mailType": "Application type",
      "done.mailDate": "Completed on",
      "done.mailAttachNote":
        "Note: attach the JSON file containing the full copy of the application to this e-mail.",

      "mis.applied": "{n} fields were filled from the MİS pre-application.",
      "mis.keptExisting": "{n} fields already had values and were kept.",
      "mis.invalid": "The MİS pre-application data could not be read: {reason}",

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

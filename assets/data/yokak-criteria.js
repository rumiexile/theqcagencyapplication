/* ==========================================================================
   YÖKAK Program Akreditasyon Ölçütleri — Ana Ölçütler
   YÖKAK Programme Accreditation Criteria — Main criteria
   --------------------------------------------------------------------------
   Kaynak: "program_akred_ölçütleri_Geri_Bildirim.xlsx",
           "Değerlendirme Ölçütleri" sayfası, "Ana ölçüt" sütunu.

   9 ana ölçüt, ESG 2027 (Draft 3) Bölüm 1'in 9 standardıyla birebir
   örtüşmektedir; `esg1` alanı bu karşılığı taşır.

   Yalnızca ana başlıklar tutulur — alt ölçütler ve göstergeler bu
   uygulamanın kapsamı dışındadır.
   ========================================================================== */

window.YOKAK_CRITERIA = (function () {
  "use strict";

  var main = [
    {
      code: "1",
      esg1: "1.1",
      name: {
        tr: "Kalite Güvencesi Politikası ve Yönetişim",
        en: "Quality Assurance Policy and Governance",
      },
    },
    {
      code: "2",
      esg1: "1.2",
      name: {
        tr: "Programın Tasarımı, Onayı, İzlenmesi ve Güncellenmesi",
        en: "Design, Approval, Monitoring and Updating of the Programme",
      },
    },
    {
      code: "3",
      esg1: "1.3",
      name: {
        tr: "Öğrenci Merkezli Öğrenme, Öğretme ve Ölçme-Değerlendirme",
        en: "Student-Centred Learning, Teaching and Assessment",
      },
    },
    {
      code: "4",
      esg1: "1.4",
      name: {
        tr: "Öğrenci Kabulü, İlerlemesi, Tanınma ve Mezuniyet",
        en: "Student Admission, Progression, Recognition and Graduation",
      },
    },
    {
      code: "5",
      esg1: "1.5",
      name: {
        tr: "Öğretim Kadrosu ve Eğitim-Öğretimi Destekleyen Personel",
        en: "Teaching Staff and Staff Supporting Education",
      },
    },
    {
      code: "6",
      esg1: "1.6",
      name: {
        tr: "Öğrenme Ortamı, Kaynaklar ve Öğrenci Desteği",
        en: "Learning Environment, Resources and Student Support",
      },
    },
    {
      code: "7",
      esg1: "1.7",
      name: {
        tr: "Bilgi Yönetimi ve Sürekli İyileştirme",
        en: "Information Management and Continuous Improvement",
      },
    },
    {
      code: "8",
      esg1: "1.8",
      name: {
        tr: "Kamuoyunu Bilgilendirme ve Şeffaflık",
        en: "Public Information and Transparency",
      },
    },
    {
      code: "9",
      esg1: "1.9",
      name: {
        tr: "Dış Kalite Güvencesi (Kurumsal ve/veya Program) ve Akreditasyon Döngüsü",
        en: "External Quality Assurance (Institutional and/or Programme) and the Accreditation Cycle",
      },
    },
  ];

  return {
    main: main,

    /** Kod ile ana ölçüt bul / find a main criterion by code */
    find: function (code) {
      for (var i = 0; i < main.length; i++) {
        if (main[i].code === String(code)) return main[i];
      }
      return null;
    },

    /** ESG 1 standardına karşılık gelen ana ölçüt / criterion for an ESG 1 code */
    byEsg1: function (esgCode) {
      for (var i = 0; i < main.length; i++) {
        if (main[i].esg1 === esgCode) return main[i];
      }
      return null;
    },

    /**
     * Seçim listesi seçenekleri. Etiket, ana ölçüt başlığını ve karşılık
     * geldiği ESG 1 standardını birlikte gösterir.
     */
    options: function () {
      return main.map(function (c) {
        return {
          value: c.code,
          label: {
            tr: c.code + ". " + c.name.tr + "  (ESG " + c.esg1 + ")",
            en: c.code + ". " + c.name.en + "  (ESG " + c.esg1 + ")",
          },
        };
      });
    },
  };
})();

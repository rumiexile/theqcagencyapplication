/* ==========================================================================
   Başvuru Formu Şeması / Application form schema
   --------------------------------------------------------------------------
   Yapı: sekme (tab) → adım (step) → alan (field)
   Tüm etiketler {tr, en} çiftidir. Yeni alan eklemek için yalnızca bu
   dosyayı düzenlemek yeterlidir; motor (app.js) şemayı okuyarak render eder.
   ========================================================================== */

window.SCHEMA = (function () {
  "use strict";

  var esg = window.ESG;

  /* ----------------------------------------------------------------------
     Yardımcılar / helpers
     ---------------------------------------------------------------------- */

  /** ESG standardı için tam adım üretir (beyan + öz değerlendirme + kanıt) */
  function esgStep(std, partLabel) {
    return {
      id: "esg" + std.code.replace(".", "_"),
      title: { tr: std.code + " " + std.title.tr, en: std.code + " " + std.title.en },
      short: { tr: std.code, en: std.code },
      eyebrow: partLabel,
      fields: [
        { type: "esg-standard", standard: std.code },
        {
          type: "textarea",
          id: "esg." + std.code + ".practice",
          large: true,
          required: true,
          minLength: 200,
          maxLength: 6000,
          label: {
            tr: "Ajansın bu standarda ilişkin uygulaması",
            en: "The agency's practice regarding this standard",
          },
          hint: {
            tr:
              "Standardın gereklerini nasıl karşıladığınızı; ilgili politika, süreç ve uygulamalarınızı somut biçimde açıklayınız. Rehber ilkelerin her birine değinmeniz beklenir.",
            en:
              "Describe concretely how you meet the requirements of the standard, referring to your policies, processes and practices. You are expected to address each of the guidelines.",
          },
        },
        {
          type: "radio",
          id: "esg." + std.code + ".compliance",
          required: true,
          label: { tr: "Öz değerlendirme", en: "Self-assessment" },
          hint: {
            tr: "Bu standarda ilişkin kendi değerlendirmenizi seçiniz.",
            en: "Select your own assessment against this standard.",
          },
          options: esg.complianceScale.map(function (c) {
            return { value: c.value, label: c.label, desc: c.desc };
          }),
        },
        {
          /* Kanıtlar merkezî koleksiyondan gelir; burada yalnızca bu
             standarda bağlanır. Bağ iki yönlüdür: Belgeler bölümünde
             etiketlenen kanıt burada da görünür. */
          type: "evidence-picker",
          id: "esg." + std.code + ".evidenceLink",
          standard: std.code,
          required: true,
          minItems: 1,
          label: { tr: "Kanıtlar", en: "Evidence" },
          hint: {
            tr:
              "Bu standardı destekleyen kanıtları Belgeler bölümündeki koleksiyondan seçiniz veya buradan ekleyiniz; eklediğiniz kanıt koleksiyona da yazılır.",
            en:
              "Select the evidence supporting this standard from the library in the Documents section, or add it here; anything you add is also written to the library.",
          },
          suggestions: window.EVIDENCE_SUGGESTIONS.forStandard(std.code),
        },
      ],
    };
  }

  /* ----------------------------------------------------------------------
     Mali Esaslar (MADDE 12) — fıkra başına "açıklama + kanıt" alanı.
     ESG standartlarında kullanılan desenin aynısıdır.
     ---------------------------------------------------------------------- */
  function maliRule(key, label, rule) {
    return [
      {
        type: "textarea",
        id: "financial." + key + ".practice",
        large: true,
        required: true,
        minLength: 100,
        maxLength: 3000,
        label: label,
        hint: {
          tr: rule.tr + " — Kuruluşunuzun bu kurala nasıl uyduğunu somut biçimde açıklayınız.",
          en: rule.en + " — Describe concretely how your organisation complies with this rule.",
        },
      },
      {
        type: "repeater",
        id: "financial." + key + ".evidence",
        required: true,
        minItems: 1,
        label: { tr: "Kanıtlar", en: "Evidence" },
        hint: {
          tr: "Beyanınızı destekleyen tarife, kurul kararı, yazışma, muhasebe kaydı veya web bağlantısını ekleyiniz.",
          en: "Add the tariff, board decision, correspondence, accounting record or web link supporting your statement.",
        },
        addLabel: { tr: "Kanıt ekle", en: "Add evidence" },
        itemFields: [
          {
            type: "text", id: "name", required: true,
            label: { tr: "Kanıt adı", en: "Evidence name" },
            placeholder: { tr: "ör. 2026 Akreditasyon Ücret Tarifesi", en: "e.g. 2026 Accreditation Fee Tariff" },
          },
          {
            type: "url", id: "url",
            label: { tr: "Bağlantı (URL)", en: "Link (URL)" },
            placeholder: { tr: "https://…", en: "https://…" },
          },
          {
            type: "text", id: "ref",
            label: { tr: "Belge / bölüm referansı", en: "Document / section reference" },
            placeholder: { tr: "ör. Md. 12, s. 4", en: "e.g. Art. 12, p. 4" },
          },
        ],
      },
    ];
  }

  var PART3_LABEL = { tr: "ESG Bölüm 3 · Kalite Güvencesi Ajansları", en: "ESG Part 3 · Quality Assurance Agencies" };
  var PART2_LABEL = { tr: "ESG Bölüm 2 · Dış Kalite Güvencesi", en: "ESG Part 2 · External Quality Assurance" };
  var PART1_LABEL = { tr: "ESG Bölüm 1 · İç Kalite Güvencesi", en: "ESG Part 1 · Internal Quality Assurance" };

  /* ----------------------------------------------------------------------
     SEKMELER / TABS
     ---------------------------------------------------------------------- */
  var tabs = [
    /* ==================== 0 — BAŞVURU TÜRÜ ============================ */
    {
      id: "type",
      label: { tr: "Başvuru Türü", en: "Application Type" },
      steps: [
        {
          id: "type-select",
          title: { tr: "Başvuru Türünün Seçilmesi", en: "Select the Application Type" },
          short: { tr: "Tür seçimi", en: "Type selection" },
          desc: {
            tr:
              "Bu başvuru sistemi yalnızca program akreditasyonu içindir. Başvurunuzun türünü seçiniz; seçiminiz, formun ilerleyen bölümlerinde sizden istenecek bilgi ve belgeleri belirler.",
            en:
              "This application system covers programme accreditation only. Select the type of your application; your choice determines the information and documents requested in the following sections.",
          },
          fields: [
            {
              type: "application-type",
              id: "applicationType",
              required: true,
              label: { tr: "Başvuru türü", en: "Application type" },
              options: [
                {
                  value: "yetkilendirme",
                  label: { tr: "Yetkilendirme", en: "Authorisation" },
                  audience: { tr: "Ulusal Ajanslar", en: "National Agencies" },
                  desc: {
                    tr:
                      "Türkiye'de yerleşik ulusal kalite güvencesi ve akreditasyon kuruluşlarının, YÖKAK tarafından yetkilendirilmek üzere yaptığı başvurudur.",
                    en:
                      "Application by national quality assurance and accreditation organisations established in Türkiye to be authorised by YÖKAK.",
                  },
                  icon: "flag",
                },
                {
                  value: "taninma",
                  label: { tr: "Tanınma", en: "Recognition" },
                  audience: { tr: "Uluslararası Ajanslar", en: "International Agencies" },
                  desc: {
                    tr:
                      "Yurt dışında yerleşik uluslararası kalite güvencesi ve akreditasyon kuruluşlarının, YÖKAK tarafından tanınmak üzere yaptığı başvurudur.",
                    en:
                      "Application by international quality assurance and accreditation organisations established abroad to be recognised by YÖKAK.",
                  },
                  icon: "globe",
                },
              ],
            },
            {
              type: "radio",
              id: "applicationKind",
              required: true,
              label: { tr: "Başvuru niteliği", en: "Nature of application" },
              options: [
                { value: "ilk", label: { tr: "İlk başvuru", en: "First application" } },
                { value: "yenileme", label: { tr: "Yenileme başvurusu", en: "Renewal application" } },
                { value: "kapsam", label: { tr: "Kapsam genişletme", en: "Scope extension" } },
              ],
            },
            {
              type: "text",
              id: "previousDecision",
              label: { tr: "Önceki YÖKAK karar tarihi ve sayısı", en: "Previous YÖKAK decision date and number" },
              placeholder: { tr: "ör. 12.03.2023 / 2023-14", en: "e.g. 12.03.2023 / 2023-14" },
              showIf: { field: "applicationKind", in: ["yenileme", "kapsam"] },
            },
          ],
        },

        /* ---- Niyet mektubu ----
           Her başvuruda istenir: yetkilendirme ve tanınma, ilk başvuru,
           yenileme ve kapsam genişletme ayrımı yapılmaz. Bu yüzden
           koşullu görünürlüğü yoktur. */
        {
          id: "intent-letter",
          title: { tr: "Niyet Mektubu", en: "Letter of Intent" },
          short: { tr: "Niyet mektubu", en: "Letter of intent" },
          desc: {
            tr:
              "Kuruluşunuzun başvuru niyetini beyan eden, imza yetkisi bulunan kişi tarafından imzalanmış niyet mektubunu yükleyiniz.",
            en:
              "Upload the letter of intent declaring your organisation's intention to apply, signed by a person authorised to sign.",
          },
          fields: [
            {
              type: "file-upload", id: "intentLetter.file", required: true, maxSizeMB: 4,
              accept: ".pdf",
              label: { tr: "Niyet mektubu (PDF)", en: "Letter of intent (PDF)" },
              hint: {
                tr:
                  "Yalnızca PDF kabul edilir. Mektup, imza yetkisi bulunan kişi tarafından imzalanmış olmalıdır.",
                en:
                  "Only PDF is accepted. The letter must be signed by a person authorised to sign.",
              },
            },
            {
              type: "text", id: "intentLetter.ref", half: true,
              label: { tr: "Resmî yazı sayısı", en: "Official letter reference number" },
              placeholder: { tr: "ör. E-12345678-000-1234", en: "e.g. E-12345678-000-1234" },
            },
            {
              type: "date", id: "intentLetter.sentAt", half: true,
              label: { tr: "Resmî yazının tarihi", en: "Date of the official letter" },
            },
          ],
        },

        /* ---- Önceki dış değerlendirme (EQAR) ---- */
        {
          id: "prior-review",
          title: { tr: "Önceki Dış Değerlendirme", en: "Previous External Review" },
          short: { tr: "Önceki değerlendirme", en: "Previous review" },
          desc: {
            tr:
              "Kuruluşunuzun daha önce ESG kapsamında, EQAR'a kayıtlı bir ajans tarafından dış değerlendirmeden geçip geçmediğini belirtiniz. Başvuru tarihi itibarıyla en az 1 yıl geçerli bir dış değerlendirme raporu sunmanız hâlinde ESG 3 ve ESG 2 bölümlerini doldurmanız gerekmez.",
            en:
              "State whether your organisation has previously undergone an external review under the ESG by an EQAR-registered agency. If you submit an external review report valid for at least one year from the date of application, you do not need to complete the ESG 3 and ESG 2 sections.",
          },
          fields: [
            {
              type: "radio",
              id: "priorReview.has",
              required: true,
              label: {
                tr:
                  "Kuruluşunuz ESG kapsamında, EQAR'a kayıtlı bir ajans tarafından dış değerlendirmeden geçti mi?",
                en:
                  "Has your organisation undergone an external review under the ESG by an EQAR-registered agency?",
              },
              options: [
                {
                  value: "evet",
                  label: { tr: "Evet", en: "Yes" },
                  desc: {
                    tr:
                      "Başvuru tarihi itibarıyla en az 1 yıl geçerli bir rapor sunulduğunda ESG 3 ve ESG 2 bölümleri muaf tutulur; yalnızca ESG 1 kapsam ve ölçüt bilgileri istenir.",
                    en:
                      "When a report valid for at least one year from the date of application is provided, the ESG 3 and ESG 2 sections are exempted; only ESG 1 scope and criteria are required.",
                  },
                },
                {
                  value: "hayir",
                  label: { tr: "Hayır", en: "No" },
                  desc: {
                    tr: "ESG 3 ve ESG 2 bölümlerinin tamamını doldurmanız gerekir.",
                    en: "You must complete the ESG 3 and ESG 2 sections in full.",
                  },
                },
              ],
            },

            { type: "text", id: "priorReview.agency", required: true, half: true, label: { tr: "Değerlendirmeyi yapan ajans", en: "Reviewing agency" }, placeholder: { tr: "ör. ENQA / EQAR kayıtlı ajans adı", en: "e.g. name of the EQAR-registered agency" }, showIf: { field: "priorReview.has", equals: "evet" } },
            { type: "number", id: "priorReview.year", required: true, half: true, min: 1900, max: 2100, label: { tr: "Değerlendirme yılı", en: "Year of the review" }, showIf: { field: "priorReview.has", equals: "evet" } },
            {
              type: "radio", id: "priorReview.outcome", required: true, half: false,
              label: { tr: "Değerlendirme sonucu", en: "Outcome of the review" },
              showIf: { field: "priorReview.has", equals: "evet" },
              options: [
                { value: "full", label: { tr: "ESG ile tam uyumlu", en: "Full compliance with the ESG" } },
                { value: "substantial", label: { tr: "Büyük ölçüde uyumlu", en: "Substantial compliance" } },
                { value: "partial", label: { tr: "Kısmen uyumlu", en: "Partial compliance" } },
              ],
            },
            { type: "text", id: "priorReview.eqarStatus", half: true, label: { tr: "EQAR tescil durumu", en: "EQAR registration status" }, placeholder: { tr: "ör. Tescilli — 2024-2029", en: "e.g. Registered — 2024-2029" }, showIf: { field: "priorReview.has", equals: "evet" } },
            { type: "date", id: "priorReview.validUntil", half: true, label: { tr: "Geçerlilik bitiş tarihi", en: "Valid until" }, showIf: { field: "priorReview.has", equals: "evet" } },

            {
              type: "file-upload", id: "priorReview.report", required: true, maxSizeMB: 4,
              accept: ".pdf,.doc,.docx",
              label: { tr: "Dış değerlendirme raporu (dosya yükleme)", en: "External review report (file upload)" },
              hint: {
                tr:
                  "Raporu PDF veya Word olarak yükleyiniz. Dosya, başvurunuzla birlikte tarayıcınızda saklanır ve dışa aktarılan JSON dosyasına gömülür.",
                en:
                  "Upload the report as PDF or Word. The file is stored with your application in your browser and embedded in the exported JSON file.",
              },
              showIf: { field: "priorReview.has", equals: "evet" },
            },
            {
              type: "url", id: "priorReview.reportUrl", required: true,
              label: { tr: "Raporun yayımlandığı adres (bağlantı)", en: "URL where the report is published (link)" },
              hint: {
                tr: "Raporun EQAR/DEQAR veya ajansın kendi sitesindeki yayımlanmış hâline bağlantı veriniz.",
                en: "Provide a link to the published report on EQAR/DEQAR or the agency's own website.",
              },
              placeholder: { tr: "https://…", en: "https://…" },
              showIf: { field: "priorReview.has", equals: "evet" },
            },
            {
              type: "repeater", id: "priorReview.extraDocs", minItems: 0,
              label: { tr: "Ek bağlantılar ve belgeler", en: "Additional links and documents" },
              hint: { tr: "İzleme raporu, karar yazısı gibi ek belgeleri ekleyebilirsiniz.", en: "You may add follow-up reports, decision letters and similar documents." },
              addLabel: { tr: "Bağlantı ekle", en: "Add link" },
              showIf: { field: "priorReview.has", equals: "evet" },
              itemFields: [
                { type: "text", id: "name", required: true, label: { tr: "Belge adı", en: "Document name" } },
                { type: "url", id: "url", required: true, label: { tr: "Bağlantı", en: "Link" } },
              ],
            },
          ],
        },
      ],
    },

    /* ==================== 1 — AJANS BİLGİLERİ ========================= */
    {
      id: "agency",
      label: { tr: "Ajans Bilgileri", en: "Agency Details" },
      /* Kapsam genişletmede kuruluşun kimliği değişmez; önceki
         başvurudan devralınır. */
      carriedOverIf: { field: "applicationKind", equals: "kapsam" },
      steps: [
        {
          id: "identity",
          title: { tr: "Kuruluş Kimlik Bilgileri", en: "Organisation Identity" },
          short: { tr: "Kimlik", en: "Identity" },
          desc: {
            tr: "Başvuru sahibi kuruluşun resmî kimlik bilgilerini giriniz.",
            en: "Enter the official identity details of the applicant organisation.",
          },
          fields: [
            { type: "text", id: "agency.nameTr", required: true, half: true, label: { tr: "Kuruluşun adı (Türkçe)", en: "Organisation name (Turkish)" } },
            { type: "text", id: "agency.nameEn", required: true, half: true, label: { tr: "Kuruluşun adı (İngilizce)", en: "Organisation name (English)" } },
            { type: "text", id: "agency.acronym", required: true, half: true, label: { tr: "Kısaltma", en: "Acronym" }, placeholder: { tr: "ör. MÜDEK", en: "e.g. MÜDEK" } },
            { type: "number", id: "agency.foundedYear", required: true, half: true, min: 1900, max: 2100, label: { tr: "Kuruluş yılı", en: "Year of establishment" } },
            { type: "text", id: "agency.country", required: true, half: true, label: { tr: "Ülke", en: "Country" }, showIf: { field: "applicationType", equals: "taninma" } },
            {
              type: "select", id: "agency.legalForm", required: true, half: true,
              label: { tr: "Hukuki statü / tüzel kişilik türü", en: "Legal form / type of legal entity" },
              options: [
                { value: "dernek", label: { tr: "Dernek (Kâr Amacı Gütmeyen)", en: "Association (Non-profit)" } },
                { value: "vakif", label: { tr: "Vakıf (Kâr Amacı Gütmeyen)", en: "Foundation (Non-profit)" } },
                { value: "diger", label: { tr: "Diğer", en: "Other" } },
              ],
            },
            {
              type: "text", id: "agency.legalFormOther", required: true, half: true,
              label: { tr: "Hukuki statü (belirtiniz)", en: "Legal form (please specify)" },
              placeholder: { tr: "ör. Kamu tüzel kişisi", en: "e.g. Public body" },
              showIf: { field: "agency.legalForm", equals: "diger" },
            },
            { type: "url", id: "agency.website", required: true, half: true, label: { tr: "Web sitesi", en: "Website" }, placeholder: { tr: "https://…", en: "https://…" } },

            /* --- Ulusal sicil numaraları (yalnızca yetkilendirme başvurusunda,
                   hukuki statüye göre) --------------------------------------- */
            {
              type: "text", id: "agency.registryDernek", required: true, half: true,
              label: { tr: "Dernek Kütük Numarası", en: "Association Registry Number" },
              showIf: {
                all: [
                  { field: "applicationType", equals: "yetkilendirme" },
                  { field: "agency.legalForm", equals: "dernek" },
                ],
              },
            },
            {
              type: "text", id: "agency.registryVakif", required: true, half: true,
              label: { tr: "Vakıf Sicil Numarası", en: "Foundation Registry Number" },
              showIf: {
                all: [
                  { field: "applicationType", equals: "yetkilendirme" },
                  { field: "agency.legalForm", equals: "vakif" },
                ],
              },
            },
            {
              type: "text", id: "agency.registryTicaret", required: true, half: true,
              label: { tr: "Ticaret Sicil Gazetesi Numarası", en: "Trade Registry Gazette Number" },
              showIf: {
                all: [
                  { field: "applicationType", equals: "yetkilendirme" },
                  { field: "agency.legalForm", equals: "diger" },
                ],
              },
            },
            /* MERSİS numarası hukuki statüden bağımsız olarak her
               yetkilendirme başvurusunda istenir. */
            {
              type: "text", id: "agency.mersis", required: true, half: true,
              maxLength: 16, inputmode: "numeric",
              pattern: "^[0-9]{16}$",
              patternMessage: {
                tr: "MERSİS numarası 16 haneli ve yalnızca rakamlardan oluşmalıdır.",
                en: "The MERSIS number must be exactly 16 digits.",
              },
              label: {
                tr: "MERSİS No (Merkezi Sicil Kayıt Sistemi Numarası)",
                en: "MERSIS No (Central Registry Record System Number)",
              },
              /* Biçim kuralı yer tutan bir ipucu yerine, yalnızca hata
                 durumunda görünen iletiyle anlatılır. */
              placeholder: { tr: "16 haneli numara", en: "16-digit number" },
              showIf: { field: "applicationType", equals: "yetkilendirme" },
            },

            { type: "text", id: "agency.taxNo", half: true, label: { tr: "Vergi kimlik numarası", en: "Tax identification number" } },
            /* Misyon bildirimi ve yayım adresi ESG 3.1 bölümünde istendiğinden
               kimlik adımından çıkarılmıştır. */
            {
              type: "repeater", id: "agency.networks", minItems: 0,
              label: {
                tr: "Ajansın üye olduğu ağlar ve çatı kuruluşlar",
                en: "Networks and umbrella organisations the agency is a member of",
              },
              hint: {
                tr:
                  "Üyesi olduğunuz ulusal ve uluslararası kalite güvencesi ağlarını ve çatı kuruluşlarını ekleyiniz. Her üyelik için üyeliği doğrulayan bir bağlantı vermeniz gerekir.",
                en:
                  "Add the national and international quality assurance networks and umbrella organisations you belong to. A link evidencing each membership is required.",
              },
              addLabel: { tr: "Üyelik ekle", en: "Add membership" },
              itemFields: [
                {
                  type: "text", id: "name", required: true,
                  label: { tr: "Ağ / çatı kuruluş adı", en: "Network / umbrella organisation" },
                  placeholder: { tr: "ör. ENQA, INQAAHE, ECA, CEENQA, APQN", en: "e.g. ENQA, INQAAHE, ECA, CEENQA, APQN" },
                },
                {
                  type: "select", id: "membership",
                  label: { tr: "Üyelik türü", en: "Type of membership" },
                  options: [
                    { value: "tam", label: { tr: "Tam üye", en: "Full member" } },
                    { value: "aday", label: { tr: "Aday üye", en: "Candidate member" } },
                    { value: "ortak", label: { tr: "Ortak / iştirakçi üye", en: "Affiliate member" } },
                    { value: "gozlemci", label: { tr: "Gözlemci", en: "Observer" } },
                  ],
                },
                {
                  type: "number", id: "since", min: 1900, max: 2100,
                  label: { tr: "Üyelik başlangıç yılı", en: "Member since (year)" },
                },
                {
                  type: "url", id: "evidenceUrl", required: true,
                  label: { tr: "Kanıt bağlantısı", en: "Evidence link" },
                  placeholder: { tr: "https://…", en: "https://…" },
                },
              ],
            },
          ],
        },
        {
          id: "contact",
          title: { tr: "İletişim ve Yetkili Kişi", en: "Contact and Authorised Person" },
          short: { tr: "İletişim", en: "Contact" },
          desc: {
            tr: "Başvuru sürecinde YÖKAK ile iletişimi yürütecek yetkili kişinin bilgilerini giriniz.",
            en: "Enter details of the person authorised to communicate with YÖKAK during the application process.",
          },
          fields: [
            { type: "textarea", id: "contact.address", required: true, label: { tr: "Yazışma adresi", en: "Correspondence address" } },
            { type: "text", id: "contact.headName", required: true, half: true, label: { tr: "Kuruluş başkanı / yöneticisi", en: "Head of the organisation" } },
            { type: "text", id: "contact.headTitle", required: true, half: true, label: { tr: "Unvanı", en: "Title" } },
            { type: "text", id: "contact.personName", required: true, half: true, label: { tr: "Başvuru yetkilisi", en: "Application contact person" } },
            { type: "text", id: "contact.personTitle", required: true, half: true, label: { tr: "Görevi", en: "Position" } },
            { type: "email", id: "contact.email", required: true, half: true, label: { tr: "E-posta", en: "E-mail" } },
            { type: "tel", id: "contact.phone", required: true, half: true, label: { tr: "Telefon", en: "Telephone" } },
            {
              type: "email", id: "contact.kep", required: true, half: true,
              label: {
                tr: "Kayıtlı Elektronik Posta (KEP) Adresi",
                en: "Registered Electronic Mail (KEP) Address",
              },
              hint: {
                tr: "Resmî tebligatlar bu adrese yapılır.",
                en: "Official notifications are served to this address.",
              },
              placeholder: { tr: "kurum@hs01.kep.tr", en: "organisation@hs01.kep.tr" },
              showIf: { field: "applicationType", equals: "yetkilendirme" },
            },
          ],
        },
        {
          id: "legal",
          title: { tr: "Yasal Dayanak ve Statü", en: "Legal Basis and Status" },
          short: { tr: "Yasal statü", en: "Legal status" },
          desc: {
            tr: "Kuruluşunuzun yasal dayanağını ve resmî statüsünü belgeleyiniz.",
            en: "Document the legal basis and official status of your organisation.",
          },
          fields: [
            {
              type: "textarea", id: "legal.basis", required: true, minLength: 100, maxLength: 3000,
              label: { tr: "Yasal dayanak", en: "Legal basis" },
              hint: { tr: "Kuruluşunuzun dayandığı mevzuat, tüzük veya kuruluş senedini açıklayınız.", en: "Describe the legislation, statute or founding charter your organisation is based on." },
            },
            /* Yasal dayanağı belgeleyen resmî evrak. Kanıt koleksiyonu ESG
               tasnifine göre kurulduğundan, tüzel kişilik evrakı burada
               adımın kendi listesinde tutulur. */
            {
              type: "repeater", id: "legal.documents", required: true, minItems: 1,
              label: { tr: "Kuruluş ve tescil dokümanları", en: "Founding and registration documents" },
              hint: {
                tr:
                  "Kanunen yetkilendirilmiş otoritelerce verilen resmî kuruluş ve tescil dokümanlarını ekleyiniz.",
                en:
                  "Add the official founding and registration documents issued by legally authorised authorities.",
              },
              addLabel: { tr: "Doküman ekle", en: "Add document" },
              itemFields: [
                {
                  type: "text", id: "name", required: true,
                  label: { tr: "Doküman adı", en: "Document name" },
                  placeholder: {
                    tr: "ör. Dernek Kuruluş Bildirimi",
                    en: "e.g. Certificate of Incorporation",
                  },
                },
                {
                  type: "text", id: "authority", required: true,
                  label: { tr: "Belgeyi veren otorite", en: "Issuing authority" },
                  placeholder: {
                    tr: "ör. İçişleri Bakanlığı Sivil Toplumla İlişkiler Genel Müdürlüğü",
                    en: "e.g. Ministry of the Interior",
                  },
                },
                {
                  type: "date", id: "issuedAt",
                  label: { tr: "Düzenlenme tarihi", en: "Date of issue" },
                },
                {
                  type: "file", id: "file",
                  label: { tr: "Doküman dosyası", en: "Document file" },
                },
                {
                  type: "url", id: "url",
                  label: { tr: "Bağlantı (URL)", en: "Link (URL)" },
                  placeholder: { tr: "https://…", en: "https://…" },
                },
              ],
              rowRequireOneOf: ["file", "url"],
            },
            {
              type: "repeater", id: "legal.recognitions", minItems: 0,
              label: { tr: "Tescil ve resmî tanınma durumları", en: "Registrations and official recognitions" },
              hint: {
                tr:
                  "EQAR tescili ve yetkili otoritelerce verilen resmî tanınma durumlarınızı ekleyiniz. Ağ ve çatı kuruluş üyelikleri için Kimlik adımındaki alanı kullanınız.",
                en:
                  "Add your EQAR registration and official recognitions granted by competent authorities. Use the field in the Identity step for network and umbrella memberships.",
              },
              addLabel: { tr: "Kayıt ekle", en: "Add entry" },
              itemFields: [
                { type: "text", id: "body", required: true, label: { tr: "Kuruluş / sicil", en: "Body / register" }, placeholder: { tr: "ör. EQAR", en: "e.g. EQAR" } },
                { type: "text", id: "status", required: true, label: { tr: "Statü", en: "Status" }, placeholder: { tr: "ör. Tescilli üye", en: "e.g. Registered" } },
                { type: "number", id: "since", min: 1900, max: 2100, label: { tr: "Başlangıç yılı", en: "Since (year)" } },
                { type: "url", id: "url", label: { tr: "Bağlantı", en: "Link" } },
              ],
            },
            {
              type: "textarea", id: "legal.turkeyOperations", minLength: 0, maxLength: 3000,
              label: { tr: "Türkiye'deki faaliyetleriniz", en: "Your activities in Türkiye" },
              hint: { tr: "Türkiye'de daha önce yürüttüğünüz değerlendirme/akreditasyon faaliyetlerini özetleyiniz.", en: "Summarise evaluation/accreditation activities you have previously carried out in Türkiye." },
              showIf: { field: "applicationType", equals: "taninma" },
            },
          ],
        },
        {
          id: "governance",
          title: { tr: "Yönetişim, Organlar ve Kaynaklar", en: "Governance, Bodies and Resources" },
          short: { tr: "Yönetişim", en: "Governance" },
          desc: {
            tr: "Karar alma organlarınızı, insan kaynağınızı ve mali yapınızı tanımlayınız.",
            en: "Describe your decision-making bodies, human resources and financial structure.",
          },
          fields: [
            {
              type: "repeater", id: "gov.bodies", required: true, minItems: 1,
              label: { tr: "Karar alma organları", en: "Decision-making bodies" },
              hint: { tr: "Yönetim kurulu, akreditasyon kurulu, itiraz kurulu gibi organlarınızı ve paydaş bileşimini belirtiniz.", en: "List bodies such as the board, accreditation commission and appeals committee, with their stakeholder composition." },
              addLabel: { tr: "Organ ekle", en: "Add body" },
              itemFields: [
                { type: "text", id: "name", required: true, label: { tr: "Organın adı", en: "Name of the body" } },
                { type: "text", id: "role", required: true, label: { tr: "Görev ve yetkileri", en: "Role and powers" } },
                { type: "number", id: "members", min: 1, label: { tr: "Üye sayısı", en: "Number of members" } },
                { type: "text", id: "stakeholders", label: { tr: "Paydaş temsili", en: "Stakeholder representation" }, placeholder: { tr: "ör. 2 öğrenci, 1 işveren", en: "e.g. 2 students, 1 employer" } },
              ],
            },
            { type: "number", id: "hr.fullTime", required: true, half: true, min: 0, label: { tr: "Tam zamanlı personel sayısı", en: "Number of full-time staff" } },
            { type: "number", id: "hr.partTime", half: true, min: 0, label: { tr: "Yarı zamanlı personel sayısı", en: "Number of part-time staff" } },
            { type: "number", id: "hr.reviewers", required: true, half: true, min: 0, label: { tr: "Akran değerlendirici havuzu (kişi)", en: "Peer reviewer pool (persons)" } },
            { type: "number", id: "hr.studentReviewers", half: true, min: 0, label: { tr: "Öğrenci değerlendirici sayısı", en: "Number of student reviewers" } },
            {
              type: "textarea", id: "finance.structure", required: true, minLength: 100, maxLength: 3000,
              label: { tr: "Mali yapı ve gelir kaynakları", en: "Financial structure and sources of income" },
              hint: { tr: "ESG 3.4 gereği kaynaklarınızın yeterliliğini ve sürdürülebilirliğini açıklayınız.", en: "Per ESG 3.4, explain the adequacy and sustainability of your resources." },
            },
          ],
        },
      ],
    },

    /* ==================== 2 — BELGELER ================================ */
    {
      id: "evidence",
      label: { tr: "Belgeler", en: "Documents" },
      carriedOverIf: { field: "applicationKind", equals: "kapsam" },
      steps: [
        {
          id: "evidence-library",
          title: { tr: "Kanıt Koleksiyonu", en: "Evidence Library" },
          short: { tr: "Kanıtlar", en: "Evidence" },
          desc: {
            tr:
              "Başvurunuzda kullanacağınız tüm kanıtları burada toplayınız. Her kanıt bir bağlantı, yüklenmiş bir dosya ya da her ikisi olabilir. Kanıta ESG standardı etiketi verdiğinizde, kanıt ilgili ESG adımına kendiliğinden yerleşir.",
            en:
              "Collect here all the evidence you will use in your application. Each item may be a link, an uploaded file, or both. Tagging an item with an ESG standard places it automatically in the corresponding ESG step.",
          },
          fields: [
            {
              type: "evidence-library", id: "evidence.library", required: true, minItems: 1,
              label: { tr: "Kanıtlar", en: "Evidence" },
              hint: {
                tr: "Kanıt adı zorunludur; ayrıca bağlantı veya dosyadan en az biri verilmelidir.",
                en: "The evidence name is required; you must also provide either a link or a file.",
              },
            },
          ],
        },
      ],
    },

    /* ==================== 3 — ÖZ DEĞERLENDİRME ======================== */
    /* Öz değerlendirme raporunun (ÖDR) ESG standartlarından önce gelen
       giriş bölümleri: raporun nasıl üretildiği ve ajansın kendisi. ESG
       adımları bunların üzerine kurulduğundan bölüm ESG 3'ten önce yer
       alır. */
    {
      id: "self-assessment",
      label: { tr: "Öz Değerlendirme", en: "Self-Assessment" },
      steps: [
        {
          id: "sar-introduction",
          title: { tr: "Giriş", en: "Introduction" },
          short: { tr: "Giriş", en: "Introduction" },
          desc: {
            tr:
              "Öz değerlendirme raporunun giriş bölümünü yazınız: başvurunun amacı, raporun kapsamı ve raporun nasıl kurgulandığı.",
            en:
              "Write the introduction to the self-assessment report: the purpose of the application, the scope of the report and how the report is structured.",
          },
          fields: [
            {
              type: "textarea",
              id: "sar.introduction",
              large: true,
              required: true,
              minLength: 200,
              maxLength: 6000,
              label: { tr: "Giriş", en: "Introduction" },
            },
          ],
        },
        {
          id: "sar-development",
          title: {
            tr: "Öz Değerlendirme Raporunun (ÖDR) Hazırlanması",
            en: "Development of the self-assessment report (SAR)",
          },
          short: { tr: "ÖDR'nin hazırlanması", en: "Development of the SAR" },
          desc: {
            tr:
              "Ajansın öz değerlendirme raporunu geliştirmek ve üretmek için kullandığı yöntemleri açıklayınız (ekibin görevlendirilmesi, paydaşların sürece katılımı, zaman çizelgesi vb.).",
            en:
              "Describe the means the agency has used to develop and produce the SAR (appointment of a team, involvement of stakeholders, timeline etc.).",
          },
          fields: [
            {
              type: "textarea",
              id: "sar.development",
              large: true,
              required: true,
              minLength: 200,
              maxLength: 6000,
              label: {
                tr: "Raporun hazırlanma yöntemi",
                en: "How the report was developed",
              },
            },
          ],
        },
        {
          id: "sar-profile",
          title: {
            tr: "Ajansın Tarihçesi, Profili ve Faaliyetleri",
            en: "History, profile and activities of the agency",
          },
          short: { tr: "Tarihçe, profil ve faaliyetler", en: "History, profile and activities" },
          desc: {
            tr:
              "Ajansın tarihçesini, profilini ve kalite güvencesi faaliyetleri dâhil olmak üzere tüm faaliyetlerini; ilgili olduğu ölçüde ulusal bağlamdaki konumunu ve statüsünü ve ulusal gerekliliklere uygunluğunu açıklayınız. Varsa ajansın uluslararası (sınır ötesi) dış kalite güvencesi faaliyetlerine ilişkin bilgi vermeyi ihmal etmeyiniz. Son olarak, ajansın profilinin anlaşılması bakımından gerekli olduğu ölçüde ajansın uluslararası faaliyetlere katılımını kısaca tanıtınız (ör. yurt dışındaki ilişkileri, uluslararası ağlara üyeliği, uluslararası projelerde yer alması ve bu proje çalışmalarının ajansın genel stratejisiyle nasıl bağdaştığı).",
            en:
              "Describe the history, profile and all activities of the agency (including its quality assurance activities) as well as the agency's position and status in the national context (where relevant) and its compliance with the national requirements. Make sure to provide information on the agency's international (cross-border) external QA activities, if applicable. Finally, briefly introduce the agency's engagement in international activities, to the extent relevant for understanding the agency's profile (e.g., external relations abroad, membership in international networks, involvement in international projects and how such project work fits the agency's overall strategy).",
          },
          fields: [
            {
              type: "textarea",
              id: "sar.profile",
              large: true,
              required: true,
              minLength: 300,
              maxLength: 12000,
              label: {
                tr: "Tarihçe, profil ve faaliyetler",
                en: "History, profile and activities",
              },
              hint: {
                tr:
                  "Ajansın kalite güvencesi faaliyetleri bu bölümde özet biçimde sunulmalı; ağırlıklı olarak her bir faaliyetin amaç ve hedefleri ile bu faaliyetlerin ajansın profiliyle nasıl bağdaştığı ele alınmalıdır.",
                en:
                  "The agency's quality assurance activities should be presented in this chapter in a brief manner, elaborating primarily on the aims and objectives of each activity and how these activities fit the agency's profile.",
              },
            },
          ],
        },
      ],
    },

    /* ==================== 4 — ESG 3 =================================== */
    {
      id: "esg3",
      label: { tr: "ESG 3", en: "ESG 3" },
      sublabel: { tr: "Kalite Güvencesi Ajansları", en: "Quality Assurance Agencies" },
      intro: PART3_LABEL,
      /* EQAR kayıtlı ajans tarafından yapılmış geçerli bir dış değerlendirme
         raporu sunulduysa bu bölüm muaf tutulur. */
      exemptIf: { field: "priorReview.has", equals: "evet" },
      carriedOverIf: { field: "applicationKind", equals: "kapsam" },
      steps: esg.part3.map(function (s) {
        return esgStep(s, PART3_LABEL);
      }),
    },

    /* ==================== 5 — ESG 2 =================================== */
    {
      id: "esg2",
      label: { tr: "ESG 2", en: "ESG 2" },
      sublabel: { tr: "Dış Kalite Güvencesi", en: "External Quality Assurance" },
      intro: PART2_LABEL,
      exemptIf: { field: "priorReview.has", equals: "evet" },
      carriedOverIf: { field: "applicationKind", equals: "kapsam" },
      steps: esg.part2.map(function (s) {
        return esgStep(s, PART2_LABEL);
      }),
    },

    /* ==================== 6 — ESG 1: KAPSAM VE ÖLÇÜTLER ============== */
    {
      id: "esg1",
      label: { tr: "ESG 1", en: "ESG 1" },
      sublabel: { tr: "Kapsam ve Ölçütler", en: "Scope and Criteria" },
      intro: PART1_LABEL,
      steps: [
        {
          id: "scope",
          title: { tr: "Akreditasyon Kapsamı — Program Seçimi", en: "Scope of Accreditation — Programme Selection" },
          short: { tr: "Program seçimi", en: "Programme selection" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "Yetkilendirilmek/tanınmak istediğiniz programları seçiniz. Seçtiğiniz programlar, sonraki adımlarda ölçüt tanımlamanız için kullanılacaktır.",
            en:
              "Select the programmes for which you seek authorisation/recognition. The programmes you select will be used to define criteria in the following steps.",
          },
          fields: [
            { type: "programme-picker", id: "scope.programmes", required: true, minItems: 1, label: { tr: "Akredite edilmek istenen programlar", en: "Programmes to be accredited" } },
          ],
        },
        {
          id: "general-criteria",
          title: { tr: "Genel Ölçütler", en: "General Criteria" },
          short: { tr: "Genel ölçütler", en: "General criteria" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "Yetkilendirilmek istediğiniz programların tamamında kullandığınız genel ölçütleri tanımlayınız. Bu ölçütler, seçtiğiniz bütün programlar için geçerlidir.",
            en:
              "Define the general criteria you apply across all programmes for which you seek authorisation. These criteria apply to every programme you selected.",
          },
          fields: [
            {
              type: "repeater", id: "criteria.general", required: true, minItems: 1,
              label: { tr: "Genel ölçütler", en: "General criteria" },
              hint: { tr: "Her bir genel ölçütü ayrı kayıt olarak ekleyiniz.", en: "Add each general criterion as a separate entry." },
              addLabel: { tr: "Genel ölçüt ekle", en: "Add general criterion" },
              itemFields: [
                { type: "text", id: "code", required: true, label: { tr: "Ölçüt no", en: "Criterion no." }, placeholder: { tr: "ör. 1", en: "e.g. 1" } },
                { type: "text", id: "title", required: true, label: { tr: "Ölçüt başlığı", en: "Criterion title" }, placeholder: { tr: "ör. Öğrenciler", en: "e.g. Students" } },
                { type: "textarea", id: "desc", required: true, minLength: 50, label: { tr: "Ölçüt tanımı", en: "Criterion description" } },
                {
                  type: "select", id: "esgLink", required: true,
                  label: {
                    tr: "İlişkili YÖKAK Program Akreditasyon Ölçütü (ESG 1)",
                    en: "Related YÖKAK Programme Accreditation Criterion (ESG 1)",
                  },
                  options: window.YOKAK_CRITERIA.options(),
                },
              ],
            },
            { type: "url", id: "criteria.generalUrl", label: { tr: "Genel ölçütlerin yayımlandığı adres", en: "URL where the general criteria are published" }, placeholder: { tr: "https://…", en: "https://…" } },
          ],
        },
        {
          id: "specific-criteria",
          title: { tr: "Programa Özel Ölçütler", en: "Programme-Specific Criteria" },
          short: { tr: "Özel ölçütler", en: "Specific criteria" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "Seçtiğiniz her program için, genel ölçütlere ek olarak uyguladığınız programa özel ölçütleri giriniz. Özel ölçüt uygulamadığınız programlar için bu alanı boş bırakabilirsiniz.",
            en:
              "For each selected programme, enter the programme-specific criteria you apply in addition to the general criteria. You may leave this blank for programmes with no specific criteria.",
          },
          fields: [
            { type: "programme-criteria", id: "criteria.specific", label: { tr: "Programa özel ölçütler", en: "Programme-specific criteria" } },
          ],
        },
        {
          id: "esg1-coverage",
          title: { tr: "Ölçütlerin ESG 1 Uyumu", en: "ESG 1 Compliance of the Criteria" },
          short: { tr: "Ölçütlerin ESG 1 uyumu", en: "ESG 1 compliance" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "ESG 2.1 gereği, ajansın dış değerlendirmede kullandığı ölçütlerin ESG Bölüm 1'in tüm standartlarını bütüncül biçimde nasıl kapsadığını her standart için açıklayınız.",
            en:
              "Per ESG 2.1, explain for each standard how the criteria the agency uses in external evaluation cover all standards of ESG Part 1 holistically.",
          },
          fields: [{ type: "esg1-coverage", id: "esg1.coverage", required: true }],
        },
        {
          id: "decision-system",
          title: { tr: "Karar Sistemi", en: "Decision System" },
          short: { tr: "Karar sistemi", en: "Decision system" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "Değerlendirme sonucunda verdiğiniz akreditasyon karar türlerini tanımlayınız. Her karar türü için geçerlilik süresini ve hangi durumda verildiğini belirtiniz.",
            en:
              "Define the accreditation decision types you issue as a result of an evaluation. For each type, state its period of validity and the conditions under which it is granted.",
          },
          fields: [
            {
              type: "repeater", id: "decision.types", required: true, minItems: 1,
              label: { tr: "Akreditasyon karar türleri", en: "Accreditation decision types" },
              hint: {
                tr:
                  "Her karar türünü ayrı kayıt olarak ekleyiniz. Süre tanımlanmayan karar türleri (ör. ret) için süre alanını boş bırakabilirsiniz.",
                en:
                  "Add each decision type as a separate entry. Leave the period blank for types without one (e.g. refusal).",
              },
              addLabel: { tr: "Karar türü ekle", en: "Add decision type" },
              itemFields: [
                {
                  type: "text", id: "name", required: true,
                  label: { tr: "Karar türünün adı", en: "Name of the decision type" },
                  placeholder: {
                    tr: "ör. Tam Akreditasyon, Koşullu Akreditasyon",
                    en: "e.g. Full Accreditation, Conditional Accreditation",
                  },
                },
                {
                  type: "select", id: "outcome", required: true,
                  label: { tr: "Karar niteliği", en: "Nature of the decision" },
                  options: [
                    { value: "olumlu", label: { tr: "Olumlu — akreditasyon verilir", en: "Positive — accreditation granted" } },
                    { value: "kosullu", label: { tr: "Koşullu — şartlı akreditasyon", en: "Conditional — accreditation with conditions" } },
                    { value: "olumsuz", label: { tr: "Olumsuz — akreditasyon verilmez", en: "Negative — accreditation refused" } },
                  ],
                },
                {
                  type: "number", id: "durationValue", min: 0, max: 100,
                  label: { tr: "Geçerlilik süresi", en: "Period of validity" },
                  placeholder: { tr: "ör. 5", en: "e.g. 5" },
                },
                {
                  type: "select", id: "durationUnit",
                  label: { tr: "Süre birimi", en: "Unit of the period" },
                  options: [
                    { value: "yil", label: { tr: "Yıl", en: "Years" } },
                    { value: "ay", label: { tr: "Ay", en: "Months" } },
                  ],
                },
                {
                  type: "textarea", id: "conditions", required: true, minLength: 40,
                  label: { tr: "Hangi durumda verilir?", en: "When is it granted?" },
                  placeholder: {
                    tr: "Bu kararın verilmesi için sağlanması gereken koşulları açıklayınız.",
                    en: "Describe the conditions that must be met for this decision.",
                  },
                },
              ],
            },
            {
              type: "file-upload", id: "decision.evidenceFile", required: true, maxSizeMB: 4,
              accept: ".pdf,.doc,.docx",
              requireOneOf: ["decision.evidenceFile", "decision.evidenceUrl"],
              label: { tr: "Karar sistemi belgesi (dosya)", en: "Decision system document (file)" },
              hint: {
                tr:
                  "Karar türlerini ve sürelerini tanımlayan yönerge veya el kitabını yükleyiniz. Dosya veya aşağıdaki bağlantıdan en az birini sağlamanız gerekir.",
                en:
                  "Upload the regulation or handbook defining the decision types and their periods. You must provide either this file or the link below.",
              },
            },
            {
              type: "url", id: "decision.evidenceUrl",
              label: { tr: "Karar sisteminin yayımlandığı adres (bağlantı)", en: "URL where the decision system is published (link)" },
              hint: {
                tr: "ESG 2.6 gereği karar ölçütlerinin yayımlanmış olması beklenir.",
                en: "Per ESG 2.6, the criteria for outcomes are expected to be published.",
              },
              placeholder: { tr: "https://…", en: "https://…" },
            },
            {
              type: "repeater", id: "decision.extraEvidence", minItems: 0,
              label: { tr: "Ek kanıtlar", en: "Additional evidence" },
              hint: {
                tr: "Örnek karar yazıları, karar kurulu tutanakları gibi ek kanıtları bağlantı olarak ekleyebilirsiniz.",
                en: "You may add further evidence as links, such as sample decision letters or minutes of the decision-making body.",
              },
              addLabel: { tr: "Kanıt ekle", en: "Add evidence" },
              itemFields: [
                { type: "text", id: "name", required: true, label: { tr: "Kanıt adı", en: "Evidence name" } },
                { type: "url", id: "url", required: true, label: { tr: "Bağlantı", en: "Link" } },
              ],
            },
          ],
        },
      ],
    },

    /* ============= 7 — SONUÇ, BEYANLAR VE GÖNDERİM ==================== */
    {
      id: "submit",
      label: { tr: "Sonuç, Beyanlar ve Gönderim", en: "Outcome, Declarations & Submission" },
      steps: [
        {
          /* Yalnızca yenileme başvurularında istenir: bir önceki
             değerlendirmenin gelişmeye açık yönlerine karşılık hangi
             faaliyetlerin yürütüldüğünün hesabı. İlk başvuruda önceki bir
             değerlendirme, kapsam genişletmede ise yeniden değerlendirilen
             bir dönem bulunmadığından bu adım gösterilmez. */
          id: "prior-improvements",
          showIf: { field: "applicationKind", equals: "yenileme" },
          title: {
            tr: "Önceki Değerlendirmede Verilen Gelişmeye Açık Yönlere Yönelik Faaliyetler",
            en: "Activities Addressing the Areas for Improvement Identified in the Previous Evaluation",
          },
          short: { tr: "Gelişmeye açık yönler", en: "Areas for improvement" },
          desc: {
            tr:
              "Kuruluşunuzun bir önceki yetkilendirme veya tanınma değerlendirmesinde belirlenen gelişmeye açık yönlerin her biri için, tescil/tanınma süresi boyunca yürüttüğünüz faaliyetleri ve ulaştığınız sonuçları anlatınız.",
            en:
              "For each area for improvement identified in your organisation's previous authorisation or recognition evaluation, describe the activities you carried out during the registration/recognition period and the results you achieved.",
          },
          fields: [
            {
              type: "textarea",
              id: "priorImprovements.narrative",
              large: true,
              required: true,
              maxWords: 6000,
              label: {
                tr: "Gelişmeye açık yönlere yönelik faaliyetler",
                en: "Activities addressing the areas for improvement",
              },
              hint: {
                tr:
                  "Gelişmeye açık yönleri bir önceki Kurul kararında yer aldıkları sırayla ele alınız. Her biri için yürütülen faaliyeti, faaliyetin tarihini, sorumlusunu ve ulaşılan sonucu belirtiniz; sonucu gösteren kanıtlara Belgeler bölümündeki adlarıyla atıf yapınız. En fazla 6000 kelime.",
                en:
                  "Address the areas for improvement in the order in which they appear in the previous Board decision. For each, state the activity carried out, its date, the person responsible and the result achieved; refer to the evidence demonstrating the result by the names used in the Documents section. Maximum 6000 words.",
              },
            },
          ],
        },
        {
          id: "declaration",
          title: { tr: "Taahhüt ve Beyan", en: "Undertaking and Declaration" },
          short: { tr: "Beyan", en: "Declaration" },
          desc: {
            tr: "Başvurunuzu tamamlamak için aşağıdaki beyanları onaylayınız.",
            en: "Confirm the declarations below to complete your application.",
          },
          fields: [
            {
              type: "checkboxes", id: "declaration.items", required: true, minItems: 7,
              label: { tr: "Beyanlar", en: "Declarations" },
              options: [
                { value: "accurate", label: { tr: "Başvuruda verilen tüm bilgilerin doğru ve eksiksiz olduğunu beyan ederim.", en: "I declare that all information given in this application is accurate and complete." } },
                { value: "esg", label: { tr: "Kuruluşumuzun YÖKAK Dış Değerlendirme ve Akreditasyon Kuruluşlarının Yetkilendirilmesi, Tanınması ve İzlenmesine İlişkin Kılavuz ile uyumlu biçimde faaliyet gösterdiğini beyan ederim.", en: "I declare that our organisation operates in compliance with the YÖKAK Guidelines on the Authorisation, Recognition and Monitoring of External Review and Accreditation Bodies." } },
                { value: "legislation", label: { tr: "Akreditasyon ölçütlerini belirlerken ve uygularken başta 2547 sayılı Yükseköğretim Kanunu olmak üzere yürürlükteki tüm üst mevzuata uyacağımızı, mevzuata aykırı ölçüt belirlemeyeceğimizi ve uygulamayacağımızı; yükseköğretim üst kuruluşlarının belirlediği normlara uygunluk bulunması hâlinde bu gerekçeyle akreditasyonun reddine karar vermeyeceğimizi taahhüt ederim.", en: "I undertake that, in setting and applying accreditation criteria, we will comply with all higher-level legislation in force, primarily Higher Education Law No. 2547; that we will neither set nor apply criteria contrary to legislation; and that, where conformity with the norms established by the higher education supreme bodies exists, we will not refuse accreditation on that ground." } },
                { value: "evidence", label: { tr: "Beyan edilen tüm kanıtların YÖKAK tarafından incelenebileceğini kabul ederim.", en: "I accept that all declared evidence may be examined by YÖKAK." } },
                { value: "monitoring", label: { tr: "Yetkilendirme/tanınma sonrası izleme süreçlerine katılmayı taahhüt ederim.", en: "I undertake to participate in monitoring processes following authorisation/recognition." } },
                { value: "notify", label: { tr: "Kuruluşumuzun statüsündeki değişiklikleri YÖKAK'a bildirmeyi taahhüt ederim.", en: "I undertake to notify YÖKAK of any change in our organisation's status." } },
                { value: "notifyMethodology", label: { tr: "Kuruluşumuzun kullandığı ölçüt ve metodolojik değişiklikleri YÖKAK'a bildirmeyi taahhüt ederim.", en: "I undertake to notify YÖKAK of changes to the criteria and methodology our organisation uses." } },
              ],
            },
            { type: "text", id: "declaration.signerName", required: true, half: true, label: { tr: "Beyanı yapan (ad soyad)", en: "Declared by (full name)" } },
            { type: "text", id: "declaration.signerTitle", required: true, half: true, label: { tr: "Unvan", en: "Title" } },
            { type: "date", id: "declaration.date", required: true, half: true, label: { tr: "Tarih", en: "Date" } },
          ],
        },
        {
          id: "financial-declaration",
          /* Mali Esaslar yalnızca ulusal kuruluşların yetkilendirilmesinde
             uygulanır; tanınma başvurularında bu bölüm istenmez. */
          showIf: { field: "applicationType", equals: "yetkilendirme" },
          title: { tr: "Mali Beyanlar", en: "Financial Declarations" },
          short: { tr: "Mali Beyanlar", en: "Financial" },
          desc: {
            tr:
              "Mali Esaslar (MADDE 12) kapsamındaki yükümlülüklere nasıl uyduğunuzu kanıtlarıyla birlikte açıklayınız. Maddenin yedinci fıkrası izleme giderlerinin Kurul bütçesinden karşılanmasını düzenlediğinden kuruluşa yükümlülük doğurmaz; bu nedenle ayrıca beyan istenmemektedir.",
            en:
              "Explain, with evidence, how you comply with the obligations under the Financial Principles (Article 12). Paragraph seven of the article places no obligation on the organisation, as monitoring costs are met from the Board's budget; no declaration is therefore requested for it.",
          },
          fields: [].concat(
            maliRule("tariff",
              { tr: "MADDE 12/(1) — Ücret tarifesinin Kurula bildirilmesi ve onaylanması", en: "Article 12(1) — Notification and approval of the fee tariff" },
              {
                tr: "Kuruluşlar, program akreditasyonunda bir program için uygulayacakları akreditasyon ücret tarifesini, her yıl aralık ayının sonuna kadar gerekçeli maliyet raporlarıyla birlikte Kurula bildirmek zorundadır. Kurulun onayından sonra akreditasyon ücret tarifesi geçerlilik kazanır. Kurul tarafından onaylanmayan veya fahiş fiyat artışı içerdiği tespit edilen tarifeler uygulanamaz. Kurul, gerekli gördüğü durumlarda ücret tarifesinin revize edilmesini isteyebilir.",
                en: "Organisations must notify the Board, by the end of December each year, of the accreditation fee tariff they will apply for a programme, together with justified cost reports. The accreditation fee tariff takes effect after the Board's approval. Tariffs that are not approved by the Board, or that are found to contain excessive price increases, cannot be applied. The Board may request that the fee tariff be revised where it deems necessary.",
              }),
            maliRule("single",
              { tr: "MADDE 12/(2) — Ülke genelinde tek ücret tarifesi", en: "Article 12(2) — A single fee tariff nationwide" },
              {
                tr: "Her bir Kuruluş için kabul edilmiş akreditasyon ücret tarifesi, ülkemiz sınırları içerisinde tektir. Farklı coğrafi bölge, şehir ya da yükseköğretim kurumu gibi nedenlerle farklı ücret tarifeleri uygulanamaz.",
                en: "The accreditation fee tariff accepted for each organisation is single within the borders of our country. Different fee tariffs cannot be applied on grounds such as geographical region, city or higher education institution.",
              }),
            maliRule("publish",
              { tr: "MADDE 12/(3) — Ücret tarifesinin web sitesinde yayımlanması", en: "Article 12(3) — Publication of the fee tariff on the website" },
              {
                tr: "Kuruluş, kendi web sitesinde, Kurul da kendi web sitesinde kabul edilen ücret tarifelerini yayımlar.",
                en: "The organisation publishes the accepted fee tariffs on its own website, as does the Board on its own website.",
              }),
            [
              {
                type: "url", id: "financial.publish.url", required: true,
                label: { tr: "Ücret tarifesinin yayımlandığı sayfa", en: "Page where the fee tariff is published" },
                hint: {
                  tr: "Kabul edilen tarifenin kuruluşunuzun web sitesinde yayımlandığı sayfanın adresini yazınız.",
                  en: "Give the address of the page on your organisation's website where the accepted tariff is published.",
                },
                placeholder: { tr: "https://…", en: "https://…" },
              },
            ],
            maliRule("noextra",
              { tr: "MADDE 12/(4) — Tarife dışında ek mali talepte bulunulmaması", en: "Article 12(4) — No additional financial demands beyond the tariff" },
              {
                tr: "Kuruluş, Kurul tarafından kabul edilen ve web sitelerinde yayımlanan ücret tarifeleri dışında yükseköğretim kurumundan ara değerlendirme, konaklama, ulaşım, yemek, dosya masrafı, hızlı değerlendirme payı, danışmanlık ücreti veya basılı belge bedeli gibi adlar altında hiçbir ekstra mali talepte bulunamaz.",
                en: "Beyond the fee tariffs accepted by the Board and published on the websites, the organisation may make no additional financial demand on a higher education institution under names such as interim evaluation, accommodation, travel, meals, file costs, expedited evaluation share, consultancy fee or printed document charge.",
              }),
            maliRule("refund",
              { tr: "MADDE 12/(5) — Askıya alma ve iptal hâlinde ücret iadesi", en: "Article 12(5) — Refunds upon suspension or cancellation" },
              {
                tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi askıya alınan kuruluş, akreditasyon kabul kararı verilmemiş ve değerlendirme süreci devam eden programlar için tahsil ettiği akreditasyon ücretini, yükseköğretim kurumunun talebi hâlinde otuz gün içinde iade eder ve süreç sonlandırılır. Ücreti talep edilmeyen programların akreditasyon süreci askıya alma süresinin sonunda devam eder; bu durumda tahsil edilen ücretin askıya alma süresi kadar yasal faizi yükseköğretim kurumuna ödenir. Belgenin iptali hâlinde tahsil edilen akreditasyon ücreti, iptal kararının kuruluşa tebliğ tarihini takip eden yedi gün içinde iade edilir.",
                en: "An organisation whose Quality Evaluation Registration Certificate or Quality Evaluation Recognition Certificate is suspended shall, upon the request of the higher education institution, refund within thirty days the accreditation fee collected for programmes for which no accreditation decision has been taken and whose evaluation is ongoing, and the process is terminated. For programmes whose fee is not reclaimed, the accreditation process resumes at the end of the suspension period; in that case statutory interest for the duration of the suspension is paid to the higher education institution. Where the certificate is cancelled, the accreditation fee collected is refunded within seven days following notification of the cancellation decision to the organisation.",
              }),
            maliRule("boardfee",
              { tr: "MADDE 12/(6) — Tescil/Tanınma Bedelinin ocak ayında yatırılması", en: "Article 12(6) — Payment of the Registration/Recognition Fee in January" },
              {
                tr: "Her Bağımsız Dış Değerlendirme ve Akreditasyon Kuruluşu, kabul edilmiş bir ücret tarifesi kadar bedeli, yetkilendirme tescil, tanınma ve izleme faaliyetleri sebebiyle her yılın ocak ayı içerisinde Tescil/Tanınma Bedeli olarak Kurul banka hesabına yatırmakla yükümlüdür.",
                en: "Every Independent External Evaluation and Accreditation Organisation is obliged to pay into the Board's bank account, during January each year, an amount equal to one accepted fee tariff as the Registration/Recognition Fee, in respect of authorisation registration, recognition and monitoring activities.",
              })
          ),
        },
        {
          id: "review",
          title: { tr: "Önizleme ve Gönderim", en: "Preview and Submission" },
          short: { tr: "Önizleme", en: "Preview" },
          desc: {
            tr: "Başvurunuzu gözden geçiriniz. Eksik alanlar kırmızı olarak işaretlenmiştir.",
            en: "Review your application. Missing fields are marked in red.",
          },
          fields: [{ type: "review", id: "review" }],
        },
      ],
    },
  ];

  return { tabs: tabs };
})();

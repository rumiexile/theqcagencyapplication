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
          type: "repeater",
          id: "esg." + std.code + ".evidence",
          required: true,
          minItems: 1,
          label: { tr: "Kanıtlar", en: "Evidence" },
          hint: {
            tr:
              "Beyanınızı destekleyen belge, yönerge, rapor veya web bağlantılarını ekleyiniz.",
            en:
              "Add documents, regulations, reports or web links supporting your statement.",
          },
          addLabel: { tr: "Kanıt ekle", en: "Add evidence" },
          itemFields: [
            {
              type: "text",
              id: "name",
              required: true,
              label: { tr: "Kanıt adı", en: "Evidence name" },
              placeholder: {
                tr: "ör. Değerlendirici Eğitim Yönergesi",
                en: "e.g. Reviewer Training Regulation",
              },
            },
            {
              type: "url",
              id: "url",
              label: { tr: "Bağlantı (URL)", en: "Link (URL)" },
              placeholder: { tr: "https://…", en: "https://…" },
            },
            {
              type: "text",
              id: "ref",
              label: { tr: "Belge / bölüm referansı", en: "Document / section reference" },
              placeholder: { tr: "ör. Md. 12, s. 4", en: "e.g. Art. 12, p. 4" },
            },
          ],
        },
      ],
    };
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

        /* ---- Önceki dış değerlendirme (EQAR) ---- */
        {
          id: "prior-review",
          title: { tr: "Önceki Dış Değerlendirme", en: "Previous External Review" },
          short: { tr: "Önceki değerlendirme", en: "Previous review" },
          desc: {
            tr:
              "Kuruluşunuzun daha önce ESG kapsamında, EQAR'a kayıtlı bir ajans tarafından dış değerlendirmeden geçip geçmediğini belirtiniz. Geçerli bir dış değerlendirme raporu sunmanız hâlinde ESG 3 ve ESG 2 bölümlerini doldurmanız gerekmez.",
            en:
              "State whether your organisation has previously undergone an external review under the ESG by an EQAR-registered agency. If you submit a valid external review report, you do not need to complete the ESG 3 and ESG 2 sections.",
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
                      "Rapor sunulduğunda ESG 3 ve ESG 2 bölümleri muaf tutulur; yalnızca ESG 1 kapsam ve ölçüt bilgileri istenir.",
                    en:
                      "When the report is provided, the ESG 3 and ESG 2 sections are exempted; only ESG 1 scope and criteria are required.",
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
            { type: "text", id: "agency.taxNo", half: true, label: { tr: "Vergi kimlik / tescil numarası", en: "Tax ID / registration number" } },
            {
              type: "textarea", id: "agency.mission", required: true, minLength: 100, maxLength: 2500,
              label: { tr: "Misyon bildirimi", en: "Mission statement" },
              hint: { tr: "ESG 3.1 gereği kamuya açık misyon bildiriminizi ve buradaki amaç ve hedeflerinizi belirtiniz.", en: "Per ESG 3.1, state your publicly available mission statement and the goals and objectives it contains." },
            },
            { type: "url", id: "agency.missionUrl", label: { tr: "Misyon bildiriminin yayımlandığı adres", en: "URL where the mission statement is published" }, placeholder: { tr: "https://…", en: "https://…" } },
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
            {
              type: "repeater", id: "legal.recognitions", minItems: 0,
              label: { tr: "Üyelik, tescil ve tanınma durumları", en: "Memberships, registrations and recognitions" },
              hint: { tr: "ENQA üyeliği, EQAR tescili ve diğer uluslararası tanınma durumlarınızı ekleyiniz.", en: "Add ENQA membership, EQAR registration and other international recognitions." },
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

    /* ==================== 2 — ESG 3 =================================== */
    {
      id: "esg3",
      label: { tr: "ESG 3", en: "ESG 3" },
      sublabel: { tr: "Kalite Güvencesi Ajansları", en: "Quality Assurance Agencies" },
      intro: PART3_LABEL,
      /* EQAR kayıtlı ajans tarafından yapılmış geçerli bir dış değerlendirme
         raporu sunulduysa bu bölüm muaf tutulur. */
      exemptIf: { field: "priorReview.has", equals: "evet" },
      steps: esg.part3.map(function (s) {
        return esgStep(s, PART3_LABEL);
      }),
    },

    /* ==================== 3 — ESG 2 =================================== */
    {
      id: "esg2",
      label: { tr: "ESG 2", en: "ESG 2" },
      sublabel: { tr: "Dış Kalite Güvencesi", en: "External Quality Assurance" },
      intro: PART2_LABEL,
      exemptIf: { field: "priorReview.has", equals: "evet" },
      steps: esg.part2.map(function (s) {
        return esgStep(s, PART2_LABEL);
      }),
    },

    /* ==================== 4 — ESG 1: KAPSAM VE ÖLÇÜTLER ============== */
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
              "Yetkilendirilmek/tanınmak istediğiniz lisans programlarını seçiniz. Seçtiğiniz programlar, sonraki adımlarda ölçüt tanımlamanız için kullanılacaktır.",
            en:
              "Select the undergraduate programmes for which you seek authorisation/recognition. The programmes you select will be used to define criteria in the following steps.",
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
                { type: "text", id: "esgLink", label: { tr: "İlişkili ESG 1 standardı", en: "Related ESG 1 standard" }, placeholder: { tr: "ör. 1.4", en: "e.g. 1.4" } },
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
          title: { tr: "ESG 1 Standartlarının Kapsanması", en: "Coverage of the ESG 1 Standards" },
          short: { tr: "ESG 1 kapsama", en: "ESG 1 coverage" },
          eyebrow: PART1_LABEL,
          desc: {
            tr:
              "ESG 2.1 gereği, dış kalite güvencesi süreçlerinizin ESG Bölüm 1'in tüm standartlarını bütüncül biçimde nasıl kapsadığını her standart için açıklayınız.",
            en:
              "Per ESG 2.1, explain for each standard how your external quality assurance processes cover all standards of ESG Part 1 holistically.",
          },
          fields: [{ type: "esg1-coverage", id: "esg1.coverage", required: true }],
        },
      ],
    },

    /* ==================== 5 — KANITLAR =============================== */
    {
      id: "evidence",
      label: { tr: "Belgeler", en: "Documents" },
      steps: [
        {
          id: "documents",
          title: { tr: "Zorunlu Belgeler", en: "Mandatory Documents" },
          short: { tr: "Zorunlu belgeler", en: "Mandatory" },
          desc: {
            tr: "Başvuru dosyanıza eklenmesi zorunlu belgeleri işaretleyiniz ve erişim bilgisini giriniz.",
            en: "Tick the documents that must accompany your application and provide access information.",
          },
          fields: [
            {
              type: "document-list", id: "docs.mandatory", required: true,
              label: { tr: "Zorunlu belgeler", en: "Mandatory documents" },
              documents: [
                { id: "statute", label: { tr: "Kuruluş senedi / tüzük", en: "Founding charter / statute" } },
                { id: "orgchart", label: { tr: "Organizasyon şeması", en: "Organisation chart" } },
                { id: "methodology", label: { tr: "Değerlendirme yöntemi / süreç el kitabı", en: "Evaluation methodology / process handbook" } },
                { id: "criteria", label: { tr: "Ölçütler dokümanı", en: "Criteria document" } },
                { id: "reviewerGuide", label: { tr: "Değerlendirici kılavuzu ve eğitim planı", en: "Reviewer guide and training plan" } },
                { id: "appeals", label: { tr: "İtiraz ve şikâyet yönergesi", en: "Appeals and complaints regulation" } },
                { id: "coi", label: { tr: "Çıkar çatışması politikası", en: "Conflict of interest policy" } },
                { id: "iqa", label: { tr: "İç kalite güvencesi el kitabı", en: "Internal quality assurance handbook" } },
                { id: "financial", label: { tr: "Son yıla ait mali tablo", en: "Financial statement for the last year" } },
                { id: "sampleReport", label: { tr: "Örnek değerlendirme raporu", en: "Sample review report" } },
                { id: "externalReview", label: { tr: "Son dış değerlendirme raporu (ESG 3.6)", en: "Latest external review report (ESG 3.6)" } },
                { id: "activityReport", label: { tr: "Yıllık faaliyet raporu", en: "Annual activity report" } },
              ],
            },
            {
              type: "repeater", id: "docs.additional", minItems: 0,
              label: { tr: "Ek destekleyici belgeler", en: "Additional supporting documents" },
              addLabel: { tr: "Belge ekle", en: "Add document" },
              itemFields: [
                { type: "text", id: "name", required: true, label: { tr: "Belge adı", en: "Document name" } },
                { type: "url", id: "url", label: { tr: "Bağlantı", en: "Link" } },
                { type: "text", id: "note", label: { tr: "Açıklama", en: "Note" } },
              ],
            },
          ],
        },
      ],
    },

    /* ==================== 6 — BEYAN VE GÖNDERİM ====================== */
    {
      id: "submit",
      label: { tr: "Beyan ve Gönderim", en: "Declaration & Submission" },
      steps: [
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
              type: "checkboxes", id: "declaration.items", required: true, minItems: 4,
              label: { tr: "Beyanlar", en: "Declarations" },
              options: [
                { value: "accurate", label: { tr: "Başvuruda verilen tüm bilgilerin doğru ve eksiksiz olduğunu beyan ederim.", en: "I declare that all information given in this application is accurate and complete." } },
                { value: "esg", label: { tr: "Kuruluşumuzun ESG 2027 (Draft 3) ile uyumlu biçimde faaliyet gösterdiğini beyan ederim.", en: "I declare that our organisation operates in compliance with ESG 2027 (Draft 3)." } },
                { value: "evidence", label: { tr: "Beyan edilen tüm kanıtların YÖKAK tarafından incelenebileceğini kabul ederim.", en: "I accept that all declared evidence may be examined by YÖKAK." } },
                { value: "monitoring", label: { tr: "Yetkilendirme/tanınma sonrası izleme süreçlerine katılmayı taahhüt ederim.", en: "I undertake to participate in monitoring processes following authorisation/recognition." } },
                { value: "notify", label: { tr: "Kuruluşumuzun statüsündeki değişiklikleri YÖKAK'a bildirmeyi taahhüt ederim.", en: "I undertake to notify YÖKAK of any change in our organisation's status." } },
              ],
            },
            { type: "text", id: "declaration.signerName", required: true, half: true, label: { tr: "Beyanı yapan (ad soyad)", en: "Declared by (full name)" } },
            { type: "text", id: "declaration.signerTitle", required: true, half: true, label: { tr: "Unvan", en: "Title" } },
            { type: "date", id: "declaration.date", required: true, half: true, label: { tr: "Tarih", en: "Date" } },
          ],
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

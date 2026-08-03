/* ==========================================================================
   Önerilen Kanıtlar — ESG standartlarına göre
   Suggested evidence, mapped to the ESG standards
   --------------------------------------------------------------------------
   Kaynak: YÖKAK dış değerlendirme ve akreditasyon kuruluşlarının
   yetkilendirilmesine ilişkin ölçütlerde sayılan kanıtlar.

   Yetkilendirme ölçütleri (1–7) ile ESG 2027 Draft 3 standartları arasındaki
   eşleme:

     1  Misyon, kurumsal yapı, katılımcılık ....... ESG 3.1
        Ölçütler, ölçütler rehberi, güvenilirlik .. ESG 2.6
        Eğitim ve gelişim ......................... ESG 2.4
        Açıklık ve şeffaflık ...................... ESG 2.5
        İtiraz süreçleri .......................... ESG 2.7
        Çıkar çatışması, arşivleme ................ ESG 3.5 / 2.3
     2  Yasal dayanak ve mali yapı ................ ESG 3.4
     3  Bağımsızlık ............................... ESG 3.2
     4  Genel değerlendirme raporları ............. ESG 3.3
     5  İnsan kaynağı ve altyapı .................. ESG 3.4
     6  İç kalite güvencesi, etik, geri besleme ... ESG 3.5
     7  Dış değerlendirme ......................... ESG 3.6

   Bu liste bağlayıcı değildir; başvurana yol göstermek içindir.
   ========================================================================== */

window.EVIDENCE_SUGGESTIONS = (function () {
  "use strict";

  function e(tr, en) {
    return { tr: tr, en: en };
  }

  var byStandard = {
    /* ---------------- ESG Bölüm 3 — Kalite Güvencesi Ajansları ---------- */
    "3.1": [
      e("Kuruluşa ait mevzuat", "The organisation's own regulations"),
      e("Kuruluşun misyon, vizyon ve stratejik hedefleri", "Mission, vision and strategic goals of the organisation"),
      e(
        "En üst mevzuatta dış kalite güvencesi ve program akreditasyonu faaliyetlerinin yer aldığını gösteren kanıt",
        "Evidence that external quality assurance and programme accreditation appear in the founding regulation"
      ),
      e("Organizasyon şeması ile kurul ve komisyon yapıları", "Organisation chart, boards and committees"),
      e(
        "Faaliyet gösterilecek alanlarda stratejik paydaşların görüşlerinin alındığını gösteren kanıtlar",
        "Evidence that strategic stakeholders were consulted in the fields of activity"
      ),
      e(
        "Kuruluşun yapılarında paydaşların geniş temsiliyetinin sağlandığına dair kanıtlar",
        "Evidence of broad stakeholder representation in the organisation's structures"
      ),
      e(
        "Uluslararası iş birliği çalışmalarına ilişkin kanıtlar",
        "Evidence of international cooperation activities"
      ),
    ],

    "3.2": [
      e(
        "Yasal otorite tarafından kuruluşun aktif olarak faaliyet gösterdiğini kanıtlayan belgeler",
        "Documents from the competent authority evidencing that the organisation is actively operating"
      ),
      e(
        "Akreditasyon kurulunun en üst mevzuatta bir organ olarak yer aldığını gösteren kanıt",
        "Evidence that the accreditation board is established as a body in the founding regulation"
      ),
      e(
        "Akreditasyon kurulunun kararlarını bağımsız aldığını gösteren kanıtlar",
        "Evidence that the accreditation board takes its decisions independently"
      ),
      e(
        "Değerlendiricilerin görevlendirilmesinin üçüncü taraflardan bağımsız yapıldığını gösteren kanıtlar",
        "Evidence that reviewers are appointed independently of third parties"
      ),
      e("Çıkar çatışması ve çakışması politikası", "Conflict of interest policy"),
    ],

    "3.3": [
      e(
        "Değerlendirme alanları hakkında en geç iki yılda bir hazırlanan ve yayımlanan genel değerlendirme raporları",
        "General evaluation reports on the fields of review, prepared and published at least every two years"
      ),
      e(
        "İyi uygulama örnekleri ile yapısal sorunlara (mevzuat, sistem, insan kaynağı) ilişkin analizler",
        "Analyses of good practice and structural issues (regulation, system, human resources)"
      ),
      e(
        "Yükseköğretim kurumlarına yönelik eğitim ve çalıştaylara ilişkin bilgiler",
        "Information on training and workshops for higher education institutions"
      ),
    ],

    "3.4": [
      e("Kuruluşun ticari faaliyet kayıtları", "Records of the organisation's commercial activity"),
      e(
        "İktisadi işletme olarak kurulduğunu gösteren kanıtlar, gelir-gider tablosu, güncel vergi levhası, ticaret sicil kaydı",
        "Evidence of establishment as an economic enterprise, income-expenditure statement, current tax certificate, trade registry record"
      ),
      e(
        "Dernekler Dairesi Başkanlığı'na kaydı (dernekler için)",
        "Registration with the Department of Associations (for associations)"
      ),
      e(
        "Gelir kaynaklarının beyanı ve bu kaynaklara ilişkin kanıtlar (yıllara göre gelir-gider akımları ve dağılımları)",
        "Declaration of income sources with supporting evidence (income and expenditure flows by year)"
      ),
      e(
        "Ücretlendirme politikası ve akreditasyon bedellerine ilişkin belgeler",
        "Fee policy and documents on accreditation charges"
      ),
      e(
        "Büro, personel, bilgi ve iletişim teknolojileri ile altyapı imkânlarını kanıtlayan belgeler (kira sözleşmesi, tapu, hizmet sözleşmeleri, yazılım lisansları)",
        "Documents evidencing office, staff, ICT and infrastructure (lease, title deed, service contracts, software licences)"
      ),
      e(
        "Personele mahsus iş sözleşmeleri ve personelin özgeçmişleri — ilk tescil başvurusunda iş sözleşmesi aranmaz",
        "Staff employment contracts and CVs — contracts are not required for a first registration application"
      ),
    ],

    "3.5": [
      e("Kuruluşun kalite politikası", "The organisation's quality policy"),
      e(
        "İç kalite güvence sisteminin varlığına ilişkin kanıtlar",
        "Evidence of an internal quality assurance system"
      ),
      e("Kuruluşun etik kuralları", "The organisation's code of ethics"),
      e(
        "Değerlendirme sonuçları ve eğitimler kapsamında geri bildirim alınmasına ve iyileştirme yapılmasına ilişkin kanıtlar",
        "Evidence of feedback collection and resulting improvements across review outcomes and training"
      ),
      e(
        "Çıkar çatışmalarını ve çakışmalarını önlemeye yönelik tedbirler",
        "Measures preventing conflicts of interest"
      ),
      e("Arşivleme yönergesi", "Archiving regulation"),
      e(
        "Personelin yetkinliğini gösteren kanıtlar",
        "Evidence of staff competence"
      ),
    ],

    "3.6": [
      e("Dış değerlendirme sürecine ilişkin bilgi ve belgeler", "Information and documents on the external review process"),
      e(
        "Önceki dış değerlendirme raporu ve sonuçlarının nasıl ele alındığına ilişkin kanıtlar",
        "Previous external review report and evidence of how its outcomes were addressed"
      ),
    ],

    /* ---------------- ESG Bölüm 2 — Dış Kalite Güvencesi --------------- */
    "2.1": [
      e("Genel değerlendirme ölçütleri", "General evaluation criteria"),
      e("Ölçütler rehberi", "Criteria guide"),
      e(
        "Kurumun ve/veya programın iç değerlendirme raporları",
        "Internal evaluation reports of the institution and/or programme"
      ),
      e(
        "Ölçütlerin ESG Bölüm 1 standartlarını kapsadığını gösteren eşleştirme",
        "Mapping showing that the criteria cover the ESG Part 1 standards"
      ),
    ],

    "2.2": [
      e("Değerlendirme süreçlerine ilişkin mevzuat ve kılavuzlar", "Regulations and guides on the evaluation processes"),
      e("Kuruluşun değerlendirme kılavuzu", "The organisation's evaluation handbook"),
      e(
        "Yöntem tasarımına paydaşların katıldığını gösteren kanıtlar",
        "Evidence of stakeholder involvement in designing the methodology"
      ),
      e(
        "Yöntemin yasal ve düzenleyici bağlamı dikkate aldığını gösteren kanıtlar",
        "Evidence that the methodology takes the legal and regulatory context into account"
      ),
    ],

    "2.3": [
      e(
        "Kurumun ve/veya programın saha ziyaret raporları",
        "Site visit reports of the institution and/or programme"
      ),
      e(
        "Kurumun ve/veya programın iç değerlendirme raporları",
        "Internal evaluation reports of the institution and/or programme"
      ),
      e(
        "Değerlendirme raporlarına istinaden yapılan kapsamlı değişiklikler, alınan kararlar ve yazışmalar",
        "Substantive changes, decisions and correspondence following the review reports"
      ),
      e("Arşivleme yönergesi", "Archiving regulation"),
      e("İzleme (follow-up) süreçlerine ilişkin kanıtlar", "Evidence of follow-up processes"),
    ],

    "2.4": [
      e(
        "Değerlendirici eğitimlerine; içerik, kapsam, tarih ve katılımcıların kurum, görev ve demografik bilgilerine ilişkin kanıtlar",
        "Evidence on reviewer training: content, scope, dates and participants' institution, role and demographic details"
      ),
      e(
        "Kurum içi eğitimler, yükseköğretim kurumlarına yönelik eğitimler ve çalıştaylara ilişkin bilgiler (eğitim raporları dâhil)",
        "Information on in-house training, training for higher education institutions and workshops (including training reports)"
      ),
      e(
        "Değerlendiricilerin ilgili alanda deneyim, beceri ve yetkinliğini gösteren kanıtlar (özgeçmişler)",
        "Evidence of reviewers' experience, skills and competence in the relevant field (CVs)"
      ),
      e(
        "Öğrenci değerlendiricilerin sürece katıldığını gösteren kanıtlar",
        "Evidence that student reviewers take part in the process"
      ),
      e(
        "Yönetici ve değerlendiricilerin diğer ulusal/uluslararası kuruluşların eğitimlerine katılımına ilişkin kanıtlar",
        "Evidence of managers' and reviewers' participation in training by other national/international agencies"
      ),
      e("Değerlendirici çıkar çatışması beyanları", "Reviewers' conflict of interest declarations"),
    ],

    "2.5": [
      e(
        "Değerlendirme sonuçlarının resmî internet sitesinde kamuya ilan edildiğini gösteren kanıtlar",
        "Evidence that review outcomes are published on the official website"
      ),
      e("Örnek değerlendirme raporları", "Sample review reports"),
      e(
        "Kuruma maddi doğruluk kontrolü imkânı verildiğini gösteren kanıtlar",
        "Evidence that the institution was given a factual accuracy check"
      ),
      e(
        "Raporların iyileştirmeye yönelik öneriler içerdiğini gösteren kanıtlar",
        "Evidence that reports contain recommendations for improvement"
      ),
    ],

    "2.6": [
      e("Genel değerlendirme ölçütleri", "General evaluation criteria"),
      e("Alana özgü değerlendirme ölçütleri", "Field-specific evaluation criteria"),
      e("Ölçütler rehberi", "Criteria guide"),
      e("Tutarlılık komitesi ve çalışma yöntemi", "Consistency committee and its working method"),
      e(
        "Karar alma süreçlerine ilişkin mevzuat",
        "Regulations on the decision-making processes"
      ),
      e(
        "Farklı değerlendirici grupları arasında sonuç tutarlılığını güvence altına alan tedbirler",
        "Measures ensuring consistency of outcomes across different reviewer groups"
      ),
    ],

    "2.7": [
      e(
        "İtiraz sürecinin mevzuatta açıkça tanımlandığını gösteren kanıt",
        "Evidence that the appeals process is explicitly defined in the regulations"
      ),
      e("İtiraz ve şikâyet yönergesi", "Appeals and complaints regulation"),
      e(
        "İtirazı değerlendiren yapının, kararı veren yapıdan farklı olduğunu gösteren kanıtlar",
        "Evidence that appeals are considered by a different structure than the one that took the decision"
      ),
      e(
        "İtiraz ve şikâyet süreçlerinin kurumlara duyurulduğunu gösteren kanıtlar",
        "Evidence that appeals and complaints processes are communicated to institutions"
      ),
    ],
  };

  /* ESG Bölüm 1 — ölçütlerin standartları kapsamasına ilişkin ortak öneriler */
  var esg1Common = [
    e("Genel değerlendirme ölçütleri", "General evaluation criteria"),
    e("Alana özgü değerlendirme ölçütleri", "Field-specific evaluation criteria"),
    e("Ölçütler rehberi", "Criteria guide"),
    e("Kuruluşun değerlendirme kılavuzu", "The organisation's evaluation handbook"),
    e(
        "İlgili ölçüt kapsamında kurumdan talep edilen kanıt listesi",
        "List of evidence required from the institution under the related criterion"
    ),
  ];

  return {
    byStandard: byStandard,
    esg1Common: esg1Common,

    /** Bir ESG standardı için önerilen kanıtlar / suggestions for a standard */
    forStandard: function (code) {
      return byStandard[code] || [];
    },
  };
})();

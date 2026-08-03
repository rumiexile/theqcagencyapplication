/* ==========================================================================
   ESG 2027 — Draft 3 (July 2026)
   Standards and Guidelines for Quality Assurance in the EHEA
   --------------------------------------------------------------------------
   Kaynak / Source: "ESG 2027 draft 3 for BFUG consultation July 2026",
   karşılaştırma tablosunun 3. sütunu (ESG 2027 Draft 3).

   ÖNEMLİ / IMPORTANT — Draft 3 numaralandırması ESG 2015'ten farklıdır:
     • Bölüm 1: 10 → 9 standart (eski 1.9 → 1.2 içine alındı, 1.10 → 1.9)
     • Bölüm 2: 2.5 ve 2.6 yer değiştirdi (Reporting → 2.5)
     • Bölüm 3: 7 → 6 standart ("Official status" kaldırıldı,
       "Professional conduct" 3.5 içinde birleştirildi)
   ========================================================================== */

window.ESG = (function () {
  "use strict";

  /* ----------------------------------------------------------------------
     BÖLÜM 1 — İç Kalite Güvencesi (Kurumlar)
     Part 1 — Internal Quality Assurance (Institutions)
     Ajans başvurusunda: ajansın metodolojisinin bu standartları nasıl
     kapsadığı beyan edilir (ESG 2.1 gereği).
     ---------------------------------------------------------------------- */
  var part1 = [
    {
      code: "1.1",
      title: {
        tr: "Kalite Güvencesi Politikası",
        en: "Policy for Quality Assurance",
      },
      statement: {
        en:
          "Institutions should have in place, publish and effectively communicate a clear policy for quality assurance of learning, teaching and assessment, with associated structures and supporting a coherent system that forms an effective cycle of continuous improvement.",
        tr:
          "Kurumlar; öğrenme, öğretme ve değerlendirmenin kalite güvencesine ilişkin açık bir politikayı, ilgili yapılarla birlikte oluşturmalı, yayımlamalı ve etkili biçimde duyurmalı; bu politika sürekli iyileştirmenin etkili bir döngüsünü oluşturan tutarlı bir sistemi desteklemelidir.",
      },
    },
    {
      code: "1.2",
      title: {
        tr:
          "Programların Tasarımı, Onayı, Sürekli İzlenmesi ve Periyodik Gözden Geçirilmesi",
        en:
          "Design, approval, ongoing monitoring and periodic review of programmes",
      },
      statement: {
        en:
          "Institutions should have processes for the design, approval, monitoring and periodic review of their programmes to ensure that they are coherent, informed by the latest academic and professional developments, and reliable in leading to the intended learning outcomes.",
        tr:
          "Kurumlar; programlarının tutarlı olmasını, güncel akademik ve mesleki gelişmelerle beslenmesini ve amaçlanan öğrenme kazanımlarına güvenilir biçimde ulaşmasını sağlamak üzere programlarının tasarımı, onayı, izlenmesi ve periyodik olarak gözden geçirilmesine yönelik süreçlere sahip olmalıdır.",
      },
    },
    {
      code: "1.3",
      title: {
        tr: "Öğrenci Merkezli Öğrenme, Öğretme ve Değerlendirme",
        en: "Student-Centred Learning, Teaching and Assessment",
      },
      statement: {
        en:
          "Institutions should ensure that the programmes are delivered in a way that encourages students to take an active role in creating the learning process, and that the assessment of students reflects this approach.",
        tr:
          "Kurumlar, programların öğrencileri öğrenme sürecinin oluşturulmasında etkin rol almaya teşvik edecek biçimde yürütülmesini ve öğrenci değerlendirmesinin bu yaklaşımı yansıtmasını sağlamalıdır.",
      },
    },
    {
      code: "1.4",
      title: {
        tr: "Öğrenci Kabulü, Gelişimi, Tanınma ve Belgelendirme",
        en:
          "Student Admission, Progression, Recognition and Certification",
      },
      statement: {
        en:
          "Institutions should consistently apply pre-defined and published regulations covering all phases of the student life cycle, e.g. student admission, progression, recognition and certification.",
        tr:
          "Kurumlar; öğrenci kabulü, gelişimi, tanınma ve belgelendirme gibi öğrenci yaşam döngüsünün tüm aşamalarını kapsayan, önceden tanımlanmış ve yayımlanmış düzenlemeleri tutarlı biçimde uygulamalıdır.",
      },
    },
    {
      code: "1.5",
      title: { tr: "Öğretim Elemanları", en: "Teaching Staff" },
      statement: {
        en:
          "Institutions should assure themselves of the competence of their teaching staff. They should apply fair and transparent processes for the recruitment and development of the staff.",
        tr:
          "Kurumlar, öğretim elemanlarının yetkinliğinden emin olmalıdır. Personelin işe alınması ve geliştirilmesinde adil ve şeffaf süreçler uygulamalıdır.",
      },
    },
    {
      code: "1.6",
      title: {
        tr: "Öğrenme Ortamı ve Kaynaklar",
        en: "Learning environment and resources",
      },
      statement: {
        en:
          "Institutions should have appropriate funding for learning and teaching activities and ensure that adequate and readily accessible learning resources and student support are provided.",
        tr:
          "Kurumlar, öğrenme ve öğretme faaliyetleri için uygun finansmana sahip olmalı; yeterli ve kolay erişilebilir öğrenme kaynakları ile öğrenci desteğinin sağlandığından emin olmalıdır.",
      },
    },
    {
      code: "1.7",
      title: { tr: "Bilgi Yönetimi", en: "Information Management" },
      statement: {
        en:
          "Institutions should ensure that they collect, analyse and use relevant information for the effective management of their programmes and other activities.",
        tr:
          "Kurumlar; programlarının ve diğer faaliyetlerinin etkili yönetimi için ilgili bilgiyi topladıklarından, çözümlediklerinden ve kullandıklarından emin olmalıdır.",
      },
    },
    {
      code: "1.8",
      title: { tr: "Kamuoyunu Bilgilendirme", en: "Public Information" },
      statement: {
        en:
          "Institutions should publish information about their activities, including programmes, which is clear, accurate, objective, up-to-date and readily accessible.",
        tr:
          "Kurumlar; programları da dâhil olmak üzere faaliyetlerine ilişkin açık, doğru, nesnel, güncel ve kolay erişilebilir bilgileri yayımlamalıdır.",
      },
    },
    {
      code: "1.9",
      title: {
        tr: "Periyodik Dış Kalite Güvencesi",
        en: "Cyclical External Quality Assurance",
      },
      statement: {
        en:
          "Institutions should undergo external quality assurance in line with the ESG on a cyclical basis.",
        tr:
          "Kurumlar, ESG ile uyumlu biçimde periyodik olarak dış kalite güvencesi sürecinden geçmelidir.",
      },
    },
  ];

  /* ----------------------------------------------------------------------
     BÖLÜM 2 — Dış Kalite Güvencesi
     Part 2 — External Quality Assurance
     ---------------------------------------------------------------------- */
  var part2 = [
    {
      code: "2.1",
      title: {
        tr: "İç Kalite Güvencesinin Ele Alınması",
        en: "Addressing internal quality assurance",
      },
      statement: {
        en:
          "External quality assurance should address the effectiveness of the internal quality assurance processes for learning, teaching and assessment, ensuring that all standards of Part 1 of the ESG are covered holistically by the different applicable quality assurance processes for each institution. External quality assurance should verify that the evaluated programme corresponds to the correct level of the QF-EHEA.",
        tr:
          "Dış kalite güvencesi; öğrenme, öğretme ve değerlendirmeye ilişkin iç kalite güvencesi süreçlerinin etkililiğini ele almalı ve ESG'nin 1. Bölümündeki tüm standartların her kurum için uygulanabilir farklı kalite güvencesi süreçleri aracılığıyla bütüncül biçimde kapsandığını güvence altına almalıdır. Dış kalite güvencesi, değerlendirilen programın QF-EHEA'daki doğru düzeye karşılık geldiğini doğrulamalıdır.",
      },
      guidance: {
        tr: [
          "ESG Bölüm 1'in tüm standartlarının bütüncül olarak kapsanması beklenir.",
          "Kurumun kalite güvencesi sorumluluğu tanınmalı ve desteklenmelidir.",
          "Değerlendirilen programın QF-EHEA / TYÇ düzeyine uygunluğu doğrulanmalıdır.",
        ],
        en: [
          "All Part 1 standards should be covered holistically.",
          "Institutional responsibility for quality assurance should be recognised and supported.",
          "Verify the programme's correspondence to the correct QF-EHEA level.",
        ],
      },
    },
    {
      code: "2.2",
      title: {
        tr: "Amaca Uygun Yöntemlerin Tasarlanması",
        en: "Designing methodologies fit for purpose",
      },
      statement: {
        en:
          "External quality assurance should be defined and designed to ensure that it achieves the aims and objectives set for it, including its dual purpose of accountability and enhancement in higher education. The design of methodologies should take into consideration the relevant legal and regulatory context for higher education. Stakeholders should be involved in the design and continuous improvement of external quality assurance.",
        tr:
          "Dış kalite güvencesi; yükseköğretimde hesap verebilirlik ve iyileştirme şeklindeki ikili amacı da dâhil olmak üzere kendisi için belirlenen amaç ve hedeflere ulaşmasını sağlayacak biçimde tanımlanmalı ve tasarlanmalıdır. Yöntemlerin tasarımında yükseköğretime ilişkin yasal ve düzenleyici bağlam dikkate alınmalıdır. Paydaşlar, dış kalite güvencesinin tasarımına ve sürekli iyileştirilmesine dâhil edilmelidir.",
      },
      guidance: {
        tr: [
          "Hesap verebilirlik ve iyileştirme amaçları birlikte gözetilmelidir.",
          "Yasal ve düzenleyici bağlam yöntem tasarımına yansıtılmalıdır.",
          "Paydaş katılımı tasarım ve sürekli iyileştirmede sağlanmalıdır.",
        ],
        en: [
          "Balance the dual purpose of accountability and enhancement.",
          "Reflect the legal and regulatory context in the methodology.",
          "Involve stakeholders in design and continuous improvement.",
        ],
      },
    },
    {
      code: "2.3",
      title: { tr: "Süreçlerin Uygulanması", en: "Implementing processes" },
      statement: {
        en:
          "External quality assurance processes should be pre-defined, published, implemented consistently, and adapted to the methodology designed as described in standard 2.2. Processes should support the aims set for them.",
        tr:
          "Dış kalite güvencesi süreçleri; önceden tanımlanmış, yayımlanmış, tutarlı biçimde uygulanan ve 2.2 numaralı standartta tanımlandığı şekilde tasarlanan yönteme uyarlanmış olmalıdır. Süreçler, kendileri için belirlenen amaçları desteklemelidir.",
      },
      guidance: {
        tr: [
          "Öz değerlendirme veya eşdeğeri bir aşama içermelidir.",
          "Normalde saha ziyaretini içeren bir dış değerlendirme yapılmalıdır.",
          "Dış değerlendirme sonucunda bir rapor üretilmelidir.",
          "Tutarlı bir izleme (follow-up) süreci bulunmalıdır.",
        ],
        en: [
          "Include a self-assessment or equivalent.",
          "Include an external assessment, normally with a site visit.",
          "Produce a report resulting from the external assessment.",
          "Maintain a consistent follow-up process.",
        ],
      },
    },
    {
      code: "2.4",
      title: { tr: "Akran Değerlendiriciler", en: "Peer reviewers" },
      statement: {
        en:
          "External quality assurance should be carried out by competent and independent groups of peer reviewers that include (a) student member(s). The selection of reviewers should take into consideration the aims and objectives of the process.",
        tr:
          "Dış kalite güvencesi; aralarında öğrenci üye(ler)in de bulunduğu yetkin ve bağımsız akran değerlendirici grupları tarafından yürütülmelidir. Değerlendiricilerin seçiminde sürecin amaç ve hedefleri dikkate alınmalıdır.",
      },
      guidance: {
        tr: [
          "Değerlendiriciler kurumlar, akademisyenler, öğrenciler ve işverenler/meslek mensupları gibi farklı perspektifleri temsil etmelidir.",
          "Değerlendiriciler kişisel sıfatla hareket eder; aday gösteren kuruluşu temsil etmez.",
          "Değerlendiriciler görevlerini yerine getirecek yeterli beceriye sahip olmalı ve ajans tarafından düzenlenen uygun eğitim ve/veya bilgilendirmeyle desteklenmelidir.",
          "Her türlü işlem ve karar yalnızca uzmanlığa ve kanıta dayanmalıdır.",
        ],
        en: [
          "Reviewers should bring perspectives of institutions, academics, students and employers/professional practitioners.",
          "Anyone contributing acts in a personal capacity, not representing their constituent organisation.",
          "Reviewers should have adequate skills and be supported by appropriate training and/or briefing organised by the agency.",
          "Any procedure and decision may solely be based on expertise and evidence.",
        ],
      },
    },
    {
      code: "2.5",
      title: { tr: "Raporlama", en: "Reporting" },
      statement: {
        en:
          "Full reports by the peer-reviewers should be published, clear and accessible to the academic community, external partners, and other interested individuals. The reports should be useful for the evaluated institution and provide recommendations for improvement. The evaluated institution should be given an opportunity to check the factual accuracy of the report before it is finalised.",
        tr:
          "Akran değerlendiriciler tarafından hazırlanan raporların tamamı yayımlanmalı; akademik topluluk, dış paydaşlar ve ilgili diğer kişiler için açık ve erişilebilir olmalıdır. Raporlar değerlendirilen kurum için yararlı olmalı ve iyileştirmeye yönelik öneriler sunmalıdır. Değerlendirilen kuruma, rapor kesinleşmeden önce maddi doğruluğunu kontrol etme imkânı verilmelidir.",
      },
      guidance: {
        tr: [
          "Raporun tamamı açık, erişilebilir ve anlaşılır biçimde yayımlanmalıdır.",
          "Rapor iyileştirmeye yönelik somut öneriler içermelidir.",
          "Kuruma maddi doğruluk kontrolü (factual check) hakkı tanınmalıdır.",
        ],
        en: [
          "Publish the full report clearly and accessibly.",
          "Provide concrete recommendations for improvement.",
          "Give the institution a factual-accuracy check before finalisation.",
        ],
      },
    },
    {
      code: "2.6",
      title: {
        tr: "Sonuçlara İlişkin Süreçler ve Ölçütler",
        en: "Processes and criteria for outcomes",
      },
      statement: {
        en:
          "Any outcomes, including formal decisions, made as a result of external quality assurance, should be based on evidence collected and analysed through the review process as documented in the review report by the peer-reviewers, and on explicit and published criteria that are applied consistently.",
        tr:
          "Dış kalite güvencesi sonucunda ulaşılan, resmî kararlar da dâhil olmak üzere tüm çıktılar; akran değerlendiriciler tarafından değerlendirme raporunda belgelenen, değerlendirme süreci boyunca toplanan ve çözümlenen kanıtlara ve tutarlı biçimde uygulanan açık ve yayımlanmış ölçütlere dayanmalıdır.",
      },
      guidance: {
        tr: [
          "Ölçütler açık, yayımlanmış ve tutarlı biçimde uygulanıyor olmalıdır.",
          "Kararlar, değerlendirme raporunda belgelenen kanıtlara dayanmalıdır.",
          "Karar alma organı ile değerlendirici grup arasındaki ilişki tanımlı olmalıdır.",
        ],
        en: [
          "Criteria must be explicit, published and consistently applied.",
          "Decisions must rest on evidence documented in the review report.",
          "The relationship between the decision-making body and the review panel must be defined.",
        ],
      },
    },
    {
      code: "2.7",
      title: { tr: "Şikâyetler ve İtirazlar", en: "Complaints and appeals" },
      statement: {
        en:
          "Agencies should have complaints and appeals processes that are defined as part of the design of external quality assurance processes and clearly communicated to the institutions. Appeals should be considered by a different structure within the agencies than the one whose decision is appealed against.",
        tr:
          "Ajanslar; dış kalite güvencesi süreçlerinin tasarımının bir parçası olarak tanımlanan ve kurumlara açıkça duyurulan şikâyet ve itiraz süreçlerine sahip olmalıdır. İtirazlar, ajans içinde itiraz edilen kararı veren yapıdan farklı bir yapı tarafından değerlendirilmelidir.",
      },
      guidance: {
        tr: [
          "Şikâyet: sürecin yürütülüşüne veya yürütenlere ilişkin memnuniyetsizlik.",
          "İtiraz: sürecin resmî çıktısının sağlam kanıta dayanmadığı ya da ölçüt veya süreçlerin doğru ve tutarlı uygulanmadığı iddiası.",
          "İtirazı değerlendiren yapı, kararı veren yapıdan farklı olmalıdır.",
          "Ajans üçüncü taraflardan gelen şikâyetlere ilişkin bir politikaya da sahip olabilir.",
        ],
        en: [
          "Complaint: dissatisfaction about the conduct of the process or those carrying it out.",
          "Appeal: the outcome is not based on sound evidence, or criteria or processes were not correctly and consistently applied.",
          "Appeals must be considered by a different structure than the one whose decision is appealed.",
          "Agencies may also have a policy for complaints from third parties.",
        ],
      },
    },
  ];

  /* ----------------------------------------------------------------------
     BÖLÜM 3 — Kalite Güvencesi Ajansları
     Part 3 — Quality Assurance Agencies  (Draft 3: 6 standart)
     ---------------------------------------------------------------------- */
  var part3 = [
    {
      code: "3.1",
      title: {
        tr: "Kalite Güvencesine Yönelik Faaliyetler, Politika ve Süreçler",
        en: "Activities, policy and processes for quality assurance",
      },
      statement: {
        en:
          "Agencies should undertake external quality assurance activities as defined in Part 2 of the ESG on a regular basis. They should have clear and explicit goals and objectives that are part of their publicly available mission statement. These should translate into the daily work of the agency. Agencies should ensure the involvement of stakeholders in their governance and work.",
        tr:
          "Ajanslar, ESG'nin 2. Bölümünde tanımlanan dış kalite güvencesi faaliyetlerini düzenli olarak yürütmelidir. Kamuya açık misyon bildirimlerinin bir parçası olan açık ve net amaç ve hedeflere sahip olmalıdır. Bu amaç ve hedefler ajansın günlük çalışmalarına yansımalıdır. Ajanslar, yönetişimlerine ve çalışmalarına paydaşların katılımını sağlamalıdır.",
      },
      guidance: {
        tr: [
          "Faaliyetler düzenli ve süreklilik arz eden biçimde yürütülmelidir.",
          "Amaç ve hedefler kamuya açık misyon bildiriminde yer almalıdır.",
          "Paydaşlar yönetişim yapılarına ve çalışmalara dâhil edilmelidir.",
          "Ajans yapılarına uluslararası üyeler dâhil edilerek uzmanlık artırılabilir.",
        ],
        en: [
          "Undertake activities on a regular basis.",
          "State goals and objectives in a publicly available mission statement.",
          "Involve stakeholders in governance and work.",
          "Expertise may be increased by including international members in agencies' structures.",
        ],
      },
    },
    {
      code: "3.2",
      title: { tr: "Bağımsızlık", en: "Independence" },
      statement: {
        en:
          "Agencies should be independent and act autonomously. They should have full responsibility for their operations and the outcomes of those operations without third party influence.",
        tr:
          "Ajanslar bağımsız olmalı ve özerk hareket etmelidir. Faaliyetlerinden ve bu faaliyetlerin sonuçlarından, üçüncü tarafların etkisi olmaksızın tam sorumluluk taşımalıdır.",
      },
      guidance: {
        tr: [
          "Örgütsel bağımsızlık: Devlet, yükseköğretim kurumları ve diğer paydaşlardan bağımsızlığın resmî belgelerle gösterilmesi.",
          "Operasyonel bağımsızlık: Süreçlerin tanımlanması ve yürütülmesi ile akran değerlendiricilerin aday gösterilmesi ve atanması üçüncü taraflardan bağımsız olmalıdır; aday gösterme ve atama ajans tarafından bağımsız biçimde yapılır.",
          "Resmî çıktıların bağımsızlığı: Nihai çıktıların sorumluluğu ajansa aittir; değerlendirme süreci ise ilgili paydaş kökenlerinden gelen akran değerlendiricilerin değerlendirmesine dayanır.",
        ],
        en: [
          "Organisational independence: demonstrated by official documentation.",
          "Operational independence: definition and operation of procedures and the nomination and appointment of peer reviewers are undertaken independently of third parties; nomination and appointment are undertaken independently by the agency.",
          "Independence of formal outcomes: final outcomes remain the responsibility of the agency, while the review procedure is based on assessment by peer reviewers from relevant stakeholder backgrounds.",
        ],
      },
    },
    {
      code: "3.3",
      title: {
        tr: "İyileştirmeye Yönelik Faaliyetler",
        en: "Activities for enhancement",
      },
      statement: {
        en:
          "Agencies should regularly engage in activities, reflect on their experiences, and disseminate materials that support the enhancement of quality assurance and learning, teaching and assessment in the context in which they work.",
        tr:
          "Ajanslar; faaliyet gösterdikleri bağlamda kalite güvencesi ile öğrenme, öğretme ve değerlendirmenin iyileştirilmesini destekleyen faaliyetlerde düzenli olarak yer almalı, deneyimleri üzerine düşünmeli ve materyalleri yaygınlaştırmalıdır.",
      },
      guidance: {
        tr: [
          "Ajanslar, tek bir sürecin kapsamının ötesinde yararlı olabilecek bilgi elde eder; bu bilgi sistem genelinde yapılandırılmış çözümlemelere malzeme sağlar.",
          "Bulgular; gelişmeler, eğilimler ve iyi uygulama alanları ile süregelen güçlüklerin değerlendirilmesine katkı sağlar.",
          "Bu bulgular ulusal ve uluslararası bağlamlarda kalite güvencesi politika ve süreçlerinin iyileştirilmesinde kullanılabilir.",
        ],
        en: [
          "Agencies gain information useful beyond a single process, providing material for structured analyses across the system.",
          "Findings contribute to reflection on developments, trends, areas of good practice or persistent difficulties.",
          "Findings can be used to improve quality assurance policies and processes in national and international contexts.",
        ],
      },
    },
    {
      code: "3.4",
      title: { tr: "Kaynaklar", en: "Resources" },
      statement: {
        en:
          "Agencies should have adequate resources to carry out their work professionally. These resources, both human and financial, should enable effective and sustainable implementation of the agencies' activities. Agencies should provide their staff with appropriate support and professional development opportunities, including the use of digital technologies, to ensure a high level of competence.",
        tr:
          "Ajanslar, çalışmalarını profesyonelce yürütmek için yeterli kaynaklara sahip olmalıdır. Hem insan hem de mali nitelikteki bu kaynaklar, ajansın faaliyetlerinin etkili ve sürdürülebilir biçimde uygulanmasına imkân vermelidir. Ajanslar, yüksek düzeyde yetkinliği güvence altına almak üzere personeline dijital teknolojilerin kullanımı da dâhil olmak üzere uygun destek ve mesleki gelişim olanakları sunmalıdır.",
      },
      guidance: {
        tr: [
          "Mevcut kaynaklar ajansın uygulamaları üzerine düşünmesine, gerektiğinde iyileştirmesine ve kamuoyunu faaliyetleri hakkında bilgilendirmesine imkân verir.",
          "Kaynak yönetiminde dijital ve yeşil dönüşüm boyutları dikkate alınır.",
        ],
        en: [
          "Available resources enable agencies to reflect on and improve their practices and to inform the public about their activities.",
          "When managing resources, aspects of digital and green transition are taken into consideration.",
        ],
      },
    },
    {
      code: "3.5",
      title: {
        tr: "İç Kalite Güvencesi ve Dürüstlük",
        en: "Internal quality assurance and integrity",
      },
      statement: {
        en:
          "Agencies should have high professional standards to create trust in their work. Effective tools should be in place to ensure the integrity of their operations nationally and internationally and to prevent conflicts of interest. Agencies should have in place processes for internal quality assurance related to defining, assuring and enhancing the quality and integrity of their activities.",
        tr:
          "Ajanslar, çalışmalarına güven oluşturmak üzere yüksek mesleki standartlara sahip olmalıdır. Ulusal ve uluslararası düzeyde faaliyetlerinin dürüstlüğünü güvence altına almak ve çıkar çatışmalarını önlemek için etkili araçlar bulunmalıdır. Ajanslar; faaliyetlerinin kalitesini ve dürüstlüğünü tanımlamaya, güvence altına almaya ve geliştirmeye yönelik iç kalite güvencesi süreçlerine sahip olmalıdır.",
      },
      guidance: {
        tr: [
          "Ajans, ESG kapsamı dışında faaliyetler de yürütüyorsa dış kalite güvencesi ile diğer çalışma alanları arasında açık bir ayrım yapılmalı ve bu kamuoyuna açıkça duyurulmalıdır.",
          "Faaliyetlerde yer alan tüm kişilerin yeterli yetkinliğe sahip olması, mesleki ve etik davranması sağlanır.",
          "Her türlü hoşgörüsüzlük veya ayrımcılığa karşı koruyucu mekanizmalar bulunur.",
          "Yurt dışında çalışırken faaliyet gösterilen ülkenin ilgili otoriteleriyle uygun biçimde iletişim kurulur.",
          "Faaliyetlerin bir kısmı veya tamamı alt yüklenicilere devredilmişse, üretilen materyalin ESG ile uyumlu olması güvence altına alınır.",
        ],
        en: [
          "Where agencies carry out activities outside the scope of the ESG, a clear distinction is needed and clearly communicated to the wider public.",
          "Ensure all persons involved have adequate competencies and act professionally and ethically.",
          "Mechanisms guard against intolerance of any kind or discrimination.",
          "When working abroad, communicate appropriately with the relevant authorities of that jurisdiction.",
          "Ensure subcontracted activities and materials are in line with the ESG.",
        ],
      },
    },
    {
      code: "3.6",
      title: { tr: "Ajansların Değerlendirilmesi", en: "Review of agencies" },
      statement: {
        en:
          "Agencies should undergo an external review at least once every five years in order to demonstrate their compliance with the ESG, addressing, where relevant, the outcomes of the previous review.",
        tr:
          "Ajanslar, ESG'ye uyumlarını göstermek amacıyla en az beş yılda bir dış değerlendirmeden geçmeli ve ilgili olduğu durumlarda önceki değerlendirmenin sonuçlarını ele almalıdır.",
      },
      guidance: {
        tr: [
          "Ajanslar politika ve faaliyetleri üzerine sürekli olarak düşünür.",
          "Periyodik dış değerlendirme, ajansın ve paydaşlarının ESG ilkelerine uyumun sürdüğü konusunda güvence almasını sağlar.",
          "Önceki değerlendirmenin sonuçları, ilgili olduğu ölçüde ele alınmalıdır.",
        ],
        en: [
          "Agencies reflect on their policies and activities continuously.",
          "A periodic external review assures agencies and stakeholders of continued adherence to ESG principles.",
          "Address the outcomes of the previous review where relevant.",
        ],
      },
    },
  ];

  /* ----------------------------------------------------------------------
     Olgunluk / uyum düzeyleri — öz değerlendirme ölçeği
     Maturity / compliance scale for self-assessment
     ---------------------------------------------------------------------- */
  var complianceScale = [
    {
      value: "fully",
      label: { tr: "Tam uyumlu", en: "Fully compliant" },
      desc: {
        tr: "Standardın tüm gerekleri karşılanmakta ve kanıtlarla desteklenmektedir.",
        en: "All requirements are met and supported by evidence.",
      },
    },
    {
      value: "substantially",
      label: { tr: "Büyük ölçüde uyumlu", en: "Substantially compliant" },
      desc: {
        tr: "Gereklerin büyük bölümü karşılanmakta, sınırlı iyileştirme alanı bulunmaktadır.",
        en: "Most requirements are met, with limited areas for improvement.",
      },
    },
    {
      value: "partially",
      label: { tr: "Kısmen uyumlu", en: "Partially compliant" },
      desc: {
        tr: "Gerekler kısmen karşılanmakta, belirgin iyileştirme ihtiyacı vardır.",
        en: "Requirements are partly met; significant improvement is needed.",
      },
    },
    {
      value: "non",
      label: { tr: "Uyumsuz", en: "Non-compliant" },
      desc: {
        tr: "Gerekler karşılanmamaktadır.",
        en: "Requirements are not met.",
      },
    },
  ];

  return {
    version: "ESG 2027 — Draft 3 (July 2026)",
    part1: part1,
    part2: part2,
    part3: part3,
    complianceScale: complianceScale,
    /** Kod ile standart bul / find a standard by code */
    byCode: function (code) {
      var all = part1.concat(part2, part3);
      for (var i = 0; i < all.length; i++) {
        if (all[i].code === code) return all[i];
      }
      return null;
    },
  };
})();

/* ==========================================================================
   Kılavuz içeriği — Sürüm 3.0 (2026)

   Yapı: bölüm → kısım → blok. Bloklar `p` (paragraf), `liste`, `tablo`,
   `not` (bilgi kutusu) ve `olcutler` (EK 1 üretilmiş tablosu) olabilir.
   Tüm metin {tr, en} çiftidir; dil değişimi belgeyi yeniden çizmez,
   yalnızca metni değiştirir.

   Normatif metni henüz kaynağından alınmamış kısımlar `kaynakBekliyor: true`
   taşır ve ekranda da baskıda da
   açıkça işaretlenir — taslak, mevzuat sanılmasın.

   KAYNAKLAR
     Y     Yükseköğretim Kalite Güvencesi ve Yükseköğretim Kalite Kurulu
           Yönetmeliği (2547 sayılı Kanun ek 35. maddesine dayanır)
     K21   Yetkilendirilme, Tanınma ve İzleme Kılavuzu, Sürüm 2.1, Mayıs 2020
     M12   Akreditasyon ücret tarifesine ilişkin madde metni
     ESG   ESG 2027 (Draft 3, Temmuz 2026)
   ========================================================================== */

window.KILAVUZ = {
  meta: {
    surum: "3.0",
    tarih: { tr: "2026", en: "2026" },
    baslik: {
      tr: "Dış Değerlendirme ve Akreditasyon Kuruluşlarının Yetkilendirilmesi, Tanınması ve İzlenmesine İlişkin Kılavuz",
      en: "Guide on the Authorisation, Recognition and Monitoring of External Evaluation and Accreditation Organisations",
    },
    kisaBaslik: {
      tr: "Yetkilendirme, Tanınma ve İzleme Kılavuzu",
      en: "Authorisation, Recognition and Monitoring Guide",
    },
    kurum: {
      tr: "Yükseköğretim Kalite Kurulu",
      en: "Turkish Higher Education Quality Council",
    },
    onceki: {
      tr: "Bu Kılavuz, Mayıs 2020 tarihli Sürüm 2.1'in yerine geçer.",
      en: "This Guide supersedes Version 2.1 of May 2020.",
    },
  },

  /* Sürüm geçmişi — mevzuat belgelerinde izlenebilirlik esastır. */
  surumler: [
    {
      surum: "3.0",
      tarih: { tr: "2026", en: "2026" },
      degisiklik: {
        tr: "Değerlendirme ölçütleri ESG 2027 ile uyumlu olarak yeniden yazıldı. Başvurular MİS üzerinden alınmaya başlandı; Öz Değerlendirme Raporu ayrı bir belge olarak düzenlenmek yerine başvuru formundan üretilir hâle geldi. Başvuru türleri ayrı ayrı düzenlendi; yenileme başvurusunun üç ay önce tamamlanması, süresinde başvurmayan kuruluşlar için altı aylık başvuru yasağı ve yenileme kararının yürürlük tarihi açıkça belirlendi. İki yıl süreli tescil kararı ilk yetkilendirme başvurusu ile sınırlandırıldı; Kalite Değerlendirme Tanınma Belgesinin beş yıl süreyle verileceği belirtildi. Kapsam genişletme başvurusunun yapılabileceği zaman aralığı tanımlandı. İtiraz ve şikâyetlerin YÖKAK İtiraz ve Şikâyet Yönergesi kapsamında ele alınacağı eklendi. Sürüm 2.1'de “Tanıma Belgesi” olarak geçen belge, mali hükümlerdeki adlandırmayla birleştirilerek “Kalite Değerlendirme Tanınma Belgesi” olarak tanımlandı. Tanımlar bölümü genişletildi: Akreditasyon Ücret Tarifesi, Kapsam Genişletme, Kapsam genişletme başvurusu, Kayıtlı Elektronik Posta, Ölçütler, Program, Program Akreditasyonu, Raportör, Taslak Başvuru Değerlendirme Raporu ve Tescil/Tanınma Bedeli terimleri eklendi. “İtiraz Değerlendirme Komisyonu”, şikâyetleri de kapsayacak biçimde “İtiraz ve Şikâyet Komisyonu” olarak yeniden tanımlandı. Faaliyet Raporu, İzleme Raporu ve İzleme Yetkilisi tanımları Kalite Değerlendirme Tescil Belgesi sahibi kuruluşlarla sınırlandırıldı. Mevzuata uygunluk, görev bağdaşmazlığı, etik kurallar ve faaliyet raporuna ilişkin hükümleri içeren İdari Esaslar bölümü eklendi. Kuruluşların program akreditasyonunda verecekleri kararları, bu kararların sürelerini, ara değerlendirmeyi ve belgenin iptali hâlinde akreditasyonların durumunu düzenleyen Program Akreditasyonu bölümü eklendi. Akredite program bilgilerinin toplanmasını, Komisyonca incelenmesini ve Yükseköğretim Kuruluna iletilmesini düzenleyen Akredite Program Bilgileri bölümü eklendi. Tanımlara Kılavuz terimi girdi; MİS tanımı, sistemin YÖKAK Bilgi Yönetim Sistemi olarak da anıldığını belirtecek şekilde genişletildi. Mali Hükümler bölümü bunlara bağlı olarak VI numarasını aldı. Akreditasyon kapsamının ISCED-F 2013 ile beyanı, mali hükümler ve ölçüt değişikliği bildirim yükümlülüğü eklendi.",
        en: "The evaluation criteria were rewritten in alignment with ESG 2027. Applications are now received through MİS; the Self-Evaluation Report is produced from the application form instead of being drawn up as a separate document. The types of application were set out separately; the requirement to complete a renewal application three months in advance, the six-month bar on organisations that fail to apply in time, and the date from which a renewal decision takes effect were stated expressly. The two-year registration decision was confined to first applications for authorisation, and the Quality Evaluation Recognition Certificate was stated to be issued for five years. The window within which a scope extension application may be made was defined. It was added that appeals and complaints are dealt with under the YÖKAK Appeals and Complaints Directive. The certificate referred to in Version 2.1 as the “Recognition Certificate” was aligned with the naming used in the financial provisions and defined as the “Quality Evaluation Recognition Certificate”. The definitions were expanded with the Accreditation Fee Schedule, Scope Extension, Scope extension application, Registered Electronic Mail, Criteria, Programme, Programme Accreditation, Rapporteur, Draft Application Evaluation Report and Registration/Recognition Fee. The “Appeals Evaluation Commission” was redefined as the “Appeals and Complaints Commission” so as to cover complaints as well. The definitions of the Activity Report, the Monitoring Report and the Monitoring Officer were confined to organisations holding a Quality Evaluation Registration Certificate. A chapter on Administrative Principles was added, covering compliance with legislation, incompatibility of office, the code of ethics and the activity report. A chapter on Programme Accreditation was added, governing the decisions Organisations take in programme accreditation, the periods of those decisions, the intermediate evaluation and the status of accreditations where a certificate is cancelled. A chapter on Information on Accredited Programmes was added, governing the collection of information on accredited programmes, its examination by the Commission and its transmission to the Council of Higher Education. The term Guide was added to the definitions, and the definition of MİS was extended to note that the system is also referred to as the YÖKAK Information Management System. The chapter on Financial Provisions was renumbered as VI accordingly. Declaration of the accreditation scope using ISCED-F 2013, financial provisions and the obligation to notify changes of criteria were added.",
      },
    },
    {
      surum: "2.1",
      tarih: { tr: "Mayıs 2020", en: "May 2020" },
      degisiklik: {
        tr: "Önceki sürüm.",
        en: "Previous version.",
      },
    },
  ],

  bolumler: [
    /* ================== ÖN SÖZ ================== */
    {
      id: "onsoz",
      tur: "on",
      baslik: { tr: "Ön Söz", en: "Foreword" },
      kisimlar: [
        {
          id: "onsoz-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Yükseköğretim Kalite Kurulu; yükseköğretim sistemindeki iç ve dış kalite güvencesine, yükseköğretim kurumlarının eğitim-öğretim, araştırma ve toplumsal katkı faaliyetleri ile idari hizmetlerinin kalite düzeylerinin ulusal ve uluslararası standartlara göre değerlendirilmesine ve bağımsız dış değerlendirme ve akreditasyon kuruluşlarının yetkilendirilmesi ile tanınmasına ilişkin görevleri yürütmektedir.",
                en: "The Turkish Higher Education Quality Council carries out the duties concerning internal and external quality assurance in the higher education system, the evaluation of the quality of teaching and learning, research, societal contribution and administrative services of higher education institutions against national and international standards, and the authorisation and recognition of independent external evaluation and accreditation organisations.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Bu Kılavuz; ulusal kuruluşların yetkilendirilmesi, uluslararası kuruluşların tanınması ve yetkilendirilen ya da tanınan kuruluşların izlenmesi süreçlerinde uygulanacak ölçütleri, usul ve esasları ortaya koymak amacıyla hazırlanmıştır. Kılavuz, başvuru sahibi kuruluşlara sürecin bütününü önceden görme imkânı verirken, değerlendirme faaliyetlerinin öngörülebilir ve tutarlı biçimde yürütülmesini de güvence altına alır.",
                en: "This Guide has been prepared to set out the criteria, procedures and principles to be applied in the authorisation of national organisations, the recognition of international organisations, and the monitoring of authorised or recognised organisations. It allows applicant organisations to see the process as a whole in advance, while ensuring that evaluation activities are carried out predictably and consistently.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Dış değerlendirme ve akreditasyon süreçleri, yükseköğretim sisteminde kalite güvencesinin temel göstergelerinden biridir. Bu süreçleri yürüten kuruluşların kendilerinin de tanımlı ölçütlere göre değerlendirilmesi, sistemin bütününe duyulan güvenin önkoşuludur.",
                en: "External evaluation and accreditation processes are among the principal indicators of quality assurance in the higher education system. That the organisations carrying out these processes are themselves evaluated against defined criteria is a precondition for confidence in the system as a whole.",
              },
            },
          ],
        },
      ],
    },

    /* ================== GİRİŞ ================== */
    {
      id: "giris",
      tur: "on",
      baslik: { tr: "Giriş", en: "Introduction" },
      kisimlar: [
        {
          id: "giris-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Bu Kılavuz, Yükseköğretim Kalite Güvencesi ve Yükseköğretim Kalite Kurulu Yönetmeliği hükümlerine dayanılarak hazırlanmıştır. Söz konusu Yönetmelik, 4/11/1981 tarihli ve 2547 sayılı Yükseköğretim Kanununun ek 35 inci maddesine dayanmaktadır.",
                en: "This Guide has been prepared on the basis of the Regulation on Higher Education Quality Assurance and the Higher Education Quality Council. That Regulation is based on additional article 35 of Higher Education Law no. 2547 of 4 November 1981.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Kılavuz; yurt içinde faaliyet gösteren kuruluşların Kalite Değerlendirme Tescil Belgesi ile yetkilendirilmesi, yurt dışında faaliyet gösteren kuruluşların Kalite Değerlendirme Tanınma Belgesi ile tanınması ve belge sahibi kuruluşların izlenmesi süreçlerini kapsar.",
                en: "The Guide covers the authorisation of organisations operating within the country through the Quality Evaluation Registration Certificate, the recognition of organisations operating abroad through the Quality Evaluation Recognition Certificate, and the monitoring of certificate-holding organisations.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Değerlendirme ölçütleri, Avrupa Yükseköğretim Alanında Kalite Güvencesi İlke ve Standartları (ESG) ile uyumlu olarak belirlenmiştir. Kuruluşların hem kendi kurumsal yapıları hem de yürüttükleri dış kalite güvencesi süreçleri bu standartlar üzerinden değerlendirilir.",
                en: "The evaluation criteria have been established in alignment with the Standards and Guidelines for Quality Assurance in the European Higher Education Area (ESG). Organisations are evaluated both in respect of their own institutional structures and of the external quality assurance processes they operate.",
              },
            },
          ],
        },
      ],
    },

    /* ================== TANIMLAR ================== */
    {
      id: "tanimlar",
      tur: "on",
      baslik: { tr: "Tanımlar", en: "Definitions" },
      kisimlar: [
        {
          id: "tanimlar-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Bu Kılavuzda geçen;",
                en: "In this Guide;",
              },
            },
            {
              tip: "tanim",
              ogeler: [
                {
                  terim: {
                    tr: "Akreditasyon Ücret Tarifesi",
                    en: "Accreditation Fee Schedule",
                  },
                  metin: {
                    tr: "Bağımsız dış değerlendirme ve akreditasyon kuruluşlarının, program akreditasyonunda bir program için uygulayacakları akreditasyon ücretini,",
                    en: "the accreditation fee that independent external evaluation and accreditation organisations charge for a single programme in programme accreditation,",
                  },
                },
                {
                  terim: { tr: "Başvuru Değerlendirme Raporu", en: "Application Evaluation Report" },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi için müracaat eden Kuruluşun başvurusu incelenerek Komisyon tarafından hazırlanan raporu,",
                    en: "the report prepared by the Commission upon examination of the application of an Organisation applying for a Quality Evaluation Registration Certificate or a Quality Evaluation Recognition Certificate,",
                  },
                },
                {
                  terim: { tr: "Başvuru Formu", en: "Application Form" },
                  metin: {
                    tr: "Kuruluşun yetkilendirme veya tanınma başvurusunu MİS üzerinde hazırladığı, ölçütlere ilişkin açıklamaları ve kanıt bağlarını içeren yapılandırılmış formu,",
                    en: "the structured form, containing the explanations relating to the criteria and the links to evidence, through which the Organisation prepares its application for authorisation or recognition on MİS,",
                  },
                },
                {
                  terim: { tr: "EQAR", en: "EQAR" },
                  metin: {
                    tr: "ESG'ye uygunluğu doğrulanan dış kalite güvencesi ajanslarının kaydedildiği Avrupa Yükseköğretim Kalite Güvencesi Kayıt Kütüğünü (European Quality Assurance Register for Higher Education),",
                    en: "the European Quality Assurance Register for Higher Education, in which external quality assurance agencies whose compliance with the ESG has been confirmed are registered,",
                  },
                },
                {
                  terim: { tr: "ESG", en: "ESG" },
                  metin: {
                    tr: "Avrupa Yükseköğretim Alanında Kalite Güvencesi İlke ve Standartlarını,",
                    en: "the Standards and Guidelines for Quality Assurance in the European Higher Education Area,",
                  },
                },
                {
                  terim: { tr: "Faaliyet Raporu", en: "Activity Report" },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi sahibi Kuruluş tarafından hazırlanarak her yılın ocak ayı sonuna kadar Kurula sunulan raporu,",
                    en: "the report prepared by an Organisation holding a Quality Evaluation Registration Certificate and submitted to the Council by the end of January each year,",
                  },
                },
                {
                  terim: { tr: "ISCED-F 2013", en: "ISCED-F 2013" },
                  metin: {
                    tr: "Eğitim ve Öğretim Alanlarının Uluslararası Standart Sınıflandırmasını,",
                    en: "the International Standard Classification of Education — Fields of Education and Training,",
                  },
                },
                {
                  terim: {
                    tr: "İtiraz ve Şikâyet Komisyonu",
                    en: "Appeals and Complaints Commission",
                  },
                  metin: {
                    tr: "Kurulun, Kuruluşun yetkilendirilmesi ve tanınması hakkında verdiği kararlar ile Kuruluşun faaliyetlerinden dolayı meydana gelen itirazları ve şikâyetleri değerlendirmek üzere Kurul tarafından oluşturulan komisyonu,",
                    en: "the commission established by the Council to evaluate appeals against the decisions it has taken on the authorisation and recognition of an Organisation, together with complaints arising from the activities of an Organisation,",
                  },
                },
                {
                  terim: { tr: "İzleme Raporu", en: "Monitoring Report" },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi sahibi her bir Kuruluş için ilgili İzleme Yetkilisi tarafından hazırlanıp Komisyona sunulan raporu,",
                    en: "the report prepared by the relevant Monitoring Officer for each Organisation holding a Quality Evaluation Registration Certificate and submitted to the Commission,",
                  },
                },
                {
                  terim: { tr: "İzleme Yetkilisi", en: "Monitoring Officer" },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi sahibi her bir Kuruluşun izleme süreçlerini yürütmek üzere Kurul tarafından atanan kişi ya da kişileri,",
                    en: "the person or persons appointed by the Council to carry out the monitoring processes of each Organisation holding a Quality Evaluation Registration Certificate,",
                  },
                },
                {
                  terim: {
                    tr: "Kalite Değerlendirme Tanınma Belgesi",
                    en: "Quality Evaluation Recognition Certificate",
                  },
                  metin: {
                    tr: "Alana özgü önceden belirlenmiş ölçütlere göre yükseköğretim programlarını değerlendiren uluslararası bağımsız dış değerlendirme ve akreditasyon kuruluşlarına Kurul tarafından verilen belgeyi,",
                    en: "the certificate awarded by the Council to international independent external evaluation and accreditation organisations that evaluate higher education programmes against field-specific predetermined criteria,",
                  },
                },
                {
                  terim: {
                    tr: "Kalite Değerlendirme Tescil Belgesi",
                    en: "Quality Evaluation Registration Certificate",
                  },
                  metin: {
                    tr: "Alana özgü önceden belirlenmiş ölçütlere göre yükseköğretim programlarını değerlendiren ulusal bağımsız dış değerlendirme ve akreditasyon kuruluşlarına Kurul tarafından verilen belgeyi,",
                    en: "the certificate awarded by the Council to national independent external evaluation and accreditation organisations that evaluate higher education programmes against field-specific predetermined criteria,",
                  },
                },
                {
                  terim: { tr: "Kanıt Koleksiyonu", en: "Evidence Collection" },
                  metin: {
                    tr: "Başvuruda sunulan tüm kanıtların, bağlı oldukları ölçüt etiketleriyle birlikte tutulduğu tek listeyi,",
                    en: "the single list in which all evidence submitted in the application is held together with the criterion tags to which it is linked,",
                  },
                },
                {
                  terim: {
                    tr: "Kapsam Genişletme",
                    en: "Scope Extension",
                  },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi sahibi bir kuruluşun, yetkilendirildiği veya tanındığı mevcut bilim alanlarına ya da program düzeylerine yeni alanlar veya düzeyler eklemesi sürecini,",
                    en: "the process by which an organisation holding a Quality Evaluation Registration Certificate or a Quality Evaluation Recognition Certificate adds new fields or levels to the fields of science or programme levels for which it is authorised or recognised,",
                  },
                },
                {
                  terim: {
                    tr: "Kapsam genişletme başvurusu",
                    en: "Scope extension application",
                  },
                  metin: {
                    tr: "Kuruluşun, tescil veya tanınma kapsamını genişletmek amacıyla başvuru sistemi üzerinden Kurula yaptığı resmî müracaatı,",
                    en: "the formal application made by the Organisation to the Council through the application system in order to extend the scope of its registration or recognition,",
                  },
                },
                {
                  terim: {
                    tr: "Kayıtlı Elektronik Posta (KEP)",
                    en: "Registered Electronic Mail (KEP)",
                  },
                  metin: {
                    tr: "Gönderici ve alıcı kimliklerinin net bir şekilde doğrulanabildiği, iletinin gönderilme ve teslim alınma zamanlarının kanuni olarak belgelenebildiği ve içeriğin iletim sırasında değiştirilemediğinin teknik olarak güvence altına alındığı, hukuken geçerli delil niteliği taşıyan güvenli elektronik iletim sistemini,",
                    en: "the secure electronic transmission system constituting legally valid evidence, in which the identities of the sender and the recipient can be clearly verified, the times of dispatch and receipt of the message can be documented in law, and it is technically guaranteed that the content has not been altered during transmission,",
                  },
                },
                {
                  terim: { tr: "Kılavuz", en: "Guide" },
                  metin: {
                    tr: "Yükseköğretim Programları ve Kontenjanları Kılavuzunu (YKS),",
                    en: "the Higher Education Programmes and Quotas Guide (YKS),",
                  },
                },
                {
                  terim: { tr: "Komisyon", en: "Commission" },
                  metin: {
                    tr: "Dış Değerlendirme ve Akreditasyon Kuruluşlarının Tanınması ve Yetkilendirilmesi Komisyonunu,",
                    en: "the Commission for the Recognition and Authorisation of External Evaluation and Accreditation Organisations,",
                  },
                },
                {
                  terim: { tr: "Kurul", en: "Council" },
                  metin: {
                    tr: "Yükseköğretim Kalite Kurulunu,",
                    en: "the Turkish Higher Education Quality Council,",
                  },
                },
                {
                  terim: { tr: "Kuruluş", en: "Organisation" },
                  metin: {
                    tr: "Yurt içinde veya yurt dışında dış değerlendirme ve akreditasyon faaliyeti gösteren kurum ve kuruluşları,",
                    en: "institutions and organisations carrying out external evaluation and accreditation activities within the country or abroad,",
                  },
                },
                {
                  terim: { tr: "MİS", en: "MİS" },
                  metin: {
                    tr: "Kuruluşların başvuru, değerlendirme ve izleme süreçlerinin yürütüldüğü, YÖKAK Bilgi Yönetim Sistemi olarak da anılan çevrim içi sistemi,",
                    en: "the online system, also referred to as the YÖKAK Information Management System, through which the application, evaluation and monitoring processes of Organisations are carried out,",
                  },
                },
                {
                  terim: { tr: "Ölçütler", en: "Criteria" },
                  metin: {
                    tr: "Yetkilendirilme veya tanınma amacıyla başvuru yapan kuruluşların sağlamaları gereken temel standartları ve prensipleri,",
                    en: "the fundamental standards and principles that organisations applying for authorisation or recognition are required to meet,",
                  },
                },
                {
                  terim: { tr: "Öz Değerlendirme Raporu", en: "Self-Evaluation Report" },
                  metin: {
                    tr: "Ulusal ya da uluslararası dış değerlendirme ve akreditasyon kuruluşlarının yetkilendirilmesine ve tanınmasına ilişkin ölçütlerin kuruluş tarafından karşılandığına ilişkin kanıtlarla başvuru ekranı üzerinden hazırlanan Öz Değerlendirme Raporunu,",
                    en: "the Self-Evaluation Report prepared through the application screen, with the evidence that the criteria for the authorisation of national or the recognition of international external evaluation and accreditation organisations are met by the organisation,",
                  },
                },
                {
                  terim: { tr: "Program", en: "Programme" },
                  metin: {
                    tr: "Kuruluşlar tarafından yapılacak akreditasyon ve değerlendirmeye konu olan yükseköğretim programını,",
                    en: "the higher education programme that is the subject of the accreditation and evaluation to be carried out by Organisations,",
                  },
                },
                {
                  terim: { tr: "Program Akreditasyonu", en: "Programme Accreditation" },
                  metin: {
                    tr: "Kuruluş tarafından belirli bir alanda önceden belirlenmiş, akademik ve alana özgü standartların bir yükseköğretim programı tarafından karşılanıp karşılanmadığını ölçen dış değerlendirme ve kalite güvencesi sürecini,",
                    en: "the external evaluation and quality assurance process that measures whether a higher education programme meets the academic and field-specific standards predetermined by the Organisation in a given field,",
                  },
                },
                {
                  terim: { tr: "Raportör", en: "Rapporteur" },
                  metin: {
                    tr: "Kuruluşların başvurularına ilişkin değerlendirme raporunu hazırlayan ve Komisyona sunan personeli,",
                    en: "the member of staff who prepares the evaluation report on the applications of Organisations and submits it to the Commission,",
                  },
                },
                {
                  terim: {
                    tr: "Taslak Başvuru Değerlendirme Raporu",
                    en: "Draft Application Evaluation Report",
                  },
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi için müracaat eden Kuruluşun başvurusu incelenerek görevli personel tarafından hazırlanan taslak raporu,",
                    en: "the draft report prepared by the responsible member of staff upon examination of the application of an Organisation applying for a Quality Evaluation Registration Certificate or a Quality Evaluation Recognition Certificate,",
                  },
                },
                {
                  terim: {
                    tr: "Tescil/Tanınma Bedeli",
                    en: "Registration/Recognition Fee",
                  },
                  metin: {
                    tr: "Kuruluşların Kurul banka hesabına yatırmakla yükümlü olduğu parasal değeri,",
                    en: "the monetary amount that Organisations are obliged to pay into the Council's bank account,",
                  },
                },
              ],
            },
            {
              tip: "p",
              metin: {
                tr: "ifade eder.",
                en: "shall have the meanings given above.",
              },
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM I ================== */
    {
      id: "bolum-1",
      tur: "bolum",
      no: "I",
      baslik: { tr: "Yetkilendirme ve Tanınma Süreci", en: "Authorisation and Recognition Process" },
      kisimlar: [
        {
          id: "k1",
          no: "1",
          baslik: { tr: "Değerlendirme Ölçütleri", en: "Evaluation Criteria" },
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Değerlendirme ölçütleri, yetkilendirme başvurusunda bulunan ulusal kuruluşların ve tanınma başvurusunda bulunan uluslararası kuruluşların sağlaması gereken temel standartları ve ilkeleri ifade eder. Ölçütler, açıklamaları ve beklenen kanıtlarıyla birlikte EK 1'de yer alır.",
                en: "The evaluation criteria express the fundamental standards and principles that national organisations applying for authorisation and international organisations applying for recognition are required to meet. The criteria, together with their explanations and expected evidence, are set out in ANNEX 1.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Ölçütler ESG'nin üçüncü ve ikinci bölümlerinden türetilmiştir. Üçüncü bölüm kuruluşun kendisine — yapısına, bağımsızlığına, kaynaklarına ve iç kalite güvencesine — ilişkindir. İkinci bölüm ise kuruluşun yürüttüğü dış kalite güvencesi süreçlerinin nasıl tasarlandığına ve uygulandığına ilişkindir. Bir kuruluşun yetkilendirilebilmesi için her iki alanda da yeterlilik göstermesi beklenir.",
                en: "The criteria are derived from Parts 3 and 2 of the ESG. Part 3 concerns the organisation itself — its structure, independence, resources and internal quality assurance. Part 2 concerns how the external quality assurance processes operated by the organisation are designed and applied. An organisation is expected to demonstrate adequacy in both areas in order to be authorised.",
              },
            },
            {
              tip: "not",
              tur: "bilgi",
              baslik: { tr: "ESG'nin birinci bölümü", en: "Part 1 of the ESG" },
              metin: {
                tr: "ESG'nin birinci bölümü, yetkilendirme metodolojisinde doğrudan ölçüt değildir. Bu bölüm ESG 2.1 gereği, kuruluşun akreditasyon faaliyetlerinde kullandığı kendi ölçütlerinin programın iç kalite güvencesi alanını ne ölçüde kapsadığının değerlendirilmesinde kullanılır ve başvuruda ayrıca ele alınır.",
                en: "Part 1 of the ESG is not itself a criterion in the authorisation methodology. Pursuant to ESG 2.1, it is used to assess the extent to which the organisation's own criteria, applied in its accreditation activities, cover the field of internal quality assurance of the programme, and it is addressed separately in the application.",
              },
            },
          ],
        },
        {
          id: "k2",
          no: "2",
          baslik: { tr: "Başvuru Süreci", en: "Application Process" },
          bloklar: [],
          altKisimlar: [
            {
              id: "k2-0",
              no: "2.1",
              baslik: { tr: "Başvuru Türleri", en: "Types of Application" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, başvurularının niteliğini başvuru sırasında beyan eder. Beyan edilen nitelik, başvuruda istenen bilgi ve belgeleri ve değerlendirmede dikkate alınacak hususları belirler.",
                    en: "Organisations declare the nature of their application at the time of application. The declared nature determines the information and documents required in the application and the matters to be taken into account in the evaluation.",
                  },
                },
                {
                  tip: "tablo",
                  basliklar: {
                    tr: ["Başvuru türü", "Kapsamı", "Ayrıca dikkate alınanlar"],
                    en: ["Type of application", "Coverage", "Additionally considered"],
                  },
                  satirlar: [
                    {
                      tr: [
                        "İlk başvuru",
                        "Kuruluşun ilk kez Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi talep etmesi.",
                        "—",
                      ],
                      en: [
                        "First application",
                        "The organisation requests a Quality Evaluation Registration Certificate or a Quality Evaluation Recognition Certificate for the first time.",
                        "—",
                      ],
                    },
                    {
                      tr: [
                        "Yenileme başvurusu",
                        "Mevcut belgenin geçerlilik süresinin uzatılması.",
                        "Belge süresi boyunca sunulan Faaliyet Raporları ile İzleme Raporları.",
                      ],
                      en: [
                        "Renewal application",
                        "Extension of the period of validity of an existing certificate.",
                        "The Activity Reports and Monitoring Reports submitted during the certificate period.",
                      ],
                    },
                    {
                      tr: [
                        "Kapsam genişletme",
                        "Yürürlükteki belgenin süresi içinde, kapsama yeni program veya öğretim düzeyi eklenmesi. Yalnızca kapsam beyanı ve eklenen programlara ilişkin destekleyici bölümler doldurulur.",
                        "Yürürlükteki belgenin kapsamı ve o kapsamdaki izleme bulguları.",
                      ],
                      en: [
                        "Scope extension",
                        "Addition of new programmes or levels of study to the scope, within the period of the certificate in force. Only the scope declaration and the supporting sections relating to the programmes being added are completed.",
                        "The scope of the certificate in force and the monitoring findings within that scope.",
                      ],
                    },
                  ],
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Başvuru türü ne olursa olsun, bu Kılavuzda yer alan başvuru, değerlendirme ve karar süreçleri aynı şekilde uygulanır. Yenileme ve kapsam genişletme başvurularında, önceki Kurul kararının tarihi ve sayısı da beyan edilir.",
                    en: "Whatever the type of application, the application, evaluation and decision processes set out in this Guide apply in the same manner. In renewal and scope extension applications, the date and number of the previous Council decision shall also be declared.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi yenileme başvurularını, mevcut sürenin bitiminden üç ay önce tamamlamış olmalıdır. Süresi içerisinde yenileme başvurusunu yapmayan kuruluşlar altı ay süreyle başvuru yapamaz. Yenileme kararı, bir önceki tescil süresinin bitiminden itibaren geçerli olacak şekilde Kurul tarafından verilir.",
                    en: "Organisations shall have completed their applications for renewal of the Quality Evaluation Registration Certificate or the Quality Evaluation Recognition Certificate three months before the expiry of the current period. Organisations that do not submit their renewal application within that period may not apply for a period of six months. The renewal decision shall be taken by the Council so as to take effect from the expiry of the previous registration period.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kapsam genişletme başvurusu, yalnızca kapsama eklenmek istenen yeni program ve öğretim düzeylerine ilişkindir. Bu başvuru, kuruluş tarafından, ilk tescil veya tanınma belgesinin alındığı tarihten itibaren birinci yılın sonundan başlayarak mevcut belge süresinin dolmasına altı ay kalıncaya kadar başvuru sistemi üzerinden yapılır. İki yıl süreli tescil belgesi almış olan kuruluşlar, bu süre içerisinde kapsam genişletme başvurusunda bulunamaz.",
                    en: "A scope extension application concerns only the new programmes and levels of study to be added to the scope. Such an application is submitted by the organisation through the application system from the end of the first year following the date on which the first registration or recognition certificate was obtained until six months before the expiry of the current certificate. Organisations that have been granted a two-year registration certificate may not apply for a scope extension during that period.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kapsam genişletme başvurusunda kuruluş, yalnızca kapsam beyanını ve eklenen programlara ilişkin destekleyici bölümleri doldurur; kuruluşun kimliği, yasal statüsü, yönetişimi ile ESG'nin üçüncü ve ikinci bölümlerine ilişkin bilgiler yürürlükteki başvurudan devralınır. Kapsam genişletme kararı, yürürlükteki belgenin süresini değiştirmez.",
                    en: "In a scope extension application the organisation completes only the scope declaration and the supporting sections relating to the programmes being added; the identity, legal status and governance of the organisation and the information relating to Parts 3 and 2 of the ESG are carried over from the application in force. A scope extension decision does not alter the period of the certificate in force.",
                  },
                },
              ],
            },
            {
              id: "k2-1",
              no: "2.2",
              baslik: {
                tr: "Ulusal Kuruluşların Başvuru Süreci",
                en: "Application Process for National Organisations",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi almak üzere başvuracak kuruluşlar, başvurularını MİS üzerinden elektronik olarak yaparlar. Başvuru, sistemde bir kullanıcı oluşturulmasının ardından açılan yapılandırılmış başvuru formu doldurulmak suretiyle hazırlanır.",
                    en: "Organisations applying for a Quality Evaluation Registration Certificate submit their applications electronically through MİS. The application is prepared by completing the structured application form that becomes available once a user has been created in the system.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Başvuruda aşağıdaki bilgi ve belgelerin eksiksiz olarak yer alması gerekir:",
                    en: "The application shall include the following information and documents in full:",
                  },
                },
                {
                  tip: "liste",
                  ogeler: [
                    {
                      tr: "İmza yetkisi bulunan kişi tarafından imzalanmış niyet mektubu,",
                      en: "a letter of intent signed by a person authorised to sign,",
                    },
                    {
                      tr: "Kuruluşun kimlik bilgileri, hukuki statüsü ve ilgili sicil numaraları,",
                      en: "the identity details, legal form and relevant registry numbers of the organisation,",
                    },
                    {
                      tr: "Kanunen yetkilendirilmiş otoritelerce verilen resmî kuruluş ve tescil dokümanları,",
                      en: "official founding and registration documents issued by legally authorised authorities,",
                    },
                    {
                      tr: "Kuruluşun kısa tarihçesi ve yürüttüğü faaliyetler,",
                      en: "a brief history of the organisation and the activities it carries out,",
                    },
                    {
                      tr: "EK 1'deki her bir ölçüt için kuruluşun uygulamasını anlatan açıklamalar ve bu açıklamaları destekleyen kanıtlar,",
                      en: "for each criterion in ANNEX 1, explanations describing the organisation's practice together with the evidence supporting them,",
                    },
                    {
                      tr: "Akreditasyon faaliyeti yürütülmek istenen programların kapsam beyanı,",
                      en: "the declaration of scope for the programmes in which accreditation activity is intended,",
                    },
                    {
                      tr: "EK 6'da yer alan taahhüt ve beyanlar.",
                      en: "the undertakings and declarations set out in ANNEX 6.",
                    },
                  ],
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Niyet mektubunun iletilmesinde 2.3'te belirtilen usul uygulanır.",
                    en: "The procedure set out in 2.3 applies to the submission of the letter of intent.",
                  },
                },
                {
                  tip: "not",
                  tur: "degisiklik",
                  baslik: { tr: "Öz Değerlendirme Raporu", en: "Self-Evaluation Report" },
                  metin: {
                    tr: "Öz Değerlendirme Raporu ayrı bir belge olarak düzenlenmez. Ölçütlere ilişkin açıklamalar ve bunları destekleyen kanıtlar başvuru formunun kendisinde toplanır; rapor bu formdan üretilir.",
                    en: "The Self-Evaluation Report is not drawn up as a separate document. Explanations relating to the criteria and the evidence supporting them are gathered within the application form itself; the report is produced from that form.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesinin yenilenmesine ilişkin başvurularda da bu Kılavuzda yer alan başvuru, değerlendirme ve karar süreçleri aynı şekilde uygulanır.",
                    en: "The application, evaluation and decision processes set out in this Guide apply in the same manner to applications for the renewal of the Quality Evaluation Registration Certificate.",
                  },
                },
              ],
            },
            {
              id: "k2-2",
              no: "2.3",
              baslik: {
                tr: "Uluslararası Kuruluşların Başvuru Süreci",
                en: "Application Process for International Organisations",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Uluslararası kuruluşların tanınmasına ilişkin başvurular, kuruluşun kendisi tarafından yapılır. Başvuru, tanınma niyet mektubu ile birlikte MİS üzerinden elektronik olarak Kurula iletilir.",
                    en: "Applications for the recognition of international organisations are made by the organisation itself. The application, together with a letter of intent for recognition, is submitted to the Council electronically through MİS.",
                  },
                },
                {
                  tip: "not",
                  tur: "bilgi",
                  baslik: { tr: "Niyet mektubunun iletilmesi", en: "Submission of the letter of intent" },
                  metin: {
                    tr: "Niyet mektubu başvuru formu üzerinden PDF olarak yüklenir. Formdan yüklenmesi tek başına yeterli değildir: mektup, ayrıca resmî yazı ile de Kurula iletilmelidir. Her iki iletim de tamamlanmadan başvuru ön değerlendirmeye alınmaz.",
                    en: "The letter of intent is uploaded as a PDF through the application form. Uploading it through the form alone is not sufficient: the letter must also be submitted to the Council by official correspondence. An application is not taken into preliminary review until both submissions are complete.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Başvuruda, EK 1'de yer alan ölçütlerin tamamı için gerekli açıklamalar yapılır ve her ölçüte ilişkin kanıtlar sunulur. Kuruluşun kurulduğu ülkedeki hukuki statüsü ile varsa uluslararası kalite güvencesi ağlarındaki üyelik ve tescil durumları da belirtilir.",
                    en: "In the application, the necessary explanations shall be given for all criteria set out in ANNEX 1 and evidence shall be submitted for each criterion. The legal status of the organisation in its country of establishment and, where applicable, its memberships and registrations in international quality assurance networks shall also be stated.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Başvuru formu Türkçe veya İngilizce olarak doldurulabilir. Sunulan kanıtların Türkçe veya İngilizce dışında bir dilde olması hâlinde, ilgili bölümlerin çevirisi eklenir.",
                    en: "The application form may be completed in Turkish or English. Where the evidence submitted is in a language other than Turkish or English, a translation of the relevant sections shall be attached.",
                  },
                },
              ],
            },
            {
              id: "k2-3",
              no: "2.4",
              baslik: {
                tr: "Akreditasyon Kapsamının Beyanı",
                en: "Declaration of the Accreditation Scope",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, akreditasyon faaliyeti yürütmek istedikleri programları ve bu programların öğretim düzeylerini başvuruda açıkça beyan eder. Beyan, ISCED-F 2013 sınıflandırmasına göre yapılır; her program, ait olduğu geniş alan ve ayrıntılı alan kodlarıyla birlikte belirtilir.",
                    en: "Organisations shall clearly declare in the application the programmes in which they intend to carry out accreditation activity and the levels of study of those programmes. The declaration is made according to the ISCED-F 2013 classification; each programme is stated together with the broad field and detailed field codes to which it belongs.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Öğretim düzeyi olarak ön lisans, lisans, yüksek lisans ve doktora düzeyleri ayrı ayrı beyan edilir. Yetkilendirme veya tanınma, yalnızca beyan edilen program ve düzeyler için geçerlidir.",
                    en: "The levels of associate, bachelor's, master's and doctoral study shall be declared separately. Authorisation or recognition is valid only for the programmes and levels declared.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kapsamın genişletilmesi, yeni bir başvuruya konu olur. Kapsam dışındaki bir programda yürütülen akreditasyon faaliyeti, bu Kılavuz kapsamında tanınmaz.",
                    en: "Any extension of the scope shall be the subject of a new application. Accreditation activity carried out in a programme outside the scope is not recognised under this Guide.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "k3",
          no: "3",
          baslik: { tr: "Değerlendirme Süreci", en: "Evaluation Process" },
          bloklar: [],
          altKisimlar: [
            {
              id: "k3-1",
              no: "3.1",
              baslik: {
                tr: "Komisyonun Oluşumu ve Görevleri",
                en: "Composition and Duties of the Commission",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Dış Değerlendirme ve Akreditasyon Kuruluşlarının Tanınması ve Yetkilendirilmesi Komisyonu; ikisi Kurul üyesi, ikisi YÖKAK uzmanı veya uzman yardımcısı, biri Kurulda çalışan diğer personel olmak üzere toplam beş üyeden oluşur. Üyelerden biri komisyona başkanlık eder.",
                    en: "The Commission for the Recognition and Authorisation of External Evaluation and Accreditation Organisations consists of five members in total: two members of the Council, two YÖKAK experts or assistant experts, and one other member of staff working at the Council. One of the members chairs the commission.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Komisyon salt çoğunlukla toplanır ve üye tam sayısının salt çoğunluğu ile karar alır.",
                    en: "The Commission meets with an absolute majority and takes its decisions by an absolute majority of its full membership.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Komisyonun görevleri şunlardır:",
                    en: "The duties of the Commission are as follows:",
                  },
                },
                {
                  tip: "liste",
                  tur: "harf",
                  ogeler: [
                    {
                      tr: "Raportör tarafından başvurulara ilişkin hazırlanan taslak başvuru değerlendirme raporunu incelemek ve komisyonun kanaatini de içerecek şekilde hazırlanan Başvuru Değerlendirme Raporunu Kurula sunmak,",
                      en: "to examine the draft application evaluation report prepared by the rapporteur in respect of applications and to submit to the Council the Application Evaluation Report drawn up so as to include the Commission's opinion,",
                    },
                    {
                      tr: "İzleme Yetkilisi tarafından hazırlanan raporu inceleyerek İzleme Raporunu ve İzleme Yetkilisinin önerisine ilişkin oluşan komisyon kanaatini Kurula sunmak,",
                      en: "to examine the report prepared by the Monitoring Officer and to submit to the Council the Monitoring Report together with the Commission's opinion on the Monitoring Officer's proposal,",
                    },
                    {
                      tr: "Akredite programlara ilişkin bilgilerin YÖK'e iletilmesini Kurula sunmak.",
                      en: "to submit to the Council the transmission to the Council of Higher Education (YÖK) of information concerning accredited programmes.",
                    },
                  ],
                },
              ],
            },
            {
              id: "k3-2",
              no: "3.2",
              baslik: {
                tr: "Değerlendirme Aşamaları",
                en: "Stages of the Evaluation",
              },
              bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Kuruluşların başvurularına ilişkin değerlendirme süreci; ön değerlendirme, başvuru değerlendirme raporunun hazırlanması ve karar olmak üzere üç aşamadan oluşur.",
                en: "The evaluation process for applications consists of three stages: preliminary review, preparation of the application evaluation report, and decision.",
              },
            },
            {
              tip: "asama",
              ogeler: [
                {
                  baslik: { tr: "Ön değerlendirme", en: "Preliminary review" },
                  sure: { tr: "15 gün", en: "15 days" },
                  metin: {
                    tr: "Başvurunun ön değerlendirmesi Kurul personeli tarafından 15 gün içerisinde gerçekleştirilir. Eksik bilgi veya belge bulunması hâlinde ilgili kuruluştan 30 gün içerisinde eksikliklerin giderilmesi istenir. Eksiklikleri tamamlanmayan başvurular değerlendirmeye alınmaz.",
                    en: "The preliminary review of the application is carried out by Council staff within 15 days. Where information or documents are missing, the organisation concerned is requested to remedy the deficiencies within 30 days. Applications whose deficiencies are not remedied are not taken into evaluation.",
                  },
                },
                {
                  baslik: {
                    tr: "Başvuru değerlendirme raporunun hazırlanması",
                    en: "Preparation of the application evaluation report",
                  },
                  sure: { tr: "30 gün", en: "30 days" },
                  metin: {
                    tr: "Ön değerlendirmede uygun görülen başvuru Komisyona iletilir. Komisyon başvuruyu 30 gün içerisinde inceler ve kanaatini de içeren başvuru değerlendirme raporunu hazırlayarak Kurula sunar. Komisyon, incelemede EK 1'deki ölçütleri kullanır; ölçütlerin karşılanma düzeyi raporda yer alır.",
                    en: "An application found suitable at the preliminary review is forwarded to the Commission. The Commission examines the application within 30 days and prepares the application evaluation report, including its opinion, for submission to the Council. In its examination the Commission uses the criteria in ANNEX 1; the level to which the criteria are met is stated in the report.",
                  },
                },
                {
                  baslik: { tr: "Karar", en: "Decision" },
                  sure: { tr: "—", en: "—" },
                  metin: {
                    tr: "Başvuru değerlendirme raporu, Kurul toplantısı öncesinde Kurul üyeleriyle paylaşılır; başvuru Kurul gündemine alınır ve karara bağlanır.",
                    en: "The application evaluation report is shared with the members of the Council before the Council meeting; the application is placed on the Council's agenda and decided upon.",
                  },
                },
              ],
            },
            {
              tip: "p",
              metin: {
                tr: "Ölçütlere ilişkin değerlendirme “Karşılanıyor”, “Kısmen karşılanıyor” ve “Karşılanmıyor” olarak yapılır. “Kısmen karşılanıyor” ve “Karşılanmıyor” olarak değerlendirilen ölçütler için raporda tavsiyelere de yer verilir.",
                en: "The assessment of each criterion is expressed as “Met”, “Partially met” or “Not met”. For criteria assessed as “Partially met” or “Not met”, the report shall also include recommendations.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Kurul veya Komisyon, gerekli gördüğü durumlarda kuruluşun faaliyetlerini yerinde inceleyebilir ve ilave kanıt talep edebilir.",
                en: "Where it deems necessary, the Council or the Commission may examine the activities of the organisation on site and may request additional evidence.",
              },
            },
              ],
            },
            {
              id: "k3-3",
              no: "3.3",
              baslik: {
                tr: "EQAR Kaydı Bulunan Kuruluşların Değerlendirilmesi",
                en: "Evaluation of Organisations Holding an EQAR Registration",
              },
              bloklar: [
                {
                  tip: "fikralar",
                  ogeler: [
                    {
                      tr: "Başvuru tarihi itibarıyla EQAR kaydı geçerli olan kuruluşlar, ESG Bölüm 2 ve Bölüm 3'e ilişkin başvuru formu alanlarını doldurmak yerine, EQAR kaydına esas olan güncel dış değerlendirme raporunu ve EQAR kayıt bilgilerini başvuru sistemine yükleyebilir. Bu imkândan yararlanılabilmesi için sunulan raporun EQAR'a kayıtlı bir ajans tarafından hazırlanmış ve başvuru tarihi itibarıyla en az bir yıl geçerli olması gerekir. Kuruluş, muaf tutulan alanları dilerse yine de doldurabilir; bu alanlar başvurunun tamamlanma oranına dâhil edilmez.",
                      en: "Organisations whose EQAR registration is valid as at the date of application may, instead of completing the application form fields relating to Parts 2 and 3 of the ESG, upload to the application system the current external review report on which the EQAR registration is based, together with the EQAR registration details. In order to benefit from this option, the report submitted must have been produced by an EQAR-registered agency and must be valid for at least one year from the date of application. The organisation may nonetheless complete the exempted fields if it wishes; those fields are excluded from the completion rate of the application.",
                    },
                    {
                      tr: "Bu uygulama, kuruluşun ESG Bölüm 2 ve Bölüm 3 hükümlerine uyma veya bunlara ilişkin değerlendirmeden geçme yükümlülüğünü ortadan kaldırmaz. İlgili ölçütlere uygunluk, kuruluş tarafından sunulan dış değerlendirme raporu ve gerektiğinde talep edilen ek bilgi ve kanıtlar üzerinden Komisyon tarafından incelenir.",
                      en: "This does not remove the organisation's obligation to comply with the provisions of Parts 2 and 3 of the ESG or to undergo evaluation against them. Compliance with the relevant criteria is examined by the Commission on the basis of the external review report submitted by the organisation and, where necessary, such additional information and evidence as may be requested.",
                    },
                    {
                      tr: "Sunulan raporun kuruluşun başvuru kapsamındaki faaliyetlerini veya ESG Bölüm 2 ve Bölüm 3 ölçütlerini yeterli ölçüde kapsamaması, güncelliğini yitirmiş olması ya da değerlendirme için gerekli bilgileri içermemesi hâlinde kuruluştan ilgili başvuru alanlarını doldurması veya ek bilgi ve kanıt sunması istenir.",
                      en: "Where the report submitted does not sufficiently cover the organisation's activities within the scope of the application or the criteria of Parts 2 and 3 of the ESG, where it has become out of date, or where it does not contain the information necessary for the evaluation, the organisation is required to complete the relevant application fields or to submit additional information and evidence.",
                    },
                    {
                      tr: "EQAR kaydının geçerlilik bitiş tarihi, Kurul tarafından verilen Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesinin geçerlilik bitiş tarihinden önce ise, belge geçerliliği EQAR kayıt süresiyle sınırlı olarak tesis edilir.",
                      en: "Where the expiry date of the EQAR registration falls before the expiry date of the Quality Evaluation Registration Certificate or the Quality Evaluation Recognition Certificate issued by the Council, the validity of the certificate is established as limited to the period of the EQAR registration.",
                    },
                    {
                      tr: "Kuruluşun EQAR kaydının yenilenmesi hâlinde kuruluş, yeni kayıt döneminin başlangıç ve bitiş tarihlerini ve yenilemeye esas dış değerlendirme raporunu, mevcut EQAR kaydının sona ermesinden önce “Kapsam Genişletme Başvurusu” aracılığıyla sisteme yükler. Bu başvuruda, kapsam genişletme için 2.1'de öngörülen süre koşulları uygulanmaz. Komisyon tarafından yapılacak inceleme sonucunda Kurul, kuruluşun tescil veya tanınma belgesinin geçerlilik süresinin daha önce verilen karar süresini aşmamak üzere devamına karar verebilir.",
                      en: "Where the organisation's EQAR registration is renewed, the organisation shall upload to the system, before the expiry of its current EQAR registration, the start and end dates of the new registration period and the external review report on which the renewal is based, by means of a “Scope Extension Application”. The time conditions laid down for scope extension in 2.1 do not apply to such an application. Following the examination to be carried out by the Commission, the Council may decide that the period of validity of the organisation's registration or recognition certificate shall continue, provided that it does not exceed the period of the decision previously taken.",
                    },
                    {
                      tr: "Kuruluşun beşinci fıkrada belirtilen başvuruyu süresi içinde yapmaması veya EQAR kaydının yenilenmemesi hâlinde, EQAR kaydına bağlı olarak verilen tescil veya tanınma belgesi, kuruluşun EQAR kaydının sona erdiği tarih itibarıyla başka bir işleme gerek kalmaksızın sona erer.",
                      en: "Where the organisation fails to make the application referred to in paragraph five within the period allowed, or where its EQAR registration is not renewed, the registration or recognition certificate issued on the basis of the EQAR registration shall terminate as of the date on which the organisation's EQAR registration ended, without any further action being required.",
                    },
                    {
                      tr: "Kuruluş, EQAR kaydının askıya alınması, geri çekilmesi, kapsamının daraltılması veya sona ermesi dâhil kayıt durumundaki her türlü değişikliği gecikmeksizin Kurula bildirmekle yükümlüdür. Kurul, değişikliğin kuruluşun tescil veya tanınma belgesine etkisini ayrıca değerlendirir.",
                      en: "The organisation is obliged to notify the Council without delay of any change in its registration status, including the suspension, withdrawal, narrowing of the scope, or termination of its EQAR registration. The Council separately assesses the effect of the change on the organisation's registration or recognition certificate.",
                    },
                  ],
                },
                {
                  tip: "not",
                  tur: "bilgi",
                  baslik: { tr: "Ayrıca bkz.", en: "See also" },
                  metin: {
                    tr: "Belge sürelerinin genel kuralları için 4.1 ve 4.2; kapsam genişletme başvurusunun kapsamı ve süreleri için 2.1. Dördüncü fıkra, 4.1 ve 4.2'de öngörülen beş yıllık ve iki yıllık sürelere EQAR kaydından doğan bir üst sınır getirir.",
                    en: "For the general rules on certificate periods see 4.1 and 4.2; for the coverage and time limits of the scope extension application see 2.1. Paragraph four places an upper limit, arising from the EQAR registration, on the five-year and two-year periods provided for in 4.1 and 4.2.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "k4",
          no: "4",
          baslik: { tr: "Karar Süreci", en: "Decision Process" },
          bloklar: [],
          altKisimlar: [
            {
              id: "k4-1",
              no: "4.1",
              baslik: {
                tr: "Ulusal Kuruluşların Yetkilendirilmesine İlişkin Kararlar",
                en: "Decisions on the Authorisation of National Organisations",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Ulusal kuruluşların yetkilendirilmesine ilişkin başvurular hakkında karar vermeye Kurul yetkilidir. Kurul kararını, Komisyon tarafından hazırlanan başvuru değerlendirme raporunu dikkate alarak verir.",
                    en: "The Council is competent to decide on applications for the authorisation of national organisations. The Council takes its decision having regard to the application evaluation report prepared by the Commission.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Yetkilendirme başvuruları hakkında aşağıdaki kararlar verilebilir:",
                    en: "The following decisions may be taken on applications for authorisation:",
                  },
                },
                {
                  tip: "tablo",
                  basliklar: {
                    tr: ["Karar", "Koşul"],
                    en: ["Decision", "Condition"],
                  },
                  satirlar: [
                    {
                      tr: ["Beş yıl süreyle yetkilendirme", "Ölçütlerin tamamı karşılanıyor."],
                      en: ["Authorisation for five years", "All criteria are met."],
                    },
                    {
                      tr: [
                        "İki yıl süreyle yetkilendirme",
                        "Başvuru, kuruluşun ilk yetkilendirme başvurusudur ve ölçütlerden en fazla ikisi kısmen karşılanıyor, diğerlerinin tamamı karşılanıyor.",
                      ],
                      en: [
                        "Authorisation for two years",
                        "The application is the organisation's first application for authorisation and at most two criteria are partially met, all others being met.",
                      ],
                    },
                    {
                      tr: [
                        "Ret",
                        "Ölçütlerden herhangi biri karşılanmıyor, ikiden fazlası kısmen karşılanıyor veya yenileme başvurusunda ölçütlerin tamamı karşılanmıyor.",
                      ],
                      en: [
                        "Rejection",
                        "Any criterion is not met, more than two criteria are partially met, or, in a renewal application, not all the criteria are met.",
                      ],
                    },
                  ],
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi beş yıl veya iki yıl süreyle verilir. İki yıl süreli tescil kararı, kuruluşun ilk yetkilendirme başvurusu sonucunda yapılan değerlendirmede ve tek sefere mahsus olmak üzere verilir. Yenileme başvurularında beş yıl süreyle yetkilendirme kararı verilebilmesi için ölçütlerin tamamının karşılanması gerekir; bu koşulun sağlanmaması hâlinde ret kararı verilir.",
                    en: "The Quality Evaluation Registration Certificate is issued for a period of five years or two years. A two-year registration decision is taken only on the evaluation carried out following the organisation's first application for authorisation, and on one occasion only. In renewal applications, a decision to authorise for five years requires that all the criteria be met; where that condition is not satisfied, the application is rejected.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesinin geçerlilik süresi Kurulun karar tarihi itibarıyla başlar. Yenileme başvurularında Kurul kararı, bir önceki tescil süresinin bitiminden itibaren geçerli olacak şekilde verilir; kararda belirtilen süre bu tarihten itibaren işlemeye başlar.",
                    en: "The period of validity of the Quality Evaluation Registration Certificate begins on the date of the Council's decision. In renewal applications, the Council's decision is taken so as to take effect from the expiry of the previous registration period; the period stated in the decision runs from that date.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Belge alan kuruluşun yöneticisi, EK 5'te yer alan Gizlilik ve Etik Kurallar Beyanını imzalayarak Kurula iletir.",
                    en: "The director of the organisation receiving the certificate shall sign the Declaration of Confidentiality and Ethical Rules set out in ANNEX 5 and submit it to the Council.",
                  },
                },
              ],
            },
            {
              id: "k4-2",
              no: "4.2",
              baslik: {
                tr: "Uluslararası Kuruluşların Tanınmasına İlişkin Kararlar",
                en: "Decisions on the Recognition of International Organisations",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Uluslararası kuruluşların tanınmasına ilişkin başvurular hakkında karar vermeye Kurul yetkilidir. Karar, EK 1'deki ölçütlerin karşılanma düzeyi ile kuruluşun kendi ülkesindeki hukuki statüsü ve uluslararası tanınırlığı dikkate alınarak verilir.",
                    en: "The Council is competent to decide on applications for the recognition of international organisations. The decision is taken having regard to the level to which the criteria in ANNEX 1 are met, together with the legal status of the organisation in its own country and its international standing.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tanınma Belgesi beş yıl süreyle verilir; 4.1'de yer alan iki yıl süreli karar seçeneği tanınma kararlarında uygulanmaz. Ölçütlerin karşılanmasına ilişkin diğer koşullar ile belgenin geçerlilik süresinin başlangıcına ilişkin kurallar tanınma kararlarında da uygulanır. Kalite Değerlendirme Tanınma Belgesi, yalnızca beyan edilen program ve öğretim düzeyleri için geçerlidir.",
                    en: "The Quality Evaluation Recognition Certificate is issued for a period of five years; the two-year decision provided for in 4.1 does not apply to recognition decisions. The other conditions relating to the fulfilment of the criteria, and the rules on when the certificate's period of validity begins, also apply to recognition decisions. The Quality Evaluation Recognition Certificate is valid only for the programmes and levels of study declared.",
                  },
                },
              ],
            },
            {
              id: "k4-3",
              no: "4.3",
              baslik: { tr: "İtiraz ve Şikâyet", en: "Appeals and Complaints" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, Kurulun yetkilendirme ve tanınma kararlarına ilişkin itirazlarını, kararın kendilerine tebliğinden itibaren 30 gün içerisinde yazılı veya elektronik olarak Kurula yaparlar. İtiraz dilekçesinde, itiraz edilen ölçüt ve bu ölçütün karşılandığına ilişkin kanıtlar yer alır.",
                    en: "Organisations shall submit their appeals against the Council's authorisation and recognition decisions to the Council in writing or electronically within 30 days of notification of the decision. The appeal petition shall state the criterion appealed against and the evidence that the criterion is met.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "İtirazlar İtiraz ve Şikâyet Komisyonu tarafından incelenir. Komisyon, kanaatini de içeren İtiraz Değerlendirme Raporunu Kurula sunar. Kurul, söz konusu raporu dikkate alarak itiraz hakkında karar verir ve kararı kuruluşa bildirir.",
                    en: "Appeals are examined by the Appeals and Complaints Commission. The Commission submits to the Council the Appeals Evaluation Report, including its opinion. The Council decides on the appeal having regard to that report and notifies the organisation of its decision.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar ve faaliyetleri hakkında yapılacak itiraz ve şikâyetlere YÖKAK İtiraz ve Şikâyet Yönergesi kapsamında işlem yapılır.",
                    en: "Appeals and complaints concerning organisations and their activities are dealt with under the YÖKAK Appeals and Complaints Directive.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM II ================== */
    {
      id: "bolum-2",
      tur: "bolum",
      no: "II",
      baslik: { tr: "İzleme Sistemi", en: "Monitoring System" },
      kisimlar: [
        {
          id: "k5",
          no: "5",
          baslik: { tr: "Genel Bilgiler", en: "General Information" },
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "İzleme sistemi, Kurul tarafından yetkilendirilen veya tanınan kuruluşlar için geçerlidir. Süreç, kuruluşun belge aldığı tarih itibarıyla başlar ve belgenin geçerlilik süresinin sona ermesiyle tamamlanır. İzleme süreci takvim yılı esas alınarak yıllık olarak yürütülür.",
                en: "The monitoring system applies to organisations authorised or recognised by the Council. The process begins on the date the organisation receives its certificate and ends upon expiry of the certificate's validity. The monitoring process is carried out annually on a calendar-year basis.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Kurul, her bir kuruluşa belge tarihini takip eden bir ay içerisinde bir İzleme Yetkilisi atar. Belge sahibi kuruluşlar, belirlenen takvim doğrultusunda her yıl için Faaliyet Raporu hazırlayarak Kurula sunar.",
                en: "The Council appoints a Monitoring Officer for each organisation within one month following the date of the certificate. Certificate-holding organisations prepare an Activity Report for each year in accordance with the established calendar and submit it to the Council.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "İzleme Yetkilisi tarafından, yıl içindeki saha ziyaretleri ile Faaliyet Raporu dikkate alınarak İzleme Raporu hazırlanır ve Kurula sunulur.",
                en: "The Monitoring Officer prepares a Monitoring Report, having regard to the site visits carried out during the year and to the Activity Report, and submits it to the Council.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Belgenin geçerlilik süresinin uzatılmasında bu Kılavuzda belirtilen başvuru süreci izlenir. Süre uzatımı başvurularında, başvuru bilgilerinin yanı sıra Faaliyet Raporları ile İzleme Raporları da dikkate alınır.",
                en: "The application process set out in this Guide is followed for the extension of the certificate's validity. In applications for extension, the Activity Reports and Monitoring Reports are taken into account in addition to the application information.",
              },
            },
          ],
        },
        {
          id: "k6",
          no: "6",
          baslik: { tr: "Faaliyet Raporu", en: "Activity Report" },
          bloklar: [],
          altKisimlar: [
            {
              id: "k6-1",
              no: "6.1",
              baslik: { tr: "Genel Esaslar", en: "General Principles" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Belge sahibi kuruluşlar, bir önceki takvim yılına ilişkin Faaliyet Raporunu her yılın ocak ayı sonuna kadar MİS üzerinden Kurula sunar. Rapor, EK 3'te yer alan şablona uygun olarak hazırlanır.",
                    en: "Certificate-holding organisations submit to the Council, through MİS, the Activity Report for the preceding calendar year by the end of January each year. The report is prepared in accordance with the template set out in ANNEX 3.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Faaliyet Raporu, kuruluşun belge kapsamındaki tüm akreditasyon faaliyetlerini kapsar. Kapsam dışında yürütülen faaliyetler raporda ayrıca belirtilir.",
                    en: "The Activity Report covers all accreditation activities of the organisation within the scope of its certificate. Activities carried out outside the scope shall be stated separately in the report.",
                  },
                },
              ],
            },
            {
              id: "k6-2",
              no: "6.2",
              baslik: {
                tr: "Faaliyet Raporunun Hazırlanması",
                en: "Preparation of the Activity Report",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Faaliyet Raporunda en az aşağıdaki hususlara yer verilir:",
                    en: "The Activity Report shall include at least the following:",
                  },
                },
                {
                  tip: "liste",
                  ogeler: [
                    {
                      tr: "Yıl içerisinde yürütülen akreditasyon değerlendirmeleri ve alınan kararlar,",
                      en: "the accreditation evaluations carried out and the decisions taken during the year,",
                    },
                    {
                      tr: "7.1'de belirtilen performans ölçütlerine ilişkin mevcut durum ve gelişim,",
                      en: "the current position and development in respect of the performance indicators set out in 7.1,",
                    },
                    {
                      tr: "Değerlendirici havuzundaki değişiklikler ile yürütülen değerlendirici eğitimleri,",
                      en: "changes in the pool of reviewers and the reviewer training carried out,",
                    },
                    {
                      tr: "Kuruluşun ölçütlerinde ve metodolojisinde yapılan değişiklikler,",
                      en: "changes made to the organisation's criteria and methodology,",
                    },
                    {
                      tr: "İtiraz ve şikâyet başvuruları ile bunların sonuçları,",
                      en: "appeals and complaints received and their outcomes,",
                    },
                    {
                      tr: "Uygulanan akreditasyon ücret tarifesi ve mali duruma ilişkin bilgiler.",
                      en: "the accreditation fee tariff applied and information on the financial position.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "k7",
          no: "7",
          baslik: { tr: "İzleme Sisteminin Bileşenleri", en: "Components of the Monitoring System" },
          bloklar: [],
          altKisimlar: [
            {
              id: "k7-1",
              no: "7.1",
              baslik: { tr: "Performans Ölçütleri", en: "Performance Indicators" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluş, aşağıdaki performans ölçütlerini her izleme dönemi için takip eder ve bunlara ilişkin mevcut durumu veya gelişimi yıllık Faaliyet Raporunda sunar.",
                    en: "The organisation monitors the following performance indicators for each monitoring period and presents its current position or development in respect of them in the annual Activity Report.",
                  },
                },
                {
                  tip: "tablo",
                  basliklar: {
                    tr: ["Ölçüt", "Hesaplama"],
                    en: ["Indicator", "Calculation"],
                  },
                  satirlar: [
                    {
                      tr: ["Akreditasyon oranı", "Akredite program sayısı / mezun veren program sayısı"],
                      en: ["Accreditation rate", "Number of accredited programmes / number of programmes with graduates"],
                    },
                    {
                      tr: [
                        "Akreditasyon sürecinin ortalama tamamlanma süresi",
                        "Toplam akreditasyon süresi / hizmet sunulan program sayısı (başvuru ile karar tarihi arasındaki gün sayısı)",
                      ],
                      en: [
                        "Average completion time of the accreditation process",
                        "Total accreditation time / number of programmes served (days between application and decision)",
                      ],
                    },
                    {
                      tr: ["Ortalama değerlendirici sayısı", "Toplam değerlendirici sayısı / toplam aktif program sayısı"],
                      en: ["Average number of reviewers", "Total number of reviewers / total number of active programmes"],
                    },
                    {
                      tr: ["Bilgilendirme toplantısı sayısı", "Yıl içinde düzenlenen toplantı sayısı"],
                      en: ["Number of information meetings", "Number of meetings held during the year"],
                    },
                    {
                      tr: ["Değerlendirici eğitimi sayısı", "Yıl içinde düzenlenen eğitim sayısı"],
                      en: ["Number of reviewer trainings", "Number of trainings held during the year"],
                    },
                  ],
                },
                {
                  tip: "not",
                  tur: "bilgi",
                  metin: {
                    tr: "Birden fazla programda akreditasyon faaliyeti yürüten kuruluşlar, akreditasyon oranını her program için ayrı olarak hesaplar.",
                    en: "Organisations carrying out accreditation activity in more than one programme calculate the accreditation rate separately for each programme.",
                  },
                },
              ],
            },
            {
              id: "k7-2",
              no: "7.2",
              baslik: { tr: "Saha Ziyaretleri", en: "Site Visits" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "İzleme Yetkilisi, kuruluşun faaliyetlerini yerinde incelemek üzere izleme dönemi içerisinde saha ziyareti gerçekleştirebilir. Saha ziyaretinde kuruluşun akreditasyon süreçleri, değerlendirici uygulamaları ve karar mekanizmaları gözlemlenir.",
                    en: "The Monitoring Officer may conduct a site visit during the monitoring period in order to examine the organisation's activities on site. During the site visit, the organisation's accreditation processes, reviewer practices and decision-making mechanisms are observed.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluş, saha ziyareti sırasında talep edilen bilgi ve belgeleri sunmakla yükümlüdür. Saha ziyaretine ilişkin bulgular İzleme Raporunda yer alır.",
                    en: "The organisation is obliged to provide the information and documents requested during the site visit. Findings relating to the site visit are included in the Monitoring Report.",
                  },
                },
              ],
            },
            {
              id: "k7-3",
              no: "7.3",
              baslik: {
                tr: "Program Akreditasyonu Geri Bildirim Formu",
                en: "Programme Accreditation Feedback Form",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Akreditasyon hizmeti alan yükseköğretim kurumlarından, sürece ilişkin görüşlerini bildirmek üzere geri bildirim alınır. Geri bildirimler, kuruluşun izlenmesinde dikkate alınır ve İzleme Raporunda değerlendirilir.",
                    en: "Feedback is obtained from higher education institutions receiving accreditation services in order to convey their views on the process. Feedback is taken into account in the monitoring of the organisation and is assessed in the Monitoring Report.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM III ================== */
    {
      id: "bolum-3",
      tur: "bolum",
      no: "III",
      baslik: { tr: "İdari Esaslar", en: "Administrative Principles" },
      kisimlar: [
        {
          id: "k8",
          no: "8",
          baslik: {
            tr: "Kuruluşların Uyacağı Esaslar",
            en: "Principles to be Observed by Organisations",
          },
          bloklar: [],
          altKisimlar: [
            {
              id: "k8-1",
              no: "8.1",
              baslik: { tr: "Mevzuata Uygunluk", en: "Compliance with Legislation" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, akreditasyon ölçütlerini belirlerken ve uygularken başta 2547 sayılı Yükseköğretim Kanunu olmak üzere yürürlükteki tüm üst mevzuat kurallarına uymak zorundadır. Mevzuata aykırı ölçüt belirlenemez ve uygulanamaz. Yükseköğretim üst kuruluşlarının belirlediği normlara uygunluk bulunması hâlinde, bu nedenle akreditasyonun reddine karar verilemez.",
                    en: "In determining and applying accreditation criteria, Organisations are obliged to comply with all higher-ranking legislation in force, and in particular with Higher Education Act No. 2547. No criterion contrary to the legislation may be set or applied. Where there is conformity with the norms laid down by the higher education supreme bodies, accreditation may not be refused on that ground.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Yükseköğretim kurumlarının, ilgili mevzuat uyarınca atama ve asgari kadro şartlarını yerine getirmiş olması hâlinde kuruluşlar, münferit atama kararlarını veya Kanunun verdiği takdir yetkisinin kullanılma biçimini akreditasyonun reddi için tek başına veya birincil gerekçe olarak kullanamaz.",
                    en: "Where a higher education institution has fulfilled the appointment and minimum staffing requirements under the relevant legislation, Organisations may not rely on individual appointment decisions, or on the manner in which the discretion conferred by the Act has been exercised, as the sole or primary ground for refusing accreditation.",
                  },
                },
              ],
            },
            {
              id: "k8-2",
              no: "8.2",
              baslik: { tr: "Çıkar Çatışması/Çakışması", en: "Conflict of Interest" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Yükseköğretim kurumlarında aktif olarak Rektör veya Genel Sekreterlik görevini yürüten kişiler, Kuruluşların Yönetim Kurulu Başkanlığı veya Akreditasyon Komisyonu Başkanlığı görevini yapamaz.",
                    en: "Persons actively serving as Rector or Secretary General in a higher education institution may not serve as Chair of the Board of Directors or as Chair of the Accreditation Commission of an Organisation.",
                  },
                },
              ],
            },
            {
              id: "k8-3",
              no: "8.3",
              baslik: { tr: "Etik Kurallar", en: "Code of Ethics" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, bunların bünyesindeki karar organlarında görev alan kişiler ve değerlendirme ekipleri; Kurul tarafından hazırlanan ve Kurulun resmî internet sayfasında ilan edilen güncel Yükseköğretim Kalite Kurulu Etik Kurallarına uymakla yükümlüdür.",
                    en: "Organisations, the persons serving on their decision-making bodies and their review teams are obliged to comply with the current Turkish Higher Education Quality Council Code of Ethics, prepared by the Council and published on the Council's official website.",
                  },
                },
              ],
            },
            {
              id: "k8-4",
              no: "8.4",
              baslik: { tr: "Faaliyet Raporu", en: "Activity Report" },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşlar, her yıl ocak ayı sonuna kadar bir önceki yıla ait faaliyetlerini içeren faaliyet raporlarını Kurula sunar.",
                    en: "Organisations submit to the Council, by the end of January each year, their activity reports covering their activities for the preceding year.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM IV ================== */
    {
      id: "bolum-4",
      tur: "bolum",
      no: "IV",
      baslik: { tr: "Program Akreditasyonu", en: "Programme Accreditation" },
      kisimlar: [
        {
          id: "k9",
          no: "9",
          baslik: {
            tr: "Program Akreditasyon Kararları",
            en: "Programme Accreditation Decisions",
          },
          bloklar: [],
          altKisimlar: [
            {
              id: "k9-1",
              no: "9.1",
              baslik: {
                tr: "Akreditasyon Süreleri",
                en: "Periods of Accreditation",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kuruluşların akreditasyon kararının, Yükseköğretim Programları ve Kontenjanları Kılavuzu ve Türkiye Yeterlilikler Çerçevesine eklenmek üzere YÖK'e iletilebilmesi için en az iki yıl geçerlilik süresi olması gerekir.",
                    en: "For an Organisation's accreditation decision to be transmitted to the Council of Higher Education (YÖK) for inclusion in the Higher Education Programmes and Quotas Guide and in the Turkish Qualifications Framework, it must have a validity period of at least two years.",
                  },
                },
                {
                  tip: "p",
                  metin: {
                    tr: "Tam akreditasyon en az beş yıl süreyle, koşullu akreditasyon iki yıl süreyle verilir. Koşullu akreditasyon kararı, bir program için ilk değerlendirmede ve tek sefere mahsus olmak üzere verilebilir.",
                    en: "Full accreditation is granted for at least five years and conditional accreditation for two years. A conditional accreditation decision may be taken only on the first evaluation of a programme, and on one occasion only.",
                  },
                },
              ],
            },
            {
              id: "k9-2",
              no: "9.2",
              baslik: {
                tr: "Belgenin İptali veya Askıya Alınması",
                en: "Cancellation or Suspension of the Certificate",
              },
              bloklar: [
                {
                  tip: "p",
                  metin: {
                    tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi iptal edilen ya da askıya alınan Kuruluşun akredite ettiği ve Kurul tarafından kabul edilmiş programların akreditasyonları, kabul tarihi sonlanıncaya kadar geçerlidir.",
                    en: "The accreditations of programmes that have been accredited by an Organisation whose Quality Evaluation Registration Certificate or Quality Evaluation Recognition Certificate has been cancelled or suspended, and that have been accepted by the Council, remain valid until the accepted period comes to an end.",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "k10",
          no: "10",
          baslik: {
            tr: "Program Akreditasyonunda Kullanılacak Ölçütler",
            en: "Criteria to be Used in Programme Accreditation",
          },
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Kuruluşlar, program akreditasyonunda kullanacakları genel ve özel ölçütleri başvuru sırasında Kurula bildirmek zorundadır.",
                en: "Organisations are obliged to notify the Council, at the time of application, of the general and specific criteria they will use in programme accreditation.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Kullanılacak genel ölçütlerin, Avrupa Yükseköğretim Alanında Kalite Güvencesi İlke ve Standartları Bölüm 1 (ESG 1) ile başlık düzeyinde ilişkisinin başvuru sisteminde tanımlanması zorunludur.",
                en: "The relationship, at heading level, between the general criteria to be used and Part 1 of the Standards and Guidelines for Quality Assurance in the European Higher Education Area (ESG 1) must be defined in the application system.",
              },
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM V ================== */
    {
      id: "bolum-5",
      tur: "bolum",
      no: "V",
      baslik: {
        tr: "Akredite Program Bilgileri",
        en: "Information on Accredited Programmes",
      },
      kisimlar: [
        {
          id: "k11",
          no: "11",
          baslik: {
            tr: "Akredite Program Bilgilerinin Toplanması ve Kabulü",
            en: "Collection and Acceptance of Information on Accredited Programmes",
          },
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Akredite programlara ilişkin bilgilerin toplanması, Komisyonca incelenmesi ve Kurul onayının ardından Yükseköğretim Kuruluna iletilmesi aşağıdaki esaslara göre yürütülür.",
                en: "The collection of information on accredited programmes, its examination by the Commission and, following approval by the Council, its transmission to the Council of Higher Education are carried out in accordance with the following principles.",
              },
            },
            {
              tip: "fikralar",
              ogeler: [
                {
                  tr: "Ulusal kuruluşlar, tescil belgeleri kapsamında akredite ettikleri programlara ilişkin bilgileri, nihai rapor tamamlandıktan sonra MİS'in Program Akreditasyonu modülüne doğru ve eksiksiz olarak yükler.",
                  en: "National organisations upload, accurately and in full, the information on the programmes they have accredited within the scope of their registration certificates to the Programme Accreditation module of MİS, once the final report has been completed.",
                },
                {
                  tr: "Kalite Değerlendirme Tanınma Belgesi sahibi uluslararası kuruluşlar, akredite ettikleri ve mezun vermiş programlar ile üniversitelerin adını ve akreditasyonun başlangıç ve bitiş tarihlerini aynı modüle yükler.",
                  en: "International organisations holding a Quality Evaluation Recognition Certificate upload to the same module the names of the programmes they have accredited that have produced graduates, together with the names of the universities and the start and end dates of the accreditation.",
                },
                {
                  tr: "Kuruluşça girilen bilgiler, MİS'in Program Akreditasyonu modülündeki Üniversite Geri Bildirim menüsü üzerinden ilgili üniversite tarafından kontrol edilir; her program akreditasyonu için ilgili anket cevaplandırılır. Uluslararası kuruluşlarca akredite edilen programların akreditasyon raporu da aynı modüle yüklenir.",
                  en: "The information entered by the organisation is checked by the university concerned through the University Feedback menu in the Programme Accreditation module of MİS, and the relevant survey is completed for each programme accreditation. The accreditation report of programmes accredited by international organisations is also uploaded to the same module.",
                },
                {
                  tr: "Toplanan akredite program verileri ve dokümanları Komisyon tarafından incelenir. Doldurulması gereken bilgileri veya dokümanları eksik ya da yanlış olan programlar, Kurula sunulacak listeye dâhil edilmez.",
                  en: "The accredited programme data and documents collected are examined by the Commission. Programmes whose required information or documents are missing or incorrect are not included in the list to be submitted to the Council.",
                },
                {
                  tr: "Komisyon tarafından oluşturulan akredite program listesi Kurulun onayına sunulur.",
                  en: "The list of accredited programmes drawn up by the Commission is submitted for the approval of the Council.",
                },
                {
                  tr: "Kurul tarafından onaylanan liste, Yükseköğretim Kuruluna yazılı olarak ve web servisi aracılığıyla iletilir.",
                  en: "The list approved by the Council is transmitted to the Council of Higher Education in writing and by means of a web service.",
                },
                {
                  tr: "Akreditasyon bilgileri MİS'in Program Akreditasyonu modülüne 15 Mayıs'a kadar girilen programlara Yükseköğretim Programları ve Kontenjanları Kılavuzunda yer verilir.",
                  en: "Programmes whose accreditation information has been entered into the Programme Accreditation module of MİS by 15 May are included in the Higher Education Programmes and Quotas Guide.",
                },
                {
                  tr: "Akredite program listesi, MİS'in Program Akreditasyonu modülündeki Raporlar menüsünün Akredite Programlar sekmesinde güncel olarak yayımlanır.",
                  en: "The list of accredited programmes is published and kept up to date on the Accredited Programmes tab of the Reports menu in the Programme Accreditation module of MİS.",
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================== BÖLÜM VI ================== */
    {
      id: "bolum-6",
      tur: "bolum",
      no: "VI",
      baslik: { tr: "Mali Hükümler", en: "Financial Provisions" },
      kisimlar: [
        {
          id: "k12",
          no: "12",
          baslik: { tr: "Akreditasyon Ücret Tarifesi", en: "Accreditation Fee Tariff" },
          bloklar: [{ tip: "mali" }],
        },
      ],
    },

    /* ================== EKLER ================== */
    {
      id: "ek-1",
      tur: "ek",
      no: "1",
      baslik: {
        tr: "Değerlendirme Ölçütleri, Açıklamalar ve Beklenen Kanıtlar",
        en: "Evaluation Criteria, Explanations and Expected Evidence",
      },
      kisimlar: [
        {
          id: "ek1-giris",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Aşağıdaki ölçütler, hem ulusal kuruluşların yetkilendirilmesinde hem de uluslararası kuruluşların tanınmasında uygulanır. Her ölçüt için kuruluşun uygulamasını anlatan bir açıklama ve bu açıklamayı destekleyen kanıtlar sunulması beklenir.",
                en: "The following criteria apply both to the authorisation of national organisations and to the recognition of international organisations. For each criterion, an explanation describing the organisation's practice and evidence supporting that explanation are expected.",
              },
            },
            {
              tip: "not",
              tur: "bilgi",
              metin: {
                tr: "“Beklenen kanıtlar” sütunu bağlayıcı bir liste değildir; kuruluşun yapısına ve uygulamasına göre eşdeğer nitelikte başka kanıtlar da sunulabilir.",
                en: "The “Expected evidence” column is not a binding list; other evidence of equivalent nature may be submitted according to the structure and practice of the organisation.",
              },
            },
            { tip: "olcutler" },
          ],
        },
      ],
    },
    {
      id: "ek-2",
      tur: "ek",
      no: "2",
      baslik: {
        tr: "Başvuru, Değerlendirme ve Karar Süreci",
        en: "Application, Evaluation and Decision Process",
      },
      kisimlar: [
        {
          id: "ek2-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Süreç, ulusal ve uluslararası kuruluşlar için aynı aşamalardan oluşur; farklılık başvurunun içeriğindedir.",
                en: "The process consists of the same stages for national and international organisations; the difference lies in the content of the application.",
              },
            },
            { tip: "surec" },
          ],
        },
      ],
    },
    {
      id: "ek-3",
      tur: "ek",
      no: "3",
      baslik: { tr: "Faaliyet Raporu Şablonu", en: "Activity Report Template" },
      kisimlar: [
        {
          id: "ek3-1",
          kaynakBekliyor: true,
          bloklar: [],
        },
      ],
    },
    {
      id: "ek-4",
      tur: "ek",
      no: "4",
      baslik: { tr: "İzleme Süreci", en: "Monitoring Process" },
      kisimlar: [
        {
          id: "ek4-1",
          kaynakBekliyor: true,
          bloklar: [],
        },
      ],
    },
    {
      id: "ek-5",
      tur: "ek",
      no: "5",
      baslik: {
        tr: "Gizlilik ve Etik Kurallar Beyanı",
        en: "Declaration of Confidentiality and Ethical Rules",
      },
      kisimlar: [
        {
          id: "ek5-1",
          kaynakBekliyor: true,
          bloklar: [],
        },
      ],
    },
    {
      id: "ek-6",
      tur: "ek",
      no: "6",
      baslik: { tr: "Taahhüt ve Beyanlar", en: "Undertakings and Declarations" },
      kisimlar: [
        {
          id: "ek6-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "Başvuru sahibi kuruluş, başvuruyu tamamlarken aşağıdaki taahhüt ve beyanların tamamını kabul eder.",
                en: "In completing the application, the applicant organisation accepts all of the following undertakings and declarations.",
              },
            },
            { tip: "beyanlar" },
          ],
        },
      ],
    },
    {
      id: "ek-7",
      tur: "ek",
      no: "7",
      baslik: {
        tr: "Ajansların Program Akreditasyonunda Kullandığı Ölçütlerin ESG Bölüm 1'e Uyumu",
        en: "Alignment of the Criteria Used by Agencies in Programme Accreditation with ESG Part 1",
      },
      kisimlar: [
        {
          id: "ek7-1",
          bloklar: [
            {
              tip: "p",
              metin: {
                tr: "YÖKAK, ulusal program akreditasyonu ölçütü olarak ESG'nin birinci bölümünü kabul etmiştir. Bu ek, söz konusu dokuz standardı EK 1 ile aynı düzende verir; her standart için ölçüt metni, açıklama ve beklenen kanıtlar birlikte sunulur.",
                en: "YÖKAK has adopted Part 1 of the ESG as the national programme accreditation criteria. This Annex sets out those nine standards in the same layout as ANNEX 1; for each standard the text of the criterion, the explanation and the expected evidence are given together.",
              },
            },
            {
              tip: "p",
              metin: {
                tr: "Kuruluşlar, 10. kısım uyarınca kullanacakları genel ölçütlerin bu bölümle başlık düzeyindeki ilişkisini başvuru sisteminde tanımlar. Ölçütlerin ESG'nin birinci bölümünü bütüncül biçimde nasıl karşıladığı ise ESG 2.1 kapsamında ayrıca açıklanır.",
                en: "Pursuant to section 10, Organisations define in the application system the relationship, at heading level, between the general criteria they will use and this Part. How the criteria cover Part 1 of the ESG holistically is explained separately under ESG 2.1.",
              },
            },
            { tip: "olcutler7" },
          ],
        },
      ],
    },
  ],
};

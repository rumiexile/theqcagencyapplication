/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.
   Kaynak: assets/js/esg-data.js + assets/data/evidence-suggestions.js
           + assets/data/yokak-criteria.js
   Yeniden üretmek için: node tools/gen-ek7.js > kilavuz/data/ek7.js
   9 standart · ESG Bölüm 1 */

window.KILAVUZ_EK7 = {
  uretim: "2026-08-14",
  olcutler: [
    {
      sira: 1,
      kod: "1.1",
      baslik: { tr: "Kalite Güvencesi Politikası", en: "Policy for Quality Assurance" },
      olcut: { tr: "Kurumlar; öğrenme, öğretme ve değerlendirmenin kalite güvencesine ilişkin açık bir politikayı, ilgili yapılarla birlikte oluşturmalı, yayımlamalı ve etkili biçimde duyurmalı; bu politika sürekli iyileştirmenin etkili bir döngüsünü oluşturan tutarlı bir sistemi desteklemelidir.",
               en: "Institutions should have in place, publish and effectively communicate a clear policy for quality assurance of learning, teaching and assessment, with associated structures and supporting a coherent system that forms an effective cycle of continuous improvement." },
      yokak: { kod: "1", ad: { tr: "Kalite Güvencesi Politikası ve Yönetişim", en: "Quality Assurance Policy and Governance" } },
    },
    {
      sira: 2,
      kod: "1.2",
      baslik: { tr: "Programların Tasarımı, Onayı, Sürekli İzlenmesi ve Periyodik Gözden Geçirilmesi", en: "Design, approval, ongoing monitoring and periodic review of programmes" },
      olcut: { tr: "Kurumlar; programlarının tutarlı olmasını, güncel akademik ve mesleki gelişmelerle beslenmesini ve amaçlanan öğrenme kazanımlarına güvenilir biçimde ulaşmasını sağlamak üzere programlarının tasarımı, onayı, izlenmesi ve periyodik olarak gözden geçirilmesine yönelik süreçlere sahip olmalıdır.",
               en: "Institutions should have processes for the design, approval, monitoring and periodic review of their programmes to ensure that they are coherent, informed by the latest academic and professional developments, and reliable in leading to the intended learning outcomes." },
      yokak: { kod: "2", ad: { tr: "Programın Tasarımı, Onayı, İzlenmesi ve Güncellenmesi", en: "Design, Approval, Monitoring and Updating of the Programme" } },
    },
    {
      sira: 3,
      kod: "1.3",
      baslik: { tr: "Öğrenci Merkezli Öğrenme, Öğretme ve Değerlendirme", en: "Student-Centred Learning, Teaching and Assessment" },
      olcut: { tr: "Kurumlar, programların öğrencileri öğrenme sürecinin oluşturulmasında etkin rol almaya teşvik edecek biçimde yürütülmesini ve öğrenci değerlendirmesinin bu yaklaşımı yansıtmasını sağlamalıdır.",
               en: "Institutions should ensure that the programmes are delivered in a way that encourages students to take an active role in creating the learning process, and that the assessment of students reflects this approach." },
      yokak: { kod: "3", ad: { tr: "Öğrenci Merkezli Öğrenme, Öğretme ve Ölçme-Değerlendirme", en: "Student-Centred Learning, Teaching and Assessment" } },
    },
    {
      sira: 4,
      kod: "1.4",
      baslik: { tr: "Öğrenci Kabulü, Gelişimi, Tanınma ve Belgelendirme", en: "Student Admission, Progression, Recognition and Certification" },
      olcut: { tr: "Kurumlar; öğrenci kabulü, gelişimi, tanınma ve belgelendirme gibi öğrenci yaşam döngüsünün tüm aşamalarını kapsayan, önceden tanımlanmış ve yayımlanmış düzenlemeleri tutarlı biçimde uygulamalıdır.",
               en: "Institutions should consistently apply pre-defined and published regulations covering all phases of the student life cycle, e.g. student admission, progression, recognition and certification." },
      yokak: { kod: "4", ad: { tr: "Öğrenci Kabulü, İlerlemesi, Tanınma ve Mezuniyet", en: "Student Admission, Progression, Recognition and Graduation" } },
    },
    {
      sira: 5,
      kod: "1.5",
      baslik: { tr: "Öğretim Elemanları", en: "Teaching Staff" },
      olcut: { tr: "Kurumlar, öğretim elemanlarının yetkinliğinden emin olmalıdır. Personelin işe alınması ve geliştirilmesinde adil ve şeffaf süreçler uygulamalıdır.",
               en: "Institutions should assure themselves of the competence of their teaching staff. They should apply fair and transparent processes for the recruitment and development of the staff." },
      yokak: { kod: "5", ad: { tr: "Öğretim Kadrosu ve Eğitim-Öğretimi Destekleyen Personel", en: "Teaching Staff and Staff Supporting Education" } },
    },
    {
      sira: 6,
      kod: "1.6",
      baslik: { tr: "Öğrenme Ortamı ve Kaynaklar", en: "Learning environment and resources" },
      olcut: { tr: "Kurumlar, öğrenme ve öğretme faaliyetleri için uygun finansmana sahip olmalı; yeterli ve kolay erişilebilir öğrenme kaynakları ile öğrenci desteğinin sağlandığından emin olmalıdır.",
               en: "Institutions should have appropriate funding for learning and teaching activities and ensure that adequate and readily accessible learning resources and student support are provided." },
      yokak: { kod: "6", ad: { tr: "Öğrenme Ortamı, Kaynaklar ve Öğrenci Desteği", en: "Learning Environment, Resources and Student Support" } },
    },
    {
      sira: 7,
      kod: "1.7",
      baslik: { tr: "Bilgi Yönetimi", en: "Information Management" },
      olcut: { tr: "Kurumlar; programlarının ve diğer faaliyetlerinin etkili yönetimi için ilgili bilgiyi topladıklarından, çözümlediklerinden ve kullandıklarından emin olmalıdır.",
               en: "Institutions should ensure that they collect, analyse and use relevant information for the effective management of their programmes and other activities." },
      yokak: { kod: "7", ad: { tr: "Bilgi Yönetimi ve Sürekli İyileştirme", en: "Information Management and Continuous Improvement" } },
    },
    {
      sira: 8,
      kod: "1.8",
      baslik: { tr: "Kamuoyunu Bilgilendirme", en: "Public Information" },
      olcut: { tr: "Kurumlar; programları da dâhil olmak üzere faaliyetlerine ilişkin açık, doğru, nesnel, güncel ve kolay erişilebilir bilgileri yayımlamalıdır.",
               en: "Institutions should publish information about their activities, including programmes, which is clear, accurate, objective, up-to-date and readily accessible." },
      yokak: { kod: "8", ad: { tr: "Kamuoyunu Bilgilendirme ve Şeffaflık", en: "Public Information and Transparency" } },
    },
    {
      sira: 9,
      kod: "1.9",
      baslik: { tr: "Periyodik Dış Kalite Güvencesi", en: "Cyclical External Quality Assurance" },
      olcut: { tr: "Kurumlar, ESG ile uyumlu biçimde periyodik olarak dış kalite güvencesi sürecinden geçmelidir.",
               en: "Institutions should undergo external quality assurance in line with the ESG on a cyclical basis." },
      yokak: { kod: "9", ad: { tr: "Dış Kalite Güvencesi (Kurumsal ve/veya Program) ve Akreditasyon Döngüsü", en: "External Quality Assurance (Institutional and/or Programme) and the Accreditation Cycle" } },
    },
  ],
  ortakKanitlar: [
    { tr: "Genel değerlendirme ölçütleri", en: "General evaluation criteria" },
    { tr: "Alana özgü değerlendirme ölçütleri", en: "Field-specific evaluation criteria" },
    { tr: "Ölçütler rehberi", en: "Criteria guide" },
    { tr: "Kuruluşun değerlendirme kılavuzu", en: "The organisation's evaluation handbook" },
    { tr: "İlgili ölçüt kapsamında kurumdan talep edilen kanıt listesi", en: "List of evidence required from the institution under the related criterion" },
  ],
};

/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.
   Kaynak: assets/js/schema.js
   Yeniden üretmek için: node tools/gen-ekler.js > kilavuz/data/ekler.js
   6 mali fıkra · 7 beyan maddesi */

window.KILAVUZ_EKLER = {
  mali: [
    {
      anahtar: "tariff",
      baslik: { tr: "MADDE 12/(1) — Ücret tarifesinin Kurula bildirilmesi ve onaylanması",
                en: "Article 12(1) — Notification and approval of the fee tariff" },
      metin: { tr: "Kuruluşlar, program akreditasyonunda bir program için uygulayacakları akreditasyon ücret tarifesini, her yıl aralık ayının sonuna kadar gerekçeli maliyet raporlarıyla birlikte Kurula bildirmek zorundadır. Tarife, Kurulun onayından sonra geçerlilik kazanır; onaylanmayan veya fahiş fiyat artışı içerdiği tespit edilen tarifeler uygulanamaz. Kurul, gerekli gördüğü durumlarda tarifenin revize edilmesini isteyebilir.",
               en: "Organisations must notify the Board, by the end of December each year, of the accreditation fee tariff they will apply for a programme, together with justified cost reports. The tariff takes effect after the Board's approval; tariffs that are not approved or found to contain excessive increases cannot be applied. The Board may request a revision where it deems necessary." },
    },
    {
      anahtar: "single",
      baslik: { tr: "MADDE 12/(2) — Ülke genelinde tek ücret tarifesi",
                en: "Article 12(2) — A single fee tariff nationwide" },
      metin: { tr: "Her bir Kuruluş için kabul edilmiş akreditasyon ücret tarifesi, ülkemiz sınırları içerisinde tektir. Farklı coğrafi bölge, şehir ya da yükseköğretim kurumu gibi nedenlerle farklı ücret tarifeleri uygulanamaz.",
               en: "The accreditation fee tariff accepted for each organisation is single within the borders of our country. Different fee tariffs cannot be applied on grounds such as geographical region, city or higher education institution." },
    },
    {
      anahtar: "publish",
      baslik: { tr: "MADDE 12/(3) — Ücret tarifesinin web sitesinde yayımlanması",
                en: "Article 12(3) — Publication of the fee tariff on the website" },
      metin: { tr: "Kuruluş kendi web sitesinde, Kurul da kendi web sitesinde kabul edilen ücret tarifelerini yayımlar.",
               en: "The organisation publishes the accepted fee tariffs on its own website, as does the Board on its own website." },
    },
    {
      anahtar: "noextra",
      baslik: { tr: "MADDE 12/(4) — Tarife dışında ek mali talepte bulunulmaması",
                en: "Article 12(4) — No additional financial demands beyond the tariff" },
      metin: { tr: "Kuruluş, Kurul tarafından kabul edilen ve web sitelerinde yayımlanan ücret tarifeleri dışında yükseköğretim kurumundan ara değerlendirme, konaklama, ulaşım, yemek, dosya masrafı, hızlı değerlendirme payı, danışmanlık ücreti veya basılı belge bedeli gibi adlar altında hiçbir ekstra mali talepte bulunamaz.",
               en: "Beyond the fee tariffs accepted by the Board and published on the websites, the organisation may make no additional financial demand on a higher education institution under names such as interim evaluation, accommodation, travel, meals, file costs, expedited evaluation share, consultancy fee or printed document charge." },
    },
    {
      anahtar: "refund",
      baslik: { tr: "MADDE 12/(5) — Askıya alma ve iptal hâlinde ücret iadesi",
                en: "Article 12(5) — Refunds upon suspension or cancellation" },
      metin: { tr: "Kalite Değerlendirme Tescil Belgesi veya Kalite Değerlendirme Tanınma Belgesi askıya alınan kuruluş, akreditasyon kabul kararı verilmemiş ve değerlendirme süreci devam eden programlar için tahsil ettiği akreditasyon ücretini, yükseköğretim kurumunun talebi hâlinde otuz gün içinde iade eder ve süreç sonlandırılır. Ücreti talep edilmeyen programların akreditasyon süreci askıya alma süresinin sonunda devam eder; bu durumda tahsil edilen ücretin askıya alma süresi kadar yasal faizi yükseköğretim kurumuna ödenir. Belgenin iptali hâlinde tahsil edilen akreditasyon ücreti, iptal kararının kuruluşa tebliğ tarihini takip eden yedi gün içinde iade edilir.",
               en: "An organisation whose Quality Evaluation Registration Certificate or Quality Evaluation Recognition Certificate is suspended shall, upon the request of the higher education institution, refund within thirty days the accreditation fee collected for programmes for which no accreditation decision has been taken and whose evaluation is ongoing, and the process is terminated. For programmes whose fee is not reclaimed, the accreditation process resumes at the end of the suspension period; in that case statutory interest for the duration of the suspension is paid to the higher education institution. Where the certificate is cancelled, the accreditation fee collected is refunded within seven days following notification of the cancellation decision to the organisation." },
    },
    {
      anahtar: "boardfee",
      baslik: { tr: "MADDE 12/(6) — Tescil/Tanınma Bedelinin ocak ayında yatırılması",
                en: "Article 12(6) — Payment of the Registration/Recognition Fee in January" },
      metin: { tr: "Her Bağımsız Dış Değerlendirme ve Akreditasyon Kuruluşu, kabul edilmiş bir ücret tarifesi kadar bedeli, yetkilendirme tescil, tanınma ve izleme faaliyetleri sebebiyle her yılın ocak ayı içerisinde Tescil/Tanınma Bedeli olarak Kurul banka hesabına yatırmakla yükümlüdür.",
               en: "Every Independent External Evaluation and Accreditation Organisation is obliged to pay into the Board's bank account, during January each year, an amount equal to one accepted fee tariff as the Registration/Recognition Fee, in respect of authorisation registration, recognition and monitoring activities." },
    },
  ],
  beyanlar: [
    {
      anahtar: "accurate",
      metin: { tr: "Başvuruda verilen tüm bilgilerin doğru ve eksiksiz olduğunu beyan ederim.",
               en: "I declare that all information given in this application is accurate and complete." },
    },
    {
      anahtar: "esg",
      metin: { tr: "Kuruluşumuzun YÖKAK Dış Değerlendirme ve Akreditasyon Kuruluşlarının Yetkilendirilmesi, Tanınması ve İzlenmesine İlişkin Kılavuz ile uyumlu biçimde faaliyet gösterdiğini beyan ederim.",
               en: "I declare that our organisation operates in compliance with the YÖKAK Guidelines on the Authorisation, Recognition and Monitoring of External Review and Accreditation Bodies." },
    },
    {
      anahtar: "legislation",
      metin: { tr: "Akreditasyon ölçütlerini belirlerken ve uygularken başta 2547 sayılı Yükseköğretim Kanunu olmak üzere yürürlükteki tüm üst mevzuata uyacağımızı, mevzuata aykırı ölçüt belirlemeyeceğimizi ve uygulamayacağımızı; yükseköğretim üst kuruluşlarının belirlediği normlara uygunluk bulunması hâlinde bu gerekçeyle akreditasyonun reddine karar vermeyeceğimizi taahhüt ederim.",
               en: "I undertake that, in setting and applying accreditation criteria, we will comply with all higher-level legislation in force, primarily Higher Education Law No. 2547; that we will neither set nor apply criteria contrary to legislation; and that, where conformity with the norms established by the higher education supreme bodies exists, we will not refuse accreditation on that ground." },
    },
    {
      anahtar: "evidence",
      metin: { tr: "Beyan edilen tüm kanıtların YÖKAK tarafından incelenebileceğini kabul ederim.",
               en: "I accept that all declared evidence may be examined by YÖKAK." },
    },
    {
      anahtar: "monitoring",
      metin: { tr: "Yetkilendirme/tanınma sonrası izleme süreçlerine katılmayı taahhüt ederim.",
               en: "I undertake to participate in monitoring processes following authorisation/recognition." },
    },
    {
      anahtar: "notify",
      metin: { tr: "Kuruluşumuzun statüsündeki değişiklikleri YÖKAK'a bildirmeyi taahhüt ederim.",
               en: "I undertake to notify YÖKAK of any change in our organisation's status." },
    },
    {
      anahtar: "notifyMethodology",
      metin: { tr: "Kuruluşumuzun kullandığı ölçüt ve metodolojik değişiklikleri YÖKAK'a bildirmeyi taahhüt ederim.",
               en: "I undertake to notify YÖKAK of changes to the criteria and methodology our organisation uses." },
    },
  ],
};

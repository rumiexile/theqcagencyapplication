/* ==========================================================================
   Akreditasyon Kapsamı — Program Listesi
   Scope of accreditation — programme list
   --------------------------------------------------------------------------
   Ajansın yetkilendirilmek/tanınmak istediği LİSANS programları,
   YÖK Temel Alan sınıflandırmasına göre gruplandırılmıştır.

   ⚠ VERİ KAYNAĞI / DATA SOURCE
   Bu liste, YÖKAK MİS'teki resmî ajans program listesinin
   (https://mis.yokak.gov.tr/Prg/AgencyPrograms/Program) yapısını temel alan
   temsilî bir veri setidir. Resmî listeyi içe aktarmak için YALNIZCA bu
   dosyadaki PROGRAM_DATA dizisini değiştirin — uygulamanın geri kalanı
   veriyi buradan okur, başka değişiklik gerekmez.

   Şema / Schema:
     { code: <benzersiz kod>, area: <temel alan kodu>,
       name: {tr, en}, level: "lisans" }
   ========================================================================== */

window.PROGRAM_DATA = (function () {
  "use strict";

  /* Temel Alanlar / Basic fields (YÖK sınıflandırması) */
  var areas = [
    { code: "egitim", name: { tr: "Eğitim Bilimleri ve Öğretmen Yetiştirme", en: "Education & Teacher Training" }, icon: "book" },
    { code: "fen", name: { tr: "Fen Bilimleri ve Matematik", en: "Natural Sciences & Mathematics" }, icon: "atom" },
    { code: "filoloji", name: { tr: "Filoloji", en: "Philology" }, icon: "languages" },
    { code: "sanat", name: { tr: "Güzel Sanatlar", en: "Fine Arts" }, icon: "palette" },
    { code: "hukuk", name: { tr: "Hukuk", en: "Law" }, icon: "scale" },
    { code: "ilahiyat", name: { tr: "İlahiyat", en: "Theology" }, icon: "landmark" },
    { code: "mimarlik", name: { tr: "Mimarlık, Planlama ve Tasarım", en: "Architecture, Planning & Design" }, icon: "ruler" },
    { code: "muhendislik", name: { tr: "Mühendislik", en: "Engineering" }, icon: "cog" },
    { code: "saglik", name: { tr: "Sağlık Bilimleri", en: "Health Sciences" }, icon: "heart" },
    { code: "sosyal", name: { tr: "Sosyal, Beşeri ve İdari Bilimler", en: "Social, Human & Administrative Sciences" }, icon: "users" },
    { code: "spor", name: { tr: "Spor Bilimleri", en: "Sport Sciences" }, icon: "activity" },
    { code: "ziraat", name: { tr: "Ziraat, Orman ve Su Ürünleri", en: "Agriculture, Forestry & Fisheries" }, icon: "sprout" },
  ];

  /* Kısaltma yardımcısı / helper */
  function P(area, code, tr, en) {
    return { code: area + "." + code, area: area, level: "lisans", name: { tr: tr, en: en } };
  }

  var programmes = [
    /* --- Eğitim ------------------------------------------------------- */
    P("egitim", "okuloncesi", "Okul Öncesi Öğretmenliği", "Pre-School Teaching"),
    P("egitim", "sinif", "Sınıf Öğretmenliği", "Primary School Teaching"),
    P("egitim", "matematik", "Matematik Öğretmenliği", "Mathematics Teaching"),
    P("egitim", "fenbilgisi", "Fen Bilgisi Öğretmenliği", "Science Teaching"),
    P("egitim", "turkce", "Türkçe Öğretmenliği", "Turkish Language Teaching"),
    P("egitim", "sosyalbilgiler", "Sosyal Bilgiler Öğretmenliği", "Social Studies Teaching"),
    P("egitim", "ingilizce", "İngilizce Öğretmenliği", "English Language Teaching"),
    P("egitim", "rehberlik", "Rehberlik ve Psikolojik Danışmanlık", "Guidance & Psychological Counselling"),
    P("egitim", "ozelegitim", "Özel Eğitim Öğretmenliği", "Special Education Teaching"),
    P("egitim", "bote", "Bilgisayar ve Öğretim Teknolojileri Öğretmenliği", "Computer Education & Instructional Technology"),
    P("egitim", "bedenegitimi", "Beden Eğitimi ve Spor Öğretmenliği", "Physical Education & Sports Teaching"),

    /* --- Fen Bilimleri ve Matematik ------------------------------------ */
    P("fen", "matematik", "Matematik", "Mathematics"),
    P("fen", "fizik", "Fizik", "Physics"),
    P("fen", "kimya", "Kimya", "Chemistry"),
    P("fen", "biyoloji", "Biyoloji", "Biology"),
    P("fen", "istatistik", "İstatistik", "Statistics"),
    P("fen", "molbiyo", "Moleküler Biyoloji ve Genetik", "Molecular Biology & Genetics"),
    P("fen", "biyoteknoloji", "Biyoteknoloji", "Biotechnology"),
    P("fen", "astronomi", "Astronomi ve Uzay Bilimleri", "Astronomy & Space Sciences"),
    P("fen", "aktuerya", "Aktüerya Bilimleri", "Actuarial Sciences"),

    /* --- Filoloji ------------------------------------------------------ */
    P("filoloji", "tdedebiyat", "Türk Dili ve Edebiyatı", "Turkish Language & Literature"),
    P("filoloji", "ingilizdili", "İngiliz Dili ve Edebiyatı", "English Language & Literature"),
    P("filoloji", "amerikan", "Amerikan Kültürü ve Edebiyatı", "American Culture & Literature"),
    P("filoloji", "almandili", "Alman Dili ve Edebiyatı", "German Language & Literature"),
    P("filoloji", "fransizdili", "Fransız Dili ve Edebiyatı", "French Language & Literature"),
    P("filoloji", "rusdili", "Rus Dili ve Edebiyatı", "Russian Language & Literature"),
    P("filoloji", "arapdili", "Arap Dili ve Edebiyatı", "Arabic Language & Literature"),
    P("filoloji", "mutercim", "Mütercim ve Tercümanlık", "Translation & Interpreting"),
    P("filoloji", "ceviribilim", "Çeviribilim", "Translation Studies"),
    P("filoloji", "dilbilim", "Dilbilim", "Linguistics"),

    /* --- Güzel Sanatlar ------------------------------------------------ */
    P("sanat", "resim", "Resim", "Painting"),
    P("sanat", "heykel", "Heykel", "Sculpture"),
    P("sanat", "grafik", "Grafik Tasarım", "Graphic Design"),
    P("sanat", "muzik", "Müzik", "Music"),
    P("sanat", "sahne", "Sahne Sanatları", "Performing Arts"),
    P("sanat", "seramik", "Seramik ve Cam", "Ceramics & Glass"),
    P("sanat", "tekstiltasarim", "Tekstil ve Moda Tasarımı", "Textile & Fashion Design"),
    P("sanat", "fotograf", "Fotoğraf", "Photography"),
    P("sanat", "sinematv", "Sinema ve Televizyon", "Cinema & Television"),
    P("sanat", "gelenekselsanat", "Geleneksel Türk Sanatları", "Traditional Turkish Arts"),

    /* --- Hukuk --------------------------------------------------------- */
    P("hukuk", "hukuk", "Hukuk", "Law"),

    /* --- İlahiyat ------------------------------------------------------ */
    P("ilahiyat", "ilahiyat", "İlahiyat", "Theology"),
    P("ilahiyat", "islamiilimler", "İslami İlimler", "Islamic Sciences"),
    P("ilahiyat", "dinkulturu", "Din Kültürü ve Ahlak Bilgisi Öğretmenliği", "Religious Culture & Ethics Teaching"),

    /* --- Mimarlık, Planlama ve Tasarım --------------------------------- */
    P("mimarlik", "mimarlik", "Mimarlık", "Architecture"),
    P("mimarlik", "sehirplanlama", "Şehir ve Bölge Planlama", "City & Regional Planning"),
    P("mimarlik", "peyzaj", "Peyzaj Mimarlığı", "Landscape Architecture"),
    P("mimarlik", "icmimarlik", "İç Mimarlık", "Interior Architecture"),
    P("mimarlik", "icmimarlikcevre", "İç Mimarlık ve Çevre Tasarımı", "Interior Architecture & Environmental Design"),
    P("mimarlik", "endustriyeltasarim", "Endüstriyel Tasarım", "Industrial Design"),

    /* --- Mühendislik --------------------------------------------------- */
    P("muhendislik", "bilgisayar", "Bilgisayar Mühendisliği", "Computer Engineering"),
    P("muhendislik", "yazilim", "Yazılım Mühendisliği", "Software Engineering"),
    P("muhendislik", "elektrikelektronik", "Elektrik-Elektronik Mühendisliği", "Electrical & Electronics Engineering"),
    P("muhendislik", "makine", "Makine Mühendisliği", "Mechanical Engineering"),
    P("muhendislik", "insaat", "İnşaat Mühendisliği", "Civil Engineering"),
    P("muhendislik", "endustri", "Endüstri Mühendisliği", "Industrial Engineering"),
    P("muhendislik", "kimyamuh", "Kimya Mühendisliği", "Chemical Engineering"),
    P("muhendislik", "cevre", "Çevre Mühendisliği", "Environmental Engineering"),
    P("muhendislik", "gida", "Gıda Mühendisliği", "Food Engineering"),
    P("muhendislik", "metalurji", "Metalurji ve Malzeme Mühendisliği", "Metallurgical & Materials Engineering"),
    P("muhendislik", "harita", "Harita Mühendisliği (Geomatik)", "Geomatics Engineering"),
    P("muhendislik", "jeoloji", "Jeoloji Mühendisliği", "Geological Engineering"),
    P("muhendislik", "jeofizik", "Jeofizik Mühendisliği", "Geophysical Engineering"),
    P("muhendislik", "maden", "Maden Mühendisliği", "Mining Engineering"),
    P("muhendislik", "petrol", "Petrol ve Doğalgaz Mühendisliği", "Petroleum & Natural Gas Engineering"),
    P("muhendislik", "biyomedikal", "Biyomedikal Mühendisliği", "Biomedical Engineering"),
    P("muhendislik", "mekatronik", "Mekatronik Mühendisliği", "Mechatronics Engineering"),
    P("muhendislik", "ucak", "Uçak Mühendisliği", "Aeronautical Engineering"),
    P("muhendislik", "uzay", "Uzay Mühendisliği", "Astronautical Engineering"),
    P("muhendislik", "gemi", "Gemi İnşaatı ve Gemi Makineleri Mühendisliği", "Naval Architecture & Marine Engineering"),
    P("muhendislik", "tekstilmuh", "Tekstil Mühendisliği", "Textile Engineering"),
    P("muhendislik", "enerji", "Enerji Sistemleri Mühendisliği", "Energy Systems Engineering"),
    P("muhendislik", "otomotiv", "Otomotiv Mühendisliği", "Automotive Engineering"),
    P("muhendislik", "nukleer", "Nükleer Enerji Mühendisliği", "Nuclear Energy Engineering"),
    P("muhendislik", "yapayzeka", "Yapay Zekâ ve Veri Mühendisliği", "Artificial Intelligence & Data Engineering"),

    /* --- Sağlık Bilimleri ---------------------------------------------- */
    P("saglik", "tip", "Tıp", "Medicine"),
    P("saglik", "dishekimligi", "Diş Hekimliği", "Dentistry"),
    P("saglik", "eczacilik", "Eczacılık", "Pharmacy"),
    P("saglik", "veteriner", "Veteriner Hekimliği", "Veterinary Medicine"),
    P("saglik", "hemsirelik", "Hemşirelik", "Nursing"),
    P("saglik", "ebelik", "Ebelik", "Midwifery"),
    P("saglik", "beslenme", "Beslenme ve Diyetetik", "Nutrition & Dietetics"),
    P("saglik", "fizyoterapi", "Fizyoterapi ve Rehabilitasyon", "Physiotherapy & Rehabilitation"),
    P("saglik", "odyoloji", "Odyoloji", "Audiology"),
    P("saglik", "dilkonusma", "Dil ve Konuşma Terapisi", "Speech & Language Therapy"),
    P("saglik", "ergoterapi", "Ergoterapi", "Occupational Therapy"),
    P("saglik", "saglikyonetimi", "Sağlık Yönetimi", "Health Management"),
    P("saglik", "cocukgelisimi", "Çocuk Gelişimi", "Child Development"),
    P("saglik", "sosyalhizmet", "Sosyal Hizmet", "Social Work"),
    P("saglik", "isguvenligi", "İş Sağlığı ve Güvenliği", "Occupational Health & Safety"),

    /* --- Sosyal, Beşeri ve İdari Bilimler ------------------------------ */
    P("sosyal", "isletme", "İşletme", "Business Administration"),
    P("sosyal", "iktisat", "İktisat", "Economics"),
    P("sosyal", "siyasetkamu", "Siyaset Bilimi ve Kamu Yönetimi", "Political Science & Public Administration"),
    P("sosyal", "uluslararasi", "Uluslararası İlişkiler", "International Relations"),
    P("sosyal", "maliye", "Maliye", "Public Finance"),
    P("sosyal", "ekonometri", "Ekonometri", "Econometrics"),
    P("sosyal", "psikoloji", "Psikoloji", "Psychology"),
    P("sosyal", "sosyoloji", "Sosyoloji", "Sociology"),
    P("sosyal", "tarih", "Tarih", "History"),
    P("sosyal", "cografya", "Coğrafya", "Geography"),
    P("sosyal", "felsefe", "Felsefe", "Philosophy"),
    P("sosyal", "antropoloji", "Antropoloji", "Anthropology"),
    P("sosyal", "arkeoloji", "Arkeoloji", "Archaeology"),
    P("sosyal", "sanattarihi", "Sanat Tarihi", "Art History"),
    P("sosyal", "halklailiskiler", "Halkla İlişkiler ve Tanıtım", "Public Relations & Publicity"),
    P("sosyal", "gazetecilik", "Gazetecilik", "Journalism"),
    P("sosyal", "rtv", "Radyo, Televizyon ve Sinema", "Radio, Television & Cinema"),
    P("sosyal", "ybs", "Yönetim Bilişim Sistemleri", "Management Information Systems"),
    P("sosyal", "utl", "Uluslararası Ticaret ve Lojistik", "International Trade & Logistics"),
    P("sosyal", "turizm", "Turizm İşletmeciliği", "Tourism Management"),
    P("sosyal", "gastronomi", "Gastronomi ve Mutfak Sanatları", "Gastronomy & Culinary Arts"),
    P("sosyal", "bankacilik", "Bankacılık ve Finans", "Banking & Finance"),
    P("sosyal", "ikyonetimi", "İnsan Kaynakları Yönetimi", "Human Resources Management"),

    /* --- Spor Bilimleri ------------------------------------------------ */
    P("spor", "antrenorluk", "Antrenörlük Eğitimi", "Coaching Education"),
    P("spor", "sporyoneticiligi", "Spor Yöneticiliği", "Sports Management"),
    P("spor", "rekreasyon", "Rekreasyon", "Recreation"),
    P("spor", "egzersizspor", "Egzersiz ve Spor Bilimleri", "Exercise & Sport Sciences"),

    /* --- Ziraat, Orman ve Su Ürünleri ---------------------------------- */
    P("ziraat", "bahcebitkileri", "Bahçe Bitkileri", "Horticulture"),
    P("ziraat", "tarlabitkileri", "Tarla Bitkileri", "Field Crops"),
    P("ziraat", "toprakbitki", "Toprak Bilimi ve Bitki Besleme", "Soil Science & Plant Nutrition"),
    P("ziraat", "zootekni", "Zootekni", "Animal Science"),
    P("ziraat", "bitkikoruma", "Bitki Koruma", "Plant Protection"),
    P("ziraat", "tarimekonomisi", "Tarım Ekonomisi", "Agricultural Economics"),
    P("ziraat", "tarimsalbiyotek", "Tarımsal Biyoteknoloji", "Agricultural Biotechnology"),
    P("ziraat", "tarimmakine", "Tarım Makineleri ve Teknolojileri Mühendisliği", "Agricultural Machinery & Technologies Engineering"),
    P("ziraat", "suurunleri", "Su Ürünleri Mühendisliği", "Fisheries Engineering"),
    P("ziraat", "ormanmuh", "Orman Mühendisliği", "Forest Engineering"),
    P("ziraat", "ormanendustri", "Orman Endüstrisi Mühendisliği", "Forest Industry Engineering"),
  ];

  return {
    areas: areas,
    programmes: programmes,
    /** Temel alana göre grupla / group by basic field */
    byArea: function (areaCode) {
      return programmes.filter(function (p) {
        return p.area === areaCode;
      });
    },
    /** Kod ile program bul / find programme by code */
    find: function (code) {
      for (var i = 0; i < programmes.length; i++) {
        if (programmes[i].code === code) return programmes[i];
      }
      return null;
    },
    /** Temel alan adı / area name */
    areaName: function (code) {
      for (var i = 0; i < areas.length; i++) {
        if (areas[i].code === code) return areas[i].name;
      }
      return { tr: code, en: code };
    },
  };
})();

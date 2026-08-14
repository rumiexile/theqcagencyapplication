/* ==========================================================================
   EK 7 üreteci — YÖKAK Program Akreditasyonu Ölçütleri (ESG Bölüm 1)

   YÖKAK, ulusal program akreditasyonu ölçütü olarak ESG'nin birinci
   bölümünü kabul etmiştir. Bu ek, o dokuz standardı EK 1 ile aynı kart
   düzeninde verir; metin uygulamanın ESG verisinden üretilir, elle
   yazılmaz — kılavuz ile başvuru yazılımı aynı kaynaktan beslenir.

   EK 1'den tek farkı: ESG Bölüm 1 standartlarının veri setinde ayrı bir
   `guidance` (açıklama) alanı yoktur, bu yüzden kartlarda açıklama bloğu
   yer almaz. Beklenen kanıtlar da standart başına değil, bölümün tamamı
   için ortaktır (EVIDENCE_SUGGESTIONS.esg1Common); ekte bir kez verilir.

   Kullanım:  node tools/gen-ek7.js > kilavuz/data/ek7.js
   ========================================================================== */
global.window = {};
require("../assets/js/esg-data.js");
require("../assets/data/evidence-suggestions.js");
require("../assets/data/yokak-criteria.js");

var ESG = global.window.ESG;
var SUG = global.window.EVIDENCE_SUGGESTIONS;
var YOKAK = global.window.YOKAK_CRITERIA;

function q(s) {
  return JSON.stringify(String(s == null ? "" : s));
}

/* Her ESG 1 standardının YÖKAK ana ölçüt karşılığı — başvuru formundaki
   açılır listeyle aynı eşleme kullanılır. */
function yokakKarsiligi(kod) {
  var c = YOKAK.byEsg1 ? YOKAK.byEsg1(kod) : null;
  return c ? { kod: c.code, ad: c.name } : null;
}

var olcutler = (ESG.part1 || []).map(function (s, i) {
  return {
    sira: i + 1,
    kod: s.code,
    baslik: s.title,
    olcut: s.statement,
    yokak: yokakKarsiligi(s.code),
  };
});

var satirlar = olcutler.map(function (o) {
  var y = o.yokak
    ? "      yokak: { kod: " + q(o.yokak.kod) +
      ", ad: { tr: " + q(o.yokak.ad.tr) + ", en: " + q(o.yokak.ad.en) + " } },"
    : "      yokak: null,";
  return [
    "    {",
    "      sira: " + o.sira + ",",
    "      kod: " + q(o.kod) + ",",
    "      baslik: { tr: " + q(o.baslik.tr) + ", en: " + q(o.baslik.en) + " },",
    "      olcut: { tr: " + q(o.olcut.tr) + ",",
    "               en: " + q(o.olcut.en) + " },",
    y,
    "    },",
  ].join("\n");
});

var ortak = (SUG.esg1Common || []).map(function (k) {
  return "    { tr: " + q(k.tr) + ", en: " + q(k.en) + " },";
});

process.stdout.write(
  "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.\n" +
  "   Kaynak: assets/js/esg-data.js + assets/data/evidence-suggestions.js\n" +
  "           + assets/data/yokak-criteria.js\n" +
  "   Yeniden üretmek için: node tools/gen-ek7.js > kilavuz/data/ek7.js\n" +
  "   " + olcutler.length + " standart · ESG Bölüm 1 */\n\n" +
  "window.KILAVUZ_EK7 = {\n" +
  "  uretim: " + q(new Date().toISOString().slice(0, 10)) + ",\n" +
  "  olcutler: [\n" +
  satirlar.join("\n") + "\n" +
  "  ],\n" +
  "  ortakKanitlar: [\n" +
  ortak.join("\n") + "\n" +
  "  ],\n" +
  "};\n"
);

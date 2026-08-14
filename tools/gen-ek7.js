/* ==========================================================================
   EK 7 üreteci — YÖKAK Program Akreditasyonu Ölçütleri (ESG Bölüm 1)

   EK 1 ile aynı üretim hattı ve aynı kart düzeni: ölçüt metni, açıklama ve
   beklenen kanıtlar. Tek farkı kapsamıdır — EK 1 Bölüm 3 ile Bölüm 2'yi,
   bu ek Bölüm 1'i verir.

   Metinler kılavuzda elle yazılmaz; uygulamanın ESG standart verisinden ve
   önerilen kanıt listesinden üretilir, böylece kılavuz ile başvuru yazılımı
   aynı kaynaktan beslenir ve zamanla ayrışamaz.

   Kullanım:  node tools/gen-ek7.js > kilavuz/data/ek7.js
   ========================================================================== */
global.window = {};
require("../assets/js/esg-data.js");
require("../assets/data/evidence-suggestions.js");

var ESG = global.window.ESG;
var SUG = global.window.EVIDENCE_SUGGESTIONS;

function q(s) {
  return JSON.stringify(String(s == null ? "" : s));
}

var olcutler = (ESG.part1 || []).map(function (s, i) {
  return {
    sira: i + 1,
    kod: s.code,
    baslik: s.title,
    olcut: s.statement,
    aciklama: s.guidance || { tr: [], en: [] },
    kanitlar: SUG.forStandard(s.code) || [],
  };
});

var satirlar = olcutler.map(function (o) {
  var acTr = (o.aciklama.tr || []).map(q).join(", ");
  var acEn = (o.aciklama.en || []).map(q).join(", ");
  var kaTr = o.kanitlar.map(function (k) { return q(k.tr); }).join(", ");
  var kaEn = o.kanitlar.map(function (k) { return q(k.en); }).join(", ");
  return [
    "    {",
    "      sira: " + o.sira + ",",
    "      kod: " + q(o.kod) + ",",
    "      baslik: { tr: " + q(o.baslik.tr) + ", en: " + q(o.baslik.en) + " },",
    "      olcut: { tr: " + q(o.olcut.tr) + ",",
    "               en: " + q(o.olcut.en) + " },",
    "      aciklama: { tr: [" + acTr + "],",
    "                  en: [" + acEn + "] },",
    "      kanitlar: { tr: [" + kaTr + "],",
    "                  en: [" + kaEn + "] },",
    "    },",
  ].join("\n");
});

process.stdout.write(
  "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.\n" +
  "   Kaynak: assets/js/esg-data.js + assets/data/evidence-suggestions.js\n" +
  "   Yeniden üretmek için: node tools/gen-ek7.js > kilavuz/data/ek7.js\n" +
  "   " + olcutler.length + " ölçüt · ESG Bölüm 1 */\n\n" +
  "window.KILAVUZ_EK7 = {\n" +
  "  uretim: " + q(new Date().toISOString().slice(0, 10)) + ",\n" +
  "  olcutler: [\n" +
  satirlar.join("\n") + "\n" +
  "  ],\n" +
  "};\n"
);

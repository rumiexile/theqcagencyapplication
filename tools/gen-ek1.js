/* ==========================================================================
   EK 1 üreteci — Değerlendirme Ölçütleri, Açıklamalar ve Beklenen Kanıtlar

   Ölçütler kılavuzda elle yazılmaz: uygulamanın ESG standart verisinden ve
   önerilen kanıt listesinden üretilir. Böylece kılavuz ile başvuru yazılımı
   aynı kaynaktan beslenir ve zamanla ayrışamaz.

   Kapsam ESG Bölüm 3 (ajansın kendisi) ve Bölüm 2 (dış kalite güvencesi
   süreçleri) ile sınırlıdır. Bölüm 1, ajansın kendi ölçütlerinin kapsamına
   ilişkindir; kuruluşun yetkilendirilmesinin ölçütü değildir.

   Kullanım:  node tools/gen-ek1.js > kilavuz/data/ek1.js
   ========================================================================== */
global.window = {};
require("../assets/js/esg-data.js");
require("../assets/data/evidence-suggestions.js");

var ESG = global.window.ESG;
var SUG = global.window.EVIDENCE_SUGGESTIONS;

function q(s) {
  return JSON.stringify(String(s == null ? "" : s));
}

var olcutler = [];
["part3", "part2"].forEach(function (part) {
  (ESG[part] || []).forEach(function (s) {
    olcutler.push({
      kod: s.code,
      baslik: s.title,
      olcut: s.statement,
      aciklama: s.guidance || { tr: [], en: [] },
      kanitlar: SUG.forStandard(s.code) || [],
    });
  });
});

var satirlar = olcutler.map(function (o, i) {
  var acTr = (o.aciklama.tr || []).map(q).join(", ");
  var acEn = (o.aciklama.en || []).map(q).join(", ");
  var kaTr = o.kanitlar.map(function (k) { return q(k.tr); }).join(", ");
  var kaEn = o.kanitlar.map(function (k) { return q(k.en); }).join(", ");
  return [
    "    {",
    "      sira: " + (i + 1) + ",",
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
  "   Yeniden üretmek için: node tools/gen-ek1.js > kilavuz/data/ek1.js\n" +
  "   " + olcutler.length + " ölçüt · ESG Bölüm 3 ve Bölüm 2 */\n\n" +
  "window.KILAVUZ_EK1 = {\n" +
  "  uretim: " + q(new Date().toISOString().slice(0, 10)) + ",\n" +
  "  olcutler: [\n" + satirlar.join("\n") + "\n  ],\n};\n"
);

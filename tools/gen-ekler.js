/* ==========================================================================
   Mali hükümler ve taahhüt/beyan maddeleri üreteci

   Bu metinler başvuru formunun şemasında zaten normatif hâlleriyle duruyor.
   Kılavuza kopyalanmaz, oradan üretilir; böylece formda değişen bir madde
   kılavuzda eski hâliyle kalamaz.

   Kullanım:  node tools/gen-ekler.js > kilavuz/data/ekler.js
   ========================================================================== */
var fs = require("fs");
var path = require("path");
var src = fs.readFileSync(path.join(__dirname, "../assets/js/schema.js"), "utf8");

function q(s) { return JSON.stringify(String(s == null ? "" : s)); }

/* --- Mali hükümler: maliRule(anahtar, başlık, kural) çağrıları ---------- */
var mali = [];
var reMali = /maliRule\("(\w+)",\s*\{ tr: "((?:[^"\\]|\\.)*)", en: "((?:[^"\\]|\\.)*)" \},\s*\{\s*tr:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*en:\s*"((?:[^"\\]|\\.)*)",/g;
var m;
while ((m = reMali.exec(src))) {
  mali.push({ anahtar: m[1], baslik: { tr: m[2], en: m[3] }, metin: { tr: m[4], en: m[5] } });
}

/* --- Beyanlar: declaration.items seçenekleri --------------------------- */
var beyanlar = [];
var blok = src.slice(src.indexOf('id: "declaration.items"'));
blok = blok.slice(0, blok.indexOf("\n            },\n"));
var reB = /\{\s*value: "(\w+)",\s*label:\s*\{\s*\n?\s*tr:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*\n?\s*en:\s*\n?\s*"((?:[^"\\]|\\.)*)",?\s*\n?\s*\}/g;
while ((m = reB.exec(blok))) {
  beyanlar.push({ anahtar: m[1], metin: { tr: m[2], en: m[3] } });
}

function yaz(ad, dizi, alanlar) {
  return "  " + ad + ": [\n" + dizi.map(function (o) {
    var s = ["    {", "      anahtar: " + q(o.anahtar) + ","];
    if (alanlar.indexOf("baslik") !== -1) {
      s.push("      baslik: { tr: " + q(o.baslik.tr) + ",");
      s.push("                en: " + q(o.baslik.en) + " },");
    }
    s.push("      metin: { tr: " + q(o.metin.tr) + ",");
    s.push("               en: " + q(o.metin.en) + " },");
    s.push("    },");
    return s.join("\n");
  }).join("\n") + "\n  ],\n";
}

process.stdout.write(
  "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.\n" +
  "   Kaynak: assets/js/schema.js\n" +
  "   Yeniden üretmek için: node tools/gen-ekler.js > kilavuz/data/ekler.js\n" +
  "   " + mali.length + " mali fıkra · " + beyanlar.length + " beyan maddesi */\n\n" +
  "window.KILAVUZ_EKLER = {\n" +
  yaz("mali", mali, ["baslik"]) +
  yaz("beyanlar", beyanlar, []) +
  "};\n"
);

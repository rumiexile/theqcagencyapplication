#!/usr/bin/env python3
"""EK 7 üreteci — YÖKAK Program Akreditasyonu Ölçütleri (ESG Bölüm 1).

Kaynak: kaynak/program-akreditasyon-olcutleri.xlsx, "Değerlendirme Ölçütleri".

Çalışma kitabının yapısı:
  A  Ana ölçüt              — dolu olduğu satır yeni bir ana ölçüt başlatır
  B  Alt ölçüt              — dolu olduğu satır yeni bir alt ölçüt başlatır
  C  (başlıksız)            — tek YÖKAK rubrik kodu; E sütununun ilk ögesi
  D  (başlıksız)            — çalışma sırasında kullanılan EVET/HAYIR işareti
  E  YÖKAK Rubrik İlişk.    — alt ölçütün karşılık geldiği rubrik kodları
  F  Alt ölçüte ilişkin ind. — her satır bir gösterge
  G  Beklenen kanıt örnek.  — virgülle ayrılmış kanıt listesi
  H  Genel uyum düzeyi      — bütün ölçütler için aynı ölçek
  I+ Değerlendirici notları — çalışma yorumları, kılavuza girmez

D, H ve I sonrası sütunlar bilerek dışarıda bırakılır: D ile H çalışma
alanı, I ve sonrası ise kişilere ait geri bildirimdir.

Kullanım:  python3 tools/gen-ek7.py > kilavuz/data/ek7.js
"""

import json
import pathlib
import re
import sys

import openpyxl

KOK = pathlib.Path(__file__).resolve().parent.parent
KAYNAK = KOK / "kaynak" / "program-akreditasyon-olcutleri.xlsx"

# Ana ölçüt başlıklarının İngilizcesi uygulamada zaten tanımlı; oradan
# okuyoruz ki iki üründe iki farklı çeviri dolaşmasın.
YOKAK_JS = KOK / "assets" / "data" / "yokak-criteria.js"

SUTUN = {"ana": 1, "alt": 2, "rubrikTek": 3, "rubrik": 5, "gosterge": 6, "kanit": 7}


def temiz(v):
    if v is None:
        return ""
    return re.sub(r"\s+", " ", str(v)).strip()


def kod_ve_metin(s):
    """'1.1. Programın ...' → ('1.1', 'Programın ...')"""
    m = re.match(r"^(\d+\.\d+)\.?\s*(.*)$", s)
    if not m:
        return "", s
    return m.group(1), m.group(2).strip()


def ana_kod_ve_ad(s):
    """'1. Kalite Güvencesi ...' → ('1', 'Kalite Güvencesi ...')"""
    m = re.match(r"^(\d+)\.?\s*(.*)$", s)
    if not m:
        return "", s
    return m.group(1), m.group(2).strip()


def ingilizce_adlar():
    """yokak-criteria.js içindeki 9 ana ölçütün İngilizce adları."""
    metin = YOKAK_JS.read_text(encoding="utf-8")
    adlar = {}
    for blok in re.finditer(
        r'code:\s*"(\d+)".*?en:\s*"((?:[^"\\]|\\.)*)"', metin, re.S
    ):
        adlar[blok.group(1)] = blok.group(2)
    return adlar


def buyut(s):
    """Türkçe duyarlı baş harf büyütme: i → İ, diğerleri normal."""
    if not s:
        return s
    ilk = "İ" if s[0] == "i" else s[0].upper()
    return ilk + s[1:]


def kanitlari_ayir(s):
    """Virgülle ayrılmış kanıt listesini ögelerine böler.

    Hücrede kanıtlar tek bir cümle gibi virgülle sıralanmıştır; ilk öge
    dışındakiler küçük harfle başlar. Liste olarak sunulacakları için baş
    harfleri büyütülür — metin başka bir yerinden değiştirilmez.
    """
    parcalar = [p.strip(" ,;") for p in s.split(",")]
    return [buyut(p) for p in parcalar if p]


def oku():
    ws = openpyxl.load_workbook(KAYNAK, data_only=True).active
    en_adlar = ingilizce_adlar()

    anagruplar = []
    aktif_ana = None
    aktif_alt = None

    for r in range(2, ws.max_row + 1):
        ana = temiz(ws.cell(r, SUTUN["ana"]).value)
        alt = temiz(ws.cell(r, SUTUN["alt"]).value)
        gosterge = temiz(ws.cell(r, SUTUN["gosterge"]).value)
        kanit = temiz(ws.cell(r, SUTUN["kanit"]).value)
        rubrik = temiz(ws.cell(r, SUTUN["rubrik"]).value)

        if ana:
            kod, adi = ana_kod_ve_ad(ana)
            aktif_ana = {
                "kod": kod,
                "ad": {"tr": adi, "en": en_adlar.get(kod, "")},
                "esg1": "1." + kod,
                "altlar": [],
            }
            anagruplar.append(aktif_ana)

        if alt:
            if aktif_ana is None:
                raise SystemExit("R%d: ana ölçüt olmadan alt ölçüt" % r)
            kod, metin = kod_ve_metin(alt)
            aktif_alt = {
                "kod": kod,
                "metin": metin,
                "rubrik": [p.strip(" .") for p in rubrik.split(",") if p.strip()],
                "gostergeler": [],
                "kanitlar": kanitlari_ayir(kanit),
            }
            aktif_ana["altlar"].append(aktif_alt)

        if gosterge and aktif_alt is not None:
            aktif_alt["gostergeler"].append(gosterge)

    return anagruplar


def yaz(anagruplar):
    alt_sayisi = sum(len(a["altlar"]) for a in anagruplar)
    gosterge_sayisi = sum(
        len(x["gostergeler"]) for a in anagruplar for x in a["altlar"]
    )
    kanit_sayisi = sum(len(x["kanitlar"]) for a in anagruplar for x in a["altlar"])

    satirlar = [
        "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyiniz.",
        "   Kaynak: kaynak/program-akreditasyon-olcutleri.xlsx",
        "   Yeniden üretmek için: python3 tools/gen-ek7.py > kilavuz/data/ek7.js",
        "   %d ana ölçüt · %d alt ölçüt · %d gösterge · %d kanıt örneği */"
        % (len(anagruplar), alt_sayisi, gosterge_sayisi, kanit_sayisi),
        "",
        "window.KILAVUZ_EK7 = {",
        '  kaynak: "YÖKAK Program Akreditasyonu Ölçütleri",',
        "  anaSayisi: %d," % len(anagruplar),
        "  altSayisi: %d," % alt_sayisi,
        "  gruplar: [",
    ]

    for g in anagruplar:
        satirlar.append("    {")
        satirlar.append('      kod: %s,' % json.dumps(g["kod"], ensure_ascii=False))
        satirlar.append('      esg1: %s,' % json.dumps(g["esg1"], ensure_ascii=False))
        satirlar.append(
            "      ad: { tr: %s, en: %s },"
            % (
                json.dumps(g["ad"]["tr"], ensure_ascii=False),
                json.dumps(g["ad"]["en"], ensure_ascii=False),
            )
        )
        satirlar.append("      altlar: [")
        for a in g["altlar"]:
            satirlar.append("        {")
            satirlar.append(
                "          kod: %s," % json.dumps(a["kod"], ensure_ascii=False)
            )
            satirlar.append(
                "          metin: %s," % json.dumps(a["metin"], ensure_ascii=False)
            )
            satirlar.append(
                "          rubrik: %s," % json.dumps(a["rubrik"], ensure_ascii=False)
            )
            satirlar.append(
                "          gostergeler: %s,"
                % json.dumps(a["gostergeler"], ensure_ascii=False)
            )
            satirlar.append(
                "          kanitlar: %s,"
                % json.dumps(a["kanitlar"], ensure_ascii=False)
            )
            satirlar.append("        },")
        satirlar.append("      ],")
        satirlar.append("    },")

    satirlar += ["  ],", "};", ""]
    return "\n".join(satirlar)


if __name__ == "__main__":
    veri = oku()
    sys.stdout.write(yaz(veri))

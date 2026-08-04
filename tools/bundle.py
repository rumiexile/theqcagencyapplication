#!/usr/bin/env python3
"""Uygulamayı tek dosyalık, bağımsız bir HTML'e paketler.

Tüm CSS, JS ve görseller satır içine gömülür; sonuçta hiçbir dış dosya
veya ağ bağlantısı gerektirmeyen tek bir dosya kalır.

İki kip vardır:

  standalone  Tam HTML belgesi (doctype, <html lang>, <head>, favicon).
              Çift tıklayıp tarayıcıda açmak, e-postayla göndermek veya
              USB'yle dağıtmak için. Varsayılan kip.

  body-only   Yalnızca gövde içeriği; belge iskeletini dışarıdan alan
              gömme ortamları (ör. Claude Artifact) içindir.

Kullanım:
    python3 tools/bundle.py dist/yokak-basvuru.html
    python3 tools/bundle.py --body-only build/gövde.html
"""
import argparse
import base64
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

MIME = {
    "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
    "gif": "image/gif", "svg": "image/svg+xml", "webp": "image/webp",
}


def guard(text):
    """Satır içi gömmede etiketin erken kapanmasını engeller."""
    return text.replace("</script", "<\\/script").replace("</style", "<\\/style")


def read(rel):
    p = ROOT / rel
    if not p.is_file():
        sys.exit("HATA: dosya bulunamadı: %s" % rel)
    return p


def build(body_only=False):
    html = read("index.html").read_text(encoding="utf-8")
    stats = {"css": 0, "js": 0, "img": 0}

    def inline_css(m):
        href = m.group(1)
        stats["css"] += 1
        return "<style>\n%s\n</style>" % guard(read(href).read_text(encoding="utf-8"))

    def inline_js(m):
        src = m.group(1)
        stats["js"] += 1
        return "<script>\n%s\n</script>" % guard(read(src).read_text(encoding="utf-8"))

    def inline_img(m):
        src = m.group(1)
        if src.startswith(("data:", "http:", "https:")):
            return m.group(0)
        p = read(src)
        mime = MIME.get(p.suffix.lstrip(".").lower())
        if not mime:
            sys.exit("HATA: bilinmeyen görsel türü: %s" % src)
        stats["img"] += 1
        b64 = base64.b64encode(p.read_bytes()).decode("ascii")
        return 'src="data:%s;base64,%s"' % (mime, b64)

    html = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>', inline_css, html)
    html = re.sub(r'<script\s+src="([^"]+)"\s*></script>', inline_js, html)
    html = re.sub(r'src="([^"]+\.(?:png|jpe?g|gif|svg|webp))"', inline_img, html, flags=re.I)

    if body_only:
        m = re.search(r"<body[^>]*>(.*)</body>", html, re.S)
        if not m:
            sys.exit("HATA: <body> bulunamadı")
        html = m.group(1).strip() + "\n"

    # Gömülmemiş bir dış başvuru kalmadığını doğrula.
    leftover = re.search(r'<(?:script|link)[^>]+(?:src|href)="(?!data:|#)([^"]+)"', html)
    if leftover:
        sys.exit("HATA: gömülmemiş dış başvuru kaldı: %s" % leftover.group(1))

    return html, stats


def main():
    ap = argparse.ArgumentParser(description="Tek dosyalık HTML paketleyici")
    ap.add_argument("output", help="yazılacak dosya")
    ap.add_argument("--body-only", action="store_true",
                    help="belge iskeletini dışarıdan alan ortamlar için yalnızca gövde üret")
    args = ap.parse_args()

    html, stats = build(body_only=args.body_only)
    out = pathlib.Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")

    print("kip     : %s" % ("body-only" if args.body_only else "standalone"))
    print("CSS     : %d" % stats["css"])
    print("JS      : %d" % stats["js"])
    print("görsel  : %d" % stats["img"])
    print("çıktı   : %s (%s bayt)" % (out, format(out.stat().st_size, ",d")))


if __name__ == "__main__":
    main()

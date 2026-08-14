/* ==========================================================================
   Kılavuz çizici

   Belge, içerik verisinden çizilir; dil değişimi yeniden çizer, bu yüzden
   TR ve EN aynı yapıyı paylaşır ve ayrışamaz.

   Baskı içindekiler tablosundaki sayfa numaraları CSS ile üretilemez
   (target-counter tarayıcılarda yok), bu yüzden yazdırma öncesinde
   ölçülerek hesaplanır.
   ========================================================================== */

(function () {
  "use strict";

  var K = window.KILAVUZ;
  var EK1 = window.KILAVUZ_EK1;
  var EKLER = window.KILAVUZ_EKLER;
  var EK7 = window.KILAVUZ_EK7;
  var dil = "tr";

  var METIN = {
    tr: {
      ara: "Kılavuzda ara…",
      bulunamadi: "Eşleşen bölüm yok.",
      surum: "Sürüm",
      yazdir: "Yazdır / PDF",
      icindekiler: "İçindekiler",
      onBolum: "Giriş bölümleri",
      bolumler: "Bölümler",
      ekler: "Ekler",
      ek: "EK",
      bolum: "BÖLÜM",
      olcut: "Ölçüt",
      aciklama: "Açıklama",
      kanitlar: "Beklenen kanıtlar",
      gostergeler: "Göstergeler",
      rubrik: "YÖKAK rubrik ilişkisi",
      bekliyor: "Kaynak bekleniyor",
      bekliyorMetin:
        "Bu kısmın normatif metni henüz kaynağından alınmamıştır. Taslak iskelettir; mevzuat hükmü olarak kullanılamaz.",
      kaynak: "Kaynak",
      sayfa: "Sayfa",
      dayanak:
        "Bu Kılavuz, Yükseköğretim Kalite Güvencesi ve Yükseköğretim Kalite Kurulu Yönetmeliği uyarınca hazırlanmıştır.",
      surumGecmisi: "Sürüm geçmişi",
      degisiklik: "Değişiklik",
      tarih: "Tarih",
    },
    en: {
      ara: "Search the guide…",
      bulunamadi: "No matching section.",
      surum: "Version",
      yazdir: "Print / PDF",
      icindekiler: "Contents",
      onBolum: "Front matter",
      bolumler: "Parts",
      ekler: "Annexes",
      ek: "ANNEX",
      bolum: "PART",
      olcut: "Criterion",
      aciklama: "Explanation",
      kanitlar: "Expected evidence",
      gostergeler: "Indicators",
      rubrik: "YÖKAK rubric mapping",
      bekliyor: "Awaiting source",
      bekliyorMetin:
        "The normative text of this section has not yet been taken from its source. It is a draft skeleton and cannot be used as a regulatory provision.",
      kaynak: "Source",
      sayfa: "Page",
      dayanak:
        "This Guide has been prepared pursuant to the Regulation on Higher Education Quality Assurance and the Higher Education Quality Council.",
      surumGecmisi: "Version history",
      degisiklik: "Change",
      tarih: "Date",
    },
  };

  function t(k) { return METIN[dil][k]; }
  function p(o) { return o ? (o[dil] != null ? o[dil] : o.tr) : ""; }

  function el(tag, attr, cocuk) {
    var n = document.createElement(tag);
    Object.keys(attr || {}).forEach(function (k) {
      if (attr[k] == null) return;
      if (k === "text") n.textContent = attr[k];
      else if (k === "html") n.innerHTML = attr[k];
      else n.setAttribute(k, attr[k]);
    });
    (cocuk || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  /* ------------------------------------------------------------------
     Blok çizimi
     ------------------------------------------------------------------ */
  function blok(b) {
    if (b.tip === "p") return el("p", { text: p(b.metin) });

    /* tur: "harf" → a) b) c) — mevzuat bentleri için atıf yapılabilir işaret. */
    if (b.tip === "liste") {
      var harf = b.tur === "harf";
      return el(harf ? "ol" : "ul", {
        class: "kv-liste" + (harf ? " kv-liste--harf" : ""),
      }, (b.ogeler || []).map(function (o) {
        return el("li", { text: p(o) });
      }));
    }

    if (b.tip === "tanim") {
      return el("dl", { class: "kv-tanim" }, (b.ogeler || []).map(function (o) {
        return el("div", {}, [
          el("dt", { text: p(o.terim) }),
          el("dd", { text: p(o.metin) }),
        ]);
      }));
    }

    if (b.tip === "asama") {
      return el("div", { class: "kv-asama" }, (b.ogeler || []).map(function (o) {
        return el("div", { class: "kv-asama__oge" }, [
          el("span", { class: "kv-asama__sure", text: p(o.sure) }),
          el("div", {}, [
            el("div", { class: "kv-asama__baslik", text: p(o.baslik) }),
            el("p", { text: p(o.metin) }),
          ]),
        ]);
      }));
    }

    if (b.tip === "tablo") {
      var bas = p(b.basliklar);
      return el("div", { class: "kv-tablo-sar" }, [
        el("table", { class: "kv-tablo" }, [
          el("thead", {}, [el("tr", {}, bas.map(function (h) {
            return el("th", { scope: "col", text: h });
          }))]),
          el("tbody", {}, (b.satirlar || []).map(function (s) {
            return el("tr", {}, p(s).map(function (c) { return el("td", { text: c }); }));
          })),
        ]),
      ]);
    }

    if (b.tip === "not") {
      return el("div", { class: "kv-not" + (b.tur === "degisiklik" ? " kv-not--degisiklik" : "") }, [
        b.baslik ? el("div", { class: "kv-not__baslik", text: p(b.baslik) }) : null,
        el("p", { text: p(b.metin) }),
      ]);
    }

    if (b.tip === "mali") return maliBlok();
    if (b.tip === "beyanlar") return beyanBlok();
    if (b.tip === "olcutler") return olcutBlok();
    if (b.tip === "olcutler7") return olcut7Blok();
    if (b.tip === "surec") return surecBlok();
    return null;
  }

  /* Mali hükümler — uygulamanın şemasından üretilir. */
  function maliBlok() {
    return el("div", {}, (EKLER.mali || []).map(function (m, i) {
      return el("div", { class: "kv-asama__oge" }, [
        el("span", { class: "kv-asama__sure", text: "(" + (i + 1) + ")" }),
        el("div", {}, [
          el("div", { class: "kv-asama__baslik", text: p(m.baslik).replace(/^MADDE 12\/\(\d\)\s*—\s*/, "") }),
          el("p", { text: p(m.metin) }),
        ]),
      ]);
    }));
  }

  /* Taahhüt ve beyanlar — başvuru formundaki maddelerin aynısı. */
  function beyanBlok() {
    return el("ul", { class: "kv-liste" }, (EKLER.beyanlar || []).map(function (b) {
      return el("li", { text: p(b.metin) });
    }));
  }

  /* EK 1 — ESG standartlarından üretilmiş ölçüt kartları. */
  function olcutBlok() {
    return el("div", {}, (EK1.olcutler || []).map(function (o) {
      return el("div", { class: "kv-olcut", id: "olcut-" + o.kod.replace(".", "-") }, [
        el("div", { class: "kv-olcut__ust" }, [
          el("span", { class: "kv-olcut__sira", text: o.sira + "." }),
          el("span", { class: "kv-olcut__kod", text: "ESG " + o.kod }),
          el("span", { class: "kv-olcut__ad", text: p(o.baslik) }),
        ]),
        el("div", { class: "kv-olcut__govde" }, [
          el("div", { class: "kv-olcut__blok" }, [
            el("h5", { text: t("olcut") }),
            el("p", { class: "kv-olcut__metin", text: p(o.olcut) }),
          ]),
          (p(o.aciklama) || []).length
            ? el("div", { class: "kv-olcut__blok" }, [
                el("h5", { text: t("aciklama") }),
                el("ul", {}, p(o.aciklama).map(function (x) { return el("li", { text: x }); })),
              ])
            : null,
          (p(o.kanitlar) || []).length
            ? el("div", { class: "kv-olcut__blok" }, [
                el("h5", { text: t("kanitlar") }),
                el("ul", {}, p(o.kanitlar).map(function (x) { return el("li", { text: x }); })),
              ])
            : null,
        ]),
      ]);
    }));
  }

  /* EK 7 — YÖKAK program akreditasyonu ölçütleri, ana ölçüt altında gruplu.
     Kart düzeni EK 1 ile aynıdır; ölçüt metni Türkçe yayımlandığı hâliyle
     verilir, bu yüzden dile göre değişmez. */
  function olcut7Blok() {
    return el("div", {}, (EK7.gruplar || []).map(function (g) {
      return el("section", { class: "kv-ek7", id: "yolcut-" + g.kod }, [
        el("h4", { class: "kv-ek7__baslik" }, [
          el("span", { class: "kv-ek7__kod", text: g.kod }),
          el("span", { text: p(g.ad) }),
          el("span", { class: "kv-ek7__esg", text: "ESG " + g.esg1 }),
        ]),
      ].concat((g.altlar || []).map(function (a) {
        return el("div", { class: "kv-olcut", id: "yolcut-" + a.kod.replace(".", "-") }, [
          el("div", { class: "kv-olcut__ust" }, [
            el("span", { class: "kv-olcut__sira", text: a.kod }),
            el("span", { class: "kv-olcut__ad", text: a.metin }),
          ]),
          el("div", { class: "kv-olcut__govde" }, [
            (a.gostergeler || []).length
              ? el("div", { class: "kv-olcut__blok" }, [
                  el("h5", { text: t("gostergeler") }),
                  el("ul", {}, a.gostergeler.map(function (x) {
                    return el("li", { text: x });
                  })),
                ])
              : null,
            (a.kanitlar || []).length
              ? el("div", { class: "kv-olcut__blok" }, [
                  el("h5", { text: t("kanitlar") }),
                  el("ul", {}, a.kanitlar.map(function (x) {
                    return el("li", { text: x });
                  })),
                ])
              : null,
            (a.rubrik || []).length
              ? el("div", { class: "kv-olcut__blok" }, [
                  el("h5", { text: t("rubrik") }),
                  el("p", { class: "kv-ek7__rubrik", text: a.rubrik.join(" · ") }),
                ])
              : null,
          ]),
        ]);
      })));
    }));
  }

  /* EK 2 — süreç aşamaları, metindeki sürelerle tutarlı. */
  function surecBlok() {
    var adimlar = {
      tr: [
        ["Başvuru", "Kuruluş, başvurusunu MİS üzerinden hazırlar ve gönderir."],
        ["Ön değerlendirme · 15 gün", "Kurul personeli başvuruyu inceler; eksik varsa 30 gün süre verilir."],
        ["Komisyon incelemesi · 30 gün", "Komisyon ölçütleri değerlendirir ve raporu hazırlar."],
        ["Kurul kararı", "Beş yıl yetkilendirme, iki yıl yetkilendirme veya ret."],
        ["Tebliğ ve itiraz · 30 gün", "Karar bildirilir; kuruluş 30 gün içinde itiraz edebilir."],
        ["İzleme", "Belge tarihinden itibaren yıllık izleme süreci başlar."],
      ],
      en: [
        ["Application", "The organisation prepares and submits its application through MİS."],
        ["Preliminary review · 15 days", "Council staff examine the application; 30 days are given for any deficiencies."],
        ["Commission examination · 30 days", "The Commission assesses the criteria and prepares its report."],
        ["Council decision", "Authorisation for five years, authorisation for two years, or rejection."],
        ["Notification and appeal · 30 days", "The decision is notified; the organisation may appeal within 30 days."],
        ["Monitoring", "The annual monitoring process begins from the date of the certificate."],
      ],
    };
    return el("div", { class: "kv-asama" }, adimlar[dil].map(function (a, i) {
      return el("div", { class: "kv-asama__oge" }, [
        el("span", { class: "kv-asama__sure", text: String(i + 1).padStart(2, "0") }),
        el("div", {}, [
          el("div", { class: "kv-asama__baslik", text: a[0] }),
          el("p", { text: a[1] }),
        ]),
      ]);
    }));
  }

  /* ------------------------------------------------------------------
     Kısım ve bölüm
     ------------------------------------------------------------------ */
  function kisimCiz(k, alt) {
    var kok = el("section", { class: alt ? "kv-alt" : "kv-kisim", id: k.id });
    if (k.baslik) {
      kok.appendChild(el(alt ? "h4" : "h3", { class: alt ? "kv-alt__baslik" : "kv-kisim__baslik" }, [
        k.no ? el("span", { class: "kv-kisim__no", text: k.no }) : null,
        el("span", { text: p(k.baslik) }),
      ]));
    }

    if (k.kaynakBekliyor) {
      kok.appendChild(el("div", { class: "kv-bekliyor" }, [
        el("div", { class: "kv-bekliyor__baslik", text: t("bekliyor") }),
        el("p", { text: t("bekliyorMetin") }),
      ]));
    }

    (k.bloklar || []).forEach(function (b) {
      var n = blok(b);
      if (n) kok.appendChild(n);
    });

    (k.altKisimlar || []).forEach(function (a) { kok.appendChild(kisimCiz(a, true)); });

    if (k.kaynak) {
      kok.appendChild(el("div", { class: "kv-kaynak", text: t("kaynak") + ": " + k.kaynak }));
    }
    return kok;
  }

  function bolumCiz(b) {
    var ust = b.tur === "ek" ? t("ek") + " " + b.no : b.no ? t("bolum") + " " + b.no : null;
    return el("section", { class: "kv-bolum", id: b.id }, [
      ust ? el("div", { class: "kv-bolum__ust", text: ust }) : null,
      el("h2", { class: "kv-bolum__baslik", text: p(b.baslik) }),
    ].concat((b.kisimlar || []).map(function (k) { return kisimCiz(k, false); })));
  }

  /* ------------------------------------------------------------------
     Kapak, içindekiler, araç çubuğu
     ------------------------------------------------------------------ */
  function kapakCiz() {
    return el("header", { class: "kv-kapak" }, [
      el("div", { class: "kv-kapak__kurum", text: p(K.meta.kurum) }),
      el("h1", { class: "kv-kapak__baslik", text: p(K.meta.baslik) }),
      el("div", { class: "kv-kapak__surum" }, [
        el("span", { class: "kv-rozet", text: t("surum") + " " + K.meta.surum }),
        el("span", { text: p(K.meta.tarih) }),
        el("span", { text: p(K.meta.onceki) }),
      ]),
      el("div", { class: "kv-kapak__baski" }, [
        el("p", { text: t("dayanak") }),
        el("p", {}, [
          el("strong", { text: t("surum") + " " + K.meta.surum + " · " + p(K.meta.tarih) }),
        ]),
      ]),
    ]);
  }

  /* Ekran içindekiler rayı */
  function tocCiz() {
    var kok = el("nav", { class: "kv-toc", "aria-label": t("icindekiler") });
    var gruplar = [
      { ad: t("onBolum"), tur: "on" },
      { ad: t("bolumler"), tur: "bolum" },
      { ad: t("ekler"), tur: "ek" },
    ];
    gruplar.forEach(function (g) {
      var uyan = K.bolumler.filter(function (b) { return b.tur === g.tur; });
      if (!uyan.length) return;
      kok.appendChild(el("div", { class: "kv-toc__grup", text: g.ad }));
      uyan.forEach(function (b) {
        kok.appendChild(el("a", { href: "#" + b.id, "data-hedef": b.id }, [
          b.no ? el("span", { class: "kv-toc__no", text: b.tur === "ek" ? "E" + b.no : b.no }) : null,
          el("span", { text: p(b.baslik) }),
        ]));
        (b.kisimlar || []).forEach(function (k) {
          if (!k.baslik) return;
          kok.appendChild(el("a", { href: "#" + k.id, class: "kv-toc--alt", "data-hedef": k.id }, [
            k.no ? el("span", { class: "kv-toc__no", text: k.no }) : null,
            el("span", { text: p(k.baslik) }),
          ]));
        });
      });
    });
    return kok;
  }

  /* Baskı içindekiler — sayfa numaraları yazdırmadan önce hesaplanır. */
  function baskiTocCiz() {
    var ol = el("ol", {});
    K.bolumler.forEach(function (b) {
      ol.appendChild(el("li", { "data-hedef": b.id }, [
        el("span", { class: "kv-baski-toc__no", text: b.tur === "ek" ? t("ek") + " " + b.no : (b.no || "") }),
        el("span", { text: p(b.baslik) }),
        el("span", { class: "kv-baski-toc__nokta" }),
        el("span", { class: "kv-baski-toc__sayfa", text: "" }),
      ]));
      (b.kisimlar || []).forEach(function (k) {
        if (!k.baslik) return;
        ol.appendChild(el("li", { class: "kv-baski-toc--alt", "data-hedef": k.id }, [
          el("span", { class: "kv-baski-toc__no", text: k.no || "" }),
          el("span", { text: p(k.baslik) }),
          el("span", { class: "kv-baski-toc__nokta" }),
          el("span", { class: "kv-baski-toc__sayfa", text: "" }),
        ]));
      });
    });
    return el("section", { class: "kv-baski-toc" }, [
      el("h2", { text: t("icindekiler") }),
      ol,
    ]);
  }

  /**
   * Baskı içindekiler tablosunun sayfa numaralarını doldurur.
   * CSS'in target-counter'ı tarayıcılarda bulunmadığından, hedeflerin
   * belge içindeki dikey konumu A4 yazı alanı yüksekliğine bölünerek
   * kestirilir. Kapak ve içindekiler iki sayfa sayılır.
   */
  function sayfaNumaralari() {
    var MM = 3.7795;                       // 1 mm ≈ 3.7795 px (96 dpi)
    var yaziAlani = (297 - 22 - 20) * MM;  // A4 yüksekliği eksi kenar boşlukları
    var onSayfa = 2;                       // kapak + içindekiler
    var govde = document.querySelector(".kv-govde");
    var taban = govde.getBoundingClientRect().top + window.scrollY;
    document.querySelectorAll(".kv-baski-toc li").forEach(function (li) {
      var hedef = document.getElementById(li.getAttribute("data-hedef"));
      var alan = li.querySelector(".kv-baski-toc__sayfa");
      if (!hedef || !alan) return;
      var y = hedef.getBoundingClientRect().top + window.scrollY - taban;
      alan.textContent = String(onSayfa + Math.floor(y / yaziAlani) + 1);
    });
  }

  /* ------------------------------------------------------------------
     Arama — bölüm/kısım başlıklarında ve metinde
     ------------------------------------------------------------------ */
  function aramaKur(girdi) {
    girdi.addEventListener("input", function () {
      var q = girdi.value.trim().toLocaleLowerCase(dil === "tr" ? "tr" : "en");
      var baglantilar = document.querySelectorAll(".kv-toc a");
      if (!q) {
        baglantilar.forEach(function (a) { a.classList.remove("kv-toc--gizli"); });
        document.querySelectorAll(".kv-toc__grup").forEach(function (g) {
          g.classList.remove("kv-toc--gizli");
        });
        return;
      }
      var bulunan = 0;
      baglantilar.forEach(function (a) {
        var hedef = document.getElementById(a.getAttribute("data-hedef"));
        var metin = ((a.textContent || "") + " " + (hedef ? hedef.textContent : ""))
          .toLocaleLowerCase(dil === "tr" ? "tr" : "en");
        var uyar = metin.indexOf(q) !== -1;
        a.classList.toggle("kv-toc--gizli", !uyar);
        if (uyar) bulunan++;
      });
      document.querySelectorAll(".kv-toc__grup").forEach(function (g) {
        g.classList.add("kv-toc--gizli");
      });
      if (!bulunan) return;
      document.querySelectorAll(".kv-toc a:not(.kv-toc--gizli)").forEach(function (a) {
        var onceki = a.previousElementSibling;
        while (onceki && !onceki.classList.contains("kv-toc__grup")) onceki = onceki.previousElementSibling;
        if (onceki) onceki.classList.remove("kv-toc--gizli");
      });
    });
  }

  /* Okunan kısmı içindekilerde işaretle */
  function izleyiciKur() {
    var hedefler = [].slice.call(document.querySelectorAll(".kv-bolum, .kv-kisim"));
    var gozlemci = new IntersectionObserver(function (girisler) {
      girisler.forEach(function (g) {
        if (!g.isIntersecting) return;
        document.querySelectorAll(".kv-toc a[aria-current]").forEach(function (a) {
          a.removeAttribute("aria-current");
        });
        var a = document.querySelector('.kv-toc a[data-hedef="' + g.target.id + '"]');
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-10% 0px -75% 0px" });
    hedefler.forEach(function (h) { if (h.id) gozlemci.observe(h); });
  }

  /* ------------------------------------------------------------------
     Çizim
     ------------------------------------------------------------------ */
  function ciz() {
    document.documentElement.lang = dil;
    document.title = p(K.meta.kisaBaslik) + " · " + t("surum") + " " + K.meta.surum;

    var ray = document.getElementById("ray");
    var govde = document.getElementById("govde");
    ray.innerHTML = "";
    govde.innerHTML = "";

    ray.appendChild(el("div", { class: "kv-ray__marka" }, [
      el("img", { class: "kv-ray__logo", src: "../logosolo.png", alt: "" }),
      el("div", { class: "kv-ray__ad", text: p(K.meta.kurum) }),
    ]));
    var ara = el("input", { class: "kv-ara", type: "search", placeholder: t("ara"), "aria-label": t("ara") });
    ray.appendChild(ara);
    ray.appendChild(tocCiz());

    var arac = el("div", { class: "kv-arac no-print" }, [
      el("div", { class: "kv-dil" }, [
        dilDugme("tr", "TR"),
        dilDugme("en", "EN"),
      ]),
      el("span", { class: "kv-arac__bosluk" }),
      yazdirDugme(),
    ]);

    govde.appendChild(arac);
    govde.appendChild(kapakCiz());
    govde.appendChild(baskiTocCiz());
    K.bolumler.forEach(function (b) { govde.appendChild(bolumCiz(b)); });

    govde.appendChild(el("div", { class: "kv-baski-ust", text: p(K.meta.kisaBaslik) + " · " + t("surum") + " " + K.meta.surum }));
    govde.appendChild(el("div", { class: "kv-baski-alt", text: p(K.meta.kurum) + " · " + p(K.meta.tarih) }));

    aramaKur(ara);
    izleyiciKur();
    sayfaNumaralari();
  }

  function dilDugme(kod, etiket) {
    var b = el("button", { type: "button", text: etiket, "aria-pressed": String(dil === kod) });
    b.addEventListener("click", function () {
      if (dil === kod) return;
      dil = kod;
      try { localStorage.setItem("kilavuz.dil", kod); } catch (e) { /* gizli mod */ }
      ciz();
    });
    return b;
  }

  function yazdirDugme() {
    var b = el("button", { type: "button", class: "btn btn--secondary", text: t("yazdir") });
    b.addEventListener("click", function () {
      sayfaNumaralari();
      window.print();
    });
    return b;
  }

  /* Yazdırma kısayolla da başlatılabilir; numaralar önce tazelensin. */
  window.addEventListener("beforeprint", sayfaNumaralari);
  window.addEventListener("resize", sayfaNumaralari);

  try {
    var kayitli = localStorage.getItem("kilavuz.dil");
    if (kayitli === "tr" || kayitli === "en") dil = kayitli;
  } catch (e) { /* gizli mod */ }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ciz);
  } else {
    ciz();
  }
})();

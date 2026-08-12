/* ==========================================================================
   App — sekme/adım gezinmesi, ilerleme, önizleme, kalıcılık
   Navigation, progress, review, persistence
   ========================================================================== */

(function () {
  "use strict";

  var S = window.Store;
  var V = window.Validate;
  var F = window.Fields;
  var el = F.el;
  var icon = F.icon;
  var pick = function (v) {
    return window.I18N.pick(v);
  };
  var t = function (k, p) {
    return window.I18N.t(k, p);
  };

  var tabs = window.SCHEMA.tabs;
  var state = { tab: 0, step: 0 };

  /* ==================================================================
     Başlangıç / bootstrap
     ================================================================== */
  function init() {
    S.load();

    var prefs = S.getPrefs();

    // Dil: kayıtlı tercih → Türkçe (varsayılan)
    window.I18N.set(prefs.lang === "en" ? "en" : "tr");

    // Tema: kayıtlı tercih → sistem tercihi
    var theme =
      prefs.theme ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    // Eski biçimdeki (standart başına dizi) kanıtları koleksiyona taşı.
    var movedEvidence = window.Evidence.migrateLegacy();
    if (movedEvidence) toast(t("evidence.migrated", { n: movedEvidence }), "info");

    // MİS ön başvurusu devredildiyse alanları besle.
    ingestPreRegistration();

    // Kaldığı yerden devam / resume where the applicant left off
    if (prefs.position && typeof prefs.position.tab === "number") {
      state.tab = Math.min(prefs.position.tab, tabs.length - 1);
      state.step = Math.min(prefs.position.step || 0, tabs[state.tab].steps.length - 1);
    }

    F.onDirty(function (field) {
      // Bir alan başka alanların görünürlüğünü (showIf) veya bir bölümün
      // muafiyetini (exemptIf) denetliyorsa adımı yeniden çiz.
      if (controlsVisibility(field)) return render();
      clearSatisfiedErrors();
      refreshChrome();
    });

    buildHeader();
    buildTabs();
    render();
    bindKeys();

    S.onChange(function (path) {
      if (path === "__saved") updateSaveState();
    });
  }

  /* ==================================================================
     Üst bar / header
     ================================================================== */
  function buildHeader() {
    // Sabit başlık metinlerini de dile uydur
    document.getElementById("brand-sub").textContent = t("app.subtitle").split("·").pop().trim();
    document.getElementById("ctx-label").textContent = t("header.application");
    document.getElementById("ctx-value").textContent = t("app.title");
    document.title = "YÖKAK · " + t("app.title");

    var host = document.getElementById("header-actions");
    host.innerHTML = "";

    // Kayıt durumu
    var save = el("div", { class: "save-state", id: "save-state" }, [
      el("span", { class: "save-state__dot" }),
      el("span", { id: "save-state-text" }),
    ]);
    host.appendChild(save);

    // Dil değiştirici
    var langBox = el("div", { class: "segmented", role: "group", "aria-label": t("header.lang") });
    ["tr", "en"].forEach(function (code) {
      var b = el("button", {
        type: "button",
        class: "segmented__btn",
        "aria-pressed": window.I18N.lang === code ? "true" : "false",
        text: code.toUpperCase(),
      });
      b.addEventListener("click", function () {
        window.I18N.set(code);
        S.setPref("lang", code);
        buildHeader();
        buildTabs();
        render();
      });
      langBox.appendChild(b);
    });
    host.appendChild(langBox);

    // Tema
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var themeBtn = el("button", {
      type: "button",
      class: "btn btn--ghost btn--icon",
      title: isDark ? t("header.themeLight") : t("header.themeDark"),
      "aria-label": isDark ? t("header.themeLight") : t("header.themeDark"),
    }, [icon(isDark ? "sun" : "moon", "btn__icon")]);
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      S.setPref("theme", next);
      buildHeader();
    });
    host.appendChild(themeBtn);

    // Dışa aktar
    var exportBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: t("header.export") }, [
      icon("download", "btn__icon"),
      el("span", { class: "btn-label", text: t("header.export") }),
    ]);
    exportBtn.addEventListener("click", function () {
      S.download();
      toast(t("toast.exported"), "success");
    });
    host.appendChild(exportBtn);

    // İçe aktar
    var fileInput = el("input", { type: "file", accept: ".json,application/json", class: "sr-only", id: "import-file" });
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          S.importJSON(String(reader.result));
          toast(t("toast.imported"), "success");
          buildTabs();
          render();
        } catch (e) {
          toast(t("toast.importError"), "danger");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });
    var importBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: t("header.import") }, [
      icon("upload", "btn__icon"),
      el("span", { class: "btn-label", text: t("header.import") }),
    ]);
    importBtn.addEventListener("click", function () {
      fileInput.click();
    });
    host.appendChild(importBtn);
    host.appendChild(fileInput);

    // Sıfırla
    var resetBtn = el("button", { type: "button", class: "btn btn--ghost btn--icon", title: t("header.reset"), "aria-label": t("header.reset") }, [
      icon("reset", "btn__icon"),
    ]);
    resetBtn.addEventListener("click", confirmReset);
    host.appendChild(resetBtn);

    updateSaveState();
  }

  function updateSaveState() {
    var text = document.getElementById("save-state-text");
    if (!text) return;
    var d = S.lastSaved();
    text.textContent = d
      ? t("save.at") + " " + d.toLocaleTimeString(window.I18N.lang === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit" })
      : t("save.never");
  }

  /* ==================================================================
     Sekme çubuğu / tab bar
     ================================================================== */
  function buildTabs() {
    var bar = document.getElementById("tabbar");
    bar.innerHTML = "";
    bar.setAttribute("role", "tablist");
    bar.setAttribute("aria-label", t("a11y.tabs"));

    tabs.forEach(function (tab, i) {
      var prog = V.tabProgress(tab, S);
      var exempt = V.isTabExempt(tab, S);
      var complete = !exempt && prog.total > 0 && prog.done === prog.total;

      var btn = el("button", {
        type: "button",
        role: "tab",
        id: "tab_" + tab.id,
        class: "tab" + (complete ? " tab--complete" : "") + (exempt ? " tab--exempt" : ""),
        "aria-selected": i === state.tab ? "true" : "false",
        "aria-controls": "panel_" + tab.id,
        tabindex: i === state.tab ? "0" : "-1",
      });

      var index = el("span", { class: "tab__index" });
      if (complete) index.appendChild(icon("check"));
      else if (exempt) index.textContent = "—";
      else index.textContent = String(i + 1);
      btn.appendChild(index);

      var labelBox = el("span", { class: "tab__label" }, [
        el("span", { class: "tab__label-main", text: pick(tab.label) }),
        el("span", {
          class: "tab__label-sub",
          text: exempt ? t("exempt.badge") : tab.sublabel ? pick(tab.sublabel) : "",
        }),
      ]);
      btn.appendChild(labelBox);

      btn.addEventListener("click", function () {
        go(i, 0);
      });
      bar.appendChild(btn);
    });
  }

  /* ==================================================================
     Kenar çubuğu / sidebar (adımlar + özet)
     ================================================================== */
  function buildSidebar() {
    var host = document.getElementById("sidebar");
    host.innerHTML = "";

    var tab = tabs[state.tab];

    /* -- genel ilerleme -- */
    var p = V.progress(tabs, S);
    var summary = el("section", { class: "sidebar-section" }, [
      el("h2", { class: "sidebar-section__title", text: t("summary.title") }),
      el("div", { class: "sidebar-summary glass" }, [
        el("div", { class: "progress" }, [
          el("div", { class: "progress__meta" }, [
            el("span", { text: t("nav.progress") }),
            el("strong", { class: "count-roll", text: p.percent + "%" }),
          ]),
          el("div", {
            class: "progress__track",
            role: "progressbar",
            "aria-valuenow": String(p.percent),
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": t("nav.progress"),
          }, [el("div", { class: "progress__fill", style: "width:" + p.percent + "%" })]),
        ]),
        row(t("summary.type"), typeLabel()),
        row(t("summary.agency"), S.get("agency.acronym") || S.get("agency.nameTr") || "—"),
        row(t("summary.programmes"), String((S.get("scope.programmes", []) || []).length)),
        evidenceRow(),
        row(t("summary.completed"), p.done + " / " + p.total),
        row(t("summary.missing"), String(p.missing)),
      ]),
    ]);
    host.appendChild(summary);

    /* -- adımlar -- */
    var steps = el("section", { class: "sidebar-section" }, [
      el("h2", { class: "sidebar-section__title", text: pick(tab.label) + " · " + t("nav.steps") }),
    ]);
    var stepper = el("nav", { class: "stepper", "aria-label": t("a11y.steps") });

    var shown = 0;
    tab.steps.forEach(function (step, i) {
      if (!V.isVisible(step, S)) return; // koşulu sağlanmayan adım listelenmez
      shown++;
      var st = V.stepState(step, S);
      var errs = V.stepErrorCount(step, S);
      var cls = "step-item";
      if (st === "complete") cls += " step-item--complete";
      else if (st === "partial") cls += " step-item--error";

      var marker = el("span", { class: "step-item__marker" });
      if (st === "complete") marker.appendChild(icon("check"));
      else marker.textContent = String(shown);

      var item = el("button", {
        type: "button",
        class: cls,
        "aria-current": i === state.step ? "step" : null,
      }, [
        marker,
        el("span", { class: "step-item__body" }, [
          el("span", { class: "step-item__title", text: pick(step.short || step.title) }),
          errs > 0 && st !== "empty"
            ? el("span", { class: "step-item__meta", text: t("validate.summary", { n: errs }) })
            : null,
        ]),
      ]);
      item.addEventListener("click", function () {
        go(state.tab, i);
      });
      stepper.appendChild(item);
    });

    steps.appendChild(stepper);
    host.appendChild(steps);
  }

  function row(label, value) {
    return el("div", { class: "sidebar-summary__row" }, [
      el("span", { class: "sidebar-summary__label", text: label }),
      el("span", { class: "sidebar-summary__value", text: value || "—" }),
    ]);
  }

  /**
   * Koleksiyondaki kanıt sayısı. Yalnızca erişilebilir kanıtlar sayılır —
   * bir ESG adımının tamamlanmış sayılması için de aynı ölçüt geçerlidir.
   * Hiçbir standarda bağlanmamış kanıtlar sayıya girer ama ESG adımlarına
   * ulaşmadıkları için ayrıca belirtilir.
   */
  function evidenceRow() {
    var EV = window.Evidence;
    var usable = EV.all().filter(EV.isUsable);
    var loose = usable.filter(function (it) {
      return !(it.tags || []).some(function (c) {
        return c !== EV.OTHER;
      });
    }).length;

    var r = row(t("summary.evidence"), String(usable.length));
    if (loose) {
      r.querySelector(".sidebar-summary__value").appendChild(
        el("span", {
          class: "sidebar-summary__note",
          text: t("summary.evidenceLoose", { n: loose }),
          title: t("summary.evidenceLooseHint"),
        })
      );
    }
    return r;
  }

  function typeLabel() {
    var v = S.get("applicationType");
    if (!v) return t("header.noType");
    var opt = tabs[0].steps[0].fields[0].options.filter(function (o) {
      return o.value === v;
    })[0];
    return opt ? pick(opt.label) : v;
  }

  /* ==================================================================
     Ana ilerleme çubuğu / prominent completion bar
     ================================================================== */
  function buildTopProgress() {
    var host = document.getElementById("topprogress");
    var p = V.progress(tabs, S);
    host.innerHTML = "";
    host.appendChild(
      el("div", { class: "topbar-progress glass" }, [
        el("div", { class: "topbar-progress__label" }, [
          el("span", { class: "topbar-progress__title", text: t("nav.progress") }),
          el("span", { class: "topbar-progress__stat" }, [
            el("strong", { class: "count-roll", text: p.percent + "%" }),
            el("span", { text: " · " + p.done + "/" + p.total }),
          ]),
        ]),
        el("div", {
          class: "progress__track",
          role: "progressbar",
          "aria-valuenow": String(p.percent),
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-label": t("nav.progress"),
        }, [el("div", { class: "progress__fill", style: "width:" + p.percent + "%" })]),
      ])
    );
  }

  /* ==================================================================
     Adım görünümü / step view
     ================================================================== */
  function render() {
    var tab = tabs[state.tab];
    var step = tab.steps[state.step];
    var main = document.getElementById("stepview");

    main.innerHTML = "";
    var view = el("div", { class: "step-view" });

    /* Başlık */
    var head = el("header", { class: "step-head" });
    var eyebrow = step.eyebrow || tab.intro;
    head.appendChild(
      el("p", { class: "step-head__eyebrow" }, [
        el("span", { text: pick(tab.label) }),
        el("span", { text: "·" }),
        el("span", { text: eyebrow ? pick(eyebrow) : t("nav.steps") + " " + (visibleStepIndexes(tab).indexOf(state.step) + 1) + "/" + visibleStepIndexes(tab).length }),
      ])
    );
    head.appendChild(el("h1", { class: "step-head__title", text: pick(step.title) }));
    if (step.desc) head.appendChild(el("p", { class: "step-head__desc", text: pick(step.desc) }));
    view.appendChild(head);

    /* Muafiyet uyarısı — EQAR kayıtlı ajans değerlendirmesi sunulduğunda */
    if (V.isTabExempt(tab, S)) {
      view.appendChild(
        el("div", { class: "alert alert--success", style: "margin-bottom:var(--space-8)" }, [
          icon("check", "alert__icon"),
          el("div", {}, [
            el("div", { class: "alert__title", text: t("exempt.title") }),
            el("div", { text: t("exempt.body", { agency: S.get("priorReview.agency") || "—" }) }),
          ]),
        ])
      );
    }

    /* Alanlar */
    if (step.fields.some(function (f) { return f.type === "review"; })) {
      view.appendChild(renderReview());
    } else {
      var grid = el("div", { class: "field-grid stagger" });
      step.fields.forEach(function (f) {
        var node = F.render(f);
        if (node) grid.appendChild(node);
      });
      view.appendChild(grid);
    }

    /* Gezinme */
    view.appendChild(buildActions());
    main.appendChild(view);

    buildSidebar();
    buildTopProgress();
    buildTabs();
    persistPosition();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function refreshChrome() {
    buildSidebar();
    buildTopProgress();
    buildTabs();
  }

  /**
   * Görünen hataları tazele — artık geçerli olanları gizle.
   * Bir alanın doldurulması başka bir alanın hatasını giderebilir
   * (ör. requireOneOf: dosya ya da bağlantı). Yeni hata göstermez;
   * hata eklemek adım geçişine ve alandan çıkışa bırakılır.
   */
  function clearSatisfiedErrors() {
    var step = tabs[state.tab].steps[state.step];
    step.fields.forEach(function (f) {
      if (!f.id) return;
      var node = document.getElementById("err_" + F.safeId(f.id));
      if (!node || node.hidden) return;
      if (!V.field(f, S)) F.showError(f.id, null);
    });
  }

  /* Bu alanın değeri başka alanların görünürlüğünü denetliyor mu? */
  var CONTROLLERS = (function () {
    var set = {};
    function note(cond) {
      if (!cond) return;
      if (cond.all) return cond.all.forEach(note);
      if (cond.any) return cond.any.forEach(note);
      if (cond.field) set[cond.field] = true;
    }
    tabs.forEach(function (tab) {
      note(tab.exemptIf);
      tab.steps.forEach(function (step) {
        note(step.showIf);
        step.fields.forEach(function (f) {
          note(f.showIf);
        });
      });
    });
    return set;
  })();

  function controlsVisibility(field) {
    if (!field || !field.id || !CONTROLLERS[field.id]) return false;
    // Yalnızca ayrık seçim alanlarında yeniden çiz — metin girerken
    // yeniden çizim odağı bozar.
    return ["radio", "select", "checkboxes", "application-type"].indexOf(field.type) !== -1;
  }

  function buildActions() {
    var box = el("div", { class: "step-actions" });
    var vis = visibleStepIndexes(tabs[state.tab]);
    var isFirst = state.tab === 0 && state.step === (vis.length ? vis[0] : 0);
    var isLast = state.tab === tabs.length - 1 && state.step === (vis.length ? vis[vis.length - 1] : 0);

    if (!isFirst) {
      var prev = el("button", { type: "button", class: "btn btn--secondary" }, [
        icon("arrowLeft", "btn__icon"),
        document.createTextNode(t("nav.prev")),
      ]);
      prev.addEventListener("click", goPrev);
      box.appendChild(prev);
    }

    box.appendChild(el("div", { class: "step-actions__spacer" }));

    var saveBtn = el("button", { type: "button", class: "btn btn--ghost" }, [
      icon("save", "btn__icon"),
      document.createTextNode(t("header.save")),
    ]);
    saveBtn.addEventListener("click", function () {
      S.save();
      toast(t("toast.saved"), "success");
    });
    box.appendChild(saveBtn);

    if (!isLast) {
      var next = el("button", { type: "button", class: "btn btn--primary" }, [
        document.createTextNode(t("nav.next")),
        icon("arrowRight", "btn__icon"),
      ]);
      next.addEventListener("click", goNext);
      box.appendChild(next);
    } else {
      var submit = el("button", { type: "button", class: "btn btn--accent btn--lg" }, [
        icon("send", "btn__icon"),
        document.createTextNode(t("nav.submit")),
      ]);
      submit.addEventListener("click", submitApplication);
      box.appendChild(submit);
    }

    return box;
  }

  /* ==================================================================
     Önizleme / review
     ================================================================== */
  function renderReview() {
    var host = el("div", {});

    var p = V.progress(tabs, S);
    host.appendChild(
      el("div", { class: "alert alert--" + (p.missing === 0 ? "success" : "warning"), style: "margin-bottom:var(--space-6)" }, [
        icon(p.missing === 0 ? "check" : "info", "alert__icon"),
        el("div", {}, [
          el("div", { class: "alert__title", text: t("nav.progress") + ": " + p.percent + "%" }),
          el("div", { text: p.missing === 0 ? t("toast.saved") : t("validate.summary", { n: p.missing }) }),
        ]),
      ])
    );

    tabs.forEach(function (tab) {
      if (tab.id === "submit") return;
      var group = el("section", { class: "review-group" });
      group.appendChild(
        el("h2", { class: "review-group__title" }, [
          el("span", { text: pick(tab.label) }),
          tab.sublabel ? el("span", { class: "badge badge--neutral", text: pick(tab.sublabel) }) : null,
        ])
      );

      var list = el("div", { class: "review-list" });
      tab.steps.forEach(function (step) {
        if (!V.isVisible(step, S)) return; // koşulu sağlanmayan adım önizlemeye girmez
        step.fields.forEach(function (f) {
          if (!f.id || f.type === "esg-standard" || f.type === "review") return;
          if (!V.isVisible(f, S)) return;
          var value = formatValue(f);
          var empty = value === "";
          list.appendChild(
            el("div", { class: "review-row" }, [
              el("span", { class: "review-row__label", text: pick(f.label || { tr: f.id, en: f.id }) }),
              el("span", {
                class: "review-row__value" + (empty ? " review-row__value--empty" : ""),
                text: empty ? t("review.empty") : value,
              }),
            ])
          );
        });
      });
      group.appendChild(list);
      host.appendChild(group);
    });

    var actions = el("div", { class: "step-actions no-print" });
    var dl = el("button", { type: "button", class: "btn btn--secondary" }, [
      icon("download", "btn__icon"),
      document.createTextNode(t("review.download")),
    ]);
    dl.addEventListener("click", function () {
      S.download();
      toast(t("toast.exported"), "success");
    });
    var pr = el("button", { type: "button", class: "btn btn--secondary" }, [
      icon("print", "btn__icon"),
      document.createTextNode(t("review.print")),
    ]);
    pr.addEventListener("click", function () {
      window.print();
    });
    actions.appendChild(dl);
    actions.appendChild(pr);
    host.appendChild(actions);

    return host;
  }

  function formatValue(field) {
    var v = S.get(field.id);

    /* Kanıt alanları değerlerini kendi kimliklerinde değil merkezî
       koleksiyonda tutar; boşluk kontrolünden önce ele alınmalıdır. */
    if (field.type === "evidence-library") {
      return window.Evidence.all()
        .filter(window.Evidence.isUsable)
        .map(function (it) {
          var tags = (it.tags || []).filter(function (c) {
            return c !== window.Evidence.OTHER;
          });
          return it.name + (tags.length ? " [" + tags.sort().join(", ") + "]" : "");
        })
        .join(" · ");
    }

    if (field.type === "evidence-picker") {
      return window.Evidence.byStandard(field.standard)
        .map(function (it) {
          return it.name || t("evidence.unnamed");
        })
        .join(" · ");
    }

    if (V.isEmpty(v)) return "";

    if (field.type === "programme-picker") {
      var PD = window.PROGRAM_DATA;
      return (v || [])
        .map(function (c) {
          var p = PD.find(c);
          // Öğretim düzeyi özet listesinde de ayırt edilebilmelidir.
          return p ? pick(p.name) + " (" + pick(PD.levelName(PD.levelOf(p))) + ")" : c;
        })
        .join(" · ");
    }
    if (field.type === "repeater") {
      return (v || [])
        .map(function (row, i) {
          return (
            i + 1 + ". " +
            field.itemFields
              .map(function (sf) {
                if (!row[sf.id]) return null;
                var shown = row[sf.id];
                // Yüklenen dosya bir nesnedir; özette adıyla anılır
                if (sf.type === "file") {
                  return pick(sf.label) + ": " + (shown.name || "");
                }
                // Seçim alanlarında ham değer yerine etiketi göster
                if (sf.options) {
                  var opt = sf.options.filter(function (o) {
                    return o.value === row[sf.id];
                  })[0];
                  if (opt) shown = pick(opt.label);
                }
                return pick(sf.label) + ": " + shown;
              })
              .filter(Boolean)
              .join(" | ")
          );
        })
        .join("\n");
    }
    if (field.type === "checkboxes") {
      return (v || [])
        .map(function (val) {
          var o = (field.options || []).filter(function (x) {
            return x.value === val;
          })[0];
          return o ? pick(o.label) : val;
        })
        .join("\n");
    }
    if (field.type === "radio" || field.type === "select" || field.type === "application-type") {
      var opt = (field.options || []).filter(function (o) {
        return o.value === v;
      })[0];
      return opt ? pick(opt.label) : String(v);
    }
    if (field.type === "document-list") {
      return ((v && v.checked) || [])
        .map(function (id) {
          var d = field.documents.filter(function (x) {
            return x.id === id;
          })[0];
          return d ? pick(d.label) : id;
        })
        .join("\n");
    }
    if (field.type === "esg1-coverage") {
      return window.ESG.part1
        .filter(function (s) {
          return (v[s.code.replace(".", "_")] || {}).how;
        })
        .map(function (s) {
          return s.code + ": " + v[s.code.replace(".", "_")].how;
        })
        .join("\n\n");
    }
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  /* ==================================================================
     Gezinme / navigation
     ================================================================== */
  /**
   * Bir sekmedeki görünür adımların indeksleri.
   * Adımlar showIf ile koşullu olabilir (ör. yalnızca yetkilendirme
   * başvurularında görünen Mali Beyanlar). state.step tam diziye göre
   * indekslenmeye devam eder; yalnızca gezinme görünürleri izler.
   */
  function visibleStepIndexes(tab) {
    var out = [];
    tab.steps.forEach(function (step, i) {
      if (V.isVisible(step, S)) out.push(i);
    });
    return out;
  }

  function go(tabIndex, stepIndex) {
    state.tab = Math.max(0, Math.min(tabIndex, tabs.length - 1));
    var vis = visibleStepIndexes(tabs[state.tab]);
    var want = Math.max(0, Math.min(stepIndex, tabs[state.tab].steps.length - 1));
    if (vis.length && vis.indexOf(want) === -1) {
      // Gizli adım hedeflendiyse sonraki görünüre, yoksa son görünüre kay.
      var after = vis.filter(function (i) {
        return i > want;
      });
      want = after.length ? after[0] : vis[vis.length - 1];
    }
    state.step = want;
    render();
  }

  function goNext() {
    var tab = tabs[state.tab];
    var errs = V.step(tab.steps[state.step], S);
    var keys = Object.keys(errs);
    if (keys.length) {
      keys.forEach(function (id) {
        F.showError(id, errs[id]);
      });
      var first = document.querySelector('[data-field="' + keys[0] + '"]');
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      toast(t("toast.stepBlocked"), "danger");
      refreshChrome();
      return;
    }
    var vis = visibleStepIndexes(tab);
    var pos = vis.indexOf(state.step);
    if (pos !== -1 && pos < vis.length - 1) go(state.tab, vis[pos + 1]);
    else if (state.tab < tabs.length - 1) go(state.tab + 1, 0);
  }

  function goPrev() {
    var vis = visibleStepIndexes(tabs[state.tab]);
    var pos = vis.indexOf(state.step);
    if (pos > 0) return go(state.tab, vis[pos - 1]);
    if (state.tab > 0) {
      var prevVis = visibleStepIndexes(tabs[state.tab - 1]);
      go(state.tab - 1, prevVis.length ? prevVis[prevVis.length - 1] : 0);
    }
  }

  function persistPosition() {
    S.setPref("position", { tab: state.tab, step: state.step });
  }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea, select")) return;
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    });

    // Sekme çubuğunda ok tuşlarıyla gezinme (WAI-ARIA tabs pattern)
    document.getElementById("tabbar").addEventListener("keydown", function (e) {
      var keys = { ArrowRight: 1, ArrowLeft: -1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      var next = (state.tab + keys[e.key] + tabs.length) % tabs.length;
      go(next, 0);
      var btn = document.getElementById("tab_" + tabs[next].id);
      if (btn) btn.focus();
    });
  }

  /* ==================================================================
     Bildirim ve onay / toast & confirm
     ================================================================== */
  function toast(message, kind) {
    var region = document.getElementById("toasts");
    var node = el("div", { class: "toast toast--" + (kind || "info"), role: "status" }, [
      icon(kind === "danger" ? "alert" : "check"),
      el("span", { text: message }),
    ]);
    region.appendChild(node);
    setTimeout(function () {
      node.style.opacity = "0";
      node.style.transform = "translateY(6px)";
      setTimeout(function () {
        node.remove();
      }, 220);
    }, 3200);
  }

  /* ==================================================================
     MİS ön başvurusu / MİS pre-application handover
     ================================================================== */

  /**
   * MİS'ten devredilen ön başvuruyu forma işler. Yük URL fragment'inden
   * veya postMessage ile gelebilir; her iki yolda da aynı doğrulama ve
   * eşleme uygulanır. Dolu alanların üzerine yazılmaz.
   */
  function ingestPreRegistration() {
    if (!window.MIS) return;

    function accept(payload) {
      var errors = window.MIS.validate(payload);
      if (errors.length) {
        toast(t("mis.invalid", { reason: errors[0] }), "danger");
        return;
      }
      var res = window.MIS.apply(payload);
      S.save();
      if (res.filled.length) {
        toast(t("mis.applied", { n: res.filled.length }), "success");
      }
      if (res.kept.length) {
        toast(t("mis.keptExisting", { n: res.kept.length }), "info");
      }
      render();
    }

    var fromUrl = window.MIS.readFragment();
    if (fromUrl && fromUrl.error) toast(fromUrl.error, "danger");
    else if (fromUrl && fromUrl.payload) accept(fromUrl.payload);

    window.MIS.listen(function (payload) {
      accept(payload);
    });
  }

  /* ==================================================================
     Başvurunun tamamlanması / application submission
     ================================================================== */

  /**
   * Başvuru numarası: YOK-<yıl>-<6 karakter>.
   * Karışmaya açık harfler (I, O) ve rakam 0/1 alfabede yer almaz.
   * Üretim crypto.getRandomValues ile yapılır; desteklenmiyorsa
   * Math.random'a düşülür.
   */
  function makeApplicationNo() {
    var ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    var n = 6;
    var out = "";
    var buf = null;
    if (window.crypto && window.crypto.getRandomValues) {
      buf = new Uint32Array(n);
      window.crypto.getRandomValues(buf);
    }
    for (var i = 0; i < n; i++) {
      var r = buf ? buf[i] : Math.floor(Math.random() * 0xffffffff);
      out += ALPHABET.charAt(r % ALPHABET.length);
    }
    return "YOK-" + new Date().getFullYear() + "-" + out;
  }

  /** Başvuruyu tamamla: doğrula, numara üret, tamamlama ekranını aç. */
  function submitApplication() {
    var p = V.progress(tabs, S);
    var missing = p.total - p.done;
    if (missing > 0) {
      toast(t("validate.summary", { n: missing }), "danger");
      // İlk eksik alanın bulunduğu adıma götür.
      for (var ti = 0; ti < tabs.length; ti++) {
        if (V.isTabExempt(tabs[ti], S)) continue;
        for (var si = 0; si < tabs[ti].steps.length; si++) {
          var step = tabs[ti].steps[si];
          if (!V.isVisible(step, S)) continue;
          if (V.stepErrorCount(step, S) > 0) return go(ti, si);
        }
      }
      return;
    }

    // Numara bir kez üretilir; aynı başvuru yeniden gönderilirse korunur.
    var no = S.get("submission.applicationNo");
    if (!no) {
      no = makeApplicationNo();
      S.set("submission.applicationNo", no);
      S.set("submission.submittedAt", new Date().toISOString());
    }
    S.save();
    showCompletion(no);
  }

  /** Tamamlandı ekranı: başvuru numarası, dışa aktarma ve e-posta. */
  function showCompletion(no) {
    var dlg = document.getElementById("confirm-dialog");
    var email = S.get("contact.email") || "";
    var preReg = S.get("misPreRegistrationId");

    function actionButton(labelKey, iconName, variant, handler) {
      var b = el("button", { type: "button", class: "btn " + variant }, [
        icon(iconName, "btn__icon"),
        document.createTextNode(t(labelKey)),
      ]);
      b.addEventListener("click", handler);
      return b;
    }

    dlg.innerHTML = "";
    dlg.appendChild(
      el("div", { class: "completion" }, [
        el("div", { class: "completion__mark", "aria-hidden": "true" }, [icon("check")]),
        el("h2", { class: "completion__title", text: t("done.title") }),
        el("p", { class: "completion__lead", text: t("done.lead") }),

        el("div", { class: "completion__no" }, [
          el("span", { class: "completion__no-label", text: t("done.appNo") }),
          el("code", { class: "completion__no-value", text: no }),
          (function () {
            var b = el("button", {
              type: "button",
              class: "completion__copy",
              title: t("done.copy"),
              "aria-label": t("done.copy"),
            }, [icon("copy")]);
            b.addEventListener("click", function () {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(no).then(function () {
                  toast(t("done.copied"), "success");
                });
              }
            });
            return b;
          })(),
        ]),

        preReg
          ? el("p", { class: "completion__meta", text: t("done.fromMis", { id: preReg }) })
          : null,
        el("p", { class: "completion__note", text: t("done.keepNote") }),

        el("div", { class: "completion__actions" }, [
          actionButton("done.export", "download", "btn--primary", function () {
            S.download("yokak-basvuru-" + no + ".json");
            toast(t("done.exported"), "success");
          }),
          email
            ? actionButton("done.email", "mail", "btn--secondary", function () {
                window.location.href = mailtoLink(no, email);
              })
            : null,
        ]),

        email
          ? el("p", { class: "completion__meta", text: t("done.emailTarget", { email: email }) })
          : null,

        el("div", { class: "modal__footer" }, [
          (function () {
            var b = el("button", { type: "button", class: "btn btn--ghost", text: t("done.close") });
            b.addEventListener("click", function () {
              dlg.close();
            });
            return b;
          })(),
        ]),
      ])
    );
    dlg.showModal();
  }

  /** Başvuru özetini taşıyan mailto bağlantısı. */
  function mailtoLink(no, email) {
    var name = S.get("agency.nameTr") || S.get("agency.nameEn") || "";
    var kind = S.get("applicationType") === "taninma" ? t("type.taninma") : t("type.yetkilendirme");
    var body = [
      t("done.mailGreeting"),
      "",
      t("done.appNo") + ": " + no,
      t("done.mailAgency") + ": " + name,
      t("done.mailType") + ": " + kind,
      t("done.mailDate") + ": " + new Date().toLocaleDateString(window.I18N.lang === "tr" ? "tr-TR" : "en-GB"),
      "",
      t("done.mailAttachNote"),
    ].join("\n");
    return (
      "mailto:" + encodeURIComponent(email) +
      "?subject=" + encodeURIComponent(t("done.mailSubject", { no: no })) +
      "&body=" + encodeURIComponent(body)
    );
  }

  function confirmReset() {
    var dlg = document.getElementById("confirm-dialog");
    dlg.innerHTML = "";
    dlg.appendChild(
      el("div", {}, [
        el("div", { class: "modal__header" }, [el("h2", { class: "modal__title", text: t("confirm.resetTitle") })]),
        el("div", { class: "modal__body" }, [el("p", { text: t("confirm.resetBody") })]),
        el("div", { class: "modal__footer" }, [
          (function () {
            var b = el("button", { type: "button", class: "btn btn--secondary", text: t("confirm.cancel") });
            b.addEventListener("click", function () {
              dlg.close();
            });
            return b;
          })(),
          (function () {
            var b = el("button", { type: "button", class: "btn btn--danger", text: t("confirm.confirm") });
            b.addEventListener("click", function () {
              S.reset();
              dlg.close();
              state.tab = 0;
              state.step = 0;
              toast(t("toast.reset"), "success");
              render();
            });
            return b;
          })(),
        ]),
      ])
    );
    dlg.showModal();
  }

  /* ==================================================================
     Cam yüzeyler için imleç takibi / pointer tracking for glass
     ================================================================== */
  document.addEventListener("pointermove", function (e) {
    var target = e.target.closest ? e.target.closest(".glass") : null;
    if (!target) return;
    var r = target.getBoundingClientRect();
    target.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    target.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  }, { passive: true });

  /* Buton dalgası / button ripple */
  document.addEventListener("pointerdown", function (e) {
    var btn = e.target.closest ? e.target.closest(".btn") : null;
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size / 2 + "px";
    ripple.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 400);
  }, { passive: true });

  /* Ayrılmadan önce kaydet / save before unload */
  window.addEventListener("beforeunload", function () {
    S.save();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

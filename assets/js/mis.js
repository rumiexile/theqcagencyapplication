/* ==========================================================================
   MİS — ön başvuru devri / pre-application handover

   MİS'te (mis.yokak.gov.tr) yapılan ön başvurunun bu forma aktarılmasını
   sağlar. Sözleşme api/mis-onbasvuru.yaml dosyasındaki PreRegistration
   şemasıdır; aşağıdaki MAP tablosu o şemadaki x-target değerlerinin birebir
   karşılığıdır.

   Üç giriş yolu desteklenir:
     1. URL fragment   #onbasvuru=<base64url(JSON)>   (birincil)
     2. postMessage    { type: "yokak:onbasvuru", payload: {...} }
     3. Elle içe aktarma (Store.importJSON üzerinden gelen dosya)

   Fragment tercih edilir: tarayıcı fragment'i sunucuya göndermediğinden
   kişisel veri sunucu günlüklerine düşmez.
   ========================================================================== */

window.MIS = (function () {
  "use strict";

  /* Ön başvuru şeması → form alanı kimliği.
     Soldaki yollar PreRegistration şemasındaki konumlar, sağdakiler
     formdaki alan kimlikleridir. MİS formu değişirse yalnızca burası
     güncellenir. */
  var MAP = [
    ["applicationType", "applicationType"],

    ["organisation.nameTr", "agency.nameTr"],
    ["organisation.nameEn", "agency.nameEn"],
    ["organisation.acronym", "agency.acronym"],
    ["organisation.foundedYear", "agency.foundedYear"],
    ["organisation.country", "agency.country"],
    ["organisation.legalForm", "agency.legalForm"],
    ["organisation.legalFormOther", "agency.legalFormOther"],
    ["organisation.website", "agency.website"],
    ["organisation.registry.dernek", "agency.registryDernek"],
    ["organisation.registry.vakif", "agency.registryVakif"],
    ["organisation.registry.ticaret", "agency.registryTicaret"],
    ["organisation.registry.mersis", "agency.mersis"],
    ["organisation.registry.taxNo", "agency.taxNo"],

    ["contact.address", "contact.address"],
    ["contact.headName", "contact.headName"],
    ["contact.headTitle", "contact.headTitle"],
    ["contact.personName", "contact.personName"],
    ["contact.personTitle", "contact.personTitle"],
    ["contact.email", "contact.email"],
    ["contact.phone", "contact.phone"],
    ["contact.kep", "contact.kep"],
  ];

  var APPLICATION_TYPES = ["yetkilendirme", "taninma"];

  /* ------------------------------------------------------------------
     Yardımcılar
     ------------------------------------------------------------------ */
  function dig(obj, path) {
    var parts = path.split(".");
    var node = obj;
    for (var i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function isBlank(v) {
    return v === undefined || v === null || (typeof v === "string" && v.trim() === "");
  }

  /** base64url → metin. Türkçe karakterler için UTF-8 çözümlemesi yapar. */
  function decodeBase64Url(s) {
    var b64 = String(s).replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }

  /* ------------------------------------------------------------------
     Doğrulama — sözleşmenin zorunlu kıldığı asgari alanlar
     ------------------------------------------------------------------ */
  function validate(payload) {
    var errors = [];
    if (!payload || typeof payload !== "object") {
      return ["Ön başvuru verisi okunamadı."];
    }
    if (APPLICATION_TYPES.indexOf(payload.applicationType) === -1) {
      errors.push("Geçersiz başvuru türü: " + String(payload.applicationType));
    }
    if (isBlank(dig(payload, "organisation.nameTr"))) {
      errors.push("Kuruluş adı (Türkçe) eksik.");
    }
    if (isBlank(dig(payload, "contact.email"))) {
      errors.push("İletişim e-postası eksik.");
    }
    return errors;
  }

  /* ------------------------------------------------------------------
     Uygulama — yükü forma işler
     Dolu alanların üzerine yazılmaz; kullanıcının girdiği veri korunur.
     ------------------------------------------------------------------ */
  function apply(payload, options) {
    var opts = options || {};
    var S = window.Store;
    var filled = [];
    var kept = [];

    MAP.forEach(function (pair) {
      var value = dig(payload, pair[0]);
      if (isBlank(value)) return;
      if (!opts.overwrite && !isBlank(S.get(pair[1]))) {
        kept.push(pair[1]);
        return;
      }
      S.set(pair[1], value);
      filled.push(pair[1]);
    });

    if (!isBlank(payload.preRegistrationId)) {
      S.set("misPreRegistrationId", payload.preRegistrationId);
    }
    return { filled: filled, kept: kept };
  }

  /* ------------------------------------------------------------------
     Girişler
     ------------------------------------------------------------------ */
  /** URL fragment'inde ön başvuru var mı? Varsa çözer ve fragment'i temizler. */
  function readFragment() {
    var hash = window.location.hash || "";
    var m = hash.match(/[#&]onbasvuru=([^&]+)/);
    if (!m) return null;
    var payload;
    try {
      payload = JSON.parse(decodeBase64Url(m[1]));
    } catch (e) {
      return { error: "Ön başvuru bağlantısı çözülemedi." };
    }
    // Kişisel veri adres çubuğunda ve geçmişte kalmasın.
    try {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch (e) {
      /* file:// altında replaceState engellenebilir; yok sayılır. */
    }
    return { payload: payload };
  }

  /** MİS uygulamayı bir pencerede açtıysa postMessage ile de kabul edilir. */
  function listen(onPayload) {
    window.addEventListener("message", function (ev) {
      var d = ev.data;
      if (!d || d.type !== "yokak:onbasvuru" || !d.payload) return;
      onPayload(d.payload, ev.origin);
    });
  }

  return {
    map: MAP,
    validate: validate,
    apply: apply,
    readFragment: readFragment,
    listen: listen,
    decodeBase64Url: decodeBase64Url,
    /** Test ve MİS tarafı için: yükü devir bağlantısına çevirir. */
    encodeLink: function (baseUrl, payload) {
      var json = JSON.stringify(payload);
      var bytes = new TextEncoder().encode(json);
      var bin = "";
      bytes.forEach(function (b) {
        bin += String.fromCharCode(b);
      });
      var b64 = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      return baseUrl + "#onbasvuru=" + b64;
    },
  };
})();

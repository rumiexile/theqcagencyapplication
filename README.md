# YÖKAK — Kalite Güvencesi Ajansı Başvuru Sistemi

**Quality Assurance Agency Application System**

Ulusal akreditasyon ajanslarının **yetkilendirme**, uluslararası ajansların ise
**tanınma** başvurularını, Avrupa Standartları ve Yönergeleri (**ESG 2027 —
Draft 3, July 2026**) ile uyumlu biçimde toplayan, sekme ve adım tabanlı HTML
başvuru uygulaması.

Sistem **yalnızca program akreditasyonu** içindir; ayrı bir kapsam seçimi
bulunmaz. Dışa aktarılan JSON bunu `_meta.scope: "program-accreditation"`
alanıyla belirtir.

Türkçe ve İngilizce çalışır. Kurulum, derleme adımı ve sunucu gerektirmez.

---

## Hızlı başlangıç / Quick start

`index.html` dosyasını doğrudan tarayıcıda açmanız yeterlidir.

```bash
# veya yerel bir sunucu ile
python3 -m http.server 8000
# → http://localhost:8000
```

Derleme, paket kurulumu veya ağ bağlantısı gerekmez — tüm varlıklar yereldir.

---

## Özellikler

| | |
|---|---|
| **Başvuru türü** | İlk adımda seçilir: *Yetkilendirme* (Ulusal Ajanslar) veya *Tanınma* (Uluslararası Ajanslar). Seçim, formun ilerleyen alanlarını koşullu olarak değiştirir. |
| **EQAR muafiyeti** | İkinci adımda, ajansın daha önce EQAR'a kayıtlı bir ajans tarafından ESG kapsamında dış değerlendirmeden geçip geçmediği sorulur. *Evet* yanıtında rapor **dosya yükleme** (sürükle-bırak) ve **bağlantı** alanları açılır; **ESG 3 ve ESG 2 bölümleri muaf tutulur** ve tamamlanma oranına dâhil edilmez. |
| **İki dil** | Tüm arayüz ve içerik TR/EN. Başlıktaki `TR · EN` düğmesiyle anında geçiş; tercih saklanır. |
| **Tamamlanma çubuğu** | Sekme çubuğunun altında kalıcı yüzde göstergesi (`%` ve `tamamlanan/toplam`), ayrıca kenar çubuğunda özet. |
| **Yarıda bırak, sonra devam et** | Her değişiklik `localStorage`'a otomatik kaydedilir; kaldığınız sekme ve adım da saklanır. JSON olarak dışa/içe aktarılabilir. |
| **ESG 2027 Draft 3** | Standart metinleri hem TR hem EN olarak, rehber ilkeleriyle birlikte ekranda gösterilir. |
| **Program kapsamı** | ESG 1 ekranında YÖK temel alanlarına göre lisans programı seçimi; ardından **genel ölçütler** ve program bazında **özel ölçütler** girişi. |
| **Doğrulama** | Alan bazlı kurallar, adım geçişinde engelleme, sekme/adım üzerinde tamamlanma ve hata rozetleri. |
| **Erişilebilirlik** | WAI-ARIA sekme/adım örüntüleri, klavye gezinmesi (`Alt+←/→`, sekme çubuğunda ok tuşları), `prefers-reduced-motion`, `forced-colors`, odak halkaları. |
| **Görsel dil** | Liquid glass yüzeyler, imleci izleyen parlama, aurora arka plan, mikro animasyonlar. Açık/koyu tema. |

---

## Form yapısı

Sekmeler (`tabs`) → adımlar (`steps`) → alanlar (`fields`):

| # | Sekme | Adımlar |
|---|-------|---------|
| 1 | **Başvuru Türü** | Tür seçimi (Yetkilendirme / Tanınma), başvuru niteliği · **Önceki dış değerlendirme (EQAR)** |
| 2 | **Ajans Bilgileri** | Kimlik (kuruluş bilgileri · **ağ ve çatı kuruluş üyelikleri**) · İletişim · Yasal statü · Yönetişim ve kaynaklar |
| 3 | **ESG 3** — Kalite Güvencesi Ajansları | 3.1 → 3.6 (her standart bir adım) · *EQAR raporu sunulduysa muaf* |
| 4 | **ESG 2** — Dış Kalite Güvencesi | 2.1 → 2.7 · *EQAR raporu sunulduysa muaf* |
| 5 | **ESG 1** — Kapsam ve Ölçütler | Program seçimi · Genel ölçütler · Programa özel ölçütler · **Ölçütlerin ESG 1 uyumu** · Karar sistemi |
| 6 | **Belgeler** | Zorunlu belgeler · Ek destekleyici belgeler |
| 7 | **Beyan ve Gönderim** | Taahhüt ve beyan · Önizleme ve gönderim |

Her ESG adımı şunları ister: standardın resmî metni (okunur) → **ajansın
uygulaması** (kelime/karakter sayaçlı) → **öz değerlendirme** (Tam / Büyük
ölçüde / Kısmen / Uyumsuz) → **kanıtlar** (ad, URL, belge referansı).

---

## ⚠ ESG 2027 Draft 3 — numaralandırma ESG 2015'ten farklıdır

Uygulama, sağlanan *ESG 2027 draft 3 for BFUG consultation (July 2026)*
belgesinin karşılaştırma tablosundaki **Draft 3 sütununu** esas alır:

- **Bölüm 1:** 10 → **9 standart**. Eski 1.9 (*On-going Monitoring…*) 1.2 içine
  alındı; eski 1.10 → **1.9** (*Cyclical External Quality Assurance*).
- **Bölüm 2:** **7 standart**, ancak sıra değişti — *Reporting* 2.6 → **2.5**,
  *Criteria for outcomes* 2.5 → **2.6** (*Processes and criteria for outcomes*).
  2.1 *Consideration of…* → **Addressing internal quality assurance**;
  2.4 *Peer-review experts* → **Peer reviewers**.
- **Bölüm 3:** 7 → **6 standart**. *Official status* (eski 3.2) **kaldırıldı**;
  *Thematic analysis* → **3.3 Activities for enhancement**; *Professional
  conduct* ile *Internal quality assurance* birleşerek **3.5 Internal quality
  assurance and integrity** oldu; *Cyclical external review* → **3.6 Review of
  agencies**.

Standart metinleri `assets/js/esg-data.js` içinde TR + EN olarak tutulur.

---

## Dosya düzeni

```
index.html                  Uygulama kabuğu
assets/
  css/
    tokens.css              ← Tasarım jetonları (renk, tipografi, boşluk, cam)
    base.css                Reset, erişilebilirlik, yazdırma
    components.css          Buton, form, sekme, adım, kart, rozet, tablo…
    glass.css               Liquid glass yüzeyler + mikro animasyonlar
    app.css                 Düzen ve uygulamaya özgü bileşenler
  js/
    i18n.js                 TR/EN arayüz metinleri
    esg-data.js             ← ESG 2027 Draft 3 standartları (TR + EN)
    store.js                Kalıcılık, otomatik kayıt, içe/dışa aktarma
    validate.js             Doğrulama ve tamamlanma hesabı
    schema.js               ← Form şeması (sekme → adım → alan)
    fields.js               Alan render motoru
    app.js                  Gezinme, ilerleme, önizleme
  img/
    logo.png                ← YÖKAK markası (başlık ve favicon)
  data/
    programs.js             ← Program listesi (ISCED-F alan → lisans programı)
    yokak-criteria.js       ← YÖKAK Program Akreditasyon Ölçütleri (ana başlıklar)
    evidence-suggestions.js ← Standart bazında önerilen kanıtlar
```

`←` işaretli dosyalar, içerik güncellemesi için düzenlemeniz gereken yerlerdir.

---

## Uyarlama

### Kurumsal renkler
`assets/css/tokens.css` içindeki **BRAND PRIMITIVES** bloğunda yalnızca
`--yk-blue-*` ve `--yk-teal-*` ölçeklerini değiştirin. Bileşenler semantik
katmanı (`--color-brand`, `--color-accent` …) kullandığı için tüm uygulama
otomatik uyum sağlar; koyu tema dâhil.

> Varsayılan palet, kurumsal lacivert + turkuaz temelli tutarlı bir sistemdir.
> Resmî YÖKAK Kurumsal Kimlik Kılavuzu'ndaki hex değerleri elinizdeyse bu iki
> ölçeği değiştirmeniz yeterlidir.

### Program listesi
`assets/data/programs.js` üç düzeyli bir veri seti içerir:

```js
areas       // ISCED-F 2013 geniş alan (2 haneli) — 10 adet, açılır başlıklar
fields      // ISCED-F 2013 ayrıntılı alan (4 haneli) — 74 adet, alt başlıklar
programmes  // 491 lisans programı
```

Program şeması:

```js
{ code: "0112.300", area: "01", field: "0112", count: 88,
  name: "Okul Öncesi Öğretmenliği" }
```

`count`, programın kaç yükseköğretim kurumunda yürütüldüğünü belirtir ve
program adının altında gösterilir. Program adları resmî Türkçe adlardır;
İngilizce resmî karşılıkları bulunmadığından her iki dilde de aynı gösterilir —
İngilizce bağlamı, üstündeki ISCED-F ayrıntılı alan başlığı sağlar.

Arama kutusu program adı, geniş alan adı ve ayrıntılı alan adı üzerinde
birlikte çalışır.

> **Veri kaynağı:** Liste, 491 lisans programını ISCED-F 2013 ayrıntılı alan
> kodlarıyla eşleştiren `ISCED_Program_Listesi.xlsx` dosyasından üretilmiştir.
> Geniş alan (2 haneli) adları ISCED-F 2013 standart adlandırmasıdır.

### YÖKAK Program Akreditasyon Ölçütleri
`assets/data/yokak-criteria.js`, YÖKAK Program Akreditasyon Ölçütleri'nin
**9 ana başlığını** tutar. Genel ölçüt girişinde her ölçüt bunlardan biriyle
ilişkilendirilir. Ana başlıklar ESG 2027 (Draft 3) Bölüm 1'in 9 standardıyla
birebir örtüşür; `esg1` alanı bu karşılığı taşır ve seçim listesinde etiketin
sonunda gösterilir (ör. *"3. Öğrenci Merkezli Öğrenme… (ESG 1.3)"*).

Alt ölçütler ve göstergeler bu uygulamanın kapsamı dışındadır.

Bu eşleştirme "Ölçütlerin ESG 1 uyumu" adımını besler: her ESG 1 standardının
altında, ajansın o standarda eşlenmiş genel ölçütleri otomatik olarak listelenir.
Hiçbir ölçütün eşlenmediği standartlar uyarıyla işaretlenir — ESG 2.1'in
beklediği bütüncül kapsamanın boşluklarını görünür kılar.

> **Veri kaynağı:** `program_akred_ölçütleri_Geri_Bildirim.xlsx`,
> "Değerlendirme Ölçütleri" sayfası, "Ana ölçüt" sütunu.

### Logo
Başlıktaki marka `assets/img/logo.png` dosyasıdır — resmî YÖKAK logosunun
şeffaf arka planlı hâli, kenar boşlukları kırpılıp 303×176 px'e indirilmiştir.
Aynı görsel kareye ortalanarak favicon olarak `index.html` içine base64
gömülüdür.

Logoyu değiştirmek için `assets/img/logo.png` dosyasını değiştirmeniz yeterli;
CSS yüksekliği sabitler, genişlik en-boy oranına göre kendiliğinden ayarlanır.
Tek dosyalık sürüm üretilirken `assets/img` altındaki görseller otomatik olarak
data URI'ye çevrilir.

### Önerilen kanıtlar
`assets/data/evidence-suggestions.js`, YÖKAK yetkilendirme ölçütlerinde sayılan
kanıtları ESG standartlarına dağıtır. Her ESG adımının kanıt listesinin üstünde
açılır "Önerilen kanıtlar" paneli çıkar. Panel **yalnızca bilgilendirme
amaçlıdır**; okunur bir listedir, forma veri girmez.

Yetkilendirme ölçütü → ESG eşlemesi dosyanın başındaki açıklamada yer alır.
Yeni öneri eklemek için ilgili standardın dizisine `{ tr, en }` çifti eklemeniz
yeterlidir. Herhangi bir tekrarlayıcı alana `suggestions` özelliği vererek aynı
panel başka yerlerde de kullanılabilir.

### Yeni alan / adım ekleme
`assets/js/schema.js` içine alan nesnesi ekleyin. Desteklenen türler:
`text`, `email`, `url`, `tel`, `number`, `date`, `textarea`, `select`,
`radio`, `checkboxes`, `repeater`, `application-type`, `programme-picker`,
`programme-criteria`, `esg-standard`, `esg1-coverage`, `document-list`,
`file-upload`, `review`.

Koşullu görünürlük (alan düzeyinde):

```js
showIf: { field: "applicationType", equals: "taninma" }
showIf: { field: "applicationKind", in: ["yenileme", "kapsam"] }

// Birden çok koşul — all: tamamı, any: en az biri
showIf: { all: [
  { field: "applicationType", equals: "yetkilendirme" },
  { field: "agency.legalForm", equals: "dernek" },
] }
```

"En az biri" kuralı — kanıtın dosya *veya* bağlantı olarak verilebildiği
yerlerde kullanılır; listelenen alanlardan biri dolduğunda kural karşılanır:

```js
requireOneOf: ["decision.evidenceFile", "decision.evidenceUrl"]
```

Bölüm muafiyeti (sekme düzeyinde) — muaf bölümün zorunlu alanları tamamlanma
oranından düşülür, sekme "Muaf" rozetiyle işaretlenir:

```js
exemptIf: { field: "priorReview.has", equals: "evet" }
```

Bir alanın değeri başka alanların görünürlüğünü denetliyorsa
(`radio`, `select`, `checkboxes`, `application-type` türlerinde) adım
otomatik olarak yeniden çizilir.

---

## Veri ve gizlilik

Girilen tüm veriler — yüklenen dış değerlendirme raporu dâhil — yalnızca
kullanıcının tarayıcısında (`localStorage`) saklanır; hiçbir sunucuya
gönderilmez. Yüklenen dosya base64 olarak başvuru verisine gömülür ve dışa
aktarılan JSON ile birlikte taşınır (varsayılan üst sınır 4 MB; daha büyük
raporlar için bağlantı alanı kullanılmalıdır). Başvuru, **Dışa aktar** ile JSON olarak
indirilir ve YÖKAK'a bu dosya iletilir. **İçe aktar** ile aynı dosyadan kaldığı
yerden devam edilebilir.

---

## Tarayıcı desteği

Chromium, Firefox ve Safari'nin güncel sürümleri. `backdrop-filter`
desteklenmeyen tarayıcılarda cam yüzeyler düz renge iner; işlevsellik etkilenmez.

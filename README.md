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

### Tek dosyalık sürüm / Single-file build

Depoyu kopyalamak istemeyen kullanıcılar için tüm uygulama tek bir HTML
dosyasına paketlenebilir. CSS, JavaScript ve logo dosyanın içine gömülür;
ortaya çıkan dosya çift tıklanarak açılır, internet bağlantısı istemez ve
e-posta veya USB ile taşınabilir.

Hazır paket: [`dist/yokak-basvuru.html`](dist/yokak-basvuru.html)

```bash
# kaynaktan yeniden üretmek için
python3 tools/bundle.py dist/yokak-basvuru.html
```

Başvuru verisi yine tarayıcının `localStorage` alanında tutulur; tek dosyalık
sürümde de **Dışa aktar** / **İçe aktar** çalışır. Kaynak dosyaları
değiştirdiğinizde paketi yeniden üretmeniz gerekir.

---

## Kanıt koleksiyonu

Başvurudaki **tüm kanıtlar tek bir koleksiyonda** tutulur (`evidence.library`).
Her kanıt bir bağlantı, yüklenmiş bir dosya ya da her ikisi olabilir; adı
zorunludur ve en az bir erişim yolu (bağlantı veya dosya) taşımalıdır.

Kanıta üstveri olarak bir veya birden çok **ESG standardı etiketi** verilir.
ESG adımları kendi kanıt listelerini tutmaz — koleksiyondan etikete göre
okurlar. Bağ bu yüzden iki yönlü çalışır:

| Nereden | Ne olur |
|---|---|
| **Belgeler → ESG** | Koleksiyonda bir kanıta `3.4` etiketi vermek, kanıtı ESG 3.4 adımında anında görünür kılar. |
| **ESG → Belgeler** | ESG adımında kanıt eklemek, kanıtı koleksiyona yazar ve o adımın etiketini iliştirir. |
| **ESG ↔ ESG** | Aynı kanıt birden çok standarda bağlanabilir; kayıt kopyalanmaz, yalnızca etiket eklenir. |

Hiçbir standarda bağlanmayan kanıtlar **Tasnif dışı** olarak işaretlenebilir;
koleksiyonda dururlar ama hiçbir ESG adımına girmezler.

### Form adımlarından gelen belgeler

Formun bazı adımları kendi belge alanlarını taşır. Bu belgeler ESG tasnifine
girmediğinden koleksiyona **kopyalanmaz** — dizinde kendi klasörleriyle
*türetilerek* listelenir:

| Klasör | Kaynak alan | Adım |
|---|---|---|
| **Dış Değerlendirme Raporu** | `priorReview.report` + `priorReview.reportUrl` | Başvuru Türü · Önceki dış değerlendirme |
| **Ek Bağlantılar ve Belgeler** | `priorReview.extraDocs` | Başvuru Türü · Önceki dış değerlendirme |
| **Kuruluş ve Tescil Dokümanları** | `legal.documents` | Ajans Bilgileri · Yasal statü |

Dış değerlendirme raporunun dosyası ve bağlantısı **tek bir kanıt** olarak
görünür; ikisi de aynı belgeye erişim yoludur.

Kayıt tek yerde durduğu için eşitleme sorunu doğmaz. Bu klasörler kesik
çerçeveyle ve **Form adımından** rozetiyle işaretlenir; satırlarında düzenleme
ve silme yoktur, yerine belgenin girildiği adıma götüren bir bağlantı vardır.
Alan gizliyse klasör de listelenmez — EQAR sorusuna *hayır* denince ilk iki
klasör düşer, daha önce girilmiş değerler kalmış olsa bile.

Kaynak listeleri `assets/js/evidence.js` içindeki `SOURCES` tablosundadır; yeni
bir belge alanı eklemek için tabloya bir satır yazmak yeterlidir.

Kenar çubuğundaki **Başvuru Özeti**, dizinde listelenen kanıt sayısını
gösterir — koleksiyon ve form adımlarından gelen belgeler birlikte. Sayıya
yalnızca erişilebilir kanıtlar girer; bir ESG adımının tamamlanmış sayılması
için de aynı ölçüt geçerlidir. Tasnif dışı kanıt varsa sayının yanında kaç
tanesinin hiçbir standarda bağlanmadığı belirtilir; bunlar koleksiyonda durur
ama ESG adımlarına ulaşmaz. Sayaç kanıt nereden eklenirse eklensin (Belgeler
dizini ya da bir ESG adımı) anında güncellenir.

### Dizin görünümü

Belgeler bölümü kanıtları bir dosya sistemi gibi listeler: klasörler ESG
standardı kodlarıdır, satırlar kanıtlardır. Bir kanıt kaç standarda bağlıysa
**o kadar klasörde görünür** — kayıt tektir, yalnızca satır tekrarlanır.

Böyle bir kanıtın yanında **zincir rozeti** çıkar; üzerine gelindiğinde kanıtın
başka hangi tasniflerde yer aldığı listelenir. Rozet bulunulan klasörü
dışarıda bırakır, dolayısıyla her satırda farklı bir liste gösterir.

Aynı kayıt birden çok yerde göründüğü için silmenin kapsamı önemlidir; bu
yüzden sil düğmesi doğrudan silmez, bir onay penceresi açar ve iki ayrı işlem
sunar:

| İşlem | Etkisi |
|---|---|
| **Yalnızca ESG *x.y* tasnifinden çıkar** | Sadece o etiketi kaldırır. Kanıt koleksiyonda kalır, öteki tasniflerde görünmeyi sürdürür; hiç etiketi kalmazsa **Tasnif dışı** klasörüne düşer. |
| **Kanıtı tamamen sil** | Kaydı koleksiyondan kaldırır; bağlı olduğu bütün tasniflerden birden düşer. |

Pencere, kanıtın o an başka hangi tasniflerde yer aldığını da yazar; böylece
silmenin nereye dokunacağı işlemden önce görünür. **Tasnif dışı** klasöründe
çıkarılacak bir etiket bulunmadığından yalnızca tamamen silme sunulur.

Ekleme ve düzenleme, **Kaydet** ve **Vazgeç** düğmeleri olan bir pencerede
yapılır. Kaydedilmeden koleksiyona hiçbir şey yazılmaz; vazgeçmek boş kayıt
bırakmaz. Kaydetme, kanıt adı **ve** en az bir erişim yolu (bağlantı veya
dosya) verilmeden tamamlanmaz.

Doğrulama da koleksiyondan beslenir: bir ESG adımı, o standarda bağlı **ve
erişim yolu olan** en az bir kanıt yoksa tamamlanmış sayılmaz.

Önceki biçimde kanıtlar standart başına ayrı dizilerde (`esg.<kod>.evidence`)
tutuluyordu. Eski bir başvuru içe aktarıldığında bu kayıtlar bir kez
koleksiyona taşınır; aynı ad ve bağlantıyı paylaşan kayıtlar tek kanıtta
birleştirilip ilgili standartlarla etiketlenir.

---

## MİS ön başvuru entegrasyonu

MİS'te (`mis.yokak.gov.tr`) yapılan ön başvuru, kimlik ve iletişim alanlarını
otomatik doldurmak üzere bu forma aktarılabilir. Veri sözleşmesi OpenAPI 3.1
olarak [`api/mis-onbasvuru.yaml`](api/mis-onbasvuru.yaml) dosyasındadır.

Uygulama sunucusuz olduğundan **birincil yol devirdir**: MİS, ön başvuruyu
tamamlayınca kullanıcıyı bu uygulamaya yönlendirir ve `PreRegistration`
yükünü URL fragment'inde taşır.

```
https://<uygulama>/#onbasvuru=<base64url(JSON)>
```

Fragment tarayıcı tarafından sunucuya gönderilmez; kişisel veri sunucu
günlüklerine düşmez. Uygulama yükü işledikten sonra fragment'i adres
çubuğundan siler. Alternatif olarak MİS, uygulamayı bir pencerede açıp aynı
yükü `postMessage` ile iletebilir:

```js
hedefPencere.postMessage({ type: "yokak:onbasvuru", payload: preRegistration }, hedefOrigin);
```

Alan eşlemesi `assets/js/mis.js` içindeki `MAP` tablosundadır ve sözleşmedeki
`x-target` değerleriyle birebir aynıdır; MİS formu değişirse yalnızca bu tablo
güncellenir. Dolu alanların üzerine **yazılmaz** — kullanıcının girdiği veri
korunur, korunan alan sayısı bildirilir.

### Başvurunun tamamlanması

Önizleme adımındaki **YÖKAK'a Gönder** düğmesi, tüm zorunlu alanlar geçerli
olmadan başvuruyu tamamlamaz; eksik varsa kullanıcıyı ilk eksik adıma götürür.
Tamamlandığında `YOK-<yıl>-<6 karakter>` biçiminde bir başvuru numarası üretilir
(`crypto.getRandomValues`, karışmaya açık harfler alfabede yok) ve tamamlama
ekranı açılır: numarayı kopyalama, başvuru örneğini JSON olarak dışa aktarma ve
başvuruda verilen adrese e-posta hazırlama.

Numara bir kez üretilir ve başvuruyla saklanır; ekran yeniden açılsa da değişmez.

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
| **Program kapsamı** | ESG 1 ekranında öğretim düzeyi filtresiyle ön lisans ve lisans programı seçimi; ardından **genel ölçütler** ve program bazında **özel ölçütler** girişi. |
| **Kapsam genişletme** | Yürürlükteki belgeye yeni program/düzey eklenirken kuruluşun kimliği, belgeleri ve ESG 3 · ESG 2 bölümleri **devralınır**: sekmede *Devralındı* rozeti çıkar, adımda bilgilendirme kutusu görünür. Devir muafiyet değildir — veri yine gerekir, yalnızca yeniden yazılmaz, bu yüzden tamamlanma toplamından düşmez. Muafiyet varsa devri bastırır. |
| **Doğrulama** | Alan bazlı kurallar, adım geçişinde engelleme, sekme/adım üzerinde tamamlanma ve hata rozetleri. Metin alanlarında kural **alandan çıkılınca** uygulanır — yarım yazılmış değer henüz hata sayılmaz; hata bir kez görüldükten sonra düzeltildiği anda kalkar. |
| **Erişilebilirlik** | WAI-ARIA sekme/adım örüntüleri, klavye gezinmesi (`Alt+←/→`, sekme çubuğunda ok tuşları), `prefers-reduced-motion`, `forced-colors`, odak halkaları. |
| **Görsel dil** | Liquid glass yüzeyler, imleci izleyen parlama, aurora arka plan, mikro animasyonlar. Açık/koyu tema. |

---

## Form yapısı

Sekmeler (`tabs`) → adımlar (`steps`) → alanlar (`fields`):

| # | Sekme | Adımlar |
|---|-------|---------|
| 1 | **Başvuru Türü** | Tür seçimi (Yetkilendirme / Tanınma), başvuru niteliği · **Niyet mektubu** (PDF, her senaryoda zorunlu) · **Önceki dış değerlendirme (EQAR)** |
| 2 | **Ajans Bilgileri** | Kimlik (kuruluş bilgileri · **sicil numaraları** · **ağ ve çatı kuruluş üyelikleri**) · İletişim · Yasal statü (**kuruluş ve tescil dokümanları**) · Yönetişim ve kaynaklar |
| 3 | **Belgeler** | **Kanıt koleksiyonu** — tüm kanıtlar, ESG standardı etiketleriyle |
| 4 | **Öz Değerlendirme** — Giriş, Tarihçe, Faaliyetler | Giriş · **ÖDR'nin hazırlanması** · Ajansın tarihçesi, profili ve faaliyetleri |
| 5 | **ESG 3** — Kalite Güvencesi Ajansları | 3.1 → 3.6 (her standart bir adım) · *EQAR raporu sunulduysa muaf* |
| 6 | **ESG 2** — Dış Kalite Güvencesi | 2.1 → 2.7 · *EQAR raporu sunulduysa muaf* |
| 7 | **ESG 1** — Kapsam ve Ölçütler | Program seçimi · Genel ölçütler · Programa özel ölçütler · **Ölçütlerin ESG 1 uyumu** · Karar sistemi |
| 8 | **Sonuç** — Beyanlar ve Gönderim | **Gelişmeye açık yönlere yönelik faaliyetler** (yalnızca yenileme, en fazla 6000 kelime) · Taahhüt ve beyan · **Mali Beyanlar** (yalnızca yetkilendirme) · Önizleme ve gönderim |

Her ESG adımı şunları ister: standardın resmî metni (okunur) → **ajansın
uygulaması** (kelime/karakter sayaçlı) → **öz değerlendirme** (Tam / Büyük
ölçüde / Kısmen / Uyumsuz) → **kanıtlar** (ad, URL, belge referansı).

### Kısaltmayla kişiselleşen metinler

Kimlik adımındaki **Kısaltma** doldurulduğunda, yardım metinlerinde
kuruluşun kendisinden söz edilen yerler "ajans" yerine o kısaltmayla
anılır: *"Ajansın bu standarda ilişkin uygulaması"* → *"MÜDEK'in bu
standarda ilişkin uygulaması"*.

Metinde `{ajans}` / `{agency}` imi kullanılır ve `I18N.pick` çözer. Türkçe
ekler kısaltmanın son ünlüsüne göre üretilir — `{ajans:in}` tamlayan,
`:e` yönelme, `:i` belirtme, `:de` bulunma, `:den` ayrılma; İngilizcede
`{agency:s}` iyelik. Büyük harfle yazılan im (`{Ajans}`), kısaltma yokken
cümle başına uygun karşılığı verir.

İm **yalnızca başvuru sahibi kuruluşu** anlatan cümlelere konur. Başka
ajanslardan söz eden metinler — ESG standartlarının resmî metni, EQAR'a
kayıtlı değerlendirici ajans, "Kalite Güvencesi Ajansları" bölüm başlığı —
imsizdir ve olduğu gibi kalır.

### Sicil numaraları

Yetkilendirme başvurusunda kimlik adımı ulusal sicil numaralarını da ister.
Hukuki statüye bağlı olan numara tektir — dernekte kütük, vakıfta sicil,
diğer statülerde ticaret sicil gazetesi numarası. **MERSİS No** ise
statüden bağımsızdır: her yetkilendirme başvurusunda, seçilen tüzel kişilik
türü ne olursa olsun istenir ve **16 haneli, yalnızca rakam** olmak zorundadır.
Tanınma başvurusunda bu alanların hiçbiri sorulmaz.

Biçim kuralı şemadan gelir; başka sabit desenli alanlar da aynı yolla
tanımlanabilir:

```js
{ type: "text", id: "agency.mersis", pattern: "^[0-9]{16}$",
  patternMessage: { tr: "…16 haneli…", en: "…16 digits…" } }
```

Kural, sürekli duran bir ipucu satırıyla değil **yalnızca hata durumunda
görünen iletiyle** anlatılır: ipucu satırı her zaman yer kaplayarak alanı
yanındaki komşusuna göre aşağı kaydırıyordu. Biçimi kısaca yer tutmayan
placeholder söyler.

### Kuruluş ve tescil dokümanları

Yasal statü adımı, yasal dayanağın **resmî evrakını** da ister: kanunen
yetkilendirilmiş otoritelerce verilen kuruluş ve tescil dokümanları. Her
kayıt için doküman adı, belgeyi veren otorite ve düzenlenme tarihi girilir;
dokümanın kendisi **dosya olarak yüklenebilir veya bağlantı olarak
verilebilir** — satır başına en az biri zorunludur.

Bu evrak kanıt koleksiyonuna değil adımın kendi listesine yazılır: koleksiyon
ESG standardı etiketlerine göre kuruludur, tüzel kişilik evrakının ise böyle
bir tasnifi yoktur.

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

## Kılavuz (Sürüm 3.0)

Depo yalnızca başvuru uygulamasını değil, uygulamanın dayandığı **normatif
kılavuzu** da barındırır: *Dış Değerlendirme ve Akreditasyon Kuruluşlarının
Yetkilendirilmesi, Tanınması ve İzlenmesine İlişkin Kılavuz*, Sürüm 3.0.
Mayıs 2020 tarihli Sürüm 2.1'in yerine geçer.

`kilavuz/index.html` doğrudan tarayıcıda açılır. Tek dosyalık sürüm:
[`dist/yokak-kilavuz-3.0.html`](dist/yokak-kilavuz-3.0.html).

Belge iki biçimde birden çalışır:

| Ekranda | Baskıda |
|---|---|
| Kalıcı içindekiler rayı, okunan kısmı işaretler | Ray kaldırılır, noktalı içindekiler tablosu ve sayfa numaraları basılır |
| Arama kutusu bölüm ve metin içinde eşleşir | Arama ve araç çubuğu basılmaz |
| TR/EN düğmesi belgeyi yeniden çizer | Seçili dil basılır, her sayfada üstbilgi ve künye |
| Kutular ve ölçüt kartları akışta | A4 düzeni, bölümler yeni sayfada, kutular ortadan bölünmez |

PDF, tarayıcının **Yazdır → PDF olarak kaydet** akışıyla üretilir; ayrı bir
dizgi zinciri yoktur. Yazdırma penceresinde *Üstbilgi ve altbilgi* seçeneği
kapatılmalıdır — bunlar belgenin kendi baskı katmanında tanımlıdır.

### İçeriğin kaynağı

Kılavuz metni `kilavuz/data/icerik.js` içindedir. Her kısım, metnin nereden
geldiğini söyleyen bir `kaynak` alanı taşır; kaynağı henüz alınmamış kısımlar
`kaynakBekliyor` ile işaretlenir ve ekranda da baskıda da açıkça
"Kaynak bekleniyor" uyarısıyla çıkar — taslak iskelet mevzuat sanılmasın.

Üç bölüm **uygulamanın kendi verisinden üretilir**, elle yazılmaz:

```bash
node tools/gen-ek1.js   > kilavuz/data/ek1.js      # EK 1 — 13 ölçüt, 64 kanıt
node tools/gen-ekler.js > kilavuz/data/ekler.js    # mali hükümler + beyanlar
```

`EK 1`, ESG standart metinleri ve rehber ilkeleriyle önerilen kanıt
listesinden; mali hükümler ve taahhüt maddeleri ise başvuru şemasından
türer. Böylece formda değişen bir madde kılavuzda eski hâliyle kalamaz.
Kaynak dosyalar değiştiğinde üreteçler yeniden çalıştırılmalıdır.

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
    programs.js             ← Program listesi (ISCED-F alan → ön lisans/lisans)
    yokak-criteria.js       ← YÖKAK Program Akreditasyon Ölçütleri (ana başlıklar)
    evidence-suggestions.js ← Standart bazında önerilen kanıtlar
kilavuz/
  index.html                Kılavuz kabuğu (Sürüm 3.0)
  assets/
    kilavuz.css             Belge tipografisi ve yerleşimi
    print.css               A4 baskı katmanı
    kilavuz.js              Çizici, içindekiler, arama, dil, sayfa numarası
  data/
    icerik.js               ← Kılavuz metni (bölüm → kısım → blok)
    ek1.js                  ÜRETİLMİŞ — tools/gen-ek1.js
    ekler.js                ÜRETİLMİŞ — tools/gen-ekler.js
tools/
  bundle.py                 Tek dosyalık paketleyici (--source ile kaynak seçilir)
  gen-ek1.js                EK 1'i ESG verisinden üretir
  gen-ekler.js              Mali hükümleri ve beyanları şemadan üretir
```

`←` işaretli dosyalar, içerik güncellemesi için düzenlemeniz gereken yerlerdir.
`ÜRETİLMİŞ` işaretliler elle düzenlenmez; üreteçleri yeniden çalıştırınız.

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

### Öğretim düzeyleri

Program seçici dört düzey sunar: **Ön Lisans**, **Lisans**, **Yüksek Lisans**,
**Doktora**. Seçim tüm düzeylerde ortak listede tutulur; düzey yalnızca hangi
programların listeleneceğini belirler.

| Düzey | Program | Gruplama |
|---|---|---|
| Ön Lisans | 299 | ISCED-F geniş alan → ayrıntılı alan |
| Lisans | 491 | ISCED-F geniş alan → ayrıntılı alan |
| Yüksek Lisans | — | liste henüz tanımlanmadı |
| Doktora | — | liste henüz tanımlanmadı |

Düzey bir **filtre**dir, kip değildir: varsayılan **Tümü** görünümünde bütün
düzeyler kendi başlıkları ve kendi gruplamalarıyla birlikte listelenir; bir
düzeye tıklamak listeyi ona daraltır. Filtre düğmeleri o düzeyde kaç program
seçtiğinizi `seçili / toplam` olarak gösterir.

Her program, göründüğü **her yerde** düzey etiketini taşır — listede, seçilenler
çipinde ve önizleme özetinde. Böylece seçim tek listede toplansa da hangi
programın hangi düzeye ait olduğu ayırt edilir.

Yüksek lisans ve doktora seçilebilir; içerik yerine listenin henüz
tanımlanmadığını açıklayan bir mesaj gösterirler. Bu düzeylerin listesi
`assets/data/programs.js` içindeki `byLevel()` fonksiyonuna eklenerek
etkinleştirilir.

### Program listesi
`assets/data/programs.js` üç düzeyli bir veri seti içerir:

```js
areas       // ISCED-F 2013 geniş alan (2 haneli) — 10 adet, açılır başlıklar
fields      // ISCED-F 2013 ayrıntılı alan (4 haneli) — 78 adet, alt başlıklar
programmes  // 491 lisans programı
associate   // 299 ön lisans programı
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

> **Veri kaynağı:** Lisans listesi `ISCED_Program_Listesi.xlsx`, ön lisans
> listesi `Onlisans_ISCEDF_2013.xlsx` dosyasından üretilmiştir; her ikisi de
> programları ISCED-F 2013 ayrıntılı alan kodlarıyla eşleştirir.
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
// adım düzeyinde: iki ayrı alandan biri dolu olmalı
requireOneOf: ["decision.evidenceFile", "decision.evidenceUrl"]

// tekrarlayıcıda satır düzeyinde: her satır kendi içinde karşılamalı
rowRequireOneOf: ["file", "url"]
```

Tekrarlayıcı satırları `file` türünde alan taşıyabilir; yüklenen dosya
kanıtlardaki ile aynı biçimde (`{name, size, type, data}`) satırın verisine
gömülür, böylece dışa aktarılan başvuru kendi kendine yeterli kalır.

Biçim kalıbı — sabit desenli sicil/kimlik numaraları için. `patternMessage`
verilmezse genel ileti kullanılır:

```js
pattern: "^[0-9]{16}$",
patternMessage: { tr: "…", en: "…" }
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

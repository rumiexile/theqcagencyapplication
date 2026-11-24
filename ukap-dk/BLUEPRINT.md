# QMIS · UKAP Modülü · Blueprint

> **Sürüm:** v0.2 (taslak) · **Kaynak:** YÖKAK UKAP Kılavuzu Sürüm 1.0a (2024), 15.05.2024 Kurul kararı
> **Faz 1 kapsamı:** Niyet Mektubu + Değerlendirme Koordinatörü (DK) ataması → KİDR'nin nihai hâle gelip yayımlanması
> Köşeli parantezli sayfa numaraları `[s.18]` kılavuza atıftır. ❓ işaretli maddeler açık sorulardır (§11).

---

## 1. Amaç ve konum

UKAP, YÖKAK'ın **QMIS** sistemi içinde ayrı bir **modül** olarak yürütülür. Ayrı bir DK uygulaması yoktur;
kurum da DK da aynı modülü, kendi rollerine göre açılan ekranlarla kullanır.

Modülün omurgası bir **süreç motorudur**:

| Bileşen | Ne yapar |
|---|---|
| **Process Step** (süreç adımı) | Kılavuzdaki her işi bir adım olarak tanımlar: sorumlu rol, ön koşul, girdi, çıktı, tamamlanma ölçütü |
| **Completion Status** (tamamlanma durumu) | Her adımın durumu ve yüzdesi; faz ve dosya geneli için toplu ilerleme |
| **Countdown** (geri sayım) | Süreli her adım için kalan gün, eşik renkleri ve gecikme sayacı |

Faz 1, sürecin **Başvuru → KİDR** bölümünü kapsar; motor sonraki fazlar için aynı yapıyla genişler (§10).

---

## 2. Roller (modül içi)

| Rol | Faz 1'de modülde ne yapar | Kaynak |
|---|---|---|
| **Kurum** (yurt dışındaki YÖK kurumu) | Niyet mektubu ve belgeleri yükler, sözleşmeyi imzalar, İrtibat Kişisini bildirir, ödeme kanıtını yükler, KİDR yazar/yükler/düzeltir, yayın bağlantısını girer | s.18–20 |
| **İrtibat Kişisi** | Sözleşme sonrası kurum adına modülü kullanan kişi | s.17 |
| **Değerlendirme Koordinatörü (DK)** | Ön değerlendirme, Kurul'a sunum, sözleşme hazırlığı, ödeme teyidi, KİDR uygunluk kontrolü, düzeltme talepleri | s.15, s.18, s.20 |
| **Başkanlık** | DK'yı atar, sözleşmeyi YÖKAK adına imzalar | s.18 |
| **Kurul** | Programa kabul kararı (kararı modüle DK veya Başkanlık işler ❓) | s.18 |

DK'nın Faz 1'e düşen görev maddeleri (s.15, madde 1): **a** başvuru inceleme, ön değerlendirme, Kurul'a sunma ·
**b** YÖKAK içi koordinasyon, sözleşmenin hazırlanması, İrtibat Kişisi ile yazışmalar · **d** KİDR ve eklerinin içerik/format
uygunluğu kontrolü.
**DK'nın sınırı:** Değerlendirme yargısına karışmaz [s.17]. KİDR kontrolü biçimseldir, olgunluk düzeyi vermez.
**Ön koşul:** DK, EK-1 Gizlilik ve Etik Beyanını imzalamış olmalı [s.17].

---

## 3. Süreç motoru

### 3.1 Adım tanımı (şablon)

Her adım, kodda değil **tanım verisinde** tutulur. Kılavuz sürümü değişirse adımlar güncellenir, motor değişmez.

```yaml
kod: C3
ad: DK KİDR uygunluk kontrolü
faz: 1
grup: C-KİDR
sorumlu: DK
gorur: [DK, Başkanlık]          # Kurum yalnızca sonucu görür
on_kosul: [C2]                  # C2 tamamlanınca açılır
sure:
  tur: kesin                    # kesin | hedef | yok
  capa: C2.tamamlanma           # geri sayımın başladığı olay
  ofset: 15
  birim: takvim_gunu            # takvim_gunu | is_gunu | ay
tamamlanma:
  tur: kontrol_listesi          # kontrol_listesi | belge | onay | karar
  kalemler: [...]               # §7.2
ciktilar: [kidr_kontrol_sonucu, duzeltme_talepleri]
dallar:
  uygun: C5
  duzeltme_gerekli: C4
kaynak: "Kılavuz s.20 §3.2/2"
```

### 3.2 Adım durumları (Completion Status)

| Durum | Anlamı | Geçiş |
|---|---|---|
| ⚪ **Kilitli** | Ön koşul tamamlanmadı | ön koşullar bitince → Açık |
| 🔵 **Açık** | Başlatılabilir, sorumlunun işi bekliyor | ilk işlem → Devam ediyor |
| 🟡 **Devam ediyor** | Kalemler kısmen dolu | sorumlu "tamamladım" der → İncelemede / Tamamlandı |
| 🟣 **İncelemede** | Karşı taraf onayı bekleniyor (ör. Kurum yükledi, DK teyit edecek) | onay → Tamamlandı · iade → Devam ediyor |
| 🟢 **Tamamlandı** | Tamamlanma ölçütü sağlandı, kaydı ve tarihi var | — |
| ↩️ **Revizyon** | Tamamlanmış adım geri açıldı (ör. düzeltme turu) | → Devam ediyor |
| ⛔ **Sonlandı** | Dal kapandı (ret, fesih) | — |

**Gecikme** ayrı bir durum değil, her durumun üstüne binen bir **bayraktır** (`gecikti: true`, `gecikme_gun: n`).
Böylece "Devam ediyor + 3 gün gecikti" aynı anda görünür.

**Yüzde hesabı:**
- Adım: tamamlanan kalem / toplam kalem.
- Grup ve faz: tamamlanan adımlar / dosyaya uygulanabilir adımlar (atlanan dallar paydaya girmez).
- Dosya: faz yüzdelerinin ağırlıklı ortalaması (ağırlık ❓; varsayılan eşit).

### 3.3 Geri sayımlar (Countdown)

| Tür | Kullanım | Gösterim |
|---|---|---|
| **Kesin son tarih** | Sözleşme ya da kılavuzla bağlı süre (30 gün ödeme, 4 ay KİDR, 15+15 gün) | `12 gün kaldı` → `Bugün son gün` → `3 gün gecikti` |
| **Hedef tarih** | Kılavuz tablosundaki gösterge haftalar (ör. Kurul seçimi ~4. hafta) | `Hedef: 4. hafta · 6 gün` (gecikme uyarısı yumuşak) |
| **Geçen süre** | Süresi tanımsız adımlar (ör. A3 ön değerlendirme) | `Başlayalı 9 gün` |

**Eşikler (öneri):** kalan > 7 gün 🟢 · 7–3 gün 🟡 · 2–0 gün 🟠 · gecikti 🔴.
**Bildirim:** sorumlu role T−7, T−2, T ve gecikmenin ilk günü (❓ kanal: QMIS içi bildirim / e-posta).
**Saat durdurma:** ❓ Karşı tarafı bekleyen adımlarda saat durur mu? (Kılavuz bunu öngörmüyor; varsayılan: durmaz.)

### 3.4 İki saat

Faz 1'deki süreler iki çapaya bağlıdır:

- **H₀ — Başvuru tarihi** (A1 tamamlanması): Başvuru ve Kabul tablosunun hedef haftaları.
- **T₀ — Sözleşme imza tarihi** (B1 tamamlanması): ödeme ve KİDR sürelerinin hepsi.

---

## 4. Faz 1 süreç haritası

```
 ┌─────────────────────────── A. BAŞVURU VE KABUL ─────────────── saat: H₀ ──┐
 │  A1 Başvuru ──► A2 DK ataması ──► A3 Ön değerlendirme ──► A4 Kurul kararı │
 │  [Kurum]        [Başkanlık]       [DK]  │ eksik❓           [Kurul]  │     │
 │                                         ▼                    Ret ◄─┤     │
 │                                   A3' Belge tamamlama        ⛔     ▼     │
 │                                   [Kurum]                    A5 Sözleşme   │
 │                                                              hazırlığı [DK]│
 └──────────────────────────────────────────────────────────────────┬────────┘
                                                                    ▼
 ┌─────────────────────────── B. SÖZLEŞME ─────────────────────── saat: T₀ ──┐
 │  B1 Sözleşme imzası (T₀) ──┬──► B2 İrtibat Kişisi bildirimi [Kurum]        │
 │  [Kurum + Başkanlık]       └──► B3 Ücret ödemesi ⏱30g [Kurum → DK teyit]  │
 │                                       └─ gecikti ──► Fesih kararı ⛔ ❓    │
 └──────────┬─────────────────────────────────────────────────────────────────┘
            ▼
 ┌─────────────────────────── C. KİDR ─────────────────────────── saat: T₀ ──┐
 │  C1 KİDR yazımı ⏱T₀+4ay ──► C2 KİDR teslimi [Kurum]                       │
 │                                   ▼                                        │
 │                             C3 Uygunluk kontrolü ⏱15g [DK]                 │
 │                     uygun ◄───────┴───────► düzeltme gerekli               │
 │                       │                          ▼                         │
 │                       │              C4 Kurum düzeltmesi ⏱15g [Kurum]      │
 │                       │                          ▼ (❓ ikinci tur → C3)    │
 │                       ▼                          ▼                         │
 │               C5 Nihai KİDR kilitlendi [DK teyit]                          │
 │                       ▼                                                    │
 │               C6 Web yayını [Kurum girer → DK doğrular]                    │
 │                       ▼                                                    │
 │               ✅ FAZ 1 TAMAM → Faz 2 (Takım oluşturma) adımları açılır     │
 └────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Faz 1 adım kataloğu

| Kod | Adım | Sorumlu | Açılma koşulu | Geri sayım | Tamamlanma ölçütü | Kaynak |
|---|---|---|---|---|---|---|
| **A1** | Başvuru | Kurum | Modül kaydı | — | Niyet mektubu + a–f belgeleri yüklendi, gönderildi | s.18 |
| **A2** | DK ataması | Başkanlık | A1 | Hedef: H₀+4 hf | DK seçildi, DK'nın EK-1 beyanı geçerli | s.18, s.8 |
| **A3** | Başvuru ön değerlendirmesi | DK | A2 | Geçen süre ❓ | §7.1 kontrol listesi bitti, DK görüşü yazıldı | s.15, s.18 |
| A3' | Eksik belge tamamlama ❓ | Kurum | A3 → "eksik" | ❓ | İstenen belgeler yüklendi → A3'e döner | — |
| **A4** | Kurul kararı | Kurul | A3 olumlu/olumsuz görüş | Hedef: H₀+4 hf | Karar (kabul/ret), tarih, karar no girildi | s.18 |
| **A5** | Sözleşme hazırlığı | DK | A4 = kabul | Hedef: H₀+6 hf | EK-2 taslağı zorunlu 6 alanla dolu (aşağıda) | s.15, s.18–19 |
| **B1** | Sözleşme imzası → **T₀** | Kurum + Başkanlık | A5 | Hedef: H₀+6 hf | İki taraflı imzalı sözleşme yüklendi | s.18 |
| **B2** | İrtibat Kişisi bildirimi | Kurum | B1 | Hedef: T₀ haftası | İK kaydı (ad, unvan, e-posta, telefon), modül hesabı açıldı | s.17, s.8 |
| **B3** | Ücret ödemesi | Kurum → DK teyit | B1 | **Kesin: T₀+30 gün** | Ödeme kanıtı yüklendi, DK/mali birim teyit etti | s.19 |
| **C1** | KİDR yazımı | Kurum | B1 | **Kesin: T₀+4 ay** | Taslak alanlarında ilerleme (46 alt ölçüt bazında %) | s.19 |
| **C2** | KİDR teslimi | Kurum | C1 | (C1 sayacı) | Kurum "teslim et" dedi; sürüm v1 kilitlendi | s.19 |
| **C3** | KİDR uygunluk kontrolü | DK | C2 | **Kesin: C2+15 gün** | §7.2 kontrol listesi bitti; sonuç: uygun / düzeltme gerekli | s.20 |
| **C4** | Kurum düzeltmesi | Kurum | C3 = düzeltme | **Kesin: C3+15 gün** | Her düzeltme talebi "giderildi" işaretli, v2 teslim | s.20 |
| **C5** | Nihai KİDR | DK teyit | C3 uygun veya C4 | ❓ | Nihai sürüm kilitlendi (değiştirilemez) | s.20 |
| **C6** | Web yayını | Kurum → DK doğrular | C5 | Hedef: ~1 hf ❓ | Yayın URL'si girildi, DK nihai sürümle aynı olduğunu doğruladı | s.20, s.9 |

**A1 belgeleri:**

| Kod | Belge | Not |
|---|---|---|
| — | Niyet mektubu | Neden UKAP'a katılmak istediği + kurum tanıtımı |
| a | Ülkede yükseköğretim faaliyeti yürütme yetkisi | |
| b | Ülkedeki YÖ / KG otoritesinden "sakınca yoktur" beyanı | **EK-4 Uluslararası Faaliyet İzin Formu** |
| c | ISCED 6 düzeyinde eğitim-öğretim kanıtı | |
| d | ENIC-NARIC / WHED / ETER'den en az birinde kayıt | |
| e | Aktif lisans programlarının en az yarısının mezun verdiği | Sayısal alan: mezun veren / aktif ≥ 0,5 |
| f | Kalite yönetiminden sorumlu birimin kuruluşu | koordinatörlük / komisyon / ofis |

**A5 sözleşme zorunlu alanları:** İrtibat Kişisi ve DK · hizmet bedeli · değerlendirme dili · mevzuat/standart/dokümanlar ·
gizlilik hükümleri · itiraz ve şikâyet hususları [s.19]. Bedel Kurul'ca ülke, takım büyüklüğü vb. ile belirlenir.
Değerlendirme dili Faz 2–3'teki tercüman ihtiyacını belirler [s.21].

---

## 6. Ekranlar

### 6.1 Kurum görünümü (QMIS · Kurum / İrtibat Kişisi)
- **Süreç şeridi:** A→B→C grupları, her adım için durum rozeti ve tamamlanma yüzdesi.
- **"Şimdi sizden beklenen" kartı:** sorumlusu Kurum olan açık adımlar, en yakın son tarih üstte, büyük geri sayımla.
- **KİDR editörü / yükleme alanı:** 46 alt ölçüt bazında ilerleme; DK düzeltme talepleri ilgili alt ölçütün yanında.
- **Belgeler:** A1 belgeleri, sözleşme, ödeme kanıtı, KİDR sürümleri (v1, v2, nihai).

### 6.2 DK görünümü
- **Portföy panosu:** DK'ya atanmış tüm kurumlar, satır başına aktif adım, durum, geri sayım ve gecikme bayrağı. Varsayılan sıralama: en acil son tarih üstte.
- **Dosya detayı:** kurum görünümünün tamamı + DK'ya özel adımlar (A3, C3, teyitler), iç notlar (kuruma kapalı).
- **Kontrol listeleri:** §7 listeleri; C3'te her bulgu bir alt ölçüt koduna bağlı düzeltme talebi olur.
- **Zaman çizelgesi (audit):** kim, hangi adımı, ne zaman hangi duruma aldı.

### 6.3 Başkanlık görünümü
- Atanmamış başvurular (A2 kuyruğu), DK iş yükü, Kurul'a gidecek dosyalar, gecikmeler.

---

## 7. DK kontrol listeleri

### 7.1 Başvuru ön değerlendirmesi (A3)
| # | Kontrol | Sonuç |
|---|---|---|
| 0 | Niyet mektubu: neden UKAP? + kurum tanıtımı var mı | ✓ / ✗ / ? |
| a | Yetki belgesi: ülke otoritesi, geçerlilik tarihi | |
| b | EK-4 İzin Formu: imzalı, yetkili otoriteden | |
| c | ISCED 6 kanıtı | |
| d | ENIC-NARIC / WHED / ETER kaydı: bağlantı doğrulandı mı | |
| e | Mezun veren lisans programı oranı ≥ %50 (__ / __) | |
| f | Kalite birimi kuruluş belgesi | |
| — | Belge dili / çeviri gerekliliği ❓ | |
| ⇒ | **DK görüşü:** Olumlu · Olumsuz · Eksik tamamlanmalı | |

### 7.2 KİDR uygunluk kontrolü (C3)
> ⏳ **KİDR Hazırlama Kılavuzu v.1a gerekli.** Elimizdeki kılavuzdan çıkan iskelet:

| Alan | Kontrol |
|---|---|
| Kapsam | 4 başlık (Yönetişim ve Kalite · Eğitim ve Öğretim · Araştırma ve Geliştirme · Toplumsal Katkı), 14 ölçüt, **46 alt ölçüt**ün tamamı ele alınmış mı |
| Format | KİDR Hazırlama Kılavuzu'ndaki şablon ve bölüm yapısı |
| Kanıtlar | Her alt ölçüt için kanıt var mı, bağlantılar erişilebilir mi, ekler açılıyor mu |
| Öz değerlendirme | Alt ölçüt başına kurumun beyan ettiği olgunluk düzeyi (1–5) var mı ❓ |
| Dil | Sözleşmedeki değerlendirme diliyle uyumlu mu |
| ⇒ Çıktı | Alt ölçüt koduna bağlı düzeltme talepleri, ya da "uygundur" |

---

## 8. Veri modeli (taslak)

```
AdimTanimi       { kod, ad, faz, grup, sorumluRol, onKosullar[], sure{tur,capa,ofset,birim},
                   tamamlanma{tur,kalemler[]}, dallar{}, kaynak, kilavuzSurumu }
Dosya            { id, kurumId, dkId, H0, T0, aktifFaz, durum, ilerleme% }
AdimOrnegi       { dosyaId, adimKod, durum, gecikti, gecikmeGun, acilis, sonTarih,
                   tamamlanma, ilerleme%, sorumluKullanici }
KalemSonucu      { adimOrnegiId, kalemKod, sonuc(✓|✗|?), not, kanitId }
Belge            { dosyaId, adimKod, tur, surum, dosya|url, yukleyen, tarih, kilitli }
DuzeltmeTalebi   { dosyaId, turNo, altOlcutKod, aciklama, durum(acik|giderildi|kabul_edilmedi) }
KurulKarari      { dosyaId, karar, tarih, kararNo }
Sozlesme         { dosyaId, imzaTarihi=T0, bedel, dil, irtibatKisisiId }
Odeme            { dosyaId, sonTarih, odemeTarihi, tutar, teyitEden }
Bildirim         { kullaniciId, adimOrnegiId, tur(T-7|T-2|T|gecikme), gonderim }
Olay             { dosyaId, adimKod, eskiDurum, yeniDurum, kim, zaman }
```

---

## 9. Kılavuzdaki belirsizlikler / tutarsızlıklar

1. **DK ataması ile Kurul seçiminin sırası.** Tablo (s.8) ikisini de "4. Hafta"ya koyuyor ve Kurul seçimini önce yazıyor;
   §3.1 (s.18) ise *önce DK atanır → DK ön değerlendirir → Kurul onaylar* diyor. Blueprint §3.1 sırasını esas aldı.
2. **"4 ay" ≠ "16 hafta".** 4 takvim ayı ≈ 17,4 hafta. Sözleşmeye bağlı süre olduğu için metindeki "4 ay" esas alındı.
3. **Hafta numaraları her tabloda sıfırlanıyor** ("Hafta 0" her tabloda yeniden başlıyor); bu yüzden motor H₀ ve T₀ diye iki saat kullanıyor.
4. **Ön değerlendirmenin süresi ve eksik belge prosedürü** tanımsız.
5. **KİDR düzeltme döngüsü:** Tek tur mu çok tur mu belirsiz; düzeltme yapmayan kurum için yaptırım yok.
6. **Web yayınının zamanı:** Tablo 21. hafta diyor, metin "saha ziyareti öncesinde" diyor.
7. **Sistem adı:** Kılavuzda "Değerlendirici Sistemi" ve "KGBYS" geçiyor. QMIS ile ilişkileri netleşmeli.

---

## 10. Sonraki fazlar (motor aynı, yeni adım tanımları)

| Faz | Kapsam | Öne çıkan geri sayımlar | Kılavuz |
|---|---|---|---|
| **1** | Başvuru → KİDR yayını | 30g ödeme · 4 ay KİDR · 15g + 15g | §3–3.2 |
| 2 | Takım oluşturma, çıkar çatışması beyanı, takvim ve hazırlık toplantıları | 7g ÇÇ beyanı · takvim ≤120g | §3.3, §4.1 |
| 3 | Ön ziyaret, lojistik/vize/diplomatik bildirim, saha ziyareti (4 gün), 360° anket | ön ziyaret saha ziyaretinden 2–3 hf önce · 5 iş günü anket | §4.2–4.3 |
| 4 | Taslak UKAR → DK kontrolü → takım düzeltmesi → Kurum görüşü (EK-5) → Karşılaştırma Tablosu | 21g · 10g · 10g · 21g · 21g | §4.4 |
| 5 | Tutarlılık çalışması, karar (≥600 kabul · 550–599 erteleme · <550 ret; E&Ö alt ölçütlerinin hepsinde ≥3 şartı), İyileştirme Raporu | 15g · ≤12 ay · 60g | §5–6 |
| 6 | İzleme (2. yıl sonu), yenileme | 60g KİDR · 10g kontrol · 10g rapor · bitişten 12 ay önce | §9–10 |

---

## 11. Açık sorular

| # | Soru | Etkilediği yer |
|---|---|---|
| Q1 | ✅ Modül QMIS içinde; Kurum ve DK aynı modülü rol bazlı kullanıyor. **Açık:** Başkanlık ve Kurul da modüle giriyor mu, yoksa kararları DK mı işliyor? | §2, §6.3 |
| Q2 | QMIS modüllerinin teknolojisi ne? (dil/çatı, veritabanı, mevcut modül şablonu, yetki altyapısı) Örnek bir modül paylaşılabilir mi? | Mimari |
| Q3 | ✅ Kurumun KİDR'si QMIS'te. **Açık:** KİDR editörü bu modülün parçası mı, yoksa QMIS'te var olan bir KİDR bileşeni mi yeniden kullanılacak? | §6.1 |
| Q4 | A3'te eksik belge çıkarsa ne olacak? Ön değerlendirmenin süresi var mı? | A3, A3' |
| Q5 | KİDR düzeltmesi tek tur mu? İkinci turda süre yine 15+15 gün mü? | C3–C4 |
| Q6 | Ödeme gecikirse KİDR adımları kilitlensin mi? Faz 1'in bitmesi ödemeye bağlı mı? | B3, C1 |
| Q7 | "Gün" takvim günü mü? Saat, karşı tarafı bekleyen adımlarda durur mu? | §3.3 |
| Q8 | KİDR Hazırlama Kılavuzu v.1a, Değerlendirme Ölçütleri v.1a, EK-2 Sözleşme ve EK-4 İzin Formu paylaşılabilir mi? | §7.2, A5 |
| Q9 | Arayüz dili: TR + EN mi? | UI |
| Q10 | ✅ Ayrı repo. **Açık:** repo adı ve oluşturulması (bkz. not). | Proje yapısı |
| Q11 | Bildirimler QMIS içinde mi kalsın, e-posta da gitsin mi? Eşikler (T−7/T−2) uygun mu? | §3.3 |
| Q12 | Dosya geneli ilerleme yüzdesinde fazların ağırlıkları eşit mi olsun? | §3.2 |

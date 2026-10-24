# Seyri Cihan — atlas ve kaynaklı sınır katmanı

Kapsam: Tulpar temelinde açık erişimli 3B tarih atlası, yıl kontrolü, olay hub'ı, kalıcı içerik rotaları ve kaynakça. Başlangıç dönemi 552–1923; ilk içerik seti sınırlıdır, eksiksiz tarih arşivi iddiası yoktur.

Varsayımlar: Türkçe varsayılan, İngilizce arayüz destekli. Kaynaksız siyasi sınırlar üretilmez. İlk sürümdeki temsili okuma bölgeleri kararı kullanıcı geri bildirimiyle geçersiz kılınmış ve geometriler kaldırılmıştır; açıklama yazısı bu bölgeleri doğru tarihî sınır verisine dönüştürmez. Üyelik gerekli değildir.

Mimari: React Globe GL, Three.js/three-globe için tek renderer sahibi React adaptörü olarak kullanılacak. Ek R3F canvas katmanı kurmadan kamera, polygon seçimi ve disposal aynı motor tarafından yönetilecek. Yıl ve olay URL ile paylaşılabilir; kullanıcı oturumu atlas için kullanılmaz. WebGL desteklenmese de kronoloji ve olay sayfaları çalışır.

Doğrulama: veri şemaları/tarih/seçim testleri, type-check, lint, metadata:check, test, build; gerçek tarayıcıda globe, yıl seçimi, olay paneli, mobil ve WebGL fallback kontrolü. Yeni katman ayrıca 1453'te sınır olmadığını, 1886/1913/1914 kaynak kayıtlarını, kıyı/adacık biçimlerini ve yüzeye oturan olay işaretlerini doğrulamayı gerektirir. Bu belge son kontrollerin geçtiğini iddia etmez; sonuç kaydı `tasks/todo.md` içindedir. Teknik doğrulama bağımsız tarihçilik incelemesinin yerine geçmez.

## Güncel sınır pilotu

- Kaynak: CShapes 2.0, Schvitz ve diğerleri (2022), ETH Zürich. Olay seçkisi 12 olaydır; 12 anlatı kaynağına ek olarak bu veri kaynağıyla toplam 13 kaynak kaydı vardır.
- Kapsam: yalnızca Osmanlı devleti, 1886–1914 arasındaki her yılın 1 Ocak durumu. Bu, her yıl içindeki bütün değişimlerin gösterimi değildir.
- Kesinlik: `generalized`; kaynağın genelleştirilmiş devlet sınırlarıdır, kesin fiilî denetim veya eksiksiz bağlı toprak/cephe haritası değildir.
- Eksik kapsam: 1453 dahil diğer yıllarda sınır çizilmez; en yakın yıla sessiz dönüş veya uydurma interpolasyon yoktur.
- Lisans: CShapes türevi veride CC BY-NC-SA 4.0; ticari olmayan kullanım, atıf ve aynı lisansla paylaşım şartları uygulama kodunun MIT lisansından ayrıdır.
- Kaynak hash'i, çıkarma yöntemi, lisans ve kayıt tarihleri: [sınır veri kaydı](../src/features/atlas/data/boundary-provenance.md).

## Kullanıcı akışı

1. `/` veya `/atlas`: URL seçimi varsa ilgili yıl/olay, yoksa 1453 açılır.
2. Dönem düğmesi, yıl girişi, slider veya oynatma ile zaman değişir. Aynı yılın olay işaretleri ve kapsam içindeyse o yılın 1 Ocak sınırları gösterilir. 1453'te eksik sınır verisi açıkça belirtilir; kullanıcı 1886 pilotuna geçebilir.
3. Kullanıcı küreyi sürükler, yakınlaştırır veya otomatik dönüşü açar. Manuel etkileşim otomatik dönüşü durdurur; görünüm sıfırlanabilir.
4. Olay işareti seçilince kamera konuma odaklanır ve bilgi paneli açılır. Olay işaretleri yüzeyi izleyen küçük disklerdir; dikey olay sütunu kullanılmaz. Sınır seçilince aynı panel kaynak, kayıt geçerlilik tarihleri, lisans ve sınırlamaları gösterir. 1886/1913/1914 kısayollarıyla kaynak kayıtları karşılaştırılabilir.
5. Panelden `/olay/[slug]` anlatısına veya `/donem/[slug]` dönem dosyasına geçilir. Kaynaklar ve ilişkili olaylar okunur; olay sayfasından aynı yıl/olaya geri dönülür.
6. Arama, tüm seçkide olay/yer/özet tarar; arama yokken liste seçili döneme aittir. Kategori filtresi aramayla birlikte uygulanır.
7. `/kronoloji` ve `/kaynaklar`, WebGL çalışmasa da erişilebilir. Olayı olmayan yıl ve sınır verisi olmayan yıl birbirinden bağımsız boş durumlardır.

URL paylaşılabilir seçim durumudur; kamera açısı, filtre, tema ve oynatma durumu URL'ye dahil değildir. Seçim `replaceState` ile güncellenir: her yıl tarayıcı geçmişine yeni kayıt eklemez. Dil çerezi kalıcıdır; mevcut yıl ve olay dil değişiminde korunur.

## Veri ve uygulama sınırları

| Katman | Sorumluluk |
| --- | --- |
| Domain + Zod | Tarih, kimlik, koordinat, kaynak ve geometri sözleşmeleri |
| Veri seçkisi | TR/EN olay anlatıları, editoryal dönemler ve kaynak/geçerlilik bilgisiyle CShapes sınırları |
| Zustand | Atlas örneğine özel yıl, olay ve oynatma durumu |
| React Globe GL | Three.js sahnesi, kamera, raycasting ve kabartmalı polygon çizimi |
| Public route ekranları | Sunucu tarafında içerik, metadata ve JSON-LD |
| Tulpar core/forms | Erişilebilir düğmeler, bağlantılar, tablolar ve doğrulanan formlar |

Veriler sürüm kontrolündedir. CMS, kullanıcı hesabı, kayıtlı koleksiyon, veritabanı veya API anahtarı gerektiren harita servisi yoktur. Natural Earth kıta geometrisi ve çıkarılmış CShapes sınır alt kümesi yerelden sunulur; tarayıcı harita verisi için üçüncü tarafa istek göndermez. Kaynak ve lisans bağlantıları kullanıcı isteğiyle açılır.

## Sonraki geliştirme sırası

### 1. Tarihî sınır kapsamını genişletme

- Tek devlet/dar dönem başlangıcı CShapes 2.0 Osmanlı 1886–1914 pilotuyla karşılanır. Sonraki öncelik 1453 dahil erken dönemler için kaynaklı, lisansı uygun geometri bulmaktır; mevcut pilot erken dönem eksiğini kapatmaz.
- Her yeni geometrinin kaynağı, lisansı, geçerlilik aralığı, kesinlik düzeyi ve inceleme durumu kaydedilmeli; kod lisansı veri lisansını geçersiz kılamaz.
- Aynı tarihte birbiriyle çelişen kaynaklar sessizce birleştirilmemeli; açıklama ve alternatif yorum korunmalı.
- Sınır snapshotları bulunmayan yıllar için uydurma interpolasyon veya sessizce “son bilinen durum” kullanılmamalı. Güncel yıllık katman 1 Ocak örneklemesidir; yıl içi geçişler ayrı, açık bir tarih modeline ihtiyaç duyar.
- Kabul: kaynak kaydıyla karşılaştırılan geometri, tarih/geometri testleri, UI'da tarih ve belirsizlik bilgisi; gerçek tarayıcıda ada/parça ve kıyı biçimlerinin denetlenmesi.

### 2. Olay/devlet/kişi hub'ları

- Mevcut olay modelindeki aktör metinlerini kimlikli kişi/devlet kayıtlarına bağlama.
- Olaylarda kesin gün/ay, belirsiz veya yaklaşık tarih, ilişkili olay, medya lisansı ve editoryal durum alanları.
- Kaynak gösterimini iddia veya anlatı bölümü düzeyine indirme; 12 olaylık başlangıç seçkisini kaynak incelemesiyle genişletme.
- Kabul: kişi/devlet sayfası → ilişkili olay → ilgili yılın atlası arasında tutarlı bağlantı.

### 3. Anlatım ve mobil etkileşim

- Rehberli kamera durakları, göç/sefer rotaları ve kontrollü geçiş animasyonları.
- Mobilde bilgi panelini erişilebilir drawer/bottom-sheet olarak sunma; mevcut akışta panel kürenin altında yer alır.
- Bir yılda yoğunlaşan olaylar için kümeleme ve katman aç/kapat kontrolleri.
- Kabul: dokunmatik ve klavye eşdeğerleri, reduced-motion alternatifi; gerçek mobil GPU üzerinde performans ölçümü.

### 4. Yayına hazırlık

- Gerçek site origin'i, içerik lisansları, editoryal inceleme ve erişilebilirlik denetimi.
- Bağımlılık audit'inde kalan Tailwind 3/ESLint glob-parser zincirinin kontrollü major migration ile ele alınması.
- Performans bütçeleri ölçülerek belirlenmeli; mevcut DPR sınırı 1.5 ve sekme gizliyken render duraklatması tek başına mobil performans garantisi değildir.
- İçerik sayısı/katkıcı sayısı artarsa CMS değerlendirilmeli; sırf ilk prototip için auth/admin katmanı açılmamalı.

## Tamamlanma ölçütü

Bu fazın hedefi kaynaklı fakat dar kapsamlı bir sınır pilotunu olay atlasına bağlamaktır. “Yıl yıl eksiksiz Türk tarihi”, 1453 Osmanlı sınırları, bütün devletler için yıllık siyasi harita, yıl içindeki tüm değişimler, fiziksel topoğrafik yükseklik, akademik editoryal onay, mobil cihaz laboratuvarı testi veya canlı dağıtım tamamlanmış sayılmaz. Önceki prototipin test sonuçları yeni katman için kanıt değildir.

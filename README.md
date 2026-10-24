# Seyri Cihan

Tulpar temelli, Türk tarihini zaman ve coğrafya üzerinden keşfetmek için geliştirilen etkileşimli bir hobi atlası.

## Çalıştırma

Node.js 22+ ve npm kullanın. `npm ci`, ardından `npm run dev`. Ana sayfa ve `/atlas` atlası açar. Üretim önizlemesi: `npm run build`, ardından `npm start`. Yalnızca npm lock dosyası bu geliştirme akışında güncellenir.

Üretime çıkarken `NEXT_PUBLIC_SITE_URL` ortam değişkenini gerçek origin ile ayarlayın. Varsayılan `http://localhost:3000` değeridir. Atlas için API anahtarı, hesap, veritabanı veya harici harita servisi gerekmez.

## İlk sürüm

- Natural Earth 1:50m kıyı ayrıntısını, koordinat ızgarasını ve kaynaklı tarihî sınır katmanını gösteren yüksek çözünürlüklü, döndürülebilir/yakınlaştırılabilir dünya.
- 552–1923 arası yıl seçimi, birer yıllık oynatma, klavyeyle slider ve doğrudan yıl girişi.
- Kaynak anlatısına göre ölçeklenip yönlenen düzensiz 3B olay alanları; seçili olayda ayrıca yükselen açık renkli çekirdek. Yüksek olay sütunları kullanılmaz. Olay ve sınır tıklamaları, kamera odağı, kaynak bağlantılı bilgi paneli.
- 7 editoryal dönem, Türkçe/İngilizce 12 seçilmiş olay ve 13 kaynak kaydı.
- CShapes 2.0'dan alınan Osmanlı sınırları: 1886–1914 arasındaki her yılın 1 Ocak görünümü, kaynak geçerlilik tarihleri ve lisans bilgisi.
- Paylaşılabilir durum: `/atlas?year=1071&event=malazgirt-savasi`.
- `/olay/[slug]`, `/donem/[slug]`, `/kronoloji`, `/kaynaklar`, `/hakkinda`.
- Koyu/açık tema, mobil düzen, reduced-motion, WebGL hata alternatifi.
- Merkezi metadata, kaynakça bağlantıları, sitemap, Open Graph ve Article JSON-LD.

Her yıl seçilebilir; içerik seçkisi henüz her yıl için olay içermez. Boş yıl açıkça gösterilir. Dönemler editoryal bölümlerdir; devletlerin kuruluş/yıkılış tarihleriyle eşdeğer değildir.

Önceki elle çizilmiş temsili bölgeler kaldırılmıştır. Sınır katmanı yalnızca **CShapes 2.0 kaynaklı, genelleştirilmiş Osmanlı devlet sınırlarını** kapsar; kesin fiilî denetim veya eksiksiz savaş cephesi haritası değildir. Her seçili yıl, 1 Ocak durumunu gösterir; yıl içindeki tüm değişimleri temsil etmez. 1453 dahil 1886–1914 dışındaki yıllarda sınır çizilmez ve başka bir yılın sınırı yerine kullanılmaz. Kabartma yüksekliği nicel veri veya fiziksel topoğrafya göstermez.

Ayrıntılar: [veri yöntemi](src/features/atlas/data/README.md), [sınır verisinin kaynağı, üretimi ve sınırlamaları](src/features/atlas/data/boundary-provenance.md), [Natural Earth taban haritası](public/data/README.md).

## Kod ve veri lisansları

Uygulama kodunun MIT lisansı, CShapes verisini kapsamaz. CShapes 2.0'dan türetilen sınır verisi **CC BY-NC-SA 4.0** koşullarıyla, ticari olmayan kullanım için sunulur; atıf ve aynı lisansla paylaşım şartları korunmalıdır. Ticari yeniden kullanım için ayrı izin veya uygun başka veri gerekir. Natural Earth taban haritası kamu malıdır ve tarihî sınırların kaynağı değildir. Lisans ve atıf ayrıntıları [sınır veri kaydındadır](src/features/atlas/data/boundary-provenance.md).

## Mimari

- `src/app`: App Router rotaları ve metadata girişleri.
- `src/features/routes/public`: server ekranları ve route-local i18n.
- `src/features/atlas/domain`: türler, Zod şemaları ve doğrulama testleri.
- `src/features/atlas/data`: olaylar, dönemler, kaynaklar ve tarih/lisans bilgisiyle CShapes sınır geometrileri.
- `src/features/atlas/atlas-engine`: SSR dışında yüklenen React Globe GL / Three.js motoru.
- `src/features/atlas/store`: her atlas örneğine özel Zustand durumu ve URL dönüşümü.
- `src/components/core`, `src/components/forms`: Tulpar ortak UI altyapısı.

React Globe GL kamera ve render döngüsünün tek sahibidir; paralel bir R3F canvas kurulmaz. `Territory` kayıtları `generalized` durumuyla, kaynak kimliği ve geçerlilik aralığıyla saklanır. GeoJSON Polygon/MultiPolygon yönü çizim sırasında D3 küresel polygon yönüne dönüştürülür; kaynak veri mutasyona uğramaz. Olaylar, olay başına tanımlanan yaklaşık ölçek, yön ve pürüzlülükle küresel yüzeyi izleyen düzensiz alanlar olarak sınır katmanından ayrı gösterilir. Bu alanlar kesin tarihî sınır değildir; seçili olayın beyaz çekirdeği yalnızca etkileşim ve derinlik hiyerarşisidir.

Şablondan kalan login/admin/culture ekranları atlas navigasyonuna dahil değildir ve proxy üzerinden atlasa yönlendirilir. Demo `/api/auth/*` uçları 404 verir. Hesap altyapısı etkin bir atlas özelliği değildir.

## Doğrulama

Sıralı çalıştırın: `npm run type-check`, `npm run lint`, `npm test`, `npm run metadata:check`, `npm run build`. Build ile type-check'i paralel çalıştırmayın.

Tarayıcı kanıtları `output/playwright/` altında tutulur (Git dışında). Geliştirme planı ve sonuçlar `tasks/todo.md` ve `tasks/atlas-plan.md` içindedir.

Önceki keşif sürümünün kaydı: 41 test, type-check, lint, metadata denetimi ve production build geçmiş; masaüstü/320–390 px tarayıcı akışları ve WebGL hata alternatifi kontrol edilmişti. Bu kayıt yeni sınır katmanı ve yüzey işaretleri için doğrulama kanıtı değildir; güncel sonuçlar `tasks/todo.md` içinde tutulur. Fiziksel mobil GPU testi yapılmadı. Bağımlılık audit'inde kalan Tailwind 3/ESLint glob-parser bulguları ve kontrollü major güncelleme ihtiyacı da aynı dosyada kayıtlıdır.

## Sonraki içerik aşaması

Özellikle 1453 için kaynaklı/lisansı uygun sınır verisi, daha geniş devlet ve yıl kapsamı, yıl içi değişimlerin modellenmesi, daha geniş olay seçkisi, kişi/devlet hub'ları, göç rotaları ve rehberli anlatılar. Bu sürüm eksiksiz yıllık siyasi harita veya editoryal incelemesi tamamlanmış akademik atlas değildir.

# Seyri Cihan atlas geliştirmesi

## Kabartma yüksekliği inceltmesi — sonuç / 2026-10-24

- React Globe GL polygon yan yüzünün yerel kara yüzeyinden değil küre tabanından başladığı hesaba katıldı. Altın alanın kara üstündeki farkı 0.0032'den 0.00064'e, beyaz çekirdeğin toplam farkı 0.0077'den 0.00106'ya düşürüldü; böylece uzun pim/sütun görünümü kaldırıldı.
- Dış alan hâlâ kara yüzeyinden ayrılıyor, seçili beyaz çekirdek de dış alanın biraz üzerinde kalıyor. Birim testler her iki katmanın pozitif fakat kara kalınlığının yarısından düşük farkta olduğunu güvenceye alıyor.
- Playwright ile 1920 Birinci Meclis ve 1517 Ridâniye işaretleri maksimum zoomda ve eğik görünümde kontrol edildi; konsol hatası yok. Kanıtlar: `output/playwright/shallow-relief-1920-max-zoom.png`, `shallow-relief-1920-oblique.png`, `shallow-relief-1517-oblique.png`.
- Type-check, lint, 11 dosyada 51 test, metadata denetimi ve üretim build geçti; diff kontrolü temiz.

## Yüksek çözünürlüklü yakınlaştırma — sonuç / 2026-10-24

- Kamera yakın sınırı 135'ten 104'e indirildi; yakın düzlem 0.1 olarak ayarlanarak yüzeye ve olay kabartmasına yaklaşık dokuz kat daha fazla yaklaşma alanı açıldı. Uzak zoom sınırı ve mevcut sürükleme davranışı korundu.
- WebGL çizimi cihaz yoğunluğunu 3×'e kadar kullanıyor; iPhone 15 emülasyonunda 363×450 CSS piksellik canvas'ın 1089×1350 fiziksel piksel ürettiği doğrulandı. Polygon küre eğriliği çözünürlüğü 4°'den 1°'ye yükseltildi.
- Natural Earth taban haritası 1:110m yerine 60.669 koordinatlı 1:50m fiziksel kara verisine geçirildi. 1.636.166 baytlık yerel dosyanın SHA256 değeri sabitlendi; `npm run data:land` kaynağı doğrulayıp dosyayı atomik yeniliyor.
- Playwright ile 1517 Ridâniye görünümünde maksimum zoom, yakın planda döndürme, olayın yeniden seçilmesi ve 3× Retina mobil çizimi hatasız çalıştı; konsol hatası yok. Kanıtlar: `output/playwright/high-resolution-max-zoom-1517.png`, `high-resolution-max-zoom-rotated.png`, `high-resolution-retina-mobile.png`.
- Type-check, lint, 11 dosyada 50 test, metadata denetimi ve üretim build geçti. Geliştirme sunucusunun oluşturduğu dört yinelenmiş `.next/types/* 2.ts` dosyası tip çakışmasına neden olduğu için geri alınabilir biçimde `/tmp/seyri-zoom-generated-types.8soO8g` altına taşındı; kaynak dosyalar etkilenmedi.

## Organik olay alanları — sonuç / 2026-10-24

- Tek tip daire kaldırıldı. 12 olayın her birine kaynak anlatısına göre yaklaşık yarıçap, uzama yönü, pürüzlülük ve iki dilde bağlam açıklaması eklendi. Bu alanlar kesin sınır olarak sunulmuyor.
- Haritada, küre yüzeyini izleyen düzensiz altın bağlam kabartması çiziliyor. Seçili olay bunun üzerinde ayrı geometriye, açık renge ve ek yüksekliğe sahip ikinci bir çekirdekle gösteriliyor; iki katman da aynı olay tıklamasını ve tooltip davranışını koruyor.
- 1517 Ridâniye alanı Matariye–Cebelülahmer ile Nil–Mukattam hattına göre doğu-batı yönünde genişletildi. Yakın/eğik görünüm, paneli kapatıp kabartmadan yeniden açma ve 390 px taşma kontrolü Playwright ile geçti; konsol hatası yok. Kanıtlar: `output/playwright/organic-relief-1517-detail-final.png`, `organic-relief-1517-oblique-final.png`, `organic-relief-1517-mobile.png`.
- Type-check, lint, 10 dosyada 48 test, metadata denetimi ve üretim build geçti; diff kontrolü temiz. Fiziksel mobil GPU testi ve bağımsız akademik coğrafya incelemesi yapılmadı.

## Sığ olay kabartması düzeltmesi — sonuç / 2026-10-10

- Önceki düz disk yorumu düzeltildi: olay kabartması yerel kara/sınır yüzeyinin üzerine `EVENT_RELIEF = LAND_ALTITUDE = 0.003` kadar çıkar. Görsel çakışma payı ayrıca 0.0002'dir. Altın-kahverengi yan yüz görünür; yüksek silindir geometrisi kullanılmaz.
- Bilgi etiketi, kabartma kenarını örtmemesi için aşağı alındı. 1517 Kahire görünümü yakın/eğik açıdan Playwright ile kontrol edildi; kanıt: `output/playwright/relief-1517-oblique.png`. Oynatma sırasında kabartmaya tıklayınca yılın durması ve olay panelinin açılması doğrulandı.
- Type-check, lint, 47 test ve üretim build geçti; diff kontrolü temiz. Yeniden oluşan 4 üretilmiş `.next/types/* 2.ts` kopyası tip çakışması nedeniyle `/tmp/seyri-relief-types.bYaegs` içine taşınarak korundu; kaynak dosyası silinmedi.

## Tarihî sınırlar ve yüzey işaretleri — sonuç / 2026-10-10

- Elle çizilmiş 7 temsili bölge kaldırıldı. ETH Zürich CShapes 2.0'dan SHA256 kontrollü, koordinatları değiştirilmemiş 3 MultiPolygon kaydı alındı. 1886–1914 arası her yılın 1 Ocak görünümü destekleniyor; 1453 ve kapsam dışı yıllar sınır çizmeden açıklama gösteriyor.
- Geometriler genelleştirilmiş kaynak verisidir; kesin fiilî kontrol veya savaş cepheleri olarak sunulmuyor. Kaynak, geçerlilik tarihleri ve CC BY-NC-SA 4.0 veri lisansı görünür. Kaynak geçmişi/çıkarma yöntemi `src/features/atlas/data/boundary-provenance.md` içinde.
- Olay silindirleri tamamen kaldırıldı; küreye oturan geodezik diskler aynı polygon katmanında çiziliyor. Altındaki kara/sınır yüzeyinin yüksekliği kullanılıyor; yalnızca z-fighting önleyen 0.0002 yarıçap payı var, dikey yan yüz çizilmiyor. Seçim disk boyutunu değiştiriyor, yüksekliğini değil.
- Tıklama, tooltip ve olay paneli korundu. Playwright ile 1040 yakın plan, paneli kapatıp yüzey işaretinden tekrar açma, 1886/1914 kaynaklı görünüm ve 390 px taşma kontrolü geçti. Görseller: `output/playwright/surface-marker-1040-close.png`, `boundary-1886.png`, `boundary-1914.png`, `boundary-mobile.png`.
- Doğrulama: type-check, lint, 10 dosyada 47 test, metadata:check ve üretim build geçti. UI kaynakları 250 satır altında; GeoJSON veri varlığı sıkıştırılmış tek satırdır. Eski `.next/types/* 2.ts` ve `* 3.ts` kopyaları tip çakışması yaptığı için yalnızca bu 8 üretilmiş dosya `/tmp/seyri-generated-types.ZJiHb2` içine taşınarak korundu.
- Eksik kapsam: 1453 için kaynaklı sınır verisi, diğer devletler/dönemler, gün bazında zaman seçimi ve akademik editoryal inceleme. Uygulama kodunun MIT lisansı, eklenen veri setinin ticari olmayan kullanım koşulunu değiştirmez. Dağıtım yapılmadı.

Plan ve kapsam: `tasks/atlas-plan.md`.

## İnceleme / sonuç — 2026-10-06

- Tulpar core/form altyapısı üzerinde Seyri Cihan public kabuğu, TR/EN içerik, tema, metadata, sitemap, llms.txt ve Open Graph tamamlandı.
- React Globe GL / Three.js ile yerel Natural Earth kıtaları, kabartmalı temsili bölgeler, olay işaretleri, kamera odağı, dönüş/yakınlaşma ve WebGL hata alternatifi çalışıyor.
- 552–1923 yıl seçimi/oynatma, paylaşılabilir URL, 7 dönem, 12 olay ve kaynakça eklendi. Olay/dönem dosyaları, kronoloji, arama ve bilgi paneli ortak veri setini kullanıyor.
- Gerçek tarayıcıda polygon yönü, Türkçe küre etiketleri, sunucu tarafında Link varyantı, reduced-motion hydration ve hızlı dil/yenileme sırasında seçim kaybı düzeltildi. Elle döndürme otomatik dönüş düğmesiyle senkronize edildi.
- Son otomatik kontroller: type-check, lint, 8 dosyada 41 test, metadata:check ve Next 16.3.8 üretim build başarılı. Yeni kaynak dosyaları 250 satır altında; `git diff --check` temiz.
- Playwright: masaüstü olay/bölge tıklaması, sürükleme, oynatma, yıl girişi, slider klavyesi, arama, TR/EN kalıcılığı, tema, 390/320 px taşma, reduced-motion ve sentetik WebGL context-loss → kronoloji akışı doğrulandı. Üretim sunucusunda olay → detay → atlas ve fallback akışı tarayıcı hatası olmadan geçti. Fiziksel mobil cihaz/GPU testi yapılmadı.
- HTTP kontrolleri: public sayfalar ve SEO uçları 200; bilinmeyen kök rota ve demo auth uçları 404; eski login 307 ile atlasa döner. Bilinmeyen olay/dönem slug'ları not-found + noindex üretir; Next'in streaming yanıtı nedeniyle HTTP 200 gelebilir. Bu ayrım üretim smoke kontrolünde gözlendi.
- Kanıtlar (Git dışında): `output/playwright/atlas-production-desktop.png`, `event-production.png`, `atlas-mobile-390.png`, `atlas-fallback-320.png`.
- Next güvenlik güncellemesi ve uyumlu transitive sharp/source-map-js/seroval/solid-js güncellemeleri yapıldı. Son tam `npm audit`: 0 kritik, 7 yüksek, 2 orta; `--omit=dev`: 0 kritik, 5 yüksek, 2 orta. Kalanlar Tailwind 3 ve ESLint glob/parser zincirinde; major sürüm geçişi bu fazda zorlanmadı. Audit temiz olarak raporlanmıyor.
- Açık kalan kapsam: kaynaklı tarihî sınır snapshotları, topoğrafik yükseklik, daha geniş editoryal seçki, kişi/devlet hub'ları, mobil drawer, rehberli anlatılar ve canlı dağıtım. Ayrıntılı sıra `tasks/atlas-plan.md` içinde. Mevcut kabartmalar tarihî siyasi sınır değildir.
- Git commit/push veya dış ortama dağıtım yapılmadı. Önceden bulunan `yarn.lock` korunmuştur; npm lock kullanılır. `AGENTS.md` ve `next-env.d.ts` içindeki framework tarafından üretilen güncellemeler korunmuştur.

# Multi-Dil (i18n) JSON Dönüşümü ve Çeviri İyileştirmeleri İnceleme Özeti

## Yapılan İyileştirmeler ve Geliştirmeler

1. **JSON Formatına Geçiş (`tr.json` / `en.json`):**
   - Projedeki tüm `tr.ts` ve `en.ts` dosyaları (12 modül, toplam 24 dosya) standart `.json` formatına dönüştürüldü:
     - `src/features/routes/_shared/layouts/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/admin/login/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/admin/overview/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/admin/settings/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/admin/users/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/auth/home/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/auth/settings/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/auth/workspace/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/public/culture/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/public/home/i18n/` (`tr.json`, `en.json`)
     - `src/features/routes/public/login/i18n/` (`tr.json`, `en.json`)
     - `src/lib/metadata/site-metadata/dictionaries/` (`tr.json`, `en.json`, `index.ts`)
   - Eski `tr.ts` ve `en.ts` kaynak dosyaları projeden tamamen temizlendi.

2. **Tip Güvenliği ve İçe Aktarma Standardizasyonu:**
   - İlgili tüm `index.ts` dosyaları TypeScript tip sözleşmelerine (`ShellCopy`, `AdminLoginCopy`, `PublicHomeCopy`, `LocalizedRouteMetadata` vb.) bağlı kalarak `.json` dosyalarını içe aktaracak şekilde yapılandırıldı.
   - `src/lib/metadata/site-metadata/dictionaries/index.ts` oluşturularak `trRouteMetadata` ve `enRouteMetadata` modüler olarak dışa aktarıldı.

3. **Türkçe Çeviri Kalitesi ve Dil Standartları:**
   - Tüm Türkçe dil dosyalarındaki "placeholder", "dummy", "admin'e gir", "siz@example.com" gibi geçici/ham ifadeler düzeltildi.
   - Kurumsal, akıcı, imla ve terminoloji açısından tutarlı (Yönetici Girişi, Kontrol Paneli Özeti, Profil Bilgileri vb.) Türkçe karşılıklar yerleştirildi.

4. **Otomasyonlu Birim Testleri:**
   - `src/lib/i18n/__tests__/i18n-dictionaries.test.ts` eklenerek tüm ekranların, kabukların ve metadata sözlüklerinin JSON verilerinin hatasız yüklendiği ve TR/EN anahtarlarının eksiksiz eşleştiği otomatik olarak doğrulandı.

---

## Doğrulama Sonuçları

- **TypeScript Strict Denetimi (`npm run type-check`):** Sıfır hata ile tamamlandı.
- **Birim Testleri (`npm test`):** 4 test dosyası, 26 testin tamamı başarılı (203ms).
- **Metadata Denetimi (`npm run metadata:check`):** 19/19 rota metadata exportları tam uyumlu.
- **ESLint v9 Denetimi (`npm run lint`):** Sıfır hata ve sıfır uyarı.
- **Next.js Production Build (`npm run build`):** Turbopack ile 19/19 rota hatasız derlendi.
- **250 Satır Kuralı:** Tüm kod ve JSON dosyaları 250 satır sınırının altında (Maksimum dosya boyutu: 241 satır).

---

## Radix bağımlılık konsolidasyonu incelemesi (2026-09-20)

- Core primitive'lerin kullanılan kısmı `radix-ui` ESM girişinden import ediliyor. Bu paket ağaç-sallanabilir olduğundan, alt paket importlarına dönmek bundle yükünü azaltmaz; mevcut strateji korunmuştur. `Accordion`, `AspectRatio`, `Avatar`, `Label` ve `Select` de bu girişe taşındı. `Slot` ve `useComposedRefs`, toplu paketteki tip/export davranışı JSX uyumluluğunu korumadığı için doğrudan bağımlılık olarak bilinçli şekilde kaldı.
- Kullanılmayan doğrudan kayıtlar kaldırıldı: `@emnapi/core`, `@emnapi/runtime`, 12 yinelenen Radix alt paketi ve `sonner`. `tailwindcss-animate` kullanıcı isteğiyle korundu.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm ci --dry-run` ve `git diff --check` geçti. `npm run build`, bu değişiklikten bağımsız mevcut CSS sıralama ihlali nedeniyle başarısız: `src/app/globals.css:3495` içindeki `@import './typeset.css'`, diğer kurallardan sonra bulunuyor. Turbopack yalnızca `@charset` veya `@layer` sonrası import'a izin veriyor.

## Erişilebilirlik primitive'leri incelemesi (2026-09-20)

- Yanıltıcı `accessibility-enhancer` adı, `accessibility.tsx` olarak sadeleştirildi. Eski `AccessibleRegion`, `AccessibleList` ve `AccessibleListItem` API'leri kaldırıldı; bunlar eksik klavye davranışıyla yanlış ARIA rolleri üretiyordu.
- Şablon için bağımsız ve güvenli üç primitive eklendi: `LiveRegion` (benzersiz açıklama kimliğiyle canlı duyurular), `SkipLink` (core `Link` bileşeni üzerinden ana içeriğe klavye kısayolu) ve `VisuallyHidden` (ekran okuyucu metni).
- Doğrulama: `npm run type-check`, `npm run lint`, yeni dosya için Prettier kontrolü, `npm test` (4 dosya, 26 test) ve `git diff --check` geçti. Proje genelindeki `npm run format:check`, bu değişiklik dışındaki 82 önceden biçimlenmemiş dosya nedeniyle başarısız.

## Paylaşılan bileşen konumlandırması incelemesi (2026-09-20)

- `delete-confirmation-dialog`, `enterprise-error-boundary` ve `standard-card` aileleri `src/components/shared` altına taşındı. Klasör içi göreli importlar korunurken, eski `components/core` yollarına ait dış import bulunmadığı doğrulandı.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test) ve `git diff --check` geçti.

## Global CSS import sırası incelemesi (2026-09-20)

- `typeset.css` importu, tüm `@tailwind` direktiflerinden önceki geçerli CSS import konumuna taşındı.
- Turbopack'in yerel CSS dosyalarını ayrı Tailwind bağlamında işlemesi nedeniyle `typeset.css` içindeki `@layer components` kaldırıldı. Stiller zaten `.typeset` ve `.typeset-scroll` ile kapsamlı olduğundan modüler kullanım korunuyor.
- Doğrulama: `npm run build` başarılı tamamlandı; 19 rota derlendi. Build sonrasında çalışma alanındaki `node_modules` ve `package-lock.json` dışarıdan kaldırıldığı için ek `type-check`, lint ve test tekrar çalıştırılamadı; bu dosyalara müdahale edilmedi.

## Ortak header kontrolü incelemesi (2026-09-20)

- `components/shared/control-group` altında `ControlGroup` ve `ControlGroupItem` eklendi. Primitive, tekli kontrolleri, yatay/dikey segmentleri, özel aktif durum stillerini ve tüketici tarafından sağlanan erişilebilirlik semantiğini destekliyor.
- `ThemeToggle` ortak çerçeveyi kullanırken View Transition ve Framer Motion ikon animasyonunu koruyor. `LanguageSwitcher` aynı primitive'i aktif dil durumu ve bekleyen istek kilidiyle kullanıyor; mevcut tasarım sınıfları korunuyor.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm run build` (19 rota) ve `git diff --check` geçti.

## Tekli header kontrolü incelemesi (2026-09-20)

- Gereksiz `ControlGroup` sarmalayıcısı, `components/shared/compact-control` altındaki tek öğeli `CompactControl` primitive'iyle değiştirildi. Primitive, tam `Button` API'sini koruduğundan simgeli, metinli, bekleyen durumlu veya menü tetikleyicili yeni header aksiyonlarına genişletilebilir.
- `LanguageSwitcher` aktif locale kodunu gösteren tek butona dönüştürüldü; tıklama, `routing.locales` sırasındaki sonraki dili seçiyor ve istek sürerken denetimi kilitliyor. `ThemeToggle` aynı primitive'e taşındı; View Transition ve ikon animasyonu korunuyor.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm run build` (19 rota) ve `git diff --check` geçti.

## Dil kontrolü animasyonu incelemesi (2026-09-20)

- `LanguageSwitcher`, locale değişimi tamamlandığında eski etiketi aşağı çıkarıp yeni etiketi yukarıdan getiren kısa bir Framer Motion geçişi kullanıyor. Kontrol, bekleyen istek sırasında mevcut etiketi koruyor.
- `useReducedMotion` ile `prefers-reduced-motion` tercihi destekleniyor; bu durumda geçiş süresi sıfırlanıyor.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm run build` (19 rota) ve `git diff --check` geçti.

## Application shell sidebar standardizasyonu incelemesi (2026-09-21)

- `ApplicationShell`, core bileşenler değiştirilmeden `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter` ve `SidebarInset` ile adapte edildi. Mevcut marka, navigasyon ve footer bileşenleri ilgili slotlarda korundu; mobil drawer ve daraltma durumu core provider üzerinden tek kaynaktan yönetiliyor.
- Header tetikleyicileri core sidebar'ın `md` breakpoint'iyle hizalandı. `SidebarInset` ana landmark olarak kullanıldığından iç içe `<main>` yapısı kaldırıldı.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm run build` (19 rota) ve `git diff --check` geçti. Kalıcı dev sunucusu bu çalışma ortamında terminal oturumu kapandığında sonlandığından tarayıcı etkileşim kontrolü çalıştırılamadı.

## Daraltılmış sidebar genişliği incelemesi (2026-09-23)

- Ortak `SIDEBAR_WIDTH_ICON` değeri `3rem` (48 px) yerine `4.5rem` (72 px) yapıldı. Böylece daraltılmış sidebar ikon odaklı kalırken marka, 48 px navigasyon kontrolleri ve seçili durum görünür bir yatay boşluğa sahip oldu.
- Doğrulama: `npm run type-check` ve Playwright ile `/home` ekranında kullanıcı girişi sonrası kapalı sidebar görsel kontrolü geçti.

## Submit button dar viewport incelemesi (2026-09-23)

- Ortak `SubmitButton`, yükleme ve normal durum metnini artık `inline-flex items-center whitespace-nowrap` içinde render ediyor. `children` içinde birlikte geçirilen SVG ikon ve metin, ayar ekranıyla sınırlı olmayan şekilde tek satırda hizalanır.
- Doğrulama: `npm run type-check` ve Playwright ile kullanıcı girişi sonrası `/settings` ekranında 279 px viewport görsel kontrolü geçti.

## Template login varsayılanları ve submit genişliği incelemesi (2026-09-21)

- `SubmitButton` bileşenine breakpoint bağımsız tam genişlik sağlayan `fullWidth` API'si eklendi. Login formları bu seçeneği kullandığından submit butonu masaüstünde artık `sm:w-auto` tarafından daraltılmıyor.
- `demoLoginCredentials` ortak sabiti eklendi. Kullanıcı formu `pilot@tulpar.space`, yönetici formu `admin@tulpar.space` ve her ikisi için `securePassword123` örnek değerleriyle açılıyor; değerler yalnızca template demo akışı içindir.
- Doğrulama: `npm run type-check`, `npm run lint`, `npm test` (4 dosya, 26 test), `npm run build` (19 rota) ve `git diff --check` geçti.

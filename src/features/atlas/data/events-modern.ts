import type { HistoricalEvent } from '@/features/atlas/domain';

export const modernEvents: HistoricalEvent[] = [
  {
    id: 'ridaniye-1517',
    slug: 'ridaniye-savasi',
    year: 1517,
    periodId: 'ottoman',
    category: 'battle',
    title: { tr: 'Ridâniye ve Mısır', en: 'Ridaniya and Egypt' },
    summary: {
      tr: 'Osmanlı ve Memlük orduları Kahire yakınlarında karşılaştı.',
      en: 'Ottoman and Mamluk armies met near Cairo.',
    },
    body: {
      tr: '1517’de Ridâniye’de kazanılan savaş, Osmanlı ordusuna Kahire yolunu açtı. Tomanbay’ın direnişi savaş sonrasında da sürdü; Mısır’daki Osmanlı idaresi bir süreç içinde kuruldu. İşaret Kahire çevresini temsil eder, orduların tam mevzilerini göstermez.',
      en: 'The Ottoman victory at Ridaniya in 1517 opened the way to Cairo. Tumanbay continued resisting after the battle, and Ottoman rule in Egypt was established through a continuing campaign. The marker represents the Cairo region rather than exact troop positions.',
    },
    consequences: {
      tr: [
        'Kahire Osmanlı kontrolüne geçti.',
        'Mısır’daki Memlük sultanlığı sona erdi.',
      ],
      en: [
        'Cairo came under Ottoman control.',
        'The Mamluk sultanate in Egypt ended.',
      ],
    },
    location: {
      lat: 30.07,
      lng: 31.3,
      name: { tr: 'Kahire çevresi', en: 'Cairo region' },
      footprint: {
        radiusKm: 42,
        elongation: 1.8,
        bearing: 92,
        roughness: 0.24,
        basis: {
          tr: 'Matariye–Cebelülahmer arasındaki Ridâniye mevkii ve Nil–Mukattam savunma hattının yaklaşık okuma alanı.',
          en: 'Approximate reading area for Ridaniya between Matariya and Jabal al-Ahmar and the Nile–Muqattam defensive line.',
        },
      },
    },
    actors: {
      tr: ['I. Selim', 'Tomanbay', 'Memlükler'],
      en: ['Selim I', 'Tumanbay', 'Mamluks'],
    },
    sourceIds: ['ridaniye'],
  },
  {
    id: 'tanzimat-1839',
    slug: 'tanzimat-fermani',
    year: 1839,
    periodId: 'reform',
    category: 'state',
    title: { tr: 'Tanzimat Fermanı', en: 'The Edict of Gülhane' },
    summary: {
      tr: 'Gülhane’de ilan edilen reform programı yeni düzenlemelerin çerçevesini çizdi.',
      en: 'A reform programme proclaimed at Gülhane set out a framework for change.',
    },
    body: {
      tr: 'Mustafa Reşid Paşa, 3 Kasım 1839’da Gülhane’de fermanı okudu. Metin can ve mal güvenliği, vergilendirme ve askerlik alanlarında düzenlemeler öngörüyordu. Reformların uygulanması zaman aldı ve farklı bölgelerde farklı sonuçlar verdi; ilan ile uygulamayı birbirinden ayırmak gerekir.',
      en: 'Mustafa Reşid Pasha read the edict at Gülhane on 3 November 1839. It proposed changes concerning personal security, property, taxation and military service. Implementation took time and varied between regions; proclamation and practical outcomes need to be considered separately.',
    },
    consequences: {
      tr: [
        'Hukuki ve idari reformlar için bir program ilan edildi.',
        'Vergi ve askerlik düzenlemeleri gündeme geldi.',
      ],
      en: [
        'A programme of legal and administrative reform was announced.',
        'Taxation and military service became targets for reform.',
      ],
    },
    location: {
      lat: 41.013,
      lng: 28.981,
      name: { tr: 'Gülhane, İstanbul', en: 'Gülhane, Istanbul' },
      footprint: {
        radiusKm: 5,
        elongation: 1.25,
        bearing: 45,
        roughness: 0.16,
        basis: {
          tr: 'Fermanın okunduğu Gülhane ve yakın kent çevresini gösteren dar bağlam alanı.',
          en: 'A narrow context area around Gülhane, where the edict was proclaimed.',
        },
      },
    },
    actors: {
      tr: ['Sultan Abdülmecid', 'Mustafa Reşid Paşa'],
      en: ['Sultan Abdülmecid', 'Mustafa Reşid Pasha'],
    },
    sourceIds: ['tanzimat'],
  },
  {
    id: 'meclis-1920',
    slug: 'buyuk-millet-meclisinin-acilisi',
    year: 1920,
    periodId: 'republic',
    category: 'state',
    title: {
      tr: 'Büyük Millet Meclisi’nin açılışı',
      en: 'The opening of the Grand National Assembly',
    },
    summary: {
      tr: '23 Nisan’da Ankara’da toplanan Meclis, Millî Mücadele’nin siyasi merkezi oldu.',
      en: 'The Assembly opened in Ankara on 23 April, becoming the political centre of the national struggle.',
    },
    body: {
      tr: 'Büyük Millet Meclisi, 23 Nisan 1920’de Ankara’da açıldı. İlk Meclis binası, Millî Mücadele yıllarında yasama ve yönetimin merkeziydi. Bugün Kurtuluş Savaşı Müzesi olan yapı, meclis hükümeti döneminin ve bağımsızlık mücadelesinin kurumsal hafızasını taşır.',
      en: 'The Grand National Assembly opened in Ankara on 23 April 1920. Its first building served as a centre of legislation and government during the War of Independence. Now the War of Independence Museum, it preserves the institutional memory of the assembly government and the independence struggle.',
    },
    consequences: {
      tr: [
        'Ankara’da yeni bir temsil ve yönetim merkezi oluştu.',
        'Millî Mücadele Meclis çatısı altında yürütüldü.',
      ],
      en: [
        'A new centre of representation and government emerged in Ankara.',
        'The Assembly directed the national struggle.',
      ],
    },
    location: {
      lat: 39.941,
      lng: 32.854,
      name: { tr: 'Birinci Meclis, Ankara', en: 'First Assembly, Ankara' },
      footprint: {
        radiusKm: 4,
        elongation: 1.2,
        bearing: 70,
        roughness: 0.14,
        basis: {
          tr: 'Birinci Meclis binası ve yakın Ankara kent merkezinin bağlam alanı.',
          en: 'Context area around the First Assembly building and central Ankara.',
        },
      },
    },
    actors: {
      tr: ['Mustafa Kemal Paşa', 'Birinci Meclis milletvekilleri'],
      en: ['Mustafa Kemal Pasha', 'Members of the First Assembly'],
    },
    sourceIds: ['meclis'],
  },
  {
    id: 'cumhuriyet-1923',
    slug: 'cumhuriyetin-ilani',
    year: 1923,
    periodId: 'republic',
    category: 'state',
    title: { tr: 'Cumhuriyetin ilanı', en: 'The proclamation of the Republic' },
    summary: {
      tr: '29 Ekim’de devletin yönetim biçimi cumhuriyet olarak belirlendi.',
      en: 'On 29 October, the form of government was declared a republic.',
    },
    body: {
      tr: '29 Ekim 1923’te Meclis, anayasa değişikliğiyle cumhuriyet yönetimini kabul etti. Mustafa Kemal ilk cumhurbaşkanı seçildi. Karar, Ankara’daki meclis merkezli siyasi yapılanmanın yeni bir aşamasını oluşturdu. Atlasın ilk seçkisinin zaman aralığı burada sona erer; Türk tarihinin kapsamı bu tarihle sınırlı değildir.',
      en: 'On 29 October 1923, the Assembly adopted a constitutional amendment establishing republican government. Mustafa Kemal was elected the first president. This marked a new stage in the political order centred on Ankara. The atlas’s initial selection ends here; Turkic and Turkish history extends beyond this date.',
    },
    consequences: {
      tr: [
        'Devletin yönetim biçimi cumhuriyet oldu.',
        'Mustafa Kemal ilk cumhurbaşkanı seçildi.',
      ],
      en: [
        'The republic became the form of government.',
        'Mustafa Kemal was elected the first president.',
      ],
    },
    location: {
      lat: 39.941,
      lng: 32.854,
      name: { tr: 'Ankara', en: 'Ankara' },
      footprint: {
        radiusKm: 7,
        elongation: 1.3,
        bearing: 75,
        roughness: 0.18,
        basis: {
          tr: 'Cumhuriyet kararının alındığı Meclis merkezli Ankara bağlam alanı.',
          en: 'An Ankara context area centred on the Assembly where the republican decision was adopted.',
        },
      },
    },
    actors: {
      tr: ['Mustafa Kemal', 'Türkiye Büyük Millet Meclisi'],
      en: ['Mustafa Kemal', 'Grand National Assembly of Türkiye'],
    },
    sourceIds: ['cumhuriyet', 'meclis'],
  },
];

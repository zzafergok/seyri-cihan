import type { HistoricalEvent } from '@/features/atlas/domain';

export const earlyEvents: HistoricalEvent[] = [
  {
    id: 'gokturk-552',
    slug: 'gokturk-kaganliginin-kurulusu',
    year: 552,
    periodId: 'steppe',
    category: 'state',
    title: {
      tr: 'Göktürk Kağanlığı’nın kuruluşu',
      en: 'The rise of the Turkic Khaganate',
    },
    summary: {
      tr: 'Bumin Kağan önderliğinde bağımsız bir siyasi yapı ortaya çıktı.',
      en: 'An independent polity emerged under Bumin Qaghan.',
    },
    body: {
      tr: 'Bumin’in Juan-Juan hâkimiyetine karşı kazandığı başarı, 552’de Göktürk Kağanlığı’nın kuruluşuna zemin hazırladı. Türk adı bu siyasi yapıyla devlet adı olarak belirginleşti. Haritadaki işaret Ötüken çevresini temsilen gösterir; bir savaşın kesin konumu ya da devletin sınırı değildir.',
      en: 'Bumin’s defeat of the Rouran enabled the establishment of the Turkic Khaganate in 552. The name Türk gained prominence as a state name. The marker represents the Ötüken region, not an exact battlefield or the borders of the khaganate.',
    },
    consequences: {
      tr: [
        'İç Asya’da yeni bir siyasi merkez oluştu.',
        'Türk adı devlet geleneğinde kalıcı bir yer edindi.',
      ],
      en: [
        'A new political centre emerged in Inner Asia.',
        'The name Türk became established in state tradition.',
      ],
    },
    location: {
      lat: 47.5,
      lng: 102.5,
      name: {
        tr: 'Ötüken çevresi · temsili',
        en: 'Ötüken region · approximate',
      },
      footprint: {
        radiusKm: 85,
        elongation: 1.55,
        bearing: 75,
        roughness: 0.3,
        basis: {
          tr: 'Kesin kuruluş noktası değil, Ötüken merkezli geniş ve yaklaşık tarihî bağlam alanı.',
          en: 'A broad approximate historical context centred on Ötüken, not an exact founding site.',
        },
      },
    },
    actors: {
      tr: ['Bumin Kağan', 'Göktürkler', 'Juan-Juanlar'],
      en: ['Bumin Qaghan', 'Göktürks', 'Rouran'],
    },
    sourceIds: ['turk'],
  },
  {
    id: 'kul-tigin-732',
    slug: 'kul-tigin-yaziti',
    year: 732,
    periodId: 'steppe',
    category: 'culture',
    title: { tr: 'Kül Tigin Yazıtı', en: 'The Kül Tigin inscription' },
    summary: {
      tr: 'Orhon vadisinde Türkçe siyasi hafızanın anıtlarından biri yükseldi.',
      en: 'A monument of Turkic political memory was erected in the Orkhon valley.',
    },
    body: {
      tr: 'Bilge Kağan, kardeşi Kül Tigin’in ölümünün ardından onun adına bir anıt diktirdi. 732 tarihli yazıt, kağanlığın mücadelelerini ve halka seslenişleri içerir. Türkçe metnin yanında Çince bir bölüm de vardır. Anıt, dönemin siyasetini ve yazı dilini araştırmak için temel kaynaklardandır.',
      en: 'Bilge Qaghan commissioned a memorial following the death of his brother Kül Tigin. Dated to 732, the inscription recounts the khaganate’s struggles and addresses its people. A Chinese text accompanies the Turkic text. The monument is a key source for the period’s politics and written language.',
    },
    consequences: {
      tr: [
        'Erken Türkçe yazı diline dair kalıcı bir belge oluştu.',
        'Kağanlığın siyasi hafızası taşa aktarıldı.',
      ],
      en: [
        'An enduring record of early written Turkic was created.',
        'The khaganate’s political memory was preserved in stone.',
      ],
    },
    location: {
      lat: 47.56,
      lng: 102.83,
      name: { tr: 'Orhon vadisi', en: 'Orkhon valley' },
      footprint: {
        radiusKm: 14,
        elongation: 1.65,
        bearing: 20,
        roughness: 0.2,
        basis: {
          tr: 'Kül Tigin külliyesi ve Orhon vadisindeki yakın anıt çevresi.',
          en: 'The immediate monument setting around the Kül Tigin complex in the Orkhon valley.',
        },
      },
    },
    actors: {
      tr: ['Kül Tigin', 'Bilge Kağan', 'Yolluğ Tigin'],
      en: ['Kül Tigin', 'Bilge Qaghan', 'Yolluğ Tigin'],
    },
    sourceIds: ['orhon'],
  },
  {
    id: 'talas-751',
    slug: 'talas-savasi',
    year: 751,
    periodId: 'silk-road',
    category: 'battle',
    title: { tr: 'Talas Savaşı', en: 'The Battle of Talas' },
    summary: {
      tr: 'Abbâsî ve Karluk kuvvetleri, Tang ordusunu Talas çevresinde yendi.',
      en: 'Abbasid and Karluk forces defeated a Tang army near Talas.',
    },
    body: {
      tr: '751’de Talas nehri çevresindeki karşılaşma, Orta Asya’daki güç mücadelesinin bir parçasıydı. Karlukların müdahalesi savaşın sonucunda etkili oldu. Bu olay, bölgenin uzun süreye yayılan kültürel ve dini dönüşümünün tek başına açıklaması değildir. İşaret, Talas havzasını yaklaşık olarak gösterir.',
      en: 'The encounter near the Talas River in 751 formed part of the contest for power in Central Asia. Karluk intervention helped determine the outcome. This event alone does not explain the region’s gradual cultural and religious transformation. The marker indicates the approximate Talas basin.',
    },
    consequences: {
      tr: [
        'Tang kuvvetleri ağır bir yenilgi aldı.',
        'Bölgesel güç dengesi değişti.',
      ],
      en: [
        'Tang forces suffered a major defeat.',
        'The regional balance of power shifted.',
      ],
    },
    location: {
      lat: 42.9,
      lng: 71.37,
      name: { tr: 'Talas havzası · yaklaşık', en: 'Talas basin · approximate' },
      footprint: {
        radiusKm: 58,
        elongation: 1.85,
        bearing: 125,
        roughness: 0.28,
        basis: {
          tr: 'Kesin savaş hattı değil, Talas nehri ve havzasını izleyen yaklaşık çatışma çevresi.',
          en: 'Approximate conflict context following the Talas River and basin, not a precise battle line.',
        },
      },
    },
    actors: {
      tr: ['Karluklar', 'Abbâsîler', 'Tang Hanedanı'],
      en: ['Karluks', 'Abbasids', 'Tang dynasty'],
    },
    sourceIds: ['talas'],
  },
  {
    id: 'dandanakan-1040',
    slug: 'dandanakan-savasi',
    year: 1040,
    periodId: 'seljuk',
    category: 'battle',
    title: { tr: 'Dandanakan Savaşı', en: 'The Battle of Dandanakan' },
    summary: {
      tr: 'Selçukluların Gazneliler karşısındaki zaferi yeni bir devletin yolunu açtı.',
      en: 'A Seljuk victory over the Ghaznavids paved the way for a new state.',
    },
    body: {
      tr: '1040’ta Merv yakınlarında yapılan savaşta Selçuklu kuvvetleri Sultan Mesud’un ordusunu yendi. Savaş sonrasında Tuğrul Bey’in sultan ilan edilmesi Büyük Selçuklu siyasi yapısının kuruluşunda önemli bir aşamaydı. Haritadaki nokta Merv çevresini gösterir; arkeolojik olarak kesinleştirilmiş savaş alanı değildir.',
      en: 'In 1040, Seljuk forces defeated Sultan Masud’s army near Merv. The subsequent proclamation of Tughril Beg as sultan marked a major stage in the formation of the Great Seljuk state. The map indicates the Merv region, not an archaeologically established battlefield.',
    },
    consequences: {
      tr: [
        'Selçuklular Horasan’da güç kazandı.',
        'Tuğrul Bey sultan ilan edildi.',
      ],
      en: [
        'The Seljuks strengthened their position in Khorasan.',
        'Tughril Beg was proclaimed sultan.',
      ],
    },
    location: {
      lat: 37.5,
      lng: 61.8,
      name: { tr: 'Merv çevresi · yaklaşık', en: 'Merv region · approximate' },
      footprint: {
        radiusKm: 48,
        elongation: 2.05,
        bearing: 82,
        roughness: 0.29,
        basis: {
          tr: 'Serahs–Merv yolu, Dandanakan kalesi ve yakın çöl hareket alanını izleyen yaklaşık çevre.',
          en: 'Approximate context following the Sarakhs–Merv road, Dandanakan fortress and nearby desert manoeuvres.',
        },
      },
    },
    actors: {
      tr: ['Tuğrul Bey', 'Çağrı Bey', 'Gazneli Sultan Mesud'],
      en: ['Tughril Beg', 'Chaghri Beg', 'Sultan Masud of Ghazna'],
    },
    sourceIds: ['dandanakan'],
  },
];

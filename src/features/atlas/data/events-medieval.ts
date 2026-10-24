import type { HistoricalEvent } from '@/features/atlas/domain';

export const medievalEvents: HistoricalEvent[] = [
  {
    id: 'malazgirt-1071',
    slug: 'malazgirt-savasi',
    year: 1071,
    periodId: 'seljuk',
    category: 'battle',
    title: { tr: 'Malazgirt Savaşı', en: 'The Battle of Manzikert' },
    summary: {
      tr: 'Alparslan’ın ordusu, IV. Romanos Diogenes’in kuvvetlerini yendi.',
      en: 'Alp Arslan’s army defeated the forces of Romanos IV Diogenes.',
    },
    body: {
      tr: '26 Ağustos 1071’de Malazgirt yakınlarında Selçuklu ve Bizans orduları karşılaştı. Bizans imparatorunun esir düşmesi savaşın belirleyici sonuçlarındandı. Savaşı izleyen siyasi çözülme ve göçler Anadolu’nun dönüşümüne katkıda bulundu; bölgenin tamamı tek bir günde el değiştirmedi.',
      en: 'On 26 August 1071, Seljuk and Byzantine armies met near Manzikert. The capture of the Byzantine emperor was a decisive result. Subsequent political fragmentation and migration contributed to Anatolia’s transformation; the entire region did not change hands in a single day.',
    },
    consequences: {
      tr: [
        'IV. Romanos Diogenes esir düştü.',
        'Anadolu’daki siyasi ve demografik değişim hızlandı.',
      ],
      en: [
        'Romanos IV Diogenes was captured.',
        'Political and demographic change in Anatolia accelerated.',
      ],
    },
    location: {
      lat: 39.15,
      lng: 42.54,
      name: { tr: 'Malazgirt çevresi', en: 'Manzikert region' },
      footprint: {
        radiusKm: 34,
        elongation: 1.7,
        bearing: 235,
        roughness: 0.27,
        basis: {
          tr: 'Malazgirt–Ahlat arasındaki Rahve ovası ve çevre tepelerin yaklaşık muharebe bağlamı.',
          en: 'Approximate battle context across the Rahva plain and nearby hills between Manzikert and Ahlat.',
        },
      },
    },
    actors: {
      tr: ['Alparslan', 'IV. Romanos Diogenes'],
      en: ['Alp Arslan', 'Romanos IV Diogenes'],
    },
    sourceIds: ['malazgirt'],
  },
  {
    id: 'divan-1074',
    slug: 'divanu-lugatit-turk',
    year: 1074,
    periodId: 'seljuk',
    category: 'culture',
    title: { tr: 'Dîvânu Lugâti’t-Türk', en: 'Dīwān Lughāt al-Turk' },
    summary: {
      tr: 'Kâşgarlı Mahmud, Türk dili ve dünyası üzerine eserini tamamladı.',
      en: 'Mahmud al-Kashgari completed his work on Turkic languages and peoples.',
    },
    body: {
      tr: 'Kâşgarlı Mahmud’un 1072’de yazmaya başladığı eser, TDV maddesinde aktarılan telif kaydına göre 1074’te tamamlandı. Sözlük, Türkçe kelimelerin yanında şiirler, atasözleri ve coğrafi bilgiler içerir. İşaret eserin Bağdat bağlantısını gösterir; yazarın tüm araştırma güzergâhını temsil etmez.',
      en: 'According to the composition record discussed by the TDV encyclopedia, Mahmud al-Kashgari began the work in 1072 and completed it in 1074. The dictionary includes poetry, proverbs and geographical knowledge alongside Turkic vocabulary. The marker denotes its Baghdad connection, not the author’s entire research itinerary.',
    },
    consequences: {
      tr: [
        'Türk lehçelerine ilişkin kapsamlı bir söz varlığı kaydedildi.',
        'Dil ile coğrafyayı birleştiren bir başvuru eseri oluştu.',
      ],
      en: [
        'A substantial record of Turkic vocabulary was preserved.',
        'A reference work connected language with geography.',
      ],
    },
    location: {
      lat: 33.32,
      lng: 44.37,
      name: {
        tr: 'Bağdat · eser bağlantısı',
        en: 'Baghdad · work association',
      },
      footprint: {
        radiusKm: 12,
        elongation: 1.35,
        bearing: 110,
        roughness: 0.17,
        basis: {
          tr: 'Eserin Bağdat bağlantısını gösteren kent çevresi; araştırma güzergâhı değildir.',
          en: 'Urban context for the work’s Baghdad association, not the author’s research route.',
        },
      },
    },
    actors: { tr: ['Kâşgarlı Mahmud'], en: ['Mahmud al-Kashgari'] },
    sourceIds: ['divan'],
  },
  {
    id: 'bursa-1326',
    slug: 'bursanin-fethi',
    year: 1326,
    periodId: 'early-ottoman',
    category: 'state',
    title: { tr: 'Bursa’nın fethi', en: 'The conquest of Bursa' },
    summary: {
      tr: 'Bursa, uzun bir ablukanın ardından Osmanlı yönetimine geçti.',
      en: 'Bursa came under Ottoman rule following a prolonged blockade.',
    },
    body: {
      tr: 'Bursa, 6 Nisan 1326’da Osmanlılara teslim oldu. Orhan Gazi şehri beyliğin merkezi yaptı. İzleyen yıllarda cami, medrese, imaret ve ticaret yapılarıyla şehir gelişti. Bursa’nın hikâyesi, askeri genişlemenin yanında kentleşme ve kurumlaşma süreçlerini de görünür kılar.',
      en: 'Bursa surrendered to the Ottomans on 6 April 1326. Orhan made the city the centre of the principality. Mosques, schools, charitable foundations and commercial buildings supported its subsequent growth. Bursa’s story illustrates urban development and institution-building alongside military expansion.',
    },
    consequences: {
      tr: [
        'Bursa Osmanlı beyliğinin merkezi oldu.',
        'Yeni ticari ve kamusal yapılar şehri dönüştürdü.',
      ],
      en: [
        'Bursa became the centre of the Ottoman principality.',
        'New commercial and public buildings transformed the city.',
      ],
    },
    location: {
      lat: 40.18,
      lng: 29.06,
      name: { tr: 'Bursa', en: 'Bursa' },
      footprint: {
        radiusKm: 18,
        elongation: 1.45,
        bearing: 80,
        roughness: 0.22,
        basis: {
          tr: 'Bursa kent merkezi ve uzun kuşatmanın yakın çevresini gösteren yaklaşık alan.',
          en: 'Approximate area around Bursa and the immediate setting of its prolonged blockade.',
        },
      },
    },
    actors: {
      tr: ['Orhan Gazi', 'Bursa halkı'],
      en: ['Orhan', 'The people of Bursa'],
    },
    sourceIds: ['bursa'],
  },
  {
    id: 'istanbul-1453',
    slug: 'istanbulun-fethi',
    year: 1453,
    periodId: 'ottoman',
    category: 'battle',
    title: { tr: 'İstanbul’un fethi', en: 'The conquest of Constantinople' },
    summary: {
      tr: '29 Mayıs’ta şehir Osmanlı yönetimine geçti; yeni bir başkent doğdu.',
      en: 'On 29 May the city came under Ottoman rule and became a new capital.',
    },
    body: {
      tr: 'II. Mehmed’in kuşatması 29 Mayıs 1453’te şehrin alınmasıyla sonuçlandı. Bizans imparatorluk merkezi sona ererken İstanbul Osmanlı başkentine dönüştü. Kuşatma, şehrin halkı için yıkım ve esaret de getirdi. Sonraki imar ve iskân politikaları kentin toplumsal ve fiziksel yapısını yeniden şekillendirdi.',
      en: 'Mehmed II’s siege ended with the capture of the city on 29 May 1453. The Byzantine imperial centre fell, and Istanbul became the Ottoman capital. The siege also brought destruction and captivity to inhabitants. Subsequent rebuilding and settlement policies reshaped the city’s social and physical fabric.',
    },
    consequences: {
      tr: [
        'İstanbul Osmanlı devletinin merkezi oldu.',
        'Şehirde yeni imar ve iskân çalışmaları başladı.',
      ],
      en: [
        'Istanbul became the centre of the Ottoman state.',
        'Rebuilding and resettlement transformed the city.',
      ],
    },
    location: {
      lat: 41.01,
      lng: 28.97,
      name: { tr: 'İstanbul', en: 'Istanbul / Constantinople' },
      footprint: {
        radiusKm: 19,
        elongation: 1.55,
        bearing: 105,
        roughness: 0.23,
        basis: {
          tr: 'Surlu şehir, Boğaziçi yaklaşımı ve kuşatma çevresini birlikte okutan yaklaşık alan.',
          en: 'Approximate context joining the walled city, Bosphorus approaches and siege surroundings.',
        },
      },
    },
    actors: {
      tr: ['II. Mehmed', 'XI. Konstantinos', 'İstanbul halkı'],
      en: ['Mehmed II', 'Constantine XI', 'The people of Constantinople'],
    },
    sourceIds: ['istanbul'],
  },
];

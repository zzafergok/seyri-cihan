import type { HistoricalSource } from '@/features/atlas/domain';

const encyclopedia = 'TDV İslâm Ansiklopedisi';
export const sources: HistoricalSource[] = [
  {
    id: 'turk',
    title: 'Türk — Tarih',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/turk',
  },
  {
    id: 'orhon',
    title: 'Orhon Yazıtları',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/orhon-yazitlari',
  },
  {
    id: 'talas',
    title: 'Talas Savaşı',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/talas-savasi',
  },
  {
    id: 'dandanakan',
    title: 'Dandanakan Savaşı',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/dandanakan-savasi',
  },
  {
    id: 'malazgirt',
    title: 'Malazgirt Muharebesi',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/malazgirt-muharebesi',
  },
  {
    id: 'divan',
    title: 'Dîvânü Lugāti’t-Türk',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/divanu-lugatit-turk',
  },
  {
    id: 'bursa',
    title: 'Bursa — Tarih',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/bursa',
  },
  {
    id: 'istanbul',
    title: 'İstanbul — Türk Devri',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/istanbul#3-turk-devri',
  },
  {
    id: 'ridaniye',
    title: 'Ridâniye Savaşı',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/ridaniye-savasi',
  },
  {
    id: 'tanzimat',
    title: 'Tanzimat',
    publisher: encyclopedia,
    url: 'https://islamansiklopedisi.org.tr/tanzimat',
  },
  {
    id: 'meclis',
    title: 'Kurtuluş Savaşı Müzesi',
    publisher: 'Türkiye Büyük Millet Meclisi',
    url: 'https://www.tbmm.gov.tr/Sayfa/KurtulusSavasiMuzesi',
  },
  {
    id: 'cumhuriyet',
    title: 'History of the Grand National Assembly',
    publisher: 'Türkiye Büyük Millet Meclisi',
    url: 'https://www.tbmm.gov.tr/history/',
  },
  {
    id: 'cshapes-2',
    title: 'CShapes 2.0 — Schvitz et al. (2022)',
    publisher: 'ETH Zürich · CC BY-NC-SA 4.0',
    url: 'https://icr.ethz.ch/data/cshapes/',
  },
];

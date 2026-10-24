import type { Period } from '@/features/atlas/domain';

// Editorial navigation chapters; these are not the lifespans of individual states.
export const periods: Period[] = [
  {
    id: 'steppe',
    title: { tr: 'Bozkır ve yazıtlar', en: 'Steppe and inscriptions' },
    startYear: 552,
    endYear: 743,
    color: '#d5a95c',
  },
  {
    id: 'silk-road',
    title: { tr: 'İpek Yolu dünyası', en: 'The Silk Road world' },
    startYear: 744,
    endYear: 1039,
    color: '#7eb5ab',
  },
  {
    id: 'seljuk',
    title: { tr: 'Selçuklu ufku', en: 'The Seljuk horizon' },
    startYear: 1040,
    endYear: 1299,
    color: '#d58a66',
  },
  {
    id: 'early-ottoman',
    title: { tr: 'Beylikten devlete', en: 'From principality to state' },
    startYear: 1300,
    endYear: 1452,
    color: '#a99ac5',
  },
  {
    id: 'ottoman',
    title: { tr: 'Osmanlı dünyası', en: 'The Ottoman world' },
    startYear: 1453,
    endYear: 1838,
    color: '#d5a95c',
  },
  {
    id: 'reform',
    title: { tr: 'Reform ve dönüşüm', en: 'Reform and transformation' },
    startYear: 1839,
    endYear: 1918,
    color: '#84a7bd',
  },
  {
    id: 'republic',
    title: { tr: 'Cumhuriyete doğru', en: 'Towards the republic' },
    startYear: 1919,
    endYear: 1923,
    color: '#ce7772',
  },
];

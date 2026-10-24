const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  'http://localhost:3000';

export const siteMetadata = {
  name: 'Seyri Cihan',
  legalName: 'Seyri Cihan — Etkileşimli Türk Tarihi Atlası',
  description:
    'Türk tarihinin dönüm noktalarını dönen bir dünya üzerinde keşfedin. 552–1923 arasında olaylar, dönemler ve kaynaklarla bir tarih yolculuğu.',
  url: new URL(siteUrl),
  creator: 'Seyri Cihan',
  publisher: 'Seyri Cihan',
  keywords: [
    'Seyri Cihan',
    'Türk tarihi',
    'tarih atlası',
    '3B dünya',
    'Göktürkler',
    'Selçuklular',
    'Osmanlı',
    'tarih kronolojisi',
  ],
  assets: {
    icon16: '/icon.svg',
    icon32: '/icon.svg',
    icon48: '/icon.svg',
    shortcutIcon: '/icon.svg',
    appleTouchIcon: '/icon.svg',
    android192: '/icon.svg',
    android512: '/icon.svg',
    logo: '/icon.svg',
    openGraph: '/opengraph-image',
  },
  aiSummary:
    'Seyri Cihan is a bilingual interactive atlas of selected Turkic and Turkish historical events from 552 to 1923. Events have linked references; schematic territory overlays are illustrative rather than authoritative historical borders.',
} as const;

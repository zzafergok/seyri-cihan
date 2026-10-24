import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { siteMetadata } from './constants';
import { absoluteUrl } from './url-utils';

export function buildRootMetadata(
  locale: Locale = routing.defaultLocale,
): Metadata {
  const title =
    locale === 'tr'
      ? 'Seyri Cihan | Etkileşimli Türk Tarihi Atlası'
      : 'Seyri Cihan | Interactive History Atlas';

  return {
    metadataBase: siteMetadata.url,
    applicationName: siteMetadata.name,
    title: {
      default: title,
      template: `%s | ${siteMetadata.name}`,
    },
    description: siteMetadata.description,
    keywords: [...siteMetadata.keywords],
    authors: [{ name: siteMetadata.creator, url: siteMetadata.url }],
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    category: 'education',
    classification: 'historical atlas',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
      shortcut: '/icon.svg',
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      siteName: siteMetadata.name,
      title,
      description: siteMetadata.description,
      url: '/',
      images: [
        {
          url: siteMetadata.assets.openGraph,
          width: 1200,
          height: 630,
          alt: `${siteMetadata.name} interactive history atlas`,
        },
      ],
      locale,
      alternateLocale: routing.locales.filter((item) => item !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteMetadata.description,
      images: [siteMetadata.assets.openGraph],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'ai:site_name': siteMetadata.name,
      'ai:summary': siteMetadata.aiSummary,
      'ai:llms-txt': absoluteUrl('/llms.txt'),
    },
  };
}

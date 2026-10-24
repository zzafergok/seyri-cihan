import type { MetadataRoute } from 'next';
import { events, periods } from '@/features/atlas/data';

import { getIndexableRoutes, siteMetadata } from '@/lib/metadata/site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...getIndexableRoutes().map((route) => route.path),
    ...events.map((event) => `/olay/${event.slug}`),
    ...periods.map((period) => `/donem/${period.id}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteMetadata.url).toString(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/atlas' ? 0.9 : 0.6,
  }));
}

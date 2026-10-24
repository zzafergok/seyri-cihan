import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/lib/metadata/site-metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.legalName,
    short_name: siteMetadata.name,
    description: siteMetadata.description,
    start_url: '/atlas',
    scope: '/',
    display: 'standalone',
    background_color: '#07101b',
    theme_color: '#07101b',
    icons: [
      {
        src: siteMetadata.assets.android192,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}

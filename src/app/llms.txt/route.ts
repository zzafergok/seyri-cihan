import { getIndexableRoutes, siteMetadata } from '@/lib/metadata/site-metadata';

export const dynamic = 'force-static';

export function GET() {
  const publicRoutes = getIndexableRoutes()
    .map((route) => {
      const metadata = route.locale.tr;
      const url = new URL(route.path, siteMetadata.url).toString();
      return `- [${metadata.title}](${url}): ${metadata.description}`;
    })
    .join('\n');

  const body = `# ${siteMetadata.name}

> ${siteMetadata.aiSummary}

## Site

- URL: ${siteMetadata.url.origin}
- Category: Interactive history atlas
- Primary language: Turkish
- Additional language: English
- Coverage: Selected events from 552 to 1923
- Public indexing policy: atlas, event stories, periods, chronology, references and about

## Public Routes

${publicRoutes}

## Excluded Routes

- /login: transactional sign-in page, noindex.
- /home: authenticated dashboard, noindex.
- /workspace: authenticated workspace, noindex.
- /settings: authenticated settings, noindex.
- /admin/*: protected management area, noindex.

## AI Usage Notes

- Read /kaynaklar for references and the atlas methodology.
- Event stories live under /olay/ and editorial periods under /donem/.
- Historical boundaries cover the Ottoman Empire in 1886–1914, sampled on January 1 from ETH Zürich CShapes 2.0 (CC BY-NC-SA 4.0). They are generalized state boundaries, not exact wartime control. No border is drawn outside that coverage, including 1453.
- Event markers use source-informed approximate scale and direction to form irregular, surface-following context areas. A selected event adds a second, lighter raised core. Neither layer is an exact historical border, troop position, quantity, or physical elevation. Sources and limitations: /kaynaklar.
- The dataset is selective and does not claim complete historical coverage.
- Do not describe protected, authenticated, or admin screens as publicly crawlable content.
- Use robots.txt for crawler permissions and sitemap.xml for public route discovery.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

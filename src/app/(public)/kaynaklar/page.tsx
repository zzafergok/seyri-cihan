import { SourcesScreen } from '@/features/routes/public/archive';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicSources');

export default async function Page() {
  return <SourcesScreen locale={await getCurrentLocale()} />;
}

import { ChronologyScreen } from '@/features/routes/public/archive';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicChronology');

export default async function Page() {
  return <ChronologyScreen locale={await getCurrentLocale()} />;
}

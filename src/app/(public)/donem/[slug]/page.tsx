import { notFound } from 'next/navigation';
import { periods } from '@/features/atlas/data';
import { formatYear, localized } from '@/features/atlas/domain';
import { PeriodScreen } from '@/features/routes/public/archive';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { createDynamicMetadata } from '@/lib/metadata/page-metadata';

export const dynamicParams = false;
export function generateStaticParams() {
  return periods.map((period) => ({ slug: period.id }));
}

export const generateMetadata = createDynamicMetadata<{ slug: string }>(
  ({ params, locale }) => {
    const period = periods.find((item) => item.id === params.slug);
    if (!period) notFound();
    const title = localized(period.title, locale);
    return {
      path: `/donem/${period.id}`,
      title,
      description: `${title}: ${formatYear(period.startYear, locale)} — ${formatYear(period.endYear, locale)}. ${locale === 'tr' ? 'Dönemin seçilmiş olaylarını keşfedin.' : 'Discover selected events from this period.'}`,
    };
  },
);

export default async function PeriodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, locale] = await Promise.all([params, getCurrentLocale()]);
  const period = periods.find((item) => item.id === slug);
  if (!period) notFound();
  return <PeriodScreen period={period} locale={locale} />;
}

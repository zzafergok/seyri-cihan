import { notFound } from 'next/navigation';
import { events, findEvent } from '@/features/atlas/data';
import { localized } from '@/features/atlas/domain';
import { EventScreen } from '@/features/routes/public/archive';
import { getCurrentLocale } from '@/lib/i18n/server-locale';
import { createDynamicMetadata } from '@/lib/metadata/page-metadata';

export const dynamicParams = false;
export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export const generateMetadata = createDynamicMetadata<{ slug: string }>(
  ({ params, locale }) => {
    const event = findEvent(params.slug);
    if (!event) notFound();
    return {
      path: `/olay/${event.slug}`,
      title: localized(event.title, locale),
      description: localized(event.summary, locale),
    };
  },
);

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, locale] = await Promise.all([params, getCurrentLocale()]);
  const event = findEvent(slug);
  if (!event) notFound();
  return <EventScreen event={event} locale={locale} />;
}

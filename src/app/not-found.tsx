import { Compass } from 'lucide-react';
import { Link } from '@/components/core/link';
import { getCurrentLocale } from '@/lib/i18n/server-locale';

export default async function NotFound() {
  const locale = await getCurrentLocale();
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <Compass size={48} strokeWidth={1} className="text-tulpar-gold" />
      <p className="font-mono text-xs tracking-widest">SEYRİ CİHAN / 404</p>
      <h1 className="font-serif text-4xl">{locale === 'tr' ? 'Bu rota henüz atlasımızda yok.' : 'This route is not in our atlas yet.'}</h1>
      <Link href="/atlas" variant="outline">{locale === 'tr' ? 'Atlasa dön' : 'Return to the atlas'}</Link>
    </section>
  );
}

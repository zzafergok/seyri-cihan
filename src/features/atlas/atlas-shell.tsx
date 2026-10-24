'use client';

import { Compass, Globe2, Moon, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useMounted } from '@/hooks/use-mounted';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { useI18n } from '@/hooks/use-i18n';
import { useSwitchLocale } from '@/components/providers/client-locale-provider';
import { getAtlasCopy } from '@/features/routes/public/atlas/i18n';

export function AtlasShell({ children }: { children: React.ReactNode }) {
  const { locale, copy } = useI18n(getAtlasCopy);
  const pathname = usePathname();
  const router = useRouter();
  const switchLocale = useSwitchLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const [pending, setPending] = useState(false);
  const light = mounted && resolvedTheme === 'light';
  const nav = [
    { href: '/atlas', label: copy.atlas },
    { href: '/kronoloji', label: copy.chronology },
    { href: '/kaynaklar', label: copy.sources },
  ];

  return (
    <div className="atlas-site">
      <Link href="#atlas-main" className="atlas-skip">
        {copy.skip}
      </Link>
      <header className="atlas-header">
        <Link href="/" className="atlas-brand" aria-label="Seyri Cihan">
          <span className="atlas-brand-mark">
            <Compass size={27} strokeWidth={1.2} />
          </span>
          <span>
            <strong>
              Seyri Cihan<span className="text-tulpar-gold">.</span>
            </strong>
            <small>{copy.tagline}</small>
          </span>
        </Link>
        <nav aria-label={copy.atlas} className="atlas-nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href ||
                (pathname === '/' && item.href === '/atlas')
                  ? 'page'
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={light ? copy.dark : copy.light}
            onClick={() => setTheme(light ? 'dark' : 'light')}
          >
            {light ? <Moon size={17} /> : <Sun size={17} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label={copy.language}
            disabled={pending}
            onClick={async () => {
              setPending(true);
              try {
                await switchLocale(locale === 'tr' ? 'en' : 'tr');
                router.refresh();
              } finally {
                setPending(false);
              }
            }}
          >
            <Globe2 size={14} className="mr-1.5" />
            {locale.toUpperCase()}
          </Button>
        </div>
      </header>
      <main id="atlas-main">{children}</main>
      <footer className="atlas-footer">
        <span>© {new Date().getFullYear()} Seyri Cihan</span>
        <span>{copy.coverage}</span>
        <Link href="/hakkinda">{copy.about} ↗</Link>
      </footer>
    </div>
  );
}

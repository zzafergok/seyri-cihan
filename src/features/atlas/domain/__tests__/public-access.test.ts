import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

describe('public atlas access', () => {
  it('allows anonymous atlas, archive and unknown routes through without login redirects', () => {
    for (const path of [
      '/atlas',
      '/olay/istanbulun-fethi',
      '/kronoloji',
      '/kaynaklar',
      '/unknown',
    ]) {
      const response = proxy(new NextRequest('http://localhost:3000' + path));
      expect(response.headers.has('location')).toBe(false);
      expect(response.headers.get('x-middleware-next')).toBe('1');
    }
  });
  it('disables inherited demo authentication and redirects template account pages', () => {
    expect(
      proxy(
        new NextRequest('http://localhost:3000/api/auth/login', {
          method: 'POST',
        }),
      ).status,
    ).toBe(404);
    expect(
      proxy(new NextRequest('http://localhost:3000/admin')).headers.get(
        'location',
      ),
    ).toBe('http://localhost:3000/atlas');
  });
});

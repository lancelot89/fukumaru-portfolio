import { describe, it, expect } from 'vitest';

// Blog と Works の generateMetadata が OG 画像を付与することを確認
describe('metadata openGraph images', () => {
  it('blog detail sets og image', async () => {
    const mod = await import('@/app/blog/[slug]/page');
    const meta = await mod.generateMetadata({
      params: Promise.resolve({ slug: 'sample-1' }),
    } as any);
    expect(meta.openGraph?.images).toBeTruthy();
  });

  it('works detail sets og image', async () => {
    const mod = await import('@/app/works/[slug]/page');
    const meta = await mod.generateMetadata({
      params: Promise.resolve({ slug: 'sample-1' }),
    } as any);
    expect(meta.openGraph?.images).toBeTruthy();
  });
});

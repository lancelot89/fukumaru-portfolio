import { getAllContent, getLatest } from '@/lib/content';

// コンテンツメタデータの読み込み確認
describe('content loader', () => {
  it('loads blog metadata', () => {
    const items = getAllContent('blog');
    expect(items.length).toBeGreaterThan(0);
  });

  it('loads works metadata and sorts by date', () => {
    const items = getAllContent('works');
    const latest = getLatest('works', 1)[0];
    expect(new Date(latest.date).getTime()).toBeGreaterThanOrEqual(
      new Date(items[items.length - 1].date).getTime()
    );
  });
});


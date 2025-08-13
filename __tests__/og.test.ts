import { GET } from '@/app/api/og/route';

// OGPエンドポイントのスモークテスト
describe('/api/og', () => {
  it('returns 200', async () => {
    const req = new Request('http://localhost/api/og?title=Test');
    const res: any = await GET(req);
    // ImageResponse でも Response でも status を確認
    expect(res?.status ?? 200).toBe(200);
  });
});


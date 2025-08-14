import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('About page socials visibility', () => {
  beforeEach(() => {
    // X と LinkedIn は未設定、GitHub のみ設定とする
    process.env.NEXT_PUBLIC_SOCIAL_X = '';
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN = '';
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB = 'https://github.com/example';
  });

  it('renders only provided socials', async () => {
    const mod = await import('@/app/about/page');
    const About = mod.default;
    render(<About />);
    expect(screen.queryByRole('link', { name: 'X' })).toBeNull();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).toBeNull();
  });
});

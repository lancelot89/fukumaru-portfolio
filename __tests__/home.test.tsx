import { render, screen } from '@testing-library/react';
import { Header } from '@/components/site/Header';

// ヘッダのランドマーク/ナビゲーションの簡易テスト
describe('Header', () => {
  it('renders nav links and theme toggle', () => {
    render(<Header siteName="Test Site" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'グローバル' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '実績' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ブログ' })).toBeInTheDocument();
  });
});


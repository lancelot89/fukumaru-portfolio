import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { BlogList } from '@/components/blog/BlogList';
import { WorkList } from '@/components/works/WorkList';

const items = [
  {
    slug: 'a',
    title: 'A',
    date: '2024-01-01',
    summary: 'sum',
    tags: ['Go', 'GCP'],
    hero: '',
  },
];

describe('Tag list a11y', () => {
  it('BlogList renders tags as list with accessible name', () => {
    render(<BlogList items={items} />);
    const lists = screen.getAllByRole('list', { name: 'タグ一覧' });
    expect(lists.length).toBeGreaterThan(0);
    const tagItems = within(lists[0]).getAllByRole('listitem');
    expect(tagItems).toHaveLength(items[0].tags!.length);
  });

  it('WorkList renders tags as list with accessible name', () => {
    render(<WorkList items={items} />);
    const lists = screen.getAllByRole('list', { name: 'タグ一覧' });
    expect(lists.length).toBeGreaterThan(0);
    const tagItems = within(lists[0]).getAllByRole('listitem');
    expect(tagItems).toHaveLength(items[0].tags!.length);
  });
});

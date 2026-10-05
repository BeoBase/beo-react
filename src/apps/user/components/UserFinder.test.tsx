import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserFinder from './UserFinder.tsx';

const names = () => screen.queryAllByRole('listitem').map((item) => item.textContent);
const search = (value: string) =>
  fireEvent.change(screen.getByRole('searchbox'), { target: { value } });

describe('UserFinder', () => {
  it('renders a search box and all users by default', () => {
    render(<UserFinder />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(names()).toEqual(['Max', 'Manuel', 'Julie']);
  });

  it('renders the Users toggle button', () => {
    render(<UserFinder />);

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
  });

  it('filters the users as the user types', () => {
    render(<UserFinder />);

    search('Ma');

    expect(names()).toEqual(['Max', 'Manuel']);
  });

  it('narrows the list to one user', () => {
    render(<UserFinder />);

    search('Julie');

    expect(names()).toEqual(['Julie']);
  });

  it('shows no users when nothing matches', () => {
    render(<UserFinder />);

    search('zzz');

    expect(names()).toEqual([]);
  });

  it('shows all users again when the search is cleared', () => {
    render(<UserFinder />);

    search('Max');
    search('');

    expect(names()).toEqual(['Max', 'Manuel', 'Julie']);
  });

  it('matches case-sensitively', () => {
    render(<UserFinder />);

    search('max');

    expect(names()).toEqual([]);
  });

  it('keeps the hide/show state when the search changes', () => {
    render(<UserFinder />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));
    search('Ma');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show Users' }));

    expect(names()).toEqual(['Max', 'Manuel']);
  });
});

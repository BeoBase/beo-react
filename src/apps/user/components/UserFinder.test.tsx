import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserFinder from './UserFinder.tsx';
import UsersContext from '../store/users-context.ts';

const USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

// UserFinder reads its users from UsersContext, so it needs a provider.
const renderFinder = (users = USERS) =>
  render(
    <UsersContext.Provider value={{ users }}>
      <UserFinder />
    </UsersContext.Provider>,
  );

const names = () => screen.queryAllByRole('listitem').map((item) => item.textContent);
const search = (value: string) =>
  fireEvent.change(screen.getByRole('searchbox'), { target: { value } });

describe('UserFinder', () => {
  it('renders a search box and all users from the context by default', () => {
    renderFinder();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(names()).toEqual(['Max', 'Manuel', 'Julie']);
  });

  it('renders the Users toggle button', () => {
    renderFinder();

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
  });

  it('shows the users that the provider supplies, not a fixed list', () => {
    renderFinder([{ id: 'x1', name: 'Anna' }, { id: 'x2', name: 'Bob' }]);

    expect(names()).toEqual(['Anna', 'Bob']);
  });

  it('shows no users when there is no provider (empty default context)', () => {
    render(<UserFinder />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(names()).toEqual([]);
  });

  it('shows no users when the provider supplies an empty list', () => {
    renderFinder([]);

    expect(names()).toEqual([]);
  });

  it('filters the users as the user types', () => {
    renderFinder();

    search('Ma');

    expect(names()).toEqual(['Max', 'Manuel']);
  });

  it('narrows the list to one user', () => {
    renderFinder();

    search('Julie');

    expect(names()).toEqual(['Julie']);
  });

  it('shows no users when nothing matches', () => {
    renderFinder();

    search('zzz');

    expect(names()).toEqual([]);
  });

  it('shows all users again when the search is cleared', () => {
    renderFinder();

    search('Max');
    search('');

    expect(names()).toEqual(['Max', 'Manuel', 'Julie']);
  });

  it('filters the context users, not other names', () => {
    renderFinder([{ id: 'x1', name: 'Anna' }, { id: 'x2', name: 'Bob' }]);

    search('An');

    expect(names()).toEqual(['Anna']);
  });

  it('matches case-sensitively', () => {
    renderFinder();

    search('max');

    expect(names()).toEqual([]);
  });

  it('keeps the hide/show state when the search changes', () => {
    renderFinder();

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));
    search('Ma');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show Users' }));

    expect(names()).toEqual(['Max', 'Manuel']);
  });
});

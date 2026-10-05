import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserPage from './UserPage.tsx';

describe('UserPage', () => {
  it('sets the document title', () => {
    render(<UserPage />);

    expect(document.title).toBe('Beo Base | Users');
  });

  it('renders the search box and the users', () => {
    render(<UserPage />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Max',
      'Manuel',
      'Julie',
    ]);
  });

  it('filters the users when searching', () => {
    render(<UserPage />);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Jul' } });

    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Julie']);
  });

  it('can hide and show the users', () => {
    render(<UserPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show Users' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});

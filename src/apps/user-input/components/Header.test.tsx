import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header.tsx';

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: 'React Forms' })).toBeInTheDocument();
  });

  it('renders the logo with its alt text', () => {
    render(<Header />);

    expect(screen.getByRole('img', { name: 'A form and a pencil' })).toBeInTheDocument();
  });

  it('renders inside a header landmark', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

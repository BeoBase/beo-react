import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header.tsx';

describe('Header', () => {
  it('renders the title', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'React - Behind The Scenes' })
    ).toBeInTheDocument();
  });

  it('renders the logo with alt text', () => {
    render(<Header />);

    expect(screen.getByAltText('Magnifying glass analyzing a document')).toBeInTheDocument();
  });

  it('renders inside a header element', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';

describe('Header', () => {
  it('renders the quiz title', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { name: 'React Quiz' })
    ).toBeInTheDocument();
  });

  it('renders the quiz logo', () => {
    render(<Header />);

    expect(
      screen.getByRole('img', { name: 'Quiz Logo' })
    ).toBeInTheDocument();
  });

  it('renders the logo with the expected classes', () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: 'Quiz Logo' });

    expect(logo).toHaveClass('mx-auto', 'w-16', 'h-16');
  });

  it('renders the header with centered text', () => {
    render(<Header />);

    const header = screen.getByRole('banner');

    expect(header).toHaveClass('text-center');
  });

})
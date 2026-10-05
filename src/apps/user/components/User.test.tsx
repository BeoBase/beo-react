import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import User from './User.tsx';

const renderUser = (name: string) =>
  render(
    <ul>
      <User name={name} />
    </ul>,
  );

describe('User', () => {
  it('renders the name', () => {
    renderUser('Max');

    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('renders as a list item', () => {
    renderUser('Max');

    expect(screen.getByRole('listitem')).toHaveTextContent('Max');
  });

  it('applies the user style from the SCSS module', () => {
    renderUser('Max');

    // CSS modules hash the class name, so match on the original name.
    expect(screen.getByRole('listitem').className).toMatch(/user/);
  });

  it('renders a different name when the prop changes', () => {
    const { rerender } = renderUser('Max');

    rerender(
      <ul>
        <User name="Julie" />
      </ul>,
    );

    expect(screen.getByText('Julie')).toBeInTheDocument();
    expect(screen.queryByText('Max')).not.toBeInTheDocument();
  });

  it('renders several users as separate items', () => {
    render(
      <ul>
        <User name="Max" />
        <User name="Manuel" />
        <User name="Julie" />
      </ul>,
    );

    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Max',
      'Manuel',
      'Julie',
    ]);
  });

  it('renders an empty item when the name is empty', () => {
    renderUser('');

    expect(screen.getByRole('listitem')).toBeEmptyDOMElement();
  });
});

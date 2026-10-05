import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Users from './Users.tsx';

const NAMES = ['Max', 'Manuel', 'Julie'];

describe('Users', () => {
  it('renders the toggle button and the users by default', () => {
    render(<Users />);

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
    NAMES.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the users in order inside a list', () => {
    render(<Users />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(NAMES);
  });

  it('applies the users style from the SCSS module', () => {
    const { container } = render(<Users />);

    // CSS modules hash the class name, so match on the original name.
    expect((container.firstChild as HTMLElement).className).toMatch(/users/);
  });

  it('hides the users when the button is clicked', () => {
    render(<Users />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    NAMES.forEach((name) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });
  });

  it('changes the button label to "Show Users" after hiding', () => {
    render(<Users />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));

    expect(screen.getByRole('button', { name: 'Show Users' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Hide Users' })).not.toBeInTheDocument();
  });

  it('shows the users again when the button is clicked a second time', () => {
    render(<Users />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Users' }));

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(NAMES.length);
  });

  it('keeps toggling correctly over several clicks', () => {
    render(<Users />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Show Users');
  });

  it('always renders exactly one button', () => {
    render(<Users />);

    expect(screen.getAllByRole('button')).toHaveLength(1);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});

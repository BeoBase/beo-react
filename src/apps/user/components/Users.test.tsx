import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Users from './Users.tsx';

const USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];
const NAMES = USERS.map((user) => user.name);

describe('Users', () => {
  it('renders the toggle button and the users by default', () => {
    render(<Users users={USERS} />);

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
    NAMES.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders the users in order inside a list', () => {
    render(<Users users={USERS} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(NAMES);
  });

  it('renders only the users it is given', () => {
    render(<Users users={[USERS[1]]} />);

    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Manuel']);
    expect(screen.queryByText('Max')).not.toBeInTheDocument();
  });

  it('renders an empty list when given no users', () => {
    render(<Users users={[]} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('updates the list when the users prop changes', () => {
    const { rerender } = render(<Users users={USERS} />);

    rerender(<Users users={[USERS[2]]} />);

    expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Julie']);
  });

  it('applies the users style from the SCSS module', () => {
    const { container } = render(<Users users={USERS} />);

    // CSS modules hash the class name, so match on the original name.
    expect((container.firstChild as HTMLElement).className).toMatch(/users/);
  });

  it('hides the users when the button is clicked', () => {
    render(<Users users={USERS} />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    NAMES.forEach((name) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });
  });

  it('changes the button label to "Show Users" after hiding', () => {
    render(<Users users={USERS} />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));

    expect(screen.getByRole('button', { name: 'Show Users' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Hide Users' })).not.toBeInTheDocument();
  });

  it('shows the users again when the button is clicked a second time', () => {
    render(<Users users={USERS} />);

    fireEvent.click(screen.getByRole('button', { name: 'Hide Users' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Users' }));

    expect(screen.getByRole('button', { name: 'Hide Users' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(NAMES.length);
  });

  it('keeps toggling correctly over several clicks', () => {
    render(<Users users={USERS} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Show Users');
  });

  it('always renders exactly one button', () => {
    render(<Users users={USERS} />);

    expect(screen.getAllByRole('button')).toHaveLength(1);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});

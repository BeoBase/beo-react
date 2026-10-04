import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CounterHistory from './CounterHistory.tsx';

// Builds history entries from plain numbers, using the position as a unique id.
const toHistory = (values: number[]) => values.map((value, id) => ({ value, id }));

describe('CounterHistory', () => {
  it('renders an ordered list with one item per history entry', () => {
    render(<CounterHistory history={toHistory([3, 2, 1])} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['3', '2', '1']);
  });

  it('renders an empty list when there is no history', () => {
    render(<CounterHistory history={[]} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('renders repeated values as separate items', () => {
    render(<CounterHistory history={toHistory([1, 1, 1])} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('shows the value of each change, including negative values', () => {
    render(<CounterHistory history={[{ value: -1, id: 10 }, { value: 5, id: 20 }]} />);

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['-1', '5']);
  });

  it('does not highlight items by default', () => {
    render(<CounterHistory history={toHistory([1, 2])} />);

    screen.getAllByRole('listitem').forEach((item) => {
      expect(item).not.toHaveClass('bg-[#335453]');
    });
  });

  it('toggles an item selected on click and off on a second click', () => {
    render(<CounterHistory history={toHistory([1, 2])} />);
    const [first, second] = screen.getAllByRole('listitem');

    fireEvent.click(second);
    expect(second).toHaveClass('bg-[#335453]');
    expect(first).not.toHaveClass('bg-[#335453]');

    fireEvent.click(second);
    expect(second).not.toHaveClass('bg-[#335453]');
  });

  it('selects items independently', () => {
    render(<CounterHistory history={toHistory([1, 2])} />);
    const [first, second] = screen.getAllByRole('listitem');

    fireEvent.click(first);
    fireEvent.click(second);

    expect(first).toHaveClass('bg-[#335453]');
    expect(second).toHaveClass('bg-[#335453]');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Counter from './Counter.tsx';

// The big number is a <span>; the initial count in the info line is a <strong>.
const output = (value: string) => screen.getByText(value, { selector: 'span' });
const infoLine = () => screen.getByText(/The initial counter value was/);

describe('Counter', () => {
  it('shows the initial count in the info line and as the output', () => {
    render(<Counter initialCount={5} />);

    expect(infoLine()).toHaveTextContent('The initial counter value was 5.');
    expect(output('5')).toBeInTheDocument();
  });

  it('renders the Decrement and Increment buttons', () => {
    render(<Counter initialCount={0} />);

    expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
  });

  describe('prime number message', () => {
    it.each([2, 3, 7, 13])('says %i is a prime number', (n) => {
      render(<Counter initialCount={n} />);

      expect(infoLine()).toHaveTextContent('It is a prime number.');
    });

    it.each([-5, 0, 1, 4, 9, 15])('says %i is not a prime number', (n) => {
      render(<Counter initialCount={n} />);

      expect(infoLine()).toHaveTextContent('It is not a prime number.');
    });
  });

  describe('buttons', () => {
    it('increments the output', () => {
      render(<Counter initialCount={0} />);

      fireEvent.click(screen.getByRole('button', { name: 'Increment' }));

      expect(output('1')).toBeInTheDocument();
    });

    it('decrements the output', () => {
      render(<Counter initialCount={5} />);

      fireEvent.click(screen.getByRole('button', { name: 'Decrement' }));

      expect(output('4')).toBeInTheDocument();
    });

    it('handles several clicks in a row', () => {
      render(<Counter initialCount={0} />);

      const increment = screen.getByRole('button', { name: 'Increment' });
      fireEvent.click(increment);
      fireEvent.click(increment);
      fireEvent.click(increment);
      fireEvent.click(screen.getByRole('button', { name: 'Decrement' }));

      expect(output('2')).toBeInTheDocument();
    });

    it('can go below zero and shows the negative style', () => {
      render(<Counter initialCount={0} />);

      fireEvent.click(screen.getByRole('button', { name: 'Decrement' }));

      expect(output('-1')).toHaveClass('text-[#f3a6a6]');
    });

    it('does not change the initial count shown in the info line', () => {
      render(<Counter initialCount={5} />);

      fireEvent.click(screen.getByRole('button', { name: 'Increment' }));

      expect(infoLine()).toHaveTextContent('The initial counter value was 5.');
    });
  });
});

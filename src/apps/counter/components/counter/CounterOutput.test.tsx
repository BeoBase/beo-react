import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CounterOutput from './CounterOutput.tsx';

describe('CounterOutput', () => {
  it('renders the value', () => {
    render(<CounterOutput value={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('uses the normal color for positive values', () => {
    render(<CounterOutput value={5} />);

    expect(screen.getByText('5')).toHaveClass('text-[#b5dad7]');
  });

  it('uses the normal color for zero', () => {
    render(<CounterOutput value={0} />);

    expect(screen.getByText('0')).toHaveClass('text-[#b5dad7]');
  });

  it('uses the negative color for negative values', () => {
    render(<CounterOutput value={-1} />);

    const output = screen.getByText('-1');
    expect(output).toHaveClass('text-[#f3a6a6]');
    expect(output).not.toHaveClass('text-[#b5dad7]');
  });
});

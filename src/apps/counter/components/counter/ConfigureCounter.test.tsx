import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ConfigureCounter from './ConfigureCounter.tsx';

const renderConfigure = (onSet = vi.fn()) => {
  render(<ConfigureCounter onSet={onSet} />);
  return {
    onSet,
    input: screen.getByRole('spinbutton') as HTMLInputElement,
    button: screen.getByRole('button', { name: 'Set' }),
  };
};

describe('ConfigureCounter', () => {
  it('renders the heading, a number input starting at 0, and the Set button', () => {
    const { input, button } = renderConfigure();

    expect(screen.getByRole('heading', { name: 'Set Counter' })).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveValue(0);
    expect(button).toBeInTheDocument();
  });

  it('updates the input as the user types', () => {
    const { input } = renderConfigure();

    fireEvent.change(input, { target: { value: '7' } });

    expect(input).toHaveValue(7);
  });

  it('does not call onSet while typing', () => {
    const { input, onSet } = renderConfigure();

    fireEvent.change(input, { target: { value: '12' } });

    expect(onSet).not.toHaveBeenCalled();
  });

  it('calls onSet once with the entered number when Set is clicked', () => {
    const { input, button, onSet } = renderConfigure();

    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(button);

    expect(onSet).toHaveBeenCalledTimes(1);
    expect(onSet).toHaveBeenCalledWith(42);
  });

  it('passes a number, not a string', () => {
    const { input, button, onSet } = renderConfigure();

    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(button);

    expect(typeof onSet.mock.calls[0][0]).toBe('number');
  });

  it('resets the input to 0 after Set is clicked', () => {
    const { input, button } = renderConfigure();

    fireEvent.change(input, { target: { value: '9' } });
    fireEvent.click(button);

    expect(input).toHaveValue(0);
  });

  it('calls onSet with 0 when Set is clicked without typing', () => {
    const { button, onSet } = renderConfigure();

    fireEvent.click(button);

    expect(onSet).toHaveBeenCalledWith(0);
  });

  it('supports negative numbers', () => {
    const { input, button, onSet } = renderConfigure();

    fireEvent.change(input, { target: { value: '-3' } });
    fireEvent.click(button);

    expect(onSet).toHaveBeenCalledWith(-3);
  });

  it('uses the latest value when Set is clicked more than once', () => {
    const { input, button, onSet } = renderConfigure();

    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.click(button);

    expect(onSet).toHaveBeenNthCalledWith(1, 1);
    expect(onSet).toHaveBeenNthCalledWith(2, 2);
  });
});

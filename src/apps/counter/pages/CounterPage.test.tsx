import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CounterPage from './CounterPage.tsx';

// The page renders two counters: the first follows the "Set Counter" form,
// the second is a fixed counter that always starts at 0.
const infoLines = () => screen.getAllByText(/The initial counter value was/);
const configuredInfo = () => infoLines()[0];
const fixedInfo = () => infoLines()[1];

describe('CounterPage', () => {
  it('sets the document title', () => {
    render(<CounterPage />);

    expect(document.title).toBe('Beo Base | Counter');
  });

  it('renders the header, the configure form and two counters', () => {
    render(<CounterPage />);

    expect(screen.getByRole('heading', { name: 'React - Behind The Scenes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Set Counter' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Increment' })).toHaveLength(2);
    expect(infoLines()).toHaveLength(2);
  });

  it('starts both counters with an initial count of 0', () => {
    render(<CounterPage />);

    expect(configuredInfo()).toHaveTextContent('The initial counter value was 0.');
    expect(fixedInfo()).toHaveTextContent('The initial counter value was 0.');
  });

  it('updates the first counter\'s initial count when a number is set', () => {
    render(<CounterPage />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(configuredInfo()).toHaveTextContent('The initial counter value was 7.');
    expect(configuredInfo()).toHaveTextContent('It is a prime number.');
  });

  it('leaves the second counter at 0 when a number is set', () => {
    render(<CounterPage />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(fixedInfo()).toHaveTextContent('The initial counter value was 0.');
  });

  it('does not change the initial count while typing', () => {
    render(<CounterPage />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '9' } });

    expect(configuredInfo()).toHaveTextContent('The initial counter value was 0.');
  });

  it('clears the input after setting', () => {
    render(<CounterPage />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(input).toHaveValue(0);
  });
});

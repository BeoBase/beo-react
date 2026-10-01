import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CounterPage from './CounterPage.tsx';

const infoLine = () => screen.getByText(/The initial counter value was/);

describe('CounterPage', () => {
  it('sets the document title', () => {
    render(<CounterPage />);

    expect(document.title).toBe('Beo Base | Counter');
  });

  it('renders the header, the configure form and the counter', () => {
    render(<CounterPage />);

    expect(screen.getByRole('heading', { name: 'React - Behind The Scenes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Set Counter' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
  });

  it('starts with an initial count of 0', () => {
    render(<CounterPage />);

    expect(infoLine()).toHaveTextContent('The initial counter value was 0.');
  });

  it('updates the counter\'s initial count when a number is set', () => {
    render(<CounterPage />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(infoLine()).toHaveTextContent('The initial counter value was 7.');
    expect(infoLine()).toHaveTextContent('It is a prime number.');
  });

  it('does not change the initial count while typing', () => {
    render(<CounterPage />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '9' } });

    expect(infoLine()).toHaveTextContent('The initial counter value was 0.');
  });

  it('clears the input after setting', () => {
    render(<CounterPage />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(input).toHaveValue(0);
  });
});

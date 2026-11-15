import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Login from './Login.tsx';

const EMAIL_ERROR = 'Please enter a valid email address.';

const email = () => screen.getByLabelText('Email');
const password = () => screen.getByLabelText('Password');
const type = (input: HTMLElement, value: string) =>
  fireEvent.change(input, { target: { value } });

describe('Login', () => {
  let consoleLog: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  const submit = (container: HTMLElement) =>
    fireEvent.submit(container.querySelector('form')!);

  it('renders the heading, both fields and both buttons', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(email()).toHaveAttribute('type', 'email');
    expect(password()).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows no error before the form is submitted', () => {
    render(<Login />);

    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
  });

  it('prevents the default form submission', () => {
    const { container } = render(<Login />);

    expect(submit(container)).toBe(false);
  });

  it('shows an error when the email has no @', () => {
    const { container } = render(<Login />);

    type(email(), 'no-at-sign');
    submit(container);

    expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();
  });

  it('shows an error when the email is empty', () => {
    const { container } = render(<Login />);

    submit(container);

    expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();
  });

  it('does not send the mock request when the email is invalid', () => {
    const { container } = render(<Login />);

    type(email(), 'no-at-sign');
    submit(container);

    expect(consoleLog).not.toHaveBeenCalledWith('Mocking sending HTTPS request...');
  });

  it('sends the mock request when the email is valid', () => {
    const { container } = render(<Login />);

    type(email(), 'a@b.com');
    type(password(), 'secret1');
    submit(container);

    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    expect(consoleLog).toHaveBeenCalledWith('Mocking sending HTTPS request...');
  });

  it('logs the entered email and password', () => {
    const { container } = render(<Login />);

    type(email(), 'a@b.com');
    type(password(), 'secret1');
    submit(container);

    expect(consoleLog).toHaveBeenCalledWith('Entered email: ', 'a@b.com');
    expect(consoleLog).toHaveBeenCalledWith('Entered password: ', 'secret1');
  });

  it('clears the error once a valid email is submitted', () => {
    const { container } = render(<Login />);

    type(email(), 'no-at-sign');
    submit(container);
    expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();

    type(email(), 'a@b.com');
    submit(container);

    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
  });
});

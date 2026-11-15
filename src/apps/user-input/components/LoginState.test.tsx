import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import LoginState from './LoginState.tsx';

const EMAIL_ERROR = 'Please enter a valid email.';
const PASSWORD_ERROR = 'Please enter a valid password.';

const email = () => screen.getByLabelText('Email');
const password = () => screen.getByLabelText('Password');
const type = (input: HTMLElement, value: string) =>
  fireEvent.change(input, { target: { value } });

describe('LoginState', () => {
  let consoleLog: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  it('renders the heading, both fields and both buttons', () => {
    render(<LoginState />);

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(email()).toHaveAttribute('type', 'email');
    expect(password()).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('starts with empty fields and no errors', () => {
    render(<LoginState />);

    expect(email()).toHaveValue('');
    expect(password()).toHaveValue('');
    expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    expect(screen.queryByText(PASSWORD_ERROR)).not.toBeInTheDocument();
  });

  it('updates the fields as the user types', () => {
    render(<LoginState />);

    type(email(), 'a@b.com');
    type(password(), 'secret1');

    expect(email()).toHaveValue('a@b.com');
    expect(password()).toHaveValue('secret1');
  });

  describe('email validation', () => {
    it('does not show an error while the user is still typing', () => {
      render(<LoginState />);

      type(email(), 'no-at-sign');

      expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    });

    it('shows an error after leaving the field with an email without an @', () => {
      render(<LoginState />);

      type(email(), 'no-at-sign');
      fireEvent.blur(email());

      expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();
    });

    it('shows an error after leaving the field empty', () => {
      render(<LoginState />);

      fireEvent.blur(email());

      expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();
    });

    it('shows no error after leaving the field with an email that has an @', () => {
      render(<LoginState />);

      type(email(), 'a@b.com');
      fireEvent.blur(email());

      expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    });

    it('hides the error again when the user starts typing', () => {
      render(<LoginState />);

      fireEvent.blur(email());
      expect(screen.getByText(EMAIL_ERROR)).toBeInTheDocument();

      type(email(), 'a');

      expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    });

    it('does not show the password error when only the email was edited', () => {
      render(<LoginState />);

      fireEvent.blur(email());

      expect(screen.queryByText(PASSWORD_ERROR)).not.toBeInTheDocument();
    });
  });

  describe('password validation', () => {
    it('shows an error after leaving the field with fewer than 6 characters', () => {
      render(<LoginState />);

      type(password(), '12345');
      fireEvent.blur(password());

      expect(screen.getByText(PASSWORD_ERROR)).toBeInTheDocument();
    });

    it('shows no error after leaving the field with 6 characters', () => {
      render(<LoginState />);

      type(password(), '123456');
      fireEvent.blur(password());

      expect(screen.queryByText(PASSWORD_ERROR)).not.toBeInTheDocument();
    });

    it('does not count surrounding whitespace towards the length', () => {
      render(<LoginState />);

      type(password(), '  abc  ');
      fireEvent.blur(password());

      expect(screen.getByText(PASSWORD_ERROR)).toBeInTheDocument();
    });

    it('does not show an error while the user is still typing', () => {
      render(<LoginState />);

      type(password(), '123');

      expect(screen.queryByText(PASSWORD_ERROR)).not.toBeInTheDocument();
    });

    it('hides the error again when the user starts typing', () => {
      render(<LoginState />);

      fireEvent.blur(password());
      expect(screen.getByText(PASSWORD_ERROR)).toBeInTheDocument();

      type(password(), '1');

      expect(screen.queryByText(PASSWORD_ERROR)).not.toBeInTheDocument();
    });

    it('does not show the email error when only the password was edited', () => {
      render(<LoginState />);

      fireEvent.blur(password());

      expect(screen.queryByText(EMAIL_ERROR)).not.toBeInTheDocument();
    });
  });

  describe('submitting', () => {
    it('logs the entered email and password', () => {
      const { container } = render(<LoginState />);

      type(email(), 'a@b.com');
      type(password(), 'secret1');
      fireEvent.submit(container.querySelector('form')!);

      expect(consoleLog).toHaveBeenCalledWith('Entered email: ', 'a@b.com');
      expect(consoleLog).toHaveBeenCalledWith('Entered password: ', 'secret1');
    });

    it('prevents the default form submission', () => {
      const { container } = render(<LoginState />);

      const notPrevented = fireEvent.submit(container.querySelector('form')!);

      expect(notPrevented).toBe(false);
    });
  });
});

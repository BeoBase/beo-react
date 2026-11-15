import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import SignUp from './SignUp.tsx';

const MISMATCH_ERROR = 'Passwords must match.';

const type = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe('SignUp', () => {
  let consoleLog: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  const submit = (container: HTMLElement) =>
    fireEvent.submit(container.querySelector('form')!);

  it('renders the welcome heading and message', () => {
    render(<SignUp />);

    expect(screen.getByRole('heading', { name: 'Welcome on board!' })).toBeInTheDocument();
    expect(screen.getByText(/we just need a little bit of data/i)).toBeInTheDocument();
  });

  it('renders every field', () => {
    render(<SignUp />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Confirm Password')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('What best describes your role?')).toBeInTheDocument();
    expect(screen.getByLabelText('I agree to the terms and conditions')).toBeInTheDocument();
  });

  it('offers all roles in the role select', () => {
    render(<SignUp />);

    const options = screen
      .getAllByRole('option')
      .map((option) => (option as HTMLOptionElement).value);

    expect(options).toEqual(['student', 'teacher', 'employee', 'founder', 'other']);
  });

  it('offers all the "how did you find us" checkboxes', () => {
    render(<SignUp />);

    expect(screen.getByLabelText('Google')).toHaveAttribute('type', 'checkbox');
    expect(screen.getByLabelText('Referred by friend')).toHaveAttribute('type', 'checkbox');
    expect(screen.getByLabelText('Other')).toHaveAttribute('type', 'checkbox');
  });

  it('marks the required fields as required', () => {
    render(<SignUp />);

    for (const label of [
      'Email',
      'Password',
      'Confirm Password',
      'First Name',
      'Last Name',
      'What best describes your role?',
      'I agree to the terms and conditions',
    ]) {
      expect(screen.getByLabelText(label)).toBeRequired();
    }
  });

  it('requires a password of at least 6 characters', () => {
    render(<SignUp />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('minlength', '6');
  });

  it('has a reset button and a sign up button', () => {
    render(<SignUp />);

    expect(screen.getByRole('button', { name: 'Reset' })).toHaveAttribute('type', 'reset');
    expect(screen.getByRole('button', { name: 'Sign up' })).toHaveAttribute('type', 'submit');
  });

  it('shows no password error before submitting', () => {
    render(<SignUp />);

    expect(screen.queryByText(MISMATCH_ERROR)).not.toBeInTheDocument();
  });

  it('prevents the default form submission', () => {
    const { container } = render(<SignUp />);

    expect(submit(container)).toBe(false);
  });

  describe('password confirmation', () => {
    it('shows an error and does not log the data when the passwords differ', () => {
      const { container } = render(<SignUp />);

      type('Password', 'secret1');
      type('Confirm Password', 'secret2');
      submit(container);

      expect(screen.getByText(MISMATCH_ERROR)).toBeInTheDocument();
      expect(consoleLog).not.toHaveBeenCalled();
    });

    it('shows no error and logs the data when the passwords match', () => {
      const { container } = render(<SignUp />);

      type('Password', 'secret1');
      type('Confirm Password', 'secret1');
      submit(container);

      expect(screen.queryByText(MISMATCH_ERROR)).not.toBeInTheDocument();
      expect(consoleLog).toHaveBeenCalledTimes(1);
    });

    it('clears the error once the passwords match', () => {
      const { container } = render(<SignUp />);

      type('Password', 'secret1');
      type('Confirm Password', 'secret2');
      submit(container);
      expect(screen.getByText(MISMATCH_ERROR)).toBeInTheDocument();

      type('Confirm Password', 'secret1');
      submit(container);

      expect(screen.queryByText(MISMATCH_ERROR)).not.toBeInTheDocument();
    });

    it('treats the passwords as case sensitive', () => {
      const { container } = render(<SignUp />);

      type('Password', 'Secret1');
      type('Confirm Password', 'secret1');
      submit(container);

      expect(screen.getByText(MISMATCH_ERROR)).toBeInTheDocument();
    });
  });

  describe('submitted data', () => {
    it('logs all the entered values', () => {
      const { container } = render(<SignUp />);

      type('Email', 'a@b.com');
      type('Password', 'secret1');
      type('Confirm Password', 'secret1');
      type('First Name', 'Ada');
      type('Last Name', 'Lovelace');
      type('What best describes your role?', 'founder');
      fireEvent.click(screen.getByLabelText('I agree to the terms and conditions'));
      submit(container);

      expect(consoleLog).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'a@b.com',
          password: 'secret1',
          'confirm-password': 'secret1',
          'first-name': 'Ada',
          'last-name': 'Lovelace',
          role: 'founder',
          terms: 'on',
        }),
      );
    });

    it('logs every ticked "how did you find us" option as an array', () => {
      const { container } = render(<SignUp />);

      fireEvent.click(screen.getByLabelText('Google'));
      fireEvent.click(screen.getByLabelText('Referred by friend'));
      submit(container);

      expect(consoleLog).toHaveBeenCalledWith(
        expect.objectContaining({ acquisition: ['google', 'friend'] }),
      );
    });

    it('logs an empty array when no "how did you find us" option is ticked', () => {
      const { container } = render(<SignUp />);

      submit(container);

      expect(consoleLog).toHaveBeenCalledWith(
        expect.objectContaining({ acquisition: [] }),
      );
    });
  });
});

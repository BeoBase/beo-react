import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserInputPage from './UserInputPage.tsx';

describe('UserInputPage', () => {
  it('sets the document title', () => {
    render(<UserInputPage />);

    expect(document.title).toBe('Beo Base | User Input');
  });

  it('renders the header', () => {
    render(<UserInputPage />);

    expect(screen.getByRole('heading', { name: 'React Forms' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A form and a pencil' })).toBeInTheDocument();
  });

  it('renders the login form in the main area', () => {
    render(<UserInputPage />);

    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { name: 'Login' }),
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows the email validation error from the login form', () => {
    render(<UserInputPage />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'no-at-sign' } });
    fireEvent.blur(screen.getByLabelText('Email'));

    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
  });
});

import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Input from './Input.tsx';

describe('Input', () => {
  it('renders an input that is labelled by the label text', () => {
    render(<Input label="Email" id="email" />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });

  it('passes native props such as type, name and placeholder to the input', () => {
    render(
      <Input label="Email" id="email" type="email" name="email" placeholder="you@example.com" />,
    );

    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
  });

  it('shows the error message when an error is given', () => {
    render(<Input label="Email" id="email" error="Please enter a valid email." />);

    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
  });

  it('shows no error message when there is no error', () => {
    render(<Input label="Email" id="email" />);

    expect(screen.queryByText(/please/i)).not.toBeInTheDocument();
  });

  it('shows no error message when the error is an empty string', () => {
    const { container } = render(<Input label="Email" id="email" error="" />);

    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('calls onChange with the typed value', () => {
    const onChange = vi.fn();
    render(<Input label="Email" id="email" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when the input loses focus', () => {
    const onBlur = vi.fn();
    render(<Input label="Email" id="email" onBlur={onBlur} />);

    fireEvent.blur(screen.getByLabelText('Email'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('shows the value it is given', () => {
    render(<Input label="Email" id="email" value="a@b.com" readOnly />);

    expect(screen.getByLabelText('Email')).toHaveValue('a@b.com');
  });

  it('forwards a ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Email" id="email" ref={ref} />);

    expect(ref.current).toBe(screen.getByLabelText('Email'));
  });
});

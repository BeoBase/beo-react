import { fireEvent, render, screen } from '@testing-library/react';
import type { SVGProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import IconButton from './IconButton.tsx';

function TestIcon(props: SVGProps<SVGSVGElement>) {
  return <svg data-testid="test-icon" {...props} />;
}

describe('IconButton', () => {
  it('renders its children as the button label', () => {
    render(<IconButton icon={TestIcon}>Save</IconButton>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders the given icon inside the button', () => {
    render(<IconButton icon={TestIcon}>Save</IconButton>);

    expect(screen.getByRole('button')).toContainElement(screen.getByTestId('test-icon'));
  });

  it('gives the icon its size class', () => {
    render(<IconButton icon={TestIcon}>Save</IconButton>);

    expect(screen.getByTestId('test-icon')).toHaveClass('h-[0.9rem]', 'w-[0.9rem]');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<IconButton icon={TestIcon} onClick={onClick}>Save</IconButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes other button props through', () => {
    render(<IconButton icon={TestIcon} disabled>Save</IconButton>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<IconButton icon={TestIcon} disabled onClick={onClick}>Save</IconButton>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});

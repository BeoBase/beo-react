import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import DeleteConfirmation from './DeleteConfirmation';

describe('DeleteConfirmation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the question and the progress bar', () => {
    render(<DeleteConfirmation onConfirm={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls onCancel when "No" is clicked', () => {
    const onCancel = vi.fn();
    render(<DeleteConfirmation onConfirm={vi.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when "Yes" is clicked', () => {
    const onConfirm = vi.fn();
    render(<DeleteConfirmation onConfirm={onConfirm} onCancel={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('confirms automatically after 3 seconds', () => {
    const onConfirm = vi.fn();
    render(<DeleteConfirmation onConfirm={onConfirm} onCancel={vi.fn()} />);

    vi.advanceTimersByTime(2999);
    expect(onConfirm).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('does not confirm automatically once unmounted', () => {
    const onConfirm = vi.fn();
    const { unmount } = render(
      <DeleteConfirmation onConfirm={onConfirm} onCancel={vi.fn()} />
    );

    unmount();
    vi.advanceTimersByTime(3000);

    expect(onConfirm).not.toHaveBeenCalled();
  });
});

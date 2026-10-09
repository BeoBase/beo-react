import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the full timer value', () => {
    render(<ProgressBar timer={1000} />);

    const progress = screen.getByRole('progressbar');

    expect(progress).toHaveAttribute('max', '1000');
    expect(progress).toHaveAttribute('value', '1000');
  });

  it('decreases the remaining time every 10ms', () => {
    render(<ProgressBar timer={1000} />);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '700');
  });

  it('never goes below zero', () => {
    render(<ProgressBar timer={100} />);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '0');
  });

  it('stops the interval when unmounted', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<ProgressBar timer={1000} />);

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});

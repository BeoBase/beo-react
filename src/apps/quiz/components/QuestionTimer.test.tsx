import {act} from "react";
import { render, screen } from '@testing-library/react';
import {describe, vi} from 'vitest';

import QuestionTimer from './QuestionTimer';

describe('QuestionTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the full timeout value', () => {
    render(<QuestionTimer timeout={1000} onTimeout={vi.fn()} />);

    const progress = screen.getByRole('progressbar');

    expect(progress).toHaveAttribute('max', '1000');
    expect(progress).toHaveAttribute('value', '1000');
  });

  it('decreases the remaining time every 100ms', () => {
    render(<QuestionTimer timeout={1000} onTimeout={vi.fn()} />);

    const progress = screen.getByRole('progressbar');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(progress).toHaveAttribute('value', '700');
  });

  it('calls onTimeout after the timeout expires', () => {
    const onTimeout = vi.fn();

    render(<QuestionTimer timeout={1000} onTimeout={onTimeout} />);

    expect(onTimeout).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it('cleans up timers when unmounted', () => {
    const onTimeout = vi.fn();

    const { unmount } = render(
      <QuestionTimer timeout={1000} onTimeout={onTimeout} />
    );

    unmount();

    vi.advanceTimersByTime(1000);

    expect(onTimeout).not.toHaveBeenCalled();
  });
})
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Quiz from './Quiz';
import QUESTIONS from '../data/questions.js';

describe('Quiz', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first question', () => {
    render(<Quiz />);

    expect(
      screen.getByRole('heading', { name: QUESTIONS[0].text })
    ).toBeInTheDocument();
  });

  it('renders all answers for the current question', () => {
    render(<Quiz />);

    QUESTIONS[0].answers.forEach((answer) => {
      expect(screen.getByRole('button', { name: answer })).toBeInTheDocument();
    });
  });

  it('moves to the next question after the feedback delay', () => {
    render(<Quiz />);

    fireEvent.click(
      screen.getByRole('button', { name: QUESTIONS[0].answers[0] })
    );

    // still on question 0 while feedback is shown
    expect(
      screen.getByRole('heading', { name: QUESTIONS[0].text })
    ).toBeInTheDocument();

    // 1s (answered -> correct/wrong) + 2s (feedback) = 3s
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(
      screen.getByRole('heading', { name: QUESTIONS[1].text })
    ).toBeInTheDocument();
  });

  it('renders the answers for the next question after the feedback delay', () => {
    render(<Quiz />);

    fireEvent.click(
      screen.getByRole('button', { name: QUESTIONS[0].answers[0] })
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    QUESTIONS[1].answers.forEach((answer) => {
      expect(screen.getByRole('button', { name: answer })).toBeInTheDocument();
    });
  });
});
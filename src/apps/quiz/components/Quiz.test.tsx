import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Quiz from './Quiz';
import QUESTIONS from '../data/questions.js';

describe('Quiz', () => {
  it('renders the first question', () => {
    render(<Quiz />);

    expect(
      screen.getByRole('heading', {
        name: QUESTIONS[0].text,
      })
    ).toBeInTheDocument();
  });

  it('renders all answers for the current question', () => {
    render(<Quiz />);

    QUESTIONS[0].answers.forEach((answer) => {
      expect(
        screen.getByRole('button', { name: answer })
      ).toBeInTheDocument();
    });
  });

  it('moves to the next question when an answer is selected', async () => {
    const user = userEvent.setup();

    render(<Quiz />);

    const firstAnswer = QUESTIONS[0].answers[0];

    await user.click(
      screen.getByRole('button', { name: firstAnswer })
    );

    expect(
      screen.getByRole('heading', {
        name: QUESTIONS[1].text,
      })
    ).toBeInTheDocument();
  });

  it('renders the answers for the next question after selection', async () => {
    const user = userEvent.setup();

    render(<Quiz />);

    await user.click(
      screen.getByRole('button', {
        name: QUESTIONS[0].answers[0],
      })
    );

    QUESTIONS[1].answers.forEach((answer) => {
      expect(
        screen.getByRole('button', { name: answer })
      ).toBeInTheDocument();
    });
  });
})
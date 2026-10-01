import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Summary from './Summary';
import QUESTIONS from '../data/questions.js';

const SKIPPED = '';
const correctAnswer = (index: number) => QUESTIONS[index].answers[0];
const wrongAnswer = (index: number) => QUESTIONS[index].answers[1];

// Builds answers from a per-question outcome, so tests don't depend on
// hard-coded answer text.
type Outcome = 'skipped' | 'correct' | 'wrong';
const buildAnswers = (outcomes: Outcome[]) =>
  outcomes.map((outcome, index) =>
    outcome === 'skipped' ? SKIPPED : outcome === 'correct' ? correctAnswer(index) : wrongAnswer(index)
  );

// One of each outcome first, then the rest wrong.
const mixedOutcomes: Outcome[] = QUESTIONS.map((_, index) =>
  index === 0 ? 'skipped' : index === 1 ? 'correct' : 'wrong'
);
const mixedAnswers = buildAnswers(mixedOutcomes);

const renderSummary = (userAnswers = mixedAnswers, onRestart = vi.fn()) => {
  render(<Summary userAnswers={userAnswers} onRestart={onRestart} />);
  return onRestart;
};

// The stat <p> holds the percentage and its label; find it by the label.
const statOf = (label: string) => screen.getByText(label).parentElement as HTMLElement;

describe('Summary', () => {
  describe('header', () => {
    it('renders the completion heading and message', () => {
      renderSummary();

      expect(screen.getByRole('heading', { name: 'Quiz Completed!' })).toBeInTheDocument();
      expect(screen.getByText('Great job! You made it through all the questions.')).toBeInTheDocument();
    });

    it('renders the trophy image', () => {
      renderSummary();

      expect(screen.getByAltText('Trophy icon')).toBeInTheDocument();
    });
  });

  describe('restart button', () => {
    it('calls onRestart once when clicked', () => {
      const onRestart = renderSummary();

      fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));

      expect(onRestart).toHaveBeenCalledTimes(1);
    });
  });

  describe('stats', () => {
    it('shows the share of skipped, correct and wrong answers', () => {
      // 2 skipped, 3 correct, rest wrong
      const outcomes: Outcome[] = QUESTIONS.map((_, index) =>
        index < 2 ? 'skipped' : index < 5 ? 'correct' : 'wrong'
      );
      renderSummary(buildAnswers(outcomes));

      const total = QUESTIONS.length;
      const skipped = Math.round((2 / total) * 100);
      const correct = Math.round((3 / total) * 100);
      const wrong = 100 - skipped - correct;

      expect(statOf('skipped')).toHaveTextContent(`${skipped}%`);
      expect(statOf('answered correctly')).toHaveTextContent(`${correct}%`);
      expect(statOf('answered incorrectly')).toHaveTextContent(`${wrong}%`);
    });

    it('does not count skipped answers as wrong', () => {
      renderSummary(buildAnswers(QUESTIONS.map(() => 'skipped')));

      expect(statOf('skipped')).toHaveTextContent('100%');
      expect(statOf('answered correctly')).toHaveTextContent('0%');
      expect(statOf('answered incorrectly')).toHaveTextContent('0%');
    });

    it('shows 100% correct when every answer is right', () => {
      renderSummary(buildAnswers(QUESTIONS.map(() => 'correct')));

      expect(statOf('skipped')).toHaveTextContent('0%');
      expect(statOf('answered correctly')).toHaveTextContent('100%');
      expect(statOf('answered incorrectly')).toHaveTextContent('0%');
    });

    it('shows 100% wrong when every answer is wrong', () => {
      renderSummary(buildAnswers(QUESTIONS.map(() => 'wrong')));

      expect(statOf('skipped')).toHaveTextContent('0%');
      expect(statOf('answered correctly')).toHaveTextContent('0%');
      expect(statOf('answered incorrectly')).toHaveTextContent('100%');
    });

    it('always adds up to 100%', () => {
      renderSummary();

      const percent = (label: string) =>
        Number(within(statOf(label)).getByText(/%$/).textContent?.replace('%', ''));

      expect(
        percent('skipped') + percent('answered correctly') + percent('answered incorrectly')
      ).toBe(100);
    });
  });

  describe('answer list', () => {
    it('renders a row per answer with its number and question text', () => {
      renderSummary();

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(QUESTIONS.length);

      QUESTIONS.forEach((question, index) => {
        expect(within(items[index]).getByRole('heading', { level: 3 })).toHaveTextContent(String(index + 1));
        expect(items[index]).toHaveTextContent(question.text);
      });
    });

    it('shows "Skipped" in place of an empty answer', () => {
      renderSummary();

      const item = screen.getAllByRole('listitem')[0];
      expect(within(item).getByText('Skipped')).toBeInTheDocument();
    });

    it('styles a skipped answer as muted and not bold', () => {
      renderSummary();

      const skipped = screen.getByText('Skipped');
      expect(skipped).toHaveClass('text-[#d1baf2]', 'font-normal');
      expect(skipped).not.toHaveClass('font-bold');
    });

    it('styles a correct answer in green and bold', () => {
      renderSummary();

      const correct = screen.getByText(correctAnswer(1));
      expect(correct).toHaveClass('text-[#054e37]', 'font-bold');
    });

    it('styles a wrong answer in pink and bold', () => {
      renderSummary();

      const wrong = screen.getByText(wrongAnswer(2));
      expect(wrong).toHaveClass('text-[#730b4b]', 'font-bold');
    });

    it('shows the chosen answer text for answered questions', () => {
      renderSummary();

      expect(screen.getByText(correctAnswer(1))).toBeInTheDocument();
      expect(screen.getByText(wrongAnswer(2))).toBeInTheDocument();
    });

    it('renders repeated skipped answers without merging them', () => {
      renderSummary(buildAnswers(QUESTIONS.map(() => 'skipped')));

      expect(screen.getAllByText('Skipped')).toHaveLength(QUESTIONS.length);
      expect(screen.getAllByRole('listitem')).toHaveLength(QUESTIONS.length);
    });
  });
});

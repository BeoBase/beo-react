import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Answers from './Answers';

const ANSWERS = ['Alpha', 'Bravo', 'Charlie', 'Delta'];

function renderAnswers(props: Partial<React.ComponentProps<typeof Answers>> = {}) {
  const onSelect = vi.fn();

  const utils = render(
    <Answers
      answers={ANSWERS}
      selectedAnswer=""
      answerState=""
      onSelect={onSelect}
      {...props}
    />
  );

  return { onSelect, ...utils };
}

function buttonOrder() {
  return screen.getAllByRole('button').map((button) => button.textContent);
}

describe('Answers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a button for every answer', () => {
    renderAnswers();

    expect(screen.getAllByRole('button')).toHaveLength(ANSWERS.length);
    ANSWERS.forEach((answer) => {
      expect(screen.getByRole('button', { name: answer })).toBeInTheDocument();
    });
  });

  it('does not mutate the original answers array when shuffling', () => {
    const original = [...ANSWERS];
    renderAnswers({ answers: ANSWERS });

    expect(ANSWERS).toEqual(original);
  });

  it('shuffles the answers', () => {
    // Math.random() === 0 => j = 0 on every iteration => [Bravo, Charlie, Delta, Alpha]
    vi.spyOn(Math, 'random').mockReturnValue(0);

    renderAnswers();

    expect(buttonOrder()).toEqual(['Bravo', 'Charlie', 'Delta', 'Alpha']);
  });

  it('keeps the same order when re-rendered with the same answers', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0);

    const { rerender, onSelect } = renderAnswers();
    const firstOrder = buttonOrder();

    // any further shuffle would now return the identity order instead
    random.mockReturnValue(0.99);

    rerender(
      <Answers
        answers={ANSWERS}
        selectedAnswer="Alpha"
        answerState="answered"
        onSelect={onSelect}
      />
    );

    expect(buttonOrder()).toEqual(firstOrder);
  });

  it('calls onSelect with the clicked answer', async () => {
    const user = userEvent.setup();
    const { onSelect } = renderAnswers();

    await user.click(screen.getByRole('button', { name: 'Charlie' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('Charlie');
  });

  it('enables all buttons when no answer has been picked', () => {
    renderAnswers({ answerState: '' });

    screen.getAllByRole('button').forEach((button) => {
      expect(button).toBeEnabled();
    });
  });

  it.each(['answered', 'correct', 'wrong'])(
    'disables all buttons when answerState is "%s"',
    (answerState) => {
      renderAnswers({ selectedAnswer: 'Alpha', answerState });

      screen.getAllByRole('button').forEach((button) => {
        expect(button).toBeDisabled();
      });
    }
  );

  it('does not call onSelect when buttons are disabled', async () => {
    const user = userEvent.setup();
    const { onSelect } = renderAnswers({ selectedAnswer: 'Alpha', answerState: 'answered' });

    await user.click(screen.getByRole('button', { name: 'Bravo' }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  describe('styling', () => {
    it('uses the default style for every button when nothing is selected', () => {
      renderAnswers();

      screen.getAllByRole('button').forEach((button) => {
        expect(button).toHaveClass('bg-gray-100');
      });
    });

    it('highlights the selected answer in amber when answered', () => {
      renderAnswers({ selectedAnswer: 'Bravo', answerState: 'answered' });

      expect(screen.getByRole('button', { name: 'Bravo' })).toHaveClass('bg-amber-400');
    });

    it('highlights the selected answer in green when correct', () => {
      renderAnswers({ selectedAnswer: 'Bravo', answerState: 'correct' });

      const selected = screen.getByRole('button', { name: 'Bravo' });
      expect(selected).toHaveClass('bg-green-500', 'text-white');
    });

    it('highlights the selected answer in red when wrong', () => {
      renderAnswers({ selectedAnswer: 'Bravo', answerState: 'wrong' });

      const selected = screen.getByRole('button', { name: 'Bravo' });
      expect(selected).toHaveClass('bg-red-500', 'text-white');
    });

    it('leaves the non-selected answers with the default style', () => {
      renderAnswers({ selectedAnswer: 'Bravo', answerState: 'correct' });

      ['Alpha', 'Charlie', 'Delta'].forEach((answer) => {
        const button = screen.getByRole('button', { name: answer });
        expect(button).toHaveClass('bg-gray-100');
        expect(button).not.toHaveClass('bg-green-500');
      });
    });
  });
});
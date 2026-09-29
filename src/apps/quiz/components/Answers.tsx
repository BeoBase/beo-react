import {useMemo} from "react";

// Fisher–Yates shuffle
function shuffleAnswers(answers: string[]) {
  const shuffled = [...answers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface AnswersProps {
  answers: string[];
  selectedAnswer?: string;
  answerState: string;
  onSelect: (answer: string) => void;
}

export default function Answers({answers, selectedAnswer, answerState, onSelect}: AnswersProps) {
  // Quiz renders <Answers key={activeQuestionIndex} />, so this component remounts
  // for every new question and the shuffle only runs once per question.
  const shuffledAnswers = useMemo(() => shuffleAnswers(answers), [answers]);

  return (
    <ul className="space-y-3">
      {shuffledAnswers.map((answer) => {
        const isSelected = selectedAnswer === answer;
        const baseClasses = 'w-full rounded-lg px-5 py-3 text-left font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500';
        let stateClasses = 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700';

        if (answerState === 'answered' && isSelected) {
          stateClasses = 'bg-amber-400 text-gray-900';
        } else if (answerState === 'correct' && isSelected) {
          stateClasses = 'bg-green-500 text-white';
        } else if (answerState === 'wrong' && isSelected) {
          stateClasses = 'bg-red-500 text-white';
        }

        return  <li key={answer}>
          <button
            onClick={() => onSelect(answer)}
            className={`${baseClasses} ${stateClasses} disabled:cursor-not-allowed`}
            disabled={answerState !== ''}
          >
            {answer}
          </button>
        </li>
      })}
    </ul>
  );
}
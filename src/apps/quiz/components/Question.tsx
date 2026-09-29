import {useState} from "react";

import QuestionTime from './QuestionTimer.tsx';
import Answers from './Answers.tsx';

import QUESTIONS from '../data/questions.js';

type AnswerState = '' | 'answered' | 'correct' | 'wrong';

interface QuestionProps {
  questionIndex: number
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
}

export default function Question({
                                   questionIndex,
                                   onSelectAnswer,
                                   onSkipAnswer,
                                 }: QuestionProps) {
  const [answer, setAnswer] = useState<{ selectedAnswer: string; isCorrect: boolean | null }>({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleSelectAnswer(selected: string) {
    setAnswer({selectedAnswer: selected, isCorrect: null});
  }

  let answerState: AnswerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  const TIMEOUTS: Record<AnswerState, number> = {
    '': 10000,       // waiting for an answer
    answered: 1000,  // highlight the selected answer
    correct: 2000,   // reveal right / wrong
    wrong: 2000,
  };

  // The timer drives every phase: skip -> reveal result -> move on.
  function handleTimeout() {
    if (answerState === '') {
      onSkipAnswer();
    } else if (answerState === 'answered') {
      setAnswer((prev) => ({
        ...prev,
        isCorrect: QUESTIONS[questionIndex].answers[0] === prev.selectedAnswer,
      }));
    } else {
      onSelectAnswer(answer.selectedAnswer);
    }
  }

  return <div className="mx-auto mt-8 mb-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-lg backdrop-blur-2xl">
    <QuestionTime
      key={answerState}
      timeout={TIMEOUTS[answerState]}
      onTimeout={handleTimeout}
      mode={answerState}
    />
    <h2 className="mb-6 text-2xl font-bold text-gray-800">
      {QUESTIONS[questionIndex].text}
    </h2>
    <Answers
      answers={QUESTIONS[questionIndex].answers}
      selectedAnswer={answer.selectedAnswer}
      answerState={answerState}
      onSelect={handleSelectAnswer}
    />
  </div>
}
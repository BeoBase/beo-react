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

  function handleSelectAnswer(answer: string) {
    setAnswer({selectedAnswer: answer, isCorrect: null})

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000)
    }, 1000)
  }

  let answerState: AnswerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return <div className="mx-auto mt-8 mb-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-lg backdrop-blur-2xl">
    <QuestionTime
      timeout={10000}
      onTimeout={onSkipAnswer}
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
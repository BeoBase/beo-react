import {useCallback, useEffect, useRef, useState} from "react";

import QUESTIONS from '../data/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTime from './QuestionTimer.tsx';

function shuffleAnswers(answers: string[]) {
  const shuffled = [...answers];
  shuffled.sort(() => Math.random() - 0.5);
  return shuffled;
}

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const shuffledForIndexRef = useRef(-1);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  useEffect(() => {
    if (quizIsComplete || shuffledForIndexRef.current === activeQuestionIndex) {
      return;
    }

    shuffledForIndexRef.current = activeQuestionIndex;
    setShuffledAnswers(shuffleAnswers(QUESTIONS[activeQuestionIndex].answers));
  }, [activeQuestionIndex, quizIsComplete]);

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      selectedAnswer,
    ]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer("");
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <div className="mx-auto mt-8 mb-8 flex w-full max-w-2xl flex-col items-center rounded-2xl border border-white/20 bg-black/20 p-10 text-center shadow-lg backdrop-blur-2xl">
      <img src={quizCompleteImg} alt="Trophy icon" className="mb-6 w-32 drop-shadow-lg" />
      <h2 className="mb-3 text-3xl font-bold text-gray-900">
        Quiz Completed!
      </h2>
      <p className="mb-8 text-lg text-gray-100">
        Great job! You made it through all the questions.
      </p>
      <button
        onClick={() => setUserAnswers([])}
        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  }

  return (
    <div className="mx-auto mt-8 mb-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-lg backdrop-blur-2xl">
      <QuestionTime
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {QUESTIONS[activeQuestionIndex].text}
      </h2>
      <ul className="space-y-3">
        {shuffledAnswers.map((answer) => (
          <li key={answer}>
            <button
              onClick={() => handleSelectAnswer(answer)}
              className="w-full rounded-lg bg-gray-100 px-5 py-3 text-left font-medium text-gray-700 transition hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
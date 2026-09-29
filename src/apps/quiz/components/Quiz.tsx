import {useCallback, useState} from "react";

import QUESTIONS from '../data/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.tsx";

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

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

  return <Question
    key={activeQuestionIndex}
    questionIndex={activeQuestionIndex}
    onSelectAnswer={handleSelectAnswer}
    onSkipAnswer={handleSkipAnswer}
  />
}
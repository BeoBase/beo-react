import {useCallback, useState, useMemo} from "react";

import QUESTIONS from '../data/questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTime from './QuestionTimer.tsx';

// Fisher–Yates shuffle
function shuffleAnswers(answers: string[]) {
  const shuffled = [...answers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerState, setAnswerState] = useState('');

  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const shuffledAnswers = useMemo(
    () => (quizIsComplete ? [] : shuffleAnswers(QUESTIONS[activeQuestionIndex].answers)),
    [activeQuestionIndex, quizIsComplete]
  );

  const handleSelectAnswer = useCallback((selectedAnswer: string) => {
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => [
      ...prevUserAnswers,
      selectedAnswer,
    ]);

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000);
  }, [activeQuestionIndex]);

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
        {shuffledAnswers.map((answer) => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer;
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
              onClick={() => handleSelectAnswer(answer)}
              className={`${baseClasses} ${stateClasses} disabled:cursor-not-allowed`}
            >
              {answer}
            </button>
          </li>
        })}
      </ul>
    </div>
  );
}
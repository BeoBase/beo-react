import {useState} from "react";
import QUESTIONS from '../data/questions.js';

export default function Quiz() {

  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer: string) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  return (
    <div className="mx-auto mt-8 mb-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-lg backdrop-blur-2xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {QUESTIONS[activeQuestionIndex].text}
      </h2>
      <ul className="space-y-3">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
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
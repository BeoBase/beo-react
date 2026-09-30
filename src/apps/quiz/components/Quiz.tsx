import {useCallback, useState} from "react";

import QUESTIONS from '../data/questions.js';

import Question from "./Question.tsx";
import Summary from "./Summary.tsx";

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

  const handleRestartQuiz = useCallback(() => {
    setUserAnswers([]);
  }, []);

  if (quizIsComplete) {
    return <Summary onRestart={handleRestartQuiz}/>;
  }

  return <Question
    key={activeQuestionIndex}
    questionIndex={activeQuestionIndex}
    onSelectAnswer={handleSelectAnswer}
    onSkipAnswer={handleSkipAnswer}
  />
}
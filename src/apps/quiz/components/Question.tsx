import QuestionTime from './QuestionTimer.tsx';
import Answers from './Answers.tsx';

interface QuestionProps {
  questionText: string;
  answers: string[];
  selectedAnswer?: string;
  answerState: string;
  onSelectAnswer: (answer: string) => void;
  onSkipAnswer: () => void;
}

export default function Question({
                                   questionText,
                                   answers,
                                   selectedAnswer,
                                   answerState,
                                   onSelectAnswer,
                                   onSkipAnswer,
                                 }: QuestionProps) {
  return <div className="mx-auto mt-8 mb-8 w-full max-w-2xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-lg backdrop-blur-2xl">
    <QuestionTime
      timeout={10000}
      onTimeout={onSkipAnswer}
    />
    <h2 className="mb-6 text-2xl font-bold text-gray-800">
      {questionText}
    </h2>
    <Answers
      answers={answers}
      selectedAnswer={selectedAnswer}
      answerState={answerState}
      onSelect={onSelectAnswer}
    />
  </div>
}
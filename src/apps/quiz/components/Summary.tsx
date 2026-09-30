import QUESTIONS from '../data/questions.js';

import quizCompleteImg from '../assets/quiz-complete.png';

interface SummaryProps {
  userAnswers: string[];
  onRestart: () => void;
}

export default function Summary({
                                  userAnswers,
                                  onRestart }: SummaryProps) {
  return <div className="mx-auto mt-8 mb-8 flex w-full max-w-2xl flex-col items-center rounded-2xl border border-white/20 bg-black/20 p-10 text-center shadow-lg backdrop-blur-2xl">
    <img src={quizCompleteImg} alt="Trophy icon" className="mx-auto mb-4 block size-32 rounded-full border-2 border-[#3a2353] bg-[#c18cfa] object-contain p-4 drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
    <h2 className="mb-3 text-3xl font-bold text-gray-900">
      Quiz Completed!
    </h2>
    <p className="mb-8 text-lg text-gray-100">
      Great job! You made it through all the questions.
    </p>
    <button
      onClick={onRestart}
      className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Try Again
    </button>
    <div className="mx-auto my-8 flex w-3/5 gap-12 border-b-2 border-[#594276] pb-8">
      <p className="flex flex-1 flex-col">
        <span className="font-['Roboto_Condensed'] text-5xl text-stone-400">10%</span>
        <span className="mt-[-0.7rem] ml-[0.2rem] font-['Roboto_Condensed'] text-[0.8rem] uppercase tracking-[0.1rem] text-stone-300">skipped</span>
      </p>
      <p className="flex flex-1 flex-col">
        <span className="font-['Roboto_Condensed'] text-5xl text-stone-400">10%</span>
        <span className="mt-[-0.7rem] ml-[0.2rem] font-['Roboto_Condensed'] text-[0.8rem] uppercase tracking-[0.1rem] text-stone-300">answered correctly</span>
      </p>
      <p className="flex flex-1 flex-col">
        <span className="font-['Roboto_Condensed'] text-5xl text-stone-400">10%</span>
        <span className="mt-[-0.7rem] ml-[0.2rem] font-['Roboto_Condensed'] text-[0.8rem] uppercase tracking-[0.1rem] text-stone-300">answered incorrectly</span>
      </p>
    </div>
    <ol className="mx-auto my-8 list-none p-0 text-center">
      {userAnswers.map((answer, index) => {
        return <li key={answer} className="my-8">
          <h3 className="mx-auto flex size-8 items-center justify-center rounded-full bg-[#2c203d] font-['Roboto_Condensed'] text-base text-[#d8cde8]">{index + 1}</h3>
          <p className="my-1 text-base text-stone-200">{QUESTIONS[index].text}</p>
          <p className="my-1 font-['Roboto_Condensed'] font-bold text-stone-200">{answer ?? 'Skipped'}</p>
        </li>
      })}
    </ol>
  </div>
}
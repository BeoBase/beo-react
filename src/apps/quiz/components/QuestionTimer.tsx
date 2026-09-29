import {useEffect, useState} from "react";

type QuestionTimerProps = {
  timeout: number;
  onTimeout: () => void;
  mode?: '' | 'answered' | 'correct' | 'wrong';
};

const BAR_COLORS = {
  '': 'text-indigo-500 [&::-webkit-progress-value]:bg-indigo-500 [&::-moz-progress-bar]:bg-indigo-500',
  answered: 'text-amber-400 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400',
  correct: 'text-green-500 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500',
  wrong: 'text-red-500 [&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500',
};

export default function QuestionTimer({ timeout, onTimeout, mode = '' }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 100, 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <progress
    max={timeout}
    value={remainingTime}
    className={`mb-6 block h-2 w-full appearance-none overflow-hidden rounded-full bg-white/20 [&::-webkit-progress-bar]:bg-white/20 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full ${BAR_COLORS[mode]}`}
  />;
}

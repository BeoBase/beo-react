import { useState, useEffect } from 'react';

interface ProgressBarProps {
  timer: number;
}

export default function ProgressBar({ timer }: ProgressBarProps) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 10, 0));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}

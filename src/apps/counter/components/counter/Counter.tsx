import {useState, memo, useCallback, useMemo} from 'react';

import IconButton from '../ui/IconButton.tsx';
import MinusIcon from '../ui/icons/MinusIcon.tsx';
import PlusIcon from '../ui/icons/PlusIcon.tsx';
import CounterOutput from './CounterOutput.tsx';
import CounterHistory from "./CounterHistory.tsx";
import { log } from '../../log.ts';

function isPrime(number: number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

interface CounterProps {
  initialCount: number;
}

const Counter = memo(function Counter({ initialCount }: CounterProps) {
  log('<Counter /> rendered', 1);

  // const initialCountIsPrime = isPrime(initialCount);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState<number[]>([initialCount]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange,
    0
  );

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [-1, ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [1, ...prevCounterChanges]);
  }, []);

  return (
    <section className="my-8 rounded-md border border-[#05827e] p-8">
      <p className="block text-center text-[0.8rem] text-[#9dc5c4]">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p className="mx-auto flex items-center justify-center gap-8 text-2xl">
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        {/* <CounterOutput value={counter} /> */}
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;

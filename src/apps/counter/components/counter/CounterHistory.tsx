import { useState } from 'react';

import { log } from '../../log.ts';

interface HistoryItemProps {
  count: number;
}

function HistoryItem({ count }: HistoryItemProps) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li
      onClick={handleClick}
      className={`ml-2 w-8 cursor-pointer p-[0.2rem] first:text-[1.2rem] first:font-bold ${
        selected
          ? 'rounded bg-[#335453] text-[#d9f7f6] first:text-[#d9f7f6]'
          : 'text-[#8eb6b3] first:text-[#87f0e9]'
      }`}
    >
      {count}
    </li>
  );
}

interface CounterHistoryProps {
  history: number[];
}

export default function CounterHistory({ history }: CounterHistoryProps) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol className="mx-auto flex list-none flex-col items-center justify-center gap-[0.2rem] p-0 text-center">
      {history.map((count, index) => (
        <HistoryItem key={index} count={count} />
      ))}
    </ol>
  );
}

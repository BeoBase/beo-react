import {type ChangeEvent, useState} from "react";

import { log } from '../../log.ts';

interface ConfigureCounterProps {
  onSet: (value: number) => void;
}

export default function ConfigureCounter({onSet}: ConfigureCounterProps) {
  log('<ConfigureCounter />', 1)

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    onSet(enteredNumber);
    setEnteredNumber(0);
  }

  return <section id="configure-counter" className="mx-auto flex items-center justify-center gap-2 text-center">
    <h2 className="m-2 text-base font-bold text-[#88dbd6]">Set Counter</h2>
    <input
      type="number"
      onChange={handleChange}
      value={enteredNumber}
      className="m-2 w-16 rounded border border-[#88dbd6] bg-[#0e1a1c] px-1 py-2 text-center text-base text-[#88dbd6] [&::-webkit-outer-spin-button]:appearance-none"
    />
    <button
      onClick={handleSetClick}
      className="cursor-pointer border-none bg-transparent text-[0.83rem] text-[#96d8d6] hover:text-[#16f3eb]"
    >
      Set
    </button>
  </section>
}
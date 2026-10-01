import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { log } from '../log.ts';
import Header from "../components/Header.tsx";
import Counter from "../components/counter/Counter.tsx";

export default function CounterPage() {
  useEffect(() => {
    document.title = "Beo Base | Counter";
  }, []);

  log('<App /> rendered');

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <main className="mx-auto my-8 w-[90%] max-w-[50rem] rounded-2xl bg-linear-to-b from-[#222c31] to-[#111d32] px-6 py-4 font-['Quicksand'] text-[#d9e2f1] shadow-lg">
      <Header />
      <section id="configure-counter" className="mx-auto flex items-center justify-center gap-2 text-center">
        <h2 className="m-2 text-base font-bold text-[#88dbd6]">Set Counter</h2>
        <input
          type="number"
          onChange={handleChange}
          value={enteredNumber}
          className="m-2 w-16 rounded border border-[#88dbd6] bg-[#0e1a1c] px-1 py-2 text-center text-base text-[#88dbd6] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={handleSetClick}
          className="cursor-pointer border-none bg-transparent text-[0.83rem] text-[#96d8d6] hover:text-[#16f3eb]"
        >
          Set
        </button>
      </section>
      <Counter initialCount={chosenCount} />
    </main>
  );
}

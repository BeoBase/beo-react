import { useEffect, useState } from "react";

import { log } from '../log.ts';

import Header from "../components/Header.tsx";
import Counter from "../components/counter/Counter.tsx";
import ConfigureCounter from "../components/counter/ConfigureCounter.tsx";

export default function CounterPage() {
  useEffect(() => {
    document.title = "Beo Base | Counter";
  }, []);
  log('<CounterPage /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount: number) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main className="mx-auto my-8 w-[90%] max-w-200 rounded-2xl bg-linear-to-b from-[#222c31] to-[#111d32] px-6 py-4 font-['Quicksand'] text-[#d9e2f1] shadow-lg">
        <ConfigureCounter onSet={handleSetCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

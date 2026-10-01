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
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

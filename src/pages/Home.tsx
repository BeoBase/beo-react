import Documentation from "../components/footer/Documentation.tsx";
import Connect from "../components/footer/Connect.tsx";
import InfoBox from "../components/infoBox/InfoBox.tsx";

import {boxesHomeData} from "../data/BoxesHome.ts";

export default function Home() {
  return (
    <>
      
      {boxesHomeData.map((box, index) => (
        <InfoBox
          key={index}
          title={box.title}
          buttons={box.buttons}
        />
      ))}
      
      <section className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <Documentation />
        <Connect />
      </section>
    </>
  );
}
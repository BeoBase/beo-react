import { log } from '../log.ts';
import logoImg from '../assets/logo.png';

export default function Header() {
  log('Counter <Header /> rendered', 1);

  return (
    <header id="main-header" className="mx-auto my-8 text-center font-['Lato'] text-[#87a7a4]">
      <img
        src={logoImg}
        alt="Magnifying glass analyzing a document"
        className="mx-auto size-24 object-contain drop-shadow-[0_0_8px_rgba(14,26,28,0.8)]"
      />
      <h1 className="mt-0 text-2xl font-bold tracking-[0.15rem]">React - Behind The Scenes</h1>
    </header>
  );
}

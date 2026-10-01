import { log } from '../../log.ts';

interface CounterOutputProps {
  value: number;
}

export default function CounterOutput({ value }: CounterOutputProps) {
  log('<CounterOutput /> rendered', 2);

  const cssClass = value >= 0
    ? 'text-5xl font-bold text-[#b5dad7]'
    : 'text-5xl font-bold text-[#f3a6a6]';
  return <span className={cssClass}>{value}</span>;
}

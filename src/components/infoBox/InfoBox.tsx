import { Link } from "react-router-dom";

type InfoButton = {
  label: string;
  href?: string;
  to?: string;
};

type InfoBoxProps = {
  title: string;
  buttons: InfoButton[];
};

export default function InfoBox({ title, buttons }: InfoBoxProps) {
  return (
    <section className="mx-auto my-2 w-full max-w-6xl rounded-3xl border border-white/10 bg-slate-900/30 p-4 text-center shadow-xl backdrop-blur-sm">
      <span className="mb-2 block text-2xl font-bold tracking-wide text-white drop-shadow-sm">
        {title}
      </span>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {buttons.map((button, index) => {
          const className =
            "w-44 h-12 flex items-center justify-center rounded-lg bg-blue-700 px-4 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-lg";
          
          return button.to ? (
            <Link key={index} to={button.to} className={className}>
              {button.label}
            </Link>
          ) : (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {button.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
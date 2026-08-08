import { Link } from "react-router-dom";
import Card from "../ui/Card.tsx";

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
    <section className="mx-auto my-2 w-full max-w-6xl text-center shadow-xl">
      <Card>
        <h1 className="mb-2 block text-2xl font-bold tracking-wide text-white drop-shadow-sm">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          {buttons.map((button, index) => {
            const className =
              "w-44 h-12 flex items-center justify-center rounded-lg bg-blue-700 px-4 text-center font-medium text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-lg";
            
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
      </Card>
    </section>
  );
}
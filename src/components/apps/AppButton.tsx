import { Link } from "react-router-dom";
import type { AppData } from "../../data/AppsData.ts";

type AppButtonProps = {
  app: AppData;
  className?: string;
};

export default function AppButton({ app, className = "" }: AppButtonProps) {
  const rowClassName = `flex w-full items-center justify-between gap-4 rounded-lg
    bg-blue-700 px-4 py-3 text-left font-medium text-white shadow-sm
    transition-all hover:bg-blue-500 hover:shadow-lg ${className}`;

  const content = (
    <>
      <span className="truncate">{app.name}</span>
      <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide">
        {app.tag}
      </span>
    </>
  );

  // Internal route -> router Link (no page reload)
  if (app.to) {
    return (
      <Link to={app.to} className={rowClassName}>
        {content}
      </Link>
    );
  }

  // External link -> new tab
  return (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      className={rowClassName}
    >
      {content}
    </a>
  );
}

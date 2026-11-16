import { Link } from "react-router-dom";

import type { AppData } from "./AppData.ts";

type AppButtonProps = {
  app: AppData;
  className?: string;
};

export default function AppButton({ app, className = "" }: AppButtonProps) {
  const buttonClassName = `flex h-12 w-44 items-center justify-center rounded-lg
    bg-blue-700 px-4 text-center font-medium text-white shadow-sm
    transition-all hover:bg-blue-500 hover:shadow-lg ${className}`;

  // Internal route -> router Link (no page reload)
  if (app.routeType === "INTERNAL") {
    return (
      <Link to={app.route} className={buttonClassName}>
        {app.name}
      </Link>
    );
  }

  // External link -> new tab
  return (
    <a
      href={app.route}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClassName}
    >
      {app.name}
    </a>
  );
}

import * as React from "react";

import classes from "./Card.module.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  // "fill": fill the container it is placed in (default)
  // "page": centered, standard page width and spacing
  layout?: "fill" | "page";
};

export default function Card({
                               children,
                               className = "",
                               layout = "fill",
                             }: CardProps) {
  const cardClassName = [
    classes.card,
    layout === "page" ? classes.page : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <section className={cardClassName}>{children}</section>;
}

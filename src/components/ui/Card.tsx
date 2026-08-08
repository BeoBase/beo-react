import * as React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-white/20 bg-black/30 p-6 shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </section>
  );
}
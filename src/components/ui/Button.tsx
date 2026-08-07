import { type ButtonHTMLAttributes } from "react";
import * as React from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
                                 children,
                                 variant = "primary",
                                 className = "",
                                 ...props
                               }: ButtonProps) {
  
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
  };
  
  return (
    <button
      className={`
        px-4 py-2 rounded-md transition-colors
        disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
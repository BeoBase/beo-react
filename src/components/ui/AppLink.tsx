import { Link, type LinkProps } from 'react-router-dom';
import * as React from "react";

interface AppLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLink({
                                  children,
                                  className = "",
                                  ...props
                                }: AppLinkProps) {
  return (
    <Link
      className={`rounded-md px-3 py-1 font-medium text-white
        hover:bg-white/20 hover:text-white drop-shadow-sm
        transition-colors ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
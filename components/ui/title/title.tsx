import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export default function Title({
  children,
  className = "",
}: TitleProps) {
  return (
    <h2
      className={`text-4xl font-bold tracking-tight md:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}
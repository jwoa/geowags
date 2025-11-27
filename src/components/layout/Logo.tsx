"use client";

import Link from "next/link";

type LogoProps = {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
};

export const Logo = ({ variant = "default", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const colorClass = variant === "white" ? "text-white" : "text-[var(--geowags-red)]";

  return (
    <Link
      href="/"
      className={`font-display font-bold tracking-tight ${sizeClasses[size]} ${colorClass} transition-opacity hover:opacity-80`}
      aria-label="Geowags - Home"
    >
      <span className="sr-only">Geowags</span>
      <span aria-hidden="true">GEOWAGS</span>
    </Link>
  );
};


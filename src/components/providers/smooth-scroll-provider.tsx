"use client";

import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Smooth scroll is now handled by CSS in globals.css
  // html { scroll-behavior: smooth; }
  return <>{children}</>;
}

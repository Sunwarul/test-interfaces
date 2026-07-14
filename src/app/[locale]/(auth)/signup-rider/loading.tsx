"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="size-10 animate-spin text-[var(--color-brand-purple)]" />
    </div>
  );
}
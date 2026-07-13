"use client";

import { cn } from "@/lib/utils";

interface FleetManagerBadgeProps {
  className?: string;
}

export function FleetManagerBadge({ className }: FleetManagerBadgeProps) {
  return (
    <div
      className={cn(
        "relative w-[120px] h-[120px] rounded-[48px] bg-[var(--color-brand-yellow,#f8cb19)] border-[1.875px] border-black overflow-hidden",
        className
      )}
    >
      {/* Settings icon */}
      <div className="absolute left-[28.13px] top-[-1.88px] w-[60px] h-[60px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Character silhouettes */}
      <div className="absolute left-[-34.38px] top-[43.13px] w-[95px] h-[94.326px]">
        <div className="w-full h-full bg-black/20 rounded-full" />
      </div>
      <div className="absolute left-[58.13px] top-[43.13px] w-[95px] h-[94.326px]">
        <div className="w-full h-full bg-black/20 rounded-full" />
      </div>
      <div className="absolute left-[10.63px] top-[53.13px] w-[95px] h-[94.326px]">
        <div className="w-full h-full bg-black/20 rounded-full" />
      </div>
    </div>
  );
}
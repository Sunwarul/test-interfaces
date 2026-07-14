"use client";

import { User } from "lucide-react";

interface RiderAvatarProps {
  className?: string;
}

export function RiderAvatar({ className }: RiderAvatarProps) {
  return (
    <div
      className={`relative bg-[#f8cb19] border-[1.5px] border-black rounded-full size-[120px] overflow-hidden flex items-center justify-center ${className || ""}`}
    >
      <div className="absolute left-[11px] top-[26px]">
        <User className="size-12 text-black" strokeWidth={1.5} />
      </div>
    </div>
  );
}
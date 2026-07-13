"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const RIDER_CHARACTER_IMAGE =
  "https://publiish.io/ipfs/QmPsSWDnTJHeMYC26XBjvSvBqrfS7kTRMeyeCS2n35mB2w";

interface RiderBadgeProps {
  className?: string;
}

export function RiderBadge({ className }: RiderBadgeProps) {
  return (
    <div
      className={cn(
        "relative w-[120px] h-[120px] rounded-[120px] bg-[var(--color-brand-yellow,#f8cb19)] border-[1.875px] border-black overflow-hidden",
        className
      )}
    >
      <div className="absolute left-[11px] top-[26px] w-[95px] h-[94.326px]">
        <Image
          src={RIDER_CHARACTER_IMAGE}
          alt="Rider character"
          width={95}
          height={94.326}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}
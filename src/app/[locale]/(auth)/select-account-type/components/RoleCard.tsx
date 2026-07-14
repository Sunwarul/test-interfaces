"use client";

import { User, Users, Settings } from "lucide-react";
import type { AccountType } from "../types/select-account-type.types";

interface RoleCardProps {
  type: AccountType;
  isSelected: boolean;
  onSelect: (type: AccountType) => void;
}

export function RoleCard({ type, isSelected, onSelect }: RoleCardProps) {
  const isRider = type === "rider";

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`
        w-full flex items-center gap-4 p-6 rounded-3xl transition-all
        ${
          isSelected
            ? "bg-[var(--color-brand-yellow)]"
            : "bg-[rgba(0,0,0,0.05)]"
        }
      `}
      aria-pressed={isSelected}
    >
      {/* Avatar */}
      <div
        className={`
          relative shrink-0 size-12 rounded-full overflow-hidden 
          border-[0.75px] border-black flex items-center justify-center
          ${isSelected ? "bg-[var(--color-brand-purple)]" : "bg-[rgba(0,0,0,0.1)]"}
        `}
      >
        {isRider ? (
          <User className="size-6 text-black" strokeWidth={1.5} />
        ) : (
          <>
            <div className="absolute -left-2 top-1">
              <Users className="size-5 text-black opacity-50" />
            </div>
            <div className="absolute left-2 top-1">
              <Users className="size-5 text-black opacity-50" />
            </div>
            <div className="absolute left-0 top-3">
              <User className="size-5 text-black opacity-50" />
            </div>
            <Settings className="size-5 text-black" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <p className="text-body-bold text-black">
          {isRider ? "Rider" : "Fleet Manager"}
        </p>
        <p className="text-caption-normal text-[rgba(0,0,0,0.6)]">
          {isRider
            ? "Pick up and deliver orders efficiently"
            : "Manage your team of riders and optimize deliveries."}
        </p>
      </div>

      {/* Radio indicator */}
      <div
        className={`
          shrink-0 size-10 rounded-full flex items-center justify-center p-1
          ${
            isSelected
              ? "bg-[var(--color-brand-purple)]"
              : "bg-[rgba(0,0,0,0.1)]"
          }
        `}
      >
        {isSelected && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-6"
            aria-hidden="true"
          >
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
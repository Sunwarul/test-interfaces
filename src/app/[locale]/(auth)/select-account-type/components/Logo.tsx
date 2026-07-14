"use client";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={`relative h-[41px] w-[110px] ${className || ""}`}
      aria-label="App Logo"
    >
      {/* Logo SVG representation - simplified version */}
      <svg
        viewBox="0 0 110 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full"
      >
        {/* Main circle */}
        <circle
          cx="20.5"
          cy="20.5"
          r="18"
          fill="var(--color-brand-purple)"
          stroke="black"
          strokeWidth="1.5"
        />
        {/* Inner design elements */}
        <circle cx="20.5" cy="20.5" r="12" fill="#f8cb19" />
        <circle cx="20.5" cy="20.5" r="6" fill="var(--color-brand-purple)" />
        {/* Text placeholder */}
        <text
          x="50"
          y="26"
          fontFamily="var(--font-sans)"
          fontSize="16"
          fontWeight="700"
          fill="black"
        >
          Logo
        </text>
      </svg>
    </div>
  );
}
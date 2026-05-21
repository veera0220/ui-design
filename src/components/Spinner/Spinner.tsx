import React from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
  style?: React.CSSProperties;
}

const sizePx: Record<SpinnerSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 36,
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "#534AB7",
  label = "Loading…",
  style,
}) => {
  const px = sizePx[size];
  return (
    <span
      role="status"
      aria-label={label}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}
    >
      <style>{`@keyframes _spin { to { transform: rotate(360deg) } }`}</style>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: "_spin .7s linear infinite", flexShrink: 0 }}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={color}
          strokeOpacity="0.25"
          strokeWidth="3"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {label && size !== "xs" && (
        <span style={{ fontSize: 13, color, fontFamily: "inherit" }}>{label}</span>
      )}
    </span>
  );
};

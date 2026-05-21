import React from "react";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: { background: "#F1EFE8", color: "#5F5E5A" },
  primary: { background: "#EEEDFE", color: "#3C3489" },
  success: { background: "#EAF3DE", color: "#3B6D11" },
  warning: { background: "#FAEEDA", color: "#854F0B" },
  danger:  { background: "#FCEBEB", color: "#A32D2D" },
  info:    { background: "#E6F1FB", color: "#185FA5" },
};

const dotColors: Record<BadgeVariant, string> = {
  default: "#888780",
  primary: "#534AB7",
  success: "#1D9E75",
  warning: "#EF9F27",
  danger:  "#E24B4A",
  info:    "#378ADD",
};

const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: { fontSize: 10, padding: "1px 6px" },
  md: { fontSize: 12, padding: "2px 8px" },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  size = "md",
  dot = false,
  style,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      borderRadius: 20,
      fontWeight: 500,
      fontFamily: "inherit",
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    }}
  >
    {dot && (
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dotColors[variant],
          flexShrink: 0,
        }}
      />
    )}
    {label}
  </span>
);

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const base: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontFamily: "inherit",
  fontWeight: 500,
  border: "1px solid transparent",
  cursor: "pointer",
  borderRadius: 8,
  transition: "opacity .15s, background .15s",
  whiteSpace: "nowrap",
};

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: "#534AB7", color: "#fff", borderColor: "#534AB7" },
  secondary: { background: "transparent", color: "#534AB7", borderColor: "#534AB7" },
  ghost:     { background: "transparent", color: "#534AB7", borderColor: "transparent" },
  danger:    { background: "#E24B4A", color: "#fff", borderColor: "#E24B4A" },
};

const sizes: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 12, padding: "5px 12px", height: 30 },
  md: { fontSize: 14, padding: "7px 16px", height: 36 },
  lg: { fontSize: 15, padding: "10px 22px", height: 44 },
};

const Spinner: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{ animation: "spin 0.7s linear infinite" }}
  >
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeDasharray="20 14" />
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      style={{
        ...base,
        ...variants[variant],
        ...sizes[size],
        width: fullWidth ? "100%" : undefined,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      {label ?? children}
      {!loading && rightIcon}
    </button>
  );
};

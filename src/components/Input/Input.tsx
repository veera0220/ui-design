import React, { useState } from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "success";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  status?: InputStatus;
  size?: InputSize;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  fullWidth?: boolean;
}

const statusColors: Record<InputStatus, string> = {
  default: "#c0bfc8",
  error:   "#E24B4A",
  success: "#1D9E75",
};

const helperColors: Record<InputStatus, string> = {
  default: "#888",
  error:   "#E24B4A",
  success: "#1D9E75",
};

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: { fontSize: 12, height: 30, padding: "0 10px" },
  md: { fontSize: 14, height: 38, padding: "0 12px" },
  lg: { fontSize: 15, height: 46, padding: "0 14px" },
};

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  status = "default",
  size = "md",
  leftAddon,
  rightAddon,
  fullWidth = false,
  disabled,
  style,
  id,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;

  const borderColor = focused
    ? "#534AB7"
    : statusColors[status];

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, width: fullWidth ? "100%" : undefined }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: 13, fontWeight: 500, color: "#444" }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          overflow: "hidden",
          background: disabled ? "#f5f5f5" : "#fff",
          transition: "border-color .15s",
          width: fullWidth ? "100%" : undefined,
        }}
      >
        {leftAddon && (
          <span style={{ padding: "0 10px", color: "#888", fontSize: 14, borderRight: "1px solid #eee", display: "flex", alignItems: "center" }}>
            {leftAddon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...sizeStyles[size],
            flex: 1,
            border: "none",
            outline: "none",
            fontFamily: "inherit",
            background: "transparent",
            color: "#222",
            cursor: disabled ? "not-allowed" : "text",
            ...style,
          }}
          {...rest}
        />
        {rightAddon && (
          <span style={{ padding: "0 10px", color: "#888", fontSize: 14, borderLeft: "1px solid #eee", display: "flex", alignItems: "center" }}>
            {rightAddon}
          </span>
        )}
      </div>
      {helperText && (
        <span style={{ fontSize: 11, color: helperColors[status] }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

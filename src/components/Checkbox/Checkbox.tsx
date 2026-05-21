import React from "react";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  helperText?: string;
  style?: React.CSSProperties;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  helperText,
  style,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 18,
            height: 18,
            border: `2px solid ${checked || indeterminate ? "#534AB7" : "rgba(0,0,0,0.25)"}`,
            borderRadius: 4,
            background: checked || indeterminate ? "#534AB7" : "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .12s",
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          {indeterminate && !checked && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <rect width="10" height="2" rx="1" fill="white" />
            </svg>
          )}
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {label && (
          <span style={{ fontSize: 14, color: "#1a1a1a" }}>{label}</span>
        )}
      </span>
      {helperText && (
        <span style={{ fontSize: 11, color: "#888", paddingLeft: 26 }}>{helperText}</span>
      )}
    </label>
  );
};

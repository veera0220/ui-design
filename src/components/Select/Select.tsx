import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  helperText,
  disabled = false,
  fullWidth = false,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 4,
        width: fullWidth ? "100%" : undefined,
        position: "relative",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: "#444" }}>{label}</label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          height: 38,
          padding: "0 12px",
          border: `1px solid ${open ? "#534AB7" : "rgba(0,0,0,0.18)"}`,
          borderRadius: 8,
          background: disabled ? "#f5f5f5" : "#fff",
          fontSize: 14,
          color: selected ? "#1a1a1a" : "#aaa",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color .15s",
          fontFamily: "inherit",
          width: fullWidth ? "100%" : 220,
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{ fontSize: 10, color: "#aaa", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>
          ▼
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            zIndex: 200,
            overflow: "hidden",
            animation: "fadeDown .12s ease",
          }}
        >
          <style>{`@keyframes fadeDown { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }`}</style>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              style={{
                padding: "9px 12px",
                fontSize: 14,
                cursor: opt.disabled ? "not-allowed" : "pointer",
                color: opt.disabled ? "#ccc" : opt.value === value ? "#534AB7" : "#1a1a1a",
                background: opt.value === value ? "#EEEDFE" : "transparent",
                fontWeight: opt.value === value ? 500 : 400,
                transition: "background .1s",
              }}
              onMouseEnter={(e) => {
                if (!opt.disabled && opt.value !== value)
                  (e.currentTarget as HTMLDivElement).style.background = "#f5f4ff";
              }}
              onMouseLeave={(e) => {
                if (opt.value !== value)
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <span style={{ fontSize: 11, color: "#888" }}>{helperText}</span>
      )}
    </div>
  );
};

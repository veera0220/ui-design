import React from "react";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
  padding?: number | string;
  shadow?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  headerAction,
  padding = "1.25rem",
  shadow = false,
  style,
}) => (
  <div
    style={{
      background: "#fff",
      border: "0.5px solid rgba(0,0,0,0.12)",
      borderRadius: 12,
      boxShadow: shadow ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
      overflow: "hidden",
      fontFamily: "inherit",
      ...style,
    }}
  >
    {(title || subtitle || headerAction) && (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding,
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
          gap: 12,
        }}
      >
        <div>
          {title && (
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>
              {title}
            </div>
          )}
          {subtitle && (
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
    )}

    <div style={{ padding }}>{children}</div>

    {footer && (
      <div
        style={{
          padding,
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
          background: "#fafafa",
        }}
      >
        {footer}
      </div>
    )}
  </div>
);

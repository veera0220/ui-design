import React, { useState } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  status?: "online" | "offline" | "away" | "busy";
  style?: React.CSSProperties;
}

const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 52,
  xl: 68,
};

const fontSizes: Record<AvatarSize, number> = {
  xs: 9,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
};

const statusColors: Record<string, string> = {
  online:  "#1D9E75",
  offline: "#B4B2A9",
  away:    "#EF9F27",
  busy:    "#E24B4A",
};

const COLORS = ["#534AB7", "#1D9E75", "#E24B4A", "#378ADD", "#EF9F27", "#D4537E"];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function getColor(name: string): string {
  const code = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return COLORS[code % COLORS.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  status,
  style,
}) => {
  const [imgError, setImgError] = useState(false);
  const px = sizePx[size];
  const radius = shape === "circle" ? "50%" : px * 0.25;
  const showImg = src && !imgError;
  const initials = name ? getInitials(name) : "?";
  const bg = name ? getColor(name) : "#888";

  return (
    <span
      style={{ position: "relative", display: "inline-flex", flexShrink: 0, ...style }}
      aria-label={alt ?? name ?? "avatar"}
    >
      <span
        style={{
          width: px,
          height: px,
          borderRadius: radius,
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: showImg ? "transparent" : bg,
          flexShrink: 0,
        }}
      >
        {showImg ? (
          <img
            src={src}
            alt={alt ?? name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            style={{
              fontSize: fontSizes[size],
              fontWeight: 500,
              color: "#fff",
              fontFamily: "inherit",
              userSelect: "none",
            }}
          >
            {initials}
          </span>
        )}
      </span>
      {status && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: px * 0.28,
            height: px * 0.28,
            borderRadius: "50%",
            background: statusColors[status],
            border: "2px solid #fff",
          }}
          aria-label={status}
        />
      )}
    </span>
  );
};

// Avatar Group
export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, "src" | "name" | "alt">[];
  size?: AvatarSize;
  max?: number;
  style?: React.CSSProperties;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = "md",
  max = 4,
  style,
}) => {
  const px = sizePx[size];
  const shown = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <span style={{ display: "inline-flex", ...style }}>
      {shown.map((a, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -(px * 0.3), zIndex: shown.length - i }}>
          <Avatar {...a} size={size} style={{ border: "2px solid #fff", borderRadius: "50%" }} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          style={{
            marginLeft: -(px * 0.3),
            width: px,
            height: px,
            borderRadius: "50%",
            background: "#E1EFE8",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: fontSizes[size],
            fontWeight: 500,
            color: "#3B6D11",
            border: "2px solid #fff",
            flexShrink: 0,
            fontFamily: "inherit",
          }}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};

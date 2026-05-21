import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastType, string> = {
  success: "✓",
  error:   "✕",
  warning: "⚠",
  info:    "ℹ",
};

const colors: Record<ToastType, string> = {
  success: "#1D9E75",
  error:   "#E24B4A",
  warning: "#EF9F27",
  info:    "#378ADD",
};

const ToastItem: React.FC<{ item: ToastItem; onDismiss: (id: string) => void }> = ({
  item,
  onDismiss,
}) => (
  <div
    role="alert"
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      background: "#fff",
      border: "0.5px solid rgba(0,0,0,0.1)",
      borderLeft: `3px solid ${colors[item.type]}`,
      borderRadius: 8,
      padding: "12px 14px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      cursor: "pointer",
      maxWidth: 320,
      fontFamily: "inherit",
      animation: "toastIn .2s ease",
    }}
    onClick={() => onDismiss(item.id)}
  >
    <span style={{ color: colors[item.type], fontSize: 15, flexShrink: 0, marginTop: 1 }}>
      {icons[item.type]}
    </span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{item.title}</div>
      {item.message && (
        <div style={{ fontSize: 12, color: "#888", marginTop: 2, lineHeight: 1.5 }}>
          {item.message}
        </div>
      )}
    </div>
    <span style={{ color: "#ccc", fontSize: 16, flexShrink: 0, lineHeight: 1 }}>×</span>
  </div>
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      const duration = item.duration ?? 4000;
      setToasts((prev) => [...prev, { ...item, id }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      <style>{`@keyframes toastIn { from { opacity:0; transform: translateX(12px) } to { opacity:1; transform: translateX(0) } }`}</style>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
        }}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
};

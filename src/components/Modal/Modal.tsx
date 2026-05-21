import React, { useEffect, useCallback } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

const sizeWidths: Record<string, number> = {
  sm: 360,
  md: 480,
  lg: 640,
  xl: 800,
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  closeOnEsc = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") onClose();
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.45)",
        animation: "fadeIn .15s ease",
      }}
      onClick={closeOnBackdrop ? (e) => e.target === e.currentTarget && onClose() : undefined}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: sizeWidths[size],
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp .2s ease",
          fontFamily: "inherit",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: title || description ? "0.5px solid rgba(0,0,0,0.1)" : "none",
          }}
        >
          <div>
            {title && (
              <div id="modal-title" style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a" }}>
                {title}
              </div>
            )}
            {description && (
              <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                {description}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              color: "#aaa",
              lineHeight: 1,
              padding: "0 0 0 12px",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        {children && (
          <div style={{ padding: "1.25rem 1.5rem", overflowY: "auto", flex: 1 }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "0.5px solid rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

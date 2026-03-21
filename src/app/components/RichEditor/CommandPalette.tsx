import React from "react";

/**
 * Stub CommandPalette component for LexKit DefaultTemplate.
 * Implement or customize as needed for your application.
 */
export function CommandPalette(props: { isOpen: boolean; onClose: () => void; commands: any[] }) {
  if (!props.isOpen) return null;
  return (
    <div style={{
      position: "fixed",
      left: 0, top: 0,
      width: "100vw", height: "100vh",
      zIndex: 9999, background: "rgba(0,0,0,0.12)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#222"
    }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 40, minWidth: 240, textAlign: "center" }}>
        <p style={{ marginBottom: 10 }}>CommandPalette is not yet implemented.</p>
        <button onClick={props.onClose} style={{ marginTop: 16, border: "1px solid #ccc", padding: "6px 18px", borderRadius: 4, cursor: "pointer" }}>
          Close
        </button>
      </div>
    </div>
  );
}

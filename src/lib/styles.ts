// Centralized design tokens — all inline styles, no Tailwind custom classes
export const C = {
  saffron: "#D4622A",
  saffronLight: "#FDF0E8",
  saffronMid: "#F5C4A0",
  saffronDark: "#B8501F",
  forest: "#0F6E56",
  forestLight: "#E8F5F1",
  ivory: "#FDF6ED",
  charcoal: "#1A1A1A",
  gray: "#6B6560",
  grayLight: "#F5F4F2",
  border: "rgba(212,98,42,0.12)",
  borderGray: "rgba(0,0,0,0.08)",
  white: "#ffffff",
};

export const F = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
  devanagari: "'Noto Serif Devanagari', serif",
};

// Reusable style objects
export const S = {
  card: {
    background: C.white,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    padding: "16px 20px",
  } as React.CSSProperties,

  cardAccent: {
    background: C.white,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    borderLeft: `3px solid ${C.saffron}`,
    padding: "16px 20px",
  } as React.CSSProperties,

  tag: (color: "saffron"|"forest"|"gray") => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 500,
    background: color === "saffron" ? C.saffronLight : color === "forest" ? C.forestLight : C.grayLight,
    color: color === "saffron" ? C.saffron : color === "forest" ? C.forest : C.gray,
    border: `1px solid ${color === "saffron" ? C.saffronMid : color === "forest" ? "rgba(15,110,86,0.2)" : C.borderGray}`,
  } as React.CSSProperties),

  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: C.saffron,
    color: C.white,
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.15s",
    fontFamily: F.sans,
  } as React.CSSProperties,

  btnSecondary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: C.white,
    color: C.charcoal,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.15s",
    fontFamily: F.sans,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "9px 12px",
    border: `1px solid ${C.borderGray}`,
    borderRadius: 8,
    fontSize: 13,
    fontFamily: F.sans,
    background: C.ivory,
    color: C.charcoal,
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,

  h1: { fontFamily: F.serif, fontSize: 24, fontWeight: 600, color: C.charcoal, margin: 0 } as React.CSSProperties,
  h2: { fontFamily: F.serif, fontSize: 18, fontWeight: 500, color: C.charcoal, margin: 0 } as React.CSSProperties,
  h3: { fontFamily: F.serif, fontSize: 15, fontWeight: 500, color: C.charcoal, margin: 0 } as React.CSSProperties,
  body: { fontSize: 14, color: C.charcoal, fontFamily: F.sans, margin: 0 } as React.CSSProperties,
  muted: { fontSize: 12, color: C.gray, fontFamily: F.sans, margin: 0 } as React.CSSProperties,
};

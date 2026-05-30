"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { C, F } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Rituals", href: "/rituals-services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.35s ease",
        background: scrolled
          ? "rgba(250,247,242,0.96)"
          : isHome ? "transparent" : "rgba(250,247,242,0.96)",
        backdropFilter: scrolled || !isHome ? "blur(20px)" : "none",
        borderBottom: scrolled || !isHome ? "1px solid rgba(184,146,42,0.12)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C8541A,#B8922A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(200,84,26,0.3)", fontSize: 18 }}>🪔</div>
            <div>
              <span style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 700, color: scrolled || !isHome ? C.charcoal : C.white, letterSpacing: "-0.3px", lineHeight: 1 }}>Parampara</span>
              <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: scrolled || !isHome ? C.gold : "rgba(255,255,255,0.7)", marginTop: 1 }}>Heritage Platform</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-mobile">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link key={label} href={href} style={{
                  padding: "8px 13px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  color: scrolled || !isHome
                    ? (active ? C.saffron : C.gray)
                    : (active ? C.goldBright : "rgba(255,255,255,0.85)"),
                  transition: "all 0.2s",
                  background: active && (scrolled || !isHome) ? C.saffronLight : "transparent",
                  textDecoration: "none",
                }}>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hide-mobile">
            <Link href="/auth/login" style={{ fontSize: 13, fontWeight: 500, color: scrolled || !isHome ? C.gray : "rgba(255,255,255,0.8)", padding: "8px 14px", borderRadius: 8, textDecoration: "none" }}>
              Sign in
            </Link>
            <Link href="/auth/signup" style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "linear-gradient(135deg,#C8541A,#B8922A)",
              color: "#fff", padding: "9px 20px", borderRadius: 10,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 4px 16px rgba(200,84,26,0.3)",
              letterSpacing: "0.2px",
            }}>
              Start Free →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: scrolled || !isHome ? C.charcoal : C.white, display: "none" }}
            className="hide-desktop"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(250,247,242,0.98)", backdropFilter: "blur(20px)",
          padding: "20px 24px", overflowY: "auto",
        }} className="hide-desktop animate-fade-in">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} style={{
                padding: "14px 16px", fontSize: 16, fontWeight: 500,
                color: C.charcoal, borderRadius: 10,
                borderBottom: "1px solid rgba(184,146,42,0.08)",
                display: "block",
              }}>
                {label}
              </Link>
            ))}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/auth/login" style={{ textAlign: "center", padding: "13px", border: "1px solid rgba(200,84,26,0.2)", borderRadius: 12, fontSize: 15, fontWeight: 500, color: C.saffron }}>Sign in</Link>
              <Link href="/auth/signup" style={{ textAlign: "center", padding: "13px", background: "linear-gradient(135deg,#C8541A,#B8922A)", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#fff", boxShadow: "0 4px 16px rgba(200,84,26,0.3)" }}>Start Free →</Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){.hide-mobile{display:none!important}}
        @media(min-width:901px){.hide-desktop{display:none!important}}
      `}</style>
    </>
  );
}

import Link from "next/link";
import { C, F } from "@/lib/constants";

const LINKS = {
  "Quick Links": [
    ["Home", "/"], ["About Us", "/about"], ["What We Do", "/what-we-do"],
    ["Pricing", "/pricing"], ["Contact", "/contact"],
  ],
  "Services": [
    ["Ritual Vault", "/dashboard"], ["Festival Calendar", "/festivals"],
    ["AI Assistant", "/ai"], ["Memory Vault", "/media"], ["Family Space", "/members"],
  ],
  "Legal": [
    ["Privacy Policy", "#"], ["Terms & Conditions", "#"],
    ["Refund Policy", "#"], ["Cookie Policy", "#"],
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: C.dark, color: C.white, position: "relative", overflow: "hidden" }}>
      {/* Decorative top border */}
      <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#B8922A,#C8541A,#B8922A,transparent)" }} />

      {/* Newsletter bar */}
      <div style={{ background: "rgba(200,84,26,0.08)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.white, marginBottom: 4 }}>Stay connected to your roots</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Get festival reminders, ritual guides, and cultural insights monthly.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              placeholder="Enter your email"
              style={{ padding: "11px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: C.white, fontSize: 13, width: 240, outline: "none", fontFamily: F.sans }}
            />
            <button style={{ padding: "11px 20px", background: "linear-gradient(135deg,#C8541A,#B8922A)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.2px" }}>
              Subscribe →
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C8541A,#B8922A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🪔</div>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 700, color: C.white }}>Parampara</div>
                <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold }}>Heritage Platform</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>
              The sacred digital home for Indian and South Asian families to document, preserve, and pass down traditions across generations.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: 10 }}>
              {[["Instagram","📷"],["Facebook","📘"],["WhatsApp","💬"],["YouTube","📺"]].map(([name, icon]) => (
                <a key={name} href="#" title={name} style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transition: "all 0.2s" }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>{section}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(([label, href]) => (
                  <Link key={label} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
          {[
            ["📧", "hello@parampara.app"],
            ["📱", "+91 98765 43210"],
            ["📍", "New Delhi, India"],
            ["⏰", "Mon–Sat, 9AM–7PM IST"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © 2026 Parampara. All rights reserved. परंपरा — tradition, heritage, legacy.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Built with 🧡 for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

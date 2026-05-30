import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import { C, F, IMGS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "What We Do | Parampara" };

const OFFERINGS = [
  { icon: "📜", title: "Ritual Documentation", img: IMGS.ritual, color: C.saffron, features: ["Step-by-step ritual builder", "Rich text formatting", "Ordered & unordered lists", "Multiple contributors", "Version history"] },
  { icon: "🛒", title: "Samagri Management", img: IMGS.flowers, color: C.gold, features: ["AI-generated samagri lists", "Quantities by guest count", "Checklist functionality", "Save & reuse lists", "Share with family"] },
  { icon: "🗓️", title: "Festival Calendar", img: IMGS.festival, color: C.forest, features: ["Auto-populated by religion + region", "Countdown timers", "Push notifications", "Custom festival entries", "Family reminders"] },
  { icon: "✨", title: "AI Ritual Assistant", img: IMGS.incense, color: C.saffron, features: ["Ritual explainer (Claude AI)", "Samagri generator", "Missing steps finder", "Cultural context & history", "Regional variations"] },
  { icon: "📸", title: "Memory Vault", img: IMGS.temple, color: C.gold, features: ["Photo & video uploads", "Voice memo recording", "Album organisation", "Reactions & comments", "Cloudflare R2 storage"] },
  { icon: "👨‍👩‍👧‍👦", title: "Family Space", img: IMGS.family, color: C.forest, features: ["Role-based access", "Invite via link/email", "5 role levels", "Family dashboard", "Activity feed"] },
];

export default function WhatWeDoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 80, background: C.ivory, textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 16 }}>Our Platform</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.12, marginBottom: 24, letterSpacing: "-1px" }}>
              Everything your family<br /><em style={{ fontStyle: "italic", color: C.saffronMid }}>needs in one place</em>
            </h1>
            <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 40px" }}>
              Five deeply integrated modules that work together to preserve, share, and celebrate your family&apos;s cultural heritage.
            </p>
            <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", padding: "15px 36px", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 28px rgba(200,84,26,0.35)" }}>
              Try it free →
            </Link>
          </div>
        </section>

        {/* Offerings — alternating layout */}
        {OFFERINGS.map(({ icon, title, img, color, features }, i) => (
          <section key={title} style={{ padding: "90px 24px", background: i % 2 === 0 ? C.cream : C.ivory }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", direction: i % 2 === 1 ? "rtl" : "ltr" }}>
              <div style={{ direction: "ltr" }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{icon}</div>
                <h2 style={{ fontFamily: F.display, fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.5px" }}>{title}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color, fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: 15, color: C.charcoal }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", direction: "ltr" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{ padding: "90px 24px", background: C.charcoal, textAlign: "center" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,52px)", fontWeight: 600, color: C.white, marginBottom: 16 }}>Ready to begin?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 36 }}>Join 2,400+ families preserving their heritage.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", padding: "16px 40px", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(200,84,26,0.4)" }}>
              Start for Free →
            </Link>
            <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: C.white, padding: "16px 32px", borderRadius: 14, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              View pricing
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

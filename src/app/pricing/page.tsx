"use client";
import { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import toast from "react-hot-toast";

const COMPARISON = [
  { feature: "Family members", free: "3", pro: "Unlimited", custom: "Up to 50" },
  { feature: "Ritual entries", free: "5", pro: "Unlimited", custom: "Unlimited" },
  { feature: "AI queries/month", free: "10", pro: "Unlimited", custom: "Unlimited" },
  { feature: "Media storage", free: "500MB", pro: "10GB", custom: "100GB" },
  { feature: "Festival calendar", free: "View only", pro: "Full + reminders", custom: "Full + reminders" },
  { feature: "Voice memo recording", free: "—", pro: "✓", custom: "✓" },
  { feature: "PDF legacy book export", free: "—", pro: "✓", custom: "✓" },
  { feature: "Custom branding", free: "—", pro: "—", custom: "✓" },
  { feature: "API access", free: "—", pro: "—", custom: "✓" },
  { feature: "Priority support", free: "—", pro: "✓", custom: "Dedicated" },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly"|"yearly">("monthly");

  async function handleProCheckout() {
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ billingCycle: billing }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error("Could not start checkout. Please try again.");
    } catch {
      toast.error("Add ANTHROPIC_API_KEY and STRIPE keys to Vercel to enable payments.");
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 80, background: C.ivory, textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 16 }}>Pricing</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,5vw,64px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.12, marginBottom: 20, letterSpacing: "-1px" }}>
              Simple, honest pricing
            </h1>
            <p style={{ fontSize: 17, color: C.gray, marginBottom: 40 }}>No tricks. No upsells. Your heritage deserves transparency.</p>

            {/* Billing toggle */}
            <div style={{ display: "inline-flex", background: C.cream, borderRadius: 12, padding: 4, border: `1px solid ${C.border}` }}>
              {(["monthly","yearly"] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{ padding: "9px 28px", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.sans, background: billing === b ? C.charcoal : "transparent", color: billing === b ? C.white : C.gray, transition: "all 0.2s", position: "relative" }}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                  {b === "yearly" && <span style={{ position: "absolute", top: -10, right: -8, background: C.forest, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10 }}>-17%</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section style={{ padding: "0 24px 100px", background: C.ivory }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 20, alignItems: "start" }}>
            {/* Free */}
            <div style={{ background: C.white, borderRadius: 24, border: `1px solid ${C.border}`, padding: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.gray, marginBottom: 12 }}>Free</p>
              <p style={{ fontFamily: F.display, fontSize: 54, fontWeight: 700, color: C.charcoal, lineHeight: 1, marginBottom: 6 }}>$0</p>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 32 }}>Perfect to get started</p>
              {["3 family members","5 ritual entries","Festival calendar","10 AI queries/month","500MB storage"].map(f=>(
                <div key={f} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:`1px solid ${C.border}`, fontSize:14, color:C.charcoal }}>
                  <span style={{ color:C.forest, fontWeight:700 }}>✓</span>{f}
                </div>
              ))}
              <Link href="/auth/signup" style={{ display:"block", textAlign:"center", marginTop:28, padding:"14px", border:`1.5px solid ${C.saffron}`, borderRadius:12, fontSize:14, fontWeight:600, color:C.saffron, textDecoration:"none" }}>
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div style={{ background: C.charcoal, borderRadius: 24, padding: "44px 40px", boxShadow: "0 40px 80px rgba(0,0,0,0.2)", transform: "translateY(-10px)", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: "linear-gradient(90deg,#C8541A,#B8922A,#C8541A)" }} />
              <div style={{ position: "absolute", top: 20, right: 20, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "5px 12px", borderRadius: 20, textTransform: "uppercase" }}>Most Popular</div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Pro</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: F.display, fontSize: 58, fontWeight: 700, color: C.white, lineHeight: 1 }}>${billing === "yearly" ? "4" : "5"}</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/month</span>
              </div>
              {billing === "yearly" && <p style={{ fontSize: 12, color: C.goldBright, marginBottom: 4 }}>$50 billed annually — save $10/year</p>}
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>Complete heritage platform</p>
              {["Unlimited members","Unlimited rituals","Full calendar + reminders","Unlimited AI queries","10GB storage","Voice memo recording","PDF legacy export","Priority support"].map(f=>(
                <div key={f} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:14, color:"rgba(255,255,255,0.8)" }}>
                  <span style={{ color:C.saffronMid, fontWeight:700 }}>✓</span>{f}
                </div>
              ))}
              <button onClick={handleProCheckout} style={{ width:"100%", marginTop:28, padding:"15px", background:"linear-gradient(135deg,#C8541A,#B8922A)", border:"none", borderRadius:12, fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", boxShadow:"0 8px 24px rgba(200,84,26,0.4)", fontFamily:F.sans, letterSpacing:"0.3px" }}>
                Start Pro — ${billing === "yearly" ? "50/year" : "5/month"}
              </button>
              <p style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.2)", marginTop:10 }}>Cancel anytime · Powered by Stripe</p>
            </div>

            {/* Custom */}
            <div style={{ background: C.white, borderRadius: 24, border: `1px solid ${C.border}`, padding: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.gray, marginBottom: 12 }}>Custom</p>
              <p style={{ fontFamily: F.display, fontSize: 36, fontWeight: 700, color: C.charcoal, lineHeight: 1, marginBottom: 6 }}>Let&apos;s talk</p>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 32 }}>Temples, orgs, large families</p>
              {["Everything in Pro","Up to 50 members","Custom branding","API access","Bulk import","Dedicated support","Community features"].map(f=>(
                <div key={f} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:`1px solid ${C.border}`, fontSize:14, color:C.charcoal }}>
                  <span style={{ color:C.gold, fontWeight:700 }}>✓</span>{f}
                </div>
              ))}
              <a href="mailto:hello@parampara.app" style={{ display:"block", textAlign:"center", marginTop:28, padding:"14px", border:`1.5px solid ${C.gold}`, borderRadius:12, fontSize:14, fontWeight:600, color:C.gold, textDecoration:"none" }}>
                Contact us →
              </a>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section style={{ padding: "60px 24px 100px", background: C.cream }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 600, color: C.charcoal, textAlign: "center", marginBottom: 48 }}>Full comparison</h2>
            <div style={{ background: C.white, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: C.charcoal, padding: "16px 24px" }}>
                {["Feature","Free","Pro","Custom"].map((h,i) => <p key={h} style={{ fontSize: 12, fontWeight: 700, color: i===0?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.9)", textAlign: i>0 ? "center" : "left", letterSpacing: 0.5 }}>{h}</p>)}
              </div>
              {COMPARISON.map(({ feature, free, pro, custom }, i) => (
                <div key={feature} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 24px", borderBottom: i<COMPARISON.length-1 ? `1px solid ${C.border}` : "none", background: i%2===0 ? C.white : C.ivory }}>
                  <p style={{ fontSize: 14, color: C.charcoal, fontWeight: 500 }}>{feature}</p>
                  {[free, pro, custom].map((v, j) => <p key={j} style={{ fontSize: 13, color: v === "—" ? "#ccc" : j===1 ? C.saffron : C.charcoal, textAlign: "center", fontWeight: j===1 ? 600 : 400 }}>{v}</p>)}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

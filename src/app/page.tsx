"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { C, F, IMGS } from "@/lib/constants";

const SERVICES = [
  { icon: "🔥", title: "Havan & Yagya", desc: "Sacred fire rituals performed with precision, mantras, and authentic samagri for every occasion." },
  { icon: "💒", title: "Wedding Ceremonies", desc: "Complete Vedic wedding rituals from Ganesh puja to Saptapadi, customised for your family traditions." },
  { icon: "🪔", title: "Festival Pujas", desc: "Diwali, Navratri, Ganesh Chaturthi and all festivals — guided rituals with step-by-step documentation." },
  { icon: "👶", title: "Sanskar Rituals", desc: "Namkaran, Annaprashan, Mundan, Thread Ceremony — all 16 samskaras documented and guided." },
  { icon: "🏠", title: "Griha Pravesh", desc: "Vastu puja and housewarming ceremonies for new homes, with full samagri and muhurat guidance." },
  { icon: "🤖", title: "AI Ritual Guide", desc: "Claude-powered AI explains any ritual, generates samagri lists, and finds missing steps instantly." },
];

const STATS = [
  { value: "2,400+", label: "Families joined" },
  { value: "14,000+", label: "Rituals documented" },
  { value: "23+", label: "Samskaras covered" },
  { value: "4.9★", label: "Family rating" },
];

const TESTIMONIALS = [
  {
    text: "My children in the US can now perform our family rituals correctly. Parampara preserved everything my mother taught me.",
    name: "Meena Patel", role: "Mother of 3, Houston", initials: "MP",
  },
  {
    text: "The AI samagri generator saved us hours before our Griha Pravesh. Every item was listed perfectly with quantities.",
    name: "Rajesh Sharma", role: "Delhi NCR", initials: "RS",
  },
  {
    text: "We've documented 3 generations of our family's Navratri traditions. My grandchildren will know exactly how it's done.",
    name: "Priya Iyer", role: "Chennai → Singapore", initials: "PI",
  },
  {
    text: "The festival calendar with countdowns changed how our family prepares. We're never unprepared anymore.",
    name: "Arun Nair", role: "Kochi → London", initials: "AN",
  },
];

const FAQS = [
  { q: "What is Parampara?", a: "Parampara is a digital heritage platform for Indian and South Asian families to document, preserve, and pass down rituals, ceremonies, and traditions across generations — powered by AI and built with cultural depth." },
  { q: "How does the AI Ritual Assistant work?", a: "Our AI (powered by Anthropic Claude) can explain any ritual's significance, generate complete samagri lists with quantities, and identify missing steps in your documented ceremony — all in seconds." },
  { q: "Is my family's data private?", a: "Yes, completely. Each family has their own isolated space with row-level security. Your traditions, photos, and voice memos are only visible to the members you invite." },
  { q: "Can I use Parampara for any religion?", a: "While we have deep content for Hindu traditions, our platform supports all religions and cultures. You can document any ritual, festival, or ceremony regardless of faith." },
  { q: "What's included in the free plan?", a: "The free plan includes up to 3 family members, 5 ritual entries, the festival calendar, 10 AI queries per month, and 500MB media storage — perfect to get started." },
  { q: "How do I invite family members?", a: "Simply create your family space, then share the unique invite link. Members can join with one click and you assign their role — Elder, Parent, Contributor, or Viewer." },
];

export default function HomePage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Navbar />
      <main>

        {/* ═══ HERO ═══ */}
        <section style={{
          position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
          overflow: "hidden", background: C.dark,
        }}>
          {/* Background image */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url(${IMGS.hero})`,
            backgroundSize: "cover", backgroundPosition: "center 30%",
            filter: "brightness(0.35)",
          }} />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(15,15,16,0.85) 0%, rgba(200,84,26,0.15) 50%, rgba(15,15,16,0.85) 100%)" }} />
          {/* Gold vignette bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, zIndex: 2, background: "linear-gradient(to top,rgba(15,15,16,1),transparent)" }} />

          {/* Floating Om symbols */}
          <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: 160, opacity: 0.04, fontFamily: F.display, zIndex: 2, color: C.gold, userSelect: "none" }}>ॐ</div>
          <div style={{ position: "absolute", bottom: "20%", left: "5%", fontSize: 100, opacity: 0.03, fontFamily: F.display, zIndex: 2, color: C.gold, userSelect: "none" }}>स्वस्तिक</div>

          <div style={{ position: "relative", zIndex: 3, maxWidth: 1140, margin: "0 auto", padding: "140px 28px 100px", width: "100%" }}>
            <div style={{ maxWidth: 740 }}>
              {/* Badge */}
              <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(184,146,42,0.15)", border: "1px solid rgba(184,146,42,0.3)", borderRadius: 100, padding: "7px 18px", marginBottom: 32 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.goldBright, display: "inline-block", boxShadow: `0 0 8px ${C.goldBright}` }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: C.goldBright, letterSpacing: 0.5 }}>Trusted by 2,400+ families across India & the diaspora</span>
              </div>

              <h1 className="animate-fade-up delay-100" style={{
                fontFamily: F.display, fontSize: "clamp(44px, 6.5vw, 82px)", fontWeight: 600,
                color: C.white, lineHeight: 1.1, marginBottom: 28, letterSpacing: "-1px",
              }}>
                Preserving Traditions,
                <br />
                <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#D4A843,#C8541A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Connecting Generations
                </span>
              </h1>

              <p className="animate-fade-up delay-200" style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.8, marginBottom: 44 }}>
                The sacred digital home for Indian families — document rituals, preserve traditions, and ensure the wisdom of your elders lives forever.
              </p>

              <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/auth/signup" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,#C8541A,#B8922A)",
                  color: "#fff", padding: "16px 36px", borderRadius: 14,
                  fontSize: 15, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(200,84,26,0.45)", letterSpacing: "0.3px",
                }}>
                  Start for Free
                  <span style={{ fontSize: 18 }}>→</span>
                </Link>
                <Link href="/dashboard" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  color: C.white, padding: "16px 32px", borderRadius: 14,
                  fontSize: 15, fontWeight: 500, textDecoration: "none",
                  backdropFilter: "blur(10px)",
                }}>
                  View Live Demo
                </Link>
              </div>

              {/* Trust signals */}
              <div className="animate-fade-up delay-400" style={{ display: "flex", gap: 28, marginTop: 52, flexWrap: "wrap" }}>
                {[["🔒", "100% Private"], ["🇮🇳", "Made in India"], ["✨", "AI Powered"], ["📱", "Mobile Ready"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                    <span style={{ fontSize: 15 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</p>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,rgba(184,146,42,0.6),transparent)" }} />
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section style={{ background: "linear-gradient(135deg,#C8541A,#8B3A10)", padding: "40px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32 }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: F.display, fontSize: 36, fontWeight: 700, color: C.white, lineHeight: 1, marginBottom: 4 }}>{value}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: 0.5 }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ WHY PARAMPARA ═══ */}
        <section style={{ padding: "110px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Image side */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
                <img src={IMGS.family} alt="Indian family traditions" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(200,84,26,0.3), transparent)" }} />
              </div>
              {/* Floating card */}
              <div style={{
                position: "absolute", bottom: -24, right: -24,
                background: C.white, borderRadius: 16, padding: "20px 24px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: `1px solid ${C.border}`,
                minWidth: 200,
              }}>
                <p style={{ fontFamily: F.serif, fontSize: 32, fontWeight: 700, color: C.saffron, lineHeight: 1 }}>16</p>
                <p style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>Samskaras</p>
                <p style={{ fontSize: 11, color: C.gray, opacity: 0.7 }}>documented & guided</p>
              </div>
              {/* Gold border accent */}
              <div style={{ position: "absolute", top: -12, left: -12, width: "60%", height: "60%", borderRadius: 20, border: `2px solid rgba(184,146,42,0.25)`, pointerEvents: "none", zIndex: -1 }} />
            </div>

            {/* Text side */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 16 }}>Our Mission</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4vw,52px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.5px" }}>
                Why traditions must<br />
                <em style={{ fontStyle: "italic", color: C.gold }}>never be forgotten</em>
              </h2>
              <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.85, marginBottom: 20 }}>
                Every family has a unique way of performing rituals — the specific flowers used, the exact words whispered, the order of steps. This knowledge lives in the memory of elders and dies with them if not preserved.
              </p>
              <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.85, marginBottom: 36 }}>
                Parampara gives every family a sacred digital home to capture, document, and pass down these traditions — so your grandchildren perform rituals exactly as your grandparents intended.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {[
                  ["🕉️", "Authentic cultural documentation", "Not a generic app — built for the depth and nuance of Indian traditions"],
                  ["🤝", "Made for all generations", "Simple enough for elders, rich enough for curious grandchildren"],
                  ["🔐", "Private family space", "Your traditions belong to your family, not the internet"],
                ].map(([icon, title, desc]) => (
                  <div key={title as string} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: C.saffronLight, border: `1px solid rgba(200,84,26,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 3 }}>{title as string}</p>
                      <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>{desc as string}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: C.saffron, borderBottom: `1px solid ${C.saffron}`, paddingBottom: 2, textDecoration: "none" }}>
                Read our story →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section style={{ padding: "110px 24px", background: C.cream }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>What We Offer</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.5px" }}>
                Sacred services for every<br />milestone of life
              </h2>
              <p style={{ fontSize: 16, color: C.gray, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
                From birth to beyond — every ritual, ceremony, and tradition your family will ever need.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
              {SERVICES.map(({ icon, title, desc }, i) => (
                <div key={title} className="hover-lift" style={{
                  background: C.white, borderRadius: 20, padding: 32,
                  border: `1px solid ${C.border}`,
                  cursor: "pointer", transition: "all 0.3s ease",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: i % 2 === 0 ? "linear-gradient(90deg,#C8541A,#E8894A)" : "linear-gradient(90deg,#B8922A,#D4A843)" }} />
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: i % 2 === 0 ? C.saffronLight : C.goldLight, border: `1px solid ${i % 2 === 0 ? "rgba(200,84,26,0.15)" : "rgba(184,146,42,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: F.serif, fontSize: 19, fontWeight: 600, color: C.charcoal, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.75, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
              <Link href="/what-we-do" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.charcoal, color: C.white, padding: "14px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                Explore all services →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ RITUAL GALLERY ═══ */}
        <section style={{ padding: "110px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>Sacred Moments</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                Rituals worth preserving
              </h2>
            </div>

            {/* Masonry-style grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto", gap: 16 }}>
              {[
                { img: IMGS.havan, label: "Havan & Yagya", span: false },
                { img: IMGS.wedding, label: "Vivah Ceremony", span: true },
                { img: IMGS.puja, label: "Daily Puja", span: false },
                { img: IMGS.festival, label: "Festival Celebrations", span: false },
                { img: IMGS.diya, label: "Diya & Aarti", span: false },
                { img: IMGS.temple, label: "Temple Traditions", span: false },
              ].map(({ img, label, span }, i) => (
                <div key={label} style={{
                  borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer",
                  gridRow: span ? "span 2" : "span 1",
                  aspectRatio: span ? "unset" : "4/3",
                  minHeight: span ? 400 : "unset",
                }} className="hover-lift">
                  <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,15,16,0.7) 0%,transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section style={{ padding: "110px 24px", background: C.dark, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 30% 50%,rgba(200,84,26,0.08),transparent 60%), radial-gradient(ellipse at 70% 50%,rgba(184,146,42,0.06),transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Simple Process</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: C.white, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                Start in under 2 minutes
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40 }}>
              {[
                ["01", "Create Family Space", "Sign up and name your family. Your private heritage vault is ready instantly."],
                ["02", "Invite Your Family", "Share a link. Assign roles — Elder, Parent, Contributor — to the right people."],
                ["03", "Document Traditions", "Add rituals, steps, samagri, mantras, photos and voice memos together."],
                ["04", "Preserve Forever", "Your family's complete heritage lives on, accessible to every generation."],
              ].map(([num, title, desc]) => (
                <div key={num as string} style={{ textAlign: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(200,84,26,0.12)", border: "1px solid rgba(200,84,26,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.saffronMid }}>
                    {num}
                  </div>
                  <h3 style={{ fontFamily: F.serif, fontSize: 17, fontWeight: 600, color: C.white, marginBottom: 10 }}>{title as string}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{desc as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" style={{ padding: "110px 24px", background: C.cream }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>Pricing</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.5px" }}>
                Start free, grow with your family
              </h2>
              <p style={{ fontSize: 16, color: C.gray }}>No hidden fees. Cancel anytime. Your heritage is priceless — our plans are not.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 20, alignItems: "start" }}>

              {/* Free */}
              <div style={{ background: C.white, borderRadius: 24, border: `1px solid ${C.border}`, padding: 36 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.gray, marginBottom: 12 }}>Free</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: F.display, fontSize: 48, fontWeight: 700, color: C.charcoal }}>$0</span>
                  <span style={{ fontSize: 14, color: C.gray }}>/month</span>
                </div>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 32, lineHeight: 1.6 }}>Perfect to explore Parampara and start your family's heritage journey.</p>
                {["3 family members", "5 ritual entries", "Festival calendar", "10 AI queries/month", "500MB storage"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13, color: C.charcoal }}>
                    <span style={{ color: C.forest, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                {["Voice memos", "Unlimited rituals"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13, color: "#ccc" }}>
                    <span style={{ color: "#ddd" }}>✗</span><span style={{ textDecoration: "line-through" }}>{f}</span>
                  </div>
                ))}
                <Link href="/auth/signup" style={{ display: "block", textAlign: "center", marginTop: 28, padding: "13px", border: `1.5px solid ${C.saffron}`, borderRadius: 12, fontSize: 14, fontWeight: 600, color: C.saffron, textDecoration: "none" }}>
                  Get started free
                </Link>
              </div>

              {/* Pro — Featured */}
              <div style={{ background: C.charcoal, borderRadius: 24, padding: "40px 36px", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.2)", transform: "translateY(-8px)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "24px 24px 0 0", background: "linear-gradient(90deg,#C8541A,#B8922A,#C8541A)" }} />
                <div style={{ position: "absolute", top: 20, right: 20, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "5px 12px", borderRadius: 20, textTransform: "uppercase" }}>Most Popular</div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Pro</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: F.display, fontSize: 52, fontWeight: 700, color: C.white }}>$5</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/month</span>
                </div>
                <p style={{ fontSize: 12, color: C.goldBright, marginBottom: 6, fontWeight: 500 }}>or $50/year — save 2 months 🎉</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.6 }}>The complete heritage platform for your entire family, forever.</p>
                {["Unlimited family members", "Unlimited rituals", "Full festival calendar + reminders", "Unlimited AI queries", "10GB media storage", "Voice memo recording", "PDF legacy book export", "Priority support"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                    <span style={{ color: C.saffronMid, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/auth/signup?plan=pro" style={{ display: "block", textAlign: "center", marginTop: 28, padding: "14px", background: "linear-gradient(135deg,#C8541A,#B8922A)", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 8px 24px rgba(200,84,26,0.4)", letterSpacing: "0.3px" }}>
                  Start Pro — $5/month
                </Link>
                <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 10 }}>Powered by Stripe · Cancel anytime</p>
              </div>

              {/* Family / Custom */}
              <div style={{ background: C.white, borderRadius: 24, border: `1px solid ${C.border}`, padding: 36 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.gray, marginBottom: 12 }}>Family / Custom</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                  <span style={{ fontFamily: F.display, fontSize: 36, fontWeight: 700, color: C.charcoal }}>Custom</span>
                </div>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 32, lineHeight: 1.6 }}>For large families, temples, cultural organisations and community groups.</p>
                {["Everything in Pro", "Up to 50 members", "Custom branding", "Dedicated support", "Bulk ritual import", "Community features", "API access"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13, color: C.charcoal }}>
                    <span style={{ color: C.gold, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <a href="mailto:hello@parampara.app" style={{ display: "block", textAlign: "center", marginTop: 28, padding: "13px", border: `1.5px solid ${C.gold}`, borderRadius: 12, fontSize: 14, fontWeight: 600, color: C.gold, textDecoration: "none" }}>
                  Talk to us →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section id="testimonials" style={{ padding: "110px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>Testimonials</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                Families love Parampara
              </h2>
            </div>

            {/* Featured testimonial */}
            <div style={{ background: C.charcoal, borderRadius: 24, padding: "56px 64px", marginBottom: 32, position: "relative", overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#B8922A,transparent)" }} />
              <p style={{ fontSize: 64, color: C.gold, lineHeight: 0.8, marginBottom: 24, fontFamily: F.display }}>❝</p>
              <p style={{ fontFamily: F.display, fontSize: "clamp(18px,2.5vw,26px)", color: C.white, lineHeight: 1.7, fontStyle: "italic", maxWidth: 700, margin: "0 auto 32px" }}>
                {TESTIMONIALS[activeTestimonial].text}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#C8541A,#B8922A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" }}>
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.white, margin: 0 }}>{TESTIMONIALS[activeTestimonial].name}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>{TESTIMONIALS[activeTestimonial].role}</p>
                </div>
              </div>
              {/* Dots */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === activeTestimonial ? C.saffron : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
              {TESTIMONIALS.map(({ name, role, text, initials }, i) => (
                <div key={name} onClick={() => setActiveTestimonial(i)} style={{ background: C.white, borderRadius: 16, padding: 24, border: `1px solid ${i === activeTestimonial ? C.saffron : C.border}`, cursor: "pointer", transition: "all 0.2s" }}>
                  <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>&ldquo;{text.slice(0, 80)}…&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.saffronLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.saffron, flexShrink: 0 }}>{initials}</div>
                    <div><p style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, margin: 0 }}>{name}</p><p style={{ fontSize: 11, color: C.gray, margin: 0 }}>{role}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" style={{ padding: "110px 24px", background: C.cream }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>FAQ</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                Questions &amp; answers
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQS.map(({ q, a }, i) => (
                <div key={i} style={{ background: C.white, borderRadius: 16, border: `1px solid ${activeFAQ === i ? C.saffron : C.border}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.charcoal, fontFamily: F.sans }}>{q}</span>
                    <span style={{ fontSize: 20, color: activeFAQ === i ? C.saffron : C.gray, transition: "transform 0.2s", transform: activeFAQ === i ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
                  </button>
                  {activeFAQ === i && (
                    <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                      <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.8 }}>{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section style={{ padding: "110px 24px", position: "relative", overflow: "hidden", background: C.charcoal }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.flowers})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(200,84,26,0.15),transparent 70%)" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <p style={{ fontFamily: F.display, fontSize: 48, marginBottom: 20 }}>🪔</p>
            <h2 style={{ fontFamily: F.display, fontSize: "clamp(32px,5vw,60px)", fontWeight: 600, color: C.white, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.5px" }}>
              Begin preserving your<br />
              <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#D4A843,#C8541A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                family's legacy today
              </em>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginBottom: 48, lineHeight: 1.7 }}>
              Free to start. Takes 2 minutes.<br />Your grandchildren will thank you.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", padding: "18px 48px", borderRadius: 16, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 12px 40px rgba(200,84,26,0.5)", letterSpacing: "0.3px" }}>
                Create Family Space →
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: C.white, padding: "18px 36px", borderRadius: 16, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
                Talk to Expert
              </Link>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 24 }}>परंपरा — tradition, heritage, legacy</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

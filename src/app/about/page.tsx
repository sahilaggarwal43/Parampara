import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import { C, F, IMGS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us | Parampara" };

const TEAM = [
  { name: "Arjun Sharma", role: "Founder & CEO", bio: "3rd gen Delhi family, IIT Delhi CS. Watched his dadi's rituals die with her. Built Parampara so no family faces that loss.", img: IMGS.team1 },
  { name: "Priya Nair", role: "Head of Culture", bio: "Bharatanatyam dancer, Sanskrit scholar. Ensures every ritual documented on Parampara is culturally authentic.", img: IMGS.team2 },
  { name: "Vikram Patel", role: "Head of Technology", bio: "AI researcher from IISc Bangalore. Leads the AI Ritual Assistant, ensuring it's both intelligent and culturally respectful.", img: IMGS.team3 },
];

const VALUES = [
  { icon: "🕉️", title: "Authenticity First", desc: "Every ritual, every mantra, every step — verified by cultural scholars and practitioners before it enters our platform." },
  { icon: "🤝", title: "Family is Everything", desc: "We build for three generations simultaneously — simple enough for your 75-year-old dadi, engaging for your 12-year-old grandchild." },
  { icon: "🔐", title: "Privacy Always", desc: "Your family's traditions are sacred and private. We will never sell your data or monetise your heritage." },
  { icon: "🌍", title: "For the Diaspora", desc: "Built especially for Indian families across the US, UK, Canada, Australia and beyond — keeping roots alive across oceans." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 100, background: C.dark, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.about})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(15,15,16,0.7),rgba(15,15,16,0.95))" }} />
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px", textAlign: "center", position: "relative" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>Our Story</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(40px,6vw,72px)", fontWeight: 600, color: C.white, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px" }}>
              Why we built<br /><em style={{ fontStyle: "italic", color: C.saffronMid }}>Parampara</em>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              A mission born from loss — and the determination to ensure no family ever has to experience it.
            </p>
          </div>
        </section>

        {/* Story */}
        <section style={{ padding: "100px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 16 }}>The Story</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.2, marginBottom: 28, letterSpacing: "-0.5px" }}>
                It started with a Namkaran ceremony — and a realisation
              </h2>
              <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.9, marginBottom: 20 }}>
                In 2023, our founder Arjun was trying to perform his niece&apos;s Namkaran ceremony in Delhi. His dadi, who had performed dozens of these, had passed away the previous year. No one in the family could agree on the correct steps. The priest had his version. The aunts had another.
              </p>
              <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.9, marginBottom: 20 }}>
                The ceremony happened — but something felt lost. Three months of research later, Arjun found 23 variations of Namkaran across North India alone. None written down. All in the heads of elders.
              </p>
              <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.9 }}>
                <strong style={{ color: C.charcoal }}>Parampara was born from this pain.</strong> The belief that every family&apos;s unique way of performing rituals — the specific words, the exact flowers, the order of steps — deserves to be preserved, not lost.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5" }}>
                <img src={IMGS.puja} alt="Ritual ceremony" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "linear-gradient(135deg,#C8541A,#B8922A)", borderRadius: 16, padding: "20px 24px", color: "#fff" }}>
                <p style={{ fontFamily: F.display, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>2023</p>
                <p style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Founded in Delhi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ padding: "100px 24px", background: C.cream }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {[
                { label: "Our Mission", icon: "🎯", text: "To give every Indian and South Asian family a permanent digital home for their cultural heritage — so traditions live beyond the memories of individuals." },
                { label: "Our Vision", icon: "🌟", text: "A world where every family, regardless of geography or generation, can access, perform, and pass down their complete cultural heritage with confidence and joy." },
              ].map(({ label, icon, text }) => (
                <div key={label} style={{ background: C.white, borderRadius: 24, padding: 48, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.saffron}` }}>
                  <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>{label}</p>
                  <p style={{ fontFamily: F.serif, fontSize: 20, color: C.charcoal, lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "100px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>What We Stand For</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: C.charcoal }}>Our values</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} style={{ background: C.white, borderRadius: 20, padding: 32, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontFamily: F.serif, fontSize: 18, fontWeight: 600, color: C.charcoal, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: "100px 24px", background: C.cream }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 14 }}>The Team</p>
              <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: C.charcoal }}>Who builds Parampara</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 28 }}>
              {TEAM.map(({ name, role, bio, img }) => (
                <div key={name} style={{ background: C.white, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ height: 240, overflow: "hidden" }}>
                    <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  </div>
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontFamily: F.serif, fontSize: 18, fontWeight: 600, color: C.charcoal, marginBottom: 4 }}>{name}</h3>
                    <p style={{ fontSize: 12, fontWeight: 600, color: C.saffron, marginBottom: 12, letterSpacing: 0.5 }}>{role}</p>
                    <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>{bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", background: C.charcoal, textAlign: "center" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: C.white, marginBottom: 16 }}>Join our mission</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 36 }}>Help us preserve India&apos;s cultural heritage, one family at a time.</p>
          <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", padding: "16px 40px", borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 32px rgba(200,84,26,0.4)" }}>
            Start for Free →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

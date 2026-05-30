"use client";
import { useState } from "react";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { C, F } from "@/lib/constants";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours. 🙏");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
  }

  const inp = { width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontFamily: F.sans, background: C.ivory, color: C.charcoal, outline: "none", boxSizing: "border-box" as const };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 80, background: C.ivory, textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.saffron, marginBottom: 16 }}>Get In Touch</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,5vw,64px)", fontWeight: 600, color: C.charcoal, lineHeight: 1.12, marginBottom: 20, letterSpacing: "-1px" }}>
              We&apos;d love to hear<br /><em style={{ fontStyle: "italic", color: C.saffronMid }}>from you</em>
            </h1>
            <p style={{ fontSize: 16, color: C.gray, lineHeight: 1.8 }}>
              Whether you have a question, need help, or want to share your family&apos;s story — we&apos;re here.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section style={{ padding: "60px 24px 100px", background: C.cream }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>

            {/* Contact info */}
            <div>
              <h2 style={{ fontFamily: F.serif, fontSize: 26, fontWeight: 600, color: C.charcoal, marginBottom: 32 }}>Talk to us</h2>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, background: "#25D366", borderRadius: 16, padding: "18px 24px", marginBottom: 20, textDecoration: "none", boxShadow: "0 8px 24px rgba(37,211,102,0.25)" }}>
                <span style={{ fontSize: 28 }}>💬</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: 0 }}>WhatsApp Us</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0 }}>Fastest response · Usually within an hour</p>
                </div>
              </a>

              {[
                ["📧", "Email", "hello@parampara.app", "mailto:hello@parampara.app"],
                ["📱", "Phone", "+91 98765 43210", "tel:+919876543210"],
                ["📍", "Address", "Connaught Place, New Delhi 110001", "#"],
                ["⏰", "Hours", "Monday–Saturday, 9AM–7PM IST", "#"],
              ].map(([icon, label, value, href]) => (
                <a key={label as string} href={href as string} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 20px", background: C.white, borderRadius: 12, marginBottom: 10, border: `1px solid ${C.border}`, textDecoration: "none" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: C.saffron, margin: 0, marginBottom: 3 }}>{label as string}</p>
                    <p style={{ fontSize: 14, color: C.charcoal, margin: 0 }}>{value as string}</p>
                  </div>
                </a>
              ))}

              {/* Map placeholder */}
              <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", background: C.goldLight, border: `1px solid ${C.border}`, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 32, marginBottom: 8 }}>📍</p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: C.charcoal }}>New Delhi, India</p>
                  <a href="https://maps.google.com/?q=Connaught+Place+New+Delhi" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: C.saffron, marginTop: 6, display: "block" }}>Open in Google Maps →</a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div style={{ background: C.white, borderRadius: 24, padding: 48, border: `1px solid ${C.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontFamily: F.serif, fontSize: 24, fontWeight: 600, color: C.charcoal, marginBottom: 8 }}>Send a message</h2>
              <p style={{ fontSize: 14, color: C.gray, marginBottom: 32 }}>We respond to every message within 24 hours.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, display: "block", marginBottom: 6 }}>Full name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required style={inp} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, display: "block", marginBottom: 6 }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@family.com" required style={inp} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, display: "block", marginBottom: 6 }}>Phone (optional)</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" style={inp} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, display: "block", marginBottom: 6 }}>Subject *</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required style={inp}>
                    <option value="">Select a topic…</option>
                    {["General enquiry","Pricing & plans","Technical support","Partnership","Press","Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, display: "block", marginBottom: 6 }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help…" rows={5} required style={{ ...inp, resize: "vertical", minHeight: 120 }} />
                </div>
                <button type="submit" disabled={sending} style={{ background: "linear-gradient(135deg,#C8541A,#B8922A)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: F.sans, boxShadow: "0 8px 24px rgba(200,84,26,0.3)", letterSpacing: "0.3px" }}>
                  {sending ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

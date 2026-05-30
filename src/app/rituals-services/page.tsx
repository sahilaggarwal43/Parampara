import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import { C, F, IMGS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rituals & Services | Parampara" };

const RITUALS = [
  { name: "Namkaran", sub: "Naming Ceremony", emoji: "👶", desc: "The sacred ritual of formally naming your child, performed 10–12 days after birth with priest, nakshatra guidance, and family blessings.", img: IMGS.puja },
  { name: "Annaprashan", sub: "First Rice Feeding", emoji: "🍚", desc: "Your child's first solid food ceremony — a joyful milestone celebrating the beginning of a new chapter of growth.", img: IMGS.flowers },
  { name: "Mundan", sub: "First Haircut", emoji: "✂️", desc: "The sacred tonsure ceremony, believed to rid the child of past-life influences and bless them with new beginnings.", img: IMGS.havan },
  { name: "Yagnopavitam", sub: "Thread Ceremony", emoji: "🧵", desc: "The sacred thread ceremony marking a boy's initiation into Vedic education and spiritual life — Upanayana.", img: IMGS.ritual },
  { name: "Vivah", sub: "Wedding Ceremony", emoji: "💒", desc: "Complete Vedic wedding rituals from Ganesh puja to Saptapadi — fully documented for every step.", img: IMGS.wedding },
  { name: "Griha Pravesh", sub: "Housewarming", emoji: "🏠", desc: "Vastu puja and housewarming ceremony for new homes with muhurat guidance and complete samagri list.", img: IMGS.temple },
  { name: "Satyanarayan Katha", sub: "Monthly Vrat", emoji: "🙏", desc: "The beloved monthly katha and puja to Lord Satyanarayan — with complete steps and prasad recipe.", img: IMGS.incense },
  { name: "Shraddha", sub: "Ancestor Rituals", emoji: "🕊️", desc: "Pitru paksha and ancestor remembrance rituals — documented with respect and cultural depth.", img: IMGS.diya },
];

export default function RitualsServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 80, background: C.charcoal, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMGS.rangoli})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
          <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>Sacred Knowledge</p>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(38px,5vw,68px)", fontWeight: 600, color: C.white, lineHeight: 1.12, marginBottom: 24, letterSpacing: "-1px" }}>
              Rituals &amp; Ceremonies
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
              From birth to beyond — all 16 samskaras and every major Hindu ceremony, documented with cultural depth and AI guidance.
            </p>
          </div>
        </section>

        <section style={{ padding: "90px 24px", background: C.ivory }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
              {RITUALS.map(({ name, sub, emoji, desc, img }) => (
                <Link key={name} href="/dashboard" style={{ textDecoration: "none" }}>
                  <div style={{ background: C.white, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.25s" }} className="hover-lift">
                    <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                      <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,15,16,0.6),transparent)" }} />
                      <div style={{ position: "absolute", bottom: 12, left: 16 }}>
                        <span style={{ fontSize: 28 }}>{emoji}</span>
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.charcoal, marginBottom: 4 }}>{name}</h3>
                      <p style={{ fontSize: 12, fontWeight: 600, color: C.saffron, marginBottom: 10, letterSpacing: 0.5 }}>{sub}</p>
                      <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#C8541A,#8B3A10)", textAlign: "center" }}>
          <h2 style={{ fontFamily: F.display, fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: C.white, marginBottom: 16 }}>Don&apos;t see your ritual?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Document any custom ritual on Parampara — our platform supports every tradition.</p>
          <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.white, color: C.saffron, padding: "15px 36px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
            Document your ritual →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

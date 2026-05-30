import AppShell from "@/components/layout/AppShell";
import { DEMO_RITUALS, DEMO_FESTIVALS } from "@/lib/data";
import { daysUntil } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | Parampara" };

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };

export default function DashboardPage() {
  const upcoming = DEMO_FESTIVALS.map(f=>({...f,days:daysUntil(f.date)})).filter(f=>f.days>=0).sort((a,b)=>a.days-b.days).slice(0,3);

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:960, margin:"0 auto" }} className="animate-fade">
        {/* Welcome */}
        <div style={{ marginBottom:24 }}>
          <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>Namaste, Sharma Family 🙏</h1>
          <p style={{ fontSize:13, color:C.gray, marginTop:4 }}>Your traditions are safe here.</p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12, marginBottom:24 }}>
          {[
            { label:"Rituals documented", value:"14", sub:"+2 this month" },
            { label:"Family members", value:"8", sub:"across 4 cities" },
            { label:"Memories uploaded", value:"47", sub:"photos, audio, video" },
            { label:"Next festival", value:upcoming[0]?.name?.split(" ")[0]||"—", sub:`in ${upcoming[0]?.days||"—"} days` },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:"16px 20px" }}>
              <p style={{ fontSize:11, color:C.gray, margin:0, marginBottom:4 }}>{label}</p>
              <p style={{ fontFamily:F.serif, fontSize:24, fontWeight:500, color:C.charcoal, margin:0 }}>{value}</p>
              <p style={{ fontSize:11, color:C.gray, margin:0, marginTop:2 }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:20 }}>
          {/* Recent rituals */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <h2 style={{ fontFamily:F.serif, fontSize:17, fontWeight:500, color:C.charcoal, margin:0 }}>Recent Rituals</h2>
              <Link href="/rituals" style={{ fontSize:12, color:C.saffron, textDecoration:"none" }}>View all →</Link>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {DEMO_RITUALS.map(r => (
                <Link key={r.id} href={`/rituals/${r.id}`} style={{ textDecoration:"none" }}>
                  <div className="hover-card" style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, borderLeft:`3px solid ${C.saffron}`, padding:"14px 16px", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                      <div>
                        <p style={{ fontSize:14, fontWeight:500, color:C.charcoal, margin:0 }}>{r.name}</p>
                        <p style={{ fontSize:12, color:C.gray, margin:0, marginTop:2 }}>{r.subtitle}</p>
                      </div>
                      <span style={{ fontSize:11, fontWeight:500, background:C.saffronLight, color:C.saffron, padding:"3px 10px", borderRadius:20, border:`1px solid rgba(212,98,42,0.2)`, flexShrink:0 }}>{r.category}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:8, fontSize:11, color:C.gray }}>
                      <span>{r.religion.join(", ")}</span>
                      <span>·</span>
                      <span>{r.steps.length} steps</span>
                      <span style={{ marginLeft:"auto", color:C.forest, fontWeight:500 }}>✓ {r.performedCount}× performed</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming festivals */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <h2 style={{ fontFamily:F.serif, fontSize:17, fontWeight:500, color:C.charcoal, margin:0 }}>Upcoming Festivals</h2>
              <Link href="/festivals" style={{ fontSize:12, color:C.saffron, textDecoration:"none" }}>Calendar →</Link>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {upcoming.map(f => {
                const d = new Date(f.date);
                return (
                  <Link key={f.id} href="/festivals" style={{ textDecoration:"none" }}>
                    <div className="hover-card" style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:"14px 16px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ width:48, height:48, borderRadius:10, background:C.saffronLight, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid rgba(212,98,42,0.15)` }}>
                        <span style={{ fontFamily:F.serif, fontSize:18, fontWeight:600, color:C.saffron, lineHeight:1 }}>{d.getDate()}</span>
                        <span style={{ fontSize:9, color:C.saffron, textTransform:"uppercase", letterSpacing:0.5 }}>{d.toLocaleString("en-IN",{month:"short"})}</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:14, fontWeight:500, color:C.charcoal, margin:0 }}>{f.name}</p>
                        <p style={{ fontSize:11, color:C.gray, margin:0, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.significance.slice(0,65)}…</p>
                      </div>
                      <span style={{ background:C.forestLight, color:C.forest, fontSize:11, fontWeight:500, padding:"3px 8px", borderRadius:20, border:`1px solid rgba(15,110,86,0.2)`, flexShrink:0 }}>{f.days}d</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* AI promo */}
            <div style={{ marginTop:12, background:"linear-gradient(135deg,#FDF0E8,#FDF6ED)", border:`1px solid rgba(212,98,42,0.2)`, borderRadius:12, padding:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontSize:16 }}>✨</span>
                <span style={{ fontSize:13, fontWeight:500, color:C.charcoal }}>AI Ritual Assistant</span>
              </div>
              <p style={{ fontSize:12, color:C.gray, marginBottom:12 }}>Ask about any ritual, generate samagri lists, or find missing steps.</p>
              <Link href="/ai" style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:500, textDecoration:"none" }}>
                Open AI Assistant →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

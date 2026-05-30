import AppShell from "@/components/layout/AppShell";
import { DEMO_RITUALS } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ritual Vault | Parampara" };
const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif" };

export default function RitualsPage() {
  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:800, margin:"0 auto" }} className="animate-fade">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>Ritual Vault</h1>
            <p style={{ fontSize:13, color:C.gray, marginTop:4 }}>{DEMO_RITUALS.length} rituals documented</p>
          </div>
          <Link href="/rituals/new" style={{ display:"flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:500, textDecoration:"none" }}>
            + Document Ritual
          </Link>
        </div>

        {/* Filter chips */}
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {["All","Birth","Naming","Housewarming","Marriage","Festival","Annual Tradition"].map((cat,i) => (
            <button key={cat} style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:500, border:`1px solid ${i===0?"#D4622A":"rgba(212,98,42,0.2)"}`, background:i===0?C.saffron:C.white, color:i===0?"#fff":C.gray, cursor:"pointer" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {DEMO_RITUALS.map(r => (
            <Link key={r.id} href={`/rituals/${r.id}`} style={{ textDecoration:"none" }}>
              <div className="hover-card" style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, borderLeft:`3px solid ${C.saffron}`, padding:"18px 20px", cursor:"pointer", transition:"all 0.15s" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <h2 style={{ fontFamily:F.serif, fontSize:17, fontWeight:500, color:C.charcoal, margin:0 }}>{r.name}</h2>
                      {r.isTemplate && <span style={{ fontSize:10, background:C.forestLight, color:C.forest, padding:"2px 6px", borderRadius:4, border:`1px solid rgba(15,110,86,0.2)` }}>template</span>}
                    </div>
                    <p style={{ fontSize:13, color:C.gray, margin:0 }}>{r.subtitle}</p>
                  </div>
                  <span style={{ fontSize:11, fontWeight:500, background:C.saffronLight, color:C.saffron, padding:"4px 10px", borderRadius:20, border:`1px solid rgba(212,98,42,0.2)`, flexShrink:0 }}>{r.category}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:10, fontSize:11, color:C.gray, flexWrap:"wrap" }}>
                  <span>🕉 {r.religion.join(", ")}</span>
                  <span>·</span>
                  <span>📍 {r.region}</span>
                  <span>·</span>
                  <span>{r.steps.length} steps</span>
                  <span>·</span>
                  <span>{r.samagri.length} samagri items</span>
                  <span style={{ marginLeft:"auto", color:C.forest, fontWeight:500 }}>✓ {r.performedCount}× performed</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

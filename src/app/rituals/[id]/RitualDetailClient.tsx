"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Sparkles, List, BookOpen, Music } from "lucide-react";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif", dev:"'Noto Serif Devanagari',serif" };

type Ritual = {
  id:string; name:string; subtitle:string; category:string;
  religion:string[]; region:string; language:string; performedCount:number;
  steps:string[]; samagri:{item:string;quantity:string;purpose:string}[];
  mantras:{devanagari:string;transliteration:string;meaning:string}[];
  elderNotes:string; preparationDays:number; isTemplate:boolean;
};

export default function RitualDetailClient({ ritual }: { ritual: Ritual }) {
  const [tab, setTab] = useState<"steps"|"samagri"|"mantras"|"ai">("steps");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const [performed, setPerformed] = useState(false);

  function toggleCheck(i: number) {
    setChecked(prev => { const n=new Set(prev); n.has(i)?n.delete(i):n.add(i); return n; });
  }

  async function loadAI() {
    setTab("ai");
    if (aiText) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/explain-ritual", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ritualName:ritual.name, religion:ritual.religion[0], region:ritual.region }) });
      const data = await res.json();
      setAiText(data.explanation || data.error || "Could not load explanation.");
    } catch { setAiText("Unable to connect. Please check your API key in Vercel settings."); }
    setAiLoading(false);
  }

  const tabs = [
    { id:"steps", label:"Steps", icon:List },
    { id:"samagri", label:"Samagri", icon:BookOpen },
    { id:"mantras", label:"Mantras", icon:Music },
    { id:"ai", label:"AI Insight", icon:Sparkles },
  ] as const;

  return (
    <div style={{ padding:24, maxWidth:720, margin:"0 auto" }} className="animate-fade">
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:20 }}>
        <Link href="/rituals" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, borderRadius:8, border:`1px solid ${C.saffronMid}`, background:C.white, flexShrink:0, marginTop:2 }}>
          <ArrowLeft size={16} color={C.gray} />
        </Link>
        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:F.serif, fontSize:22, fontWeight:600, color:C.charcoal, margin:0 }}>{ritual.name}</h1>
          <p style={{ fontSize:13, color:C.gray, margin:0, marginTop:3 }}>{ritual.subtitle}</p>
        </div>
        <button onClick={() => { setPerformed(true); toast.success(`${ritual.name} marked as performed! 🙏`); }}
          style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, fontSize:12, fontWeight:500, border:`1px solid ${performed?C.forest:C.saffron}`, background:performed?C.forestLight:C.saffron, color:performed?C.forest:"#fff", cursor:"pointer", flexShrink:0 }}>
          <CheckCircle size={14} />
          {performed ? "Performed ✓" : "Mark performed"}
        </button>
      </div>

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
        {[
          { label:ritual.category, bg:C.saffronLight, color:C.saffron, border:"rgba(212,98,42,0.2)" },
          ...ritual.religion.map(r=>({ label:r, bg:C.forestLight, color:C.forest, border:"rgba(15,110,86,0.2)" })),
          { label:`📍 ${ritual.region}`, bg:C.white, color:C.gray, border:C.saffronMid },
          { label:`🗣 ${ritual.language}`, bg:C.white, color:C.gray, border:C.saffronMid },
          { label:`📅 Prepare ${ritual.preparationDays} days ahead`, bg:C.white, color:C.gray, border:C.saffronMid },
        ].map((t,i) => (
          <span key={i} style={{ fontSize:11, fontWeight:500, background:t.bg, color:t.color, padding:"4px 10px", borderRadius:20, border:`1px solid ${t.border}` }}>{t.label}</span>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, background:C.white, borderRadius:12, padding:4, border:`1px solid ${C.saffronMid}`, marginBottom:20 }}>
        {tabs.map(({ id, label, icon:Icon }) => (
          <button key={id} onClick={() => id==="ai" ? loadAI() : setTab(id as typeof tab)}
            style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px 12px", borderRadius:8, fontSize:12, fontWeight:500, border:"none", cursor:"pointer", transition:"all 0.15s",
              background:tab===id?C.saffron:"transparent", color:tab===id?"#fff":C.gray }}>
            <Icon size={13} />{label}
          </button>
        ))}
      </div>

      {/* Steps tab */}
      {tab==="steps" && (
        <div className="animate-up">
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20, marginBottom:16 }}>
            <p style={{ fontSize:12, color:C.gray, marginBottom:16 }}>Performed 10–12 days after birth. Officiated by the family priest.</p>
            <ol style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
              {ritual.steps.map((step, i) => (
                <li key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <span style={{ width:26, height:26, borderRadius:"50%", background:C.saffronLight, border:`1px solid rgba(212,98,42,0.2)`, color:C.saffron, fontSize:11, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</span>
                  <span style={{ fontSize:13, color:C.charcoal, lineHeight:1.6, paddingTop:4 }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {ritual.elderNotes && (
            <div style={{ background:C.saffronLight, border:`1px solid rgba(212,98,42,0.2)`, borderRadius:12, padding:16 }}>
              <p style={{ fontSize:12, fontWeight:500, color:C.saffron, marginBottom:8 }}>📜 Elder&apos;s Notes</p>
              <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.7, fontStyle:"italic" }}>&ldquo;{ritual.elderNotes}&rdquo;</p>
            </div>
          )}
        </div>
      )}

      {/* Samagri tab */}
      {tab==="samagri" && (
        <div className="animate-up">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <p style={{ fontSize:12, color:C.gray }}>{ritual.samagri.length} items · tap to check off</p>
            <span style={{ fontSize:12, color:C.forest, fontWeight:500 }}>{checked.size}/{ritual.samagri.length} ready</span>
          </div>
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, overflow:"hidden" }}>
            {ritual.samagri.map((s, i) => (
              <div key={i} onClick={() => toggleCheck(i)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", cursor:"pointer", borderBottom:i<ritual.samagri.length-1?`1px solid ${C.saffronMid}`:"none", background:"transparent", transition:"background 0.1s" }}
                className="hover-lift">
                <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${checked.has(i)?C.forest:"#ddd"}`, background:checked.has(i)?C.forest:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  {checked.has(i) && <span style={{ color:"#fff", fontSize:10 }}>✓</span>}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:500, color:checked.has(i)?C.gray:C.charcoal, margin:0, textDecoration:checked.has(i)?"line-through":"none" }}>{s.item}</p>
                  <p style={{ fontSize:11, color:C.gray, margin:0 }}>{s.purpose}</p>
                </div>
                <span style={{ fontSize:11, fontWeight:500, background:C.saffronLight, color:C.saffron, padding:"3px 8px", borderRadius:6, flexShrink:0 }}>{s.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mantras tab */}
      {tab==="mantras" && (
        <div className="animate-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {ritual.mantras.length===0 ? (
            <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:32, textAlign:"center", color:C.gray, fontSize:13 }}>
              No mantras documented yet. Ask your family priest to share them.
            </div>
          ) : ritual.mantras.map((m, i) => (
            <div key={i} style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }}>
              <p style={{ fontFamily:F.dev, fontSize:18, color:C.charcoal, lineHeight:1.9, marginBottom:10 }}>{m.devanagari}</p>
              <p style={{ fontSize:13, color:C.saffron, fontStyle:"italic", marginBottom:8 }}>{m.transliteration}</p>
              <div style={{ borderTop:`1px solid ${C.saffronMid}`, paddingTop:10 }}>
                <p style={{ fontSize:12, color:C.gray, lineHeight:1.6 }}>{m.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI tab */}
      {tab==="ai" && (
        <div className="animate-up">
          <div style={{ background:"linear-gradient(135deg,#FDF0E8,#FDF6ED)", border:`1px solid rgba(212,98,42,0.2)`, borderRadius:12, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <Sparkles size={16} color={C.saffron} />
              <span style={{ fontSize:14, fontWeight:500, color:C.charcoal }}>AI Cultural Insight — {ritual.name}</span>
            </div>
            {aiLoading ? (
              <div>
                {[90,75,85,60,80].map((w,i) => (
                  <div key={i} className="skeleton" style={{ height:12, width:`${w}%`, marginBottom:8 }} />
                ))}
                <p style={{ fontSize:12, color:C.gray, marginTop:8 }} className="ai-cursor">Consulting cultural knowledge</p>
              </div>
            ) : aiText ? (
              <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{aiText}</p>
            ) : (
              <p style={{ fontSize:13, color:C.gray }}>Loading cultural context from Claude…</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

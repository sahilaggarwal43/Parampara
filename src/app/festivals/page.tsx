"use client";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { DEMO_FESTIVALS } from "@/lib/data";
import { daysUntil } from "@/lib/utils";
import { Bell, BellOff, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };

export default function FestivalsPage() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const [reminders, setReminders] = useState<Set<string>>(new Set(["guru-purnima"]));

  const festivals = DEMO_FESTIVALS.map(f=>({...f,days:daysUntil(f.date)})).sort((a,b)=>a.days-b.days);

  function toggleReminder(id: string) {
    setReminders(prev => {
      const n=new Set(prev); n.has(id)?n.delete(id):n.add(id);
      toast.success(n.has(id)?"Reminder set! 🔔":"Reminder removed");
      return n;
    });
  }

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:760, margin:"0 auto" }} className="animate-fade">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>Festival Calendar</h1>
            <p style={{ fontSize:13, color:C.gray, marginTop:4 }}>Hindu festivals · 2026 · North India</p>
          </div>
          <button style={{ display:"flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"9px 16px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
            + Custom Festival
          </button>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {festivals.map(f => {
            const d = new Date(f.date);
            const isExpanded = expanded === f.id;
            const isPast = f.days < 0;
            const isReminded = reminders.has(f.id);
            const isToday = f.days === 0;

            return (
              <div key={f.id} style={{ background:C.white, borderRadius:12, border:`1px solid ${isPast?"rgba(0,0,0,0.06)":C.saffronMid}`, opacity:isPast?0.6:1, overflow:"hidden" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:16, cursor:"pointer" }} onClick={()=>setExpanded(isExpanded?null:f.id)}>
                  <div style={{ width:52, height:52, borderRadius:10, background:C.saffronLight, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid rgba(212,98,42,0.15)` }}>
                    <span style={{ fontFamily:F.serif, fontSize:20, fontWeight:600, color:C.saffron, lineHeight:1 }}>{d.getDate()}</span>
                    <span style={{ fontSize:9, color:C.saffron, textTransform:"uppercase", letterSpacing:0.5, marginTop:1 }}>{d.toLocaleString("en-IN",{month:"short"})}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:F.serif, fontSize:16, fontWeight:500, color:C.charcoal, margin:0 }}>{f.name}</p>
                    <p style={{ fontSize:12, color:C.gray, margin:0, marginTop:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.significance.slice(0,80)}…</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                    {!isPast && (
                      <span style={{ background:isToday?"#D4622A":C.forestLight, color:isToday?"#fff":C.forest, fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, border:`1px solid ${isToday?"transparent":"rgba(15,110,86,0.2)"}` }}>
                        {isToday?"Today!":f.days+"d"}
                      </span>
                    )}
                    <button onClick={e=>{e.stopPropagation();toggleReminder(f.id);}} style={{ padding:6, borderRadius:7, border:`1px solid ${isReminded?"rgba(212,98,42,0.3)":"rgba(0,0,0,0.08)"}`, background:isReminded?C.saffronLight:C.white, cursor:"pointer", display:"flex", alignItems:"center" }}>
                      {isReminded?<Bell size={14} color={C.saffron}/>:<BellOff size={14} color={C.gray}/>}
                    </button>
                    {isExpanded?<ChevronUp size={15} color={C.gray}/>:<ChevronDown size={15} color={C.gray}/>}
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding:"0 16px 16px", borderTop:`1px solid ${C.saffronMid}`, paddingTop:16 }} className="animate-up">
                    <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.7, marginBottom:16 }}>{f.significance}</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                      <div>
                        <p style={{ fontSize:12, fontWeight:500, color:C.charcoal, marginBottom:10 }}>Ritual Steps</p>
                        <ol style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:6 }}>
                          {f.ritualSteps.map((s,i) => (
                            <li key={i} style={{ display:"flex", gap:8, fontSize:12, color:C.gray, alignItems:"flex-start" }}>
                              <span style={{ width:18, height:18, borderRadius:"50%", background:C.saffronLight, color:C.saffron, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:9, fontWeight:500 }}>{i+1}</span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p style={{ fontSize:12, fontWeight:500, color:C.charcoal, marginBottom:8 }}>Samagri needed</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                          {f.samagri.map((s,i) => (
                            <span key={i} style={{ fontSize:11, background:C.saffronLight, color:C.saffron, padding:"3px 8px", borderRadius:6, border:`1px solid rgba(212,98,42,0.2)` }}>{s}</span>
                          ))}
                        </div>
                        <p style={{ fontSize:12, fontWeight:500, color:C.charcoal, marginBottom:6 }}>Food & prasad</p>
                        <p style={{ fontSize:12, color:C.gray, lineHeight:1.6 }}>{f.food}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

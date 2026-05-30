"use client";
import { useState, useRef } from "react";
import AppShell from "@/components/layout/AppShell";
import { Upload, Mic, Square, Heart, Image, Video, Music } from "lucide-react";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };

const MEDIA = [
  { id:"1", type:"photo", emoji:"🌅", label:"Namkaran 2023", ritual:"Namkaran", reactions:5 },
  { id:"2", type:"photo", emoji:"🏠", label:"Griha Pravesh", ritual:"Griha Pravesh", reactions:12 },
  { id:"3", type:"audio", emoji:"🎙", label:"Dadi's voice note", ritual:"General", reactions:8 },
  { id:"4", type:"video", emoji:"🎬", label:"Mundan ceremony", ritual:"Mundan", reactions:7 },
  { id:"5", type:"photo", emoji:"🪔", label:"Diwali 2024", ritual:"Diwali", reactions:18 },
  { id:"6", type:"photo", emoji:"🌸", label:"Karva Chauth", ritual:"Karva Chauth", reactions:9 },
  { id:"7", type:"audio", emoji:"🕉", label:"Mantra recording", ritual:"Namkaran", reactions:3 },
  { id:"8", type:"photo", emoji:"🎨", label:"Holi with family", ritual:"Holi", reactions:21 },
  { id:"9", type:"video", emoji:"💃", label:"Navratri garba", ritual:"Navratri", reactions:14 },
];

export default function MediaPage() {
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string|null>(null);
  const timerRef = useRef<NodeJS.Timeout|null>(null);

  function toggleRecord() {
    if (recording) {
      clearInterval(timerRef.current!);
      setRecording(false); setRecTime(0);
      toast.success("Voice memo saved! 🎙");
    } else {
      setRecording(true);
      timerRef.current = setInterval(()=>setRecTime(t=>t+1),1000);
    }
  }

  const mins = Math.floor(recTime/60);
  const secs = (recTime%60).toString().padStart(2,"0");
  const TypeIcon = { photo:Image, video:Video, audio:Music };

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:900, margin:"0 auto" }} className="animate-fade">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>Memory Vault</h1>
            <p style={{ fontSize:13, color:C.gray, marginTop:4 }}>47 memories preserved</p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={toggleRecord} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, border:`1px solid ${recording?"rgba(220,50,50,0.3)":C.saffronMid}`, background:recording?"#FEF2F2":C.white, color:recording?"#DC2626":C.gray, cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:F.sans }}>
              {recording?<Square size={13}/>:<Mic size={13}/>}
              {recording?`${mins}:${secs}`:"Voice Memo"}
            </button>
            <button onClick={()=>toast("Upload feature: connect Cloudflare R2 for live uploads!")} style={{ display:"flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"8px 16px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
              <Upload size={13} /> Upload
            </button>
          </div>
        </div>

        {/* Recording bar */}
        {recording && (
          <div style={{ background:"#FEF2F2", border:"1px solid rgba(220,50,50,0.2)", borderRadius:12, padding:14, marginBottom:20, display:"flex", alignItems:"center", gap:14 }} className="animate-up">
            <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:32 }}>
              {Array.from({length:18},(_,i)=>(
                <div key={i} style={{ width:3, borderRadius:2, background:"#F87171", height:`${Math.floor(Math.random()*24+6)}px`, animation:"pulse 0.8s ease-in-out infinite", animationDelay:`${i*0.05}s` }}/>
              ))}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:500, color:"#DC2626", margin:0 }}>Recording… {mins}:{secs}</p>
              <p style={{ fontSize:11, color:C.gray, margin:0 }}>Click Stop to save the voice memo</p>
            </div>
            <button onClick={toggleRecord} style={{ background:"#DC2626", color:"#fff", border:"none", borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
              ■ Stop
            </button>
          </div>
        )}

        {/* Filter chips */}
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {["All","Photos","Videos","Audio","Namkaran","Diwali"].map((f,i)=>(
            <button key={f} style={{ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:500, border:`1px solid ${i===0?"#D4622A":"rgba(212,98,42,0.2)"}`, background:i===0?C.saffron:C.white, color:i===0?"#fff":C.gray, cursor:"pointer" }}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:12 }}>
          {MEDIA.map(item => {
            const Icon = TypeIcon[item.type as keyof typeof TypeIcon];
            const isHovered = hoveredId === item.id;
            return (
              <div key={item.id} onMouseEnter={()=>setHoveredId(item.id)} onMouseLeave={()=>setHoveredId(null)}>
                <div style={{ aspectRatio:"1/1", background:C.saffronLight, borderRadius:10, border:`1px solid ${C.saffronMid}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative", overflow:"hidden", transition:"all 0.15s" }}>
                  <span style={{ fontSize:32 }}>{item.emoji}</span>
                  <Icon size={13} color={isHovered?"#fff":C.saffron} style={{ marginTop:4 }} />
                  {isHovered && (
                    <div style={{ position:"absolute", inset:0, background:"rgba(212,98,42,0.82)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
                      <p style={{ color:"#fff", fontSize:12, fontWeight:500, textAlign:"center", margin:0, padding:"0 8px" }}>{item.label}</p>
                      <p style={{ color:"rgba(255,255,255,0.8)", fontSize:10, margin:0 }}>{item.ritual}</p>
                    </div>
                  )}
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:6, padding:"0 2px" }}>
                  <p style={{ fontSize:11, color:C.gray, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"calc(100% - 40px)" }}>{item.label}</p>
                  <button onClick={()=>setLiked(p=>{const n=new Set(p);n.has(item.id)?n.delete(item.id):n.add(item.id);return n;})}
                    style={{ display:"flex", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:0 }}>
                    <Heart size={11} fill={liked.has(item.id)?"#F87171":"none"} color={liked.has(item.id)?"#F87171":"#ccc"} />
                    <span style={{ fontSize:10, color:liked.has(item.id)?"#F87171":C.gray }}>{item.reactions+(liked.has(item.id)?1:0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign:"center", fontSize:11, color:C.gray, marginTop:20 }}>Stored securely on Cloudflare R2 · Max 100MB per file</p>
      </div>
    </AppShell>
  );
}

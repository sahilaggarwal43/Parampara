"use client";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { DEMO_MEMBERS } from "@/lib/data";
import { Copy, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };

const ROLE_STYLE: Record<string,{bg:string,color:string,border:string}> = {
  Admin:     { bg:C.saffronLight, color:C.saffron, border:"rgba(212,98,42,0.2)" },
  Elder:     { bg:"#FFFBEB", color:"#B45309", border:"rgba(180,83,9,0.2)" },
  Parent:    { bg:C.forestLight, color:C.forest, border:"rgba(15,110,86,0.2)" },
  Contributor:{ bg:"#EFF6FF", color:"#1D4ED8", border:"rgba(29,78,216,0.2)" },
  Viewer:    { bg:"#F9FAFB", color:"#6B7280", border:"rgba(0,0,0,0.08)" },
};

export default function MembersPage() {
  const [showInvite, setShowInvite] = useState(false);

  function copyInvite() {
    navigator.clipboard?.writeText("https://parampara.vercel.app/join/SHARMA-X7K2")
      .then(()=>toast.success("Invite link copied! 🔗"))
      .catch(()=>toast.error("Copy manually: parampara.vercel.app/join/SHARMA-X7K2"));
  }

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:720, margin:"0 auto" }} className="animate-fade">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <div>
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>Family Members</h1>
            <p style={{ fontSize:13, color:C.gray, marginTop:4 }}>Sharma Family · 8 members</p>
          </div>
          <button onClick={()=>setShowInvite(v=>!v)} style={{ display:"flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"9px 16px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
            <UserPlus size={15} /> Invite Member
          </button>
        </div>

        {showInvite && (
          <div style={{ background:C.saffronLight, border:`1px solid rgba(212,98,42,0.2)`, borderRadius:12, padding:16, marginBottom:20 }} className="animate-up">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <p style={{ fontSize:13, fontWeight:500, color:C.charcoal, margin:0 }}>Share this invite link with your family</p>
              <button onClick={()=>setShowInvite(false)} style={{ background:"none", border:"none", cursor:"pointer", color:C.gray }}><X size={16}/></button>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, background:C.white, borderRadius:9, border:`1px solid rgba(212,98,42,0.2)`, padding:"10px 14px" }}>
              <span style={{ flex:1, fontSize:12, color:C.gray, fontFamily:"monospace" }}>parampara.vercel.app/join/SHARMA-X7K2</span>
              <button onClick={copyInvite} style={{ display:"flex", alignItems:"center", gap:5, background:C.saffron, color:"#fff", border:"none", borderRadius:7, padding:"6px 10px", fontSize:11, fontWeight:500, cursor:"pointer" }}>
                <Copy size={12} /> Copy
              </button>
            </div>
            <p style={{ fontSize:11, color:C.gray, marginTop:8 }}>Members can join with this link and you can assign their role afterward.</p>
          </div>
        )}

        {/* Members list */}
        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, overflow:"hidden", marginBottom:16 }}>
          {DEMO_MEMBERS.map((m,i) => {
            const rs = ROLE_STYLE[m.role] || ROLE_STYLE.Viewer;
            return (
              <div key={m.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderBottom:i<DEMO_MEMBERS.length-1?`1px solid ${C.saffronMid}`:"none" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:m.color==="saffron"?"#FAD5BC":"#C0E4D8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:500, color:m.color==="saffron"?C.saffron:C.forest, flexShrink:0 }}>
                  {m.initials}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:14, fontWeight:500, color:C.charcoal, margin:0 }}>{m.name}</p>
                  <p style={{ fontSize:12, color:C.gray, margin:0, marginTop:2 }}>{m.relation} · {m.religion} · {m.region}</p>
                </div>
                <span style={{ fontSize:11, fontWeight:500, padding:"4px 10px", borderRadius:20, background:rs.bg, color:rs.color, border:`1px solid ${rs.border}`, flexShrink:0 }}>
                  {m.role}
                </span>
              </div>
            );
          })}
        </div>

        {/* Role guide */}
        <div style={{ background:C.ivory, border:`1px solid ${C.saffronMid}`, borderRadius:12, padding:16 }}>
          <p style={{ fontSize:12, fontWeight:500, color:C.charcoal, marginBottom:10 }}>Role permissions</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[
              ["Admin","Full access, invite management"],
              ["Elder","Create & edit rituals, upload media"],
              ["Parent","Add media, mark rituals performed"],
              ["Contributor","Add photos, comments, reactions"],
              ["Viewer","View all, no editing"],
            ].map(([role,desc])=>{
              const rs = ROLE_STYLE[role] || ROLE_STYLE.Viewer;
              return (
                <div key={role} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ fontSize:10, fontWeight:500, padding:"2px 7px", borderRadius:10, background:rs.bg, color:rs.color, border:`1px solid ${rs.border}`, flexShrink:0, marginTop:1 }}>{role}</span>
                  <span style={{ fontSize:11, color:C.gray, lineHeight:1.4 }}>{desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

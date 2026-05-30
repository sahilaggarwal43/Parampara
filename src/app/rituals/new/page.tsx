"use client";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };
const inp = { width:"100%", padding:"9px 12px", border:"1px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:F.sans, background:C.ivory, color:C.charcoal, outline:"none", boxSizing:"border-box" as const };

export default function NewRitualPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name:"", subtitle:"", category:"Birth", religion:"Hindu", region:"North India", language:"Hindi/Sanskrit", preparationDays:7, elderNotes:"" });
  const [steps, setSteps] = useState(["","",""]);
  const [samagri, setSamagri] = useState([{ item:"", quantity:"", purpose:"" }]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Please enter a ritual name");
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    toast.success("Ritual documented and preserved! 🙏");
    router.push("/rituals");
  }

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:640, margin:"0 auto" }} className="animate-fade">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <Link href="/rituals" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, borderRadius:8, border:`1px solid ${C.saffronMid}`, background:C.white, textDecoration:"none" }}>
            <ArrowLeft size={16} color={C.gray} />
          </Link>
          <div>
            <h1 style={{ fontFamily:F.serif, fontSize:22, fontWeight:600, color:C.charcoal, margin:0 }}>Document a Ritual</h1>
            <p style={{ fontSize:13, color:C.gray, marginTop:3 }}>Preserve this tradition for future generations</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Basic info */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }}>
            <h2 style={{ fontFamily:F.serif, fontSize:15, fontWeight:500, color:C.charcoal, marginBottom:16 }}>Basic Information</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Ritual name *</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g., Namkaran, Vivah, Satyanarayan Puja" required style={inp} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Short description</label>
                <input value={form.subtitle} onChange={e=>setForm(f=>({...f,subtitle:e.target.value}))} placeholder="e.g., First hair-cutting ceremony" style={inp} />
              </div>
              {([
                { key:"category", label:"Category", opts:["Birth","Naming","Mundan","Thread Ceremony","Marriage","Housewarming","Festival","Death & Remembrance","Annual Tradition","Custom"] },
                { key:"religion", label:"Religion", opts:["Hindu","Sikh","Muslim","Christian","Jain","Buddhist","Other"] },
                { key:"region", label:"Region", opts:["North India","South India","East India","West India","Bengal","Punjab","Gujarat","Maharashtra","Pan India","Other"] },
                { key:"language", label:"Language", opts:["Hindi/Sanskrit","Tamil","Telugu","Kannada","Malayalam","Bengali","Punjabi","Gujarati","Marathi","English","Other"] },
              ] as const).map(({ key, label, opts }) => (
                <div key={key}>
                  <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>{label}</label>
                  <select value={form[key as keyof typeof form] as string} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} style={{...inp}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Preparation days</label>
                <input type="number" value={form.preparationDays} onChange={e=>setForm(f=>({...f,preparationDays:+e.target.value}))} min={0} max={365} style={inp} />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h2 style={{ fontFamily:F.serif, fontSize:15, fontWeight:500, color:C.charcoal, margin:0 }}>Step-by-step Process</h2>
              <button type="button" onClick={() => setSteps(p=>[...p,""])} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:C.saffron, background:"none", border:"none", cursor:"pointer" }}>
                <Plus size={13} /> Add step
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ width:24, textAlign:"center", fontSize:12, color:C.saffron, fontWeight:500, flexShrink:0 }}>{i+1}</span>
                  <input value={step} onChange={e=>{const n=[...steps];n[i]=e.target.value;setSteps(n);}} placeholder={`Step ${i+1}…`} style={{...inp,flex:1,width:"auto"}} />
                  <button type="button" onClick={()=>setSteps(p=>p.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", cursor:"pointer", color:"#ddd", display:"flex" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Samagri */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h2 style={{ fontFamily:F.serif, fontSize:15, fontWeight:500, color:C.charcoal, margin:0 }}>Pooja Samagri</h2>
              <button type="button" onClick={()=>setSamagri(p=>[...p,{item:"",quantity:"",purpose:""}])} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:C.saffron, background:"none", border:"none", cursor:"pointer" }}>
                <Plus size={13} /> Add item
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {samagri.map((s, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 2fr auto", gap:8 }}>
                  <input value={s.item} onChange={e=>{const n=[...samagri];n[i]={...n[i],item:e.target.value};setSamagri(n);}} placeholder="Item name" style={inp} />
                  <input value={s.quantity} onChange={e=>{const n=[...samagri];n[i]={...n[i],quantity:e.target.value};setSamagri(n);}} placeholder="Qty" style={inp} />
                  <input value={s.purpose} onChange={e=>{const n=[...samagri];n[i]={...n[i],purpose:e.target.value};setSamagri(n);}} placeholder="Purpose" style={inp} />
                  <button type="button" onClick={()=>setSamagri(p=>p.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", cursor:"pointer", color:"#ddd", display:"flex", alignItems:"center" }}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Elder notes */}
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }}>
            <h2 style={{ fontFamily:F.serif, fontSize:15, fontWeight:500, color:C.charcoal, marginBottom:12 }}>Elder&apos;s Notes</h2>
            <textarea value={form.elderNotes} onChange={e=>setForm(f=>({...f,elderNotes:e.target.value}))} placeholder="What do the elders say? Any family-specific variations or important notes to preserve…" rows={4} style={{...inp,resize:"vertical"}} />
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <Link href="/rituals" style={{ flex:1, padding:"12px", border:`1px solid ${C.saffronMid}`, color:C.gray, borderRadius:9, fontSize:13, fontWeight:500, textAlign:"center", textDecoration:"none", background:C.white }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving} style={{ flex:1, background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"12px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
              {saving ? "Preserving…" : "Save Ritual 🙏"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

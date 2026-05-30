"use client";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Sparkles, ListChecks, Search } from "lucide-react";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.12)", forest:"#0F6E56", forestLight:"#E8F5F1", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };
const inp = { width:"100%", padding:"9px 12px", border:"1px solid rgba(0,0,0,0.1)", borderRadius:8, fontSize:13, fontFamily:F.sans, background:C.ivory, color:C.charcoal, outline:"none", boxSizing:"border-box" as const };

type Tab = "explainer"|"samagri"|"gaps";

export default function AIPage() {
  const [tab, setTab] = useState<Tab>("explainer");
  const [eForm, setEForm] = useState({ ritual:"", religion:"Hindu", region:"North India" });
  const [eLoading, setELoading] = useState(false);
  const [eResult, setEResult] = useState("");
  const [sForm, setSForm] = useState({ ritual:"", religion:"Hindu", guests:"25" });
  const [sLoading, setSLoading] = useState(false);
  const [sResult, setSResult] = useState<{item:string;quantity:string;purpose:string}[]>([]);
  const [sChecked, setSChecked] = useState<Set<number>>(new Set());
  const [gForm, setGForm] = useState({ ritual:"", religion:"Hindu", steps:"" });
  const [gLoading, setGLoading] = useState(false);
  const [gResult, setGResult] = useState<{suggestion:string;reason:string}[]>([]);

  async function runExplainer() {
    if (!eForm.ritual.trim()) return toast.error("Please enter a ritual name");
    setELoading(true); setEResult("");
    try {
      const res = await fetch("/api/ai/explain-ritual",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eForm)});
      const data = await res.json();
      setEResult(data.explanation || data.error || "Could not get response.");
    } catch { setEResult("Network error. Is ANTHROPIC_API_KEY set in Vercel?"); }
    setELoading(false);
  }

  async function runSamagri() {
    if (!sForm.ritual.trim()) return toast.error("Please enter a ritual name");
    setSLoading(true); setSResult([]);
    try {
      const res = await fetch("/api/ai/generate-samagri",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(sForm)});
      const data = await res.json();
      if (Array.isArray(data.samagri)) setSResult(data.samagri);
    } catch { toast.error("Network error"); }
    setSLoading(false);
  }

  async function runGaps() {
    if (!gForm.ritual.trim()) return toast.error("Please enter a ritual name");
    setGLoading(true); setGResult([]);
    try {
      const steps = gForm.steps.split("\n").filter(s=>s.trim());
      const res = await fetch("/api/ai/suggest-steps",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...gForm,existingSteps:steps})});
      const data = await res.json();
      if (Array.isArray(data.suggestions)) setGResult(data.suggestions);
    } catch { toast.error("Network error"); }
    setGLoading(false);
  }

  const tabs = [
    { id:"explainer" as Tab, label:"Ritual Explainer", icon:Sparkles, desc:"Cultural context & significance" },
    { id:"samagri" as Tab, label:"Samagri Generator", icon:ListChecks, desc:"Complete items checklist" },
    { id:"gaps" as Tab, label:"Gap Finder", icon:Search, desc:"Find missing steps" },
  ];

  return (
    <AppShell>
      <div style={{ padding:24, maxWidth:720, margin:"0 auto" }} className="animate-fade">
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <Sparkles size={20} color={C.saffron} />
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>AI Ritual Assistant</h1>
          </div>
          <p style={{ fontSize:13, color:C.gray }}>Powered by Claude — cultural wisdom meets AI</p>
        </div>

        {/* Tab selector */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
          {tabs.map(({ id, label, icon:Icon, desc }) => (
            <button key={id} onClick={()=>setTab(id)}
              style={{ padding:16, borderRadius:12, border:`1px solid ${tab===id?"rgba(212,98,42,0.3)":C.saffronMid}`, background:tab===id?C.saffronLight:C.white, textAlign:"left", cursor:"pointer", transition:"all 0.15s" }}>
              <Icon size={18} color={tab===id?C.saffron:C.gray} />
              <p style={{ fontSize:13, fontWeight:500, color:tab===id?C.saffron:C.charcoal, margin:"8px 0 4px" }}>{label}</p>
              <p style={{ fontSize:11, color:C.gray, margin:0, lineHeight:1.4 }}>{desc}</p>
            </button>
          ))}
        </div>

        {/* Explainer */}
        {tab==="explainer" && (
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }} className="animate-up">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Ritual name</label>
                <input value={eForm.ritual} onChange={e=>setEForm(f=>({...f,ritual:e.target.value}))} placeholder="e.g., Vivah Sanskar, Karva Chauth…" style={inp} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Religion</label>
                <select value={eForm.religion} onChange={e=>setEForm(f=>({...f,religion:e.target.value}))} style={inp}>
                  {["Hindu","Sikh","Muslim","Christian","Jain","Buddhist"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ gridColumn:"2/-1" }}>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Region</label>
                <select value={eForm.region} onChange={e=>setEForm(f=>({...f,region:e.target.value}))} style={inp}>
                  {["North India","South India","East India","West India","Bengal","Punjab","Gujarat","Maharashtra","Tamil Nadu","Kerala","Pan India"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <button onClick={runExplainer} disabled={eLoading} style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"11px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans, marginBottom:14 }}>
              {eLoading?"Consulting cultural knowledge…":"✨ Explain this ritual"}
            </button>
            {(eLoading||eResult) && (
              <div style={{ background:C.saffronLight, border:`1px solid rgba(212,98,42,0.2)`, borderRadius:10, padding:16 }}>
                {eLoading?(
                  <div>
                    {[90,72,84,60,78].map((w,i)=><div key={i} className="skeleton" style={{ height:11, width:`${w}%`, marginBottom:8 }}/>)}
                    <p style={{ fontSize:12, color:C.gray, marginTop:8 }} className="ai-cursor">Reading cultural texts</p>
                  </div>
                ):(
                  <p style={{ fontSize:13, color:C.charcoal, lineHeight:1.8, whiteSpace:"pre-wrap", margin:0 }}>{eResult}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Samagri */}
        {tab==="samagri" && (
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }} className="animate-up">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Ritual name</label>
                <input value={sForm.ritual} onChange={e=>setSForm(f=>({...f,ritual:e.target.value}))} placeholder="e.g., Satyanarayan Puja, Griha Pravesh" style={inp} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Religion</label>
                <select value={sForm.religion} onChange={e=>setSForm(f=>({...f,religion:e.target.value}))} style={inp}>
                  {["Hindu","Sikh","Muslim","Christian","Jain"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>No. of guests</label>
                <input type="number" value={sForm.guests} onChange={e=>setSForm(f=>({...f,guests:e.target.value}))} min="1" max="500" style={inp} />
              </div>
              <div style={{ display:"flex", alignItems:"flex-end" }}>
                <button onClick={runSamagri} disabled={sLoading} style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"9px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
                  {sLoading?"Generating…":"✨ Generate"}
                </button>
              </div>
            </div>
            {sLoading && <div style={{ display:"flex", flexDirection:"column", gap:8 }}>{[80,60,70,55].map((w,i)=><div key={i} className="skeleton" style={{ height:11, width:`${w}%` }}/>)}</div>}
            {sResult.length>0 && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <p style={{ fontSize:12, color:C.gray }}>{sResult.length} items · tap to check off</p>
                  <span style={{ fontSize:12, color:C.forest, fontWeight:500 }}>{sChecked.size}/{sResult.length} ready</span>
                </div>
                <div style={{ border:`1px solid ${C.saffronMid}`, borderRadius:10, overflow:"hidden" }}>
                  {sResult.map((s,i)=>(
                    <div key={i} onClick={()=>setSChecked(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n;})}
                      style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", cursor:"pointer", borderBottom:i<sResult.length-1?`1px solid ${C.saffronMid}`:"none" }}
                      className="hover-lift">
                      <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${sChecked.has(i)?C.forest:"#ddd"}`, background:sChecked.has(i)?C.forest:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                        {sChecked.has(i)&&<span style={{ color:"#fff", fontSize:9 }}>✓</span>}
                      </div>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:13, fontWeight:500, color:sChecked.has(i)?C.gray:C.charcoal, margin:0, textDecoration:sChecked.has(i)?"line-through":"none" }}>{s.item}</p>
                        <p style={{ fontSize:11, color:C.gray, margin:0 }}>{s.purpose}</p>
                      </div>
                      <span style={{ fontSize:11, fontWeight:500, background:C.saffronLight, color:C.saffron, padding:"3px 8px", borderRadius:6 }}>{s.quantity}</span>
                    </div>
                  ))}
                </div>
                <button onClick={()=>toast.success("Samagri list saved! 📋")} style={{ marginTop:10, width:"100%", border:`1px solid rgba(15,110,86,0.2)`, background:C.forestLight, color:C.forest, borderRadius:9, padding:10, fontSize:13, cursor:"pointer", fontFamily:F.sans }}>
                  Save to ritual
                </button>
              </div>
            )}
          </div>
        )}

        {/* Gap finder */}
        {tab==="gaps" && (
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.saffronMid}`, padding:20 }} className="animate-up">
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:14 }}>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Ritual name</label>
                <input value={gForm.ritual} onChange={e=>setGForm(f=>({...f,ritual:e.target.value}))} placeholder="e.g., Mundan, Thread Ceremony" style={inp} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Religion</label>
                <select value={gForm.religion} onChange={e=>setGForm(f=>({...f,religion:e.target.value}))} style={inp}>
                  {["Hindu","Sikh","Muslim","Christian","Jain"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Your existing steps (one per line)</label>
                <textarea value={gForm.steps} onChange={e=>setGForm(f=>({...f,steps:e.target.value}))} placeholder={"Bathe and dress the child\nPerform Ganapati puja\nPriest cuts first lock of hair"} rows={5} style={{...inp,resize:"vertical"}} />
              </div>
            </div>
            <button onClick={runGaps} disabled={gLoading} style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"11px", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F.sans, marginBottom:14 }}>
              {gLoading?"Analyzing your ritual…":"✨ Find missing steps"}
            </button>
            {gLoading && <div style={{ display:"flex", flexDirection:"column", gap:8 }}>{[70,85,60].map((w,i)=><div key={i} className="skeleton" style={{ height:11, width:`${w}%`, background:"rgba(15,110,86,0.2)" }}/>)}</div>}
            {gResult.length>0 && (
              <div style={{ background:C.forestLight, border:`1px solid rgba(15,110,86,0.2)`, borderRadius:10, padding:16 }}>
                <p style={{ fontSize:12, fontWeight:500, color:C.forest, marginBottom:12 }}>💡 Suggestions — your family may have variations</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {gResult.map((g,i)=>(
                    <div key={i} style={{ display:"flex", gap:10, background:C.white, borderRadius:8, padding:12, border:`1px solid rgba(15,110,86,0.12)` }}>
                      <div style={{ width:22, height:22, borderRadius:"50%", background:C.forestLight, color:C.forest, fontSize:10, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                      <div>
                        <p style={{ fontSize:13, fontWeight:500, color:C.charcoal, margin:0 }}>{g.suggestion}</p>
                        <p style={{ fontSize:12, color:C.gray, margin:0, marginTop:3, lineHeight:1.5 }}>{g.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}

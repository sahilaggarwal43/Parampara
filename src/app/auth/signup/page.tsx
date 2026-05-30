"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Suspense } from "react";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.15)", forest:"#0F6E56", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };
const inp = { width:"100%", padding:"11px 14px", border:"1px solid rgba(0,0,0,0.1)", borderRadius:9, fontSize:14, fontFamily:F.sans, background:C.ivory, color:C.charcoal, outline:"none", boxSizing:"border-box" as const, marginBottom:14 };

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPro = searchParams.get("plan") === "pro";
  const [method, setMethod] = useState<"google"|"phone"|"email">("email");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"", familyName:"", religion:"Hindu", region:"North India" });

  function update(k: string, v: string) { setForm(f=>({...f,[k]:v})); }

  async function handleGoogleSSO() {
    setLoading(true);
    await new Promise(r=>setTimeout(r,1200));
    toast.success("Google sign-in successful! 🎉");
    router.push("/dashboard");
  }

  async function sendOTP() {
    if (!form.phone || form.phone.length < 10) return toast.error("Enter a valid phone number");
    setLoading(true);
    await new Promise(r=>setTimeout(r,800));
    setOtpSent(true);
    setLoading(false);
    toast.success("OTP sent to " + form.phone + " 📱");
  }

  async function verifyOTP() {
    if (otp.length < 4) return toast.error("Enter the OTP");
    setLoading(true);
    await new Promise(r=>setTimeout(r,800));
    setStep(2);
    setLoading(false);
  }

  async function handleFinalStep(e: React.FormEvent) {
    e.preventDefault();
    if (!form.familyName.trim()) return toast.error("Enter your family name");
    setLoading(true);
    await new Promise(r=>setTimeout(r,1000));
    if (isPro) {
      toast.success("Account created! Redirecting to payment… 💳");
      const res = await fetch("/api/stripe/checkout", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ billingCycle:"monthly" }) });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
    }
    toast.success(`Welcome to Parampara, ${form.familyName}! 🪔`);
    router.push("/dashboard");
  }

  return (
    <div style={{ minHeight:"100vh", background:C.ivory, display:"flex", fontFamily:F.sans }}>
      {/* Left panel */}
      <div style={{ flex:1, background:"linear-gradient(135deg,#1A1A1A 0%,#2D1810 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, position:"relative", overflow:"hidden" }} className="hide-mobile">
        <div style={{ position:"absolute", top:20, left:20, right:20, bottom:20, borderRadius:24, border:"1px solid rgba(212,98,42,0.15)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", fontSize:200, opacity:0.03, fontFamily:F.serif, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>ॐ</div>
        <div style={{ position:"relative", textAlign:"center", maxWidth:380 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🪔</div>
          <h2 style={{ fontFamily:F.serif, fontSize:32, fontWeight:600, color:"#fff", marginBottom:16, lineHeight:1.2 }}>Preserve what matters most</h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", lineHeight:1.8, marginBottom:32 }}>
            Join 2,400+ families who have started documenting their rituals, ceremonies, and traditions on Parampara.
          </p>
          {['"My children in the US can now perform our rituals correctly."','"The AI samagri generator saved us hours before Diwali."','"We\'ve documented 3 generations of traditions."'].map((q,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"12px 16px", marginBottom:8, textAlign:"left" }}>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.6)", fontStyle:"italic", margin:0 }}>{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div style={{ width:"100%", maxWidth:420 }}>
          <div style={{ marginBottom:28 }}>
            <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", marginBottom:20 }}>
              <span style={{ fontSize:24 }}>🪔</span>
              <span style={{ fontFamily:F.serif, fontSize:18, fontWeight:600, color:C.saffron }}>Parampara</span>
            </Link>
            <h1 style={{ fontFamily:F.serif, fontSize:24, fontWeight:600, color:C.charcoal, margin:0 }}>
              {step===1 ? "Create your account" : "Set up your family"}
            </h1>
            <p style={{ color:C.gray, fontSize:13, marginTop:5 }}>Step {step} of 2 {isPro && <span style={{ background:C.saffronLight, color:C.saffron, fontSize:11, padding:"2px 8px", borderRadius:20, marginLeft:6 }}>Pro plan selected</span>}</p>
            <div style={{ display:"flex", gap:4, marginTop:10 }}>
              {[1,2].map(s=><div key={s} style={{ height:3, flex:1, borderRadius:3, background:step>=s?C.saffron:"rgba(212,98,42,0.15)" }}/>)}
            </div>
          </div>

          {step===1 && (
            <div>
              {/* Method toggle */}
              <div style={{ display:"flex", gap:4, background:"#F1EDE8", borderRadius:10, padding:4, marginBottom:20 }}>
                {([["google","G  Google"],["phone","📱 Phone"],["email","✉ Email"]] as [typeof method, string][]).map(([m,label])=>(
                  <button key={m} onClick={()=>setMethod(m)} style={{ flex:1, padding:"8px 4px", borderRadius:7, border:"none", fontSize:12, fontWeight:500, cursor:"pointer", background:method===m?C.white:"transparent", color:method===m?C.charcoal:C.gray, boxShadow:method===m?"0 1px 4px rgba(0,0,0,0.1)":"none", fontFamily:F.sans }}>
                    {label}
                  </button>
                ))}
              </div>

              {method==="google" && (
                <div>
                  <button onClick={handleGoogleSSO} disabled={loading} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:C.white, border:"1px solid rgba(0,0,0,0.12)", borderRadius:10, padding:"13px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    {loading?"Connecting to Google…":"Continue with Google"}
                  </button>
                  <p style={{ textAlign:"center", fontSize:12, color:C.gray, marginTop:14 }}>
                    Already have an account? <Link href="/auth/login" style={{ color:C.saffron, fontWeight:500, textDecoration:"none" }}>Sign in</Link>
                  </p>
                </div>
              )}

              {method==="phone" && (
                <div>
                  {!otpSent ? (
                    <>
                      <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Mobile number</label>
                      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                        <select style={{ padding:"11px 10px", border:"1px solid rgba(0,0,0,0.1)", borderRadius:9, fontSize:14, background:C.ivory, color:C.charcoal, outline:"none", width:90 }}>
                          <option>+91</option><option>+1</option><option>+44</option><option>+61</option>
                        </select>
                        <input value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="98765 43210" type="tel" style={{...inp,marginBottom:0,flex:1}} />
                      </div>
                      <button onClick={sendOTP} disabled={loading} style={{ width:"100%", background:C.forest, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
                        {loading?"Sending OTP…":"Send OTP →"}
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize:13, color:C.gray, marginBottom:12 }}>Enter the 6-digit OTP sent to {form.phone}</p>
                      <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="• • • • • •" maxLength={6} style={{...inp,letterSpacing:8,fontSize:20,textAlign:"center"}} />
                      <button onClick={verifyOTP} disabled={loading} style={{ width:"100%", background:C.forest, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans, marginBottom:8 }}>
                        {loading?"Verifying…":"Verify OTP →"}
                      </button>
                      <button onClick={()=>{setOtpSent(false);setOtp("");}} style={{ width:"100%", background:"none", border:"none", color:C.gray, fontSize:13, cursor:"pointer" }}>← Change number</button>
                    </>
                  )}
                </div>
              )}

              {method==="email" && (
                <form onSubmit={e=>{e.preventDefault();if(form.name&&form.email&&form.password)setStep(2);}}>
                  <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Full name</label>
                  <input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="e.g., Priya Sharma" required style={inp} />
                  <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Email</label>
                  <input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@family.com" required style={inp} />
                  <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Password</label>
                  <input type="password" value={form.password} onChange={e=>update("password",e.target.value)} placeholder="min 8 characters" minLength={8} required style={inp} />
                  <button type="submit" style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans }}>
                    Continue →
                  </button>
                  <p style={{ textAlign:"center", fontSize:12, color:C.gray, marginTop:14 }}>
                    Have an account? <Link href="/auth/login" style={{ color:C.saffron, fontWeight:500, textDecoration:"none" }}>Sign in</Link>
                  </p>
                </form>
              )}
            </div>
          )}

          {step===2 && (
            <form onSubmit={handleFinalStep}>
              <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Family name</label>
              <input value={form.familyName} onChange={e=>update("familyName",e.target.value)} placeholder="e.g., Sharma Family, Patel Parivar" required style={inp} />
              <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Religion / Dharma</label>
              <select value={form.religion} onChange={e=>update("religion",e.target.value)} style={inp}>
                {["Hindu","Sikh","Muslim","Christian","Jain","Buddhist","Other"].map(r=><option key={r}>{r}</option>)}
              </select>
              <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Home region</label>
              <select value={form.region} onChange={e=>update("region",e.target.value)} style={inp}>
                {["North India","South India","East India","West India","Bengal","Punjab","Gujarat","Maharashtra","Tamil Nadu","Kerala","Rajasthan","Pan India","Diaspora / Abroad"].map(r=><option key={r}>{r}</option>)}
              </select>
              <button type="submit" disabled={loading} style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans, marginBottom:10 }}>
                {loading ? (isPro?"Redirecting to payment…":"Creating your space…") : (isPro?"Create account & pay →":"Create family space 🪔")}
              </button>
              <button type="button" onClick={()=>setStep(1)} style={{ width:"100%", background:"none", border:"none", color:C.gray, fontSize:13, cursor:"pointer", fontFamily:F.sans }}>← Back</button>
            </form>
          )}

          <p style={{ textAlign:"center", fontSize:11, color:C.gray, marginTop:20, lineHeight:1.5 }}>
            By signing up you agree to our Terms & Privacy Policy.<br/>Your data is encrypted and private.
          </p>
        </div>
      </div>
      <style>{`.hide-mobile{display:flex!important}@media(max-width:768px){.hide-mobile{display:none!important}}`}</style>
    </div>
  );
}

export default function SignupPage() {
  return <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Inter,sans-serif",color:"#6B6560"}}>Loading…</div>}><SignupForm /></Suspense>;
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", saffronMid:"rgba(212,98,42,0.15)", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };
const inp = { width:"100%", padding:"10px 14px", border:"1px solid rgba(0,0,0,0.1)", borderRadius:9, fontSize:14, fontFamily:F.sans, background:C.ivory, color:C.charcoal, outline:"none", boxSizing:"border-box" as const, marginBottom:14 };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    toast.success("Welcome back to Parampara! 🪔");
    router.push("/dashboard");
  }

  return (
    <div style={{ minHeight:"100vh", background:C.ivory, display:"flex", alignItems:"center", justifyContent:"center", padding:16, fontFamily:F.sans }}>
      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", marginBottom:16 }}>
            <span style={{ fontSize:36 }}>🪔</span>
          </Link>
          <h1 style={{ fontFamily:F.serif, fontSize:26, fontWeight:600, color:C.charcoal, margin:0 }}>Welcome back</h1>
          <p style={{ color:C.gray, fontSize:14, marginTop:6 }}>Sign in to your family space</p>
        </div>

        <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.saffronMid}`, padding:28, boxShadow:"0 2px 20px rgba(212,98,42,0.06)" }}>
          <form onSubmit={handleLogin}>
            <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@family.com" required style={inp} />

            <label style={{ fontSize:13, fontWeight:500, color:C.charcoal, display:"block", marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required style={inp} />

            <button type="submit" disabled={loading} style={{ width:"100%", background:C.saffron, color:"#fff", border:"none", borderRadius:9, padding:"12px", fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:F.sans, marginTop:4 }}>
              {loading?"Signing in…":"Sign in →"}
            </button>
          </form>

          <div style={{ borderTop:`1px solid ${C.saffronMid}`, marginTop:20, paddingTop:20, textAlign:"center" }}>
            <p style={{ fontSize:13, color:C.gray }}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" style={{ color:C.saffron, fontWeight:500, textDecoration:"none" }}>Create family space</Link>
            </p>
          </div>

          <div style={{ background:C.saffronLight, borderRadius:8, padding:"10px 14px", marginTop:14, textAlign:"center" }}>
            <p style={{ fontSize:12, color:C.gray, margin:0 }}>Demo: use any email + password to explore</p>
          </div>
        </div>
      </div>
    </div>
  );
}

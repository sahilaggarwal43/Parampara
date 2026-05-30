"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Calendar, Sparkles, Image, Users, Menu, X, Bell, Plus } from "lucide-react";

const C = { saffron:"#D4622A", saffronLight:"#FDF0E8", ivory:"#FDF6ED", charcoal:"#1A1A1A", gray:"#6B6560", border:"rgba(212,98,42,0.12)", white:"#ffffff" };
const F = { serif:"'Playfair Display',Georgia,serif", sans:"'Inter',system-ui,sans-serif" };

const NAV = [
  { href:"/dashboard", icon:LayoutDashboard, label:"Dashboard" },
  { href:"/rituals", icon:BookOpen, label:"Ritual Vault" },
  { href:"/festivals", icon:Calendar, label:"Festivals" },
  { href:"/ai", icon:Sparkles, label:"AI Assistant" },
  { href:"/media", icon:Image, label:"Memory Vault" },
  { href:"/members", icon:Users, label:"Family Members" },
];

function NavLinks({ onNav }: { onNav?: () => void }) {
  const path = usePathname();
  return (
    <nav style={{ flex:1, padding:"4px 8px", display:"flex", flexDirection:"column", gap:2 }}>
      {NAV.map(({ href, icon:Icon, label }) => {
        const active = path === href || path.startsWith(href+"/");
        return (
          <Link key={href} href={href} onClick={onNav} style={{
            display:"flex", alignItems:"center", gap:10,
            padding:"9px 12px", borderRadius:8, textDecoration:"none",
            fontSize:13, transition:"all 0.15s",
            background: active ? C.saffronLight : "transparent",
            color: active ? C.saffron : C.gray,
            fontWeight: active ? 500 : 400,
            borderLeft: active ? `2px solid ${C.saffron}` : "2px solid transparent",
          }}>
            <Icon size={15} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNav }: { onNav?: () => void }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ padding:"16px", borderBottom:`1px solid ${C.border}` }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
          <span style={{ fontSize:22 }}>🪔</span>
          <span style={{ fontFamily:F.serif, fontSize:18, fontWeight:600, color:C.saffron }}>Parampara</span>
        </Link>
      </div>
      <div style={{ margin:"12px", padding:"10px 12px", background:C.saffronLight, borderRadius:10, border:`1px solid rgba(212,98,42,0.15)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:C.saffron, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:500, flexShrink:0 }}>SH</div>
          <div>
            <p style={{ fontSize:12, fontWeight:500, color:C.charcoal, margin:0 }}>Sharma Family</p>
            <p style={{ fontSize:11, color:C.gray, margin:0 }}>8 members · Delhi/NCR</p>
          </div>
        </div>
      </div>
      <NavLinks onNav={onNav} />
      <div style={{ padding:"12px", borderTop:`1px solid ${C.border}`, textAlign:"center" }}>
        <p style={{ fontSize:10, color:"#B0AAA5", fontFamily:F.sans }}>परंपरा — tradition lives on</p>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display:"flex", height:"100vh", background:C.ivory, overflow:"hidden" }}>
      {/* Desktop sidebar */}
      <aside style={{ width:220, background:C.white, borderRight:`1px solid ${C.border}`, flexShrink:0, display:"flex", flexDirection:"column" }} className="sidebar-desktop">
        <SidebarInner />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex" }}>
          <div style={{ width:240, background:C.white, display:"flex", flexDirection:"column", borderRight:`1px solid ${C.border}` }}>
            <div style={{ padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontFamily:F.serif, fontSize:16, fontWeight:600, color:C.saffron }}>🪔 Parampara</span>
              <button onClick={() => setMobileOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:C.gray, display:"flex" }}><X size={18} /></button>
            </div>
            <SidebarInner onNav={() => setMobileOpen(false)} />
          </div>
          <div style={{ flex:1, background:"rgba(0,0,0,0.3)" }} onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
        <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`, height:56, display:"flex", alignItems:"center", padding:"0 16px", gap:12, flexShrink:0 }}>
          <button onClick={() => setMobileOpen(true)} className="menu-btn" style={{ background:"none", border:"none", cursor:"pointer", color:C.gray, display:"flex", alignItems:"center" }}>
            <Menu size={20} />
          </button>
          <div style={{ flex:1 }} />
          <button style={{ padding:6, borderRadius:8, background:"none", border:"none", cursor:"pointer", color:C.gray, position:"relative" }}>
            <Bell size={18} />
            <span style={{ position:"absolute", top:4, right:4, width:7, height:7, background:C.saffron, borderRadius:"50%", border:"2px solid #fff" }} />
          </button>
          <Link href="/rituals/new" style={{ display:"flex", alignItems:"center", gap:6, background:C.saffron, color:"#fff", padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:500, textDecoration:"none" }}>
            <Plus size={13} /> Add Ritual
          </Link>
        </header>
        <main style={{ flex:1, overflowY:"auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media(min-width:768px){.sidebar-desktop{display:flex!important}.menu-btn{display:none!important}}
        @media(max-width:767px){.sidebar-desktop{display:none!important}.menu-btn{display:flex!important}}
      `}</style>
    </div>
  );
}

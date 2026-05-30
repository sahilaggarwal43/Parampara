import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Parampara — Preserve Your Family's Traditions Forever", template: "%s | Parampara" },
  description: "The sacred digital home for Indian and South Asian families to document, preserve, and pass down rituals, ceremonies, and traditions across generations.",
  keywords: ["Indian traditions","Hindu rituals","family heritage","cultural preservation","South Asian culture","puja","festival calendar","samskara"],
  openGraph: {
    type: "website",
    siteName: "Parampara",
    title: "Parampara — Preserve Your Family's Traditions Forever",
    description: "Document and preserve your family's rituals and cultural traditions for future generations.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#C8541A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background:"#fff", color:"#18181B", border:"1px solid #F5C4A0", borderRadius:"12px", fontFamily:"Inter,sans-serif", fontSize:"14px" },
            success: { iconTheme: { primary:"#1A5C42", secondary:"#fff" } },
          }}
        />
        {children}
      </body>
    </html>
  );
}

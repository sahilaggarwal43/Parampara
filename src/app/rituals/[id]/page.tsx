import AppShell from "@/components/layout/AppShell";
import { DEMO_RITUALS } from "@/lib/data";
import { notFound } from "next/navigation";
import RitualDetailClient from "./RitualDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const ritual = DEMO_RITUALS.find(r => r.id === params.id);
  if (!ritual) return { title: "Ritual Not Found" };
  return {
    title: `${ritual.name} — ${ritual.subtitle}`,
    description: `Step-by-step guide for ${ritual.name} (${ritual.category}) — ${ritual.religion.join(", ")}, ${ritual.region}`,
  };
}

export function generateStaticParams() {
  return DEMO_RITUALS.map(r => ({ id: r.id }));
}

export default function RitualDetailPage({ params }: { params: { id: string } }) {
  const ritual = DEMO_RITUALS.find(r => r.id === params.id);
  if (!ritual) notFound();

  return (
    <AppShell>
      <RitualDetailClient ritual={ritual} />
    </AppShell>
  );
}

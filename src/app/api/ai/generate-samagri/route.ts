import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { ritual, ritualName, religion, guests, guestCount } = await req.json();
    const name = ritual || ritualName;
    const g = guests || guestCount || 25;
    if (!name) return NextResponse.json({ error: "Ritual name required" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: `Return ONLY a valid JSON array for samagri. No markdown, no explanation. Format: [{"item":"string","quantity":"string","purpose":"string"}]. Include 10-12 items.`,
      messages: [{ role: "user", content: `Ritual: ${name}\nReligion: ${religion || "Hindu"}\nGuests: ${g}` }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "[]";
    let samagri = [];
    try {
      samagri = JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      samagri = [];
    }
    return NextResponse.json({ samagri });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}

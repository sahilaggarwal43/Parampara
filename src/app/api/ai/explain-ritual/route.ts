import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { ritualName, ritual, religion, region } = await req.json();
    const name = ritualName || ritual;
    if (!name) return NextResponse.json({ error: "Ritual name required" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: `You are a knowledgeable, warm cultural guide specializing in South Asian traditions. Explain rituals with care and respect. Keep response to 200-250 words. Use plain text, no markdown.`,
      messages: [{ role: "user", content: `Explain this ritual:\nRitual: ${name}\nReligion: ${religion || "Hindu"}\nRegion: ${region || "India"}` }],
    });

    const explanation = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}

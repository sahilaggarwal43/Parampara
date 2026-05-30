import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { ritual, ritualName, religion, existingSteps } = await req.json();
    const name = ritual || ritualName;
    if (!name) return NextResponse.json({ error: "Ritual name required" }, { status: 400 });

    const stepsText = Array.isArray(existingSteps) ? existingSteps.join("; ") : existingSteps || "Not provided";

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: `Return ONLY a valid JSON array of missing step suggestions. No markdown. Format: [{"suggestion":"string","reason":"string"}]. Max 5 items. Be helpful, not prescriptive.`,
      messages: [{ role: "user", content: `Ritual: ${name}\nReligion: ${religion || "Hindu"}\nExisting: ${stepsText}` }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "[]";
    let suggestions = [];
    try {
      suggestions = JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      suggestions = [];
    }
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}

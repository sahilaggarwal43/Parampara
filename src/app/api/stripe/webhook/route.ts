import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment completed:", session.id);
    // TODO: Update user plan in Supabase
  }

  return NextResponse.json({ received: true });
}

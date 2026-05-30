import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { billingCycle } = await req.json();
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ url: "/auth/signup?plan=pro&demo=true" });
    }
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);
    const priceId = billingCycle === "yearly"
      ? (process.env.STRIPE_PRICE_PRO_YEARLY || "")
      : (process.env.STRIPE_PRICE_PRO_MONTHLY || "");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://parampara.vercel.app"}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://parampara.vercel.app"}/#pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout error" }, { status: 500 });
  }
}

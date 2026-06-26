import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  // 1. Move the initialization INSIDE the function 
  // OR use a check to prevent build-time crashes.
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    return NextResponse.json({ error: "Email configuration missing" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { to, subject, html } = await req.json();

    const data = await resend.emails.send({
      from: "The Organised Types <theorganisedtypes@gmail.com>",
      to,
      subject,
      html,
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
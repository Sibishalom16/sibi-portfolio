import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // 1. Save message to Supabase
    const { data: savedMessage, error: supabaseError } =
      await supabaseAdmin
        .from("contact_messages")
        .insert({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
        })
        .select()
        .single();

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);

      return NextResponse.json(
        { error: "Failed to save message." },
        { status: 500 }
      );
    }

    // 2. Send email notification
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      replyTo: cleanEmail,
      subject: `New Portfolio Contact — ${cleanName}`,
      html: `
        <h2>New message from your portfolio</h2>

        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>

        <p><strong>Message:</strong></p>
        <p>${cleanMessage}</p>

        <p>
          <strong>Submitted at:</strong>
          ${savedMessage.created_at}
        </p>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);

      return NextResponse.json(
        {
          error: "Message was saved, but email notification failed.",
        },
        { status: 500 }
      );
    }

    console.log("Resend email sent:", emailData?.id);

    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
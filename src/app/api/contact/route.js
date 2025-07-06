import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.NEXT_PUBLIC_EMAIL || "sangarcool20@gmail.com";
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, message } = body;

    const emailResponse = await resend.emails.send({
      from: "Your Name <onboarding@resend.dev>",
      to: toEmail,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

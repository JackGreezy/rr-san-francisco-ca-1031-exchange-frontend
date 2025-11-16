import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set");
}
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn("TURNSTILE_SECRET_KEY is not set, skipping verification");
    return true;
  }

  try {
    const formData = new FormData();
    formData.append("secret", TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

async function sendToZapier(data: Record<string, any>): Promise<void> {
  if (!ZAPIER_WEBHOOK_URL) {
    console.warn("ZAPIER_WEBHOOK_URL is not set, skipping Zapier");
    return;
  }

  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Zapier webhook error:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      projectType,
      timeline,
      details,
      turnstileToken,
    } = body;

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Turnstile token is required" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               undefined;

    const isValidTurnstile = await verifyTurnstile(turnstileToken, ip);
    if (!isValidTurnstile) {
      return NextResponse.json(
        { error: "Turnstile verification failed" },
        { status: 400 }
      );
    }

    const emailContent = `
New Contact Form Submission

Name: ${name}
Company: ${company || "N/A"}
Email: ${email}
Phone: ${phone}
Project Type: ${projectType}
Timeline: ${timeline}
Details: ${details}
    `.trim();

    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_TO_EMAIL) {
      try {
        await sgMail.send({
          to: process.env.SENDGRID_TO_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL || "noreply@1031exchangesanfrancisco.com",
          subject: `New Contact Form: ${projectType}`,
          text: emailContent,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0C1E2E;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Name:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Company:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${company || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Phone:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Project Type:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Timeline:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;"><strong>Details:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #E5E7EB;">${details.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </div>
          `,
        });
      } catch (error) {
        console.error("SendGrid error:", error);
      }
    }

    await sendToZapier({
      name,
      company,
      email,
      phone,
      projectType,
      timeline,
      details,
      source: "contact-form",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


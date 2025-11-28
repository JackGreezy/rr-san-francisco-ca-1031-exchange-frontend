import { NextRequest, NextResponse } from "next/server";
import { getBrand } from '@/lib/brand';
import { sendCustomerConfirmation, sendInternalNotifications } from '@/lib/email/sendgrid';

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn("TURNSTILE_SECRET_KEY is not set, skipping verification");
    return true;
  }

  try {
    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
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
  if (!process.env.ZAPIER_WEBHOOK_URL) {
    console.warn("ZAPIER_WEBHOOK_URL is not set, skipping Zapier");
    return;
  }

  try {
    await fetch(process.env.ZAPIER_WEBHOOK_URL, {
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
      property,
      estimatedCloseDate,
      city,
      message,
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

    // Send to Zapier
    await sendToZapier({
      name,
      company,
      email,
      phone,
      projectType,
      timeline,
      details: details || message || "",
      property: property || "",
      estimatedCloseDate: estimatedCloseDate || "",
      city: city || "",
      source: "contact-form",
      timestamp: new Date().toISOString(),
    });

    // Send emails via SendGrid template
    const brand = getBrand();
    const lead = {
      name: String(name || ''),
      email: String(email || ''),
      phone: phone ? String(phone).replace(/\D/g, '') : undefined,
      phone_plain: phone ? String(phone).replace(/\D/g, '') : undefined,
      projectType: String(projectType || '1031 Exchange Project'),
      property: property ? String(property) : undefined,
      estimatedCloseDate: estimatedCloseDate ? String(estimatedCloseDate) : undefined,
      city: city ? String(city) : undefined,
      company: company ? String(company) : undefined,
      timeline: timeline ? String(timeline) : undefined,
      message: message ? String(message) : (details ? String(details) : undefined),
    };

    const brandWithDate = {
      ...brand,
      submitted_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    try {
      await Promise.all([
        sendCustomerConfirmation(brandWithDate, lead),
        sendInternalNotifications(brandWithDate, lead),
      ]);
      console.log('SendGrid emails sent successfully to:', email);
    } catch (error) {
      console.error("SendGrid email failed", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

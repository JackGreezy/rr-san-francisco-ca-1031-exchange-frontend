import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your information.`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
      <h1 className="mb-8 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg max-w-none text-[#1E1E1E]/80">
        <p className="text-sm text-[#1E1E1E]/60 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Information We Collect
          </h2>
          <p className="mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email, phone number)</li>
            <li>Company information</li>
            <li>Property and transaction details</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your inquiries and provide services</li>
            <li>Send you information about our services</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise these rights, please contact us using the information provided on our contact page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}


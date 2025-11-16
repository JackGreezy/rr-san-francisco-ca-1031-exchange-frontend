import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of service for ${SITE_NAME}. Read our terms and conditions.`,
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
      <h1 className="mb-8 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
        Terms of Service
      </h1>
      
      <div className="prose prose-lg max-w-none text-[#1E1E1E]/80">
        <p className="text-sm text-[#1E1E1E]/60 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Use License
          </h2>
          <p className="mb-4">
            Permission is granted to temporarily access the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Disclaimer
          </h2>
          <p className="mb-4">
            The materials on this website are provided on an 'as is' basis. This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
          <p>
            Educational content only. Not tax or legal advice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Limitations
          </h2>
          <p>
            In no event shall this website or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Revisions
          </h2>
          <p>
            This website may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Contact Information
          </h2>
          <p>
            If you have any questions about these Terms of Service, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}


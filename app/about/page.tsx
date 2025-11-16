import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} helps investors identify 1031 exchange replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          About {SITE_NAME}
        </h1>
      </div>

      <div className="prose prose-lg max-w-none space-y-8 text-[#1E1E1E]/80">
        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            Our Focus
          </h2>
          <p>
            This site is focused on helping you identify potential replacement
            properties for Section 1031 exchanges in {PRIMARY_CITY},{" "}
            {PRIMARY_STATE_ABBR}. We provide property identification services,
            timeline management, and coordination support throughout the
            exchange process.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            What We Do
          </h2>
          <p>
            We help investors find replacement properties that qualify for 1031
            exchange treatment. Our team sources properties across asset types
            including multifamily, industrial, retail, medical office, self
            storage, net lease, and mixed use properties in {PRIMARY_CITY} and
            surrounding areas.
          </p>
          <p>
            We coordinate with qualified intermediaries, attorneys, and CPAs
            to ensure your exchange stays compliant with IRS deadlines and
            requirements. We track your 45 day identification and 180 day
            closing milestones.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            What We Are Not
          </h2>
          <p>
            We are not a Qualified Intermediary. We are not a law firm. We are
            not a broker. We are not a CPA firm. We help you identify
            properties and coordinate with third party qualified intermediaries,
            lenders, and tax advisors.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            Secure Intake Process
          </h2>
          <p>
            When you contact us, we collect information about your exchange
            goals, timeline, and property preferences. This information helps us
            identify suitable replacement properties and coordinate with your
            qualified intermediary and tax advisor.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            Property Matching Workflow
          </h2>
          <p>
            We review your exchange requirements and source properties that meet
            your criteria. We provide property summaries, rent roll verification,
            operating statement review, and market comparable analysis. We
            coordinate with brokers, qualified intermediaries, and lenders to
            facilitate due diligence and closing.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-2xl text-[#0C1E2E]">
            Third Party Coordination
          </h2>
          <p>
            We coordinate with qualified intermediaries to ensure escrow,
            legal, and lending workstreams stay synchronized. We work with
            lenders to support preflight and underwriting requirements. We
            coordinate with attorneys and CPAs to ensure compliance with IRS
            deadlines and reporting requirements.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-8 text-center">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Ready to Begin Your Exchange?
          </h2>
          <p className="mb-6 text-[#1E1E1E]/80">
            Contact us to discuss your 1031 exchange property identification
            needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}


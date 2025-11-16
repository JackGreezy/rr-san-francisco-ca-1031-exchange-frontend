import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `1031 Exchange Tools & Calculators | ${SITE_NAME}`,
  description: `Free interactive 1031 exchange calculators and tools for investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Calculate boot, exchange costs, and validate identification rules.`,
  keywords: `1031 exchange tools, 1031 exchange calculators, boot calculator, exchange cost estimator, identification rules checker, ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  openGraph: {
    title: `1031 Exchange Tools & Calculators | ${SITE_NAME}`,
    description: `Free interactive calculators and tools for 1031 exchange investors in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    type: "website",
    url: `${SITE_URL}/tools`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
};

const TOOLS = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description:
      "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    icon: "calculator",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description:
      "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.",
    icon: "dollar",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description:
      "Validate your property identification against the 3-property, 200%, and 95% identification rules.",
    icon: "checklist",
  },
];

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.toLowerCase().trim() || "";

  const filteredTools = query
    ? TOOLS.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      )
    : TOOLS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          1031 Exchange Tools
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[#1E1E1E]/80">
          Interactive calculators and tools for {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} investors.
        </p>
      </div>

      {query && (
        <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-6 py-4">
          <p className="text-sm text-[#1E1E1E]/80">
            Showing {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} matching "{query}"
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col gap-4 rounded-3xl border border-[#E5E7EB] bg-white p-6 transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#FAFAFA] text-[#0C1E2E] transition group-hover:border-[#F5B32F] group-hover:bg-[#F5B32F]/10">
              {tool.icon === "calculator" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 6h8" />
                  <path d="M8 10h8" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              )}
              {tool.icon === "dollar" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              )}
              {tool.icon === "checklist" && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              )}
            </div>
            <h2 className="font-semibold text-xl text-[#0C1E2E] transition group-hover:text-[#F5B32F]">
              {tool.name}
            </h2>
            <p className="flex-1 text-sm leading-relaxed text-[#1E1E1E]/80">
              {tool.description}
            </p>
            <span className="text-sm font-medium text-[#F5B32F]">
              Try it now →
            </span>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && query && (
        <div className="mt-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-12 text-center">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            No tools found matching "{query}"
          </h2>
          <p className="mb-6 text-[#1E1E1E]/80">
            Contact us to discuss your specific 1031 exchange needs.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(query)}`}
            className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
          >
            Contact Us
          </Link>
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-12 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Get Started?
        </h2>
        <p className="mb-6 text-[#1E1E1E]/80">
          These tools provide estimates only. Contact us to discuss your specific 1031 exchange needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}


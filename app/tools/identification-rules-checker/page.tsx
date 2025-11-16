import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `Identification Rules Checker | 1031 Exchange Calculator | ${SITE_NAME}`,
  description: `Validate your property identification against the 3-property, 200%, and 95% identification rules for 1031 exchanges in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Free interactive checker.`,
  keywords: `identification rules checker, 3 property rule, 200 percent rule, 95 percent rule, 1031 exchange identification, 1031 exchange calculator, ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  openGraph: {
    title: `Identification Rules Checker | ${SITE_NAME}`,
    description: `Validate your property identification against IRS rules for 1031 exchanges in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    type: "website",
    url: `${SITE_URL}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/identification-rules-checker`,
  },
};

export default async function IdentificationRulesCheckerPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
  ];

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="mb-4 font-serif text-3xl font-bold text-[#0C1E2E] md:text-4xl">
          Identification Rules Checker
        </h1>
        <p className="mb-8 text-lg text-[#1E1E1E]/80">
          Validate your property identification against the 3-property, 200%, or 95% identification rules. You must satisfy at least one of these rules to maintain your 1031 exchange eligibility. The three property rule is the most commonly used and easiest to satisfy.
        </p>

        <IdentificationRulesChecker />

        <div className="mt-8 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-6">
          <p className="text-sm text-[#1E1E1E]/80">
            <strong className="text-[#0C1E2E]">Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates only. Consult a qualified intermediary and tax advisor before making decisions. California does not impose a state real estate transfer tax, but recording fees and title insurance premiums still apply.
          </p>
        </div>

        <div className="mt-12 border-t border-[#E5E7EB] pt-8">
          <h2 className="mb-4 font-serif text-2xl font-bold text-[#0C1E2E]">
            Related Resources
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/tools/boot-calculator"
                className="text-[#0C1E2E] underline decoration-[#F5B32F] decoration-2 underline-offset-4 transition hover:text-[#F5B32F]"
              >
                Boot Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/tools/exchange-cost-estimator"
                className="text-[#0C1E2E] underline decoration-[#F5B32F] decoration-2 underline-offset-4 transition hover:text-[#F5B32F]"
              >
                Exchange Cost Estimator
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[#0C1E2E] underline decoration-[#F5B32F] decoration-2 underline-offset-4 transition hover:text-[#F5B32F]"
              >
                Contact Us for Identification Guidance
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Script
        id="identification-rules-checker-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Identification Rules Checker",
          description: `Validate your property identification against IRS rules for 1031 exchanges in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
          url: `${SITE_URL}/tools/identification-rules-checker`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${SITE_URL}/tools`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Identification Rules Checker",
                item: `${SITE_URL}/tools/identification-rules-checker`,
              },
            ],
          },
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "Identification Rules Checker",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        })}
      </Script>
    </>
  );
}


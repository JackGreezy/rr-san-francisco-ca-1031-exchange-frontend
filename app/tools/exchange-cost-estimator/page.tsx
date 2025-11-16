import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/config";

export const metadata: Metadata = {
  title: `Exchange Cost Estimator | 1031 Exchange Calculator | ${SITE_NAME}`,
  description: `Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Free interactive calculator.`,
  keywords: `exchange cost estimator, 1031 exchange costs, QI fees, escrow fees, title insurance, recording fees, 1031 exchange calculator, ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  openGraph: {
    title: `Exchange Cost Estimator | ${SITE_NAME}`,
    description: `Calculate all closing costs for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    type: "website",
    url: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
};

export default async function ExchangeCostEstimatorPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  ];

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="mb-4 font-serif text-3xl font-bold text-[#0C1E2E] md:text-4xl">
          Exchange Cost Estimator
        </h1>
        <p className="mb-8 text-lg text-[#1E1E1E]/80">
          Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange. This tool helps you estimate the total costs associated with completing a 1031 exchange transaction.
        </p>

        <ExchangeCostEstimator />

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
                href="/tools/identification-rules-checker"
                className="text-[#0C1E2E] underline decoration-[#F5B32F] decoration-2 underline-offset-4 transition hover:text-[#F5B32F]"
              >
                Identification Rules Checker
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[#0C1E2E] underline decoration-[#F5B32F] decoration-2 underline-offset-4 transition hover:text-[#F5B32F]"
              >
                Contact Us for Exchange Cost Estimates
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Script
        id="exchange-cost-estimator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Exchange Cost Estimator",
          description: `Calculate all closing costs for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
          url: `${SITE_URL}/tools/exchange-cost-estimator`,
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
                name: "Exchange Cost Estimator",
                item: `${SITE_URL}/tools/exchange-cost-estimator`,
              },
            ],
          },
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "Exchange Cost Estimator",
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


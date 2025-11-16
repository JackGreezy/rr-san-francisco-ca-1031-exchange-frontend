import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getServiceBySlug,
  getRelatedServices,
  searchServices,
  getServiceDataFromBatches,
} from "@/lib/services";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DIGITS,
} from "@/lib/config";
import SearchInput from "@/components/SearchInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import Script from "next/script";

export async function generateStaticParams() {
  const { SERVICES } = await import("@/lib/services");
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.description,
    alternates: {
      canonical: `${SITE_URL}/services/${resolvedParams.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) {
    notFound();
  }

  // Find service data from all batch files
  const serviceData = getServiceDataFromBatches(resolvedParams.slug);

  const relatedServices = getRelatedServices(resolvedParams.slug, 4);
  const query = resolvedSearchParams.q || "";
  const filteredRelated = query
    ? searchServices(query).filter((s) => s.slug !== resolvedParams.slug).slice(0, 4)
    : relatedServices;

  // Use FAQs from batch data or fallback
  const faqs = serviceData?.faqs || [
    {
      question: `How does ${service.title.toLowerCase()} work in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${service.description} Our team coordinates with qualified intermediaries, attorneys, and CPAs throughout ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} to ensure compliance with IRS deadlines and requirements.`,
    },
    {
      question: `What timeline should I expect for ${service.title.toLowerCase()}?`,
      answer: `Timelines vary based on your specific exchange structure and property requirements in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We track your 45 day identification and 180 day closing deadlines to ensure timely completion.`,
    },
    {
      question: `Do you work with qualified intermediaries in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Yes. We coordinate with qualified intermediaries throughout ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} to ensure escrow, legal, and lending workstreams stay synchronized. We are not a Qualified Intermediary ourselves.`,
    },
    {
      question: `How do I get started with ${service.title.toLowerCase()}?`,
      answer: `Contact us to discuss your 1031 exchange goals in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We will review your situation and connect you with qualified intermediaries and tax advisors as needed.`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <div className="mb-12">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          {service.title}
        </h1>
        <div
          className="text-lg leading-relaxed text-[#1E1E1E]/80"
          dangerouslySetInnerHTML={{
            __html: serviceData?.mainDescription || service.description
          }}
        />
      </div>

      {serviceData?.inclusions && serviceData.inclusions.length > 0 && (
        <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-white p-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            What's Included
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {serviceData.inclusions.map((inclusion: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-[#F5B32F]">•</span>
                <span className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {inclusion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serviceData?.commonSituations && serviceData.commonSituations.length > 0 && (
        <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Common Situations
          </h2>
          <ul className="space-y-3">
            {serviceData.commonSituations.map((situation: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 text-[#F5B32F]">•</span>
                <span className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {situation}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq: { question: string; answer: string }, index: number) => (
            <div key={index}>
              <h3 className="mb-2 font-semibold text-lg text-[#0C1E2E]">
                {faq.question}
              </h3>
              <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Related Services
        </h2>
        <div className="mb-4">
          <SearchInput
            placeholder="Search related services..."
            defaultValue={query}
            action={`/services/${resolvedParams.slug}`}
          />
        </div>

        {filteredRelated.length === 0 ? (
          <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8 text-center">
            <h3 className="mb-2 font-semibold text-xl text-[#0C1E2E]">
              We can help with "{query}"
            </h3>
            <p className="mb-4 text-[#1E1E1E]/80">
              Contact us to discuss your specific service needs.
            </p>
            <Link
              href={`/contact?projectType=${encodeURIComponent(query)}`}
              className="inline-block rounded-full bg-[#0C1E2E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
            >
              Contact Us
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRelated.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group flex flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-6 transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
              >
                <h3 className="font-semibold text-lg text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                  {related.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {related.shortDescription}
                </p>
                <span className="text-sm font-medium text-[#F5B32F]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {serviceData?.exampleCapability && (
        <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Example Capability
          </h2>
          <p className="mb-4 text-sm italic text-[#1E1E1E]/60">
            {serviceData.exampleCapability.disclaimer}
          </p>
          <div className="space-y-4">
            {serviceData.exampleCapability.location && (
              <div>
                <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                  Location
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.location}
                </p>
              </div>
            )}
            {serviceData.exampleCapability.scope && (
              <div>
                <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                  Scope
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.scope}
                </p>
              </div>
            )}
            {serviceData.exampleCapability.clientSituation && (
              <div>
                <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                  Client Situation
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.clientSituation}
                </p>
              </div>
            )}
            {serviceData.exampleCapability.ourApproach && (
              <div>
                <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                  Our Approach
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.ourApproach}
                </p>
              </div>
            )}
            {serviceData.exampleCapability.expectedOutcome && (
              <div>
                <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                  Expected Outcome
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.expectedOutcome}
                </p>
              </div>
            )}
            {serviceData.exampleCapability.contactCTA && (
              <div className="pt-4">
                <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                  {serviceData.exampleCapability.contactCTA}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {serviceData?.complianceNote && (
        <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
          <p className="text-xs leading-relaxed text-[#1E1E1E]/60 italic">
            {serviceData.complianceNote}
          </p>
        </div>
      )}

      <div className="mt-12 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-8 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Get Started?
        </h2>
        <p className="mb-6 text-[#1E1E1E]/80">
          Contact us to discuss your 1031 exchange needs in {PRIMARY_CITY},{" "}
          {PRIMARY_STATE_ABBR}.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/contact?projectType=${encodeURIComponent(service.title)}`}
            className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
          >
            Contact Us
          </Link>
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="inline-block rounded-full border border-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E] hover:text-white"
          >
            Call Now
          </a>
        </div>
      </div>

      <Script
        id={`service-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          areaServed: {
            "@type": "City",
            name: PRIMARY_CITY,
            addressRegion: PRIMARY_STATE_ABBR,
          },
        })}
      </Script>

      <Script
        id={`breadcrumb-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
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
              name: "Services",
              item: `${SITE_URL}/services`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.title,
              item: `${SITE_URL}/services/${resolvedParams.slug}`,
            },
          ],
        })}
      </Script>
    </div>
  );
}


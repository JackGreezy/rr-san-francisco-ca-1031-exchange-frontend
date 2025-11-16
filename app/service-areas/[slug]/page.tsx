import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getLocationBySlug, getLocationDataFromBatches } from "@/lib/locations";
import { locationsData } from "@/data";
import { servicesData } from "@/data";
import {
  SITE_NAME,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE_DIGITS,
} from "@/lib/config";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getLocationImagePath } from "@/lib/image-utils";

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);
  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange Properties in ${location.name}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`,
    description: `Find 1031 exchange replacement properties in ${location.name}, ${PRIMARY_STATE_ABBR}.`,
    alternates: {
      canonical: `${SITE_URL}/service-areas/${resolvedParams.slug}`,
    },
  };
}

export default async function LocationPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.slug);
  if (!location) {
    notFound();
  }

  // Find location data from all batch files
  const locationData = getLocationDataFromBatches(resolvedParams.slug);

  // Get services and property types related to this location's popular paths
  const popularPaths = locationData?.popularPaths || [];
  const locationServices = popularPaths
    .filter((path: any) => path.type === "service")
    .slice(0, 6)
    .map((path: any) => {
      const service = servicesData.find((s) => s.slug === path.slug);
      return service
        ? {
            slug: service.slug,
            name: service.name,
            short: service.short,
            whyPopular: path.whyPopular,
          }
        : null;
    })
    .filter((s: { slug: string; name: string; short: string; whyPopular?: string } | null): s is { slug: string; name: string; short: string; whyPopular?: string } => s !== null);

  // Use FAQs from batch data or fallback
  const faqs = locationData?.faqs || [
    {
      question: `What types of 1031 exchange properties are available in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${location.name}, ${PRIMARY_STATE_ABBR} offers various replacement property options including multifamily, industrial, retail, and mixed use assets. We help investors identify properties that meet their exchange requirements and timeline.`,
    },
    {
      question: `How do I identify replacement properties in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `We help investors in ${location.name}, ${PRIMARY_STATE_ABBR} identify replacement properties that qualify for 1031 exchange treatment. Our team coordinates with qualified intermediaries and local brokers to source suitable assets.`,
    },
    {
      question: `What are the 45 and 180 day deadlines for exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `The 45 day identification and 180 day closing deadlines apply to all 1031 exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}. We track these deadlines and coordinate with qualified intermediaries to ensure compliance.`,
    },
    {
      question: `Do you work with qualified intermediaries in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Yes. We coordinate with qualified intermediaries throughout ${location.name}, ${PRIMARY_STATE_ABBR} to ensure escrow, legal, and lending workstreams stay synchronized. We are not a Qualified Intermediary ourselves.`,
    },
  ];

  const imagePath = getLocationImagePath(resolvedParams.slug, location.name, PRIMARY_STATE_ABBR);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: location.name, href: `/service-areas/${location.slug}` },
        ]}
      />

      <div className="mb-12">
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-3xl md:h-96">
          <Image
            src={`${imagePath}.jpg`}
            alt={`${location.name}, ${PRIMARY_STATE_ABBR} - 1031 Exchange Properties`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          1031 Exchange Properties in {location.name}, {PRIMARY_STATE_ABBR}
        </h1>
        {locationData?.mainDescription ? (
          <div
            className="text-lg leading-relaxed text-[#1E1E1E]/80"
            dangerouslySetInnerHTML={{
              __html: locationData.mainDescription,
            }}
          />
        ) : (
          <p className="text-lg leading-relaxed text-[#1E1E1E]/80">
            Find 1031 exchange replacement properties in {location.name}, {PRIMARY_STATE_ABBR}. We help investors identify properties across the Bay Area and nationwide.
          </p>
        )}
      </div>

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

      {popularPaths.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
            Popular Property Paths in {location.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularPaths.slice(0, 6).map((path: any, index: number) => {
              if (path.type === "service") {
                const service = servicesData.find((s) => s.slug === path.slug);
                if (!service) return null;
                return (
                  <Link
                    key={`service-${path.slug}`}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-6 transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B32F]/20 text-sm font-semibold text-[#0C1E2E]">
                        {path.rank}
                      </span>
                      <h3 className="font-semibold text-lg text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                        {path.name}
                      </h3>
                    </div>
                    {path.whyPopular && (
                      <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                        {path.whyPopular}
                      </p>
                    )}
                    <span className="text-sm font-medium text-[#F5B32F]">
                      Learn more →
                    </span>
                  </Link>
                );
              }
              // Handle property types - link to property-types page if it exists
              return (
                <div
                  key={`property-${path.slug}-${index}`}
                  className="flex flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5B32F]/20 text-sm font-semibold text-[#0C1E2E]">
                      {path.rank}
                    </span>
                    <h3 className="font-semibold text-lg text-[#0C1E2E]">
                      {path.name}
                    </h3>
                  </div>
                  {path.whyPopular && (
                    <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                      {path.whyPopular}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {locationData?.exampleCapability && (
        <div className="mb-12 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            Example Capability
          </h2>
          <p className="mb-4 text-sm italic text-[#1E1E1E]/60">
            {locationData.exampleCapability.disclaimer}
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                Situation
              </h3>
              <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                {locationData.exampleCapability.situation}
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                Our Approach
              </h3>
              <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                {locationData.exampleCapability.ourApproach}
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-lg text-[#0C1E2E]">
                Expected Outcome
              </h3>
              <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                {locationData.exampleCapability.expectedOutcome}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-8 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Find Replacement Properties in {location.name}?
        </h2>
        <p className="mb-6 text-[#1E1E1E]/80">
          Contact us to discuss 1031 exchange properties in {location.name}, {PRIMARY_STATE_ABBR}.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
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
        id={`location-jsonld-${resolvedParams.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: `${location.name}, ${PRIMARY_STATE_ABBR}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: location.name,
            addressRegion: PRIMARY_STATE_ABBR,
            addressCountry: "US",
          },
        })}
      </Script>

      <Script
        id={`breadcrumb-location-jsonld-${resolvedParams.slug}`}
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
              name: "Service Areas",
              item: `${SITE_URL}/service-areas`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: location.name,
              item: `${SITE_URL}/service-areas/${resolvedParams.slug}`,
            },
          ],
        })}
      </Script>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import SearchInput from "@/components/SearchInput";

export const metadata: Metadata = {
  title: `1031 Exchange Services in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} investors. Property identification, timeline management, and compliance support.`,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

function searchServices(query: string) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return servicesData;
  return servicesData.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.short.toLowerCase().includes(lowerQuery)
  );
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const filteredServices = searchServices(query);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          1031 Exchange Services
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[#1E1E1E]/80">
          Comprehensive property identification and exchange coordination services
          for investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
        </p>
      </div>

      <div className="mb-8">
        <SearchInput
          placeholder="Search services..."
          defaultValue={query}
          action="/services"
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-12 text-center">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            We can help with "{query}"
          </h2>
          <p className="mb-6 text-[#1E1E1E]/80">
            Our team specializes in 1031 exchange property identification and
            coordination. Contact us to discuss your specific needs.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(query)}`}
            className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
          >
            Contact Us
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-[#E5E7EB] bg-white p-6 transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
            >
              <h2 className="font-semibold text-xl text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                {service.name}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-[#1E1E1E]/80">
                {service.short}
              </p>
              <span className="text-sm font-medium text-[#F5B32F]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-12 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Get Started?
        </h2>
        <p className="mb-6 text-lg text-[#1E1E1E]/80">
          Contact us to discuss your 1031 exchange needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
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


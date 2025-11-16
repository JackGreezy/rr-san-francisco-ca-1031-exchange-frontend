import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import SearchInput from "@/components/SearchInput";
import { getLocationImagePath } from "@/lib/image-utils";

function searchLocations(query: string) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return locationsData;
  return locationsData.filter(
    (l) =>
      l.name.toLowerCase().includes(lowerQuery) ||
      (l.parent && l.parent.toLowerCase().includes(lowerQuery))
  );
}

export const metadata: Metadata = {
  title: `1031 Exchange Locations Near ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Find 1031 exchange replacement properties in ${PRIMARY_CITY} and surrounding areas. We help investors identify properties across the Bay Area.`,
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
};

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const filteredLocations = searchLocations(query);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          Service Areas
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[#1E1E1E]/80">
          We help investors identify 1031 exchange replacement properties
          throughout {PRIMARY_CITY} and surrounding areas in {PRIMARY_STATE_ABBR}.
        </p>
      </div>

      <div className="mb-8">
        <SearchInput
          placeholder="Search locations..."
          defaultValue={query}
          action="/service-areas"
        />
      </div>

      {filteredLocations.length === 0 ? (
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-12 text-center">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            We can help with "{query}"
          </h2>
          <p className="mb-6 text-[#1E1E1E]/80">
            Our team serves investors throughout {PRIMARY_CITY} and {PRIMARY_STATE_ABBR}.
            Contact us to discuss properties in your area.
          </p>
          <Link
            href={`/contact?projectType=${encodeURIComponent(`Other: ${query}`)}`}
            className="inline-block rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b]"
          >
            Contact Us
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => {
            const imagePath = getLocationImagePath(location.slug, location.name, PRIMARY_STATE_ABBR);
            return (
              <Link
                key={location.slug}
                href={`/service-areas/${location.slug}`}
                className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={`${imagePath}.jpg`}
                    alt={`${location.name}, ${PRIMARY_STATE_ABBR}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <h2 className="font-semibold text-xl text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                    {location.name}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-[#1E1E1E]/80">
                    Find 1031 exchange replacement properties in {location.name}, {PRIMARY_STATE_ABBR}.
                  </p>
                  <span className="text-sm font-medium text-[#F5B32F]">
                    View properties →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-12 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Find Replacement Properties?
        </h2>
        <p className="mb-6 text-lg text-[#1E1E1E]/80">
          Contact us to discuss 1031 exchange properties in {PRIMARY_CITY} and surrounding areas in {PRIMARY_STATE_ABBR}.
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


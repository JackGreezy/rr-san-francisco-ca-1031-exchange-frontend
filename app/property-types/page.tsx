import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import SearchInput from "@/components/SearchInput";
import { getPropertyTypeImagePath } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: `1031 Exchange Property Types in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Explore property types eligible for 1031 exchange treatment in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Multifamily, industrial, retail, medical office, and more.`,
  alternates: {
    canonical: `${SITE_URL}/property-types`,
  },
};

const PROPERTY_TYPES = [
  {
    title: "Multifamily Communities",
    slug: "multifamily",
    imageSlug: "multifamily",
    description: `Stabilized or value-add multifamily communities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with professional management and verified rent rolls.`,
  },
  {
    title: "Retail Properties",
    slug: "retail",
    imageSlug: "retail",
    description: `Retail properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with credit tenants and stable income streams.`,
  },
  {
    title: "Industrial and R&D",
    slug: "industrial",
    imageSlug: "industrial",
    description: `Distribution, flex, and research facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with mission critical tenant improvements.`,
  },
  {
    title: "Medical and Life Science",
    slug: "medical-office",
    imageSlug: "medical-office",
    description: `OSHPD compliant facilities, labs, and life science campuses in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with specialized lease structures.`,
  },
  {
    title: "Single-Tenant NNN",
    slug: "nnn",
    imageSlug: "nnn",
    description: `Credit-backed, long lease assets in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} that balance cash flow needs for investors.`,
  },
  {
    title: "Self Storage",
    slug: "self-storage",
    imageSlug: "self-storage",
    description: `Self storage facilities in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} with verified occupancy rates and revenue streams.`,
  },
];

export default async function PropertyTypesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  const filtered = query
    ? PROPERTY_TYPES.filter(
        (pt) =>
          pt.title.toLowerCase().includes(query.toLowerCase()) ||
          pt.description.toLowerCase().includes(query.toLowerCase())
      )
    : PROPERTY_TYPES;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          Property Types
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-[#1E1E1E]/80">
          Explore property types eligible for 1031 exchange treatment in{" "}
          {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
        </p>
      </div>

      <div className="mb-8">
        <SearchInput
          placeholder="Search property types..."
          defaultValue={query}
          action="/property-types"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-12 text-center">
          <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
            We can help with "{query}"
          </h2>
          <p className="mb-6 text-[#1E1E1E]/80">
            Contact us to discuss property types for your 1031 exchange.
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
          {filtered.map((type) => {
            const imagePath = getPropertyTypeImagePath(type.imageSlug || type.slug, PRIMARY_CITY, PRIMARY_STATE_ABBR);
            // Multifamily uses .png, others use .jpg
            const imageExt = type.imageSlug === 'multifamily' ? '.png' : '.jpg';
            const imageSrc = `${imagePath}${imageExt}`;
            
            return (
              <Link
                key={type.slug}
                href={`/property-types/${type.slug}`}
                className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={type.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <h2 className="font-semibold text-xl text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                    {type.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-[#1E1E1E]/80">
                    {type.description}
                  </p>
                  <span className="text-sm font-medium text-[#F5B32F]">
                    Learn more →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-[#F5B32F]/10 p-12 text-center">
        <h2 className="mb-4 font-semibold text-2xl text-[#0C1E2E]">
          Ready to Find Your Replacement Property?
        </h2>
        <p className="mb-6 text-lg text-[#1E1E1E]/80">
          Contact us to discuss property types for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
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


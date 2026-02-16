import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data";
import { SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: `1031 Exchange Services in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  description: `Comprehensive 1031 exchange services for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} investors. Property identification, timeline management, and compliance support.`,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/service-areas/nob-hill-ca/nob-hill-ca.jpg"
          alt="1031 Exchange Services"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            1031 Exchange Services
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Comprehensive property identification and exchange coordination services for investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />
      </div>

      {/* Services Grid - Text-based cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-[#E5E0D8] p-8 hover:border-[#5A2828]/30 transition-colors"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[22px] font-normal text-[#2D2D2D] group-hover:text-[#5A2828] transition-colors mb-3">
                  {service.name}
                </h2>
                <p className="text-[13px] leading-relaxed text-[#666]">
                  {service.short}
                </p>
                <span className="inline-block mt-4 text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.08em] uppercase text-[#5A2828] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-8">
            Contact us to discuss your 1031 exchange needs in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

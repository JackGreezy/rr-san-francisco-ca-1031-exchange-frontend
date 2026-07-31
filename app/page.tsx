"use client";


import Script from "next/script";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_URL,
  PHONE_DIGITS,
  HAS_STAFFED_OFFICE,
} from "@/lib/config";

const HERO_VIDEO = "/baby part 2 .mp4";

const HERO_STATS = [
  { value: "$850M", label: "EXCHANGE VOLUME" },
  { value: "500+", label: "EXCHANGES COMPLETED" },
  { value: "$2.1B", label: "PROPERTIES IDENTIFIED" },
];

const PROPERTY_TYPES = [
  "NNN",
  "RESIDENTIAL",
  "COMMERCIAL",
  "INDUSTRIAL",
  "MULTIFAMILY",
  "MEDICAL",
  "SELF STORAGE",
  "RETAIL",
];

const SF_AREAS = [
  {
    slug: "pacific-heights-ca",
    name: "PACIFIC HEIGHTS",
    image: "/service-areas/pacific-heights-ca/pacific-heights-ca.jpg",
  },
  {
    slug: "marina-district-ca",
    name: "MARINA DISTRICT",
    image: "/service-areas/marina-district-ca/marina-district-ca.jpg",
  },
  {
    slug: "financial-district-ca",
    name: "FINANCIAL DISTRICT",
    image: "/service-areas/financial-district-ca/financial-district-ca.jpg",
  },
  {
    slug: "soma-ca",
    name: "SOMA",
    image: "/service-areas/soma-ca/soma-ca.avif",
  },
  {
    slug: "palo-alto-ca",
    name: "PALO ALTO",
    image: "/service-areas/palo-alto-ca/palo-alto-ca.webp",
  },
  {
    slug: "oakland-ca",
    name: "OAKLAND",
    image: "/service-areas/oakland-ca/oakland-ca.webp",
  },
];

const SERVICES = [
  {
    title: "Forward Exchange",
    description: "Traditional 1031 exchange where you sell your property first, then acquire replacement property within 180 days.",
    slug: "forward-exchange",
  },
  {
    title: "Reverse Exchange",
    description: "Acquire replacement property before selling your relinquished property when timing requires flexibility.",
    slug: "reverse-exchange",
  },
  {
    title: "Improvement Exchange",
    description: "Use exchange funds to make improvements on replacement property before completing the exchange.",
    slug: "improvement-exchange",
  },
  {
    title: "Delaware Statutory Trust",
    description: "Fractional ownership in institutional-grade properties for passive investors seeking diversification.",
    slug: "dst-investments",
  },
];

const FAQS = [
  {
    question: "What are the 45 and 180 day rules?",
    answer: "Day 0 begins when you close. You must identify replacement property by Day 45 and close by Day 180.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer: "Real property held for investment qualifies for like-kind treatment.",
  },
];

export default function Home() {
  const jsonLdGraph = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: PHONE_DIGITS,
          address: {
            "@type": "PostalAddress",
            streetAddress: HAS_STAFFED_OFFICE ? "50 California St" : "",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94111",
            addressCountry: "US",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ],
    });
  }, []);

  return (
    <div className="bg-[#F7F5F2]">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[38px] lg:text-[48px] font-normal tracking-[0.15em] uppercase">
            1031 Exchange San Francisco
              </h1>
          <p className="mt-6 max-w-2xl text-[14px] md:text-[16px] font-light tracking-wide leading-relaxed">
            Private offerings. Contact SF 1031 Exchange for private access to off-market investment properties.
          </p>
              </div>

        {/* Stats Bar at Bottom - Individual boxes, not edge-to-edge */}
        <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 z-10 w-full px-4 md:px-0 md:w-auto">
          <div className="flex gap-0">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-[#4A5568]/60 backdrop-blur-sm flex-1 md:flex-none px-4 md:px-14 py-4 md:py-5 text-center text-white ${
                  index !== HERO_STATS.length - 1 ? "border-r border-white/20" : ""
                }`}
              >
                <div className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[30px] font-normal">
                  {stat.value}
                </div>
                <div className="mt-1 text-[7px] md:text-[9px] font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Down Arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
              </div>
          </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section
        id="about"
        className="bg-[#2D2D2D] py-20 md:py-28"
      >
        <div className="flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-baseline justify-center">
                <span className="font-[family-name:var(--font-playfair)] text-[42px] md:text-[56px] font-normal leading-none text-white">
                  SF
                </span>
                <span className="text-[42px] md:text-[56px] text-white font-normal">.</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.4em] uppercase text-white/60 -mt-1">
                1031
              </span>
            </div>
            <p className="text-[12px] md:text-[13px] font-light leading-[1.85] tracking-wide max-w-2xl mx-auto text-white/70">
              SF 1031 Exchange is a boutique property identification and exchange coordination firm based in San Francisco, founded by an organic collaboration of highly successful real estate and tax professionals. Leveraging its stellar leadership and supported by the most refined resources in the industry, SF 1031 Exchange is driven by an unrelenting focus on discretion, transactional excellence and exceeding client expectation.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROPERTY TYPES - ROTATING CONVEYOR ==================== */}
      <section id="property-types" className="bg-[#F7F5F2] py-10 border-b border-[#E5E0D8] overflow-hidden">
        <div className="flex items-center">
          <span className="flex-shrink-0 pl-6 pr-8 text-[10px] font-medium tracking-[0.3em] uppercase text-[#888]">
            Property Types
          </span>
          
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {PROPERTY_TYPES.map((type, i) => (
                <span
                  key={`first-${i}`}
                  className="mx-8 font-[family-name:var(--font-playfair)] text-[18px] md:text-[22px] font-normal text-[#555] tracking-wide"
                >
                  {type}
                </span>
              ))}
              {PROPERTY_TYPES.map((type, i) => (
                <span
                  key={`second-${i}`}
                  className="mx-8 font-[family-name:var(--font-playfair)] text-[18px] md:text-[22px] font-normal text-[#555] tracking-wide"
                >
                  {type}
                </span>
                ))}
              </div>
              </div>
              </div>
          </section>

      {/* ==================== SF AREAS - Full width, edge to edge ==================== */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="px-4 md:px-6 lg:px-8">
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#333] mb-10">
            San Francisco Areas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {SF_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group relative block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[14px] md:text-[18px] font-normal tracking-[0.08em] text-white">
                      {area.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
                <Link
                    href="/service-areas"
              className="inline-block px-10 py-3 border border-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
                >
              See All
                </Link>
              </div>
              </div>
          </section>

      {/* ==================== 1031 EXCHANGE SECTION ==================== */}
      <section className="relative min-h-[450px]">
                          <Image
          src="/service-areas/palo-alto-ca/palo-alto-ca.webp"
          alt="Bay Area property"
                            fill
                            className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 flex min-h-[450px] items-center justify-center px-6 py-16">
          <div className="max-w-xl text-center bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-12">
            <div className="font-[family-name:var(--font-playfair)] text-[24px] md:text-[32px] font-normal text-white">
              IRS Section 1031
                        </div>
            <p className="mt-5 text-[13px] md:text-[14px] font-light leading-[1.8] text-white/90">
              Section 1031 of the Internal Revenue Code provides investors the opportunity to defer capital gains taxes when exchanging like-kind investment properties. SF 1031 Exchange is your exclusive partner in the San Francisco Bay Area.
            </p>
            <Link
              href="/irs-section-1031"
              className="inline-block mt-7 px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Learn More
            </Link>
                  </div>
                </div>
          </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#333] mb-4">
            Our Services
          </h2>
          <p className="text-center text-[14px] text-[#666] mb-10 max-w-2xl mx-auto">
            Comprehensive 1031 exchange solutions tailored to your investment strategy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-[#E5E0D8] p-8 hover:border-[#5A2828]/30 transition-colors"
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-[18px] md:text-[22px] font-normal text-[#2D2D2D] group-hover:text-[#5A2828] transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#666]">
                  {service.description}
                </p>
                <span className="inline-block mt-4 text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-block px-10 py-3 border border-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section className="bg-[#D4C4B0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[28px] md:text-[36px] font-normal tracking-[0.1em] uppercase text-[#5A2828] mb-6">
            Start Your Exchange
          </h2>
          <p className="text-[14px] text-[#5A2828]/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ready to defer your capital gains? Contact our team to discuss your 1031 exchange property identification needs in San Francisco.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-3 bg-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-white hover:bg-[#4A1F1F] transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+14159172994"
              className="px-10 py-3 border border-[#5A2828] text-[10px] font-medium tracking-[0.25em] uppercase text-[#5A2828] hover:bg-[#5A2828] hover:text-white transition-colors"
            >
              Call (415) 917-2994
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
        <Script
        id="sf-1031-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {jsonLdGraph}
        </Script>
    </div>
  );
}

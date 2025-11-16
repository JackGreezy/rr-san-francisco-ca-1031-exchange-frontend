"use client";

import Script from "next/script";
import { motion, useReducedMotion } from "framer-motion";
import { ChangeEvent, FormEvent, useId, useMemo, useState, ReactElement } from "react";
import {
  SITE_NAME,
  SITE_URL,
  PHONE,
  PHONE_DIGITS,
  HAS_STAFFED_OFFICE,
  IRS_LINKS,
  CA_TAX_LINKS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "@/lib/config";
import { servicesData } from "@/data";
import { locationsData } from "@/data";
import HomepageSearchInput from "@/components/HomepageSearchInput";
import Image from "next/image";
import Link from "next/link";
import { getLocationImagePath, getPropertyTypeImagePath } from "@/lib/image-utils";

function searchServices(query: string) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return servicesData;
  return servicesData.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.short.toLowerCase().includes(lowerQuery)
  );
}

function searchLocations(query: string) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return locationsData;
  return locationsData.filter(
    (l) =>
      l.name.toLowerCase().includes(lowerQuery) ||
      (l.parent && l.parent.toLowerCase().includes(lowerQuery))
  );
}

const TRUST_BADGES = [
  "CPA Partner Network",
  "Attorney Counsel",
  "Qualified Intermediary Alignment",
] as const;

const VALUE_PARAGRAPHS = [
  "We identify replacement properties nationwide that meet your investment criteria and IRS like-kind requirements. Our property search spans multifamily, NNN retail, industrial, medical office, and other commercial asset types across all 50 states.",
  "Our qualified intermediary coordination ensures seamless communication between your QI, escrow, title, lenders, and CPA. We manage documentation flow, deadline tracking, and fund transfers to keep your exchange compliant throughout the 45-day identification and 180-day closing periods.",
] as const;

const HOW_STEPS = [
  {
    title: "Sell your relinquished property",
    description:
      "Document proceeds with your qualified intermediary before the closing disbursement so exchange funds remain segregated.",
    icon: "timeline",
  },
  {
    title: "Identify replacements within 45 days",
    description:
      "Deliver the written identification letter, asset summaries, and contingency notes before midnight on Day 45.",
    icon: "target",
  },
  {
    title: "Close within 180 days",
    description:
      "Coordinate lender packages, due diligence, and intermediary instructions to complete the exchange before the IRS deadline.",
    icon: "check",
  },
] as const;

const WHY_POINTS = [
  { title: "Nationwide property identification", icon: "compass" },
  { title: "Qualified intermediary coordination", icon: "link" },
  { title: "45-day identification support", icon: "target" },
  { title: "180-day closing coordination", icon: "timeline" },
  { title: "Multi-state QI network", icon: "map" },
] as const;


const PROPERTY_TYPES = [
  {
    title: "Multifamily Communities",
    slug: "multifamily",
    summary:
      "Stabilized or value-add communities across San Francisco and Silicon Valley with professional management.",
    icon: "building",
  },
  {
    title: "Retail Properties",
    slug: "retail",
    summary:
      "Retail properties with credit tenants and stable income streams that qualify for like-kind treatment.",
    icon: "storefront",
  },
  {
    title: "Industrial and R&D",
    slug: "industrial",
    summary:
      "Distribution, flex, and research facilities with mission critical tenant improvements and environmental diligence.",
    icon: "factory",
  },
  {
    title: "Medical and Life Science",
    slug: "medical-office",
    summary:
      "OSHPD compliant facilities, labs, and life science campuses that demand specialized lease review.",
    icon: "medical",
  },
  {
    title: "Single-Tenant NNN",
    slug: "nnn",
    summary:
      "Credit-backed, long lease assets that can balance cash flow needs for Bay Area families and advisory firms.",
    icon: "storefront",
  },
  {
    title: "Self Storage",
    slug: "self-storage",
    summary:
      "Self storage facilities with verified occupancy rates and revenue streams for stable income generation.",
    icon: "building",
  },
] as const;


const FAQS = [
  {
    question: "What are the 45 and 180 day rules?",
    answer:
      "Day 0 begins when you close on the relinquished property. You must identify replacement property in writing to your qualified intermediary by midnight of Day 45, and you must close on the selected property by midnight of Day 180. Calendar days apply even when a deadline falls on a weekend or federal holiday unless the IRS issues formal relief.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Real property held for investment or productive use in a trade or business qualifies for like-kind treatment when exchanged for other real property with the same intent. Residential rentals, industrial parks, fractions of Delaware Statutory Trusts, and raw land are considered like-kind even if they differ in grade or geography.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any cash, debt relief, or non-like-kind value received during the exchange. Boot is taxable as capital gain in the year of the exchange. Coordinating loan balances and contract credits early helps keep inadvertent boot out of the closing statement.",
  },
  {
    question: "How are California transfer taxes handled?",
    answer:
      "Cities such as Los Angeles assess their own transfer taxes in addition to county fees. The transfer tax is due at closing even during a 1031 exchange, so the allocation must be disclosed to the intermediary and your CPA for accurate basis tracking.",
  },
  {
    question: "Can I perform a reverse exchange?",
    answer:
      "Reverse exchanges require a parking arrangement where the replacement property is acquired first and held by an exchange accommodation titleholder. Documentation, lender consent, and additional fees apply, so planning should begin before opening escrow.",
  },
  {
    question: "How do I report using IRS Form 8824?",
    answer:
      "Form 8824 captures dates, counterparties, and the realized and recognized gain. Our team compiles the intermediary statements, escrow instructions, and allocation schedules so your CPA can submit an accurate federal and California return.",
  },
] as const;

type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  property: string;
  closeDate: string;
  city: string;
  message: string;
};

const INITIAL_FORM: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  property: "",
  closeDate: "",
  city: "",
  message: "",
};


type IconVariant =
  | "timeline"
  | "target"
  | "check"
  | "map"
  | "link"
  | "gavel"
  | "calendar"
  | "compass"
  | "arrows"
  | "chart"
  | "document"
  | "building"
  | "mixed"
  | "factory"
  | "medical"
  | "storefront"
  | "land";

const ICON_PATHS: Record<IconVariant, ReactElement> = {
  timeline: (
    <>
      <path d="M4 12h16" />
      <circle cx="8" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="16" cy="12" r="1.2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 7V5" />
      <path d="M12 19v-2" />
    </>
  ),
  check: (
    <>
      <path d="M6 12l3 3 9-9" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </>
  ),
  map: (
    <>
      <path d="M7 5l-3 2v12l6-3 6 3 4-2V5l-6 3z" />
      <path d="M10 6v10" />
      <path d="M14 8v10" />
    </>
  ),
  link: (
    <>
      <path d="M10 14l4-4" />
      <path d="M8.5 8.5a3.5 3.5 0 0 1 5-5l1 1" />
      <path d="M15.5 15.5a3.5 3.5 0 0 1-5 5l-1-1" />
    </>
  ),
  gavel: (
    <>
      <path d="M13 10l4-4" />
      <path d="M9 14l4-4" />
      <path d="M7 16l-2 2" />
      <path d="M5 21h14" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16" />
      <path d="M9 3v4" />
      <path d="M15 3v4" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M15 9l-2 6-6 2 2-6z" />
    </>
  ),
  arrows: (
    <>
      <path d="M7 3l-4 4 4 4" />
      <path d="M17 13l4 4-4 4" />
      <path d="M3 7h9a5 5 0 0 1 5 5v1" />
      <path d="M21 17h-9a5 5 0 0 1-5-5v-1" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M8 20V10" />
      <path d="M12 20V4" />
      <path d="M16 20v-7" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v4h4" />
      <path d="M10 11h6" />
      <path d="M10 15h6" />
    </>
  ),
  building: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M10 9h4" />
      <path d="M10 13h4" />
      <path d="M10 17h4" />
    </>
  ),
  mixed: (
    <>
      <rect x="4" y="7" width="8" height="13" rx="1" />
      <path d="M12 10h8v10h-8" />
      <path d="M7 7V4h10v3" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20h18v-6l-5-3v3l-5-3v3l-5-3z" />
      <path d="M7 14v6" />
      <path d="M12 14v6" />
      <path d="M17 14v6" />
    </>
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </>
  ),
  storefront: (
    <>
      <path d="M4 9h16l-1 11H5z" />
      <path d="M4 9L6 4h12l2 5" />
      <path d="M10 13h4v7h-4z" />
    </>
  ),
  land: (
    <>
      <path d="M3 18h18" />
      <path d="M5 14l3-5 4 4 3-3 4 4" />
      <circle cx="6" cy="7" r="1" />
    </>
  ),
};

const Icon = ({ variant }: { variant: IconVariant }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0C1E2E]">
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[variant]}
    </svg>
  </div>
);


export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM);
  const [servicesQuery, setServicesQuery] = useState("");
  const [locationsQuery, setLocationsQuery] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof LeadFormData, string>>
  >({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const statusRegionId = useId();

  const jsonLdGraph = useMemo(() => {
    const faqEntities = FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: PHONE_DIGITS,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: PHONE_DIGITS,
              contactType: "customer service",
              areaServed: "US-CA",
              availableLanguage: ["English"],
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: HAS_STAFFED_OFFICE
              ? "50 California St"
              : "",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94111",
            addressCountry: "US",
          },
        },
        {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqEntities,
        },
      ],
    });
  }, []);

  const validateForm = (data: LeadFormData) => {
    const nextErrors: Partial<Record<keyof LeadFormData, string>> = {};
    if (!data.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Valid email is required.";
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a 10 digit phone number.";
    }
    if (!data.property.trim()) {
      nextErrors.property = "Describe the property you are selling.";
    }
    if (!data.closeDate.trim()) {
      nextErrors.closeDate = "Provide an estimated close date.";
    }
    if (!data.city.trim()) {
      nextErrors.city = "City is required.";
    }
    if (!data.message.trim()) {
      nextErrors.message = "Tell us about your exchange goals.";
    }
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateForm(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields.");
      return;
    }

    try {
      setStatus("loading");
      setStatusMessage("Submitting your details...");
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage(
        "Thank you. Our San Francisco team will respond within one business day.",
      );
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(
        "Something went wrong. Please call us or try submitting again.",
      );
    }
  };

  const fadeProps = (delay = 0.1) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const, delay },
  });

  const fadeUp = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-white text-[#1E1E1E]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(12,30,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,30,46,0.05) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
          <section className="relative py-20 md:py-28 text-center overflow-hidden rounded-3xl mb-8">
            {/* Hero Image Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/san-francisco-hero.jpg"
                alt="San Francisco skyline"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0C1E2E]/80 via-[#0C1E2E]/70 to-[#0C1E2E]/85" />
            </div>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-48 w-[90%] -translate-x-1/2 bg-gradient-to-b from-[#E6EEF7] to-transparent z-10 opacity-30"
            />
            <motion.div
              className="relative z-10 space-y-8"
              {...fadeProps(0)}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/90">
                Property Identification & Qualified Intermediary Services
              </p>
              <h1 className="font-bold text-4xl leading-[1.1] tracking-tight text-white md:text-5xl">
                Find Replacement Properties & Coordinate Your 1031 Exchange
              </h1>
              <p className="mx-auto max-w-3xl font-medium text-lg leading-relaxed text-white/95">
                We help San Francisco investors identify replacement properties nationwide and coordinate with qualified intermediaries to ensure your 1031 exchange meets all IRS deadlines. Our team specializes in property identification within the 45-day window and seamless QI coordination for the 180-day closing deadline.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#lead-form"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F] sm:w-auto"
                >
                  Start My Exchange
                </a>
                <a
                  href={`tel:${PHONE_DIGITS}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F] sm:w-auto"
                >
                  Call {PHONE}
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap justify-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/90">
                  {TRUST_BADGES.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-white"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/90">
                  45 Day identification. 180 Day closing. We help you stay
                  compliant.
                </p>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div
              className="space-y-8 rounded-[32px] border border-[#E5E7EB] bg-[#FAFAFA] px-10 py-12 text-center"
              {...fadeProps(0.1)}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#0C1E2E]/70">
                Property Identification & QI Coordination Excellence
              </p>
              <h2 className="font-bold text-3xl leading-tight text-[#0C1E2E] md:text-4xl">
                Expert Property Identification & Qualified Intermediary Coordination
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-[#1E1E1E]/80">
                {VALUE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-10" {...fadeProps(0.1)}>
              <div className="text-center">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  How a 1031 Exchange Works
                </h3>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {HOW_STEPS.map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="flex flex-col items-center gap-4 rounded-3xl border border-[#E5E7EB] bg-white px-6 py-8 text-center"
                    {...fadeProps(0.1 + index * 0.05)}
                  >
                    <Icon variant={step.icon as IconVariant} />
                    <h4 className="font-semibold text-lg text-[#0C1E2E]">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-[#0C1E2E]/70">
                Reference{" "}
                <a
                  href={IRS_LINKS.form8824}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#F5B32F] decoration-2 underline-offset-4"
                >
                  IRS Form 8824
                </a>
                ,{" "}
                <a
                  href={IRS_LINKS.likeKind}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#F5B32F] decoration-2 underline-offset-4"
                >
                  Like-Kind Exchange Rules
                </a>{" "}
                and{" "}
                <a
                  href={IRS_LINKS.safeHarbor}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#F5B32F] decoration-2 underline-offset-4"
                >
                  Rev. Proc. 2008-16 Safe Harbor
                </a>{" "}
                for official guidance.
              </p>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div
              className="grid gap-12 md:grid-cols-[1fr_minmax(0,0.9fr)]"
              {...fadeProps(0.1)}
            >
              <div className="space-y-6 text-center md:text-left">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  Why Investors Choose Our Process
                </h3>
                <ul className="space-y-4 text-left">
                  {WHY_POINTS.map((point) => (
                    <li
                      key={point.title}
                      className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white/80 p-4"
                    >
                      <Icon variant={point.icon as IconVariant} />
                      <span className="text-base font-medium text-[#1E1E1E]">
                        {point.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#1E1E1E]/70">
                  We identify replacement properties nationwide and coordinate with qualified intermediaries across all states to ensure your exchange documentation, fund transfers, and closing timelines stay synchronized with IRS requirements.
                </p>
              </div>
              <div className="space-y-4 rounded-3xl border border-[#F5B32F]/60 bg-[#FFF7E5] p-8 text-left">
                <h4 className="font-semibold text-2xl text-[#0C1E2E]">
                  Clarifier
                </h4>
                <p className="text-[#1E1E1E]/80">
                  A 1031 exchange defers federal and California income tax on
                  qualifying real property. It does not remove city or state
                  transfer taxes, so closing statements must disclose those
                  items.
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href={CA_TAX_LINKS.LA_DTT}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#0C1E2E] underline decoration-[#0C1E2E]/30 decoration-2 underline-offset-4"
                  >
                    Los Angeles Documentary Transfer Tax
                  </a>
                  <a
                    href={CA_TAX_LINKS.CA_TRANSFER}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#0C1E2E] underline decoration-[#0C1E2E]/30 decoration-2 underline-offset-4"
                  >
                    California Franchise Tax Board Guidance
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-10" {...fadeProps(0.1)}>
              <div className="text-center">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  Property Identification & QI Services
                </h3>
                <p className="text-base text-[#1E1E1E]/70">
                  Comprehensive property search and qualified intermediary coordination services for 1031 exchange investors.
                </p>
              </div>
              <div className="mb-6">
                <HomepageSearchInput
                  placeholder="Search services..."
                  defaultValue={servicesQuery}
                  action="/services"
                  onQueryChange={setServicesQuery}
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(servicesQuery
                  ? searchServices(servicesQuery)
                  : servicesData
                ).map((service, index) => (
                  <Link
                    key={service.slug}
                    href={service.route}
                    className="group"
                  >
                    <motion.article
                      className="flex flex-col gap-4 rounded-3xl border border-[#E5E7EB] bg-white/90 p-6 text-left transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
                      {...fadeProps(0.1 + index * 0.04)}
                    >
                      <h4 className="font-semibold text-lg text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                        {service.name}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
                        {service.short}
                      </p>
                    </motion.article>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="/services/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0C1E2E] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
                >
                  See all services
                </a>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-8" {...fadeProps(0.1)}>
              <div className="text-center">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  Property Types We Navigate
                </h3>
                <p className="text-base text-[#1E1E1E]/70">
                  Every asset is evaluated for basis, debt, and operational
                  readiness.
                </p>
              </div>
              <div className="divide-y divide-[#E5E7EB] rounded-3xl border border-[#E5E7EB] bg-white">
                {PROPERTY_TYPES.map((property) => {
                  const slug = property.slug;
                  const imagePath = getPropertyTypeImagePath(slug, PRIMARY_CITY, PRIMARY_STATE_ABBR);
                  // Multifamily uses .png, others use .jpg
                  const imageExt = slug === 'multifamily' ? '.png' : '.jpg';
                  
                  return (
                    <Link
                      key={property.title}
                      href={`/property-types/${slug}`}
                      className="group block transition hover:bg-[#FAFAFA]"
                    >
                      <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl">
                            <Image
                              src={`${imagePath}${imageExt}`}
                              alt={property.title}
                              fill
                              className="object-cover transition group-hover:scale-105"
                              sizes="64px"
                            />
                          </div>
                          <h4 className="font-semibold text-lg text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                            {property.title}
                          </h4>
                        </div>
                        <p className="max-w-2xl text-sm text-[#1E1E1E]/80">
                          {property.summary}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center">
                <a
                  href="/property-types/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0C1E2E] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
                >
                  Explore property types
                </a>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-10" {...fadeProps(0.1)}>
              <div className="text-center">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  1031 Exchange Tools
                </h3>
                <p className="mt-4 text-base text-[#1E1E1E]/70">
                  Interactive calculators to help you plan and execute your 1031 exchange.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <motion.div
                  variants={fadeUp}
                  className="group rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#0C1E2E] to-[#12304b] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href="/tools/boot-calculator" className="block">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
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
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold">Boot Calculator</h3>
                    <p className="text-gray-100">
                      Calculate boot and estimate tax implications for your 1031 exchange.
                    </p>
                  </Link>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="group rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#0C1E2E] to-[#12304b] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href="/tools/exchange-cost-estimator" className="block">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
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
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold">Exchange Cost Estimator</h3>
                    <p className="text-gray-100">
                      Calculate QI fees, escrow costs, title insurance, and recording fees.
                    </p>
                  </Link>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="group rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-[#0C1E2E] to-[#12304b] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href="/tools/identification-rules-checker" className="block">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
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
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold">Identification Rules Checker</h3>
                    <p className="text-gray-100">
                      Validate your property identification against IRS rules.
                    </p>
                  </Link>
                </motion.div>
              </div>
              <div className="text-center">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center rounded-full border border-[#0C1E2E] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
                >
                  View All Tools
                </Link>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-10" {...fadeProps(0.1)}>
              <div className="text-center space-y-4">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  California Coverage
                </h3>
                <p className="text-base text-[#1E1E1E]/80">
                  Providing 1031 exchange support for investors in San
                  Francisco, Oakland, San Jose, Sacramento, Los Angeles, and
                  across the state.
                </p>
              </div>
              <div className="mb-6">
                <HomepageSearchInput
                  placeholder="Search locations..."
                  defaultValue={locationsQuery}
                  action="/service-areas"
                  onQueryChange={setLocationsQuery}
                />
              </div>
              <div className="flex flex-col gap-8 rounded-3xl border border-[#E5E7EB] bg-white/90 p-8 text-center md:text-left">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {(locationsQuery
                    ? searchLocations(locationsQuery).slice(0, 8)
                    : locationsData.slice(0, 8)
                  ).map((location) => {
                    const imagePath = getLocationImagePath(location.slug, location.name, PRIMARY_STATE_ABBR);
                    return (
                      <a
                        key={location.slug}
                        href={`/service-areas/${location.slug}`}
                        className="group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white transition hover:border-[#0C1E2E]/30 hover:shadow-lg"
                      >
                        <div className="relative h-32 w-full">
                          <Image
                            src={`${imagePath}.jpg`}
                            alt={location.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-sm text-[#0C1E2E] group-hover:text-[#F5B32F] transition">
                            {location.name}
                          </h4>
                        </div>
                      </a>
                    );
                  })}
                </div>
                {locationsQuery && searchLocations(locationsQuery).length === 0 && (
                  <div className="text-center">
                    <a
                      href={`/contact?projectType=${encodeURIComponent(`Other: ${locationsQuery}`)}`}
                      className="inline-block rounded-full border border-[#0C1E2E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E] hover:text-white"
                    >
                      Contact for Other Locations
                    </a>
                  </div>
                )}
                <div className="text-center">
                  <a
                    href="/service-areas"
                    className="inline-flex items-center justify-center rounded-full border border-[#0C1E2E] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
                  >
                    View All Locations
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div className="space-y-8" {...fadeProps(0.1)}>
              <div className="text-center">
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="space-y-4 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA]">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.question} className="border-b border-[#E5E7EB] last:border-none">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq((prev) => (prev === index ? null : index))
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
                      >
                        <span className="font-semibold text-lg text-[#0C1E2E]">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-4 text-2xl text-[#0C1E2E]"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-sm leading-relaxed text-[#1E1E1E]/80">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section id="lead-form" className="py-20 md:py-28">
            <motion.div
              className="rounded-[32px] border border-[#E5E7EB] bg-white/95 p-8 shadow-[0_30px_80px_rgba(12,30,46,0.08)]"
              {...fadeProps(0.1)}
            >
              <div className="space-y-4 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-[#0C1E2E]/70">
                  Begin Your Exchange Consultation.
                </p>
                <h3 className="font-bold text-3xl text-[#0C1E2E] md:text-4xl">
                  Begin Your Exchange Consultation.
                </h3>
                <p className="text-base text-[#1E1E1E]/80">
                  Share the details of your transaction so we can design a
                  compliant plan for 1031 tax deferral California investors trust.
                </p>
              </div>
              <form
                className="mt-10 space-y-8"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="Name"
                    id="lead-name"
                    type="text"
                    value={formData.name}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, name: value }))
                    }
                    error={errors.name}
                    required
                  />
                  <FormField
                    label="Email"
                    id="lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, email: value }))
                    }
                    error={errors.email}
                    required
                  />
                  <FormField
                    label="Phone"
                    id="lead-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, phone: value }))
                    }
                    error={errors.phone}
                    required
                  />
                  <FormField
                    label="Estimated Close Date"
                    id="lead-date"
                    type="date"
                    value={formData.closeDate}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, closeDate: value }))
                    }
                    error={errors.closeDate}
                    required
                  />
                  <FormField
                    label="Property Being Sold"
                    id="lead-property"
                    type="text"
                    value={formData.property}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, property: value }))
                    }
                    error={errors.property}
                    required
                  />
                  <FormField
                    label="City"
                    id="lead-city"
                    type="text"
                    value={formData.city}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, city: value }))
                    }
                    error={errors.city}
                    required
                  />
                </div>
                <FormField
                  label="Message"
                  id="lead-message"
                  type="textarea"
                  value={formData.message}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, message: value }))
                  }
                  error={errors.message}
                  required
                />
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B32F]"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Submit"}
                  </button>
                  <p
                    id={statusRegionId}
                    role="status"
                    aria-live="polite"
                    className={`text-sm ${
                      status === "error"
                        ? "text-red-600"
                        : status === "success"
                          ? "text-green-600"
                          : "text-[#1E1E1E]/70"
                    }`}
                  >
                    {statusMessage}
                  </p>
                  <p className="text-xs text-[#1E1E1E]/60">
                    Educational content only. Not tax or legal advice.
                  </p>
                </div>
              </form>
            </motion.div>
          </section>

          <div className="border-t border-[#E5E7EB]" />

          <section className="py-20 md:py-28">
            <motion.div
              className="rounded-[32px] bg-[#F5B32F] px-8 py-12 text-center text-[#0C1E2E]"
              {...fadeProps(0.1)}
            >
              <h3 className="font-bold text-3xl leading-tight md:text-4xl">
                Ready To Begin Your 1031 Exchange?
              </h3>
              <p className="mt-4 text-base leading-relaxed">
                Our California team helps you meet deadlines and protect gains
                through every compliance checkpoint.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#lead-form"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#0C1E2E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E] transition hover:bg-[#0C1E2E]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C1E2E] sm:w-auto"
                >
                  Start My Exchange
                </a>
              </div>
            </motion.div>
          </section>

        </div>
        <Script
          id="golden-gate-ledger-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {jsonLdGraph}
        </Script>
      </div>
    </>
  );
}

type FormFieldProps = {
  label: string;
  id: string;
  type: "text" | "email" | "tel" | "date" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  error,
  required,
}: FormFieldProps) {
  const commonProps = {
    id,
    name: id,
    className:
      "w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50",
    value,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    required,
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#0C1E2E]"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={5} />
      ) : (
        <input type={type} {...commonProps} />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

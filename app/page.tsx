import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ContactFormWrapper } from "@/app/contact/contact-form";
import {
  OFFICE_ADDRESS,
  PHONE,
  PHONE_DIGITS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/config";

const HERO_VIDEO = "/baby part 2 .mp4";
const phoneHref = `tel:${PHONE_DIGITS}`;

const ownerSituations = [
  {
    title: "Planning a Property Sale",
    copy: "Start before closing so the sale structure, independent qualified intermediary, advisor questions, and replacement criteria can be addressed in the right order.",
    href: "/services/capital-gains-on-rental-property",
  },
  {
    title: "Already Under Contract",
    copy: "The closing date matters now. Review the exchange setup, ownership, timeline, and replacement search before the sale gets ahead of the plan.",
    href: "/services/the-45-day-identification-period",
  },
  {
    title: "Selling Inherited Property",
    copy: "Organize ownership, basis questions, qualifying use, co-owner priorities, and the intended sale before choosing an exchange path.",
    href: "/services/inherited-property-capital-gains",
  },
  {
    title: "Leaving Landlord Work Behind",
    copy: "Compare another directly owned property with net-lease and professionally managed alternatives when tenants, repairs, and capital projects no longer fit.",
    href: "/services/passive-real-estate-income",
  },
  {
    title: "Finding Replacement Property",
    copy: "Build a focused search around exchange equity, debt, income goals, control, geography, workload, diligence, and credible backup choices.",
    href: "/services/nationwide-property-identification",
  },
  {
    title: "Buying Before the Sale",
    copy: "Explore timing and financing questions when the preferred replacement opportunity appears before the current property is ready to close.",
    href: "/services/reverse-1031-exchange-explained",
  },
];

const solutionItems = [
  {
    title: "Begin with the actual transaction",
    copy: "Bring the property, ownership, expected sale date, debt, exchange equity, and reason for selling into one useful starting conversation.",
  },
  {
    title: "Bring the required professionals together",
    copy: "Connect the exchange facts with the independent qualified intermediary, CPA, attorney, brokers, lenders, and other licensed professionals the transaction requires.",
  },
  {
    title: "Define what the replacement must accomplish",
    copy: "Translate income, control, location, financing, management burden, risk tolerance, and closing probability into a practical property brief.",
  },
  {
    title: "Find primary and backup properties",
    copy: "Review direct property, net-lease opportunities, passive alternatives, and realistic backups before the identification period becomes a crisis.",
  },
  {
    title: "Compare ownership paths clearly",
    copy: "Put control, workload, fees, financing, liquidity, property risk, and sponsor or tenant exposure beside the owner’s stated priorities.",
  },
  {
    title: "Keep the replacement closing moving",
    copy: "Make open items visible across title, diligence, financing, exchange documents, funding instructions, and the replacement acquisition.",
  },
];

const ownershipPaths = [
  {
    title: "Direct Real Estate",
    label: "Maximum control",
    copy: "The owner directs leasing, financing, improvements, management, and disposition while accepting the operating responsibility that comes with control.",
  },
  {
    title: "Net-Lease Property",
    label: "Lease-defined responsibility",
    copy: "The lease assigns specified obligations to the tenant. Tenant strength, lease language, property condition, rent structure, and residual value still require review.",
  },
  {
    title: "DST Interests",
    label: "Professionally managed",
    copy: "A sponsor controls the trust and real estate. Investors trade day-to-day landlord work for sponsor control, offering-level fees, illiquidity, and other property and securities risks.",
  },
];

const exchangeStages = [
  {
    title: "Before the San Francisco property sells",
    copy: "Clarify ownership, use, expected equity, debt, management goals, sale timing, and the independent professionals already involved.",
  },
  {
    title: "While replacement options are evaluated",
    copy: "Compare primary and backup candidates against the same criteria: income, financing, control, workload, diligence, risk, and realistic closing probability.",
  },
  {
    title: "Through the replacement closing",
    copy: "Keep title, inspections, insurance, financing, entity documents, exchange instructions, and unresolved advisor questions visible to the appropriate parties.",
  },
];

const sfAreas = [
  {
    slug: "pacific-heights-ca",
    name: "Pacific Heights",
    image: "/service-areas/pacific-heights-ca/pacific-heights-ca.jpg",
  },
  {
    slug: "marina-district-ca",
    name: "Marina District",
    image: "/service-areas/marina-district-ca/marina-district-ca.jpg",
  },
  {
    slug: "financial-district-ca",
    name: "Financial District",
    image: "/service-areas/financial-district-ca/financial-district-ca.jpg",
  },
  {
    slug: "soma-ca",
    name: "SoMa",
    image: "/service-areas/soma-ca/soma-ca.avif",
  },
  {
    slug: "palo-alto-ca",
    name: "Palo Alto",
    image: "/service-areas/palo-alto-ca/palo-alto-ca.webp",
  },
  {
    slug: "oakland-ca",
    name: "Oakland",
    image: "/service-areas/oakland-ca/oakland-ca.webp",
  },
];

const faqEntries = [
  {
    question: "Can you help if this is my first 1031 exchange?",
    answer: "Yes. Start with the property being sold, the expected closing date, the ownership, what you want next, and which professionals are already involved. The initial conversation is designed to make the next decisions understandable.",
  },
  {
    question: "What if my San Francisco property is already under contract?",
    answer: "Call as soon as possible. An independent qualified intermediary generally needs to be in place before the relinquished-property sale closes, so the contract, closing date, ownership, and exchange setup should be reviewed promptly with the appropriate professionals.",
  },
  {
    question: "Can replacement property be outside San Francisco or California?",
    answer: "Replacement property can be evaluated locally and nationwide. The search should reflect the owner’s exchange equity, debt, income goals, market preferences, workload, diligence requirements, and ability to close within the exchange timeline.",
  },
  {
    question: "Can inherited property be part of a 1031 exchange?",
    answer: "Inherited-property decisions depend on ownership, basis, qualifying investment or business use, co-owner objectives, estate questions, and the intended sale. Those facts should be reviewed with the owner’s tax and legal advisors before assuming an exchange is available.",
  },
  {
    question: "Can a 1031 exchange help me leave active property management?",
    answer: "It can create an opportunity to compare another direct property with net-lease assets and professionally managed DST interests. Each path has different tradeoffs involving control, liquidity, financing, fees, tenant or sponsor risk, and ongoing responsibility.",
  },
  {
    question: "How do I request current replacement properties?",
    answer: "Call (415) 917-2994 or submit the short contact form. Share the planned sale date, approximate exchange equity, debt needs, property preferences, and whether direct ownership, net lease, passive alternatives, or a combination should be considered.",
  },
  {
    question: "Is the initial 1031 exchange consultation free?",
    answer: "Yes. The initial exchange conversation and educational guidance are free. Tax, legal, qualified-intermediary, brokerage, lending, and securities work must be handled by the appropriate independent professionals.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "50 California St",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94111",
    addressCountry: "US",
  },
  areaServed: "United States",
  serviceType: [
    "1031 exchange solutions",
    "Replacement property planning",
    "DST property information",
    "Net lease property search",
    "Passive real estate education",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <main className="overflow-hidden bg-[#F7F5F2] text-[#2D2D2D]">
        <section className="relative flex min-h-[760px] items-end overflow-hidden bg-[#201C1C] pt-28 md:min-h-[820px] md:items-center">
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/service-areas/san-francisco-ca/san-francisco-ca.webp"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <Image
            src="/service-areas/san-francisco-ca/san-francisco-ca.webp"
            alt="San Francisco skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/62 to-black/25" />
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-14 text-white sm:px-6 md:px-12 md:pb-0">
            <div className="max-w-5xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/65 sm:text-[11px]">
                Selling investment property in the Bay Area?
              </p>
              <h1 className="mt-5 max-w-5xl font-[family-name:var(--font-playfair)] text-[46px] font-normal leading-[1.02] tracking-[-0.025em] text-white sm:text-[58px] md:text-[74px] lg:text-[88px]">
                Turnkey 1031 Exchange Solutions in San Francisco
              </h1>
              <p className="mt-7 max-w-2xl text-[15px] font-light leading-7 text-white/80 sm:text-[17px] sm:leading-8">
                Whether the sale is being planned, already under contract, inherited, or driven by landlord fatigue, one conversation can help organize the exchange, replacement search, passive options, and the independent professionals needed to move forward.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={phoneHref} className="inline-flex min-h-12 w-full items-center justify-center bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A2828] transition hover:bg-[#F7F5F2] sm:w-auto">
                  Free Consultation: {PHONE}
                </a>
                <Link href="/contact#contact-form" className="inline-flex min-h-12 w-full items-center justify-center border border-white/60 bg-white/5 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur transition hover:bg-white hover:text-[#5A2828] sm:w-auto">
                  Start My Exchange
                </Link>
                <Link href="/contact?request=properties#contact-form" className="inline-flex min-h-12 w-full items-center justify-center px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white underline decoration-white/35 underline-offset-8 sm:w-auto">
                  Get a Free Property List
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#E5E0D8] bg-[#F7F5F2]">
          <div className="mx-auto grid max-w-[1400px] divide-y divide-[#E5E0D8] px-5 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12">
            {[
              ["Planning a sale", "Start before closing"],
              ["Already under contract", "Call while options remain"],
              ["Done managing property", "Compare passive alternatives"],
            ].map(([title, copy]) => (
              <div key={title} className="py-7 text-center md:px-6 md:py-9">
                <p className="font-[family-name:var(--font-playfair)] text-xl text-[#5A2828]">{title}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#777]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="story" className="bg-[#2D2D2D] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 md:px-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">The property has done its job</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">What should the next ownership chapter accomplish?</h2>
            </div>
            <div className="space-y-5 text-[14px] font-light leading-7 text-white/68 sm:text-[15px]">
              <p>A San Francisco owner may be selling because operating costs, capital work, estate decisions, concentrated equity, or direct management has changed the property’s fit.</p>
              <p>The replacement search should begin with that reason—not a generic list of listings. We help translate the sale facts and owner priorities into a practical brief that can be used across direct real estate, net-lease property, and passive DST alternatives.</p>
              <p>You do not need to understand every exchange rule before calling. Start with the property, the expected closing date, and what you want life after the sale to look like.</p>
              <a href={phoneHref} className="mt-4 inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#5A2828]">Talk Through the Sale</a>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F2] py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F68]">Start with your situation</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight text-[#2D2D2D] sm:text-[54px]">Whatever is driving the sale, the exchange should solve the real problem.</h2>
            </div>
            <div className="mt-12 grid border-l border-t border-[#D8D0C7] md:grid-cols-2 lg:grid-cols-3">
              {ownerSituations.map((item) => (
                <Link key={item.title} href={item.href} className="group border-b border-r border-[#D8D0C7] bg-white/45 p-7 transition hover:bg-white sm:p-9">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[24px] text-[#5A2828]">{item.title}</h3>
                  <p className="mt-4 text-[13px] leading-6 text-[#666]">{item.copy}</p>
                  <span className="mt-7 inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5A2828]">Explore this situation <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#5A2828] py-20 text-white sm:py-28">
          <div className="absolute inset-y-0 right-0 hidden w-[34%] opacity-15 lg:block">
            <Image src="/service-areas/financial-district-ca/financial-district-ca.jpg" alt="" fill sizes="34vw" className="object-cover" />
          </div>
          <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">One conversation. One organized plan.</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">Turnkey help from the planned sale through replacement closing.</h2>
            </div>
            <div className="mt-14 max-w-5xl divide-y divide-white/15 border-y border-white/15">
              {solutionItems.map((item) => (
                <article key={item.title} className="grid gap-3 py-7 md:grid-cols-[.7fr_1.3fr] md:gap-10 md:py-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[23px] text-white">{item.title}</h3>
                  <p className="text-[13px] font-light leading-6 text-white/65">{item.copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5A2828]">Call {PHONE}</a>
              <Link href="/contact#contact-form" className="inline-flex min-h-12 items-center justify-center border border-white/35 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#5A2828]">Send the Sale Details</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#D4C4B0] py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 md:px-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className="relative min-h-[420px] overflow-hidden sm:min-h-[580px]">
              <Image src="/property-types/urgent-care-medical-clinic/urgent-care-medicine-sf.webp" alt="Institutional-quality professionally managed real estate" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A2828]/55 to-transparent" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#5A2828]/55">Move beyond tenants, toilets, and trash</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight text-[#5A2828] sm:text-[54px]">Income-focused real estate without day-to-day property management.</h2>
              <p className="mt-6 text-[14px] leading-7 text-[#5A2828]/78">For eligible investors, a DST may provide access to professionally managed, institutional-grade property without personally handling tenants, maintenance, leasing, or renovations.</p>
              <ul className="mt-7 space-y-4 text-[13px] leading-6 text-[#5A2828]">
                <li className="flex gap-4"><span aria-hidden="true">—</span><span>No day-to-day landlord management</span></li>
                <li className="flex gap-4"><span aria-hidden="true">—</span><span>Institutional-quality real estate across property types and markets</span></li>
                <li className="flex gap-4"><span aria-hidden="true">—</span><span>Some offerings may begin around a $100,000 investment</span></li>
                <li className="flex gap-4"><span aria-hidden="true">—</span><span>Passive alternatives that can be compared alongside direct ownership</span></li>
              </ul>
              <p className="mt-6 text-[11px] leading-5 text-[#5A2828]/55">Availability, projected income, minimum investment, sponsor, fees, leverage, liquidity, risks, investor eligibility, and suitability vary by offering.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact?request=properties#contact-form" className="inline-flex min-h-12 items-center justify-center bg-[#5A2828] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">See a Free Property List</Link>
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center border border-[#5A2828] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5A2828] transition hover:bg-[#5A2828] hover:text-white">Call for Free Guidance</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F2] py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F68]">Compare the paths</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">The right replacement depends on how you want to own.</h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {ownershipPaths.map((item) => (
                <article key={item.title} className="border border-[#D8D0C7] bg-white p-7 sm:p-9">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9A8179]">{item.label}</p>
                  <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-[28px] text-[#5A2828]">{item.title}</h3>
                  <p className="mt-5 text-[13px] leading-6 text-[#666]">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#2D2D2D] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 md:px-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">A time-sensitive transaction</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">A clear path through a time-sensitive transaction.</h2>
              <p className="mt-6 text-[14px] font-light leading-7 text-white/65">Every exchange is different. The work becomes easier when the next decisions are visible and the right people are involved before a deadline forces the issue.</p>
              <a href={phoneHref} className="mt-8 inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#5A2828]">First Exchange? Call {PHONE}</a>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {exchangeStages.map((item) => (
                <article key={item.title} className="py-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[25px] text-white">{item.title}</h3>
                  <p className="mt-4 text-[13px] font-light leading-6 text-white/62">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F7F5F2] py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-4xl">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F68]">Bay Area sellers. Nationwide options.</p>
                <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">Begin locally, then follow the replacement property that fits.</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/service-areas" className="inline-flex min-h-12 items-center justify-center border border-[#5A2828] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5A2828]">View All Areas</Link>
                <Link href="/contact?request=properties#contact-form" className="inline-flex min-h-12 items-center justify-center bg-[#5A2828] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Get a Free Property List</Link>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sfAreas.map((area) => (
                <Link key={area.slug} href={`/service-areas/${area.slug}`} className="group relative min-h-[310px] overflow-hidden">
                  <Image src={area.image} alt={area.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[25px] text-white">{area.name}</h3>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/60">1031 exchange help</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 md:px-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A6F68]">Questions owners ask first</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">San Francisco 1031 questions, answered plainly.</h2>
              <p className="mt-6 text-[14px] leading-7 text-[#666]">If the question is specific to a planned sale, call for free exchange guidance.</p>
              <a href={phoneHref} className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#5A2828] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Call {PHONE}</a>
            </div>
            <div className="divide-y divide-[#D8D0C7] border-y border-[#D8D0C7]">
              {faqEntries.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-[family-name:var(--font-playfair)] text-[21px] text-[#5A2828]">
                    {faq.question}
                    <span className="text-2xl font-light transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 text-[13px] leading-6 text-[#666]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#5A2828] py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-6 md:px-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">Free 1031 exchange guidance</p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-[40px] font-normal leading-tight sm:text-[54px]">Tell us what you are selling and what you want next.</h2>
              <p className="mt-6 text-[14px] font-light leading-7 text-white/68">Use the short form for a consultation, a list of current properties, or free educational information. No polished exchange plan is required—start with the facts you know.</p>
              <a href={phoneHref} className="mt-8 inline-flex min-h-12 items-center justify-center bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5A2828]">Call Now: {PHONE}</a>
              <p className="mt-6 text-[11px] leading-5 text-white/45">{OFFICE_ADDRESS}</p>
            </div>
            <ContactFormWrapper />
          </div>
        </section>
      </main>

      <Script id="sf-organization-schema" type="application/ld+json">{JSON.stringify(organizationSchema)}</Script>
      <Script id="sf-faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
    </>
  );
}

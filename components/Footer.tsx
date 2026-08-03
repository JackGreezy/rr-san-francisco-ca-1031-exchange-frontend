import Link from "next/link";
import { locationsData, propertyTypesData } from "@/data";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  PHONE,
  PHONE_DIGITS,
  EMAIL,
} from "@/lib/config";

const featuredLocationSlugs = [
  "san-francisco-ca",
  "pacific-heights-ca",
  "marina-district-ca",
  "financial-district-ca",
  "soma-ca",
  "palo-alto-ca",
  "oakland-ca",
  "san-mateo-ca",
];

const featuredLocations = locationsData.filter((location) =>
  featuredLocationSlugs.includes(location.slug),
);

const featuredServices = [
  { label: "Planning a Property Sale", href: "/services/capital-gains-on-rental-property" },
  { label: "Inherited Investment Property", href: "/services/inherited-property-capital-gains" },
  { label: "Passive Real Estate Options", href: "/services/passive-real-estate-income" },
  { label: "Nationwide Replacement Properties", href: "/services/nationwide-property-identification" },
  { label: "Net-Lease Property Search", href: "/services/nnn-property-search" },
  { label: "DST Information", href: "/services/dst-evaluation-and-placement" },
  { label: "Reverse Exchange Information", href: "/services/reverse-1031-exchange-explained" },
  { label: "Qualified Intermediary Help", href: "/services/qualified-intermediary-coordination" },
];

const featuredPropertyTypes = propertyTypesData.slice(0, 8);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#5A2828]">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Logo, Contact & Map */}
          <div className="space-y-6 lg:col-span-1">
            {/* Logo */}
            <div className="flex flex-col items-start">
              <div className="flex items-baseline">
                <span className="font-[family-name:var(--font-playfair)] text-[60px] lg:text-[80px] font-normal leading-none text-white">
                  SF
                </span>
                <span className="text-[60px] lg:text-[80px] text-white">.</span>
              </div>
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/70 -mt-2 ml-1">
                1031
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-[13px] text-white/80">
              <p className="pt-3">
                <a href={`tel:${PHONE_DIGITS}`} className="hover:text-white transition-colors">
                  {PHONE}
                </a>
              </p>
              <p>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/contact#contact-form" className="inline-flex min-h-11 items-center justify-center bg-white px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5A2828]">
                Free Consultation
              </Link>
              <Link href="/contact?request=properties#contact-form" className="inline-flex min-h-11 items-center justify-center border border-white/35 px-5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                Get a Free Property List
              </Link>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full aspect-[4/3] max-w-full md:max-w-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0927638692166!2d-122.39956492357094!3d37.79347091133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806285ddb1a3%3A0x4c29307cc9089f67!2s50%20California%20St%2C%20San%20Francisco%2C%20CA%2094111!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "2px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SF 1031 Exchange Office Location"
              />
            </div>
          </div>

          {/* Column 2: Service Areas */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
              Service Areas
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5">
              {featuredLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/service-areas/${location.slug}`}
                    className="text-[12px] text-white/60 hover:text-white transition-colors"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
              Services
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5">
              {featuredServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-[12px] text-white/60 hover:text-white transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Property Types & Sitemap */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
                Property Types
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5">
                {featuredPropertyTypes.map((type) => (
                  <li key={type.slug}>
                    <Link
                      href={type.route}
                      className="text-[12px] text-white/60 hover:text-white transition-colors"
                    >
                      {type.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50">
                Sitemap
              </h3>
              <ul className="space-y-1.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "Service Areas", href: "/service-areas" },
                  { label: "Services", href: "/services" },
                  { label: "Property Types", href: "/property-types" },
                  { label: "Tools", href: "/tools" },
                  { label: "Blog", href: "/blog" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Rich Text */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <p className="text-[11px] leading-[1.8] text-white/40 max-w-4xl">
            SF 1031 Exchange provides turnkey 1031 exchange solutions and replacement property information throughout {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and the greater Bay Area. We help owners organize planned sales, replacement criteria, direct property searches, net-lease options, and passive DST information while working alongside the appropriate independent professionals. We serve neighborhoods including Pacific Heights, Marina District, Nob Hill, Russian Hill, SoMa, and the Financial District, as well as surrounding cities including Palo Alto, Oakland, Berkeley, and San Rafael.
          </p>
        </div>
      </div>

      {/* Compliance Section */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
          <p className="text-[11px] text-white/40 leading-relaxed mb-4">
            <span className="text-white/60 font-medium">Compliance:</span> This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
        </div>
      </div>

      {/* Bottom Credit Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-white/40">
            <p>
              Website Designed &amp; Developed by{" "}
              <span className="underline">SF 1031 Exchange</span>
            </p>
            <p>
              Copyright {currentYear} |{" "}
              <Link href="/privacy" className="underline hover:text-white/60">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-white/10 bg-[#4A1F1F]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <p className="text-[8px] uppercase leading-[1.8] tracking-[0.05em] text-white/30">
            &copy;{currentYear} SF 1031 EXCHANGE INC. THIS SITE PROVIDES INFORMATION ABOUT 1031 EXCHANGES AND HELPS INVESTORS IDENTIFY REPLACEMENT PROPERTIES. THIS SITE IS NOT A QUALIFIED INTERMEDIARY, TAX ADVISOR, OR LEGAL COUNSEL. USERS SHOULD CONSULT LICENSED PROFESSIONALS BEFORE PROCEEDING WITH ANY EXCHANGE. EQUAL HOUSING OPPORTUNITY.
          </p>
        </div>
      </div>
    </footer>
  );
}

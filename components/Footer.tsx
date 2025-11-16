import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  PHONE,
  PHONE_DIGITS,
  EMAIL,
  OFFICE_ADDRESS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  IRS_LINKS,
} from "@/lib/config";
import { servicesData } from "@/data";
import { locationsData } from "@/data";

export default function Footer() {
  const cityLocations = locationsData.filter((l) => l.type === "city");
  const topServices = servicesData.slice(0, 10);
  
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Contact
            </h3>
            <Link
              href="/"
              className="block transition hover:opacity-80"
            >
              <Image
                src="/1031-exchange-san-francisco-logo.png"
                alt={SITE_NAME}
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-sm text-[#1E1E1E]/70">{OFFICE_ADDRESS}</p>
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="block text-sm text-[#F5B32F] transition hover:text-[#F5B32F]/80"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="block break-words text-sm text-[#F5B32F] transition hover:text-[#F5B32F]/80"
            >
              {EMAIL}
            </a>
            <p className="text-xs text-[#1E1E1E]/60">Mon-Fri: 9am-5pm PST</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition hover:text-[#0C1E2E]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="font-medium text-[#F5B32F] transition hover:text-[#F5B32F]/80"
                >
                  View All {servicesData.length} Services →
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Locations
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              {cityLocations.slice(0, 10).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/service-areas/${location.slug}`}
                    className="transition hover:text-[#0C1E2E]"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="font-medium text-[#F5B32F] transition hover:text-[#F5B32F]/80"
                >
                  View All {locationsData.length} Locations →
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <Link
                  href="/property-types"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Property Types
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-[#0C1E2E]">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-[#0C1E2E]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Tools
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <Link
                  href="/tools/boot-calculator"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Boot Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/exchange-cost-estimator"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Exchange Cost Estimator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/identification-rules-checker"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Identification Rules Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="font-medium text-[#F5B32F] transition hover:text-[#F5B32F]/80"
                >
                  View All Tools →
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80">
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-[#0C1E2E]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="transition hover:text-[#0C1E2E]"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0C1E2E]">
              Compliance
            </h3>
            <p className="text-xs leading-relaxed text-[#1E1E1E]/70">
              This site helps investors identify potential replacement properties
              for Section 1031 exchanges. This site is not a Qualified
              Intermediary, law firm, broker, or CPA. Users should consult a
              Qualified Intermediary and tax advisor before acting.
            </p>
            <div className="space-y-2">
              <a
                href={IRS_LINKS.form8824}
                target="_blank"
                rel="noreferrer"
                className="block text-xs text-[#F5B32F] transition hover:text-[#F5B32F]/80"
              >
                IRS Form 8824
              </a>
              <a
                href={IRS_LINKS.safeHarbor}
                target="_blank"
                rel="noreferrer"
                className="block text-xs text-[#F5B32F] transition hover:text-[#F5B32F]/80"
              >
                Rev. Proc. 2008-16
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E5E7EB] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-[#1E1E1E]/60">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
            <div className="h-64 w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] md:h-48 overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${OFFICE_ADDRESS}`}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


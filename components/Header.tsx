"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { servicesData } from "@/data";
import { locationsData } from "@/data";
import { SITE_NAME, PHONE, PHONE_DIGITS } from "@/lib/config";

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setLocationsOpen(false);
    setToolsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) {
      clearTimeout(locationsTimeoutRef.current);
    }
    setLocationsOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 300);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center transition hover:opacity-80"
        >
          <Image
            src="/1031-exchange-san-francisco-logo.png"
            alt={SITE_NAME}
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <span className="text-xs" aria-hidden="true">
                {servicesOpen ? "▲" : "▼"}
              </span>
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-[#E5E7EB] bg-white shadow-lg">
                <div className="max-h-96 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {servicesData.slice(0, 7).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-[#1E1E1E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    className="mt-2 block rounded-lg px-3 py-2 text-sm font-semibold text-[#F5B32F] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                  >
                    View All {servicesData.length} Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            ref={locationsRef}
            className="relative"
            onMouseEnter={handleLocationsMouseEnter}
            onMouseLeave={handleLocationsMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
              aria-expanded={locationsOpen}
              aria-haspopup="true"
              onClick={() => setLocationsOpen(!locationsOpen)}
            >
              Locations
              <span className="text-xs" aria-hidden="true">
                {locationsOpen ? "▲" : "▼"}
              </span>
            </button>
            {locationsOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-lg">
                <div className="p-4">
                  <div className="space-y-1">
                    <Link
                      href="/service-areas/san-francisco-ca"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0C1E2E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                    >
                      San Francisco
                    </Link>
                    {locationsData
                      .filter((l) => l.slug !== "san-francisco-ca" && l.type === "city")
                      .slice(0, 6)
                      .map((location) => (
                        <Link
                          key={location.slug}
                          href={`/service-areas/${location.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-[#1E1E1E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                        >
                          {location.name}
                        </Link>
                      ))}
                  </div>
                  <Link
                    href="/service-areas"
                    className="mt-2 block rounded-lg px-3 py-2 text-sm font-semibold text-[#F5B32F] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                  >
                    View All {locationsData.length} Locations →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={handleToolsMouseEnter}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              Tools
              <span className="text-xs" aria-hidden="true">
                {toolsOpen ? "▲" : "▼"}
              </span>
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-lg">
                <div className="p-4">
                  <div className="space-y-1">
                    <Link
                      href="/tools/boot-calculator"
                      className="block rounded-lg px-3 py-2 text-sm text-[#1E1E1E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                    >
                      Boot Calculator
                    </Link>
                    <Link
                      href="/tools/exchange-cost-estimator"
                      className="block rounded-lg px-3 py-2 text-sm text-[#1E1E1E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                    >
                      Exchange Cost Estimator
                    </Link>
                    <Link
                      href="/tools/identification-rules-checker"
                      className="block rounded-lg px-3 py-2 text-sm text-[#1E1E1E] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                    >
                      Identification Rules Checker
                    </Link>
                  </div>
                  <Link
                    href="/tools"
                    className="mt-2 block rounded-lg px-3 py-2 text-sm font-semibold text-[#F5B32F] transition hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B32F]"
                  >
                    View All Tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/property-types"
            className="text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80"
          >
            Property Types
          </Link>

          <Link
            href="/blog"
            className="text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80"
          >
            Blog
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-[#0C1E2E] transition hover:text-[#0C1E2E]/80"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-full bg-[#0C1E2E] px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="rounded-full bg-[#0C1E2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Call
          </a>
          <button
            type="button"
            className="text-[#0C1E2E]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-2xl font-bold">{mobileMenuOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-[#E5E7EB] bg-white md:hidden">
          <div className="space-y-1 px-6 py-4">
            <Link
              href="/services"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              Services
            </Link>
            <Link
              href="/locations"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              Locations
            </Link>
            <Link
              href="/tools"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              Tools
            </Link>
            <Link
              href="/property-types"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              Property Types
            </Link>
            <Link
              href="/blog"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-4 py-3 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#FAFAFA]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="mt-4 block rounded-full bg-[#0C1E2E] px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


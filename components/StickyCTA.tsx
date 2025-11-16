"use client";

import Link from "next/link";
import { useState } from "react";
import { PHONE, PHONE_DIGITS } from "@/lib/config";

export default function StickyCTA() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white shadow-lg transition-transform duration-300 md:bottom-auto md:top-auto ${
        isCollapsed ? "translate-y-full md:translate-y-0" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-[#0C1E2E]">
              Ready to begin your 1031 exchange?
            </p>
            <p className="text-xs text-[#1E1E1E]/70">
              Our California team helps you meet deadlines and protect your
              gains.
            </p>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 md:flex-none">
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="rounded-full bg-[#0C1E2E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F] md:hidden"
            >
              Call {PHONE}
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-[#0C1E2E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#12304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#0C1E2E] md:hidden"
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              <span className="text-xl">{isCollapsed ? "▲" : "▼"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


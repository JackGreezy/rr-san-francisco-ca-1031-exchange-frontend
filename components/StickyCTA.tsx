"use client";

import { PHONE, PHONE_DIGITS, SITE_NAME } from "@/lib/config";

export default function StickyCTA() {
  return (
    <a
      href={`tel:${PHONE_DIGITS}`}
      aria-label={`Call ${SITE_NAME} at ${PHONE}`}
      className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[18px] z-[49] flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#5A2828] text-white shadow-[0_8px_28px_rgba(48,24,24,0.45)] transition active:scale-95 md:hidden"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  );
}

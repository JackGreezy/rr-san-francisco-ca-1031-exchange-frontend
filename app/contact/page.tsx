import { ContactFormWrapper } from "./contact-form";
import { PHONE, PHONE_DIGITS } from "@/lib/config";

export const metadata = {
  title: "Free 1031 Exchange Consultation | San Francisco",
  description: "Call or contact 1031 Exchange San Francisco for free guidance, replacement property information, and help organizing a planned exchange.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-16 text-center">
          <span className="subheading mb-4 block">Free 1031 Exchange Guidance</span>
          <h1 className="heading-display text-white">
            Tell us what you are selling and what you want next.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Start with a planned sale, a property already under contract, an inherited asset, a replacement search, or the desire to leave active management behind.
          </p>
          <a href={`tel:${PHONE_DIGITS}`} className="mt-8 inline-flex min-h-12 items-center justify-center bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5A2828] transition hover:bg-[#F7F5F2]">Call Now: {PHONE}</a>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}

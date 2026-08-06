import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { SITE_NAME, SITE_URL } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "1031 Exchange San Francisco | Free Consultation & Help",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free, turnkey 1031 exchange help for San Francisco property owners, including planned sales, replacement property searches, net-lease options, and passive DST information.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",

  alternates: { canonical: "/" },

  twitter: { card: "summary_large_image", title: "1031 Exchange San Francisco | Free Consultation & Help", description: "Free, turnkey 1031 exchange help for San Francisco property owners, replacement property searches, and passive DST information." },

  openGraph: { title: "1031 Exchange San Francisco | Free Consultation & Help", description: "Free, turnkey 1031 exchange help for San Francisco property owners, replacement property searches, and passive DST information." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
        <Analytics />
              <script src="/turnstile-contact.js" defer></script>
      </body>
    </html>
  );
}

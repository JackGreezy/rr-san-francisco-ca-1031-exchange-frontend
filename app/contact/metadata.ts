import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Contact ${SITE_NAME} to discuss your 1031 exchange property identification needs in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};


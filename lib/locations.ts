import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "./config";
import { locationsData } from "@/data";
import { locationsBatch01 } from "@/data/batches/locations/batch-01";
import { locationsBatch02 } from "@/data/batches/locations/batch-02";
import { locationsBatch03 } from "@/data/batches/locations/batch-03";
import { locationsBatch04 } from "@/data/batches/locations/batch-04";

export type Location = {
  name: string;
  slug: string;
  description: string;
  type: "city" | "neighborhood" | "suburb" | "district" | "remote";
};

export const LOCATIONS: Location[] = locationsData.map(location => ({
  name: location.name,
  slug: location.slug,
  description: location.type === "city"
    ? `${location.name}, ${PRIMARY_STATE_ABBR} offers comprehensive property identification and exchange coordination services for 1031 investors.`
    : location.type === "remote"
    ? "Nationwide property identification support across all 50 states for 1031 exchange investors."
    : `${location.name} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} provides specialized property identification services for 1031 exchange investors.`,
  type: location.type,
}));

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationDataFromBatches(slug: string) {
  // Check all batch files for location data
  const batch01 = locationsBatch01[slug as keyof typeof locationsBatch01];
  if (batch01) return batch01;
  
  const batch02 = locationsBatch02[slug as keyof typeof locationsBatch02];
  if (batch02) return batch02;
  
  const batch03 = locationsBatch03[slug as keyof typeof locationsBatch03];
  if (batch03) return batch03;
  
  const batch04 = locationsBatch04[slug as keyof typeof locationsBatch04];
  if (batch04) return batch04;
  
  return null;
}

export function searchLocations(query: string): Location[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return LOCATIONS;

  return LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(lowerQuery) ||
      l.description.toLowerCase().includes(lowerQuery)
  );
}


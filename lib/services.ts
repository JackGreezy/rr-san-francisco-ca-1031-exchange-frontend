import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "./config";
import { servicesData } from "@/data";
import { servicesBatch01 } from "@/data/batches/services/batch-01";
import { servicesBatch02 } from "@/data/batches/services/batch-02";
import { servicesBatch03 } from "@/data/batches/services/batch-03";

export type Service = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
};

export const SERVICES: Service[] = servicesData.map(service => ({
  title: service.name,
  slug: service.slug,
  description: `${service.name} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. ${service.short}`,
  shortDescription: service.short,
  category: service.category || "general",
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceDataFromBatches(slug: string) {
  // Check all batch files for service data
  const batch01 = servicesBatch01[slug as keyof typeof servicesBatch01];
  if (batch01) return batch01;
  
  const batch02 = servicesBatch02[slug as keyof typeof servicesBatch02];
  if (batch02) return batch02;
  
  const batch03 = servicesBatch03[slug as keyof typeof servicesBatch03];
  if (batch03) return batch03;
  
  return null;
}

export function getRelatedServices(
  currentSlug: string,
  count: number = 4
): Service[] {
  const current = getServiceBySlug(currentSlug);
  if (!current) return SERVICES.slice(0, count);

  return SERVICES.filter((s) => s.slug !== currentSlug)
    .filter((s) => s.category === current.category)
    .slice(0, count);
}

export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return SERVICES;

  return SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.shortDescription.toLowerCase().includes(lowerQuery)
  );
}


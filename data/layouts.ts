import type {
  PageLayoutVariant,
  LayoutAssignments,
  ServiceItem,
  LocationItem,
} from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Traditional layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
    },
  },
  {
    key: "sidebar",
    label: "Sidebar",
    description: "Content with sidebar navigation and related links",
    sections: ["hero", "description", "sidebar", "faqs", "cta"],
    features: {
      sidebar: true,
      toc: true,
      heroStyle: "abstract",
    },
  },
  {
    key: "timeline",
    label: "Timeline",
    description: "Timeline focused layout with process steps",
    sections: ["hero", "timeline", "description", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Comparison focused layout with feature grid",
    sections: ["hero", "description", "comparison", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Minimal layout with focused content",
    sections: ["hero", "description", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Detailed layout with multiple content sections",
    sections: [
      "hero",
      "description",
      "inclusions",
      "situations",
      "faqs",
      "compliance",
      "cta",
    ],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
      toc: true,
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Map prominent layout with location details",
    sections: ["hero", "map", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "map",
      stickyCta: true,
    },
  },
  {
    key: "neighborhood",
    label: "Neighborhood",
    description: "Neighborhood focused layout with local context",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      stickyCta: true,
    },
  },
  {
    key: "city",
    label: "City",
    description: "City wide layout with comprehensive coverage",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
    },
  },
  {
    key: "compact",
    label: "Compact",
    description: "Compact layout with essential information",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
    },
  },
  {
    key: "detailed-location",
    label: "Detailed Location",
    description: "Detailed location layout with extensive content",
    sections: ["hero", "description", "paths", "faqs", "example", "cta"],
    features: {
      heroStyle: "image",
      stickyCta: true,
      toc: true,
    },
  },
  {
    key: "remote",
    label: "Remote",
    description: "Remote location layout emphasizing nationwide support",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      stickyCta: true,
    },
  },
];

function assignLayoutsRoundRobin<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;
  let lastVariant = "";

  items.forEach((item) => {
    let selectedVariant = variants[variantIndex % variants.length];
    if (selectedVariant.key === lastVariant) {
      variantIndex++;
      selectedVariant = variants[variantIndex % variants.length];
    }
    assignments[item.slug] = selectedVariant.key;
    lastVariant = selectedVariant.key;
    variantIndex++;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayoutsRoundRobin(servicesData, serviceVariants),
  locations: assignLayoutsRoundRobin(locationsData, locationVariants),
};


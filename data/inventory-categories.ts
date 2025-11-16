import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "/inventory/nnn",
    note: "Single tenant net lease properties with credit tenants.",
  },
  {
    slug: "multifamily",
    name: "Multifamily Properties",
    route: "/inventory/multifamily",
  },
  {
    slug: "industrial",
    name: "Industrial Properties",
    route: "/inventory/industrial",
  },
  {
    slug: "retail",
    name: "Retail Properties",
    route: "/inventory/retail",
  },
  {
    slug: "medical-office",
    name: "Medical Office Buildings",
    route: "/inventory/medical-office",
  },
  {
    slug: "self-storage",
    name: "Self Storage",
    route: "/inventory/self-storage",
  },
  {
    slug: "mixed-use",
    name: "Mixed Use Properties",
    route: "/inventory/mixed-use",
  },
  {
    slug: "land",
    name: "Land and Development",
    route: "/inventory/land",
  },
];


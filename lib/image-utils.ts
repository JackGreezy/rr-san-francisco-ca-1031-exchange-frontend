/**
 * Utility functions for finding and using images with multiple extensions
 */

const IMAGE_EXTENSIONS = ['.webp', '.avif', '.jpg', '.jpeg', '.png'];

/**
 * Finds an image file with any supported extension
 * @param basePath - The base path without extension (e.g., '/locations/1031-exchange-san-francisco-ca')
 * @returns The full path with extension (defaults to .jpg)
 * 
 * Note: In Next.js, we can't check file existence at build time easily.
 * The Image component will handle 404s gracefully, so we default to .jpg
 * which is the most common format.
 */
export function findImage(basePath: string): string {
  // Default to .jpg as it's the most common format
  // Next.js Image component will handle missing files gracefully
  return `${basePath}.jpg`;
}

/**
 * Gets the image path for a location
 * @param locationSlug - The location slug (e.g., 'san-francisco')
 * @param locationName - The location name (e.g., 'San Francisco')
 * @param stateAbbr - The state abbreviation (e.g., 'CA')
 * @returns The image path
 */
export function getLocationImagePath(
  locationSlug: string,
  locationName: string,
  stateAbbr: string
): string {
  // Convert location name to kebab-case for filename
  const nameKebab = locationName.toLowerCase().replace(/\s+/g, '-');
  return `/locations/1031-exchange-${nameKebab}-${stateAbbr.toLowerCase()}`;
}

/**
 * Gets the image path for a property type
 * @param propertyTypeSlug - The property type slug (e.g., 'multifamily')
 * @param cityName - The city name (e.g., 'San Francisco')
 * @param stateAbbr - The state abbreviation (e.g., 'CA')
 * @returns The image path
 */
export function getPropertyTypeImagePath(
  propertyTypeSlug: string,
  cityName: string,
  stateAbbr: string
): string {
  const cityKebab = cityName.toLowerCase().replace(/\s+/g, '-');
  return `/property-types/1031-exchange-${propertyTypeSlug}-${cityKebab}-${stateAbbr.toLowerCase()}`;
}

/**
 * Gets all possible image paths for a given base path (for Next.js Image srcSet)
 */
export function getAllImagePaths(basePath: string): string[] {
  return IMAGE_EXTENSIONS.map(ext => `${basePath}${ext}`);
}


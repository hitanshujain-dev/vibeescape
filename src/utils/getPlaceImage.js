// src/utils/getPlaceImage.js
// Returns place images reliably — all images are now Unsplash CDN URLs
// so no async fetching is needed. Fallback chain included.

import placeImages from '../data/placeImages'

/**
 * Returns an array of image URLs for a given place.
 * Primary: place.images array (set in places.js via placeImages map)
 * Fallback: placeImages[place.id] direct lookup
 * Last resort: a guaranteed working Rajasthan landscape photo
 */
export function getPlaceImages(place, count = 1) {
  if (place?.images?.length > 0) {
    return place.images.slice(0, count)
  }

  // Direct ID lookup if images array is missing
  if (place?.id && placeImages[place.id]) {
    return [placeImages[place.id]]
  }

  // Absolute fallback — Amber Fort via Wikimedia Commons (always works)
  return [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Jaipur_03-2016_04_Amber_Fort.jpg?width=1200"
  ]
}

/**
 * Returns the single hero image URL for a place.
 */
export function getPlaceHeroImage(place) {
  return getPlaceImages(place, 1)[0]
}

export default getPlaceImages

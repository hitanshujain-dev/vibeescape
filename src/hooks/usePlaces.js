import { useState, useEffect } from "react"
import localPlaces from "../data/places"

// VITE_API_URL must be set in production (Vercel env vars)
// Falls back to local data gracefully if API is unavailable
const API_URL = import.meta.env.VITE_API_URL || null

function usePlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPlaces = async () => {
      // If no API URL configured, use local data immediately
      if (!API_URL) {
        setPlaces(localPlaces)
        setLoading(false)
        return
      }

      try {
        const res = await fetch(API_URL, { signal: AbortSignal.timeout(5000) })
        if (!res.ok) throw new Error(`API returned ${res.status}`)
        const data = await res.json()

        // Merge API data with local images for reliability
        const merged = data.map(apiPlace => {
          const local = localPlaces.find(
            lp => String(lp.id) === String(apiPlace._id) || lp.name === apiPlace.name
          )
          return {
            ...apiPlace,
            id: local?.id ?? apiPlace._id, // Normalize ID to local numeric ID for routing
            images: local?.images?.length ? local.images : apiPlace.images,
          }
        })

        setPlaces(merged.length > 0 ? merged : localPlaces)
      } catch (err) {
        // Graceful fallback — local data works perfectly for demo/portfolio
        console.warn("⚡ API unavailable, using local data:", err.message)
        setPlaces(localPlaces)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  return { places, loading, error }
}

export default usePlaces

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import PlaceCard from "../components/PlaceCard"
import BottomNav from "../components/BottomNav"
import Footer from "../components/Footer"
import GalleryModal from "../components/GalleryModal"
import places from "../data/places"
import moods from "../data/mood"

function ExplorePage() {
  const [activeMood, setActiveMood] = useState("")
  const [activeCity, setActiveCity] = useState("")
  const [activeType, setActiveType] = useState("")
  const [selectedPlace, setSelectedPlace] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const city = params.get("city")
    if (city) setActiveCity(city)
  }, [location.search])

  const uniqueTypes = useMemo(() => {
    return [...new Set(places.map(p => p.type))].filter(Boolean)
  }, [])

  const filteredPlaces = useMemo(() => {
    return places.filter(p => {
      const moodMatch = activeMood ? p.moods.includes(activeMood) : true
      const cityMatch = activeCity ? p.city === activeCity : true
      const typeMatch = activeType ? p.type === activeType : true
      return moodMatch && cityMatch && typeMatch
    })
  }, [activeMood, activeCity, activeType])

  const selectStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    padding: "11px 16px",
    borderRadius: "12px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
    minWidth: "160px",
    transition: "all 0.2s ease",
    WebkitAppearance: "none",
  }

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <Navbar />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "100px 24px 140px",
        position: "relative",
      }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "36px" }}
        >
          <div style={{
            display: "inline-flex",
            padding: "6px 14px",
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: "8px",
            color: "#c084fc",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "14px",
          }}>
            {filteredPlaces.length} places found
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 800,
            color: "white",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "10px",
            letterSpacing: "-0.03em",
          }}>
            Explore All Places
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "15px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Filter by city, category, or vibe to find your perfect spot.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "40px",
            background: "rgba(255,255,255,0.02)",
            padding: "18px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.04)",
            alignItems: "center",
          }}
        >
          <select value={activeCity} onChange={e => setActiveCity(e.target.value)} style={selectStyle}>
            <option value="">All Cities</option>
            <option value="Jaipur">📍 Jaipur</option>
            <option value="Udaipur">📍 Udaipur</option>
          </select>

          <select value={activeType} onChange={e => setActiveType(e.target.value)} style={selectStyle}>
            <option value="">All Categories</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select value={activeMood} onChange={e => setActiveMood(e.target.value)} style={selectStyle}>
            <option value="">All Moods</option>
            {moods.map(m => (
              <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>
            ))}
          </select>

          {(activeMood || activeCity || activeType) && (
            <button
              onClick={() => { setActiveMood(""); setActiveCity(""); setActiveType("") }}
              style={{
                background: "rgba(168,85,247,0.08)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "#c084fc",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                padding: "10px 18px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(168,85,247,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(168,85,247,0.08)"}
            >
              Clear Filters ✕
            </button>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "24px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredPlaces.map((place, index) => (
              <PlaceCard
                key={place.id}
                place={place}
                index={index}
                onClick={(place) => {
                  window.location.href = `/place/${place.id}`
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPlaces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
              padding: "60px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px",
            }}
          >
            No places match this combination. Try adjusting your filters.
          </motion.div>
        )}

      </div>

      <Footer />
      <BottomNav />

      <AnimatePresence>
        {selectedPlace && (
          <GalleryModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExplorePage
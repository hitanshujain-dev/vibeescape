import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import BottomNav from "../components/BottomNav"
import Footer from "../components/Footer"
import places from "../data/places"
import { jaipurCity, heroUdaipur } from "../data/placeImages"

const cities = [
  {
    name: "Jaipur",
    tagline: "The Pink City",
    description: "Experience royal heritage, historic forts, and vibrant bazaars. Jaipur brings ancient Rajasthani culture to life with its majestic architecture and colorful streets.",
    image: jaipurCity,
    placeCount: places.filter(p => p.city === "Jaipur").length,
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.2))",
  },
  {
    name: "Udaipur",
    tagline: "City of Lakes",
    description: "Often called the Venice of the East. Famous for its pristine lakes, romantic palaces, and serene sunsets that paint the sky in gold and crimson.",
    image: heroUdaipur,
    placeCount: places.filter(p => p.city === "Udaipur").length,
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2))",
  }
]

function CitiesPage() {
  const [selectedCity, setSelectedCity] = useState(null)
  const navigate = useNavigate()

  const cityPlaces = selectedCity
    ? places.filter(p => p.city === selectedCity)
    : []

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <Navbar />

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "120px 24px 140px",
        position: "relative",
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div style={{
            display: "inline-flex",
            padding: "6px 16px",
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: "8px",
            color: "#c084fc",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "16px",
          }}>
            Handpicked Destinations
          </div>
          <h1 style={{
            color: "white",
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "14px",
            letterSpacing: "-0.03em",
          }}>
            Curated Cities
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "16px",
            fontFamily: "'Space Grotesk', sans-serif",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            We map the vibe so you can escape the ordinary.
          </p>
        </motion.div>

        {/* City cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{
                display: "flex",
                flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
              }}
              className="flex-col md:flex-row"
            >
              {/* Image */}
              <div style={{
                flex: 1,
                minHeight: "320px",
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: city.gradient,
                  mixBlendMode: "multiply",
                }} />
              </div>

              {/* Content */}
              <div style={{
                flex: "1 1 50%",
                padding: "44px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <span style={{
                  color: "#c084fc",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {city.tagline}
                </span>
                <h2 style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: 800,
                  marginBottom: "8px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}>
                  {city.name}
                </h2>
                <div style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "13px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: "16px",
                }}>
                  {city.placeCount} curated places
                </div>
                <p style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  marginBottom: "28px",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {city.description}
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => navigate(`/explore?city=${city.name}`)}
                    style={{
                      padding: "12px 24px",
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      border: "none",
                      color: "white",
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Explore {city.name} →
                  </button>
                  <button
                    onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
                    style={{
                      padding: "12px 24px",
                      background: selectedCity === city.name ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(168,85,247,0.2)",
                      color: "#c084fc",
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {selectedCity === city.name ? "Hide Preview ✕" : "Quick Preview"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Preview of places */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: "48px" }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}>
              <div style={{
                width: "4px",
                height: "24px",
                borderRadius: "4px",
                background: "linear-gradient(180deg, #a855f7, #ec4899)",
              }} />
              <h2 style={{
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.02em",
              }}>
                Places in {selectedCity}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
              {cityPlaces.slice(0, 6).map(place => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate(`/place/${place.id}`)}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)"
                    e.currentTarget.style.transform = "translateY(-4px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <img
                    src={place.images?.[0]}
                    alt={place.name}
                    loading="lazy"
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "16px" }}>
                    <h3 style={{
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}>
                      {place.name}
                    </h3>
                    <p style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "12px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                      <span style={{ color: "#fbbf24" }}>★ {place.rating}</span>
                      <span>·</span>
                      <span>{place.type}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {cityPlaces.length > 6 && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button
                  onClick={() => navigate(`/explore?city=${selectedCity}`)}
                  style={{
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(168,85,247,0.2)",
                    color: "#c084fc",
                    padding: "10px 24px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                >
                  View all {cityPlaces.length} places →
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default CitiesPage
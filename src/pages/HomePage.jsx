import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import MoodPill from "../components/MoodPill"
import PlaceCard from "../components/PlaceCard"
import Footer from "../components/Footer"
import BottomNav from "../components/BottomNav"
import GalleryModal from "../components/GalleryModal"
import moods from "../data/mood"
import usePlaces from "../hooks/usePlaces"
import { heroUdaipur } from "../data/placeImages"
import { animatePageLoad } from "../utils/gsapAnimations"

const INITIAL_COUNT = 6

function HomePage() {
  const { places, loading } = usePlaces()
  const [activeMood, setActiveMood] = useState(null)
  const [activeCity, setActiveCity] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const navigate = useNavigate()

  const heroRef = useRef(null)
  const filtersRef = useRef(null)
  const sectionHeaderRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const ctaRef = useRef(null)

  const filtered = places.filter(p => {
    const moodMatch = activeMood ? p.moods.includes(activeMood) : true
    const cityMatch = activeCity ? p.city === activeCity : true
    return moodMatch && cityMatch
  })

  const visiblePlaces = filtered.slice(0, INITIAL_COUNT)

  const handleMoodClick = (moodId) => {
    setActiveMood(activeMood === moodId ? null : moodId)
  }

  const handleCityClick = (city) => {
    setActiveCity(activeCity === city ? null : city)
  }

  useGSAP(() => {
    animatePageLoad(heroRef, filtersRef, sectionHeaderRef, cardsContainerRef, ctaRef)
  }, [])

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <Navbar />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section style={{
        position: "relative",
        height: "85vh",
        minHeight: "600px",
        maxHeight: "900px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Hero background image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroUdaipur})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "brightness(0.4) saturate(1.2)",
          transform: "scale(1.05)",
        }} />

        {/* Gradient overlays */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.1) 40%, rgba(10,10,15,0.7) 80%, rgba(10,10,15,1) 100%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }} />

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "800px",
            padding: "0 24px",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.25)",
              borderRadius: "999px",
              color: "#c084fc",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: "28px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: "10px", animation: "pulseGlow 2s ease-in-out infinite" }}>●</span>
            Discover 40+ curated places in Rajasthan
          </motion.div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            fontFamily: "'Space Grotesk', sans-serif",
            margin: "0 0 20px",
          }}>
            Find Places That{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Match Your Vibe
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            fontFamily: "'Space Grotesk', sans-serif",
            margin: "0 auto 36px",
            maxWidth: "560px",
          }}>
            Curated by mood, not just location. Explore forts, lakeside cafés, rooftop bars, and hidden gems across Jaipur & Udaipur.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/explore')}
              style={{
                padding: "15px 36px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                border: "none",
                color: "white",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 8px 30px rgba(168,85,247,0.3)",
                letterSpacing: "-0.01em",
              }}
            >
              Explore All Places →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/cities')}
              style={{
                padding: "15px 36px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                backdropFilter: "blur(10px)",
                letterSpacing: "-0.01em",
                transition: "all 0.3s ease",
              }}
            >
              Browse Cities
            </motion.button>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginTop: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "40+", label: "Places" },
              { value: "2", label: "Cities" },
              { value: "8", label: "Moods" },
              { value: "4.7★", label: "Avg Rating" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-0.02em",
                }}>{stat.value}</div>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  marginTop: "2px",
                }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom fade scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(transparent, rgba(168,85,247,0.4))",
          }} />
          <div style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(168,85,247,0.5)",
          }} />
        </motion.div>
      </section>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 24px 140px",
        position: "relative",
        zIndex: 10,
      }}>

        <div ref={heroRef}>
          {/* City filter */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}>
            {["Jaipur", "Udaipur"].map(city => (
              <motion.button
                key={city}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCityClick(city)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  border: activeCity === city
                    ? "1.5px solid #a855f7"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: activeCity === city
                    ? "rgba(168,85,247,0.12)"
                    : "rgba(255,255,255,0.03)",
                  color: activeCity === city ? "#c084fc" : "#9ca3af",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
              >
                📍 {city}
              </motion.button>
            ))}
          </div>

          {/* Mood Pills */}
          <div ref={filtersRef} style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "56px",
          }}>
            {moods.map((m) => (
              <div key={m.id}>
                <MoodPill
                  mood={m}
                  isActive={activeMood === m.id}
                  onClick={handleMoodClick}
                />
              </div>
            ))}
          </div>

          {/* Section header */}
          <div ref={sectionHeaderRef} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "4px",
                height: "28px",
                borderRadius: "4px",
                background: "linear-gradient(180deg, #a855f7, #ec4899)",
              }} />
              <h2 style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "white",
                margin: 0,
                letterSpacing: "-0.03em",
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {activeMood
                  ? `${moods.find(m => m.id === activeMood)?.emoji} ${moods.find(m => m.id === activeMood)?.label} Places`
                  : "Featured Places"}
              </h2>
            </div>
            <button
              onClick={() => navigate('/explore')}
              style={{
                background: "none",
                border: "none",
                color: "#a855f7",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                padding: "6px 14px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(168,85,247,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              View all →
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: "center",
            padding: "60px 0",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
          }}>
            <div className="loading-shimmer" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid rgba(168,85,247,0.15)",
              borderTopColor: "#a855f7",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }} />
            Discovering places...
          </div>
        )}

        {/* Place cards grid */}
        {!loading && (
          <div ref={cardsContainerRef}>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "24px" }}
            >
              <AnimatePresence mode="popLayout">
                {visiblePlaces.map((place, index) => (
                  <PlaceCard
                    key={place._id || place.id}
                    place={place}
                    index={index}
                    onClick={setSelectedPlace}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px",
            }}
          >
            No places found for this mood yet ✦
          </motion.div>
        )}

        {/* Explore CTA */}
        <div ref={ctaRef} style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "56px",
        }}>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(168,85,247,0.35)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/explore')}
            style={{
              padding: "16px 44px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              border: "none",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 8px 30px rgba(168,85,247,0.25)",
              letterSpacing: "-0.01em",
            }}
          >
            Explore All 40+ Places →
          </motion.button>
        </div>

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

export default HomePage

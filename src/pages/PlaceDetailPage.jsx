import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import BottomNav from "../components/BottomNav"
import Footer from "../components/Footer"
import places from "../data/places"

function PlaceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const place = places.find(p => p.id === parseInt(id))
  const [activeImg, setActiveImg] = useState(0)

  if (!place) {
    return (
      <div style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
      }}>
        <Navbar />
        <h2 style={{
          color: "white",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "24px",
        }}>
          Place not found
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            border: "none",
            color: "white",
            borderRadius: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Go Home
        </button>
      </div>
    )
  }

  const images = place.images || []

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <Navbar />

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "100px 20px 140px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          style={{
            alignSelf: "flex-start",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            borderRadius: "12px",
            padding: "10px 18px",
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(168,85,247,0.1)"
            e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
          }}
        >
          ← Back
        </motion.button>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "480px",
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {images.length > 0 && (
            <motion.img
              key={activeImg}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={images[activeImg]}
              alt={place.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(10,10,15,0.9))",
            padding: "48px 36px 32px",
          }}>
            <div style={{
              display: "inline-flex",
              padding: "4px 12px",
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: "8px",
              color: "#c084fc",
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: "10px",
            }}>
              {place.tag}
            </div>
            <h1 style={{
              margin: 0,
              color: "white",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}>
              {place.name}
            </h1>
            <p style={{
              margin: "6px 0 0",
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontFamily: "'Space Grotesk', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span>📍 {place.city}</span>
              <span>·</span>
              <span style={{ color: "#fbbf24" }}>★ {place.rating}</span>
            </p>
          </div>
        </motion.div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}>
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImg(idx)}
                style={{
                  width: "100px",
                  height: "68px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  border: activeImg === idx ? "2px solid #a855f7" : "2px solid transparent",
                  opacity: activeImg === idx ? 1 : 0.5,
                  transition: "all 0.2s ease"
                }}
              >
                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="thumbnail" />
              </div>
            ))}
          </div>
        )}

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
            background: "rgba(255,255,255,0.02)",
            padding: "32px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <h3 style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 12px",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
            }}>
              About {place.name}
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              fontSize: "14px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {place.description}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "Category", value: place.type, color: "#c084fc" },
              { label: "Rating", value: `★ ${place.rating} / 5`, color: "#fbbf24" },
              { label: "Timing", value: place.timing, color: "rgba(255,255,255,0.6)" },
              { label: "Budget", value: place.budget, color: "rgba(255,255,255,0.6)" },
              { label: "Best Mood", value: place.moods.join(", "), color: "rgba(255,255,255,0.6)" },
            ].map(item => (
              <div key={item.label} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {item.label}
                </span>
                <div style={{ color: item.color, fontSize: "14px", fontWeight: 500, marginTop: "2px" }}>
                  {item.value}
                </div>
              </div>
            ))}

            <button
              style={{
                marginTop: "8px",
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "white",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Add to Itinerary ✦
            </button>
          </div>
        </motion.div>

      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}

export default PlaceDetailPage

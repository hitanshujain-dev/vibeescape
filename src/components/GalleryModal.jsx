import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function GalleryModal({ place, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const navigate = useNavigate()

  if (!place) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,15,0.95)",
        backdropFilter: "blur(20px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        overflowY: "auto"
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "20px", right: "20px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          color: "white", borderRadius: "12px", width: "40px", height: "40px",
          cursor: "pointer", fontSize: "18px", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(168,85,247,0.15)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
      >
        ✕
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Main Image */}
        <motion.div
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {place.images && place.images[activeImg] && (
            <motion.img
              key={activeImg}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={place.images[activeImg]}
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
            <h2 style={{
              margin: 0,
              color: "white",
              fontSize: "32px",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
            }}>
              {place.name}
            </h2>
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
        {place.images && place.images.length > 1 && (
          <div style={{
            display: "flex",
            gap: "10px",
            paddingBottom: "10px",
            overflowX: "auto",
          }}>
            {place.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImg(idx)}
                style={{
                  width: "100px",
                  height: "68px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: activeImg === idx ? "2px solid #a855f7" : "2px solid transparent",
                  opacity: activeImg === idx ? 1 : 0.5,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              </div>
            ))}
          </div>
        )}

        {/* Details */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          background: "rgba(255,255,255,0.02)",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div>
            <h3 style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 10px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              About
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              fontSize: "14px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {place.description}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Type", value: place.type, color: "#c084fc" },
              { label: "Rating", value: `★ ${place.rating} / 5`, color: "#fbbf24" },
              { label: "Timing", value: place.timing, color: "rgba(255,255,255,0.6)" },
              { label: "Budget", value: place.budget, color: "rgba(255,255,255,0.6)" },
            ].map(item => (
              <div key={item.label} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}>
                  {item.label}
                </span>
                <div style={{ color: item.color, fontSize: "14px", fontWeight: 500, marginTop: "2px" }}>
                  {item.value}
                </div>
              </div>
            ))}

            <button
              onClick={() => { onClose(); navigate(`/place/${place.id}`); }}
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
                fontSize: "13px",
                boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              View Full Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GalleryModal

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Guaranteed fallback — Amber Fort via Wikimedia Commons (CC licensed)
const FALLBACK_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jaipur_03-2016_04_Amber_Fort.jpg?width=1200"

function PlaceCard({ place, index = 0, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState(place.images?.[0] || FALLBACK_IMAGE)
  const cardRef = useRef(null)
  const imageContainerRef = useRef(null)

  // Sync state if place data changes (crucial for HMR and data updates)
  useEffect(() => {
    setImgSrc(place.images?.[0] || FALLBACK_IMAGE)
    setImgLoaded(false)
    setImgError(false)
  }, [place.images?.[0]])

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (index % 3) * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [index])

  // Use state-tracked imgSrc so we can swap to fallback on error
  const mainImage = imgSrc

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={() => onClick && onClick({ ...place })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(168,85,247,0.3)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.1)"
          : "0 4px 20px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Shimmer accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)",
        backgroundSize: "200% auto",
        animation: hovered ? "shimmer 1.5s linear infinite" : "none",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 10,
      }} />

      {/* Image */}
      <div
        ref={imageContainerRef}
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.08))",
        }}
      >
        {/* Loading skeleton */}
        {!imgLoaded && !imgError && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite",
          }} />
        )}

        {/* Error fallback */}
        {imgError && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))",
            color: "rgba(255,255,255,0.25)",
            fontSize: "36px",
          }}>
            🏛️
          </div>
        )}

        {mainImage && !imgError && (
          <img
            src={mainImage}
            alt={place.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (imgSrc !== FALLBACK_IMAGE) {
                // Try fallback before giving up
                setImgSrc(FALLBACK_IMAGE)
                setImgLoaded(false)
              } else {
                setImgError(true)
              }
            }}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              opacity: imgLoaded ? 1 : 0,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 40%, transparent 70%)",
          zIndex: 5,
        }} />

        {/* Tag badge */}
        <div style={{
          position: "absolute",
          top: "14px", left: "14px",
          background: "rgba(10,10,15,0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(168,85,247,0.25)",
          borderRadius: "10px",
          padding: "5px 12px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#c084fc",
          zIndex: 6,
          letterSpacing: "0.02em",
        }}>
          {place.tag}
        </div>

        {/* Rating badge */}
        <div style={{
          position: "absolute",
          top: "14px", right: "14px",
          background: "rgba(10,10,15,0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: "10px",
          padding: "5px 10px",
          fontSize: "11px",
          fontWeight: 700,
          color: "#fbbf24",
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: "3px",
        }}>
          ★ {place.rating}
        </div>

        {/* City badge on image */}
        <div style={{
          position: "absolute",
          bottom: "14px", left: "14px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 500,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}>
          <span style={{ fontSize: "11px" }}>📍</span>
          {place.city}
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: "18px 20px 20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Name */}
        <h3 style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
        }}>
          {place.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6,
          margin: "0 0 16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>
          {place.description}
        </p>

        {/* Info pills */}
        <div style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}>
          {[
            { icon: "🕐", text: place.timing },
            { icon: "💰", text: place.budget },
          ].map(item => (
            <span key={item.text} style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "4px 10px",
              borderRadius: "8px",
            }}>
              {item.icon} {item.text}
            </span>
          ))}
        </div>

        {/* Explore button */}
        <button style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid rgba(168,85,247,0.2)",
          background: hovered
            ? "rgba(168,85,247,0.15)"
            : "rgba(168,85,247,0.06)",
          color: "#c084fc",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.01em",
          transition: "all 0.3s ease",
        }}>
          Explore Place →
        </button>
      </div>
    </motion.div>
  )
}

export default PlaceCard
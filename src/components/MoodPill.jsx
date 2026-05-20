import { useRef, useEffect } from "react"
import gsap from "gsap"

function MoodPill({ mood, isActive, onClick }) {
  const pillRef = useRef(null)

  useEffect(() => {
    if (isActive) {
      gsap.to(pillRef.current, { scale: 1.06, duration: 0.4, ease: "back.out(2)" })
    } else {
      gsap.to(pillRef.current, { scale: 1, duration: 0.3, ease: "power2.out" })
    }
  }, [isActive])

  return (
    <button
      ref={pillRef}
      onMouseDown={() => {
        gsap.to(pillRef.current, { scale: 0.95, duration: 0.1, ease: "power1.inOut" })
      }}
      onMouseUp={() => {
        onClick(mood.id)
        gsap.to(pillRef.current, { scale: isActive ? 1 : 1.06, duration: 0.5, ease: "elastic.out(1, 0.4)" })
      }}
      onMouseLeave={() => {
        if (!isActive) {
          gsap.to(pillRef.current, {
            scale: 1,
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "#9ca3af",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }}
      onMouseEnter={() => {
        if (!isActive) {
          gsap.to(pillRef.current, {
            scale: 1.03,
            background: "rgba(168,85,247,0.08)",
            borderColor: "rgba(168,85,247,0.35)",
            color: "#c084fc",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        borderRadius: "12px",
        border: isActive
          ? "1.5px solid rgba(168,85,247,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        background: isActive
          ? "rgba(168,85,247,0.12)"
          : "rgba(255,255,255,0.03)",
        color: isActive ? "#c084fc" : "#9ca3af",
        fontSize: "13px",
        fontWeight: isActive ? 600 : 500,
        cursor: "pointer",
        fontFamily: "'Space Grotesk', sans-serif",
        boxShadow: isActive
          ? "0 0 20px rgba(168,85,247,0.2), inset 0 0 20px rgba(168,85,247,0.05)"
          : "none",
        whiteSpace: "nowrap",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <span style={{ fontSize: "15px" }}>{mood.emoji}</span>
      {mood.label}
    </button>
  )
}

export default MoodPill
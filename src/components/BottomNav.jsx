// src/components/BottomNav.jsx
import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const navItems = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🔍", label: "Explore", path: "/explore" },
  { icon: "🏙️", label: "Cities", path: "/cities" },
  { icon: "👤", label: "Profile", path: "/login" },
]

function BottomNav() {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()

  useGSAP(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        if (currentY < 50) {
          setVisible(true)
        } else if (currentY > lastScrollY.current + 5) {
          setVisible(false)
        } else if (currentY < lastScrollY.current - 5) {
          setVisible(true)
        }
        lastScrollY.current = currentY
        ticking.current = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="md:hidden" style={{
      position: "fixed",
      bottom: visible ? "20px" : "-100px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "88%",
      maxWidth: "400px",
      zIndex: 50,
      transition: "bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      background: "rgba(15, 15, 22, 0.75)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "18px",
      padding: "10px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.05)",
    }}>
      {navItems.map(item => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              background: isActive ? "rgba(168,85,247,0.1)" : "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "6px 12px",
              borderRadius: "12px",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: "18px", display: "inline-block" }}>{item.icon}</span>
            <span style={{
              fontSize: "10px",
              fontWeight: isActive ? 600 : 500,
              fontFamily: "'Space Grotesk', sans-serif",
              color: isActive ? "#c084fc" : "rgba(255,255,255,0.35)",
              letterSpacing: "0.02em",
            }}>
              {item.label}
            </span>
            {isActive && (
              <div style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#a855f7",
                boxShadow: "0 0 8px rgba(168,85,247,0.6)",
                marginTop: "-1px",
              }} />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default BottomNav

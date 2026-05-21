import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useAuth } from "../context/AuthContext"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Cities", path: "/cities" },
  { label: "About", path: "/about" },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".nav-logo",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".nav-link",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(".nav-btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    gsap.to(navRef.current, {
      background: "rgba(10, 10, 15, 0.85)",
      backdropFilter: "blur(30px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5), 0 1px 0 0 rgba(168, 85, 247, 0.15)",
      duration: 0.3,
      scrollTrigger: {
        trigger: "body",
        start: "top -50",
        toggleActions: "play none none reverse"
      }
    })
  })

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    setMenuOpen(false)
    navigate("/")
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(10, 10, 15, 0.2)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 24px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}>

          {/* Logo */}
          <div
            className="nav-logo"
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              opacity: 1,
              visibility: "visible"
            }}
          >
            <span style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "all 0.3s ease",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Vibe</span>
              <span style={{ color: "white" }}>Escape</span>
              <span style={{ color: "#a855f7", marginLeft: "4px", fontSize: "14px" }}>✦</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex" style={{ gap: "8px" }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="nav-link"
                onClick={() => navigate(link.path)}
                style={{
                  position: "relative",
                  fontSize: "13px",
                  fontWeight: isActive(link.path) ? 600 : 500,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isActive(link.path) ? "#c084fc" : "#9ca3af",
                  background: isActive(link.path) ? "rgba(168,85,247,0.08)" : "transparent",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "all 0.25s ease",
                  opacity: 1,
                  visibility: "visible"
                }}
                onMouseEnter={e => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.color = "#c084fc"
                    e.currentTarget.style.background = "rgba(168,85,247,0.06)"
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.color = "#9ca3af"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side — auth-aware */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

            {user ? (
              /* ── LOGGED IN STATE ── */
              <div style={{ position: "relative" }}>
                <button
                  className="nav-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(168,85,247,0.1)",
                    border: "1px solid rgba(168,85,247,0.25)",
                    borderRadius: "12px",
                    padding: "7px 14px 7px 8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    opacity: 1,
                    visibility: "visible",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(168,85,247,0.18)"
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(168,85,247,0.1)"
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.25)"
                  }}
                >
                  {/* Avatar circle with initials */}
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "'Space Grotesk', sans-serif",
                    flexShrink: 0,
                  }}>
                    {getInitials(user.name)}
                  </div>
                  {/* Name */}
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#c084fc",
                    fontFamily: "'Space Grotesk', sans-serif",
                    maxWidth: "90px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {user.name.split(" ")[0]}
                  </span>
                  {/* Chevron */}
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      color: "#9ca3af",
                      transition: "transform 0.2s ease",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      minWidth: "180px",
                      background: "rgba(15, 15, 20, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(168,85,247,0.15)",
                      borderRadius: "14px",
                      padding: "6px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(168,85,247,0.1)",
                      zIndex: 100,
                    }}
                  >
                    {/* User info row */}
                    <div style={{
                      padding: "10px 12px 8px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      marginBottom: "4px",
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "white",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {user.name}
                      </p>
                      <p style={{
                        margin: "2px 0 0",
                        fontSize: "11px",
                        color: "#6b7280",
                        fontFamily: "'Space Grotesk', sans-serif",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {user.email}
                      </p>
                    </div>

                    {/* Sign out button */}
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "transparent",
                        border: "none",
                        color: "#f87171",
                        fontSize: "13px",
                        fontWeight: 500,
                        fontFamily: "'Space Grotesk', sans-serif",
                        padding: "9px 12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(239,68,68,0.1)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 12H3a1 1 0 01-1-1V3a1 1 0 011-1h2M9.5 9.5L12 7m0 0L9.5 4.5M12 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── LOGGED OUT STATE ── */
              <>
                {/* Sign in — goes to login tab */}
                <button
                  className="hidden md:block nav-btn"
                  onClick={() => navigate("/login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9ca3af",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: "all 0.3s ease",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    opacity: 1,
                    visibility: "visible"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#c084fc"
                    e.currentTarget.style.background = "rgba(168,85,247,0.06)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#9ca3af"
                    e.currentTarget.style.background = "none"
                  }}
                >
                  Sign in
                </button>

                {/* Get Started — goes to register tab */}
                <button
                  className="nav-btn"
                  onClick={() => navigate("/login?mode=register")}
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #ec4899)",
                    border: "none",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "10px 22px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                    transition: "all 0.3s ease",
                    opacity: 1,
                    visibility: "visible"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-1px)"
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(168,85,247,0.4)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(168,85,247,0.25)"
                  }}
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            >
              <div style={{ width: "20px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: "block", height: "2px", borderRadius: "2px",
                    background: "white",
                    transition: "all 0.3s ease",
                    transform: menuOpen
                      ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                      : i === 1 ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </div>
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            padding: "8px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                style={{
                  background: isActive(link.path) ? "rgba(168,85,247,0.1)" : "transparent",
                  border: "none",
                  color: isActive(link.path) ? "#c084fc" : "#9ca3af",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "12px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile auth section */}
            <div style={{
              marginTop: "8px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
              {user ? (
                <>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    marginBottom: "4px",
                  }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700, color: "white",
                      fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0,
                    }}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {user.name}
                      </p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#6b7280", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      color: "#f87171",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "11px 16px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile Sign in — login tab */}
                  <button
                    onClick={() => { navigate("/login"); setMenuOpen(false); }}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "1px solid rgba(168,85,247,0.2)",
                      color: "#c084fc",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      padding: "12px 16px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "center",
                      marginBottom: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Sign in
                  </button>
                  {/* Mobile Get Started — register tab */}
                  <button
                    onClick={() => { navigate("/login?mode=register"); setMenuOpen(false); }}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      border: "none",
                      color: "white",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      padding: "12px 16px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "center",
                      boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Ambient Glow Blobs */}
      <div style={{
        position: "fixed", top: "-15%", left: "-10%",
        width: "40%", height: "40%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-15%", right: "-10%",
        width: "40%", height: "40%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
    </>
  )
}

export default Navbar

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import BottomNav from "../components/BottomNav"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "14px",
    fontFamily: "'Space Grotesk', sans-serif",
    outline: "none",
    transition: "all 0.3s ease",
    marginBottom: "16px"
  }

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 140px",
        position: "relative",
      }}>

        <div style={{
          position: "absolute",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          top: "20%", left: "50%", transform: "translateX(-50%)",
          filter: "blur(50px)", zIndex: 0
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "24px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
            zIndex: 10,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{
              color: "white",
              fontSize: "26px",
              margin: "0 0 8px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}>
              Welcome Back{" "}
              <span style={{ color: "#a855f7" }}>✦</span>
            </h1>
            <p style={{
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              fontSize: "13px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              Enter your details to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div>
              <label style={{
                display: "block",
                color: "rgba(255,255,255,0.5)",
                fontSize: "12px",
                marginBottom: "8px",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#a855f7"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                required
              />
            </div>

            <div>
              <label style={{
                display: "block",
                color: "rgba(255,255,255,0.5)",
                fontSize: "12px",
                marginBottom: "8px",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#a855f7"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                required
              />
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "28px",
              fontSize: "12px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}>
                <input type="checkbox" style={{ accentColor: "#a855f7" }} /> Remember me
              </label>
              <span style={{ color: "#c084fc", cursor: "pointer" }}>Forgot password?</span>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                border: "none",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 4px 20px rgba(168,85,247,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Log In
            </button>
          </form>

          <p style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.35)",
            marginTop: "24px",
            fontSize: "13px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Don't have an account?{" "}
            <span style={{ color: "#c084fc", fontWeight: 600, cursor: "pointer" }}>Sign up</span>
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  )
}

export default LoginPage

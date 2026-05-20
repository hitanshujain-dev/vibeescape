import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import BottomNav from "../components/BottomNav"
import Footer from "../components/Footer"

function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Navbar />

      {/* Floating Blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "140px 24px 100px",
        position: "relative",
        zIndex: 10
      }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            marginBottom: "20px",
          }}>
            Our Mission
          </div>
          <h1 style={{
            color: "white",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            margin: "0 0 20px",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}>
            Match Your Mood{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              to Your Destination
            </span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "16px",
            lineHeight: "1.8",
            fontFamily: "'Space Grotesk', sans-serif",
            maxWidth: "560px",
            margin: "0 auto",
          }}>
            VibeEscape started with a simple question: Why do we search for places by zip code instead of feeling? We believe travel should be an emotional experience first.
          </p>
        </motion.div>

        <div style={{ display: "grid", gap: "20px" }}>
          {[
            {
              icon: "🎨",
              title: "Vibe-First Philosophy",
              text: "We categorize places based on aesthetics, energy, and feeling. Whether you need a dark academia café to work, or a sunset-drenched hilltop to relax."
            },
            {
              icon: "✦",
              title: "Curated Selections",
              text: "Quality over quantity. We don't list everything. We only list places that have a distinct character and genuine vibe worth experiencing."
            },
            {
              icon: "📸",
              title: "Visual Discovery",
              text: "Less reading, more seeing. Our platform emphasizes high quality imagery to convey the mood instantly — letting you feel a place before visiting."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "32px",
                borderRadius: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.15)"
                e.currentTarget.style.background = "rgba(168,85,247,0.03)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"
                e.currentTarget.style.background = "rgba(255,255,255,0.02)"
              }}
            >
              <div style={{
                fontSize: "24px",
                marginBottom: "14px",
              }}>
                {item.icon}
              </div>
              <h3 style={{
                color: "white",
                fontSize: "18px",
                fontWeight: 700,
                margin: "0 0 10px",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.01em",
              }}>
                {item.title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.45)",
                margin: 0,
                lineHeight: "1.7",
                fontSize: "14px",
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack badge (shows this is a real fullstack project) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: "48px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "28px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{
            color: "white",
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "16px",
          }}>
            Built With
          </h3>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}>
            {["React", "Node.js", "MongoDB", "Express", "GSAP", "Framer Motion", "Tailwind CSS"].map(tech => (
              <span key={tech} style={{
                padding: "6px 14px",
                background: "rgba(168,85,247,0.06)",
                border: "1px solid rgba(168,85,247,0.12)",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: "20px",
            fontSize: "15px",
          }}>
            Ready to find your vibe?
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(168,85,247,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              padding: "15px 36px",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              border: "none",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              borderRadius: "14px",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 8px 30px rgba(168,85,247,0.25)",
            }}
          >
            Start Exploring →
          </motion.button>
        </div>

      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}

export default AboutPage

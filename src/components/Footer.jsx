// src/components/Footer.jsx
import { useNavigate } from "react-router-dom"

function Footer() {
  const navigate = useNavigate()

  const linkGroups = [
    {
      title: "Explore",
      links: [
        { label: "All Places", action: () => navigate("/explore") },
        { label: "Jaipur", action: () => navigate("/explore?city=Jaipur") },
        { label: "Udaipur", action: () => navigate("/explore?city=Udaipur") },
        { label: "By Mood", action: () => navigate("/explore") },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", action: () => navigate("/about") },
        { label: "Cities", action: () => navigate("/cities") },
        { label: "Contact", action: () => {} },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", action: () => {} },
        { label: "Privacy Policy", action: () => {} },
        { label: "Terms of Service", action: () => {} },
      ],
    },
  ]

  const socials = [
    { icon: "𝕏", label: "Twitter" },
    { icon: "📷", label: "Instagram" },
    { icon: "💼", label: "LinkedIn" },
    { icon: "🎵", label: "TikTok" },
  ]

  return (
    <footer style={{
      background: "linear-gradient(180deg, transparent 0%, rgba(10,10,15,1) 20%)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Vibe</span>
              <span style={{ color: "white" }}>Escape</span>
              <span style={{ color: "#a855f7", marginLeft: "4px", fontSize: "12px" }}>✦</span>
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              Discover places that match your mood.<br />
              A curated travel companion for Rajasthan.
            </p>

            <div className="flex gap-3">
              {socials.map(s => (
                <button key={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#6b7280",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"
                    e.currentTarget.style.color = "#c084fc"
                    e.currentTarget.style.background = "rgba(168,85,247,0.08)"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                    e.currentTarget.style.color = "#6b7280"
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                  title={s.label}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {linkGroups.map(group => (
            <div key={group.title}>
              <h4 style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#a855f7",
                marginBottom: "16px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {group.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "#6b7280",
                        fontSize: "13px",
                        cursor: "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
                      onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-6"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.15), rgba(236,72,153,0.1), transparent)",
          }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: "#4b5563" }}>
            © 2026 VibeEscape. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#4b5563" }}>
            Built with 💜 for explorers
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NavInterceptor() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (e) => {
      // Find closest anchor or button
      const target = e.target.closest("a") || e.target.closest("button")
      if (!target) return

      const text = target.textContent?.toLowerCase().trim() || ""

      if (target.tagName === "A") {
        if (text.includes("explore")) {
          e.preventDefault()
          navigate("/explore")
        } else if (text.includes("home")) {
          e.preventDefault()
          navigate("/")
        } else if (text.includes("cities")) {
          e.preventDefault()
          navigate("/cities")
        } else if (text.includes("about")) {
          e.preventDefault()
          navigate("/about")
        }
      } else if (target.tagName === "BUTTON") {
        if (text.includes("sign in") || text.includes("get started") || text.includes("profile")) {
          e.preventDefault()
          navigate("/login")
        } else if (text.includes("home")) {
          e.preventDefault()
          navigate("/")
        } else if (text.includes("explore")) {
          e.preventDefault()
          navigate("/explore")
        } else if (text.includes("cities")) {
          e.preventDefault()
          navigate("/cities")
        }
      }
    }

    // Attach to document
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [navigate])

  return null
}

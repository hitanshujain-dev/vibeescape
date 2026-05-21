// src/App.jsx
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ExplorePage from "./pages/ExplorePage"
import PlaceDetailPage from "./pages/PlaceDetailPage"
import LoginPage from "./pages/LoginPage"
import CitiesPage from "./pages/CitiesPage"
import AboutPage from "./pages/AboutPage"
import NavInterceptor from "./components/NavInterceptor"

function App() {
  return (
    <>
      <NavInterceptor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/place/:id" element={<PlaceDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App

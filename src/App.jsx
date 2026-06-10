import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SeoScript from './components/SeoScript.jsx'
import { useEffect } from 'react'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <SeoScript />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

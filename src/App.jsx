import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const currentPage =
    pathname === '/about'
      ? 'about'
      : pathname === '/gallery'
        ? 'gallery'
        : pathname === '/testimonials'
          ? 'testimonials'
          : pathname === '/contact'
            ? 'contact'
            : pathname === '/login'
              ? 'login'
              : pathname === '/register'
                ? 'register'
          : 'home'

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} />
      <main className="pt-20">
        {currentPage === 'about' ? (
          <About />
        ) : currentPage === 'gallery' ? (
          <Gallery />
        ) : currentPage === 'testimonials' ? (
          <Testimonials />
        ) : currentPage === 'contact' ? (
          <Contact />
        ) : currentPage === 'login' ? (
          <Login />
        ) : currentPage === 'register' ? (
          <Register />
        ) : (
          <Home />
        )}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default App

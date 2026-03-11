import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/cart', element: <Cart /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/testimonials', element: <Testimonials /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <Profile /> },
  { path: '/register', element: <Register /> },
]

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default App

import { useState, useRef, useEffect } from 'react'

const Navbar = ({ currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [openNested, setOpenNested] = useState(null)

  const productsRef = useRef(null)
  const productsButtonRef = useRef(null)
  const searchButtonRef = useRef(null)
  const timeoutRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target) &&
        productsButtonRef.current && !productsButtonRef.current.contains(event.target)) {
        setIsProductsOpen(false)
        setOpenNested(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle products dropdown with proper delay
  const handleProductsMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // Close search when opening products
    setIsSearchOpen(false)
    setIsProductsOpen(true)
  }

  const handleProductsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false)
      setOpenNested(null)
    }, 200)
  }

  // Handle nested menu
  const handleNestedMouseEnter = (index) => {
    setOpenNested(index)
  }

  const handleNestedMouseLeave = () => {
    // Small delay before closing nested menu
    setTimeout(() => {
      setOpenNested(null)
    }, 100)
  }

  // Toggle search with proper behavior - Products dropdown band karo aur search properly dikhao
  const toggleSearch = () => {
    // Pehle products dropdown band karo
    setIsProductsOpen(false)
    setOpenNested(null)

    // Phir search toggle karo
    setIsSearchOpen(!isSearchOpen)
  }

  // Search close karo
  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  // Product categories with React icons
  const productCategories = [
    {
      name: 'Indoor Plants',
      href: '#indoor-plants',
      icon: '🏠',
      submenu: [
        { name: 'Low Light Plants', href: '#low-light' },
        { name: 'Air Purifying Plants', href: '#air-purifying' },
        { name: 'Flowering Indoor Plants', href: '#flowering-indoor' },
        { name: 'Succulents', href: '#succulents' },
        { name: 'Bonsai Plants', href: '#bonsai' }
      ]
    },
    {
      name: 'Outdoor Plants',
      href: '#outdoor-plants',
      icon: '🌳',
      submenu: [
        { name: 'Shade Plants', href: '#shade-plants' },
        { name: 'Sun Loving Plants', href: '#sun-loving' },
        { name: 'Climbers', href: '#climbers' },
        { name: 'Hedges', href: '#hedges' },
        { name: 'Fruit Plants', href: '#fruit-plants' }
      ]
    },
    {
      name: 'Gardening Tools',
      href: '#tools',
      icon: '🔧',
      submenu: [
        { name: 'Hand Tools', href: '#hand-tools' },
        { name: 'Watering Equipment', href: '#watering' },
        { name: 'Pruning Tools', href: '#pruning' },
        { name: 'Sprayers & Misters', href: '#sprayers' },
        { name: 'Garden Decor', href: '#decor' },
        { name: 'Gloves & Protective Gear', href: '#gear' }
      ]
    },
    {
      name: 'Pots & Planters',
      href: '#pots',
      icon: '🏺',
      submenu: [
        { name: 'Ceramic Pots', href: '#ceramic' },
        { name: 'Plastic Pots', href: '#plastic' },
        { name: 'Clay Pots', href: '#clay' },
        { name: 'Hanging Baskets', href: '#hanging' },
        { name: 'Self-Watering Pots', href: '#self-watering' }
      ]
    },
    {
      name: 'Seeds & Bulbs',
      href: '#seeds',
      icon: '🌱',
      submenu: [
        { name: 'Vegetable Seeds', href: '#vegetable' },
        { name: 'Flower Seeds', href: '#flower' },
        { name: 'Herb Seeds', href: '#herb' },
        { name: 'Flower Bulbs', href: '#bulbs' }
      ]
    },
    {
      name: 'Plant Care',
      href: '#plant-care',
      icon: '💚',
      submenu: [
        { name: 'Fertilizers', href: '#fertilizers' },
        { name: 'Pest Control', href: '#pest-control' },
        { name: 'Plant Supports', href: '#supports' },
        { name: 'Plant Food', href: '#plant-food' }
      ]
    }
  ]

  const routeTo = (path) => {
    setIsOpen(false)
    setIsSearchOpen(false)
    setIsProductsOpen(false)
    setOpenNested(null)

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }

  const homeSectionLink = (section) => currentPage === 'about' ? `/#${section}` : `#${section}`

  const navItems = [
    { label: 'Gallery', type: 'route', path: '/gallery' },
    { label: 'Testimonials', type: 'route', path: '/testimonials' },
    { label: 'Contact', type: 'route', path: '/contact' },
  ]

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button type="button" onClick={() => routeTo('/')} className="group flex items-center gap-2 border-0 bg-transparent p-0">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 14c0-5 4-9 9-9 0 5-4 9-9 9Z" />
              <path d="M9 20c.5-4 3-7 7-9" />
            </svg>
          </span>
          <span className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            Nurser
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home */}
          <button type="button" onClick={() => routeTo('/')} className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
            Home
            <span className={`absolute left-0 bottom-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          {/* About */}
          <button type="button" onClick={() => routeTo('/about')} className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === 'about' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
            About
            <span className={`absolute left-0 bottom-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          {/* Products Dropdown - Center mein khulega */}
          <div
            className="static"
            onMouseEnter={handleProductsMouseEnter}
            onMouseLeave={handleProductsMouseLeave}
          >
            <button
              ref={productsButtonRef}
              className={`relative flex items-center gap-1.5 px-1 py-2 text-sm font-medium transition-all duration-300 group ${isProductsOpen ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                }`}
            >
              <span>Products</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className={`absolute left-0 bottom-0 h-0.5 bg-green-600 transition-all duration-300 ${isProductsOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>

            {/* Products Mega Menu - Center aligned with Navbar Container */}
            {isProductsOpen && (
              <div
                ref={productsRef}
                className="absolute left-0 right-0 mx-auto top-full mt-0 w-[calc(100%-2rem)] max-w-[1100px] bg-white rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-x border-b border-gray-50 p-8 z-50 overflow-x-hidden"
                style={{
                  maxHeight: '600px',
                  overflowY: 'auto',
                  animation: 'slideDownCentered 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                  {productCategories.map((category, idx) => (
                    <div key={idx} className="space-y-2">
                      <a
                        href={category.href}
                        className="flex items-center gap-3 font-bold text-green-700 hover:text-green-600 text-[15px] border-b border-gray-50 pb-3 mb-2 transition-colors uppercase tracking-wider"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.name}</span>
                      </a>

                      <div className="space-y-1">
                        {category.submenu.map((subItem, subIdx) => (
                          <div key={subIdx} className="relative">
                            {subItem.nested ? (
                              // Item with nested menu
                              <div
                                className="relative"
                                onMouseEnter={() => handleNestedMouseEnter(`${idx}-${subIdx}`)}
                                onMouseLeave={handleNestedMouseLeave}
                              >
                                <a
                                  href={subItem.href}
                                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 group"
                                >
                                  <span>{subItem.name}</span>
                                  <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>

                                {/* Nested Menu - Professional Alignment & Styling */}
                                {openNested === `${idx}-${subIdx}` && (
                                  <div
                                    className="absolute left-[calc(100%+0.5rem)] top-0 w-52 bg-white rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-50 py-3 z-50"
                                    style={{
                                      animation: 'slideInRight 0.3s ease-out'
                                    }}
                                  >
                                    <div className="flex flex-col gap-1">
                                      {subItem.nested.map((nestedItem, nestedIdx) => (
                                        <a
                                          key={nestedIdx}
                                          href={nestedItem.href}
                                          className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                                        >
                                          {nestedItem.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <a
                                href={subItem.href}
                                className="block px-2 py-1.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-all duration-200"
                              >
                                {subItem.name}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other nav items */}
          {navItems.map((item) => item.type === 'route' ? (
            <button
              key={item.label}
              type="button"
              onClick={() => routeTo(item.path)}
              className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === item.label.toLowerCase() ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              {item.label}
              <span className={`absolute left-0 bottom-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === item.label.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="relative px-1 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-all duration-300 group"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search Button */}
          <button
            ref={searchButtonRef}
            onClick={toggleSearch}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          {/* Cart Button */}
          <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H7" />
              <circle cx="10" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 ml-2">
            <button type="button" onClick={() => routeTo('/login')} className="border-0 bg-transparent px-5 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-green-600">
              Login
            </button>
            <button type="button" onClick={() => routeTo('/register')} className="px-6 py-2.5 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all active:scale-95">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Search Bar - Premium Expansion */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-28 border-t border-gray-100 bg-white shadow-inner' : 'max-h-0'
          }`}
      >
        <div className="bg-gradient-to-b from-gray-50 to-white py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, category, or plants..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 transition-all duration-300 text-base shadow-sm"
                  autoFocus={isSearchOpen}
                />
              </div>
              <button
                onClick={closeSearch}
                className="px-6 py-3.5 text-sm font-semibold text-gray-600 hover:text-green-600 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] border-t border-gray-100' : 'max-h-0'
          }`}
      >
        <div className="bg-white py-3">
          <div className="px-4 space-y-2">
            <button type="button" onClick={() => routeTo('/')} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
              Home
            </button>

            <button type="button" onClick={() => routeTo('/about')} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
              About
            </button>

            {/* Mobile Products */}
            <div className="space-y-1">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-green-600 bg-green-50 rounded-lg transition-all duration-200"
              >
                <span>Products</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProductsOpen && (
                <div className="pl-4 space-y-3 mt-2">
                  {productCategories.map((category, idx) => (
                    <div key={idx} className="space-y-1">
                      <a href={category.href} className="block px-3 py-2 text-sm font-medium text-gray-800 hover:text-green-600">
                        {category.icon} {category.name}
                      </a>
                      <div className="pl-6 space-y-1">
                        {category.submenu.map((subItem, subIdx) => (
                          <div key={subIdx}>
                            {subItem.nested ? (
                              <div className="space-y-1">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setOpenNested(openNested === `${idx}-${subIdx}` ? null : `${idx}-${subIdx}`)
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-gray-600 hover:text-green-600"
                                >
                                  {subItem.name}
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                                {openNested === `${idx}-${subIdx}` && (
                                  <div className="pl-6 space-y-1 mt-1">
                                    {subItem.nested.map((nestedItem, nestedIdx) => (
                                      <a key={nestedIdx} href={nestedItem.href} className="block px-3 py-1.5 text-xs text-gray-500 hover:text-green-600">
                                        {nestedItem.name}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <a href={subItem.href} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-green-600">
                                {subItem.name}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => item.type === 'route' ? (
              <button key={item.label} type="button" onClick={() => routeTo(item.path)} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                {item.label}
              </button>
            ) : (
              <a key={item.label} href={item.href} className="block px-3 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                {item.label}
              </a>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
              <button type="button" onClick={() => routeTo('/login')} className="w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-center text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                Login
              </button>
              <button type="button" onClick={() => routeTo('/register')} className="w-full px-3 py-2.5 text-center text-white bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes slideDownCentered {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  )
}

export default Navbar

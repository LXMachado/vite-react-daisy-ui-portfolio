import React, { useState, useEffect, useRef } from "react"

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

const NavBar = () => {
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActive(item.name)
    setMenuOpen(false)

    if (item.name === "Home") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      const element = document.querySelector(item.href)
      if (element) {
        const navbarHeight = navRef.current?.offsetHeight || 0
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight - 16

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pb-4 pt-6">
      <nav ref={navRef} className="nav-shell" aria-label="Primary navigation">
        <div className="flex items-center gap-4">
          <img src="/images/img/AM.png" alt="Brand Logo" className="nav-logo" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-ink-muted">Portfolio</span>
            <h1 className="font-SUSE text-lg font-semibold text-ink">Alexandre Machado</h1>
          </div>
        </div>
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-link ${active === item.name ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.name}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-toggle lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`mobile-link ${active === item.name ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default NavBar

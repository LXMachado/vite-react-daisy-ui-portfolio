import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "react-hook-theme"

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

const THEMES = {
  dark: "dark",
  light: "light",
}

const NavBar = () => {
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const { theme, setTheme } = useTheme()

  const isDark = theme === THEMES.dark

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])

  const handleThemeChange = (event) => {
    const nextIsDark = event.target.checked
    setTheme(nextIsDark ? THEMES.dark : THEMES.light)
  }

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
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-ink-muted">Portfolio</span>
            <h1 className="font-heading text-lg font-semibold text-slate-900 dark:text-ink">Alexandre Machado</h1>
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
        <div className="flex items-center gap-2">
          <label className={`theme-toggle ${isDark ? 'is-dark' : ''}`}>
            <input
              type="checkbox"
              className="theme-toggle-input"
              onChange={handleThemeChange}
              checked={isDark}
              aria-label={isDark ? "Activate light theme" : "Activate dark theme"}
            />
            <span aria-hidden="true" className="theme-toggle-visual">
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="theme-toggle-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25c0-.28-.015-.557-.044-.832A6 6 0 0 1 12 3.75Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="theme-toggle-icon"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path strokeLinecap="round" d="M12 3v2" />
                  <path strokeLinecap="round" d="M12 19v2" />
                  <path strokeLinecap="round" d="m5.64 5.64 1.42 1.42" />
                  <path strokeLinecap="round" d="m16.94 16.94 1.42 1.42" />
                  <path strokeLinecap="round" d="M3 12h2" />
                  <path strokeLinecap="round" d="M19 12h2" />
                  <path strokeLinecap="round" d="m5.64 18.36 1.42-1.42" />
                  <path strokeLinecap="round" d="m16.94 7.06 1.42-1.42" />
                </svg>
              )}
            </span>
          </label>
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
        </div>
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

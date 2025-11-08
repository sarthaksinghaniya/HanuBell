import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoImage from '../assets/hanubell-logo.jpg'
import '../styles/navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Core Team', href: '#team' },
  { label: 'Get Connected', href: '#apply' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleNavClick = (href) => {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => handleNavClick('#hero')}>
          <span className="navbar__logo">
            <img src={logoImage} alt="HanuBell logo" />
          </span>
          <span className="navbar__title">HanuBell</span>
        </Link>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              className="navbar__link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="navbar__cta">
          <Link to="/register" className="navbar__apply">
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          className="navbar__menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        {navLinks.map((link) => (
          <button
            type="button"
            key={link.label}
            className="navbar__drawer-link"
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </button>
        ))}
        <Link to="/register" className="navbar__drawer-apply" onClick={() => setOpen(false)}>
          Apply Now
        </Link>
      </div>
    </header>
  )
}

export default Navbar

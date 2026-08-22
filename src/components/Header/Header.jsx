import { useState } from 'react'
import SignupModal from '../SignupModal/SignupModal.jsx'
import './Header.css'

function Header() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('project-forecast-user'))
    } catch {
      return null
    }
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignup = (user) => {
    localStorage.setItem('project-forecast-user', JSON.stringify(user))
    setUser(user)
    setIsSignupOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="header">
        <div className="header__container">
        <img
          className="header__logo"
          src="/project-forecast/logo-header.png"
          alt="24/7 Forecast"
        />
        <button className="header__menu-toggle" type="button" onClick={() => setIsMenuOpen((value) => !value)} aria-expanded={isMenuOpen} aria-controls="main-navigation">
          Menu <span aria-hidden="true"></span>
        </button>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`} id="main-navigation">
          <a href="#who-we-are" className="header__nav-link" onClick={closeMenu}>Who we are</a>
          <a href="#contacts" className="header__nav-link" onClick={closeMenu}>Contacts</a>
          <a href="#menu" className="header__nav-link" onClick={closeMenu}>Menu</a>
        </nav>
          <div className="header__actions">
          {!user && <button className="header__signup" type="button" onClick={() => { setIsSignupOpen(true); closeMenu() }}>Sign Up</button>}
          {user?.username && <span className="header__username">{user.username}</span>}
          <button className="header__user" type="button" aria-label="User">
            <img
              className="header__avatar"
              src="/project-forecast/user.png"
              alt="User"
            />
          </button>
          </div>
        </div>
      </header>
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} onSignup={handleSignup} />}
    </>
  )
}

export default Header

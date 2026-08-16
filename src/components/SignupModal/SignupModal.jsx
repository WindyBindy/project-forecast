import { useEffect, useId, useState } from 'react'
import './SignupModal.css'

function SignupModal({ onClose, onSignup }) {
  const usernameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleChange = ({ target }) => {
    setFormData((current) => ({ ...current, [target.name]: target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSignup({
      username: formData.username.trim(),
      email: formData.email.trim(),
    })
  }

  return (
    <div className="signup-modal" role="presentation" onMouseDown={onClose}>
      <section
        className="signup-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="signup-modal__close" type="button" onClick={onClose} aria-label="Close sign up form">×</button>
        <h2 id="signup-title" className="signup-modal__title">Sign up</h2>
        <form className="signup-modal__form" onSubmit={handleSubmit}>
          <label className="signup-modal__label" htmlFor={usernameId}>Username</label>
          <input id={usernameId} className="signup-modal__input" name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} autoComplete="username" required />

          <label className="signup-modal__label" htmlFor={emailId}>E-Mail</label>
          <input id={emailId} className="signup-modal__input" name="email" type="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} autoComplete="email" required />

          <label className="signup-modal__label" htmlFor={passwordId}>Password</label>
          <input id={passwordId} className="signup-modal__input" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="new-password" minLength="6" required />

          <button className="signup-modal__submit" type="submit">Sign up</button>
        </form>
        <p className="signup-modal__login">Already have an account? <button type="button" onClick={onClose}>Log In</button></p>
      </section>
    </div>
  )
}

export default SignupModal

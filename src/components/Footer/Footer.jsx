import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <img className="footer__logo" src="/project-forecast/logo-header.png" alt="24/7 Forecast" />
        <address className="footer__address">
          <strong>Address</strong>
          <span>Svobody str. 35<br />Kyiv<br />Ukraine</span>
        </address>
        <div className="footer__contact">
          <strong>Contact us</strong>
          <div className="footer__socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src="/project-forecast/instagram.png" alt="" /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><img src="/project-forecast/facebook.png" alt="" /></a>
            <a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer" aria-label="WhatsApp"><img src="/project-forecast/whatsapp.png" alt="" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

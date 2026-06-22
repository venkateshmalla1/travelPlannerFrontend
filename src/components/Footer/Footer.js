import { FaWhatsapp, FaLinkedin, FaInstagram, FaPhone } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="text-center p-3">
        <p className="footer-text">&copy; 2026 Malla Venkatesh. All rights reserved.</p>
        <div className="footer-icons">
          <a
            href="https://wa.me/917411064722"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/venkatesh-malla"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/divakarpaul3/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <FaInstagram />
          </a>
          <a href="tel:+917411064722" className="footer-icon">
            <FaPhone />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

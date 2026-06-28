import './Footer.css';
import facebookIcon from '../../assets/icons/facebook.png';
import instagramIcon from '../../assets/icons/instagram.png';
import pinterestIcon from '../../assets/icons/pinterest.png';
import youtubeIcon from '../../assets/icons/youtube.png';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Paw Store. Todos los derechos reservados.</p>

      {/* social media icons */}
      <div className="social-media-links">
        <a
          id="facebook-link"
          href="https://www.facebook.com/pawstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebookIcon} alt="Facebook" className="icon-media" />
        </a>
        <a
          id="instagram-link"
          href="https://www.instagram.com/pawstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagramIcon} alt="Instagram" className="icon-media" />
        </a>
        <a
          id="pinterest-link"
          href="https://www.pinterest.com/pawstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={pinterestIcon} alt="Pinterest" className="icon-media" />
        </a>
        <a
          id="youtube-link"
          href="https://www.youtube.com/pawstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeIcon} alt="YouTube" className="icon-media" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

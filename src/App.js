import './App.css';
import PricingSection11 from './components/PricingSection11';

function App() {
  return (
    <div className="services-page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo-link" href="/" aria-label="Uncover Magazine Home">
            <span className="logo-mark">UN</span>
            <span className="logo-text">COVER</span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="https://www.uncovermagazines.com/">Home</a>
            <a href="https://www.uncovermagazines.com/submission">Submission</a>
            <a href="https://www.uncovermagazines.com/mag-store">Store</a>
            <a href="https://www.uncovermagazines.com/blog">Blog</a>
            <a href="https://www.uncovermagazines.com/become-an-affiliate">Become An Affiliate</a>
          </nav>
        </div>
      </header>

      <main className="services-main">
        <section className="services-intro container" aria-labelledby="services-title">
          <h1 id="services-title">Services</h1>
        </section>
        <PricingSection11 />
      </main>

      <footer className="site-footer">
        <div className="container">
          <h2>Uncover Magazine</h2>
          <div className="footer-divider" />
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Contact</h3>
              <p>
                Phone: <a href="tel:+447412806594">+44 7412 806594</a>
              </p>
              <p>
                Email: <a href="mailto:submit@uncovermagazines.com">submit@uncovermagazines.com</a>
              </p>
              <p>
                Address:
                <br />
                30n Gould St, Ste R, Sheridan,
                <br />
                WY 82801, USA
              </p>
            </div>
            <div className="footer-column footer-connect">
              <h3>Connect</h3>
              <div className="social-links" aria-label="Social links">
                <a href="https://www.facebook.com/uncovermagazines" target="_blank" rel="noreferrer" aria-label="Facebook">
                  fb
                </a>
                <a href="https://www.instagram.com/uncovermagazines" target="_blank" rel="noreferrer" aria-label="Instagram">
                  ig
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

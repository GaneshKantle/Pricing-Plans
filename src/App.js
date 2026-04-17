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
            <a href="/">Home</a>
            <a href="/submission">Submission</a>
            <a href="/store">Store</a>
            <a href="/blog">Blog</a>
            <a href="/become-an-affiliate">Become An Affiliate</a>
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
              <p>Phone: +44 7412 806594</p>
              <p>Email: submit@uncovermagazines.com</p>
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
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  f
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
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

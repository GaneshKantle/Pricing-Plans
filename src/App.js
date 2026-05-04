
import { useEffect, useState } from "react";
import "./App.css";
import PricingSection11 from "./components/PricingSection11";

const validPages = ["home", "about", "contact"];
const CONTACT_EMAIL = "Business@theglammodel.com";
const CONTACT_FORMSPREE_ENDPOINT = "https://formspree.io/f/xeevadbw";
const CUSTOMER_CARE_SUBJECT = "[WI Thinkers Customer Care] Website Contact Request";
const CUSTOMER_CARE_TAG = "WI-CARE-WEBSITE";
const DIRECT_GMAIL_TAG = "WI-CARE-DIRECT";

// const homeHighlights = [
//   {
//     title: "Editorial presence",
//     copy: "Position your brand, profile, or campaign with a refined, magazine-level presentation.",
//   },
//   {
//     title: "Effortless flow",
//     copy: "A clear structure that helps visitors understand the offering and move forward without friction.",
//   },
//   {
//     title: "Designed to evolve",
//     copy: "Begin with the essentials and expand into stronger visibility, sharper positioning, and deeper support.",
//   },
// ];

const aboutPoints = [
  {
    title: "Adaptive by design",
    copy: "Built to support creators, brands, professionals, and campaign-driven projects with equal clarity.",
  },
  {
    title: "Refined brand experience",
    copy: "Every element is shaped to present WI Thinkers with precision, consistency, and intent.",
  },
  {
    title: "Clarity over clutter",
    copy: "A minimal structure that keeps the message focused and the next steps easy to follow.",
  },
];

function getRouteState() {
  if (typeof window === "undefined") {
    return { page: "home", section: "" };
  }

  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  const section = params.get("section") || "";

  return {
    page: validPages.includes(page) ? page : "home",
    section,
  };
}

function buildUrl(page, section = "") {
  if (typeof window === "undefined") {
    return "/";
  }

  const params = new URLSearchParams();

  if (page !== "home") {
    params.set("page", page);
  }

  if (section) {
    params.set("section", section);
  }

  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}`;
}

function getContactErrorMessage(result) {
  if (!result || !Array.isArray(result.errors) || result.errors.length === 0) {
    return "We could not send your message right now. Please try again.";
  }

  return result.errors.map((item) => item.message).join(" ");
}

function buildGmailComposeUrl({ name = "", email = "", content = "" } = {}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: "[WI Thinkers Customer Care] Direct Gmail Inquiry",
    body: [
      `Customer care tag: ${DIRECT_GMAIL_TAG}`,
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Message:",
      content || "",
    ].join("\n"),
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

function NavItem({ currentPage, label, page, onNavigate }) {
  const isActive = currentPage === page;

  return (
    <a
      className={`nav-link ${isActive ? "nav-link-active" : ""}`.trim()}
      href={buildUrl(page)}
      onClick={onNavigate(page)}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </a>
  );
}

function FooterItem({ label, page, onNavigate }) {
  return (
    <a className="footer-link" href={buildUrl(page)} onClick={onNavigate(page)}>
      {label}
    </a>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section
        className="page-section"
        id="plans"
        aria-labelledby="plans-title"
      >
        {/* <div className="section-intro">
          <p className="eyebrow">Plans</p>
          <h2 className="section-title" id="plans-title">
            Choose the service level that fits now
          </h2>
          <p className="section-copy">
            The pricing section stays on the home page so visitors can move from
            overview to action without extra steps.
          </p>
        </div> */}

        <div className="pricing-wrap">
          <PricingSection11 />
        </div>
      </section>
    </>
  );
}

function AboutPage({ onNavigate }) {
  return (
    <section className="page-card page-panel">
      <p className="eyebrow">About</p>
      <h1 className="page-title">About WI Thinkers Magazine Services</h1>
      <p className="page-copy">
        We don’t just publish magazines. We build presence.
      </p>
      <div className="copy-stack">
        <p>
          This platform was created for those who understand that visibility
          isn’t accidental — it’s crafted. Every feature, every cover, every
          story is a deliberate composition of identity, aesthetic, and intent.
        </p>
        <p>
        Rooted in fashion, beauty, and visual culture, our work goes beyond surface-level content. We curate narratives that capture individuality while aligning with a global standard of editorial excellence. From emerging talent to established faces, each inclusion is selected with purpose — not volume.
        </p>
        <p>
        Our ecosystem is designed to bridge talent with exposure. Through curated submissions, editorial placements, and digital amplification, we position creators where they are not just seen, but remembered.
        </p>
        <p>
        For contributors, this is more than a feature — it’s positioning.
        </p>
        <p>
        For readers, it’s a window into what defines relevance today and what shapes it tomorrow.        </p>
        <p>
        We don’t follow trends.
        <br/>
        We refine them, frame them, and publish them.</p>
      </div>
   
      <div className="mini-grid">
        {aboutPoints.map((item) => (
          <article className="mini-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
      <div className="page-actions">
        <a
          className="button button-primary"
          href={buildUrl("home", "plans")}
          onClick={onNavigate("home", "plans")}
        >
          View Plans
        </a>
        <a
          className="button button-secondary"
          href={buildUrl("contact")}
          onClick={onNavigate("contact")}
        >
          Contact Page
        </a>
      </div>
    </section>
  );
}

function ContactPage({ onNavigate }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [submitState, setSubmitState] = useState({
    submitting: false,
    error: "",
    success: "",
  });

  const gmailComposeUrl = buildGmailComposeUrl(formValues);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitState({
      submitting: true,
      error: "",
      success: "",
    });

    const payload = new FormData();
    payload.append("_subject", CUSTOMER_CARE_SUBJECT);
    payload.append("customer_care_tag", CUSTOMER_CARE_TAG);
    payload.append("message_type", "Customer Care Inquiry");
    payload.append("destination_email", CONTACT_EMAIL);
    payload.append("source_page", "WI Thinkers Contact Page");
    payload.append("name", formValues.name.trim());
    payload.append("email", formValues.email.trim());
    payload.append("message", formValues.content.trim());

    try {
      const response = await fetch(CONTACT_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitState({
          submitting: false,
          error: getContactErrorMessage(result),
          success: "",
        });
        return;
      }

      setSubmitState({
        submitting: false,
        error: "",
        success: `Your message was sent with the fixed customer care tag ${CUSTOMER_CARE_TAG}.`,
      });
      setFormValues({
        name: "",
        email: "",
        content: "",
      });
    } catch {
      setSubmitState({
        submitting: false,
        error: "Network error. Please try again.",
        success: "",
      });
    }
  };

  return (
    <section className="page-card page-panel">
      <p className="eyebrow">Contact</p>
      <h1 className="page-title">Customer care and direct email</h1>
      <p className="page-copy">
        Click here to email us directly in Gmail at{" "}
        <a
          className="inline-email-link"
          href={gmailComposeUrl}
          target="_blank"
          rel="noreferrer"
        >
          {CONTACT_EMAIL}
        </a>
        , or use the website form below to send a customer care request.
      </p>

      <div className="copy-stack">
        <p>
          This space is designed to keep things focused. Instead of
          overwhelming you with options, we guide you toward the next step
          that actually matters.
        </p>
        <p>
          When reaching out, include your objective, audience, timeline, and
          any creative direction you already have in mind. The clearer the
          input, the sharper and more aligned the outcome.
        </p>
      </div>

      <div className="contact-layout contact-layout-single">
        <div className="contact-panel">
          <h2>Send through the website</h2>
          <p>
            Enter your name, email, and message. This form automatically adds
            a locked customer care subject line and tag so it stands out from
            regular inbox noise.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <label className="form-field">
                <span className="form-label">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleFieldChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="form-field">
                <span className="form-label">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleFieldChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="form-field form-field-full">
                <span className="form-label">Message</span>
                <textarea
                  name="content"
                  value={formValues.content}
                  onChange={handleFieldChange}
                  placeholder="Write your message here."
                  required
                />
              </label>
            </div>

            {/* <div className="contact-fixed-note">
              Fixed email subject: <strong>{CUSTOMER_CARE_SUBJECT}</strong>
            </div>
            <div className="contact-fixed-note">
              Fixed customer care tag: <strong>{CUSTOMER_CARE_TAG}</strong>
            </div> */}

            {submitState.error && (
              <div className="contact-status contact-status-error">
                {submitState.error}
              </div>
            )}

            {submitState.success && (
              <div className="contact-status contact-status-success">
                {submitState.success}
              </div>
            )}

            <div className="contact-form-actions">
              <button
                className="button button-primary"
                type="submit"
                disabled={submitState.submitting}
              >
                {submitState.submitting ? "Sending..." : "Send Message"}
              </button>
              <a
                className="button button-secondary"
                href={buildUrl("home", "plans")}
                onClick={onNavigate("home", "plans")}
              >
                View Plans
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [{ page, section }, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const syncRoute = () => {
      setRouteState(getRouteState());
    };

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    if (page === "home" && section) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(section);

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (!/jsdom/i.test(window.navigator.userAgent)) {
      window.scrollTo(0, 0);
    }

    return undefined;
  }, [page, section]);

  const navigateTo =
    (nextPage, nextSection = "") =>
    (event) => {
      event.preventDefault();

      const nextState = {
        page: nextPage,
        section: nextSection,
      };

      window.history.pushState(nextState, "", buildUrl(nextPage, nextSection));
      setRouteState(nextState);
    };

  let pageContent = <HomePage onNavigate={navigateTo} />;

  if (page === "about") {
    pageContent = <AboutPage onNavigate={navigateTo} />;
  }

  if (page === "contact") {
    pageContent = <ContactPage onNavigate={navigateTo} />;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand-link"
            href={buildUrl("home")}
            onClick={navigateTo("home")}
          >
            <span className="brand-kicker">WI Thinkers</span>
            <span className="brand-title">Magazine Services</span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <NavItem
              currentPage={page}
              label="Home"
              page="home"
              onNavigate={navigateTo}
            />
            <NavItem
              currentPage={page}
              label="About"
              page="about"
              onNavigate={navigateTo}
            />
            <NavItem
              currentPage={page}
              label="Contact"
              page="contact"
              onNavigate={navigateTo}
            />
          </nav>

          <a
            className="header-cta"
            href={buildUrl("home", "plans")}
            onClick={navigateTo("home", "plans")}
          >
            View Plans
          </a>
        </div>
      </header>

      <main className="site-main">
        <div className="container">{pageContent}</div>
      </main>

      <footer className="site-footer">
        <div className="footer-card">
          <div className="footer-inner">
            <div className="footer-copy">
              <p className="eyebrow">WI Thinkers</p>
              <p className="footer-title">Magazine Services by WI Thinkers</p>
              <p className="footer-text">
                A cleaner and more minimal service experience for
                editorial-style promotion, positioning, and brand presentation.
              </p>
            </div>

            <div className="footer-links">
              <FooterItem label="Home" page="home" onNavigate={navigateTo} />
              <FooterItem label="About" page="about" onNavigate={navigateTo} />
              <FooterItem
                label="Contact"
                page="contact"
                onNavigate={navigateTo}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

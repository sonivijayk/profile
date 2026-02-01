import "../App.css";
import { Link } from "react-router-dom";

export default function Home() {
    console.log("RENDER: Home");
  return (
    <div className="page">
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <header className="nav">
        <div className="brand">
          <span>Vijay Soni</span>
        </div>

        <nav className="nav-links">
          {/* Home anchors */}
          <a href="#about">About</a>
          <a href="#connect">Connect</a>
          <a href="#blogs">Blogs</a>

        </nav>
      </header>

      <main>
        <section className="profile" id="about">
          <div className="profile-card">
            <div className="profile-body">
              <p className="eyebrow">About</p>
              <h1>Vijay Kumar Soni</h1>
              <p className="headline">
                Technologist, Mentor &amp; Speaker : Digital Wallet, e-commerce,
                Tokenization &amp; Core Payments | Network Authorizations |
                Digital Identity | Open Banking | Hybrid Cloud | AWS |
                Kubernetes | API platform | EMV | Cryptography
              </p>
              <p className="lead">
                I help organizations build secure, scalable payment and identity
                platforms through clear strategy and hands-on delivery.
              </p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href="https://www.linkedin.com/in/vijayksoni1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open LinkedIn
                </a>
                <a className="btn btn-ghost" href="#connect">
                  Connect
                </a>
              </div>
            </div>
            <div className="profile-photo" aria-label="Vijay Soni photo">
              <span>VS</span>
            </div>
          </div>
        </section>

        <section className="section card" id="summary">
          <div className="section-header">
            <h2>Summary</h2>
          </div>
          <div className="stack">
            <p>
              Distinguished technologist focused on understanding business
              objectives and delivering solutions that prove value through
              results and execution.
            </p>
            <p>
              Domain expertise in payment network authorization platforms,
              digital wallets, open banking/finance, and cryptographic security
              across large financial institutions.
            </p>
            <p>
              Enterprise architecture across AWS, Kubernetes, API platforms,
              EMV/EMVCo standards, tokenization, and secure identity flows.
            </p>
          </div>
        </section>

        <section className="section card" id="connect">
          <div className="section-header">
            <h2>Connect</h2>
          </div>
          <p className="lead">For the full story, head to LinkedIn.</p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="https://www.linkedin.com/in/vijayksoni1/"
              target="_blank"
              rel="noreferrer"
            >
              Open LinkedIn
            </a>
          </div>
        </section>

        <section className="section card" id="blogs">
          <div className="section-header">
            <h2>Blogs</h2>
          </div>

          {/* Replace "Coming soon" with a real card */}
          <div className="stack">
            <p className="lead">Latest</p>

            <Link to="/blog/ai-driven-api-design" style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                }}
              >
                <h3 style={{ margin: "0 0 6px" }}>
                  AI-Driven API Design: Principles and Governance
                </h3>
                <p style={{ margin: 0, opacity: 0.85 }}>
                  How to use AI to accelerate API design without losing determinism,
                  backward compatibility, and trust.
                </p>
              </div>
            </Link>

          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Vijay Soni</p>
        <p>All content reflects my personal views, not those of any current or past employer.</p>
      </footer>
    </div>
  );
}

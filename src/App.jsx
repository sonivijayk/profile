import './App.css'

function App() {
  return (
    <div className="page">
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />

      <header className="nav">
        <nav className="nav-links">
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
          <p className="lead">
            For the full story, head to LinkedIn.
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
          </div>
        </section>
        <section className="section card" id="blogs">
          <div className="section-header">
            <h2>Blogs</h2>
          </div>
          <p className="lead">Coming soon.</p>
        </section>
      </main>

      <footer className="footer">
        <p>sonivijay.com</p>
      </footer>
    </div>
  )
}

export default App

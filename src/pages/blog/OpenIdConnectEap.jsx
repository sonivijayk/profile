import "../../App.css";
import { Link } from "react-router-dom";

export default function OpenIdConnectEap() {
  return (
    <div className="page" style={styles.page}>
      <div className="glow glow-a" aria-hidden="true" />
      <div className="glow glow-b" aria-hidden="true" />
      <header className="nav">
        <div className="brand">
          <span>Vijay Soni</span>
        </div>
        <nav className="nav-links">
          <a href="/#about">About</a>
          <a href="/#connect">Connect</a>
          <a href="/#blogs">Blogs</a>
        </nav>
      </header>

      <article style={styles.article}>
        <p style={styles.kicker}>Blog</p>
        <h1 style={styles.h1}>
          OpenID Connect Extended Authentication Profile (EAP): A Technical Guide for Phishing-Resistant
          Authentication
        </h1>
        <p style={styles.meta}>January 31, 2026 · Identity · Security · OpenID Connect</p>

        <h2 style={styles.h2}>Background</h2>
        <p style={styles.p}>
          Have you ever wondered why your bank, digital wallets or healthcare provider is asking you to enroll
          into passkey?
        </p>
        <p style={styles.p}>Let me explain it -</p>
        <p style={styles.p}>
          With the increasing prevalence of phishing attacks, organizations are enhancing user authentication
          methods in the risk based authentication processes. Over the last couple of years, OpenId Foundation
          OpenID published Connect Extended Authentication Profile aka. EAP standard and interoperable solution
          which allows Relying Parties to confidently request and validate phishing-resistant, hardware-backed
          authentication using industry adoped mehods like FIDO2/WebAuthn.
        </p>
        <p style={styles.p}>
          EAP profile in authentication workflows significantly elevates security and trust, especially in
          applications processing sensitive transaction e.g. account linking in healthcare, payment systems,
          and banking platforms.
        </p>
        <p style={styles.p}>In this article I will try to explain:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>What Is the EAP ACR Values 1.0?</li>
          <li style={styles.listItem}>Example Technical Implementation using FIDO/WebAuthn</li>
          <li style={styles.listItem}>Example EAP Application Use Cases</li>
          <li style={styles.listItem}>Security &amp; Privacy Considerations</li>
          <li style={styles.listItem}>EAP Profile Deployment Considerations</li>
        </ul>

        <h2 style={styles.h2}>1. What Is the EAP ACR Values 1.0?</h2>
        <p style={styles.p}>
          In Mar 2023, OpenId Foundation published OpenID Foundation Final Specification introduces two new
          standardized <code>acr</code> (Authentication Context Class Reference) values:
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ACR Value</th>
              <th style={styles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><code>phr</code></td>
              <td style={styles.td}>Phishing-Resistant Authentication</td>
            </tr>
            <tr>
              <td style={styles.td}><code>phrh</code></td>
              <td style={styles.td}>Phishing-Resistant + Hardware-Protected Credential</td>
            </tr>
          </tbody>
        </table>

        <p style={styles.p}>
          It also introduces one new <code>amr</code> (Authentication Method Reference) value:
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>AMR Value</th>
              <th style={styles.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><code>pop</code></td>
              <td style={styles.td}>Proof-of-Possession of a key</td>
            </tr>
          </tbody>
        </table>
        <p style={styles.p}>
          These values are used in OpenID Connect flows to negotiate or assert stronger authentication context
          between Relying Party and OpenId based Identity Provider. Fig 1 below describes high level interaction
          model between Relying Party (RP) and Identity Provider (IdP)
        </p>
        <Figure
          src="https://raw.githubusercontent.com/sonivijayk/authentication-and-security/main/authentication-and-security/images/open-id-eap-tech-impl/eap-rp-idp-interaction.png"
          alt="Relying party and identity provider interaction for EAP ACR values"
          caption="Authorization request interaction between RP and IdP"
        />

        <h2 style={styles.h2}>2. Example Technical Implementation using FIDO/WebAuthn</h2>
        <p style={styles.p}>
          Let&apos;s walk through a WebAuthn-backed OpenID Connect authentication scenario.
        </p>
        <p style={styles.p}>
          In this scenario (below) <code>/authorize</code> request tells the OpenID Provider (OP) to use a
          hardware-backed phishing-resistant method.
        </p>

        <h3 style={styles.h3}>Step 1: Relying Party Initiates Authentication Request</h3>
        <pre style={styles.pre}>
          <code>
{`GET https://idp.open-id-auth-server/oauth/v1/authorize?response_type=code&
client_id=test-client-id&
scope=openid profile email&
redirect_uri=https://mysecureapp.com/callback&
acr_values=phrh&
state=sx35ea2107fea12a&
nonce=set3wsxfe54s2233`}
          </code>
        </pre>

        <h3 style={styles.h3}>Step 2: Identity Provider Handles Authentication</h3>
        <p style={styles.p}>The OpenID Provider must:</p>
        <ol style={styles.list}>
          <li style={styles.listItem}>Map <code>acr_values=phrh</code> to a WebAuthn/FIDO2 ceremony</li>
          <li style={styles.listItem}>Prompt the user to authenticate using a registered FIDO2 credential</li>
          <li style={styles.listItem}>
            Ensure that Credential is resident and user-verified; and Authenticator is bound to hardware
          </li>
        </ol>
        <p style={styles.p}>Below is sample Java code for validation:</p>
        <pre style={styles.pre}>
          <code>
{`import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.openid.connect.sdk.AuthenticationRequest;
import com.nimbusds.openid.connect.sdk.claims.ACR;
import com.nimbusds.openid.connect.sdk.claims.ClaimsRequest;

import java.net.URI;
import java.util.List;

public class EAPV1Validator {

    public AuthenticationRequest generateAuthenticationRequest(
            URI authorizationEndpoint,
            ClientID clientID,
            URI redirectURI,
            List<String> registeredCredentialIds) {

        // Define the required ACR values
        ACR acrValue = new ACR("phrh");

        // Build user verification claims request object
        ClaimsRequest claimsRequest = new ClaimsRequest();
        claimsRequest.addIDTokenClaim("acr", acrValue);

        // Build the authentication request
        return new AuthenticationRequest.Builder(
                new com.nimbusds.oauth2.sdk.ResponseType("code"),
                new com.nimbusds.oauth2.sdk.Scope("openid", "profile", "email"),
                clientID,
                redirectURI)
            .endpointURI(authorizationEndpoint)
            .acrValues(List.of(acrValue)) // Specify the required ACR value
            .claims(claimsRequest) // Include claims for ACR validation
            .customParameter("allowCredentials", String.join(",", registeredCredentialIds)) // Pass registered credentials
            .customParameter("userVerification", "required") // Enforce user verification
            .build();
    }
}`}
          </code>
        </pre>

        <h3 style={styles.h3}>Step 3: Token Issuance with ACR/AMR Claims</h3>
        <p style={styles.p}>
          Here The Relying Party verifies that <code>acr = phrh</code> was met using idToken param acr, amr.
          See example idToken claims below
        </p>
        <pre style={styles.pre}>
          <code>
{`{
  "sub": "userId-of-user",
  "acr": "phrh",
  "amr": ["pop", "fido"],
  "auth_time": 1749358800,
  "iss": "https://idp.open-id-auth-server.com",
  "aud": "my-client",
  "exp": 1749445199,
  "iat": 1749358800,
  "state": "sx35ea2107fea12a",
  "nonce": "set3wsxfe54s2233",
  "name": "Test User",
  "email": "user@email.com",
  "email_verified": true
}`}
          </code>
        </pre>
        <p style={styles.p}>where:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}><strong>sub :</strong> Authenticated user&apos;s unique Id</li>
          <li style={styles.listItem}><strong>acr :</strong> Authentication Context Class Reference e.g. phrh</li>
          <li style={styles.listItem}><strong>amr :</strong> Authentication Method Reference e.g. fido</li>
          <li style={styles.listItem}><strong>auth_time :</strong> User authentication timestamp (Unix epoch format)</li>
          <li style={styles.listItem}>
            <strong>iss :</strong> idToken issuer or Identity Provider Id or host domain
          </li>
          <li style={styles.listItem}>
            <strong>aud :</strong> Token audience, client Id or host domain of Relying Party
          </li>
          <li style={styles.listItem}><strong>exp :</strong> Token expiration time in Unix epoch format</li>
          <li style={styles.listItem}><strong>iat :</strong> Token issuance time in Unix epoch format</li>
          <li style={styles.listItem}>
            <strong>state :</strong> Unique authentication session identifier, can be used to protect integrity
            of session
          </li>
          <li style={styles.listItem}>
            <strong>nonce :</strong> Random value to prevent replay attacks, same as supplied in the /authorize
            request
          </li>
          <li style={styles.listItem}><strong>name :</strong> User&apos;s full name as requested in scope</li>
          <li style={styles.listItem}><strong>email :</strong> User&apos;s email address as requested in scope</li>
          <li style={styles.listItem}>
            <strong>email_verified :</strong> Boolean indicator to confirm if the user&apos;s email address has been
            verified
          </li>
        </ul>

        <h2 style={styles.h2}>3. Example EAP Application Use Cases</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>Government Portals :</strong> Government enables EAP profile to allow citizen login
          </li>
          <li style={styles.listItem}>
            <strong>Healthcare Portals :</strong> Healthcare provider enable EAP profile to protect medical record access
          </li>
          <li style={styles.listItem}>
            <strong>Fintech Applications :</strong> Secure authentication of app user e.g. Open Banking Account Linking
          </li>
          <li style={styles.listItem}>
            <strong>e-Commerce :</strong> Cardholder Risk Based Authentication during e-commerce payment transaction
          </li>
        </ul>

        <h2 style={styles.h2}>4. Security &amp; Privacy Considerations</h2>
        <p style={styles.p}><strong>1. Phishing Resistance :</strong></p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            EAP enforces the use of phishing-resistant authentication methods e.g. FIDO2/WebAuthn methods rely
            on public key cryptography for integrity and trust.
          </li>
          <li style={styles.listItem}>
            Private key of the user never leaves the user&apos;s device, making it impossible for attackers to
            intercept or exploit it
          </li>
        </ul>
        <p style={styles.p}><strong>2. Replay Protection :</strong></p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            Authentication requests under EAP include unique, one-time challenges (nonces) that prevent replay
            attacks. Even if an attacker intercepts the authentication data, it cannot be reused because the
            challenge is valid only for a single session. In addition to nonce, I recommend using state value
            in the idToken to allow end to end unique session integrity
          </li>
          <li style={styles.listItem}>
            This ensures that authentication remains secure even in the presence of network-level threats.
          </li>
        </ul>
        <p style={styles.p}><strong>3. Device Binding :</strong></p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            EAP requires credentials to be bound to specific hardware devices e.g your mobile phone or laptop,
            ensuring that authentication can only occur on the registered device.
          </li>
          <li style={styles.listItem}>
            This hardware-backed binding leverages secure elements (e.g., TPMs, Secure Enclaves) on mobile
            devices and laptops to protect private keys, adding an additional layer of security.
          </li>
          <li style={styles.listItem}>
            Device binding also ensures that credentials cannot be exported or cloned to unauthorized devices.
          </li>
        </ul>
        <p style={styles.p}>
          These considerations make EAP a highly secure and privacy-preserving standard, suitable for sensitive
          applications such as banking, healthcare, and payment systems.
        </p>

        <h2 style={styles.h2}>5. EAP Profile Deployment Considerations</h2>
        <p style={styles.p}>
          When deploying the EAP based security, it is essential to follow these considerations to ensure a
          secure and seamless user experience:
        </p>
        <ol style={styles.list}>
          <li style={styles.listItem}>
            <strong>Validate <code>acr</code> in idToken</strong>:
            <ul style={styles.subList}>
              <li style={styles.subListItem}>
                <code>acr</code> value in the idToken must be validated to confirm that the authentication meets
                the required assurance level e.g. <code>phr</code> or <code>phrh</code>
              </li>
              <li style={styles.subListItem}>
                This ensures that the authentication performed by the Identity Provider (IdP) aligns with the
                security requirements of the Relying Party (RP)
              </li>
              <li style={styles.subListItem}>
                Failure to validate the <code>acr</code> value could result in weaker authentication being
                accepted, compromising security
              </li>
            </ul>
          </li>
          <li style={styles.listItem}>
            <strong>Ensure IdP Supports EAP</strong>:
            <ul style={styles.subList}>
              <li style={styles.subListItem}>
                Verify that the Identity Provider (IdP) supports the EAP standard and can handle requests with
                <code>acr_values</code> such as <code>phr</code> or <code>phrh</code>
              </li>
              <li style={styles.subListItem}>
                Identity Provider (IdP) must be capable of mapping these values to appropriate phishing-resistant
                and hardware-backed authentication methods, such as FIDO2/WebAuthn
              </li>
              <li style={styles.subListItem}>
                If the IdP does not support EAP, the authentication flow will not meet the desired security
                guarantees
              </li>
            </ul>
          </li>
          <li style={styles.listItem}>
            <strong>Register EAP-Specific Clients</strong>:
            <ul style={styles.subList}>
              <li style={styles.subListItem}>
                Relying Parties (RPs) must register clients specifically configured to use EAP with the IdP
              </li>
              <li style={styles.subListItem}>
                During client registration, ensure that the <code>acr_values</code> required for EAP are
                explicitly declared and supported
              </li>
              <li style={styles.subListItem}>
                This step ensures that the IdP enforces the correct authentication policies for the registered
                client
              </li>
            </ul>
          </li>
          <li style={styles.listItem}>
            <strong>Enable WebAuthn Discoverable Credentials</strong>:
            <ul style={styles.subList}>
              <li style={styles.subListItem}>
                WebAuthn discoverable credentials (also known as resident credentials) should be enabled to
                simplify the user experience and enhance security
              </li>
              <li style={styles.subListItem}>
                Discoverable credentials allow users to authenticate without needing to select a credential
                manually, as the authenticator can automatically identify the correct one
              </li>
              <li style={styles.subListItem}>
                This feature is particularly useful for multi-device scenarios and ensures that credentials
                remain bound to the user&apos;s hardware
              </li>
            </ul>
          </li>
        </ol>

        <h2 style={styles.h2}>Conclusion</h2>
        <p style={styles.p}>
          With a simple <code>acr_values=phrh</code>, RPs can enforce advanced security postures. Whether you&apos;re a
          financial app, government platform, or health system, adoption
        </p>

        <div style={styles.footerNav}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </article>

      <footer className="footer">
        <p>© 2026 Vijay Soni</p>
        <p>
          All content reflects my personal views, not those of any current or past employer.
        </p>
      </footer>
    </div>
  );
}

function Figure({ src, alt, caption }) {
  return (
    <figure style={styles.figure}>
      <img src={src} alt={alt} style={styles.img} loading="lazy" />
      {caption ? <figcaption style={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

const styles = {
  page: { minHeight: "100vh" },
  article: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "18px 16px 64px",
    lineHeight: 1.7,
  },
  kicker: { margin: "10px 0 8px", opacity: 0.7 },
  h1: { margin: "0 0 10px", fontSize: "2.1rem", lineHeight: 1.15 },
  meta: { margin: "0 0 18px", opacity: 0.75 },
  h2: { marginTop: 28, marginBottom: 10, fontSize: "1.35rem" },
  h3: { marginTop: 18, marginBottom: 8, fontSize: "1.08rem" },
  p: { margin: "0 0 12px" },
  list: { margin: "0 0 12px", paddingLeft: 18 },
  listItem: { marginBottom: 6 },
  subList: { margin: "8px 0 0", paddingLeft: 18 },
  subListItem: { marginBottom: 6 },
  pre: {
    margin: "12px 0 18px",
    padding: "14px 16px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.05)",
    overflowX: "auto",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "8px 0 18px",
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    borderBottom: "1px solid rgba(0,0,0,0.15)",
    background: "rgba(0,0,0,0.04)",
    fontWeight: 600,
  },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    verticalAlign: "top",
  },
  figure: { margin: "16px 0 22px" },
  img: {
    width: "100%",
    maxWidth: 880,
    margin: "0 auto",
    display: "block",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.10)",
  },
  caption: { marginTop: 8, fontSize: "0.95rem", opacity: 0.8, textAlign: "center" },
  footerNav: { marginTop: 28 },
  backLink: { textDecoration: "none", opacity: 0.9 },
};

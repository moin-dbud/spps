import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import "./Footer.css";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/academics", key: "academics" as const },
  { href: "/facilities", key: "facilities" as const },
  { href: "/activities", key: "activities" as const },
  { href: "/news", key: "news" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Footer() {
  const { t, lang } = useI18n();
  const { settings } = useSchoolSettings();
  const year = new Date().getFullYear();

  const schoolName =
    lang === "en"
      ? settings.name.english
      : lang === "hi"
        ? settings.name.hindi
        : settings.name.marathi;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__top">
        <div className="container">
          <div className="site-footer__grid">
            {/* School info */}
            <div className="site-footer__col site-footer__col--brand">
              <div className="site-footer__logo">
                <img
                  src="/assets/images/savitribai-logo.jpg"
                  alt="Krantijyoti Savitribai Phule"
                  className="site-footer__logo-img"
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", marginRight: 10, border: "2px solid rgba(255, 255, 255, 0.2)" }}
                />
                <div>
                  <p className="site-footer__school-name">{schoolName}</p>
                  <p className="site-footer__school-mgmt">{settings.management}</p>
                </div>
              </div>
              <p className="site-footer__tagline">
                {lang === "en"
                  ? "Empowering students with quality education, modern facilities, and holistic development in Babupeth, Chandrapur."
                  : lang === "hi"
                    ? "बाबूपेठ, चंद्रपुर में गुणवत्तापूर्ण शिक्षा और सर्वांगीण विकास।"
                    : "बाबूपेठ, चंद्रपूर येथे दर्जेदार शिक्षण व सर्वांगीण विकास."}
              </p>

              {/* Social links */}
              <div className="site-footer__social" aria-label="Social media">
                {settings.social.facebook ? (
                  <a
                    href={settings.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                ) : null}
                {settings.social.youtube ? (
                  <a
                    href={settings.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={18} />
                  </a>
                ) : null}
                {settings.social.instagram ? (
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </a>
                ) : null}
              </div>
            </div>

            {/* Quick links */}
            <div className="site-footer__col">
              <h3 className="site-footer__heading">{t.footer.quickLinks}</h3>
              <ul className="site-footer__links" role="list">
                {NAV_LINKS.map(({ href, key }) => (
                  <li key={href}>
                    <Link to={href} className="site-footer__link">
                      {t.nav[key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="site-footer__col">
              <h3 className="site-footer__heading">
                {lang === "en" ? "Contact" : lang === "hi" ? "संपर्क" : "संपर्क"}
              </h3>
              <address className="site-footer__contact">
                <div className="site-footer__contact-item">
                  <MapPin size={16} aria-hidden className="site-footer__contact-icon" />
                  <span>{settings.address.fullAddress}</span>
                </div>
                {settings.contact.phone && (
                  <div className="site-footer__contact-item">
                    <Phone size={16} aria-hidden className="site-footer__contact-icon" />
                    <a href={`tel:${settings.contact.phone.replace(/\s+/g, '')}`} className="site-footer__link">
                      {settings.contact.phone}
                    </a>
                  </div>
                )}
                {settings.contact.whatsapp && (
                  <div className="site-footer__contact-item">
                    <MessageSquare size={16} aria-hidden className="site-footer__contact-icon" />
                    <a
                      href={`https://wa.me/${settings.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-footer__link"
                    >
                      WhatsApp: {settings.contact.whatsapp}
                    </a>
                  </div>
                )}
                {settings.contact.email && (
                  <div className="site-footer__contact-item">
                    <Mail size={16} aria-hidden className="site-footer__contact-icon" />
                    <a href={`mailto:${settings.contact.email}`} className="site-footer__link">
                      {settings.contact.email}
                    </a>
                  </div>
                )}
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container">
          <div className="site-footer__bottom-inner">
            <p className="site-footer__copyright">
              &copy; {year} {settings.name.short}. {t.footer.rights}.
            </p>
            <p className="site-footer__privacy">
              {t.footer.privacyNotice}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu, X, Globe, ChevronDown, Phone,
} from "lucide-react";
import { useI18n, LANG_LABELS, type Language } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import "./Header.css";

/* ── Main nav links (visible directly) ── */
const MAIN_NAV = [
  { href: "/",           key: "home"       as const },
  { href: "/about",      key: "about"      as const },
  { href: "/academics",  key: "academics"  as const },
  { href: "/facilities", key: "facilities" as const },
  { href: "/activities", key: "activities" as const },
];

/* ── "More" dropdown links ── */
const MORE_NAV = [
  { href: "/teaching-staff", key: "teachingStaff" as const },
  { href: "/contribution",   key: "contribution"  as const },
  { href: "/news",           key: "news"          as const },
  { href: "/gallery",        key: "gallery"       as const },
];

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { settings } = useSchoolSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  /* ── Scroll shadow ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── Close lang dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Close "More" dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Body scroll lock when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Close mobile menu on ESC ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLangSelect = (l: Language) => {
    setLang(l);
    setLangOpen(false);
  };

  /* Always show the short English name in the header for clarity */
  const shortName = settings.name.short || settings.name.english;

  /* Check whether any "More" child is currently active */
  const moreChildActive = MORE_NAV.some(({ href }) =>
    window.location.pathname.startsWith(href)
  );

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`} role="banner">
      <div className="site-header__inner container">

        {/* ── Brand (logo + short name only) ── */}
        <Link to="/" className="site-header__brand" aria-label="Go to homepage">
          <img
            src="/assets/images/savitribai-logo.jpg"
            alt="Krantijyoti Savitribai Phule"
            className="site-header__logo-img"
          />
          <div className="site-header__name">
            <span className="site-header__name-main">{shortName}</span>
            <span className="site-header__name-sub">
              {lang === "mr"
                ? "चंद्रपूर महानगरपालिका"
                : lang === "hi"
                  ? "चंद्रपुर नगर निगम"
                  : "Municipal Corporation, Chandrapur"}
            </span>
          </div>
        </Link>

        {/* ── Desktop nav (centered via CSS grid) ── */}
        <nav className="site-header__nav" aria-label="Main navigation">
          <ul className="site-header__nav-list" role="list">
            {MAIN_NAV.map(({ href, key }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `site-header__nav-link${isActive ? " active" : ""}`
                  }
                  end={href === "/"}
                >
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}

            {/* ── "More" dropdown ── */}
            <li className="nav-more" ref={moreRef}>
              <button
                className={`site-header__nav-link nav-more__btn${moreChildActive ? " active" : ""}`}
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                {lang === "mr" ? "आणखी" : lang === "hi" ? "अधिक" : "More"}
                <ChevronDown size={14} className={moreOpen ? "rotated" : ""} aria-hidden />
              </button>
              {moreOpen && (
                <ul className="nav-more__menu" role="menu">
                  {MORE_NAV.map(({ href, key }) => (
                    <li key={href} role="none">
                      <NavLink
                        to={href}
                        className={({ isActive }) =>
                          `nav-more__item${isActive ? " active" : ""}`
                        }
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                      >
                        {t.nav[key]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* ── Enquiry (last visible link) ── */}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `site-header__nav-link${isActive ? " active" : ""}`
                }
              >
                {t.nav.contact}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ── Right actions ── */}
        <div className="site-header__actions">
          {/* Language selector */}
          <div className="lang-selector" ref={langRef}>
            <button
              className="lang-selector__btn"
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <Globe size={16} aria-hidden />
              <span>{LANG_LABELS[lang]}</span>
              <ChevronDown size={14} className={langOpen ? "rotated" : ""} aria-hidden />
            </button>
            {langOpen && (
              <ul className="lang-selector__dropdown" role="listbox" aria-label="Language options">
                {(Object.entries(LANG_LABELS) as [Language, string][]).map(([code, label]) => (
                  <li key={code} role="option" aria-selected={lang === code}>
                    <button
                      onClick={() => handleLangSelect(code)}
                      className={lang === code ? "active" : ""}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA button (visible on all screens including mobile) */}
          <button
            className="btn btn-primary btn--sm site-header__cta-btn no-print"
            onClick={() => navigate("/contact")}
          >
            <Phone size={14} aria-hidden />
            <span>{t.nav.enquire}</span>
          </button>

          {/* Hamburger */}
          <button
            className="site-header__hamburger no-print"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Language switcher */}
          <div className="mobile-drawer__section-label">
            <Globe size={14} />
            <span>Select Language / भाषा निवडा:</span>
          </div>
          <div className="mobile-drawer__lang">
            {(Object.entries(LANG_LABELS) as [Language, string][]).map(([code, label]) => (
              <button
                key={code}
                onClick={() => { handleLangSelect(code); setMenuOpen(false); }}
                className={`mobile-lang-btn${lang === code ? " active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <nav aria-label="Mobile navigation">
            <ul role="list" className="mobile-nav-list">
              {[...MAIN_NAV, ...MORE_NAV, { href: "/contact", key: "contact" as const }].map(({ href, key }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `mobile-nav-link${isActive ? " active" : ""}`
                    }
                    end={href === "/"}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{t.nav[key]}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer__cta">
            <button
              className="btn btn-primary btn--lg"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => { navigate("/contact"); setMenuOpen(false); }}
            >
              <Phone size={18} />
              <span>{t.nav.enquire}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="overlay no-print"
          onClick={() => setMenuOpen(false)}
          style={{ zIndex: 149 }}
        />
      )}
    </header>
  );
}

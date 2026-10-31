import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wrench, Phone, Mail, MapPin, Lock, LayoutDashboard, Power } from "lucide-react";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { useI18n, type Language } from "../i18n";
import "./MaintenanceScreen.css";

export function MaintenanceScreen() {
  const { settings, updateSettings } = useSchoolSettings();
  const { lang, setLang } = useI18n();
  const navigate = useNavigate();

  // Check if current user is logged in as an administrator
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return Boolean(
        localStorage.getItem("spps_admin_auth") === "true" ||
        localStorage.getItem("spps_admin_token")
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      setIsAdmin(
        Boolean(
          localStorage.getItem("spps_admin_auth") === "true" ||
          localStorage.getItem("spps_admin_token")
        )
      );
    } catch {}
  }, []);

  const handleTurnOffMaintenance = async () => {
    if (
      window.confirm(
        "Turn OFF Website Maintenance Mode now?\n\nThe website will immediately go live to all public visitors."
      )
    ) {
      await updateSettings({ maintenanceMode: false });
    }
  };

  // Localized school name
  const schoolName =
    lang === "en"
      ? settings.name.english
      : lang === "hi"
      ? settings.name.hindi
      : settings.name.marathi;

  // Localized maintenance message
  const customMessage =
    lang === "en"
      ? settings.maintenanceMessage?.english
      : lang === "hi"
      ? settings.maintenanceMessage?.hindi
      : settings.maintenanceMessage?.marathi;

  const defaultMessage =
    lang === "en"
      ? "Our school website is currently undergoing scheduled maintenance to improve our digital services. Please check back shortly."
      : lang === "hi"
      ? "विद्यालय की वेबसाइट वर्तमान में निर्धारित रखरखाव के अधीन है। डिजिटल सेवाओं को बेहतर बनाने का कार्य जारी है। कृपया कुछ समय बाद पुनः प्रयास करें।"
      : "शाळेची वेबसाईट सध्या नियोजित देखभालीखाली (मेंटेनन्स) आहे. नवीन अद्यतनांसह आम्ही लवकरच पूर्ववत उपलब्ध होऊ. गैरसोयीबद्दल क्षमस्व.";

  const messageText = customMessage?.trim() || defaultMessage;

  const titleText =
    lang === "en"
      ? "Scheduled Maintenance in Progress"
      : lang === "hi"
      ? "वेबसाइट पर रखरखाव कार्य जारी है"
      : "संकेतस्थळ नियोजित देखभालीखाली आहे";

  const badgeText =
    lang === "en"
      ? "System Maintenance"
      : lang === "hi"
      ? "सिस्टम रखरखाव"
      : "प्रणाली देखभाल";

  const contactHeading =
    lang === "en"
      ? "Need urgent assistance?"
      : lang === "hi"
      ? "तत्काल सहायता की आवश्यकता है?"
      : "तातडीच्या संपर्कासाठी";

  return (
    <div className="maintenance-wrapper">
      {/* ─── STICKY ADMIN CONTROL BANNER (Visible only to authenticated admins) ─── */}
      {isAdmin && (
        <div className="maintenance-admin-banner" role="alert">
          <div className="maintenance-admin-banner__content">
            <Wrench size={18} />
            <span>
              <strong>MAINTENANCE MODE IS ACTIVE:</strong> Public visitors only see this screen. You are previewing as an Administrator.
            </span>
          </div>
          <div className="maintenance-admin-banner__actions">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="maintenance-admin-banner__btn"
            >
              <LayoutDashboard size={14} />
              <span>Admin Dashboard</span>
            </button>
            <button
              type="button"
              onClick={handleTurnOffMaintenance}
              className="maintenance-admin-banner__btn maintenance-admin-banner__btn--danger"
            >
              <Power size={14} />
              <span>Turn OFF Maintenance</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Bar with School Crest & Language Selector */}
      <header className="maintenance-topbar">
        <div className="maintenance-brand">
          <img
            src="/assets/images/savitribai-logo.jpg"
            alt="School Crest"
            className="maintenance-logo"
          />
          <div className="maintenance-brand__text">
            <span className="maintenance-brand__title">{schoolName || settings.name.short}</span>
            <span className="maintenance-brand__sub">{settings.management}</span>
          </div>
        </div>

        {/* Quick Language Toggle */}
        <div className="maintenance-lang-toggle" role="group" aria-label="Language selector">
          {(["mr", "hi", "en"] as Language[]).map((code) => (
            <button
              key={code}
              type="button"
              className={`maintenance-lang-btn ${lang === code ? "active" : ""}`}
              onClick={() => setLang(code)}
            >
              {code === "mr" ? "मराठी" : code === "hi" ? "हिंदी" : "EN"}
            </button>
          ))}
        </div>
      </header>

      {/* Main Announcement Card */}
      <main className="maintenance-main">
        <div className="maintenance-card">
          <div className="maintenance-icon-badge" aria-hidden="true">
            <Wrench size={34} />
          </div>

          <div className="maintenance-pill">
            <span className="maintenance-pill__dot" />
            <span>{badgeText}</span>
          </div>

          <h1 className="maintenance-title">{titleText}</h1>
          <p className="maintenance-message">{messageText}</p>

          {/* Institutional Contact Strip for Urgent Enquiries */}
          <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--clr-charcoal-500)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px", textAlign: "left" }}>
            {contactHeading}
          </div>
          <div className="maintenance-contacts">
            <div className="maintenance-contact-item">
              <Phone size={18} className="maintenance-contact-icon" />
              <div>
                <div className="maintenance-contact-label">
                  {lang === "en" ? "Official Phone" : "अधिकृत दूरध्वनी"}
                </div>
                <div className="maintenance-contact-val">
                  <a href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`}>
                    {settings.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="maintenance-contact-item">
              <Mail size={18} className="maintenance-contact-icon" />
              <div>
                <div className="maintenance-contact-label">
                  {lang === "en" ? "Official Email" : "ईमेल संपर्क"}
                </div>
                <div className="maintenance-contact-val">
                  <a href={`mailto:${settings.contact.email}`}>
                    {settings.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="maintenance-contact-item">
              <MapPin size={18} className="maintenance-contact-icon" />
              <div>
                <div className="maintenance-contact-label">
                  {lang === "en" ? "Campus" : "पत्ता"}
                </div>
                <div className="maintenance-contact-val">
                  {settings.address.area}, {settings.address.city} — {settings.address.pincode}
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Discreet Staff Portal Link */}
          <div className="maintenance-footer">
            {isAdmin ? (
              <Link to="/admin/dashboard" className="maintenance-admin-link">
                <LayoutDashboard size={14} />
                <span>{lang === "en" ? "Return to Admin Dashboard" : "प्रशासक डॅशबोर्डवर परत जा"}</span>
              </Link>
            ) : (
              <Link to="/admin/login" className="maintenance-admin-link">
                <Lock size={14} />
                <span>{lang === "en" ? "School Staff Login" : "प्रशासकीय कर्मचारी लॉगिन"}</span>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

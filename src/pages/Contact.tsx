import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Navigation,
  Building2,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import "./Contact.css";

/* =========================================================
   CONTACT / ENQUIRY PAGE
   ========================================================= */

export default function Contact() {
  const { t, lang } = useI18n();
  const { settings } = useSchoolSettings();

  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
    classGrade: "1",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      try {
        const stored = JSON.parse(localStorage.getItem("spps_enquiries") || "[]");
        stored.push({
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("spps_enquiries", JSON.stringify(stored));
      } catch {}
      setSubmitted(true);
    } catch (err) {
      console.warn("Enquiry submission fallback to local storage:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const hasForm = settings.enquiryFormUrl && settings.enquiryFormUrl.trim().length > 0;

  const schoolName =
    lang === "en"
      ? settings.name.english
      : lang === "hi"
        ? settings.name.hindi
        : settings.name.marathi;

  return (
    <div className="contact-page">
      {/* ===== PAGE HEADER ===== */}
      <section className="contact-header">
        <div className="container">
          <p className="section-label">
            <MessageSquare size={14} />
            {t.contact.title}
          </p>
          <h1 className="contact-header__title">{t.contact.title}</h1>
          <p className="contact-header__sub">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* ===== MAIN TWO-COLUMN LAYOUT ===== */}
      <section className="section section--sm">
        <div className="container">
          <div className="contact-grid">
            {/* ── LEFT: CONTACT INFO ── */}
            <aside className="contact-info">
              {/* Address */}
              <div className="contact-info__block">
                <div className="contact-info__icon-wrap">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="contact-info__label">{t.contact.address}</h3>
                  <p className="contact-info__value">
                    {settings.address.line1}
                    <br />
                    {settings.address.area}, {settings.address.city}
                    <br />
                    {settings.address.state} — {settings.address.pincode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info__block">
                <div className="contact-info__icon-wrap">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="contact-info__label">{t.contact.phone}</h3>
                  <p className="contact-info__value">
                    <a
                      href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`}
                      className="contact-link"
                    >
                      {settings.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info__block">
                <div className="contact-info__icon-wrap">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="contact-info__label">{t.contact.email}</h3>
                  <p className="contact-info__value">
                    <a
                      href={`mailto:${settings.contact.email}`}
                      className="contact-link"
                    >
                      {settings.contact.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-info__block">
                <div className="contact-info__icon-wrap contact-info__icon-wrap--whatsapp">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="contact-info__label">{t.contact.whatsapp}</h3>
                  <p className="contact-info__value">
                    <a
                      href={`https://wa.me/${settings.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link contact-link--whatsapp"
                    >
                      {settings.contact.whatsapp}
                    </a>
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="contact-info__block">
                <div className="contact-info__icon-wrap">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="contact-info__label">
                    {lang === "en"
                      ? "Office Hours"
                      : lang === "hi"
                      ? "कार्यालय समय"
                      : "कार्यालय वेळ"}
                  </h3>
                  <p className="contact-info__value">
                    {lang === "en"
                      ? "Monday – Saturday"
                      : lang === "hi"
                      ? "सोमवार – शनिवार"
                      : "सोमवार – शनिवार"}
                    <br />
                    8:00 AM – 3:30 PM
                  </p>
                </div>
              </div>
            </aside>

            {/* ── RIGHT: ENQUIRY FORM / GOOGLE FORM ── */}
            <div className="contact-form-wrap">
              {hasForm ? (
                <div className="contact-form-card">
                  <div className="contact-form-card__header">
                    <div>
                      <h2 className="contact-form__title">
                        {lang === "en"
                          ? "Online Admission & Enquiry Form"
                          : lang === "hi"
                          ? "ऑनलाइन प्रवेश एवं पूछताछ प्रपत्र"
                          : "ऑनलाइन प्रवेश व चौकशी अर्ज"}
                      </h2>
                      <p className="contact-form__subtitle">
                        {lang === "en"
                          ? "Please complete the official Google Form below to register your enquiry."
                          : lang === "hi"
                          ? "कृपया अपनी पूछताछ दर्ज करने के लिए नीचे दिए गए गूगल फॉर्म को भरें।"
                          : "आपली चौकशी नोंदवण्यासाठी कृपया खालील अधिकृत गुगल अर्ज भरा."}
                      </p>
                    </div>
                    <a
                      href={settings.enquiryFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-open-form"
                      title={lang === "en" ? "Open form in new tab" : "नवीन टॅबमध्ये उघडा"}
                    >
                      <span>{lang === "en" ? "Open Form" : "अर्ज उघडा"}</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                  <div className="contact-form-iframe-container">
                    <iframe
                      src={settings.enquiryFormUrl}
                      title="School Enquiry Form"
                      width="100%"
                      height="950"
                      frameBorder="0"
                      style={{ border: 0, display: "block", width: "100%", minHeight: "850px" }}
                      loading="lazy"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              ) : (
                <div className="contact-form-card">
                  <h2 className="contact-form__title">
                    {lang === "en"
                      ? "Student Admission & General Enquiry"
                      : lang === "hi"
                      ? "विद्यार्थी प्रवेश एवं सामान्य पूछताछ"
                      : "विद्यार्थी प्रवेश व सर्वसाधारण चौकशी"}
                  </h2>
                  <p className="contact-form__subtitle">
                    {lang === "en"
                      ? "Fill in your details and our school administration will reach out to guide you."
                      : lang === "hi"
                      ? "अपना विवरण भरें, हमारा विद्यालय प्रशासन आपसे संपर्क कर मार्गदर्शन करेगा।"
                      : "आपली माहिती नोंदवा, शाळा प्रशासन आपल्याशी लवकरच संपर्क साधेल."}
                  </p>

                  {submitted ? (
                    <div className="contact-success-box">
                      <CheckCircle size={40} className="contact-success-icon" />
                      <h3 className="contact-success-title">
                        {lang === "en"
                          ? "Thank You! Your Enquiry Has Been Received."
                          : lang === "hi"
                          ? "धन्यवाद! आपकी पूछताछ प्राप्त हो गई है।"
                          : "धन्यवाद! आपली चौकशी यशस्वीरित्या नोंदवली गेली आहे."}
                      </h3>
                      <p>
                        {lang === "en"
                          ? "We have recorded your details. You may also directly call or message us on WhatsApp at "
                          : lang === "hi"
                          ? "हमने आपका विवरण सुरक्षित कर लिया है। आप सीधे व्हाट्सएप पर भी संपर्क कर सकते हैं: "
                          : "आम्ही आपली माहिती नोंदवली आहे. आपण थेट फोन अथवा व्हॉट्सअॅपवरही संपर्क साधू शकता: "}
                        <strong>{settings.contact.whatsapp}</strong>.
                      </p>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            parentName: "",
                            studentName: "",
                            phone: "",
                            email: "",
                            classGrade: "1",
                            message: "",
                          });
                        }}
                      >
                        {lang === "en"
                          ? "Submit Another Enquiry"
                          : lang === "hi"
                          ? "अन्य पूछताछ सबमिट करें"
                          : "दुसरी चौकशी नोंदवा"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="form-group-row">
                        <div className="form-group">
                          <label htmlFor="parentName">
                            {lang === "en"
                              ? "Parent / Guardian Name *"
                              : lang === "hi"
                              ? "पालक का नाम *"
                              : "पालकांचे नाव *"}
                          </label>
                          <input
                            type="text"
                            id="parentName"
                            required
                            value={formData.parentName}
                            onChange={(e) =>
                              setFormData({ ...formData, parentName: e.target.value })
                            }
                            placeholder="e.g. Ramesh Sharma"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="studentName">
                            {lang === "en"
                              ? "Student Name *"
                              : lang === "hi"
                              ? "विद्यार्थी का नाम *"
                              : "विद्यार्थ्याचे नाव *"}
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            required
                            value={formData.studentName}
                            onChange={(e) =>
                              setFormData({ ...formData, studentName: e.target.value })
                            }
                            placeholder="e.g. Aarav Sharma"
                          />
                        </div>
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label htmlFor="phone">
                            {lang === "en"
                              ? "Mobile Number *"
                              : lang === "hi"
                              ? "मोबाइल नंबर *"
                              : "मोबाईल नंबर *"}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="e.g. 9876543210"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="classGrade">
                            {lang === "en"
                              ? "Class Seeking Admission *"
                              : lang === "hi"
                              ? "प्रवेश हेतु कक्षा *"
                              : "प्रवेशासाठी इयत्ता *"}
                          </label>
                          <select
                            id="classGrade"
                            value={formData.classGrade}
                            onChange={(e) =>
                              setFormData({ ...formData, classGrade: e.target.value })
                            }
                          >
                            <option value="1">Class 1 (इयत्ता १ ली)</option>
                            <option value="2">Class 2 (इयत्ता २ री)</option>
                            <option value="3">Class 3 (इयत्ता ३ री)</option>
                            <option value="4">Class 4 (इयत्ता ४ थी)</option>
                            <option value="5">Class 5 (इयत्ता ५ वी)</option>
                            <option value="6">Class 6 (इयत्ता ६ वी)</option>
                            <option value="7">Class 7 (इयत्ता ७ वी)</option>
                            <option value="8">Class 8 (इयत्ता ८ वी)</option>
                            <option value="9">Class 9 (इयत्ता ९ वी)</option>
                            <option value="10">Class 10 (इयत्ता १० वी)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">
                          {lang === "en"
                            ? "Questions or Message (Optional)"
                            : lang === "hi"
                            ? "प्रश्न अथवा संदेश (वैकल्पिक)"
                            : "प्रश्न किंवा संदेश (ऐच्छिक)"}
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder={
                            lang === "en"
                              ? "Mention any specific requirements or questions..."
                              : lang === "hi"
                              ? "कोई विशिष्ट प्रश्न या जानकारी यहाँ लिखें..."
                              : "काही विशेष प्रश्न किंवा माहिती हवी असल्यास येथे लिहा..."
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        <Send size={16} />
                        {submitting
                          ? (lang === "en" ? "Sending..." : "नोंदणी होत आहे...")
                          : (lang === "en" ? "Submit Admission Enquiry" : lang === "hi" ? "पूछताछ प्रेषित करें" : "प्रवेश चौकशी अर्ज पाठवा")}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FIND US SECTION WITH MAP ===== */}
      <section className="find-us section--sm">
        <div className="container">
          <div className="find-us__inner">
            <div className="section-header">
              <span className="section-label">
                <Navigation size={14} />
                {lang === "en"
                  ? "Find Us"
                  : lang === "hi"
                  ? "स्थान व पत्ता"
                  : "शाळेचा पत्ता व नकाशा"}
              </span>
              <h2 className="section-title">{schoolName}</h2>
              <div className="divider" />
              <p className="section-subtitle">
                {settings.address.fullAddress}
              </p>
            </div>

            <div className="find-us__details" style={{ marginBottom: "1.5rem" }}>
              <div className="find-us__item">
                <Building2 size={18} />
                <span>
                  {lang === "en"
                    ? "Municipal Corporation School, Babupeth"
                    : lang === "hi"
                    ? "नगर निगम विद्यालय, बाबूपेठ"
                    : "महानगरपालिका शाळा, बाबूपेठ"}
                </span>
              </div>
              <div className="find-us__item">
                <MapPin size={18} />
                <span>
                  {lang === "en"
                    ? "Chandrapur, Maharashtra 442403"
                    : lang === "hi"
                    ? "चंद्रपुर, महाराष्ट्र 442403"
                    : "चंद्रपूर, महाराष्ट्र ४४२४०३"}
                </span>
              </div>
              <div className="find-us__item">
                <Navigation size={18} />
                <span>
                  {lang === "en"
                    ? "Near Narsingh Akhada, Netaji Chowk Road"
                    : lang === "hi"
                    ? "नरसिंह अखाड़ा के पास, नेताजी चौक रोड"
                    : "नरसिंह आखाडा जवळ, नेताजी चौक रोड"}
                </span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="map-embed-container" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)", height: "380px", width: "100%" }}>
              <iframe
                title="School Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.3500276904697!2d79.31843317500098!3d19.95177668144157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2d44ef90ca72f%3A0x3cc7751859db21e8!2sSavitribai%20Phule%20Primary%20School!5e0!3m2!1sen!2sin!4v1793281512441!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="contact-cta">
        <div className="container">
          <div className="contact-cta__inner">
            <div className="contact-cta__icon">
              <Users size={32} />
            </div>
            <h2 className="contact-cta__title">
              {lang === "en"
                ? "Visit Us In Person"
                : lang === "hi"
                ? "प्रत्यक्ष भेंट दें"
                : "शाळेला प्रत्यक्ष भेट द्या"}
            </h2>
            <p className="contact-cta__sub">
              {lang === "en"
                ? "We invite parents to tour our smart classrooms, computer lab, and campus. Feel free to visit Monday to Saturday, 8:00 AM to 3:30 PM."
                : lang === "hi"
                ? "हम अभिभावकों को स्मार्ट कक्षाओं, कंप्यूटर लैब और परिसर का भ्रमण करने के लिए आमंत्रित करते हैं। सोमवार से शनिवार, सुबह 8:00 से दोपहर 3:30 बजे तक पधारें।"
                : "पालकांनी आमच्या डिजिटल वर्गखोल्या, संगणक लॅब आणि सुंदर परिसराची पाहणी करावी यासाठी आम्ही सहर्ष निमंत्रण देत आहोत. सोमवार ते शनिवार, सकाळी ८:०० ते दुपारी ३:३० दरम्यान भेट द्या."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, type FormEvent } from "react";
import {
  HeartHandshake,
  BookOpen,
  Laptop,
  Trophy,
  Building2,
  Users,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";
import { useI18n } from "../i18n";
import { apiSubmitContribution, type ContributionCategory } from "../utils/api";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Contribution.css";

/* =========================================================
   CONTRIBUTION & COMMUNITY SUPPORT — EDITORIAL SPREAD
   PM Shri Savitribai Phule School, Babupeth, Chandrapur
   ========================================================= */

// Authentic school photos matching each category
const IMG_LIBRARY = "/assets/images/pptx1/image24.jpeg";
const IMG_DIGITAL = "/assets/images/pptx1/image10.jpeg";
const IMG_SPORTS = "/assets/images/pptx2/image20.jpeg";
const IMG_INFRA = "/assets/images/pptx1/image3.jpeg";
const IMG_COMMUNITY = "/assets/images/pptx1/image12.jpeg";
const IMG_PLANTATION = "/assets/images/pptx1/image31.jpeg";

export default function Contribution() {
  const { t, lang } = useI18n();

  const [formData, setFormData] = useState({
    contributorName: "",
    phone: "",
    email: "",
    organization: "",
    category: "learning_resources" as ContributionCategory,
    description: "",
    proposedAmount: "",
    preferredContact: "phone" as "phone" | "email" | "whatsapp",
    consentToContact: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  useScrollReveal([lang, successReference]);

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.contributorName.trim()) {
      setErrorMsg(l("Please provide your name.", "कृपया अपना नाम दर्ज करें।", "कृपया आपले नाव नोंदवा."));
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMsg(
        l(
          "Please provide either a phone number or email address for communication.",
          "कृपया संपर्क हेतु फ़ोन नंबर अथवा ईमेल दर्ज करें।",
          "कृपया संपर्कासाठी फोन नंबर किंवा ईमेल पत्ता नोंदवा."
        )
      );
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg(
        l(
          "Please provide a brief description of your proposed contribution.",
          "कृपया अपने प्रस्तावित सहयोग का विवरण लिखें।",
          "कृपया आपल्या प्रस्तावित योगदानाचे संक्षिप्त वर्णन लिहा."
        )
      );
      return;
    }

    setSubmitting(true);
    const res = await apiSubmitContribution({
      contributorName: formData.contributorName,
      phone: formData.phone,
      email: formData.email,
      organization: formData.organization,
      category: formData.category,
      description: formData.description,
      proposedAmount: formData.proposedAmount ? Number(formData.proposedAmount) : undefined,
      preferredContact: formData.preferredContact,
      consentToContact: formData.consentToContact,
    });
    setSubmitting(false);

    if (res.success && res.referenceId) {
      setSuccessReference(res.referenceId);
      window.scrollTo({ top: 300, behavior: "smooth" });
    } else {
      setErrorMsg(res.error || l("Submission failed. Please try again.", "सबमिशन विफल। कृपया पुनः प्रयास करें।", "नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा."));
    }
  }

  function handleCopyReference() {
    if (successReference) {
      navigator.clipboard.writeText(successReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  const categories = [
    {
      id: "learning_resources" as ContributionCategory,
      title: t.contribution.learningTitle,
      desc: t.contribution.learningDesc,
      icon: BookOpen,
      image: IMG_LIBRARY,
      tag: l("BOOKS & KITS", "पुस्तके व किट", "पुस्तके व किट"),
    },
    {
      id: "digital" as ContributionCategory,
      title: t.contribution.digitalTitle,
      desc: t.contribution.digitalDesc,
      icon: Laptop,
      image: IMG_DIGITAL,
      tag: l("TECHNOLOGY & STEM", "तंत्रज्ञान व प्रयोगशाळा", "तंत्रज्ञान व प्रयोगशाळा"),
    },
    {
      id: "financial" as ContributionCategory,
      title: t.contribution.financialTitle,
      desc: t.contribution.financialDesc,
      icon: HeartHandshake,
      image: IMG_COMMUNITY,
      tag: l("DEVELOPMENT FUND", "विकास साहाय्य", "विकास साहाय्य"),
    },
    {
      id: "sports" as ContributionCategory,
      title: t.contribution.sportsTitle,
      desc: t.contribution.sportsDesc,
      icon: Trophy,
      image: IMG_SPORTS,
      tag: l("ATHLETICS & ARTS", "क्रीडा व कला", "क्रीडा व कला"),
    },
    {
      id: "infrastructure" as ContributionCategory,
      title: t.contribution.infraTitle,
      desc: t.contribution.infraDesc,
      icon: Building2,
      image: IMG_PLANTATION,
      tag: l("ECO & CAMPUS", "परिसर व पर्यावरण", "परिसर व पर्यावरण"),
    },
    {
      id: "community" as ContributionCategory,
      title: t.contribution.communityTitle,
      desc: t.contribution.communityDesc,
      icon: Users,
      image: IMG_INFRA,
      tag: l("VOLUNTEERING", "स्वयंसेवा व मार्गदर्शन", "स्वयंसेवा व मार्गदर्शन"),
    },
  ];

  return (
    <div className="contribution-page">
      {/* ===== 1. HERO SPREAD ===== */}
      <section className="contrib-hero" aria-label="Contribution Header">
        <div className="container">
          <div className="contrib-hero__kicker hero-seq-1">
            <span className="contrib-kicker-badge">
              <HeartHandshake size={15} aria-hidden />
              {t.contribution.badge}
            </span>
            <span className="contrib-kicker-sub">
              {l("Public Participation & Community Stewardship", "लोकसहभाग व शाळा विकास", "लोकसहभाग व शाळा विकास")}
            </span>
          </div>

          <h1 className="contrib-hero__title hero-seq-2">
            {t.contribution.title}
          </h1>

          <div className="contrib-hero__rule hero-seq-2" aria-hidden />

          <p className="contrib-hero__lead hero-seq-3">
            {t.contribution.subtitle}
          </p>

          <div className="contrib-hero__pillars hero-seq-4">
            <div className="contrib-pillar-item">
              <ShieldCheck size={18} className="contrib-pillar-icon" />
              <div>
                <strong>{t.contribution.transparencyBadge}</strong>
                <span>{l("Direct Municipal Governance", "थेट शासकीय व पारदर्शक विनियोग", "थेट शासकीय व पारदर्शक विनियोग")}</span>
              </div>
            </div>
            <div className="contrib-pillar-item">
              <Sparkles size={18} className="contrib-pillar-icon" />
              <div>
                <strong>Student-Centric Growth</strong>
                <span>{l("Enriching 100+ underprivileged learners", "शंभराहून अधिक विद्यार्थ्यांचा विकास", "शंभराहून अधिक विद्यार्थ्यांचा विकास")}</span>
              </div>
            </div>
            <div className="contrib-pillar-item">
              <HelpCircle size={18} className="contrib-pillar-icon" />
              <div>
                <strong>Official Due Diligence</strong>
                <span>{l("Authorized School Receipt System", "अधिकृत शासकीय पावती व नोंद", "अधिकृत शासकीय पावती व नोंद")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. CONTRIBUTION CATEGORIES SHOWCASE ===== */}
      <section className="contrib-categories-section bg-parchment-light reveal-on-scroll">
        <div className="container">
          <div className="contrib-section-intro">
            <span className="editorial-eyebrow">
              {l("AVENUES OF SUPPORT", "सहकार्याचे विविध मार्ग", "सहकार्याचे विविध मार्ग")}
            </span>
            <h2 className="editorial-title">
              {l(
                "Ways You Can Strengthen Our Educational Ecosystem",
                "आपण शाळेला कोणत्या प्रकारे साहाय्य करू शकता",
                "आपण शाळेला कोणत्या प्रकारे साहाय्य करू शकता"
              )}
            </h2>
            <div className="editorial-rule editorial-rule--gold" style={{ margin: "1rem auto 1.5rem" }} />
          </div>

          <div className="contrib-categories-grid">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={`contrib-cat-card reveal-on-scroll reveal-delay-${(idx % 3) + 1}`}
                >
                  <div className="contrib-cat-card__media">
                    <img src={cat.image} alt={cat.title} loading="lazy" />
                    <span className="contrib-cat-card__tag">{cat.tag}</span>
                  </div>
                  <div className="contrib-cat-card__body">
                    <div className="contrib-cat-card__icon-box">
                      <IconComp size={20} />
                    </div>
                    <h3 className="contrib-cat-card__title">{cat.title}</h3>
                    <p className="contrib-cat-card__desc">{cat.desc}</p>
                    <button
                      type="button"
                      className="contrib-cat-card__select-btn"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, category: cat.id }));
                        const formElem = document.getElementById("contribution-form-card");
                        formElem?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {l("Select Category", "यह श्रेणी चुनें", "ही श्रेणी निवडा")} &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. CONTRIBUTION ENQUIRY FORM & SAFETY NOTICE ===== */}
      <section className="contrib-form-section bg-parchment reveal-on-scroll" id="contribution-form-card">
        <div className="container">
          <div className="contrib-form-layout">

            {/* Left: Institutional Ethical & Safety Notice */}
            <div className="contrib-safety-dossier">
              <div className="contrib-safety-badge">
                <ShieldCheck size={16} />
                <span>{l("Official Due Diligence Policy", "अधिकृत शासकीय धोरण", "अधिकृत शासकीय धोरण")}</span>
              </div>
              <h3 className="contrib-safety-title">
                {l(
                  "Transparent & Verified Contribution Framework",
                  "पारदर्शक व अधिकृत सहकार्य व्यवस्था",
                  "पारदर्शक व अधिकृत सहकार्य व्यवस्था"
                )}
              </h3>
              <p className="contrib-safety-text">
                {t.contribution.transparencyNote}
              </p>

              <div className="contrib-safety-points">
                <div className="contrib-safety-point">
                  <div className="contrib-safety-dot" />
                  <div>
                    <strong>{l("No Direct UPI / Personal Accounts", "कोणत्याही वैयक्तिक यूपीआय खात्यावर पैसे स्वीकारले जात नाहीत", "कोणत्याही वैयक्तिक यूपीआय खात्यावर पैसे स्वीकारले जात नाहीत")}</strong>
                    <span>
                      {l(
                        "The school does not use personal QR codes or third-party gateways. All financial support requires official SMC resolution.",
                        "विद्यालय किसी भी व्यक्तिगत क्यूआर कोड अथवा अनाधिकृत माध्यम से दान नहीं लेता।",
                        "शाळा कोणत्याही व्यक्तीच्या खात्यावर किंवा क्यूआर कोडवर रक्कम स्वीकारत नाही."
                      )}
                    </span>
                  </div>
                </div>

                <div className="contrib-safety-point">
                  <div className="contrib-safety-dot" />
                  <div>
                    <strong>{l("Material Donations Documented", "वस्तू साहित्याची अधिकृत नोंद", "वस्तू साहित्याची अधिकृत नोंद")}</strong>
                    <span>
                      {l(
                        "Books, computers, and sports kits are cataloged into the school asset register with donor acknowledgement.",
                        "दान की गई सभी पुस्तकें, कंप्यूटर व सामग्री आधिकारिक रजिस्टर में दर्ज की जाती हैं।",
                        "दिलेली पुस्तके, संगणक व साहित्य शाळेच्या अधिकृत नोंदवहीत नोंदवले जाते."
                      )}
                    </span>
                  </div>
                </div>

                <div className="contrib-safety-point">
                  <div className="contrib-safety-dot" />
                  <div>
                    <strong>{l("Direct Consultation", "शाळा समितीशी थेट समन्वय", "शाळा समितीशी थेट समन्वय")}</strong>
                    <span>
                      {l(
                        "Our School Management Committee (SMC) directly connects with you to finalize your contribution according to school priorities.",
                        "विद्यालय प्रबंधन समिति सीधे आपसे संपर्क कर प्राथमिकता के अनुसार मार्गदर्शन करेगी।",
                        "शाळा व्यवस्थापन समिती थेट आपल्याशी संपर्क साधून योग्य मार्गदर्शन करेल."
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="contrib-contact-box">
                <p className="contrib-contact-box__head">
                  {l("Direct School Inquiries", "थेट संपर्क", "थेट संपर्क")}:
                </p>
                <div className="contrib-contact-item">
                  <Phone size={15} />
                  <span>+91 94228 39223 / +91 94221 37882</span>
                </div>
                <div className="contrib-contact-item">
                  <Mail size={15} />
                  <span>contact@spps-chandrapur.org</span>
                </div>
              </div>
            </div>

            {/* Right: Integrated Contribution Form */}
            <div className="contrib-form-card">
              <div className="contrib-form-card__header">
                <h2 className="contrib-form-title">{t.contribution.formTitle}</h2>
                <p className="contrib-form-subtitle">{t.contribution.formSubtitle}</p>
              </div>

              {successReference ? (
                /* Success Screen */
                <div className="contrib-success-panel animate-scaleIn">
                  <div className="contrib-success-icon-wrap">
                    <CheckCircle2 size={46} />
                  </div>
                  <h3 className="contrib-success-heading">{t.contribution.successTitle}</h3>
                  <p className="contrib-success-lead">
                    {t.contribution.successText}
                  </p>

                  <div className="contrib-ref-badge" onClick={handleCopyReference}>
                    <span className="contrib-ref-id">{successReference}</span>
                    <button type="button" className="contrib-ref-copy-btn" title="Copy Reference ID">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copied ? l("Copied!", "कॉपी किया!", "कॉपी झाले!") : l("Copy", "कॉपी", "कॉपी")}</span>
                    </button>
                  </div>

                  <div className="contrib-success-note">
                    <AlertCircle size={18} className="contrib-note-icon" />
                    <p>{t.contribution.successNote}</p>
                  </div>

                  <button
                    type="button"
                    className="ed-btn ed-btn--primary"
                    style={{ marginTop: "1.5rem" }}
                    onClick={() => {
                      setSuccessReference(null);
                      setFormData({
                        contributorName: "",
                        phone: "",
                        email: "",
                        organization: "",
                        category: "learning_resources",
                        description: "",
                        proposedAmount: "",
                        preferredContact: "phone",
                        consentToContact: true,
                      });
                    }}
                  >
                    {l("Submit Another Enquiry", "अन्य सहयोग दर्ज करें", "दुसरी नोंदणी करा")}
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="contrib-form">
                  {errorMsg && (
                    <div className="contrib-form-error" role="alert">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="form-group-row">
                    <div className="contrib-form-field">
                      <label htmlFor="cb-name">{t.contribution.nameLabel}</label>
                      <input
                        id="cb-name"
                        type="text"
                        required
                        placeholder="e.g. Anand Deshmukh"
                        value={formData.contributorName}
                        onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                      />
                    </div>
                    <div className="contrib-form-field">
                      <label htmlFor="cb-phone">{t.contribution.phoneLabel}</label>
                      <input
                        id="cb-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="contrib-form-field">
                      <label htmlFor="cb-email">{t.contribution.emailLabel}</label>
                      <input
                        id="cb-email"
                        type="email"
                        placeholder="e.g. anand@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="contrib-form-field">
                      <label htmlFor="cb-org">{t.contribution.orgLabel}</label>
                      <input
                        id="cb-org"
                        type="text"
                        placeholder="e.g. Alumni Batch 2015 / Rotary Club"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="contrib-form-field">
                      <label htmlFor="cb-category">{t.contribution.categoryLabel}</label>
                      <select
                        id="cb-category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ContributionCategory })}
                      >
                        <option value="learning_resources">{t.contribution.learningTitle}</option>
                        <option value="digital">{t.contribution.digitalTitle}</option>
                        <option value="financial">{t.contribution.financialTitle}</option>
                        <option value="sports">{t.contribution.sportsTitle}</option>
                        <option value="infrastructure">{t.contribution.infraTitle}</option>
                        <option value="community">{t.contribution.communityTitle}</option>
                        <option value="other">{l("Other Approved Support", "अन्य अनुमोदित सहयोग", "इतर अनुमोदित सहकार्य")}</option>
                      </select>
                    </div>

                    <div className="contrib-form-field">
                      <label htmlFor="cb-amount">{t.contribution.amountLabel}</label>
                      <input
                        id="cb-amount"
                        type="number"
                        min="100"
                        placeholder="e.g. 5000"
                        value={formData.proposedAmount}
                        onChange={(e) => setFormData({ ...formData, proposedAmount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contrib-form-field">
                    <label htmlFor="cb-desc">{t.contribution.descLabel}</label>
                    <textarea
                      id="cb-desc"
                      rows={3}
                      required
                      placeholder={l(
                        "Briefly describe what books, equipment, voluntary time, or support you wish to provide...",
                        "आप किस प्रकार की पुस्तकें, उपकरण, समय अथवा सहयोग देना चाहते हैं, उसका संक्षिप्त विवरण दें...",
                        "आपण कोणती पुस्तके, उपकरणे, वेळ किंवा साहाय्य देऊ इच्छिता, त्याचे संक्षिप्त वर्णन लिहा..."
                      )}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="contrib-form-field">
                    <label>{t.contribution.contactPrefLabel}</label>
                    <div className="contrib-contact-pref-row">
                      <label className="contrib-radio-label">
                        <input
                          type="radio"
                          name="contactPref"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={() => setFormData({ ...formData, preferredContact: "phone" })}
                        />
                        <span>{l("Telephone Call", "फ़ोन कॉल", "फोन कॉल")}</span>
                      </label>
                      <label className="contrib-radio-label">
                        <input
                          type="radio"
                          name="contactPref"
                          value="whatsapp"
                          checked={formData.preferredContact === "whatsapp"}
                          onChange={() => setFormData({ ...formData, preferredContact: "whatsapp" })}
                        />
                        <span>WhatsApp</span>
                      </label>
                      <label className="contrib-radio-label">
                        <input
                          type="radio"
                          name="contactPref"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={() => setFormData({ ...formData, preferredContact: "email" })}
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  <div className="contrib-consent-wrap">
                    <label className="contrib-consent-label">
                      <input
                        type="checkbox"
                        required
                        checked={formData.consentToContact}
                        onChange={(e) => setFormData({ ...formData, consentToContact: e.target.checked })}
                      />
                      <span>{t.contribution.consentText}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="ed-btn ed-btn--primary contrib-submit-btn"
                    disabled={submitting}
                  >
                    <Send size={16} />
                    <span>{submitting ? t.contribution.submittingBtn : t.contribution.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


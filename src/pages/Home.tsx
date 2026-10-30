import { Link } from "react-router-dom";
import {
  ArrowRight, Monitor, Users, Leaf, Shield, Award,
  ChevronRight, Building2, GraduationCap, Star, Sparkles,
  TreePine, FlaskConical, Calculator, Library, Sun, CheckCircle2,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { staticGalleryItems } from "../data/gallery";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Home.css";

/* =========================================================
   HOMEPAGE — PREMIUM EDITORIAL INSTITUTIONAL DESIGN
   P.M. Shri Savitribai Phule High School, Chandrapur
   ========================================================= */

// Authentic school photos
const HERO_BUILDING = "/assets/images/pptx1/image2.jpeg";
const HERO_VIGNETTE = "/assets/images/pptx1/image22.jpeg";
const SAVITRIBAI_PORTRAIT = "/assets/images/pptx1/image4.jpeg";

// Preview gallery items (curated authentic moments)
const previewItems = staticGalleryItems.slice(0, 6);

export default function Home() {
  const { t, lang } = useI18n();
  const { settings } = useSchoolSettings();

  useScrollReveal([lang]);

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  return (
    <div className="home-editorial">

      {/* =========================================================
         1. HERO — ASYMMETRIC EDITORIAL SPLIT
         ========================================================= */}
      <section className="ed-hero" aria-label="Welcome">
        <div className="container container--wide">
          <div className="ed-hero__grid">

            {/* Left: Editorial Typography & Institutional Identity */}
            <div className="ed-hero__narrative">
              <div className="ed-hero__kicker hero-seq-1">
                <span className="ed-kicker-badge">
                  <Star size={13} aria-hidden />
                  {l("P.M. SHRI INSTITUTION", "पी.एम. श्री आदर्श विद्यालय", "पी.एम. श्री आदर्श शाळा")}
                </span>
                <span className="ed-kicker-sub">
                  {l("Chandrapur Municipal Corporation", "चंद्रपुर महानगरपालिका", "चंद्रपूर महानगरपालिका")}
                </span>
              </div>

              <h1 className="ed-hero__title hero-seq-2">
                {t.home.heroHeadline}
              </h1>

              <div className="ed-hero__rule hero-seq-2" aria-hidden />

              <p className="ed-hero__lead hero-seq-3">
                {t.home.heroSub}
              </p>

              <div className="ed-hero__actions hero-seq-4">
                <Link to="/about" className="ed-btn ed-btn--primary">
                  <span>{t.home.exploreCta}</span>
                  <ArrowRight size={17} aria-hidden />
                </Link>
                <Link to="/academics" className="ed-btn ed-btn--outline">
                  <span>{l("Academic Pedagogy", "शैक्षणिक प्रणाली", "शैक्षणिक प्रणाली")}</span>
                </Link>
                <Link to="/contact" className="ed-btn ed-btn--ghost">
                  <span>{t.nav.enquire}</span>
                </Link>
              </div>

              {/* Verified Institutional Accreditations */}
              <div className="ed-hero__accreditations hero-seq-4">
                <div className="ed-accred-item">
                  <span className="ed-accred-dot" />
                  <div>
                    <strong>PM SHRI</strong>
                    <span>{l("Govt. of India", "भारत सरकार", "भारत सरकार")}</span>
                  </div>
                </div>
                <div className="ed-accred-item">
                  <span className="ed-accred-dot" />
                  <div>
                    <strong>NEP 2020</strong>
                    <span>{l("Model Pedagogy", "आदर्श शिक्षण", "आदर्श अभ्यासक्रम")}</span>
                  </div>
                </div>
                <div className="ed-accred-item">
                  <span className="ed-accred-dot" />
                  <div>
                    <strong>Classes 1–10</strong>
                    <span>{l("Marathi & Semi-English", "मराठी व सेमी-इंग्रजी", "मराठी व सेमी-इंग्रजी")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Museum-Grade Photographic Showcase */}
            <div className="ed-hero__visual hero-seq-5">
              <div className="ed-hero__photo-card">
                <img
                  src={HERO_BUILDING}
                  alt="P.M. Shri Savitribai Phule High School campus entrance in Babupeth, Chandrapur"
                  className="ed-hero__main-img"
                  loading="eager"
                />
                <div className="ed-hero__caption-badge">
                  <Building2 size={16} className="ed-caption-icon" aria-hidden />
                  <div>
                    <p className="ed-caption-title">{settings.name.short}</p>
                    <p className="ed-caption-sub">Babupeth, Chandrapur • Ward 18</p>
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Vignette */}
              <div className="ed-hero__vignette-card" aria-hidden="true">
                <img
                  src={HERO_VIGNETTE}
                  alt="Students in modern smart classroom"
                  className="ed-hero__vignette-img"
                  loading="eager"
                />
                <div className="ed-hero__vignette-text">
                  <Sparkles size={14} />
                  <span>{l("Smart Classroom & ICT Lab", "स्मार्ट वर्गखोली व संगणक लॅब", "स्मार्ट वर्गखोली व संगणक लॅब")}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         2. SCHOOL AT A GLANCE — CARDLESS TYPOGRAPHY-LED STATS
         ========================================================= */}
      <section className="ed-glance reveal-on-scroll" aria-label="School At A Glance">
        <div className="container container--wide">
          <div className="ed-glance__header">
            <span className="editorial-eyebrow">
              {l("INSTITUTIONAL METRICS", "शालेय अवलोकन", "शालेय अवलोकन")}
            </span>
            <h2 className="ed-glance__title">{t.home.glanceTitle}</h2>
          </div>

          <div className="ed-glance__metrics">
            <div className="ed-metric-col">
              <span className="ed-metric-num">1–10</span>
              <span className="ed-metric-label">{l("Classes Served", "कक्षाएँ", "इयत्ता १ ली ते १० वी")}</span>
              <p className="ed-metric-sub">{l("Primary to High School", "प्राथमिक व माध्यमिक", "प्राथमिक व माध्यमिक स्तर")}</p>
            </div>

            <div className="ed-metric-divider" aria-hidden />

            <div className="ed-metric-col">
              <span className="ed-metric-num">PM SHRI</span>
              <span className="ed-metric-label">{l("Accredited Scheme", "मान्यता प्राप्त योजना", "मान्यताप्राप्त योजना")}</span>
              <p className="ed-metric-sub">{l("Rising India Exemplar School", "भारत सरकारचे मॉडेल स्कूल", "भारत सरकारचे मॉडेल स्कूल")}</p>
            </div>

            <div className="ed-metric-divider" aria-hidden />

            <div className="ed-metric-col">
              <span className="ed-metric-num">NEP 2020</span>
              <span className="ed-metric-label">{l("Curriculum Standard", "अभ्यासक्रम मानक", "अभ्यासक्रम मानक")}</span>
              <p className="ed-metric-sub">{l("FLN & Competency Based", "पायाभूत साक्षरता व कौशल्ये", "पायाभूत साक्षरता व कौशल्ये")}</p>
            </div>

            <div className="ed-metric-divider" aria-hidden />

            <div className="ed-metric-col">
              <span className="ed-metric-num">100%</span>
              <span className="ed-metric-label">{l("Free & Inclusive", "समान व मोफत शिक्षण", "समान व मोफत शिक्षण")}</span>
              <p className="ed-metric-sub">{l("Uniforms, Meals & Digital Tools", "गणवेश, पोषण आहार व डिजिटल साधने", "गणवेश, पोषण आहार व डिजिटल साधने")}</p>
            </div>

            <div className="ed-metric-divider" aria-hidden />

            <div className="ed-metric-col">
              <span className="ed-metric-num">Babupeth</span>
              <span className="ed-metric-label">{l("Chandrapur, Maharashtra", "चंद्रपूर, महाराष्ट्र", "चंद्रपूर, महाराष्ट्र")}</span>
              <p className="ed-metric-sub">{l("Municipal Corporation School", "मनपा संचलित शाळा", "मनपा संचलित शाळा")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         3. SCHOOL INTRODUCTION — EDITORIAL STORYTELLING SPREAD
         ========================================================= */}
      <section className="ed-section bg-parchment-light reveal-on-scroll" aria-labelledby="intro-head">
        <div className="container">
          <div className="ed-story-spread">

            {/* Left: Savitribai's Legacy & School Mission */}
            <div className="ed-story-spread__text">
              <span className="editorial-eyebrow">
                {l("HERITAGE & PURPOSE", "वारसा आणि ध्येय", "वारसा आणि ध्येय")}
              </span>
              <h2 className="editorial-title" id="intro-head">
                {t.home.introTitle}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ed-story-p ed-dropcap">
                {lang === "en"
                  ? "P.M. Shri Savitribai Phule School is a municipal corporation school located in Babupeth, Chandrapur, Maharashtra. Named after the pioneering social reformer and feminist educator Krantijyoti Savitribai Phule, the school stands as a beacon of inclusive, high-quality public education for every child in the community."
                  : lang === "hi"
                    ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय महाराष्ट्र के चंद्रपुर जिले के बाबूपेठ क्षेत्र में स्थित नगर निगम का विद्यालय है। महान समाज सुधारक और शिक्षाविद सावित्रीबाई फुले के नाम पर समर्पित यह विद्यालय प्रत्येक बच्चे को गुणवत्तापूर्ण, समावेशी शिक्षा देने के लिए कृतसंकल्पित है।"
                    : "पी.एम. श्री. सावित्रीबाई फुले उच्च प्राथमिक व माध्यमिक शाळा ही महाराष्ट्रातील चंद्रपूर जिल्ह्याच्या बाबूपेठ परिसरातील मनपाची शाळा आहे. महान समाजसुधारक व आद्य शिक्षिका क्रांतिज्योती सावित्रीबाई फुले यांच्या नावाने ओळखली जाणारी ही शाळा प्रत्येक विद्यार्थ्याला दर्जेदार व समावेशक शिक्षण देण्यास कटिबद्ध आहे."}
              </p>

              <blockquote className="editorial-quote">
                {lang === "en"
                  ? "“Providing a safe, modern, and nurturing school environment to help every student develop their full potential through quality education, hands-on learning, and community participation.”"
                  : lang === "hi"
                    ? "“सुरक्षित, आधुनिक और पोषणयुक्त शालेय वातावरण के माध्यम से गुणवत्तापूर्ण शिक्षा, प्रायोगिक अधिगम और सामुदायिक सहभागिता से प्रत्येक विद्यार्थी की पूर्ण क्षमता विकसित करना।”"
                    : "“सुरक्षित, आधुनिक व प्रेरणादायक शालेय वातावरणातून दर्जेदार शिक्षण, कृती-शिक्षण आणि समुदाय सहभागाद्वारे प्रत्येक विद्यार्थ्याची पूर्ण क्षमता विकसित करणे.”"}
              </blockquote>

              <p className="ed-story-p">
                {lang === "en"
                  ? "Recognised under the Government of India's PM SHRI initiative, we combine foundational literacy and numeracy with experiential science, mathematics clubs, rooftop solar energy, and civic leadership."
                  : lang === "hi"
                    ? "भारत सरकार की पीएम श्री योजना के अंतर्गत मान्यता प्राप्त, हम बुनियादी साक्षरता और संख्या ज्ञान को प्रायोगिक विज्ञान, गणित क्लब, सौर ऊर्जा और नागरिक नेतृत्व के साथ जोड़ते हैं।"
                    : "भारत सरकारच्या पीएम श्री योजनेंतर्गत मान्यताप्राप्त, आम्ही पायाभूत साक्षरता व संख्याज्ञानाला प्रत्यक्ष विज्ञान प्रयोग, गणित मंडळ, सौरऊर्जा आणि सामाजिक नेतृत्वाची जोड देतो."}
              </p>

              <div className="ed-story-actions">
                <Link to="/about" className="ed-btn ed-btn--primary">
                  <span>{t.common.learnMore}</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <Link to="/contact" className="ed-btn ed-btn--outline">
                  <span>{t.nav.enquire}</span>
                </Link>
              </div>
            </div>

            {/* Right: Asymmetrical Authentic Photo Montage */}
            <div className="ed-story-spread__gallery">
              <div className="ed-montage-main">
                <img
                  src="/assets/images/pptx1/image7.jpeg"
                  alt="Students presenting self-made models at the school exhibition"
                  loading="lazy"
                />
                <div className="ed-montage-caption">
                  <Award size={15} />
                  <span>{l("Student-Made Science & Math Exhibition", "विद्यार्थी-निर्मित विज्ञान व गणित प्रदर्शन", "विद्यार्थी-निर्मित विज्ञान व गणित प्रदर्शन")}</span>
                </div>
              </div>

              <div className="ed-montage-side">
                <div className="ed-montage-item">
                  <img
                    src={SAVITRIBAI_PORTRAIT}
                    alt="Krantijyoti Savitribai Phule Portrait"
                    loading="lazy"
                  />
                  <span className="ed-montage-label">
                    {l("Krantijyoti Savitribai Phule", "क्रांतिज्योती सावित्रीबाई फुले", "क्रांतिज्योती सावित्रीबाई फुले")}
                  </span>
                </div>
                <div className="ed-montage-item">
                  <img
                    src="/assets/images/pptx1/image13.jpeg"
                    alt="Hands-on classroom activity"
                    loading="lazy"
                  />
                  <span className="ed-montage-label">
                    {l("Competency-Based Learning", "कृती-आधारित शिक्षण", "कृती-आधारित शिक्षण")}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         4. ACADEMIC EXCELLENCE — MAGAZINE EDITORIAL SPREAD
         ========================================================= */}
      <section className="ed-section bg-parchment reveal-on-scroll" aria-labelledby="academics-head">
        <div className="container">
          <div className="ed-section-intro">
            <span className="editorial-eyebrow">
              {l("PEDAGOGY & CURRICULUM", "शैक्षणिक उत्कृष्टता", "शैक्षणिक उत्कृष्टता")}
            </span>
            <h2 className="editorial-title" id="academics-head">
              {t.home.academicsTitle}
            </h2>
            <div className="editorial-rule editorial-rule--gold" aria-hidden />
            <p className="editorial-lead">
              {t.academics.fln}
            </p>
          </div>

          <div className="ed-academics-magazine">

            {/* Lead Feature: FLN & Model Making */}
            <div className="ed-mag-lead">
              <div className="ed-mag-lead__img-wrap">
                <img
                  src="/assets/images/pptx1/image10.jpeg"
                  alt="Foundational Literacy & Numeracy in early classes"
                  loading="lazy"
                />
                <span className="ed-mag-tag">NIPUN BHARAT • FLN</span>
              </div>
              <div className="ed-mag-lead__content">
                <h3 className="ed-mag-lead__title">
                  {l(
                    "Foundational Literacy & Numeracy: Building Strong Roots",
                    "बुनियादी साक्षरता और संख्या ज्ञान (FLN)",
                    "पायाभूत साक्षरता व संख्याज्ञान (FLN)"
                  )}
                </h3>
                <p className="ed-mag-lead__desc">
                  {l(
                    "Through Teaching Learning Materials (TLM), phonics games, reading circles, and activity cards, every child masters reading comprehension and core mathematical fluency with confidence and joy.",
                    "टीचिंग लर्निंग मटेरियल (TLM), ध्वनिकी खेल और गतिविधि कार्ड के माध्यम से प्रत्येक बच्चा आत्मविश्वास के साथ पठन और गणितीय दक्षता हासिल करता है।",
                    "टीचिंग लर्निंग मटेरियल (TLM), ध्वनी खेळ व ॲक्टिव्हिटी कार्ड्सद्वारे प्रत्येक विद्यार्थी आत्मविश्वासाने वाचन व मूलभूत गणिती कौशल्ये आत्मसात करतो."
                  )}
                </p>
                <Link to="/academics" className="ed-inline-link">
                  <span>{l("Explore FLN Curriculum", "FLN अभ्यासक्रम पहा", "FLN अभ्यासक्रम पहा")}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Side Column: Indexed Editorial Pedagogy Points */}
            <div className="ed-mag-list">

              <div className="ed-mag-item">
                <span className="ed-mag-index">01</span>
                <div>
                  <h4 className="ed-mag-item__title">
                    {l("Competency-Based Learning (CBL)", "दक्षता आधारित शिक्षण", "क्षमताधारित शिक्षण (CBL)")}
                  </h4>
                  <p className="ed-mag-item__desc">
                    {l(
                      "Learning by doing, real-life problem solving, and critical thinking replace rote memorisation.",
                      "करके सीखना, वास्तविक जीवन में समस्या समाधान और तार्किक सोच।",
                      "करून शिकणे, प्रत्यक्ष जीवनातील समस्या निराकरण व तार्किक विचारसरणी."
                    )}
                  </p>
                </div>
              </div>

              <div className="ed-mag-item">
                <span className="ed-mag-index">02</span>
                <div>
                  <h4 className="ed-mag-item__title">
                    {l("Student-Made Model Exhibitions", "विद्यार्थी निर्मित मॉडल प्रदर्शनी", "विद्यार्थी-निर्मित मॉडेल प्रदर्शन")}
                  </h4>
                  <p className="ed-mag-item__desc">
                    {l(
                      "Children independently construct working mathematical and scientific apparatus to demonstrate core principles.",
                      "विद्यार्थी स्वयं गणितीय और वैज्ञानिक मॉडल बनाकर सिद्धांतों को प्रदर्शित करते हैं।",
                      "विद्यार्थी स्वतः गणितीय व वैज्ञानिक मॉडेल्स बनवून संकल्पनांचे प्रात्यक्षिक सादरीकरण करतात."
                    )}
                  </p>
                </div>
              </div>

              <div className="ed-mag-item">
                <span className="ed-mag-index">03</span>
                <div>
                  <h4 className="ed-mag-item__title">
                    {l("Inclusive Education for CWSN", "समावेशी शिक्षा (CWSN)", "समावेशक शिक्षण (CWSN)")}
                  </h4>
                  <p className="ed-mag-item__desc">
                    {l(
                      "Full accessibility, barrier-free ramps, individualised support, and dignified peer integration for all learners.",
                      "दिव्यांग विद्यार्थियों के लिए रैम्प, विशेष शैक्षणिक सहायता और गरिमामय समावेश।",
                      "दिव्यांग विद्यार्थ्यांसाठी रॅम्प्स, विशेष शैक्षणिक सहाय्य आणि सन्मानपूर्वक समान संधी."
                    )}
                  </p>
                </div>
              </div>

              <div className="ed-mag-item">
                <span className="ed-mag-index">04</span>
                <div>
                  <h4 className="ed-mag-item__title">
                    {l("PAT & NIPUN Maharashtra Assessments", "मूल्यांकन आणि प्रगती", "मूल्यमापन आणि शैक्षणिक प्रगती")}
                  </h4>
                  <p className="ed-mag-item__desc">
                    {l(
                      "Continuous Periodic Assessment Tests diagnose learning gaps and ensure timely remedial support.",
                      "नियतकालिक मूल्यांकन चाचण्यांद्वारे विद्यार्थ्यांच्या प्रगतीचे अचूक मूल्यमापन.",
                      "नियतकालिक मूल्यांकन चाचण्यांद्वारे (PAT) विद्यार्थ्यांच्या प्रगतीचे अचूक मूल्यमापन."
                    )}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         5. DIGITAL INFRASTRUCTURE — ARCHITECTURAL SHOWCASE
         ========================================================= */}
      <section className="ed-section bg-parchment-light reveal-on-scroll" aria-labelledby="infra-head">
        <div className="container">
          <div className="ed-section-intro">
            <span className="editorial-eyebrow">
              {l("MODERN INFRASTRUCTURE", "आधुनिक पायाभूत सुविधा", "आधुनिक पायाभूत सुविधा")}
            </span>
            <h2 className="editorial-title" id="infra-head">
              {t.home.digitalTitle}
            </h2>
            <div className="editorial-rule editorial-rule--gold" aria-hidden />
            <p className="editorial-lead">
              {l(
                "PM SHRI resources bring cutting-edge interactive panels, computer laboratories, and sustainable rooftop energy to Babupeth's municipal students.",
                "पीएम श्री संसाधनों से बाबूपेठ के मनपा विद्यार्थियों के लिए आधुनिक इंटरएक्टिव पैनल, कंप्यूटर लैब और हरित ऊर्जा की उपलब्धता।",
                "पीएम श्री निधीतून बाबूपेठच्या मनपा विद्यार्थ्यांना आधुनिक डिजिटल पॅनेल्स, संगणक लॅब आणि पर्यावरणपूरक सौरऊर्जेची उपलब्धता."
              )}
            </p>
          </div>

          {/* Full-Width Centerpiece Photograph */}
          <div className="ed-infra-showcase">
            <div className="ed-infra-hero-photo">
              <img
                src="/assets/images/pptx1/image22.jpeg"
                alt="Students using interactive smart panel in classroom"
                loading="lazy"
              />
              <div className="ed-infra-hero-overlay">
                <div className="ed-infra-hero-badge">
                  <Monitor size={18} />
                  <div>
                    <strong>{l("Interactive Smart Classroom", "इंटरॅक्टिव्ह स्मार्ट वर्गखोली", "इंटरॅक्टिव्ह स्मार्ट वर्गखोली")}</strong>
                    <span>High-Definition Digital Learning • Audio-Visual Demonstrations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specification Rows (Cardless) */}
            <div className="ed-infra-specs">
              <div className="ed-spec-row">
                <div className="ed-spec-col ed-spec-col--title">
                  <Calculator size={18} className="ed-spec-icon" />
                  <h4>{l("ICT Computer Laboratory", "ICT कंप्यूटर प्रयोगशाला", "ICT संगणक लॅब")}</h4>
                </div>
                <div className="ed-spec-col ed-spec-col--desc">
                  <p>{l("Dedicated student workstations for digital literacy, typing mastery, and educational internet research under teacher supervision.", "विद्यार्थ्यांसाठी समर्पित संगणक वर्कस्टेशन, इंटरनेट व डिजिटल साक्षरता.", "विद्यार्थ्यांसाठी स्वतंत्र संगणक, टायपिंग सराव व मार्गदर्शित इंटरनेट शिक्षण.")}</p>
                </div>
                <div className="ed-spec-col ed-spec-col--stat">
                  <span>{l("Workstations Installed", "कार्यरत संगणक", "कार्यरत संगणक")}</span>
                </div>
              </div>

              <div className="ed-spec-row">
                <div className="ed-spec-col ed-spec-col--title">
                  <FlaskConical size={18} className="ed-spec-icon" />
                  <h4>{l("IDEAL Innovation Lab", "IDEAL नवाचार प्रयोगशाला", "IDEAL नवोपक्रम प्रयोगशाळा")}</h4>
                </div>
                <div className="ed-spec-col ed-spec-col--desc">
                  <p>{l("Hands-on tinkering kits, problem-solving puzzles, and experiential science modules to foster analytical curiosity.", "वैज्ञानिक प्रयोग किट्स, कोडी व प्रत्यक्ष प्रात्यक्षिकांद्वारे संशोधक वृत्तीचा विकास.", "वैज्ञानिक प्रयोग किट्स, कोडी व प्रत्यक्ष प्रात्यक्षिकांद्वारे संशोधक वृत्तीचा विकास.")}</p>
                </div>
                <div className="ed-spec-col ed-spec-col--stat">
                  <span>{l("STEM Tinkering Space", "STEM संशोधन केंद्र", "STEM संशोधन केंद्र")}</span>
                </div>
              </div>

              <div className="ed-spec-row">
                <div className="ed-spec-col ed-spec-col--title">
                  <Library size={18} className="ed-spec-icon" />
                  <h4>{l("Central Library & Reading Corners", "पुस्तकालय और वाचन कोना", "शालेय ग्रंथालय व वाचन कट्टा")}</h4>
                </div>
                <div className="ed-spec-col ed-spec-col--desc">
                  <p>{l("Rich collection of pictorial storybooks, biographies, scientific encyclopaedias, and classroom reading corners in every grade.", "सचित्र गोष्टींची पुस्तके, चरित्रग्रंथ, ज्ञानकोश व प्रत्येक वर्गात वर्ग-ग्रंथालय.", "सचित्र गोष्टींची पुस्तके, चरित्रग्रंथ, ज्ञानकोश व प्रत्येक वर्गात वर्ग-ग्रंथालय.")}</p>
                </div>
                <div className="ed-spec-col ed-spec-col--stat">
                  <span>{l("Open Access Reading", "मुक्त वाचन संस्कृती", "मुक्त वाचन संस्कृती")}</span>
                </div>
              </div>

              <div className="ed-spec-row">
                <div className="ed-spec-col ed-spec-col--title">
                  <Sun size={18} className="ed-spec-icon" />
                  <h4>{l("Rooftop Solar Power Facility", "रूफटॉप सौर ऊर्जा संयंत्र", "सौरऊर्जा प्रकल्प")}</h4>
                </div>
                <div className="ed-spec-col ed-spec-col--desc">
                  <p>{l("Renewable clean energy generation powering classroom fans and digital displays while educating children on green conservation.", "शाळेच्या छतावर सौरऊर्जा प्रकल्प, अखंड वीजपुरवठा व ऊर्जा बचतीचे धडे.", "शाळेच्या छतावर सौरऊर्जा प्रकल्प, अखंड वीजपुरवठा व ऊर्जा बचतीचे धडे.")}</p>
                </div>
                <div className="ed-spec-col ed-spec-col--stat">
                  <span>{l("100% Green Energy", "हरित ऊर्जा संचलन", "हरित ऊर्जा संचलन")}</span>
                </div>
              </div>
            </div>

            <div className="ed-infra-cta">
              <Link to="/facilities" className="ed-btn ed-btn--primary">
                <span>{l("Tour All School Facilities", "शाळेच्या सर्व सुविधा पहा", "शाळेच्या सर्व सुविधा पहा")}</span>
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         6. STUDENT LIFE & ACTIVITIES — MAGAZINE PHOTOJOURNAL
         ========================================================= */}
      <section className="ed-section bg-parchment reveal-on-scroll" aria-labelledby="life-head">
        <div className="container">
          <div className="ed-section-intro">
            <span className="editorial-eyebrow">
              {l("STUDENT CO-CURRICULAR JOURNAL", "विद्यार्थी जीवन आणि उपक्रम", "विद्यार्थी जीवन आणि उपक्रम")}
            </span>
            <h2 className="editorial-title" id="life-head">
              {t.home.activitiesTitle}
            </h2>
            <div className="editorial-rule editorial-rule--gold" aria-hidden />
            <p className="editorial-lead">
              {l(
                "Education extends beyond the blackboard. Through exhibitions, lecture series, and educational excursions, our students explore the world.",
                "शिक्षणाचा परीघ फक्त पुस्तकांपुरता मर्यादित नाही. प्रदर्शन, राष्ट्रीय व्याख्यानमाला आणि शैक्षणिक सहलीतून आमचे विद्यार्थी जग अनुभवतात.",
                "शिक्षणाचा परीघ फक्त पुस्तकांपुरता मर्यादित नाही. प्रदर्शन, राष्ट्रीय व्याख्यानमाला आणि शैक्षणिक सहलीतून आमचे विद्यार्थी जग अनुभवतात."
              )}
            </p>
          </div>

          <div className="ed-journal-grid">

            {/* Feature 1: Large Dominant Story — Educational Excursion */}
            <article className="ed-journal-lead">
              <div className="ed-journal-lead__media">
                <img
                  src="/assets/images/pptx2/image20.jpeg"
                  alt="Students at Charminar, Hyderabad on educational trip"
                  loading="lazy"
                />
                <span className="ed-journal-tag">{l("Educational Excursion", "शैक्षणिक भ्रमण", "शैक्षणिक सहल")}</span>
              </div>
              <div className="ed-journal-lead__body">
                <span className="ed-journal-date">Hyderabad • Charminar, Golconda & Salar Jung Museum</span>
                <h3 className="ed-journal-lead__title">
                  {l(
                    "Expanding Horizons: Annual Multi-City Educational Excursion",
                    "हैदराबाद शैक्षणिक सहल: इतिहास, विज्ञान व संस्कृतीचा अभ्यास",
                    "हैदराबाद शैक्षणिक सहल: इतिहास, विज्ञान व संस्कृतीचा अभ्यास"
                  )}
                </h3>
                <p className="ed-journal-lead__excerpt">
                  {l(
                    "Students visited Charminar, Golconda Fort, Salar Jung Museum, and Birla Planetarium — bridging textbook history and geography with unforgettable real-world exploration.",
                    "विद्यार्थ्यांनी चारमिनार, गोलकोंडा किल्ला, सालारजंग संग्रहालय आणि बिर्ला तारांगणाला प्रत्यक्ष भेट देऊन इतिहास व विज्ञानाचा अनुभव घेतला.",
                    "विद्यार्थ्यांनी चारमिनार, गोलकोंडा किल्ला, सालारजंग संग्रहालय आणि बिर्ला तारांगणाला प्रत्यक्ष भेट देऊन इतिहास व विज्ञानाचा अनुभव घेतला."
                  )}
                </p>
                <Link to="/activities" className="ed-inline-link">
                  <span>{l("Read Excursion Report", "सहलीचा सविस्तर अहवाल", "सहलीचा सविस्तर अहवाल")}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>

            {/* Feature 2: National Lecture Series */}
            <article className="ed-journal-card">
              <div className="ed-journal-card__media">
                <img
                  src="/assets/images/pptx2/image2.jpeg"
                  alt="Dignitaries speaking at National Lecture Series"
                  loading="lazy"
                />
                <span className="ed-journal-tag">{l("Lecture Series", "व्याख्यानमाला", "व्याख्यानमाला")}</span>
              </div>
              <div className="ed-journal-card__body">
                <h4 className="ed-journal-card__title">
                  {l("National Lecture Series: Inspiring Civic Character", "राष्ट्रीय व्याख्यानमाला: ज्ञान व प्रेरणेचा जागर", "राष्ट्रीय व्याख्यानमाला: ज्ञान व प्रेरणेचा जागर")}
                </h4>
                <p className="ed-journal-card__excerpt">
                  {l(
                    "Eminent public figures, educators, and social reformers regularly engage with students on ethics, constitutional values, and career ambition.",
                    "विविध क्षेत्रातील तज्ज्ञ वक्त्यांची व्याख्याने, संविधान मूल्ये व व्यक्तिमत्व विकास मार्गदर्शन.",
                    "विविध क्षेत्रातील तज्ज्ञ वक्त्यांची व्याख्याने, संविधान मूल्ये व व्यक्तिमत्व विकास मार्गदर्शन."
                  )}
                </p>
              </div>
            </article>

            {/* Feature 3: Mathematics Club Exhibition */}
            <article className="ed-journal-card">
              <div className="ed-journal-card__media">
                <img
                  src="/assets/images/pptx2/image16.jpeg"
                  alt="Students presenting fractions and geometry models"
                  loading="lazy"
                />
                <span className="ed-journal-tag">{l("Mathematics Club", "गणित मंडळ", "गणित मंडळ")}</span>
              </div>
              <div className="ed-journal-card__body">
                <h4 className="ed-journal-card__title">
                  {l("Mathematics Model Fair: Conquering Abstract Math", "गणित मॉडेल प्रदर्शन: प्रत्यक्ष कृतीतून अंकज्ञान", "गणित मॉडेल प्रदर्शन: प्रत्यक्ष कृतीतून अंकज्ञान")}
                </h4>
                <p className="ed-journal-card__excerpt">
                  {l(
                    "Self-crafted tactile models illustrating fractions, theorems, and spatial geometry demystify mathematics for every student.",
                    "विद्यार्थ्यांनी स्वनिर्मित मॉडेल्सद्वारे भूमिती, अपूर्णांक व सूत्रांचे सहज सादरीकरण केले.",
                    "विद्यार्थ्यांनी स्वनिर्मित मॉडेल्सद्वारे भूमिती, अपूर्णांक व सूत्रांचे सहज सादरीकरण केले."
                  )}
                </p>
              </div>
            </article>

          </div>

          <div className="ed-journal-footer">
            <Link to="/activities" className="ed-btn ed-btn--primary">
              <span>{l("View All Co-Curricular Activities", "सर्व शालेय उपक्रम पहा", "सर्व शालेय उपक्रम पहा")}</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
         7. ENVIRONMENT & SUSTAINABILITY — DEEP FOREST GREEN
         ========================================================= */}
      <section className="ed-section bg-forest-deep reveal-on-scroll" aria-labelledby="env-head">
        <div className="container">
          <div className="ed-env-spread">

            {/* Left Narrative */}
            <div className="ed-env-spread__narrative">
              <span className="editorial-eyebrow">
                <Leaf size={14} className="ed-icon-gold" aria-hidden />
                {l("SUSTAINABILITY & GREEN CAMPUS", "हरित परिसर व पर्यावरण संवर्धन", "हरित परिसर व पर्यावरण संवर्धन")}
              </span>
              <h2 className="editorial-title" id="env-head">
                {t.home.environmentTitle}
              </h2>
              <div className="editorial-rule editorial-rule--dark" aria-hidden />

              <p className="editorial-lead">
                {lang === "en"
                  ? "Environmental stewardship is lived daily at P.M. Shri Savitribai Phule School. From individual saplings planted in mothers' honor to rooftop solar panels and plastic-free dining, our students lead the green transformation."
                  : lang === "hi"
                    ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय में पर्यावरण संरक्षण दैनिक जीवन का हिस्सा है। 'एक पेड़ माँ के नाम' वृक्षारोपण से लेकर सौर ऊर्जा तक, हमारे छात्र हरित क्रांति का नेतृत्व करते हैं।"
                    : "पी.एम. श्री. सावित्रीबाई फुले शाळेत पर्यावरण संवर्धन हा दैनंदिन आचरणाचा भाग आहे. 'एक पेड माँ के नाम' वृक्षारोपणापासून ते सौरऊर्जेपर्यंत, आमचे विद्यार्थी हरित भविष्यासाठी पुढाकार घेतात."}
              </p>

              <div className="ed-env-initiatives">
                <div className="ed-env-item">
                  <TreePine size={18} className="ed-env-icon" />
                  <div>
                    <strong>{l("'Ek Ped Maa Ke Naam' Plantation Drive", "'एक पेड माँ के नाम' वृक्षारोपण", "'एक पेड माँ के नाम' वृक्षारोपण")}</strong>
                    <p>{l("Every student personally plants and nurtures an indigenous fruit or shade sapling across the campus.", "प्रत्येक विद्यार्थ्याने आईच्या नावाने एक रोप लावून त्याचे संगोपन करण्याची शपथ घेतली.", "प्रत्येक विद्यार्थ्याने आईच्या नावाने एक रोप लावून त्याचे संगोपन करण्याची शपथ घेतली.")}</p>
                  </div>
                </div>

                <div className="ed-env-item">
                  <Leaf size={18} className="ed-env-icon" />
                  <div>
                    <strong>{l("School Kitchen Garden (परसबाग)", "शालेय परसबाग व भाजीपाला", "शालेय परसबाग व भाजीपाला उत्पादन")}</strong>
                    <p>{l("Students cultivate fresh greens used in mid-day meals, gaining practical agro-science knowledge.", "परसबागेत विद्यार्थ्यांनी सेंद्रिय भाज्या पिकवून पोषण आहाराला जोड दिली आणि उद्योजकतेचे धडे घेतले.", "परसबागेत विद्यार्थ्यांनी सेंद्रिय भाज्या पिकवून पोषण आहाराला जोड दिली आणि उद्योजकतेचे धडे घेतले.")}</p>
                  </div>
                </div>

                <div className="ed-env-item">
                  <Shield size={18} className="ed-env-icon" />
                  <div>
                    <strong>{l("Plastic-Free Campus & Waste Segregation", "प्लास्टिक-मुक्त शाळा व कचरा व्यवस्थापन", "प्लास्टिकमुक्त शाळा व कचरा व्यवस्थापन")}</strong>
                    <p>{l("Elimination of single-use plastics, adoption of cloth bags, and composting of organic leaf waste.", "कापडी पिशव्यांचा वापर, ओला-सुका कचरा वर्गीकरण व खतनिर्मिती प्रकल्प.", "कापडी पिशव्यांचा वापर, ओला-सुका कचरा वर्गीकरण व खतनिर्मिती प्रकल्प.")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photo Mosaic */}
            <div className="ed-env-spread__mosaic">
              <div className="ed-env-mosaic-card ed-env-mosaic-card--tall">
                <img
                  src="/assets/images/pptx1/image77.jpeg"
                  alt="Students and staff planting saplings during Ek Ped Maa Ke Naam drive"
                  loading="lazy"
                />
                <span className="ed-env-mosaic-label">{l("Plantation Drive", "वृक्षारोपण मोहीम", "वृक्षारोपण मोहीम")}</span>
              </div>

              <div className="ed-env-mosaic-stack">
                <div className="ed-env-mosaic-card">
                  <img
                    src="/assets/images/pptx2/image10.jpeg"
                    alt="Eco Club student committee inauguration"
                    loading="lazy"
                  />
                  <span className="ed-env-mosaic-label">{l("Eco Club Inauguration", "पर्यावरण मंडळ", "पर्यावरण मंडळ")}</span>
                </div>
                <div className="ed-env-mosaic-card">
                  <img
                    src="/assets/images/pptx1/image79.jpeg"
                    alt="Kitchen garden fresh produce and green campus"
                    loading="lazy"
                  />
                  <span className="ed-env-mosaic-label">{l("Kitchen Garden", "शालेय परसबाग", "शालेय परसबाग")}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         8. SAFETY, INCLUSION & GOVERNANCE — EDITORIAL TWO-TONE
         ========================================================= */}
      <section className="ed-section bg-parchment-light reveal-on-scroll" aria-labelledby="governance-head">
        <div className="container">
          <div className="ed-safety-grid">

            {/* Column 1: Child Protection & Wellbeing */}
            <div className="ed-safety-col">
              <span className="editorial-eyebrow">
                <Shield size={14} aria-hidden />
                {l("STUDENT WELFARE & SAFETY", "सुरक्षितता व समावेश", "सुरक्षितता व समावेश")}
              </span>
              <h3 className="ed-safety-col__title" id="governance-head">
                {t.home.wellbeingTitle}
              </h3>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <div className="ed-safety-items">
                <div className="ed-safety-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <h4>{l("POCSO & Child Rights Awareness", "POCSO जनजागृती व बालहक्क", "POCSO जनजागृती व बालहक्क")}</h4>
                    <p>{l("Regular workshops teaching Good Touch / Bad Touch, student rights, and personal safety in age-appropriate formats.", "विद्यार्थ्यांना Good Touch/Bad Touch बद्दल मार्गदर्शन व बालहक्क जागृती कार्यशाळा.", "विद्यार्थ्यांना Good Touch/Bad Touch बद्दल मार्गदर्शन व बालहक्क जागृती कार्यशाळा.")}</p>
                  </div>
                </div>

                <div className="ed-safety-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <h4>{l("Internal Complaints & Grievance Box", "तक्रार निवारण व समुपदेशन", "तक्रार निवारण व समुपदेशन")}</h4>
                    <p>{l("Confidential complaint box and dedicated student protection committee to address concerns promptly without fear.", "सुरक्षित व गोपनीय तक्रार निवारण पेटी आणि तत्पर समुपदेशन व्यवस्था.", "सुरक्षित व गोपनीय तक्रार निवारण पेटी आणि तत्पर समुपदेशन व्यवस्था.")}</p>
                  </div>
                </div>

                <div className="ed-safety-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <h4>{l("Physical Health & Preventive Screening", "आरोग्य तपासणी व क्रीडा", "आरोग्य तपासणी व क्रीडा")}</h4>
                    <p>{l("Annual pediatric health checkups, nutritional monitoring, and daily sports for fitness and discipline.", "नियमित आरोग्य तपासणी, पोषण आहार व क्रीडा सरावाद्वारे सुदृढ पिढीची घडण.", "नियमित आरोग्य तपासणी, पोषण आहार व क्रीडा सरावाद्वारे सुदृढ पिढीची घडण.")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: School Management Committee & Governance */}
            <div className="ed-safety-col">
              <span className="editorial-eyebrow">
                <Users size={14} aria-hidden />
                {l("COMMUNITY PARTNERSHIP", "शाळा व्यवस्थापन समिती", "शाळा व्यवस्थापन समिती")}
              </span>
              <h3 className="ed-safety-col__title">
                {t.home.communityTitle}
              </h3>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <div className="ed-gov-card">
                <div className="ed-gov-card__media">
                  <img
                    src="/assets/images/pptx1/image44.jpeg"
                    alt="School Management Committee meeting in session"
                    loading="lazy"
                  />
                  <span className="ed-gov-badge">{l("SMC & Parent Council", "SMC समिती बैठक", "SMC समिती बैठक")}</span>
                </div>
                <div className="ed-gov-card__body">
                  <h4>{l("Transparent Democratic Governance", "पारदर्शक लोकशाही व्यवस्थापन", "पारदर्शक लोकशाही व्यवस्थापन")}</h4>
                  <p>
                    {lang === "en"
                      ? "The School Management Committee (SMC), comprising elected parents, teachers, and municipal representatives, oversees infrastructure, student nutrition, and school development plans openly."
                      : lang === "hi"
                        ? "पालक, शिक्षक आणि मनपा प्रतिनिधींनी मिळून बनलेली शाळा व्यवस्थापन समिती (SMC) शालेय विकास व विद्यार्थी कल्याणासाठी कटिबद्ध आहे."
                        : "पालक, शिक्षक आणि मनपा प्रतिनिधींनी मिळून बनलेली शाळा व्यवस्थापन समिती (SMC) शालेय विकास व विद्यार्थी कल्याणासाठी कटिबद्ध आहे."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         9. GALLERY HIGHLIGHTS — ASYMMETRIC PHOTOGRAPHIC ARCHIVE
         ========================================================= */}
      <section className="ed-section bg-parchment reveal-on-scroll" aria-labelledby="gallery-head">
        <div className="container container--wide">
          <div className="ed-section-intro ed-section-intro--center">
            <span className="editorial-eyebrow">
              {l("PHOTOGRAPHIC ARCHIVE", "शालेय क्षणचित्रे", "शालेय क्षणचित्रे")}
            </span>
            <h2 className="editorial-title" id="gallery-head">
              {t.home.galleryPreviewTitle}
            </h2>
            <div className="editorial-rule editorial-rule--gold" style={{ margin: "var(--space-4) auto" }} aria-hidden />
          </div>

          <div className="ed-gallery-mosaic">
            {previewItems.map((item, idx) => (
              <Link
                to="/gallery"
                key={item.id}
                className={`ed-mosaic-item ed-mosaic-item--${idx + 1}`}
                aria-label={item.caption}
              >
                <img
                  src={item.src}
                  alt={item.captionMr || item.caption}
                  loading="lazy"
                />
                <div className="ed-mosaic-overlay">
                  <p className="ed-mosaic-caption">
                    {lang === "en" ? item.caption : lang === "hi" ? (item.captionHi || item.caption) : (item.captionMr || item.caption)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="ed-gallery-cta">
            <Link to="/gallery" className="ed-btn ed-btn--primary">
              <span>{l("Enter Full Photographic Gallery", "संपूर्ण फोटो गॅलरी पहा", "संपूर्ण फोटो गॅलरी पहा")}</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
         10. FINAL INSTITUTIONAL INVITATION & CTA
         ========================================================= */}
      <section className="ed-cta-band bg-forest-deep reveal-on-scroll" aria-labelledby="cta-head">
        <div className="container">
          <div className="ed-cta-box">
            <div className="ed-cta-box__narrative">
              <span className="editorial-eyebrow">
                <GraduationCap size={15} className="ed-icon-gold" aria-hidden />
                {l("ADMISSIONS & CAMPUS VISITS", "प्रवेश व शाळा भेट", "प्रवेश व शाळा भेट")}
              </span>
              <h2 className="ed-cta-title" id="cta-head">
                {t.home.enquiryCta}
              </h2>
              <p className="ed-cta-lead">
                {t.home.enquirySubtitle}
              </p>
            </div>

            <div className="ed-cta-box__actions">
              <Link to="/contact" className="ed-btn ed-btn--gold">
                <span>{t.home.contactUs}</span>
                <ChevronRight size={18} aria-hidden />
              </Link>
              <Link to="/news" className="ed-btn ed-btn--outline-white">
                <span>{t.nav.news}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

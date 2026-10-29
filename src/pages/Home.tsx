import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Monitor, Users, Leaf, Shield, Award,
  ChevronRight, Building2, GraduationCap, Star, Sparkles,
  TreePine, FlaskConical, Calculator, Library, Sun,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { staticGalleryItems } from "../data/gallery";
import "./Home.css";

/* =========================================================
   HOME PAGE
   ========================================================= */

// Hero image — authentic school entrance gate with official board from pptx1
const HERO_IMG = "/assets/images/pptx1/image2.jpeg";

// Intro section images — real activities (smart classroom, rocket model, hands-on learning)
const INTRO_IMGS = [
  "/assets/images/pptx1/image22.jpeg",
  "/assets/images/pptx1/image7.jpeg",
  "/assets/images/pptx1/image13.jpeg",
];

// Preview gallery items (curated)
const previewItems = staticGalleryItems.slice(0, 6);

export default function Home() {
  const { t, lang } = useI18n();
  const { settings } = useSchoolSettings();

  return (
    <div className="home">
      {/* ===== A. HERO ===== */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg">
          <img
            src={HERO_IMG}
            alt="PM Shri Savitribai Phule School campus"
            className="hero__img"
            loading="eager"
          />
          <div className="hero-overlay" aria-hidden />
        </div>
        <div className="hero__content container">
          <div className="hero__badge animate-fadeInUp">
            <Star size={14} aria-hidden />
            <span>
              {lang === "en"
                ? "P.M. Shri — Municipal Corporation, Chandrapur"
                : lang === "hi"
                  ? "पी.एम. श्री — मनपा चंद्रपुर"
                  : "पी.एम. श्री — मनपा चंद्रपूर"}
            </span>
          </div>

          <h1 className="hero__title animate-fadeInUp delay-1">
            {t.home.heroHeadline}
          </h1>

          <p className="hero__sub animate-fadeInUp delay-2">
            {t.home.heroSub}
          </p>

          <div className="hero__actions animate-fadeInUp delay-3">
            <Link to="/about" className="btn btn-white btn--lg">
              {t.home.exploreCta}
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/activities" className="btn btn-outline-white btn--lg">
              {t.home.activitiesCta}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden>
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ===== B. INTRO / ABOUT ===== */}
      <section className="section home-intro" aria-labelledby="intro-title">
        <div className="container">
          <div className="home-intro__grid">
            <div className="home-intro__text">
              <span className="section-label">
                <Building2 size={14} aria-hidden />
                {lang === "en" ? "Welcome" : lang === "hi" ? "स्वागत" : "स्वागत"}
              </span>
              <h2 className="section-title" id="intro-title">{t.home.introTitle}</h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle">
                {lang === "en"
                  ? "P.M. Shri Savitribai Phule School is a municipal corporation school located in Babupeth, Chandrapur, Maharashtra. Named after the pioneering social reformer and educator Savitribai Phule, the school is committed to providing quality, inclusive education to every child."
                  : lang === "hi"
                    ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय बाबूपेठ, चंद्रपुर, महाराष्ट्र में स्थित नगर निगम का विद्यालय है। महान समाज सुधारक और शिक्षाविद सावित्रीबाई फुले के नाम पर समर्पित यह विद्यालय प्रत्येक बच्चे को गुणवत्तापूर्ण, समावेशी शिक्षा देने के लिए प्रतिबद्ध है।"
                    : "पी.एम. श्री. सावित्रीबाई फुले उच्च प्राथमिक व माध्यमिक शाळा, बाबूपेठ, चंद्रपूर, महाराष्ट्र येथे स्थित मनपाची शाळा आहे. महान समाजसुधारक व शिक्षणतज्ज्ञ सावित्रीबाई फुले यांच्या नावाने ओळखली जाणारी ही शाळा प्रत्येक विद्यार्थ्याला दर्जेदार, समावेशक शिक्षण देण्यास कटिबद्ध आहे."}
              </p>
              <blockquote className="intro-quote">
                {lang === "en"
                  ? "\"Providing a safe, modern, and nurturing school environment to help every student develop their full potential through quality education, hands-on learning, and community participation.\""
                  : lang === "hi"
                    ? "\"सुरक्षित, आधुनिक और पोषणयुक्त शालेय वातावरण के माध्यम से गुणवत्तापूर्ण शिक्षा, प्रायोगिक अधिगम और सामुदायिक सहभागिता से प्रत्येक विद्यार्थी की पूर्ण क्षमता विकसित करना।\""
                    : "\"सुरक्षित, आधुनिक व प्रेरणादायक शालेय वातावरणातून दर्जेदार शिक्षण, कृती-शिक्षण आणि समुदाय सहभागाद्वारे प्रत्येक विद्यार्थ्याची पूर्ण क्षमता विकसित करणे.\""}
              </blockquote>

              <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                <Link to="/about" className="btn btn-primary">
                  {t.common.learnMore} <ArrowRight size={16} aria-hidden />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  {t.nav.enquire}
                </Link>
              </div>
            </div>

            <div className="home-intro__gallery">
              {INTRO_IMGS.map((src, i) => (
                <div key={i} className={`home-intro__img home-intro__img--${i + 1}`}>
                  <img src={src} alt={`School activity ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== C. SCHOOL AT A GLANCE ===== */}
      <section className="section--sm home-glance" aria-labelledby="glance-title">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Sparkles size={14} aria-hidden />
              {lang === "en" ? "Quick Facts" : lang === "hi" ? "त्वरित तथ्य" : "थोडक्यात माहिती"}
            </span>
            <h2 className="section-title" id="glance-title">{t.home.glanceTitle}</h2>
            <div className="divider" aria-hidden />
          </div>

          <div className="glance-grid">
            {([
              {
                label: lang === "en" ? "School Name" : lang === "hi" ? "विद्यालय नाम" : "शाळेचे नाव",
                value: lang === "en" ? settings.name.english : lang === "hi" ? settings.name.hindi : settings.name.marathi,
                icon: <Building2 size={20} />,
              },
              {
                label: lang === "en" ? "Location" : lang === "hi" ? "स्थान" : "स्थान",
                value: `${settings.address.area}, ${settings.address.city}`,
                icon: <GraduationCap size={20} />,
              },
              {
                label: lang === "en" ? "Management" : lang === "hi" ? "प्रबंधन" : "व्यवस्थापन",
                value: settings.management,
                icon: <Award size={20} />,
              },
              {
                label: lang === "en" ? "Classes" : lang === "hi" ? "कक्षाएँ" : "इयत्ता",
                value: settings.classesServed,
                icon: <BookOpen size={20} />,
              },
              {
                label: lang === "en" ? "Medium" : lang === "hi" ? "माध्यम" : "माध्यम",
                value: settings.medium,
                icon: <Users size={20} />,
              },
              {
                label: lang === "en" ? "Academic Year" : lang === "hi" ? "शैक्षणिक वर्ष" : "शैक्षणिक वर्ष",
                value: settings.academicYear,
                icon: <Star size={20} />,
              },
            ] as Array<{ label: string; value: string; icon: React.ReactNode; note?: string }>).map((item, i) => (
              <div className="glance-card animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="glance-card__icon">{item.icon}</div>
                <div>
                  <p className="glance-card__label">{item.label}</p>
                  <p className="glance-card__value">{item.value}</p>
                  {item.note && (
                    <p className="glance-card__note">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== D. ACADEMIC EXCELLENCE ===== */}
      <section className="section home-academics" aria-labelledby="academics-title">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <BookOpen size={14} aria-hidden />
              {lang === "en" ? "Learning & Growth" : lang === "hi" ? "शिक्षण और विकास" : "शिक्षण आणि विकास"}
            </span>
            <h2 className="section-title" id="academics-title">{t.home.academicsTitle}</h2>
            <div className="divider" aria-hidden />
            <p className="section-subtitle">{t.academics.fln}</p>
          </div>

          <div className="grid-3">
            {[
              {
                title: lang === "en" ? "Foundational Literacy & Numeracy (FLN)" : lang === "hi" ? "बुनियादी साक्षरता और संख्या ज्ञान" : "पायाभूत साक्षरता व संख्याज्ञान (FLN)",
                desc: lang === "en"
                  ? "Activity-based learning, TLM, digital tools, and learning by doing — developing reading, writing, and core numeracy skills."
                  : lang === "hi"
                    ? "गतिविधि-आधारित शिक्षण, TLM, डिजिटल उपकरण — पढ़ना, लिखना और बुनियादी गणित कौशल विकसित करना।"
                    : "कृती-आधारित शिक्षण, TLM, डिजिटल साधने — वाचन, लेखन व मूलभूत गणितीय कौशल्ये विकसित करणे.",
                img: "/assets/images/pptx1/image10.jpeg",
                badge: "FLN",
              },
              {
                title: lang === "en" ? "Competency-Based Learning" : lang === "hi" ? "दक्षता आधारित शिक्षण" : "क्षमताधारित शिक्षण",
                desc: lang === "en"
                  ? "Learning by doing, critical thinking, problem solving, and real-life application — students apply knowledge in practice."
                  : lang === "hi"
                    ? "करके सीखना, तर्कपूर्ण सोच, समस्या समाधान और वास्तविक जीवन अनुप्रयोग।"
                    : "करून शिकणे, तार्किक विचार, समस्या निराकरण आणि वास्तविक जीवनातील उपयोजन.",
                img: "/assets/images/pptx1/image13.jpeg",
                badge: "CBL",
              },
              {
                title: lang === "en" ? "Student-Made Model Exhibitions" : lang === "hi" ? "विद्यार्थी निर्मित मॉडल प्रदर्शनी" : "विद्यार्थी-निर्मित मॉडेल प्रदर्शन",
                desc: lang === "en"
                  ? "Students prepare self-made models based on taught concepts and confidently present them at exhibitions."
                  : lang === "hi"
                    ? "विद्यार्थी पढ़े हुए अवधारणाओं पर आधारित मॉडल तैयार करते हैं और प्रदर्शनी में आत्मविश्वास के साथ प्रस्तुत करते हैं।"
                    : "विद्यार्थी शिकलेल्या संकल्पनांवर आधारित मॉडेल्स तयार करून प्रदर्शनात आत्मविश्वासाने सादर करतात.",
                img: "/assets/images/pptx1/image7.jpeg",
                badge: lang === "en" ? "Exhibition" : lang === "hi" ? "प्रदर्शनी" : "प्रदर्शन",
              },
              {
                title: lang === "en" ? "Inclusive Education" : lang === "hi" ? "समावेशी शिक्षा" : "समावेशक शिक्षण",
                desc: lang === "en"
                  ? "Every child learns with equal opportunities, respect, and support. Special attention for CWSN students."
                  : lang === "hi"
                    ? "हर बच्चे को समान अवसर, सम्मान और सहयोग के साथ शिक्षा मिलती है।"
                    : "प्रत्येक विद्यार्थ्याला समान संधी, सन्मान व आवश्यक सहाय्यासह शिक्षण दिले जाते.",
                img: "/assets/images/pptx1/image16.jpeg",
                badge: "CWSN",
              },
              {
                title: lang === "en" ? "Remedial & Enrichment Programmes" : lang === "hi" ? "उपचारात्मक और संवर्धन कार्यक्रम" : "उपचारात्मक व संवर्धन कार्यक्रम",
                desc: lang === "en"
                  ? "Targeted support for students who need extra help, alongside enrichment for advanced learners."
                  : lang === "hi"
                    ? "अतिरिक्त सहयोग की जरूरत वाले विद्यार्थियों के लिए लक्षित कार्यक्रम।"
                    : "अतिरिक्त मदतीची गरज असणाऱ्या विद्यार्थ्यांसाठी लक्षित सहाय्य आणि प्रगत विद्यार्थ्यांसाठी संवर्धन.",
                img: "/assets/images/pptx1/image15.jpeg",
                badge: lang === "en" ? "Support" : lang === "hi" ? "सहयोग" : "सहाय्य",
              },
              {
                title: lang === "en" ? "Learning Outcomes & Assessment" : lang === "hi" ? "शिक्षण परिणाम और मूल्यांकन" : "शिकण्याचे परिणाम व मूल्यमापन",
                desc: lang === "en"
                  ? "NIPUN Maharashtra & PAT assessment for effective measurement of foundational learning and academic progress."
                  : lang === "hi"
                    ? "NIPUN Maharashtra और PAT मूल्यांकन — मूलभूत शिक्षण का प्रभावी मापन।"
                    : "NIPUN Maharashtra व PAT मूल्यमापनाद्वारे पायाभूत शिक्षण व शैक्षणिक प्रगतीचे प्रभावी मूल्यमापन.",
                img: "/assets/images/pptx1/image19.jpeg",
                badge: "NIPUN",
              },
            ].map((card, i) => (
              <article className="academic-card card" key={i}>
                <div className="academic-card__img">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <span className="badge badge-green academic-card__badge">{card.badge}</span>
                </div>
                <div className="card-body">
                  <h3 className="academic-card__title">{card.title}</h3>
                  <p className="academic-card__desc">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
            <Link to="/academics" className="btn btn-primary">
              {t.common.viewAll} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== E. DIGITAL LEARNING ===== */}
      <section className="section home-digital" aria-labelledby="digital-title">
        <div className="container">
          <div className="home-digital__grid">
            <div className="home-digital__images">
              <div className="home-digital__img-main">
                <img src="/assets/images/pptx1/image22.jpeg" alt="Smart classroom with interactive panel" loading="lazy" />
              </div>
              <div className="home-digital__img-grid">
                <img src="/assets/images/pptx1/image24.jpeg" alt="ICT Lab" loading="lazy" />
                <img src="/assets/images/pptx1/image26.jpeg" alt="IDEAL Lab" loading="lazy" />
                <img src="/assets/images/pptx1/image28.jpeg" alt="QR Code learning" loading="lazy" />
                <img src="/assets/images/pptx1/image29.jpeg" alt="Library" loading="lazy" />
              </div>
            </div>
            <div className="home-digital__content">
              <span className="section-label">
                <Monitor size={14} aria-hidden />
                {lang === "en" ? "Infrastructure" : lang === "hi" ? "बुनियादी ढाँचा" : "पायाभूत सुविधा"}
              </span>
              <h2 className="section-title" id="digital-title">{t.home.digitalTitle}</h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle" style={{ marginBottom: "var(--space-8)" }}>
                {lang === "en"
                  ? "Modern infrastructure and technology tools to make learning engaging, effective, and future-ready."
                  : lang === "hi"
                    ? "शिक्षण को रोचक, प्रभावी और भविष्य के लिए तैयार बनाने वाली आधुनिक बुनियादी ढाँचा और तकनीक।"
                    : "शिक्षण आनंददायी, परिणामकारक व भविष्यसज्ज करण्यासाठी आधुनिक पायाभूत सुविधा व तंत्रज्ञान."}
              </p>

              <div className="digital-features">
                {[
                  {
                    icon: <Monitor size={20} />,
                    title: lang === "en" ? "Smart Classroom" : lang === "hi" ? "स्मार्ट कक्षा" : "स्मार्ट वर्गखोली",
                    desc: lang === "en" ? "Interactive Panel, Digital Content & Audio-Visual aids" : lang === "hi" ? "इंटरएक्टिव पैनल, डिजिटल सामग्री और दृश्य-श्रव्य सहायक" : "इंटरॅक्टिव पॅनेल, डिजिटल सामग्री व दृकश्राव्य साधने",
                  },
                  {
                    icon: <Calculator size={20} />,
                    title: lang === "en" ? "ICT Lab" : "ICT Lab",
                    desc: lang === "en" ? "E-learning, internet, educational software" : lang === "hi" ? "ई-लर्निंग, इंटरनेट, शैक्षणिक सॉफ्टवेयर" : "ई-लर्निंग, इंटरनेट, शैक्षणिक सॉफ्टवेअर",
                  },
                  {
                    icon: <FlaskConical size={20} />,
                    title: "IDEAL Lab",
                    desc: lang === "en" ? "Innovation, problem-solving and teamwork" : lang === "hi" ? "नवाचार, समस्या समाधान और टीमवर्क" : "नवोपक्रम, समस्या निराकरण आणि संघकार्य",
                  },
                  {
                    icon: <Library size={20} />,
                    title: lang === "en" ? "Library" : lang === "hi" ? "पुस्तकालय" : "ग्रंथालय",
                    desc: lang === "en" ? "Reading culture, self-study and knowledge exploration" : lang === "hi" ? "पठन संस्कृति, स्वाध्याय और ज्ञान अन्वेषण" : "वाचन संस्कृती, स्वयंअध्ययन व ज्ञानार्जन",
                  },
                  {
                    icon: <Sun size={20} />,
                    title: lang === "en" ? "Solar Energy" : lang === "hi" ? "सौर ऊर्जा" : "सौरऊर्जा",
                    desc: lang === "en" ? "Renewable energy awareness and electricity saving" : lang === "hi" ? "नवीकरणीय ऊर्जा जागरूकता और बिजली की बचत" : "नवीकरणीय ऊर्जेची जाणीव आणि वीज बचत",
                  },
                  {
                    icon: <Users size={20} />,
                    title: lang === "en" ? "Accessibility" : lang === "hi" ? "दिव्यांग सुविधाएँ" : "दिव्यांग सुविधा",
                    desc: lang === "en" ? "Ramps, railings, accessible sanitation for all students" : lang === "hi" ? "रैम्प, रेलिंग, सुलभ शौचालय — सभी के लिए" : "रॅम्प, रेलिंग, सुलभ स्वच्छतागृह — सर्वांसाठी",
                  },
                ].map((f, i) => (
                  <div className="feature-box" key={i}>
                    <div className="feature-icon">{f.icon}</div>
                    <div>
                      <p className="feature-box__title">{f.title}</p>
                      <p className="feature-box__desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "var(--space-6)" }}>
                <Link to="/facilities" className="btn btn-primary">
                  {lang === "en" ? "View All Facilities" : lang === "hi" ? "सभी सुविधाएँ देखें" : "सर्व सुविधा पहा"}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== F. STUDENT ACTIVITIES ===== */}
      <section className="section home-activities" aria-labelledby="activities-title">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Award size={14} aria-hidden />
              {lang === "en" ? "Student Life" : lang === "hi" ? "विद्यार्थी जीवन" : "विद्यार्थी जीवन"}
            </span>
            <h2 className="section-title" id="activities-title">{t.home.activitiesTitle}</h2>
            <div className="divider" aria-hidden />
            <p className="section-subtitle">
              {lang === "en"
                ? "From mathematics exhibitions to educational excursions — our students explore, create, and celebrate learning."
                : lang === "hi"
                  ? "गणित प्रदर्शनी से लेकर शैक्षणिक भ्रमण तक — हमारे विद्यार्थी अन्वेषण, निर्माण और उत्सव में भाग लेते हैं।"
                  : "गणित प्रदर्शनापासून शैक्षणिक सहलीपर्यंत — आमचे विद्यार्थी शोधतात, निर्माण करतात आणि शिकण्याचा उत्सव साजरा करतात."}
            </p>
          </div>

          <div className="activities-showcase">
            {[
              {
                img: "/assets/images/pptx2/image16.jpeg",
                title: lang === "en" ? "Mathematics Model Exhibition" : lang === "hi" ? "गणित मॉडल प्रदर्शनी" : "गणित मॉडेल प्रदर्शन",
                desc: lang === "en"
                  ? "Students built and presented models on fractions, percentages, area, and volume — building confidence and conceptual clarity."
                  : lang === "hi"
                    ? "विद्यार्थियों ने भिन्न, प्रतिशत, क्षेत्रफल और आयतन पर मॉडल प्रस्तुत किए।"
                    : "विद्यार्थ्यांनी भिन्न, टक्केवारी, क्षेत्रफळ व घनफळ यावर मॉडेल्स सादर केले.",
                tag: lang === "en" ? "Math Club" : "गणित मंडळ",
              },
              {
                img: "/assets/images/pptx2/image18.jpeg",
                title: lang === "en" ? "Science Club Exhibition" : lang === "hi" ? "विज्ञान क्लब प्रदर्शनी" : "विज्ञान मंडळ प्रदर्शन",
                desc: lang === "en"
                  ? "Students prepared science models for exhibition. Winners received prizes for outstanding presentations."
                  : lang === "hi"
                    ? "विद्यार्थियों ने विज्ञान मॉडल तैयार किए। उत्कृष्ट प्रस्तुति के लिए पुरस्कार दिए गए।"
                    : "विद्यार्थ्यांनी विज्ञान मॉडेल्स तयार केले. उत्कृष्ट सादरीकरणासाठी बक्षीसे देण्यात आली.",
                tag: lang === "en" ? "Science" : "विज्ञान",
              },
              {
                img: "/assets/images/pptx2/image2.jpeg",
                title: lang === "en" ? "National Lecture Series" : lang === "hi" ? "राष्ट्रीय व्याख्यानमाला" : "राष्ट्रीय व्याख्यानमाला",
                desc: lang === "en"
                  ? "Inspiring lecture series on knowledge, motivation, and patriotism — 'राष्ट्रीय व्याख्यानमाला' organised with distinguished guest speakers."
                  : lang === "hi"
                    ? "ज्ञान, प्रेरणा और देशभक्ति पर प्रेरणादायक व्याख्यानमाला। विशिष्ट अतिथि वक्ताओं के साथ आयोजित।"
                    : "ज्ञान, प्रेरणा आणि देशभक्तीचा संगम — राष्ट्रीय व्याख्यानमाला प्रतिष्ठित अतिथी वक्त्यांसह संपन्न.",
                tag: lang === "en" ? "Events" : lang === "hi" ? "कार्यक्रम" : "कार्यक्रम",
              },
              {
                img: "/assets/images/pptx2/image20.jpeg",
                title: lang === "en" ? "Educational Excursion — Hyderabad" : lang === "hi" ? "शैक्षणिक भ्रमण — हैदराबाद" : "शैक्षणिक सहल — हैदराबाद",
                desc: lang === "en"
                  ? "Students visited Charminar, Golconda Fort, Salar Jung Museum, Hussain Sagar Lake, and Birla Mandir — learning history, geography, and culture."
                  : lang === "hi"
                    ? "विद्यार्थियों ने चारमिनार, गोलकोंडा, सालारजंग, हुसेनसागर और बिर्ला मंदिर का भ्रमण किया।"
                    : "चारमिनार, गोलकोंडा किल्ला, सालारजंग संग्रहालय, हुसेनसागर व बिर्ला मंदिराला भेट.",
                tag: lang === "en" ? "Educational Trip" : lang === "hi" ? "शैक्षणिक भ्रमण" : "शैक्षणिक सहल",
              },
            ].map((act, i) => (
              <article className="activity-card" key={i}>
                <div className="activity-card__img">
                  <img src={act.img} alt={act.title} loading="lazy" />
                  <span className="badge badge-saffron activity-card__tag">{act.tag}</span>
                </div>
                <div className="activity-card__body">
                  <h3 className="activity-card__title">{act.title}</h3>
                  <p className="activity-card__desc">{act.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
            <Link to="/activities" className="btn btn-primary">
              {t.common.viewAll} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== G. ENVIRONMENT ===== */}
      <section className="section home-environment" aria-labelledby="env-title">
        <div className="container">
          <div className="home-environment__inner">
            <div className="home-environment__content">
              <span className="section-label" style={{ color: "rgba(255,255,255,.7)" }}>
                <Leaf size={14} aria-hidden />
                {lang === "en" ? "Green Campus" : lang === "hi" ? "हरित परिसर" : "हरित परिसर"}
              </span>
              <h2 className="section-title" id="env-title" style={{ color: "white" }}>
                {t.home.environmentTitle}
              </h2>
              <div className="divider" aria-hidden />

              <div className="env-features">
                {[
                  {
                    icon: <TreePine size={18} />,
                    title: lang === "en" ? "Tree Plantation" : lang === "hi" ? "वृक्षारोपण" : "वृक्षारोपण",
                    desc: lang === "en" ? "'Ek Ped Maa Ke Naam' — every student plants a tree" : lang === "hi" ? "'एक पेड माँ के नाम' — हर विद्यार्थी ने एक पेड़ लगाया" : "'एक पेड माँ के नाम' — प्रत्येक विद्यार्थ्याने वृक्षारोपण",
                  },
                  {
                    icon: <Leaf size={18} />,
                    title: "Eco Club",
                    desc: lang === "en" ? "Environmental protection and biodiversity awareness" : lang === "hi" ? "पर्यावरण संरक्षण और जैव विविधता जागरूकता" : "पर्यावरण संरक्षण व जैवविविधता जागरूकता",
                  },
                  {
                    icon: <Sun size={18} />,
                    title: lang === "en" ? "Solar Energy" : lang === "hi" ? "सौर ऊर्जा" : "सौरऊर्जा",
                    desc: lang === "en" ? "Renewable energy installation and awareness" : lang === "hi" ? "नवीकरणीय ऊर्जा स्थापना और जागरूकता" : "सौरऊर्जा व ऊर्जा बचत जनजागृती",
                  },
                  {
                    icon: <Shield size={18} />,
                    title: lang === "en" ? "Plastic-Free Campus" : lang === "hi" ? "प्लास्टिक-मुक्त परिसर" : "प्लास्टिकमुक्त परिसर",
                    desc: lang === "en" ? "Cloth bags, proper waste management, awareness" : lang === "hi" ? "कपड़े के थैले, कचरा प्रबंधन, जागरूकता" : "कापडी पिशव्या, कचरा व्यवस्थापन, जनजागृती",
                  },
                  {
                    icon: <Star size={18} />,
                    title: lang === "en" ? "Kitchen Garden" : lang === "hi" ? "किचन गार्डन / परसबाग" : "परसबाग / Kitchen Garden",
                    desc: lang === "en" ? "Students learn entrepreneurship through the school market" : lang === "hi" ? "शालेय बाजार के माध्यम से उद्यमशीलता का पाठ" : "शालेय बाजार उपक्रमाद्वारे उद्योजकतेचे धडे",
                  },
                  {
                    icon: <Users size={18} />,
                    title: lang === "en" ? "Water Conservation" : lang === "hi" ? "जल संरक्षण" : "जलसंवर्धन",
                    desc: lang === "en" ? "Rainwater harvesting and water-use awareness" : lang === "hi" ? "वर्षा जल संचयन और जल उपयोग जागरूकता" : "पावसाचे पाणी साठवण व जनजागृती",
                  },
                ].map((f, i) => (
                  <div className="env-feature" key={i}>
                    <div className="env-feature__icon">{f.icon}</div>
                    <div>
                      <p className="env-feature__title">{f.title}</p>
                      <p className="env-feature__desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-environment__gallery">
              <div className="env-gallery-grid">
                <img src="/assets/images/pptx2/image10.jpeg" alt="Eco Club inauguration" loading="lazy" />
                <img src="/assets/images/pptx2/image11.jpeg" alt="Tree plantation" loading="lazy" />
                <img src="/assets/images/pptx1/image77.jpeg" alt="Plantation drive" loading="lazy" />
                <img src="/assets/images/pptx1/image79.jpeg" alt="Eco Club activities" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== H. WELLBEING & COMMUNITY ===== */}
      <section className="section home-wellbeing" aria-labelledby="wellbeing-title">
        <div className="container">
          <div className="home-wellbeing__grid">
            {/* Wellbeing */}
            <div>
              <span className="section-label">
                <Shield size={14} aria-hidden />
                {lang === "en" ? "Safety & Inclusion" : lang === "hi" ? "सुरक्षा और समावेश" : "सुरक्षितता व समावेश"}
              </span>
              <h2 className="section-title" id="wellbeing-title">{t.home.wellbeingTitle}</h2>
              <div className="divider" aria-hidden />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
                {[
                  {
                    title: lang === "en" ? "POCSO Awareness Programme" : lang === "hi" ? "POCSO जागरूकता कार्यक्रम" : "POCSO जागरूकता कार्यक्रम",
                    desc: lang === "en" ? "Good touch / bad touch guidance for students" : lang === "hi" ? "विद्यार्थियों के लिए good touch/bad touch मार्गदर्शन" : "विद्यार्थ्यांना Good Touch/Bad Touch बद्दल मार्गदर्शन",
                  },
                  {
                    title: lang === "en" ? "Child Protection Committee" : lang === "hi" ? "बाल संरक्षण समिति" : "बाल संरक्षण समिती",
                    desc: lang === "en" ? "Safe, respectful, and fear-free school environment" : lang === "hi" ? "सुरक्षित, सम्मानजनक और भयमुक्त विद्यालय वातावरण" : "सुरक्षित, सन्मानजनक व भयमुक्त शालेय वातावरण",
                  },
                  {
                    title: lang === "en" ? "Safe Complaint Resolution" : lang === "hi" ? "सुरक्षित शिकायत निवारण" : "सुरक्षित तक्रार निवारण",
                    desc: lang === "en" ? "Students' rights, safety and trust — positive school atmosphere" : lang === "hi" ? "विद्यार्थियों के अधिकार, सुरक्षा और विश्वास" : "विद्यार्थ्यांचे हक्क, सुरक्षितता व विश्वास",
                  },
                  {
                    title: lang === "en" ? "Sports & Leadership" : lang === "hi" ? "खेलकूद और नेतृत्व" : "क्रीडा व नेतृत्व",
                    desc: lang === "en" ? "Confidence, discipline, teamwork and leadership through sports" : lang === "hi" ? "खेलकूद से आत्मविश्वास, अनुशासन और नेतृत्व का विकास" : "क्रीडाद्वारे आत्मविश्वास, शिस्त, संघभावना व नेतृत्वगुण",
                  },
                ].map((item, i) => (
                  <div className="wellbeing-item" key={i}>
                    <div className="wellbeing-item__dot" aria-hidden />
                    <div>
                      <h3 className="wellbeing-item__title">{item.title}</h3>
                      <p className="wellbeing-item__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community */}
            <div>
              <span className="section-label">
                <Users size={14} aria-hidden />
                {lang === "en" ? "Community" : lang === "hi" ? "समुदाय" : "समुदाय"}
              </span>
              <h2 className="section-title">{t.home.communityTitle}</h2>
              <div className="divider" aria-hidden />
              <div className="community-card" style={{ marginTop: "var(--space-6)" }}>
                <div className="community-card__img">
                  <img src="/assets/images/pptx1/image44.jpeg" alt="School Management Committee meeting" loading="lazy" />
                </div>
                <div className="community-card__body">
                  <h3>
                    {lang === "en" ? "School Management Committee (SMC)" : lang === "hi" ? "विद्यालय प्रबंधन समिति (SMC)" : "शाळा व्यवस्थापन समिती (SMC)"}
                  </h3>
                  <p>
                    {lang === "en"
                      ? "SMC actively works for school development, quality education, infrastructure, student welfare, and parent participation."
                      : lang === "hi"
                        ? "SMC विद्यालय विकास, गुणवत्तापूर्ण शिक्षण, पायाभूत सुविधाओं, विद्यार्थी कल्याण और अभिभावक सहभागिता के लिए सक्रिय रूप से कार्य करती है।"
                        : "SMC शाळेच्या विकास, गुणवत्तापूर्ण शिक्षण, पायाभूत सुविधा, विद्यार्थी कल्याण आणि पालक सहभाग वाढविण्यासाठी सक्रियपणे कार्य करते."}
                  </p>
                </div>
              </div>
              <div className="community-card" style={{ marginTop: "var(--space-4)" }}>
                <div className="community-card__img">
                  <img src="/assets/images/pptx1/image45.jpeg" alt="Parent participation" loading="lazy" />
                </div>
                <div className="community-card__body">
                  <h3>{lang === "en" ? "Transparent Governance" : lang === "hi" ? "पारदर्शी प्रबंधन" : "पारदर्शक व्यवस्थापन"}</h3>
                  <p>
                    {lang === "en"
                      ? "All school records, financial transactions, notices and decisions are shared openly with parents and the community."
                      : lang === "hi"
                        ? "सभी विद्यालय अभिलेख, वित्तीय व्यवहार, सूचनाएँ और निर्णय अभिभावकों और समुदाय के साथ खुलकर साझा किए जाते हैं।"
                        : "सर्व शालेय नोंदी, आर्थिक व्यवहार, सूचना व निर्णय पालक आणि समाजासमोर खुलेपणाने मांडले जातात."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== I. GALLERY PREVIEW ===== */}
      <section className="section--sm home-gallery-preview" aria-labelledby="gallery-prev-title">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Star size={14} aria-hidden />
              {lang === "en" ? "Highlights" : lang === "hi" ? "झलकियाँ" : "झलक"}
            </span>
            <h2 className="section-title" id="gallery-prev-title">{t.home.galleryPreviewTitle}</h2>
            <div className="divider" aria-hidden />
          </div>

          <div className="gallery-preview-grid">
            {previewItems.map((item) => (
              <Link to="/gallery" key={item.id} className="gallery-preview-item" aria-label={item.caption}>
                <img
                  src={item.src}
                  alt={item.captionMr || item.caption}
                  loading="lazy"
                />
                <div className="gallery-preview-item__overlay">
                  <p className="gallery-preview-item__caption">
                    {lang === "en" ? item.caption : lang === "hi" ? (item.captionHi || item.caption) : (item.captionMr || item.caption)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link to="/gallery" className="btn btn-primary">
              {lang === "en" ? "View Full Gallery" : lang === "hi" ? "पूरी गैलरी देखें" : "संपूर्ण गॅलरी पहा"}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== J. ENQUIRY CTA ===== */}
      <section className="home-cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="home-cta__inner">
            <div className="home-cta__content">
              <h2 className="home-cta__title" id="cta-title">{t.home.enquiryCta}</h2>
              <p className="home-cta__sub">{t.home.enquirySubtitle}</p>
            </div>
            <div className="home-cta__actions">
              <Link to="/contact" className="btn btn-white btn--lg">
                {t.home.contactUs}
                <ChevronRight size={18} aria-hidden />
              </Link>
              <Link to="/news" className="btn btn-outline-white btn--lg">
                {t.nav.news}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

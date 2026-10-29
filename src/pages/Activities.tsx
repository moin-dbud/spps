import "./Activities.css";
import { useState } from "react";
import {
  BookOpen, Leaf, Music, MapPin, Sparkles, ShieldCheck,
  Newspaper, X, GraduationCap, Users, Award, Lightbulb,
} from "lucide-react";
import { useI18n } from "../i18n";

/* =========================================================
   ACTIVITIES & INITIATIVES PAGE
   ========================================================= */

type ActivityCategory = "all" | "academics" | "environment" | "cultural" | "trips" | "cleanliness" | "safety" | "events";

interface ActivityItem {
  id: string;
  titleEn: string;
  titleMr: string;
  titleHi: string;
  descEn: string;
  descMr: string;
  descHi: string;
  images: string[];
  category: ActivityCategory;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "lecture-series",
    titleEn: "National Lecture Series",
    titleMr: "राष्ट्रीय व्याख्यानमाला",
    titleHi: "राष्ट्रीय व्याख्यानमाला",
    descEn: "Inspiring lecture series on knowledge, motivation and patriotism. Distinguished speakers from various fields shared their experiences with students.",
    descMr: "ज्ञान, प्रेरणा आणि देशभक्तीवर प्रेरणादायी व्याख्यानमाला. विविध क्षेत्रातील प्रतिष्ठित वक्त्यांनी विद्यार्थ्यांसोबत अनुभव शेअर केले.",
    descHi: "ज्ञान, प्रेरणा और देशभक्ति पर प्रेरक व्याख्यानमाला। विभिन्न क्षेत्रों के प्रतिष्ठित वक्ताओं ने छात्रों के साथ अनुभव साझा किए।",
    images: [
      "/assets/images/pptx2/image2.jpeg",
      "/assets/images/pptx2/image3.jpeg",
      "/assets/images/pptx2/image4.jpeg",
      "/assets/images/pptx2/image5.jpeg",
    ],
    category: "events",
  },
  {
    id: "eco-club",
    titleEn: "Eco Club Inauguration",
    titleMr: "पर्यावरण मंडळ उद्घाटन",
    titleHi: "पर्यावरण मंडल उद्घाटन",
    descEn: "Eco Club inauguration celebrating environmental awareness, plantation drives, and plastic-free campus initiatives led by students and teachers.",
    descMr: "पर्यावरण जागृती, वृक्षारोपण आणि प्लास्टिकमुक्त शाळा उपक्रमासाठी पर्यावरण मंडळाचे उद्घाटन.",
    descHi: "पर्यावरण जागरूकता, वृक्षारोपण और प्लास्टिक-मुक्त परिसर उपक्रम के लिए पर्यावरण मंडल का उद्घाटन।",
    images: [
      "/assets/images/pptx2/image10.jpeg",
      "/assets/images/pptx2/image11.jpeg",
      "/assets/images/pptx2/image12.jpeg",
      "/assets/images/pptx2/image13.jpeg",
    ],
    category: "environment",
  },
  {
    id: "tree-plantation",
    titleEn: "Tree Plantation Drive",
    titleMr: "वृक्षारोपण — 'एक पेड माँ के नाम'",
    titleHi: "वृक्षारोपण — 'एक पेड माँ के नाम'",
    descEn: "'One Tree in Mother's Name' plantation drive — students, teachers, and parents together planting saplings for a greener tomorrow.",
    descMr: "'एक पेड माँ के नाम' — विद्यार्थी, शिक्षक आणि पालकांनी एकत्र येऊन रोपण केले. हरित भविष्यासाठी एक पाऊल.",
    descHi: "'एक पेड माँ के नाम' — छात्रों, शिक्षकों और अभिभावकों ने मिलकर पेड़ लगाए। हरित भविष्य की ओर एक कदम।",
    images: [
      "/assets/images/pptx1/image77.jpeg",
      "/assets/images/pptx1/image78.jpeg",
      "/assets/images/pptx1/image79.jpeg",
    ],
    category: "environment",
  },
  {
    id: "math-exhibition",
    titleEn: "Mathematics Model Exhibition",
    titleMr: "गणित मॉडेल प्रदर्शनी",
    titleHi: "गणित मॉडल प्रदर्शनी",
    descEn: "Students built and presented models on fractions, percentages, area, and volume — demonstrating mathematical concepts with creativity and confidence.",
    descMr: "विद्यार्थ्यांनी अपूर्णांक, टक्केवारी, क्षेत्रफळ, घनफळ यावर मॉडेल तयार करून सादर केले — गणिताची संकल्पना सृजनशीलतेने मांडली.",
    descHi: "छात्रों ने भिन्न, प्रतिशत, क्षेत्रफल और आयतन पर मॉडल बनाए और प्रस्तुत किए — गणितीय अवधारणाओं को रचनात्मकता से दर्शाया।",
    images: [
      "/assets/images/pptx2/image16.jpeg",
      "/assets/images/pptx2/image17.jpeg",
    ],
    category: "academics",
  },
  {
    id: "science-club",
    titleEn: "Science Club Exhibition",
    titleMr: "विज्ञान मंडळ प्रदर्शनी",
    titleHi: "विज्ञान मंडल प्रदर्शनी",
    descEn: "Science model exhibition with prizes awarded for outstanding student presentations. Students showcased innovative experiments and models.",
    descMr: "विज्ञान मॉडेल प्रदर्शनी — उत्कृष्ट विद्यार्थ्यांना पारितोषिक. विद्यार्थ्यांनी नाविन्यपूर्ण प्रयोग आणि मॉडेल सादर केले.",
    descHi: "विज्ञान मॉडल प्रदर्शनी — उत्कृष्ट छात्रों को पुरस्कार। छात्रों ने अभिनव प्रयोग और मॉडल प्रस्तुत किए।",
    images: [
      "/assets/images/pptx2/image18.jpeg",
      "/assets/images/pptx2/image19.jpeg",
    ],
    category: "academics",
  },
  {
    id: "hyderabad-excursion",
    titleEn: "Educational Excursion — Hyderabad",
    titleMr: "शैक्षणिक सहल — हैदराबाद",
    titleHi: "शैक्षणिक भ्रमण — हैदराबाद",
    descEn: "Students visited Charminar, Golconda Fort, Salar Jung Museum, Hussain Sagar Lake, and Birla Mandir — exploring history, geography, and culture.",
    descMr: "चारमिनार, गोलकोंडा किल्ला, सालार जंग संग्रहालय, हुसेन सागर तलाव, बिर्ला मंदिर — इतिहास, भूगोल आणि संस्कृतीचा अनुभव.",
    descHi: "चारमीनार, गोलकुंडा किला, सालार जंग संग्रहालय, हुसैन सागर झील, बिरला मंदिर — इतिहास, भूगोल और संस्कृति का अनुभव।",
    images: [
      "/assets/images/pptx2/image20.jpeg",
      "/assets/images/pptx2/image21.jpeg",
      "/assets/images/pptx2/image22.jpeg",
      "/assets/images/pptx2/image23.jpeg",
      "/assets/images/pptx2/image24.jpeg",
    ],
    category: "trips",
  },
  {
    id: "cleanliness",
    titleEn: "Cleanliness Fortnight",
    titleMr: "स्वच्छता पंधरवाडा",
    titleHi: "स्वच्छता पखवाड़ा",
    descEn: "School-wide cleanliness fortnight — 'Clean School, Clean Environment' campaign engaged every student and teacher in maintaining a spotless campus.",
    descMr: "'स्वच्छ शाळा, स्वच्छ परिसर' — शाळाव्यापी स्वच्छता पंधरवाडा. प्रत्येक विद्यार्थी आणि शिक्षक सहभागी झाले.",
    descHi: "'स्वच्छ विद्यालय, स्वच्छ परिसर' — सभी छात्रों और शिक्षकों की भागीदारी से स्वच्छता पखवाड़ा मनाया गया।",
    images: [
      "/assets/images/pptx2/image26.jpeg",
      "/assets/images/pptx2/image27.jpeg",
      "/assets/images/pptx2/image28.jpeg",
    ],
    category: "cleanliness",
  },
  {
    id: "pocso",
    titleEn: "POCSO Awareness Programme",
    titleMr: "पॉक्सो जनजागृती कार्यक्रम",
    titleHi: "पॉक्सो जागरूकता कार्यक्रम",
    descEn: "Good touch / bad touch awareness programme creating a safe, fear-free school environment. Empowering students with knowledge to protect themselves.",
    descMr: "Good Touch / Bad Touch जनजागृती — निर्भय, सुरक्षित शाळेचे वातावरण निर्माण करण्यासाठी विद्यार्थ्यांना सक्षम केले.",
    descHi: "Good Touch / Bad Touch जागरूकता — छात्रों को सुरक्षित और निडर विद्यालय वातावरण के लिए सशक्त बनाया गया।",
    images: [
      "/assets/images/pptx2/image30.jpeg",
      "/assets/images/pptx2/image31.jpeg",
    ],
    category: "safety",
  },
  {
    id: "hastha-dip",
    titleEn: "Hastha Dip — Student Magazine",
    titleMr: "हस्तदीप — विद्यार्थी हस्तलिखित",
    titleHi: "हस्तदीप — विद्यार्थी हस्तलिखित",
    descEn: "Student handwritten magazine — a creative outlet for writing, poetry, and artwork. Nurturing young voices and celebrating literary talent.",
    descMr: "विद्यार्थी हस्तलिखित — सृजनशील लेखन, कविता, चित्रकला यांचे माध्यम. विद्यार्थ्यांची प्रतिभा जगापुढे मांडण्याचा प्रयत्न.",
    descHi: "विद्यार्थी हस्तलिखित — रचनात्मक लेखन, कविता और चित्रकला का माध्यम। छात्रों की प्रतिभा को मंच देने का प्रयास।",
    images: [
      "/assets/images/pptx2/image32.jpeg",
      "/assets/images/pptx2/image33.jpeg",
    ],
    category: "cultural",
  },
  {
    id: "kitchen-garden",
    titleEn: "Kitchen Garden & School Market",
    titleMr: "परसबाग / किचन गार्डन आणि शाळा बाजार",
    titleHi: "किचन गार्डन और विद्यालय बाज़ार",
    descEn: "Students learn organic farming in the school's kitchen garden, and sell fresh produce at the school market — building entrepreneurship skills.",
    descMr: "शाळेच्या किचन गार्डनमध्ये विद्यार्थी सेंद्रिय शेती शिकतात आणि शाळा बाजारात ताजी उत्पादने विकतात — उद्योजकता कौशल्य विकसित होते.",
    descHi: "शाळा के किचन गार्डन में छात्र जैविक खेती सीखते हैं और शाला बाजार में ताजी उपज बेचते हैं — उद्यमिता कौशल विकसित होता है।",
    images: [
      "/assets/images/pptx2/image36.jpeg",
      "/assets/images/pptx2/image37.jpeg",
      "/assets/images/pptx2/image38.jpeg",
    ],
    category: "environment",
  },
  {
    id: "newspaper-coverage",
    titleEn: "Newspaper Coverage",
    titleMr: "वर्तमानपत्र कव्हरेज",
    titleHi: "समाचार पत्र कवरेज",
    descEn: "School activities and achievements featured in local newspapers — recognising students and teachers for their outstanding contributions.",
    descMr: "शाळेचे उपक्रम आणि यश स्थानिक वर्तमानपत्रांत प्रकाशित — विद्यार्थी आणि शिक्षकांच्या योगदानाची दखल.",
    descHi: "शाळा के उपक्रम और उपलब्धियाँ स्थानीय समाचार पत्रों में प्रकाशित — छात्रों और शिक्षकों के योगदान की पहचान।",
    images: [
      "/assets/images/pptx2/image40.jpeg",
      "/assets/images/pptx2/image41.jpeg",
      "/assets/images/pptx2/image42.jpeg",
      "/assets/images/pptx2/image43.jpeg",
      "/assets/images/pptx2/image44.jpeg",
      "/assets/images/pptx2/image45.jpeg",
    ],
    category: "events",
  },
];

const CATEGORIES: { id: ActivityCategory; labelEn: string; labelMr: string; labelHi: string; Icon: React.ElementType }[] = [
  { id: "all",          labelEn: "All",         labelMr: "सर्व",          labelHi: "सभी",         Icon: Sparkles },
  { id: "academics",   labelEn: "Academics",   labelMr: "शैक्षणिक",      labelHi: "शैक्षणिक",   Icon: BookOpen },
  { id: "environment", labelEn: "Environment", labelMr: "पर्यावरण",      labelHi: "पर्यावरण",   Icon: Leaf },
  { id: "cultural",    labelEn: "Cultural",    labelMr: "सांस्कृतिक",    labelHi: "सांस्कृतिक", Icon: Music },
  { id: "trips",       labelEn: "Excursions",  labelMr: "शैक्षणिक सहल", labelHi: "भ्रमण",       Icon: MapPin },
  { id: "cleanliness", labelEn: "Cleanliness", labelMr: "स्वच्छता",      labelHi: "स्वच्छता",   Icon: Sparkles },
  { id: "safety",      labelEn: "Safety",      labelMr: "सुरक्षा",       labelHi: "सुरक्षा",    Icon: ShieldCheck },
  { id: "events",      labelEn: "Events",      labelMr: "कार्यक्रम",     labelHi: "कार्यक्रम",  Icon: Newspaper },
];

const CATEGORY_BADGE_COLOR: Record<ActivityCategory, string> = {
  all:          "badge-green",
  academics:    "badge-green",
  environment:  "badge-green",
  cultural:     "badge-saffron",
  trips:        "badge-saffron",
  cleanliness:  "badge-green",
  safety:       "badge-saffron",
  events:       "badge-saffron",
};

const TEACHER_DEV_ITEMS = [
  {
    Icon: GraduationCap,
    titleEn: "Professional Training",
    titleMr: "व्यावसायिक प्रशिक्षण",
    titleHi: "व्यावसायिक प्रशिक्षण",
    descEn: "Teachers regularly participate in state and district-level training programmes to enhance pedagogical skills.",
    descMr: "शिक्षक राज्य व जिल्हा स्तरीय प्रशिक्षण कार्यक्रमात सहभागी होतात.",
    descHi: "शिक्षक राज्य और जिला स्तरीय प्रशिक्षण कार्यक्रमों में भाग लेते हैं।",
  },
  {
    Icon: Users,
    titleEn: "Professional Learning Community",
    titleMr: "व्यावसायिक शिक्षण समुदाय",
    titleHi: "व्यावसायिक शिक्षण समुदाय",
    descEn: "Teachers collaborate in PLCs to share best practices, develop lesson plans, and improve student outcomes.",
    descMr: "शिक्षक सर्वोत्तम पद्धती सामायिक करण्यासाठी एकत्र येतात.",
    descHi: "शिक्षक सर्वोत्तम पद्धतियाँ साझा करने के लिए एकत्र आते हैं।",
  },
  {
    Icon: Lightbulb,
    titleEn: "Innovation Workshops",
    titleMr: "नाविन्यपूर्ण कार्यशाळा",
    titleHi: "नवाचार कार्यशालाएँ",
    descEn: "Hands-on workshops on digital tools, activity-based learning methods, and inclusive classroom strategies.",
    descMr: "डिजिटल साधने, कृतिआधारित शिक्षण आणि सर्वसमावेशक वर्गखोली धोरणांवर व्यावहारिक कार्यशाळा.",
    descHi: "डिजिटल उपकरण, गतिविधि-आधारित शिक्षण और समावेशी कक्षा रणनीतियों पर व्यावहारिक कार्यशालाएँ।",
  },
  {
    Icon: Award,
    titleEn: "Recognition & Awards",
    titleMr: "सन्मान व पुरस्कार",
    titleHi: "सम्मान और पुरस्कार",
    descEn: "Dedicated teachers recognised for their innovative teaching methods and commitment to student welfare.",
    descMr: "नाविन्यपूर्ण शिक्षण पद्धती व विद्यार्थी कल्याणासाठी समर्पित शिक्षकांचा सन्मान.",
    descHi: "नवाचारी शिक्षण विधियों और छात्र कल्याण के प्रति समर्पित शिक्षकों का सम्मान।",
  },
];

/* ---- Helpers ---- */
function getLangTitle(item: ActivityItem, lang: string) {
  if (lang === "mr") return item.titleMr;
  if (lang === "hi") return item.titleHi;
  return item.titleEn;
}
function getLangDesc(item: ActivityItem, lang: string) {
  if (lang === "mr") return item.descMr;
  if (lang === "hi") return item.descHi;
  return item.descEn;
}
function getCategoryLabel(cat: (typeof CATEGORIES)[number], lang: string) {
  if (lang === "mr") return cat.labelMr;
  if (lang === "hi") return cat.labelHi;
  return cat.labelEn;
}

/* ---- Component ---- */
export default function Activities() {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>("all");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === activeCategory);

  function getCatCount(id: ActivityCategory) {
    if (id === "all") return ACTIVITIES.length;
    return ACTIVITIES.filter((a) => a.category === id).length;
  }

  const pageTitle =
    lang === "mr"
      ? "उपक्रम व अभियान"
      : lang === "hi"
      ? "गतिविधियाँ एवं पहल"
      : "Activities & Initiatives";

  const pageSub =
    lang === "mr"
      ? "विद्यार्थ्यांचा सर्वांगीण विकास — शैक्षणिक, सांस्कृतिक, पर्यावरणीय उपक्रम"
      : lang === "hi"
      ? "छात्रों का समग्र विकास — शैक्षणिक, सांस्कृतिक, पर्यावरणीय गतिविधियाँ"
      : "Holistic student development — academic, cultural, environmental activities";

  return (
    <>
      {/* ===== HEADER ===== */}
      <section className="activities-header" aria-label="Page header">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="header-badge animate-fadeInUp">
            <Sparkles size={13} aria-hidden />
            {lang === "mr" ? "पीएम श्री सावित्रीबाई फुले शाळा" : lang === "hi" ? "पीएम श्री सावित्रीबाई फुले विद्यालय" : "PM Shri Savitribai Phule School"}
          </div>
          <h1 className="page-header__title animate-fadeInUp delay-1">{pageTitle}</h1>
          <p className="page-header__sub animate-fadeInUp delay-2">{pageSub}</p>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <nav className="activities-filter" aria-label="Activity category filter">
        <div className="container">
          {CATEGORIES.map(({ id, Icon }) => (
            <button
              key={id}
              className={`filter-btn${activeCategory === id ? " active" : ""}`}
              onClick={() => setActiveCategory(id)}
              aria-pressed={activeCategory === id}
            >
              <Icon size={14} aria-hidden />
              {getCategoryLabel(CATEGORIES.find((c) => c.id === id)!, lang)}
              <span className="filter-count">{getCatCount(id)}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ===== ACTIVITIES GRID ===== */}
      <section className="activities-section" aria-label="Activities">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="activities-empty">
              <Sparkles size={48} aria-hidden />
              <p>{lang === "mr" ? "या श्रेणीत कोणतेही उपक्रम नाहीत." : lang === "hi" ? "इस श्रेणी में कोई गतिविधि नहीं।" : "No activities in this category."}</p>
            </div>
          ) : (
            <div className="activities-grid">
              {filtered.map((activity, idx) => {
                const catEntry = CATEGORIES.find((c) => c.id === activity.category) ?? CATEGORIES[0];
                const badgeClass = CATEGORY_BADGE_COLOR[activity.category];
                const thumbs = activity.images.slice(0, 3);
                const extraCount = activity.images.length - 3;

                return (
                  <article
                    key={activity.id}
                    className={`activity-card animate-fadeInUp delay-${(idx % 5) + 1}`}
                    aria-label={getLangTitle(activity, lang)}
                  >
                    {/* Main image */}
                    <div
                      className="activity-card__img-wrap"
                      onClick={() => setLightboxSrc(activity.images[0])}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={activity.images[0]}
                        alt={getLangTitle(activity, lang)}
                        loading="lazy"
                      />
                      <span className={`badge ${badgeClass} activity-card__category-badge`}>
                        {getCategoryLabel(catEntry, lang)}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="activity-card__body">
                      <h2 className="activity-card__title">{getLangTitle(activity, lang)}</h2>
                      {lang !== "en" && (
                        <p className="activity-card__title-sub">{activity.titleEn}</p>
                      )}
                      <p className="activity-card__desc">{getLangDesc(activity, lang)}</p>

                      {/* Thumbnail strip */}
                      {thumbs.length > 1 && (
                        <div className="activity-card__thumbs">
                          {thumbs.map((src, ti) => (
                            <div
                              key={src}
                              className="activity-card__thumb"
                              onClick={() => setLightboxSrc(src)}
                              role="button"
                              tabIndex={0}
                              aria-label={`View image ${ti + 1}`}
                              onKeyDown={(e) => e.key === "Enter" && setLightboxSrc(src)}
                            >
                              <img src={src} alt="" loading="lazy" />
                            </div>
                          ))}
                          {extraCount > 0 && (
                            <div
                              className="activity-card__thumb activity-card__thumb--more"
                              onClick={() => setLightboxSrc(activity.images[3])}
                              role="button"
                              tabIndex={0}
                              aria-label={`View ${extraCount} more images`}
                              onKeyDown={(e) => e.key === "Enter" && setLightboxSrc(activity.images[3])}
                            >
                              +{extraCount}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== TEACHER DEVELOPMENT ===== */}
      <section className="teacher-dev-section" aria-label="Teacher development">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <GraduationCap size={14} aria-hidden />
              {lang === "mr" ? "शिक्षक विकास" : lang === "hi" ? "शिक्षक विकास" : "Teacher Development"}
            </span>
            <h2 className="section-title">
              {lang === "mr"
                ? "शिक्षकांचे सतत शिक्षण"
                : lang === "hi"
                ? "शिक्षकों का सतत विकास"
                : "Continuous Professional Development"}
            </h2>
            <div className="divider" />
            <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: "56ch", lineHeight: 1.7, fontSize: "1rem" }}>
              {lang === "mr"
                ? "आमचे शिक्षक वर्षभर प्रशिक्षण, कार्यशाळा आणि व्यावसायिक शिक्षण समुदायात सहभागी होतात — विद्यार्थ्यांना सर्वोत्तम शिक्षण देण्यासाठी."
                : lang === "hi"
                ? "हमारे शिक्षक वर्षभर प्रशिक्षण, कार्यशालाओं और व्यावसायिक शिक्षण समुदाय में भाग लेते हैं — छात्रों को सर्वश्रेष्ठ शिक्षा देने के लिए।"
                : "Our teachers participate in year-round training, workshops, and professional learning communities — committed to giving students the best education."}
            </p>
          </div>

          <div className="teacher-dev-grid">
            {TEACHER_DEV_ITEMS.map(({ Icon, titleEn, titleMr, titleHi, descEn, descMr, descHi }, idx) => (
              <div key={titleEn} className={`teacher-dev-card animate-fadeInUp delay-${idx + 1}`}>
                <div className="teacher-dev-card__icon">
                  <Icon size={26} aria-hidden />
                </div>
                <h3 className="teacher-dev-card__title">
                  {lang === "mr" ? titleMr : lang === "hi" ? titleHi : titleEn}
                </h3>
                <p className="teacher-dev-card__desc">
                  {lang === "mr" ? descMr : lang === "hi" ? descHi : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxSrc && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            className="lightbox__img"
            src={lightboxSrc}
            alt="Activity photo"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox__close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
}

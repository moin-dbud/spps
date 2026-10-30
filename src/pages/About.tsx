import {
  Users, Building2, Award, Heart,
  GraduationCap, Target, Eye, CheckCircle2, Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { IMAGE_MANIFEST } from "../data/imageManifest";
import "./About.css";

/* =========================================================
   ABOUT PAGE — EDITORIAL INSTITUTIONAL MONOGRAPH
   P.M. Shri Savitribai Phule School, Babupeth, Chandrapur
   ========================================================= */

export default function About() {
  const { lang } = useI18n();
  const { settings } = useSchoolSettings();

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  return (
    <div className="about-editorial">

      {/* ===== 1. EDITORIAL PAGE HEADER ===== */}
      <header className="ab-header bg-parchment-light">
        <div className="container">
          <div className="ab-header__kicker">
            <span className="editorial-tag editorial-tag--gold">
              <Award size={13} aria-hidden />
              <span>{l("INSTITUTIONAL PROFILE", "संस्था परिचय", "संस्था परिचय")}</span>
            </span>
            <span className="ab-header__council">
              {l("Municipal Corporation Chandrapur • Ward 18", "चंद्रपुर महानगरपालिका • वार्ड १८", "चंद्रपूर महानगरपालिका • प्रभाग १८")}
            </span>
          </div>

          <h1 className="ab-header__title">
            {l(
              "An Exemplary Center of Knowledge, Social Justice & Nurturing Care",
              "ज्ञान, सामाजिक न्याय और संवर्धन का एक आदर्श केंद्र",
              "ज्ञान, सामाजिक न्याय आणि संस्कारांचे एक आदर्श केंद्र"
            )}
          </h1>
          <p className="ab-header__sub">
            {settings.name.english} — {l("Babupeth, Chandrapur, Maharashtra", "बाबूपेठ, चंद्रपुर, महाराष्ट्र", "बाबूपेठ, चंद्रपूर, महाराष्ट्र")}
          </p>
        </div>
      </header>

      {/* ===== 2. SCHOOL IDENTITY — EDITORIAL SPLIT ===== */}
      <section className="ab-section bg-parchment">
        <div className="container">
          <div className="ab-identity-grid">
            <div className="ab-identity-text">
              <span className="editorial-eyebrow">
                <Building2 size={14} aria-hidden />
                {l("FOUNDATIONS & RECOGNITION", "स्थापना व मान्यता", "स्थापना व मान्यता")}
              </span>
              <h2 className="editorial-title">
                {settings.name.short}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ab-lead-p ed-dropcap">
                {lang === "en"
                  ? "P.M. Shri Savitribai Phule School is a premier Municipal Corporation educational institution located in Babupeth, Chandrapur. Deeply rooted in the ideals of social justice, equal opportunity, and progressive pedagogy, the school provides quality, comprehensive education to students from early primary through high school grades."
                  : lang === "hi"
                    ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय महाराष्ट्र के चंद्रपुर जिले के बाबूपेठ क्षेत्र में स्थित नगर निगम का प्रमुख विद्यालय है। सामाजिक न्याय, समान अवसर और प्रगतिशील शिक्षण के आदर्शों पर आधारित यह विद्यालय प्राथमिक से माध्यमिक स्तर तक गुणवत्तापूर्ण शिक्षा प्रदान करता है।"
                    : "पी.एम. श्री. सावित्रीबाई फुले उच्च प्राथमिक व माध्यमिक शाळा ही महाराष्ट्रातील चंद्रपूर जिल्ह्याच्या बाबूपेठ परिसरातील मनपाची अग्रगण्य शाळा आहे. सामाजिक न्याय, समान संधी व पुरोगामी शिक्षणाच्या मूल्यांवर आधारित ही शाळा प्राथमिक ते माध्यमिक स्तरापर्यंत दर्जेदार शिक्षण देते."}
              </p>

              <p className="ab-body-p">
                {lang === "en"
                  ? "Recognised under the Government of India's prestigious PM SHRI (Prime Minister Schools for Rising India) initiative, the school is designated as a model institution embodying the National Education Policy 2020. Our pedagogy focuses on Foundational Literacy and Numeracy (FLN), hands-on experimentation, digital classroom displays, and inclusive learning for children with special needs."
                  : lang === "hi"
                    ? "भारत सरकार की प्रतिष्ठित पीएम श्री योजना के तहत मान्यता प्राप्त, यह विद्यालय राष्ट्रीय शिक्षा नीति २०२० के सिद्धांतों को क्रियान्वित करने वाला एक मॉडल स्कूल है। हमारा पाठ्यक्रम बुनियादी साक्षरता और संख्या ज्ञान (FLN), प्रायोगिक विज्ञान और समावेशी शिक्षा पर केंद्रित है।"
                    : "भारत सरकारच्या प्रतिष्ठित पीएम श्री योजनेंतर्गत मान्यताप्राप्त ही शाळा NEP 2020 च्या तत्त्वांना मूर्त स्वरूप देणारी मॉडेल शाळा आहे. आमचा भर पायाभूत साक्षरता व संख्याज्ञान (FLN), प्रत्यक्ष प्रयोग, डिजिटल शिक्षण आणि समावेशक शिक्षणावर आहे."}
              </p>

              <div className="ab-highlights-row">
                <div className="ab-highlight-col">
                  <strong>PM SHRI</strong>
                  <span>{l("Govt. of India Exemplar", "भारत सरकार आदर्श शाळा", "भारत सरकार आदर्श शाळा")}</span>
                </div>
                <div className="ab-highlight-col">
                  <strong>Grades 1–10</strong>
                  <span>{l("Primary & High School", "प्राथमिक व माध्यमिक", "प्राथमिक व माध्यमिक स्तर")}</span>
                </div>
                <div className="ab-highlight-col">
                  <strong>Ward 18</strong>
                  <span>{l("Babupeth, Chandrapur", "बाबूपेठ, चंद्रपूर", "बाबूपेठ, चंद्रपूर")}</span>
                </div>
              </div>
            </div>

            <div className="ab-identity-visual">
              <div className="ab-photo-frame">
                <img
                  src="/assets/images/pptx1/image2.jpeg"
                  alt="Official entrance of PM Shri Savitribai Phule School in Babupeth"
                  loading="lazy"
                />
                <div className="ab-photo-caption">
                  <p>{settings.name.short} — Campus Entrance Gate & Administration Block</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. TRIBUTE TO KRANTIJOYTI SAVITRIBAI PHULE ===== */}
      <section className="ab-section bg-parchment-light" aria-labelledby="tribute-head">
        <div className="container">
          <div className="ab-tribute-spread">
            <div className="ab-tribute-portrait">
              <div className="ab-portrait-mat">
                <img
                  src={IMAGE_MANIFEST.savitribaiPortrait?.src || "/assets/images/pptx1/image4.jpeg"}
                  alt="Portrait of Krantijyoti Savitribai Phule"
                  loading="lazy"
                />
                <div className="ab-portrait-tag">
                  <strong>Krantijyoti Savitribai Phule</strong>
                  <span>3 January 1831 – 10 March 1897</span>
                </div>
              </div>
            </div>

            <div className="ab-tribute-narrative">
              <span className="editorial-eyebrow">
                <Heart size={14} aria-hidden />
                {l("OUR INSPIRING NAMESAKE", "आमची प्रेरणा आणि वारसा", "आमची प्रेरणा आणि वारसा")}
              </span>
              <h2 className="editorial-title" id="tribute-head">
                {l(
                  "Krantijyoti Savitribai Phule: Pioneer of Modern Education",
                  "क्रांतिज्योति सावित्रीबाई फुले: आधुनिक शिक्षा की अग्रदूत",
                  "क्रांतिज्योती सावित्रीबाई फुले: आधुनिक शिक्षणाच्या आद्य प्रणेत्या"
                )}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ab-body-p">
                {lang === "en"
                  ? "Savitribai Phule was a pioneering Indian social reformer, educational visionary, and poet who opened the gates of knowledge for women and underprivileged communities. Revered as the first female teacher of modern India, she and her husband Mahatma Jyotirao Phule established India's first school for girls at Bhide Wada in Pune in 1848."
                  : lang === "hi"
                    ? "सावित्रीबाई फुले एक अग्रणी भारतीय समाज सुधारक, शिक्षाविद और कवयित्री थीं जिन्होंने महिलाओं और वंचितों के लिए ज्ञान के द्वार खोले। आधुनिक भारत की पहली महिला शिक्षिका के रूप में पूजनीय, उन्होंने १८४८ में पुणे में बालिकाओं के लिए भारत का पहला विद्यालय स्थापित किया।"
                    : "क्रांतिज्योती सावित्रीबाई फुले या अग्रगण्य भारतीय समाजसुधारक, शिक्षणतज्ज्ञ व कवयित्री होत्या ज्यांनी महिला आणि उपेक्षित समाजासाठी ज्ञानाची कवाडे उघडली. आधुनिक भारताच्या पहिल्या महिला शिक्षिका म्हणून गौरविलेल्या सावित्रीबाईंनी १८४८ मध्ये पुण्यात मुलींची पहिली शाळा सुरू केली."}
              </p>

              <p className="ab-body-p">
                {lang === "en"
                  ? "Facing intense social ostracism, ridicule, and harassment, Savitribai walked to school each morning undeterred, carrying a second saree in her bag because people threw mud at her. Her steadfast courage, compassion, and commitment to human equality illuminate our institution every single day."
                  : lang === "hi"
                    ? "कड़े सामाजिक विरोध और कठिनाइयों के बावजूद, वे कभी पीछे नहीं हटीं। उनका अदम्य साहस और मानवीय समानता के प्रति प्रतिबद्धता आज भी हमारे प्रत्येक वर्गखंड को प्रेरित करती है।"
                    : "तीव्र सामाजिक बहिष्कार व विरोधाला सामोरे जात त्यांनी आपले शैक्षणिक व्रत कधीही सोडले नाही. त्यांचे धैर्य, करुणा आणि समतेचा संदेश आज आमच्या प्रत्येक वर्गाला आणि विद्यार्थ्याला ऊर्जा देतो."}
              </p>

              <blockquote className="editorial-quote">
                {lang === "en"
                  ? "“Determined to educate, undeterred by hardship — Savitribai Phule's courage continues to illuminate every classroom.”"
                  : lang === "hi"
                    ? "“शिक्षित करने के संकल्प से, कठिनाइयों से अविचलित — सावित्रीबाई फुले का साहस हर कक्षा को प्रकाशित करता है।”"
                    : "“शिक्षणाच्या निश्चयाने, संकटांनी न डगमगता — क्रांतिज्योती सावित्रीबाईंचे धैर्य आमच्या प्रत्येक वर्गाला उजळवत आहे.”"}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. MISSION & VISION — CARDLESS EDITORIAL ARCHITECTURE ===== */}
      <section className="ab-section bg-parchment" aria-labelledby="purpose-head">
        <div className="container">
          <div className="ed-section-intro ed-section-intro--center">
            <span className="editorial-eyebrow">
              <Target size={14} aria-hidden />
              {l("PURPOSE & DIRECTION", "उद्देश्य व दृष्टिकोन", "उद्देश्य व दृष्टिकोन")}
            </span>
            <h2 className="editorial-title" id="purpose-head">
              {l("Mission & Institutional Vision", "ध्येय और दृष्टि", "ध्येय आणि दृष्टी")}
            </h2>
            <div className="editorial-rule editorial-rule--gold" style={{ margin: "var(--space-4) auto" }} aria-hidden />
          </div>

          <div className="ab-purpose-grid">
            <div className="ab-purpose-block">
              <div className="ab-purpose-header">
                <span className="ab-purpose-index">MISSION</span>
                <Target size={24} className="ab-purpose-icon" />
              </div>
              <h3 className="ab-purpose-title">
                {l("Our Educational Mission", "हमारा शैक्षणिक ध्येय", "आमचे शैक्षणिक ध्येय")}
              </h3>
              <p className="ab-purpose-body">
                {lang === "en"
                  ? "To provide every child with joyful, high-quality, and inclusive education that unlocks their full intellectual, social, and creative potential — while fostering civic responsibility, empathy, and lifelong curiosity."
                  : lang === "hi"
                    ? "प्रत्येक बच्चे को आनंदमय, उच्च गुणवत्तापूर्ण और समावेशी शिक्षा प्रदान करना जो उनकी बौद्धिक, सामाजिक और रचनात्मक क्षमता को विकसित करे और नागरिक जिम्मेदारी को बढ़ावा दे।"
                    : "प्रत्येक विद्यार्थ्याला आनंददायी, दर्जेदार व समावेशक शिक्षण देणे — जे त्यांची बौद्धिक, सामाजिक व भावनिक क्षमता विकसित करेल आणि जबाबदार नागरिक घडवेल."}
              </p>
            </div>

            <div className="ab-purpose-divider" aria-hidden />

            <div className="ab-purpose-block">
              <div className="ab-purpose-header">
                <span className="ab-purpose-index">VISION</span>
                <Eye size={24} className="ab-purpose-icon" />
              </div>
              <h3 className="ab-purpose-title">
                {l("Our Institutional Vision", "हमारी संस्थागत दृष्टि", "आमची संस्थागत दृष्टी")}
              </h3>
              <p className="ab-purpose-body">
                {lang === "en"
                  ? "To stand as an exemplar PM SHRI model school where NEP 2020 comes to life: a vibrant community where every voice is respected, every background is embraced, and every student is equipped to contribute purposefully to the nation."
                  : lang === "hi"
                    ? "एक आदर्श पीएम श्री विद्यालय के रूप में स्थापित होना जहाँ राष्ट्रीय शिक्षा नीति २०२० साकार हो — एक ऐसा समुदाय जहाँ हर छात्र का सम्मान हो और हर शिक्षार्थी राष्ट्र निर्माण के लिए तैयार हो।"
                    : "NEP 2020 च्या आदर्शांना मूर्त रूप देणारी एक आदर्श पीएम श्री शाळा बनणे — जिथे प्रत्येक विद्यार्थ्याचा सन्मान होतो आणि प्रत्येक शिकणारा राष्ट्र उभारणीत अर्थपूर्ण योगदान देण्यास सज्ज असतो."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. PM SHRI SCHEME — DEEP FOREST GREEN SPREAD ===== */}
      <section className="ab-section bg-forest-deep" aria-labelledby="pmshri-head">
        <div className="container">
          <div className="ab-pmshri-spread">
            <div className="ab-pmshri-content">
              <span className="editorial-eyebrow">
                <Award size={14} className="ed-icon-gold" aria-hidden />
                {l("GOVERNMENT OF INDIA FLAGSHIP", "भारत सरकारची राष्ट्रीय योजना", "भारत सरकारची राष्ट्रीय योजना")}
              </span>
              <h2 className="editorial-title" id="pmshri-head">
                {l("PM SHRI: Model Schools Under NEP 2020", "PM SHRI — NEP 2020 अंतर्गत आदर्श शाळा", "PM SHRI — NEP 2020 अंतर्गत आदर्श शाळा")}
              </h2>
              <div className="editorial-rule editorial-rule--dark" aria-hidden />

              <p className="editorial-lead">
                {lang === "en"
                  ? "PM SHRI (Prime Minister Schools for Rising India) is a transformational initiative of the Government of India to develop exemplar schools showcasing NEP 2020 pedagogy, green campus infrastructure, and experiential learning."
                  : lang === "hi"
                    ? "पीएम श्री भारत सरकार की एक परिवर्तनकारी योजना है जो राष्ट्रीय शिक्षा नीति २०२०, हरित परिसर और अनुभवात्मक शिक्षण का उत्कृष्ट प्रदर्शन करने वाले आदर्श विद्यालयों का निर्माण करती है।"
                    : "पीएम श्री (Prime Minister Schools for Rising India) ही भारत सरकारची एक परिवर्तनात्मक योजना आहे जी NEP 2020, हरित परिसर आणि कृती-शिक्षणाचा आदर्श निर्माण करणाऱ्या शाळा विकसित करते."}
              </p>

              <div className="ab-pmshri-pillars">
                <div className="ab-pillar">
                  <Lightbulb size={20} className="ab-pillar-icon" />
                  <div>
                    <strong>{l("Experiential Pedagogy", "प्रायोगिक शिक्षण", "कृती-आधारित शिक्षण")}</strong>
                    <p>{l("Replacing rote learning with inquiry, science fairs, and math manipulatives.", "रट्टा मारण्याच्या पद्धतीला फाटा देऊन प्रत्यक्ष कृती आणि प्रयोगांवर भर.", "रट्टा मारण्याच्या पद्धतीला फाटा देऊन प्रत्यक्ष कृती आणि प्रयोगांवर भर.")}</p>
                  </div>
                </div>

                <div className="ab-pillar">
                  <ShieldCheck size={20} className="ab-pillar-icon" />
                  <div>
                    <strong>{l("Green Sustainable Schooling", "हरित शालेय परिसर", "हरित शालेय परिसर")}</strong>
                    <p>{l("Rooftop solar energy, kitchen gardens, rainwater harvesting, and waste segregation.", "सौरऊर्जा, शालेय परसबाग, जलसंवर्धन व कचरा व्यवस्थापन.", "सौरऊर्जा, शालेय परसबाग, जलसंवर्धन व कचरा व्यवस्थापन.")}</p>
                  </div>
                </div>

                <div className="ab-pillar">
                  <Heart size={20} className="ab-pillar-icon" />
                  <div>
                    <strong>{l("Holistic Inclusive Support", "समावेशक वातावरण", "समावेशक वातावरण")}</strong>
                    <p>{l("Accessible ramps, child safety protocols, nutritious meals, and individual care.", "सुलभ रॅम्प्स, बालसुरक्षा, पोषण आहार आणि प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष.", "सुलभ रॅम्प्स, बालसुरक्षा, पोषण आहार आणि प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष.")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-pmshri-photos">
              <div className="ab-pmshri-photo-card">
                <img
                  src="/assets/images/pptx1/image7.jpeg"
                  alt="Students presenting Chandrayaan rocket model at exhibition"
                  loading="lazy"
                />
                <span className="ab-photo-tag">{l("Science Model Showcase", "विज्ञान मॉडेल प्रदर्शन", "विज्ञान मॉडेल प्रदर्शन")}</span>
              </div>
              <div className="ab-pmshri-photo-card">
                <img
                  src="/assets/images/pptx1/image3.jpeg"
                  alt="Panoramic view of school building and courtyard"
                  loading="lazy"
                />
                <span className="ab-photo-tag">{l("Campus Architecture", "शाळेचा आधुनिक परिसर", "शाळेचा आधुनिक परिसर")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. PRINCIPAL'S DESK — EDITORIAL LETTER FORMAT ===== */}
      <section className="ab-section bg-parchment-light" aria-labelledby="principal-head">
        <div className="container">
          <div className="ab-principal-spread">
            <div className="ab-principal-card">
              <div className="ab-principal-img-wrap">
                <img
                  src="/assets/images/pptx1/image44.jpeg"
                  alt="Principal and leadership of PM Shri Savitribai Phule School"
                  loading="lazy"
                />
              </div>
              <div className="ab-principal-badge">
                <strong>{settings.principal}</strong>
                <span>{l("Head of Institution / Principal", "मुख्याध्यापक / संस्था प्रमुख", "मुख्याध्यापक / संस्था प्रमुख")}</span>
                <p>P.M. Shri Savitribai Phule High School</p>
              </div>
            </div>

            <div className="ab-principal-narrative">
              <span className="editorial-eyebrow">
                <GraduationCap size={14} aria-hidden />
                {l("LEADERSHIP PERSPECTIVE", "मुख्याध्यापकांचे मनोगत", "मुख्याध्यापकांचे मनोगत")}
              </span>
              <h2 className="editorial-title" id="principal-head">
                {l("From the Principal's Desk", "प्राचार्य का संदेश", "मुख्याध्यापकांचा संदेश")}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <div className="ab-letter-body">
                <p>
                  {lang === "en"
                    ? "Welcome to P.M. Shri Savitribai Phule School. Our school is far more than a physical building with classrooms — it is a vibrant, compassionate community where every child is seen, heard, and valued."
                    : lang === "hi"
                      ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय में आपका स्वागत है। हमारा विद्यालय केवल एक इमारत नहीं है — यह एक ऐसा समुदाय है जहाँ प्रत्येक बच्चे को देखा, सुना और मूल्यवान समझा जाता है।"
                      : "पी.एम. श्री. सावित्रीबाई फुले शाळेत आपले सहर्ष स्वागत. आमची शाळा केवळ वर्गखोल्यांची इमारत नाही — हा एक जिवंत, संस्कारक्षम समाज आहे जिथे प्रत्येक विद्यार्थ्याला ओळखले, ऐकले आणि सन्मान दिला जातो."}
                </p>

                <blockquote className="editorial-quote">
                  {lang === "en"
                    ? "“We believe that quality education, delivered with empathy and technological innovation, has the power to transform not just individual futures, but entire communities.”"
                    : lang === "hi"
                      ? "“हमारा दृढ़ विश्वास है कि सहानुभूति और तकनीक के साथ दी गई गुणवत्तापूर्ण शिक्षा में न केवल व्यक्तिगत भविष्य बल्कि पूरे समाज को बदलने की शक्ति है।”"
                      : "“आमचा ठाम विश्वास आहे की काळजी, सहवेदना व आधुनिक तंत्रज्ञानाने दिलेले दर्जेदार शिक्षण केवळ एका विद्यार्थ्याचे नव्हे तर संपूर्ण समाजाचे भविष्य बदलू शकते.”"}
                </blockquote>

                <p>
                  {lang === "en"
                    ? "Together — our trained educators, dedicated parents, Municipal Corporation leadership, and motivated students — we strive every day to build an educational environment of genuine excellence."
                    : lang === "hi"
                      ? "हमारे प्रशिक्षित शिक्षक, समर्पित अभिभावक और मनपा प्रशासन मिलकर हर दिन उत्कृष्टता का एक सुरक्षित वातावरण बनाने के लिए प्रयासरत हैं।"
                      : "आमचे प्रशिक्षित शिक्षक, जागरूक पालक आणि मनपाचे सहकार्य यांच्या बळावर आम्ही दररोज विद्यार्थ्यांच्या सर्वांगीण विकासासाठी कटिबद्ध आहोत."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. GOVERNANCE & SMC ===== */}
      <section className="ab-section bg-parchment" aria-labelledby="smc-head">
        <div className="container">
          <div className="ab-smc-spread">
            <div className="ab-smc-content">
              <span className="editorial-eyebrow">
                <Users size={14} aria-hidden />
                {l("DEMOCRATIC GOVERNANCE", "शाळा व्यवस्थापन समिती", "शाळा व्यवस्थापन समिती")}
              </span>
              <h2 className="editorial-title" id="smc-head">
                {l("School Management Committee (SMC)", "विद्यालय प्रबंधन समिति (SMC)", "शाळा व्यवस्थापन समिती (SMC)")}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ab-body-p">
                {lang === "en"
                  ? "The School Management Committee (SMC) brings together parents, educators, and municipal representatives to ensure transparent governance, resource accountability, and student welfare in accordance with the Right to Education (RTE) Act."
                  : lang === "hi"
                    ? "विद्यालय प्रबंधन समिति (SMC) अभिभावकों, शिक्षकों और नगर निगम प्रतिनिधियों को एक साथ लाती है ताकि पारदर्शी प्रशासन और विद्यार्थी कल्याण सुनिश्चित किया जा सके।"
                    : "शाळा व्यवस्थापन समिती (SMC) पालक, शिक्षक आणि मनपा प्रतिनिधींना एकत्र आणून पारदर्शक कारभार, साधनसंपत्तीचे योग्य नियोजन आणि विद्यार्थी कल्याण सुनिश्चित करते."}
              </p>

              <div className="ab-smc-roles">
                <div className="ab-smc-role-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Parents & Community Voices", "अभिभावक सहभाग", "पालक व समाज सहभाग")}</strong>
                    <p>{l("Direct participation in school improvement planning and monitoring nutrition.", "शालेय विकास आराखडा व पोषण आहार तपासणीत पालकांचा थेट सहभाग.", "शालेय विकास आराखडा व पोषण आहार तपासणीत पालकांचा थेट सहभाग.")}</p>
                  </div>
                </div>

                <div className="ab-smc-role-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Municipal Corporation Oversight", "मनपा प्रशासन देखरेख", "मनपा प्रशासन देखरेख")}</strong>
                    <p>{l("Regular infrastructure audits, budget sanctions, and quality certifications.", "पायाभूत सुविधांची तपासणी, निधी मंजुरी व दर्जा प्रमाणपत्र.", "पायाभूत सुविधांची तपासणी, निधी मंजुरी व दर्जा प्रमाणपत्र.")}</p>
                  </div>
                </div>

                <div className="ab-smc-role-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Child Protection & Inclusion", "बालसुरक्षा व समावेश", "बालसुरक्षा व समावेश")}</strong>
                    <p>{l("Supervising safety measures, CWSN facilities, and transparent grievance redressal.", "विद्यार्थी सुरक्षा, दिव्यांग सुविधा व तक्रार निवारण देखरेख.", "विद्यार्थी सुरक्षा, दिव्यांग सुविधा व तक्रार निवारण देखरेख.")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-smc-visual">
              <div className="ab-photo-frame">
                <img
                  src="/assets/images/pptx1/image46.jpeg"
                  alt="School Management Committee members during official meeting"
                  loading="lazy"
                />
                <div className="ab-photo-caption">
                  <p>{l("SMC Quarterly General Body Meeting — Babupeth Campus", "SMC त्रैमासिक बैठक — बाबूपेठ शाळा", "SMC त्रैमासिक बैठक — बाबूपेठ शाळा")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

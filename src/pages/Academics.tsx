import {
  Brain, Sparkles, Target, Award,
  CheckCircle, FileText, Users, Layers,
} from "lucide-react";
import { useI18n } from "../i18n";
import "./Academics.css";

export default function Academics() {
  const { lang } = useI18n();

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  return (
    <div className="academics-page">
      {/* Header */}
      <section className="page-header">
        <h1 className="page-header__title">
          {l("Academics & Pedagogy", "शैक्षणिक और शिक्षणशास्त्र", "शैक्षणिक आणि अध्यापनशास्त्र")}
        </h1>
        <p className="page-header__sub">
          {l(
            "Empowering students through experiential, competency-based learning and foundational excellence.",
            "प्रायोगिक, दक्षता-आधारित शिक्षण और मूलभूत उत्कृष्टता द्वारा विद्यार्थियों का सशक्तिकरण।",
            "अनुभव-आधारित, क्षमताधिष्ठित शिक्षण आणि पायाभूत उत्कृष्टतेद्वारे विद्यार्थ्यांचे सक्षमीकरण."
          )}
        </p>
      </section>

      {/* 1. FLN (Foundational Literacy and Numeracy) */}
      <section className="section academics-fln" aria-labelledby="fln-heading">
        <div className="container">
          <div className="two-col">
            <div className="academics-fln__content">
              <span className="section-label">
                <Target size={14} aria-hidden />
                {l("NEP 2020 & NIPUN Bharat", "NEP 2020 और निपुण भारत", "NEP 2020 आणि निपुण भारत")}
              </span>
              <h2 className="section-title" id="fln-heading">
                {l(
                  "Foundational Literacy & Numeracy (FLN)",
                  "बुनियादी साक्षरता और संख्या ज्ञान (FLN)",
                  "पायाभूत साक्षरता व संख्याज्ञान (FLN)"
                )}
              </h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle" style={{ marginBottom: "var(--space-4)" }}>
                {l(
                  "Under NIPUN Maharashtra, our primary focus is ensuring that every child in early grades achieves foundational reading, comprehension, and mathematical proficiency.",
                  "निपुण महाराष्ट्र के अंतर्गत, हमारा मुख्य उद्देश्य यह सुनिश्चित करना है कि प्राथमिक स्तर पर हर बच्चा बुनियादी पठन, समझ और गणितीय दक्षता हासिल करे।",
                  "निपुण महाराष्ट्र अंतर्गत, प्राथमिक स्तरावरील प्रत्येक विद्यार्थ्याला वाचन, आकलन व मूलभूत गणिती कौशल्ये आत्मसात करणे हा आमचा मुख्य ध्यास आहे."
                )}
              </p>
              <ul className="academics-feature-list">
                {[
                  l("Activity-based phonics and sight-word reading development", "गतिविधि-आधारित ध्वनिकी और शब्द पठन विकास", "कृती-आधारित ध्वनी व शब्द वाचन विकास"),
                  l("Concrete-to-abstract mathematical concept teaching using TLM", "TLM का उपयोग कर मूर्त से अमूर्त गणितीय संकल्पना शिक्षण", "TLM साहित्याद्वारे प्रत्यक्षातून अप्रत्यक्षाकडे गणित अध्यापन"),
                  l("Classroom libraries and reading corners in every room", "हर कक्षा में पठन कोना और वर्ग ग्रंथालय", "प्रत्येक वर्गात वाचन कोपरा आणि वर्ग ग्रंथालय"),
                  l("Continuous, stress-free formative assessments", "सतत और तनावमुक्त रचनात्मक मूल्यांकन", "सतत आणि तणावमुक्त आकारिक मूल्यमापन"),
                ].map((item, idx) => (
                  <li key={idx} className="academics-feature-item">
                    <CheckCircle size={18} className="academics-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="academics-fln__images">
              <div className="academics-img-card academics-img-card--lead">
                <img src="/assets/images/pptx1/image10.jpeg" alt="FLN Classroom activity" loading="lazy" />
              </div>
              <div className="academics-img-row">
                <img src="/assets/images/pptx1/image11.jpeg" alt="Interactive learning" loading="lazy" />
                <img src="/assets/images/pptx1/image12.jpeg" alt="Student reading practice" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Competency-Based & Experiential Learning */}
      <section className="section academics-cbl" aria-labelledby="cbl-heading">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Brain size={14} aria-hidden />
              {l("Hands-on Education", "व्यावहारिक शिक्षा", "प्रत्यक्ष शिक्षण")}
            </span>
            <h2 className="section-title" id="cbl-heading">
              {l("Competency-Based Learning", "दक्षता-आधारित शिक्षण", "क्षमताधारित शिक्षण")}
            </h2>
            <div className="divider" aria-hidden />
            <p className="section-subtitle">
              {l(
                "Moving beyond rote memorisation: students learn by experimenting, observing, and creating.",
                "रटकर सीखने के बजाय: छात्र प्रयोग, निरीक्षण और निर्माण करके सीखते हैं।",
                "घोकंपट्टीच्या पलीकडे जाऊन: विद्यार्थी प्रयोग, निरीक्षण आणि निर्मिती करून शिकतात."
              )}
            </p>
          </div>

          <div className="grid-3">
            {[
              {
                icon: <Brain size={24} />,
                img: "/assets/images/pptx1/image13.jpeg",
                title: l("Critical Thinking & Inquiries", "तार्किक सोच और जिज्ञासा", "तार्किक विचार आणि चौकस दृष्टी"),
                desc: l(
                  "Students are encouraged to question, hypothesize, and solve real-life word problems collaboratively.",
                  "छात्रों को प्रश्न पूछने, परिकल्पना बनाने और समस्याओं को मिलकर हल करने के लिए प्रेरित किया जाता है।",
                  "विद्यार्थ्यांना प्रश्न विचारण्यास, अनुमान काढण्यास आणि समस्यांचे सांघिक निराकरण करण्यास प्रोत्साहित केले जाते."
                ),
              },
              {
                icon: <Sparkles size={24} />,
                img: "/assets/images/pptx1/image14.jpeg",
                title: l("TLM & Learning by Doing", "TLM और करके सीखना", "TLM व कृतीतून शिक्षण"),
                desc: l(
                  "Teacher-made and student-crafted Teaching-Learning Materials (TLM) turn abstract theories into tactile experiments.",
                  "शिक्षक-निर्मित और छात्र-निर्मित शिक्षण सामग्री अमूर्त सिद्धांतों को व्यावहारिक प्रयोगों में बदलती है।",
                  "शिक्षक व विद्यार्थी-निर्मित शैक्षणिक साहित्य (TLM) किचकट संकल्पना सुलभ आणि रंजक बनवते."
                ),
              },
              {
                icon: <Layers size={24} />,
                img: "/assets/images/pptx1/image15.jpeg",
                title: l("Interdisciplinary Projects", "अंतःविषय परियोजनाएं", "आंतरविद्याशाखीय प्रकल्प"),
                desc: l(
                  "Connecting language, science, arithmetic, and art into multi-faceted seasonal student assignments.",
                  "भाषा, विज्ञान, अंकगणित और कला को जोड़कर बहुआयामी मौसमी छात्र परियोजनाएं।",
                  "भाषा, विज्ञान, गणित आणि कला यांचा समन्वय साधून बहुआयामी प्रकल्प राबविले जातात."
                ),
              },
            ].map((card, idx) => (
              <div key={idx} className="cbl-card card">
                <div className="cbl-card__img-wrap">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <div className="cbl-card__icon">{card.icon}</div>
                </div>
                <div className="card-body">
                  <h3 className="cbl-card__title">{card.title}</h3>
                  <p className="cbl-card__desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Student Model Exhibitions */}
      <section className="section academics-exhibition" aria-labelledby="exhibition-heading">
        <div className="container">
          <div className="two-col two-col--reverse">
            <div className="academics-exhibition__text">
              <span className="section-label">
                <Award size={14} aria-hidden />
                {l("Student Exhibitions", "छात्र प्रदर्शनियां", "विद्यार्थी प्रदर्शने")}
              </span>
              <h2 className="section-title" id="exhibition-heading">
                {l(
                  "Student-Made Model Exhibitions",
                  "विद्यार्थी-निर्मित मॉडल प्रदर्शनी",
                  "विद्यार्थी-निर्मित मॉडेल प्रदर्शन"
                )}
              </h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle" style={{ marginBottom: "var(--space-4)" }}>
                {l(
                  "Our learners actively construct working mathematical instruments, scientific prototypes, and geographical representations to demonstrate mastery over curriculum goals.",
                  "हमारे छात्र पाठ्यचर्या के लक्ष्यों पर अपनी पकड़ दिखाने के लिए गणितीय उपकरण, वैज्ञानिक प्रोटोटाइप और भौगोलिक मॉडल तैयार करते हैं।",
                  "अभ्यासक्रमातील उद्दिष्टांवर प्रभुत्व सिद्ध करण्यासाठी आमचे विद्यार्थी गणितीय उपकरणे, वैज्ञानिक साधने आणि भौगोलिक प्रतिकृती स्वतः तयार करतात."
                )}
              </p>
              <div className="exhibition-highlights">
                <div className="exhibition-stat-box">
                  <span className="exhibition-stat-num">100%</span>
                  <span className="exhibition-stat-label">
                    {l("Student Participation", "विद्यार्थी सहभागिता", "विद्यार्थी सहभाग")}
                  </span>
                </div>
                <div className="exhibition-stat-box">
                  <span className="exhibition-stat-num">Math & Sci</span>
                  <span className="exhibition-stat-label">
                    {l("Core Focus Areas", "प्रमुख केंद्रित विषय", "प्रमुख विषय")}
                  </span>
                </div>
              </div>
            </div>

            <div className="academics-exhibition__gallery">
              <div className="exhibition-grid">
                <img src="/assets/images/pptx1/image7.jpeg" alt="Math models" loading="lazy" />
                <img src="/assets/images/pptx1/image8.jpeg" alt="Model demonstration" loading="lazy" />
                <img src="/assets/images/pptx1/image9.jpeg" alt="Science exhibition" loading="lazy" />
                <img src="/assets/images/pptx1/image6.jpeg" alt="Student presentation" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Assessment & NIPUN Maharashtra */}
      <section className="section--sm academics-assessment" aria-labelledby="assessment-heading">
        <div className="container">
          <div className="assessment-card">
            <div className="assessment-card__header">
              <FileText size={28} className="assessment-card__icon" />
              <div>
                <h3 className="assessment-card__title" id="assessment-heading">
                  {l("NIPUN Maharashtra & PAT Assessment", "निपुण महाराष्ट्र और PAT मूल्यांकन", "निपुण महाराष्ट्र आणि PAT मूल्यमापन")}
                </h3>
                <p className="assessment-card__subtitle">
                  {l(
                    "Systematic evaluation to identify learning gaps and celebrate student milestones.",
                    "अधिगम अंतर की पहचान करने और छात्र उपलब्धियों को सराहने के लिए व्यवस्थित मूल्यांकन।",
                    "शिकण्यातील त्रुटी ओळखून विद्यार्थ्यांच्या प्रगतीचे मोजमाप करणारी पद्धतशीर मूल्यमापन प्रणाली."
                  )}
                </p>
              </div>
            </div>

            <div className="assessment-grid">
              <div className="assessment-col">
                <h4>{l("Formative Periodic Tests (PAT)", "रचनात्मक आवधिक परीक्षण (PAT)", "नियतकालिक चाचण्या (PAT)")}</h4>
                <p>
                  {l(
                    "Standardised assessments conducted across Maharashtra to track grade-level competencies in first languages and mathematics.",
                    "मातृभाषा और गणित में कक्षा-स्तरीय दक्षताओं की निगरानी के लिए पूरे महाराष्ट्र में आयोजित मानकीकृत मूल्यांकन।",
                    "प्रथम भाषा व गणितातील इयत्तानिहाय क्षमता तपासण्यासाठी महाराष्ट्रभर राबविल्या जाणाऱ्या प्रमाणित चाचण्या."
                  )}
                </p>
              </div>
              <div className="assessment-col">
                <h4>{l("Diagnostic & Remedial Cycles", "निदानात्मक और उपचारात्मक चक्र", "निदानात्मक व उपचारात्मक अध्यापन")}</h4>
                <p>
                  {l(
                    "Targeted micro-lessons for students needing conceptual strengthening, ensuring no child is left behind.",
                    "संकल्पनात्मक मजबूती की आवश्यकता वाले छात्रों के लिए लक्षित माइक्रो-क्लास, ताकि कोई भी बच्चा पीछे न छूटे।",
                    "संकल्पना दृढतेसाठी विशेष उपचारात्मक वर्ग, ज्यामुळे कोणताही विद्यार्थी मागे राहणार नाही याची खात्री केली जाते."
                  )}
                </p>
              </div>
              <div className="assessment-col">
                <h4>{l("Holistic Progress Cards", "समग्र प्रगति पत्रक", "सर्वसमावेशक प्रगती पत्रक")}</h4>
                <p>
                  {l(
                    "Evaluation encompasses socio-emotional skills, teamwork, physical education, and creative arts.",
                    "मूल्यांकन में सामाजिक-भावनात्मक कौशल, टीमवर्क, शारीरिक शिक्षा और रचनात्मक कलाएं शामिल हैं।",
                    "मूल्यमापनात सामाजिक-भावनिक कौशल्ये, संघभावना, शारीरिक शिक्षण आणि कला यांचाही समावेश असतो."
                  )}
                </p>
              </div>
            </div>

            <div className="verify-banner" style={{ marginTop: "var(--space-6)" }}>
              <span>
                {l(
                  "⚠️ Note: Specific percentage scores or cohort statistics presented in internal presentations are subject to official academic audit verification before publishing.",
                  "⚠️ ध्यान दें: प्रस्तुतियों में दर्शाए गए विशिष्ट प्रतिशत आंकड़े आधिकारिक शैक्षणिक सत्यापन के अधीन हैं।",
                  "⚠️ नोंद: सादरीकरणातील विशिष्ट टक्केवारी व आकडेवारी अधिकृत शैक्षणिक पडताळणीनंतरच अंतिम मानली जाईल."
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inclusive Education & Support for CWSN */}
      <section className="section academics-inclusive" aria-labelledby="inclusive-heading">
        <div className="container">
          <div className="two-col">
            <div className="two-col__img">
              <img src="/assets/images/pptx1/image20.jpeg" alt="Inclusive Education Support" loading="lazy" />
            </div>
            <div>
              <span className="section-label">
                <Users size={14} aria-hidden />
                {l("Inclusive Education", "समावेशी शिक्षा", "समावेशक शिक्षण")}
              </span>
              <h2 className="section-title" id="inclusive-heading">
                {l(
                  "Support for Children with Special Needs (CWSN)",
                  "विशेष आवश्यकता वाले बच्चों (CWSN) के लिए सहायता",
                  "विशेष गरजा असणाऱ्या मुलांसाठी (CWSN) सहाय्य"
                )}
              </h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle" style={{ marginBottom: "var(--space-5)" }}>
                {l(
                  "We embrace the philosophy that every child has an unconditional right to high-calibre schooling in a supportive, barrier-free environment.",
                  "हमारा विश्वास है कि हर बच्चे को बाधा-मुक्त वातावरण में उच्च कोटि की शिक्षा पाने का बिना शर्त अधिकार है।",
                  "प्रत्येक बालकाला कोणत्याही अडथळ्यांविना पोषक वातावरणात दर्जेदार शिक्षणाचा मूलभूत हक्क आहे यावर आमचा विश्वास आहे."
                )}
              </p>
              <div className="inclusive-checklist">
                {[
                  l("Ramps and handrails ensuring barrier-free mobility throughout school corridors", "विद्यालय गलियारों में बाधा-मुक्त आवागमन के लिए रैम्प और रेलिंग", "शाळेच्या आवारात अडथळामुक्त हालचालीसाठी रॅम्प व रेलिंगची सुविधा"),
                  l("Differentiated instructional strategies tailored to unique cognitive and sensory paces", "विभिन्न संज्ञानात्मक गतियों के अनुकूल विशिष्ट शिक्षण रणनीतियाँ", "प्रत्येकाच्या शिकण्याच्या गतीनुसार अनुकूल अध्यापन पद्धती"),
                  l("Sensitisation workshops promoting empathy and camaraderie among all peers", "सहपाठियों में सहानुभूति और सौहार्द को बढ़ावा देने वाली संवेदीकरण कार्यशालाएं", "विद्यार्थ्यांमध्ये बंधुभाव आणि समानतेची भावना वाढवणारे उपक्रम"),
                  l("Accessible sanitation facilities designed for children with physical mobility challenges", "शारीरिक गतिशीलता चुनौतियों वाले बच्चों के लिए सुलभ स्वच्छता सुविधाएं", "दिव्यांग विद्यार्थ्यांसाठी अनुकूल स्वतंत्र स्वच्छतागृह व्यवस्था"),
                ].map((item, idx) => (
                  <div key={idx} className="inclusive-check-item">
                    <CheckCircle size={18} className="inclusive-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Student Publications — Hastha Dip */}
      <section className="section--sm academics-publication" aria-labelledby="pub-heading">
        <div className="container">
          <div className="publication-card">
            <div className="publication-card__grid">
              <div className="publication-card__text">
                <span className="section-label" style={{ color: "var(--clr-saffron-600)" }}>
                  <Sparkles size={14} aria-hidden />
                  {l("Creative Expressions", "रचनात्मक अभिव्यक्ति", "सर्जनशील अभिव्यक्ती")}
                </span>
                <h3 className="section-title" id="pub-heading" style={{ fontSize: "1.75rem" }}>
                  {l(
                    "Student Handwritten Magazine — 'Hastha Dip' (हस्तदीप)",
                    "विद्यार्थी हस्तलिखित पत्रिका — 'हस्तदीप'",
                    "विद्यार्थी हस्तलिखित नियतकालिक — 'हस्तदीप'"
                  )}
                </h3>
                <div className="divider" aria-hidden />
                <p style={{ color: "var(--clr-neutral-700)", lineHeight: 1.7, marginBottom: "var(--space-4)" }}>
                  {l(
                    "To nurture budding writers, poets, and illustrators, our school brings out 'Hastha Dip' — an exclusive student-composed handwritten journal documenting school life, scientific essays, folktales, and poetry.",
                    "उभरते लेखकों, कवियों और चित्रकारों को प्रोत्साहित करने के लिए हमारा विद्यालय 'हस्तदीप' प्रकाशित करता है — जिसमें छात्रों द्वारा रचित निबंध, लोककथाएं और कविताएं शामिल होती हैं।",
                    "उदयोन्मुख लेखक, कवी आणि चित्रकारांना व्यासपीठ मिळवून देण्यासाठी शाळा 'हस्तदीप' हे हस्तलिखित नियतकालिक प्रकाशित करते — ज्यात विद्यार्थ्यांचे वैचारिक लेख, कविता आणि चित्रांचा समावेश असतो."
                  )}
                </p>
                <div className="badge badge-saffron">
                  {l("Student Led & Curated", "छात्रों द्वारा संचालित", "विद्यार्थी संपादन व निर्मिती")}
                </div>
              </div>
              <div className="publication-card__img">
                <img src="/assets/images/pptx2/image32.jpeg" alt="Hastha Dip magazine" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

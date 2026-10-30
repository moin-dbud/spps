import {
  Brain, Sparkles, Target, Award,
  CheckCircle2, FileText, Users,
} from "lucide-react";
import { useI18n } from "../i18n";
import "./Academics.css";

/* =========================================================
   ACADEMICS PAGE — ACADEMIC PUBLICATION & PEDAGOGY MONOGRAPH
   ========================================================= */

export default function Academics() {
  const { lang } = useI18n();

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  return (
    <div className="academics-editorial">

      {/* ===== 1. EDITORIAL HEADER ===== */}
      <header className="ac-header bg-parchment-light">
        <div className="container">
          <div className="ac-header__kicker">
            <span className="editorial-tag editorial-tag--gold">
              <Award size={13} aria-hidden />
              <span>{l("NEP 2020 & NIPUN BHARAT", "NEP 2020 आणि निपुण भारत", "NEP 2020 आणि निपुण भारत")}</span>
            </span>
            <span className="ac-header__sub-tag">
              {l("Exemplar Municipal Pedagogy • Ward 18", "आदर्श मनपा शिक्षण प्रणाली", "आदर्श मनपा शिक्षण प्रणाली")}
            </span>
          </div>

          <h1 className="ac-header__title">
            {l(
              "Pedagogical Excellence, Experiential Learning & Foundational Mastery",
              "अनुभव-आधारित, क्षमताधिष्ठित शिक्षण आणि पायाभूत उत्कृष्टता",
              "अनुभव-आधारित, क्षमताधिष्ठित शिक्षण आणि पायाभूत उत्कृष्टता"
            )}
          </h1>
          <p className="ac-header__lead">
            {l(
              "Rooted in NEP 2020 guidelines, our curriculum fosters conceptual clarity, joyful inquiry, and lifelong intellectual curiosity for every child in Babupeth.",
              "NEP 2020 च्या मार्गदर्शक तत्त्वांनुसार, आमचा अभ्यासक्रम प्रत्येक विद्यार्थ्यामध्ये संकल्पनात्मक स्पष्टता, जिज्ञासा आणि विचारक्षमता विकसित करतो.",
              "NEP 2020 च्या मार्गदर्शक तत्त्वांनुसार, आमचा अभ्यासक्रम प्रत्येक विद्यार्थ्यामध्ये संकल्पनात्मक स्पष्टता, जिज्ञासा आणि विचारक्षमता विकसित करतो."
            )}
          </p>
        </div>
      </header>

      {/* ===== 2. FLN (FOUNDATIONAL LITERACY & NUMERACY) ===== */}
      <section className="ac-section bg-parchment">
        <div className="container">
          <div className="ac-fln-spread">
            <div className="ac-fln-text">
              <span className="editorial-eyebrow">
                <Target size={14} aria-hidden />
                {l("FOUNDATIONAL PILLARS", "पायाभूत साक्षरता व संख्याज्ञान", "पायाभूत साक्षरता व संख्याज्ञान")}
              </span>
              <h2 className="editorial-title">
                {l(
                  "Foundational Literacy & Numeracy (FLN)",
                  "बुनियादी साक्षरता और संख्या ज्ञान (FLN)",
                  "पायाभूत साक्षरता व संख्याज्ञान (FLN)"
                )}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ac-lead-p ed-dropcap">
                {l(
                  "Under NIPUN Maharashtra, our primary wing prioritises foundational competencies: ensuring that every child in early grades achieves fluent reading comprehension, expressive writing, and mathematical confidence without anxiety.",
                  "निपुण महाराष्ट्र अंतर्गत, प्राथमिक स्तरावरील प्रत्येक विद्यार्थ्याला वाचन, लेखन व मूलभूत गणिती कौशल्ये आत्मसात करणे हा आमचा मुख्य ध्यास आहे.",
                  "निपुण महाराष्ट्र अंतर्गत, प्राथमिक स्तरावरील प्रत्येक विद्यार्थ्याला वाचन, लेखन व मूलभूत गणिती कौशल्ये आत्मसात करणे हा आमचा मुख्य ध्यास आहे."
                )}
              </p>

              <div className="ac-fln-checklist">
                <div className="ac-fln-check-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Phonics & Sight-Word Reading", "ध्वनी व शब्द वाचन विकास", "ध्वनी व शब्द वाचन विकास")}</strong>
                    <p>{l("Graded reading ladders and daily story circles create joyful fluency.", "क्रमिक वाचन पायऱ्या व गोष्टींचे तास विद्यार्थ्यांमध्ये वाचनाची आवड निर्माण करतात.", "क्रमिक वाचन पायऱ्या व गोष्टींचे तास विद्यार्थ्यांमध्ये वाचनाची आवड निर्माण करतात.")}</p>
                  </div>
                </div>

                <div className="ac-fln-check-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Concrete-to-Abstract Math with TLM", "TLM साहित्याद्वारे गणित अध्यापन", "TLM साहित्याद्वारे गणित अध्यापन")}</strong>
                    <p>{l("Hands-on counters, fraction kits, and bead lines turn abstract arithmetic into tactile discovery.", "मणी, गोट्या व मोजणी साहित्याद्वारे अमूर्त गणिताची सुलभ व आनंददायी मांडणी.", "मणी, गोट्या व मोजणी साहित्याद्वारे अमूर्त गणिताची सुलभ व आनंददायी मांडणी.")}</p>
                  </div>
                </div>

                <div className="ac-fln-check-item">
                  <CheckCircle2 size={18} className="ed-check-icon" />
                  <div>
                    <strong>{l("Classroom Reading Corners", "प्रत्येक वर्गात वाचन कोपरा", "प्रत्येक वर्गात वाचन कोपरा")}</strong>
                    <p>{l("Every classroom features its own curated mini-library fostering self-directed reading.", "प्रत्येक वर्गात सचित्र गोष्टींची पुस्तके व स्वयंअध्ययन वाचन कट्टा.", "प्रत्येक वर्गात सचित्र गोष्टींची पुस्तके व स्वयंअध्ययन वाचन कट्टा.")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ac-fln-visual">
              <div className="ac-fln-lead-frame">
                <img
                  src="/assets/images/pptx1/image10.jpeg"
                  alt="Students engaged in early childhood foundational literacy and numeracy activities"
                  loading="lazy"
                />
                <div className="ac-frame-tag">
                  <p>{l("Early Grades FLN Activity Session — Classroom 2B", "FLN वर्ग उपक्रम — इयत्ता दुसरी", "FLN वर्ग उपक्रम — इयत्ता दुसरी")}</p>
                </div>
              </div>
              <div className="ac-fln-sub-row">
                <img src="/assets/images/pptx1/image11.jpeg" alt="Peer reading and interactive flashcards" loading="lazy" />
                <img src="/assets/images/pptx1/image12.jpeg" alt="Student reading practice with teacher" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. COMPETENCY-BASED LEARNING (CBL) ===== */}
      <section className="ac-section bg-parchment-light">
        <div className="container">
          <div className="ed-section-intro">
            <span className="editorial-eyebrow">
              <Brain size={14} aria-hidden />
              {l("EXPERIENTIAL PEDAGOGY", "क्षमताधारित प्रत्यक्ष शिक्षण", "क्षमताधारित प्रत्यक्ष शिक्षण")}
            </span>
            <h2 className="editorial-title">
              {l("Competency-Based Learning (CBL)", "दक्षता-आधारित शिक्षण", "क्षमताधारित शिक्षण (CBL)")}
            </h2>
            <div className="editorial-rule editorial-rule--gold" aria-hidden />
            <p className="editorial-lead">
              {l(
                "Shifting decisively away from rote memorisation, students learn by constructing, testing, observing, and debating scientific and social phenomena.",
                "घोकंपट्टीच्या पलीकडे जाऊन: विद्यार्थी प्रत्यक्ष प्रयोग, निरीक्षण आणि निर्मिती करून शिकतात.",
                "घोकंपट्टीच्या पलीकडे जाऊन: विद्यार्थी प्रत्यक्ष प्रयोग, निरीक्षण आणि निर्मिती करून शिकतात."
              )}
            </p>
          </div>

          <div className="ac-cbl-grid">
            <div className="ac-cbl-col">
              <div className="ac-cbl-media">
                <img src="/assets/images/pptx1/image13.jpeg" alt="Critical inquiry in science class" loading="lazy" />
                <span className="ac-cbl-num">01</span>
              </div>
              <div className="ac-cbl-body">
                <h3>{l("Critical Inquiry & Hypothesis", "तार्किक विचार आणि चौकस दृष्टी", "तार्किक विचार आणि चौकस दृष्टी")}</h3>
                <p>
                  {l(
                    "Students formulate hypotheses, test assumptions through simple classroom apparatus, and defend their conclusions collaboratively.",
                    "विद्यार्थ्यांना प्रश्न विचारण्यास, गृहीतके मांडण्यास आणि सांघिक चर्चेद्वारे निष्कर्ष काढण्यास शिकवले जाते.",
                    "विद्यार्थ्यांना प्रश्न विचारण्यास, गृहीतके मांडण्यास आणि सांघिक चर्चेद्वारे निष्कर्ष काढण्यास शिकवले जाते."
                  )}
                </p>
              </div>
            </div>

            <div className="ac-cbl-col">
              <div className="ac-cbl-media">
                <img src="/assets/images/pptx1/image14.jpeg" alt="Teaching learning materials creation" loading="lazy" />
                <span className="ac-cbl-num">02</span>
              </div>
              <div className="ac-cbl-body">
                <h3>{l("Tactile Learning by Doing", "कृतीतून प्रत्यक्ष शिक्षण", "कृतीतून प्रत्यक्ष शिक्षण")}</h3>
                <p>
                  {l(
                    "Teacher and student-crafted manipulatives turn abstract formulas into tangible instruments of discovery.",
                    "शिक्षक व विद्यार्थ्यांनी बनवलेले शैक्षणिक साहित्य किचकट सूत्रांना सुलभ व प्रात्यक्षिक स्वरूप देते.",
                    "शिक्षक व विद्यार्थ्यांनी बनवलेले शैक्षणिक साहित्य किचकट सूत्रांना सुलभ व प्रात्यक्षिक स्वरूप देते."
                  )}
                </p>
              </div>
            </div>

            <div className="ac-cbl-col">
              <div className="ac-cbl-media">
                <img src="/assets/images/pptx1/image15.jpeg" alt="Interdisciplinary science and geography project" loading="lazy" />
                <span className="ac-cbl-num">03</span>
              </div>
              <div className="ac-cbl-body">
                <h3>{l("Interdisciplinary Projects", "आंतरविद्याशाखीय प्रकल्प", "आंतरविद्याशाखीय प्रकल्प")}</h3>
                <p>
                  {l(
                    "Language, geometry, environmental studies, and art coalesce into semester-end thematic projects.",
                    "भाषा, गणित, पर्यावरण आणि कला यांचा समन्वय साधून विद्यार्थ्यांना समग्र दृष्टिकोन दिला जातो.",
                    "भाषा, गणित, पर्यावरण आणि कला यांचा समन्वय साधून विद्यार्थ्यांना समग्र दृष्टिकोन दिला जातो."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. STUDENT MODEL EXHIBITIONS ===== */}
      <section className="ac-section bg-parchment">
        <div className="container">
          <div className="ac-exhibit-spread">
            <div className="ac-exhibit-visual">
              <div className="ac-exhibit-mosaic">
                <img src="/assets/images/pptx1/image7.jpeg" alt="Chandrayaan rocket model presentation" loading="lazy" />
                <img src="/assets/images/pptx1/image8.jpeg" alt="Students presenting fractions apparatus" loading="lazy" />
                <img src="/assets/images/pptx1/image9.jpeg" alt="Hands-on demonstration of hydraulic lift" loading="lazy" />
                <img src="/assets/images/pptx1/image6.jpeg" alt="Classroom science model presentation" loading="lazy" />
              </div>
            </div>

            <div className="ac-exhibit-text">
              <span className="editorial-eyebrow">
                <Award size={14} aria-hidden />
                {l("PRACTICAL DEMONSTRATION", "विद्यार्थी-निर्मित मॉडेल प्रदर्शन", "विद्यार्थी-निर्मित मॉडेल प्रदर्शन")}
              </span>
              <h2 className="editorial-title">
                {l(
                  "Student-Made Model Exhibitions",
                  "विद्यार्थी-निर्मित मॉडल प्रदर्शनी",
                  "विद्यार्थी-निर्मित मॉडेल प्रदर्शन"
                )}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ac-lead-p">
                {l(
                  "Our students do not just study science and mathematics from books; they construct it with their own hands. From working models of Chandrayaan rocket propulsion to geometric fraction apparatus, every learner steps up as an articulate presenter.",
                  "आमचे विद्यार्थी केवळ पुस्तकातून विज्ञान आणि गणित शिकत नाहीत; ते स्वतःच्या हातांनी त्याची प्रतिकृती तयार करतात. चांद्रयान रॉकेट प्रक्षेपणापासून ते भूमितीय मॉडेल्सपर्यंत, प्रत्येक विद्यार्थी आत्मविश्वासाने सादरीकरण करतो.",
                  "आमचे विद्यार्थी केवळ पुस्तकातून विज्ञान आणि गणित शिकत नाहीत; ते स्वतःच्या हातांनी त्याची प्रतिकृती तयार करतात. चांद्रयान रॉकेट प्रक्षेपणापासून ते भूमितीय मॉडेल्सपर्यंत, प्रत्येक विद्यार्थी आत्मविश्वासाने सादरीकरण करतो."
                )}
              </p>

              <div className="ac-stats-row">
                <div className="ac-stat-block">
                  <span className="ac-stat-num">100%</span>
                  <span className="ac-stat-label">{l("Learner Participation", "सर्व विद्यार्थ्यांचा सहभाग", "सर्व विद्यार्थ्यांचा सहभाग")}</span>
                </div>
                <div className="ac-stat-block">
                  <span className="ac-stat-num">50+</span>
                  <span className="ac-stat-label">{l("Student Prototypes", "स्वनिर्मित मॉडेल्स", "स्वनिर्मित मॉडेल्स")}</span>
                </div>
                <div className="ac-stat-block">
                  <span className="ac-stat-num">Annual</span>
                  <span className="ac-stat-label">{l("Public Science Fair", "वार्षिक विज्ञान मेळावा", "वार्षिक विज्ञान मेळावा")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. ASSESSMENT FRAMEWORK — EDITORIAL LEDGER TABLE ===== */}
      <section className="ac-section bg-parchment-light">
        <div className="container">
          <div className="ed-section-intro">
            <span className="editorial-eyebrow">
              <FileText size={14} aria-hidden />
              {l("EVALUATION & DIAGNOSTICS", "मूल्यमापन आणि शैक्षणिक प्रगती", "मूल्यमापन आणि शैक्षणिक प्रगती")}
            </span>
            <h2 className="editorial-title">
              {l("NIPUN Maharashtra & PAT Assessment Framework", "निपुण महाराष्ट्र आणि PAT मूल्यमापन", "निपुण महाराष्ट्र आणि PAT मूल्यमापन")}
            </h2>
            <div className="editorial-rule editorial-rule--gold" aria-hidden />
            <p className="editorial-lead">
              {l(
                "Assessment at our school is continuous, diagnostic, and celebratory — designed to identify learning thresholds without stress and provide timely remedial guidance.",
                "आमच्या शाळेतील मूल्यमापन सतत, निदानात्मक व तणावमुक्त असते — ज्याचा उद्देश विद्यार्थ्यांच्या प्रगतीचे अचूक मोजमाप करून वेळेवर मार्गदर्शन करणे हा आहे.",
                "आमच्या शाळेतील मूल्यमापन सतत, निदानात्मक व तणावमुक्त असते — ज्याचा उद्देश विद्यार्थ्यांच्या प्रगतीचे अचूक मोजमाप करून वेळेवर मार्गदर्शन करणे हा आहे."
              )}
            </p>
          </div>

          <div className="ac-ledger">
            <div className="ac-ledger-row">
              <div className="ac-ledger-col ac-ledger-col--type">
                <strong>PAT 1 & PAT 2</strong>
                <span>{l("Periodic Assessment Tests", "नियतकालिक चाचण्या", "नियतकालिक चाचण्या")}</span>
              </div>
              <div className="ac-ledger-col ac-ledger-col--desc">
                <p>{l("Standardised state-wide diagnostic tests evaluating grade-appropriate learning outcomes in first languages (Marathi/Hindi) and core mathematics.", "प्रथम भाषा व गणितातील इयत्तानिहाय क्षमता तपासण्यासाठी महाराष्ट्र राज्य शैक्षणिक संशोधन व प्रशिक्षण परिषद (SCERT) द्वारे प्रमाणित चाचण्या.", "प्रथम भाषा व गणितातील इयत्तानिहाय क्षमता तपासण्यासाठी SCERT द्वारे प्रमाणित चाचण्या.")}</p>
              </div>
              <div className="ac-ledger-col ac-ledger-col--freq">
                <span>{l("Biannual • State Standard", "सत्रनिहाय • SCERT मानक", "सत्रनिहाय • SCERT मानक")}</span>
              </div>
            </div>

            <div className="ac-ledger-row">
              <div className="ac-ledger-col ac-ledger-col--type">
                <strong>FLN Diagnostic Cycle</strong>
                <span>{l("Foundational Competencies", "पायाभूत कौशल्ये चाचणी", "पायाभूत कौशल्ये चाचणी")}</span>
              </div>
              <div className="ac-ledger-col ac-ledger-col--desc">
                <p>{l("One-on-one reading speed and comprehension diagnostics identifying children requiring micro-level remediation.", "प्रत्येक विद्यार्थ्याची वैयक्तिक वाचन गती, आकलन व संख्याज्ञानाची चाचणी घेऊन उपचारात्मक वर्गांचे नियोजन.", "प्रत्येक विद्यार्थ्याची वैयक्तिक वाचन गती, आकलन व संख्याज्ञानाची चाचणी घेऊन उपचारात्मक नियोजन.")}</p>
              </div>
              <div className="ac-ledger-col ac-ledger-col--freq">
                <span>{l("Monthly Tracking", "मासिक ट्रॅकिंग", "मासिक ट्रॅकिंग")}</span>
              </div>
            </div>

            <div className="ac-ledger-row">
              <div className="ac-ledger-col ac-ledger-col--type">
                <strong>Holistic Progress Card</strong>
                <span>{l("360° Multidimensional", "सर्वसमावेशक प्रगती पत्रक", "सर्वसमावेशक प्रगती पत्रक")}</span>
              </div>
              <div className="ac-ledger-col ac-ledger-col--desc">
                <p>{l("Evaluating cognitive, socio-emotional, creative arts, physical health, and teamwork milestones in collaboration with parents.", "केवळ गुणांऐवजी कला, क्रीडा, सहकार्य आणि सामाजिक-भावनिक कौशल्यांचा सर्वांगीण आढावा.", "केवळ गुणांऐवजी कला, क्रीडा, सहकार्य आणि सामाजिक-भावनिक कौशल्यांचा सर्वांगीण आढावा.")}</p>
              </div>
              <div className="ac-ledger-col ac-ledger-col--freq">
                <span>{l("Continuous Formative", "सतत आकारिक मूल्यमापन", "सतत आकारिक मूल्यमापन")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. INCLUSIVE EDUCATION & CWSN ===== */}
      <section className="ac-section bg-forest-deep">
        <div className="container">
          <div className="ac-inclusive-spread">
            <div className="ac-inclusive-text">
              <span className="editorial-eyebrow">
                <Users size={14} className="ed-icon-gold" aria-hidden />
                {l("EQUAL ACCESS & DIGNITY", "समावेशक शिक्षण व समान संधी", "समावेशक शिक्षण व समान संधी")}
              </span>
              <h2 className="editorial-title">
                {l(
                  "Support for Children with Special Needs (CWSN)",
                  "विशेष गरजा असणाऱ्या मुलांसाठी (CWSN) सहाय्य",
                  "विशेष गरजा असणाऱ्या मुलांसाठी (CWSN) सहाय्य"
                )}
              </h2>
              <div className="editorial-rule editorial-rule--dark" aria-hidden />

              <p className="editorial-lead">
                {l(
                  "Every child possesses an unconditional right to quality public schooling. We provide full barrier-free physical infrastructure, tailored pedagogical pacings, and empathetic peer culture.",
                  "प्रत्येक बालकाला अडथळामुक्त वातावरणात दर्जेदार शिक्षणाचा मूलभूत हक्क आहे. आम्ही रॅम्प्स, विशेष शिक्षण साहित्य व बंधुभावाचे वातावरण देतो.",
                  "प्रत्येक बालकाला अडथळामुक्त वातावरणात दर्जेदार शिक्षणाचा मूलभूत हक्क आहे. आम्ही रॅम्प्स, विशेष शिक्षण साहित्य व बंधुभावाचे वातावरण देतो."
                )}
              </p>

              <div className="ac-inclusive-list">
                <div className="ac-inc-item">
                  <strong>{l("Barrier-Free Campus", "अडथळामुक्त परिसर", "अडथळामुक्त परिसर")}</strong>
                  <p>{l("Dedicated entrance ramps, grab-rails, and wheelchair-accessible sanitation facilities.", "प्रवेशद्वारापासून वर्गांपर्यंत रॅम्प्स, रेलिंग आणि सुलभ स्वच्छतागृह व्यवस्था.", "प्रवेशद्वारापासून वर्गांपर्यंत रॅम्प्स, रेलिंग आणि सुलभ स्वच्छतागृह व्यवस्था.")}</p>
                </div>
                <div className="ac-inc-item">
                  <strong>{l("Differentiated Pedagogical Pacing", "अनुकूल अध्यापन गती", "अनुकूल अध्यापन गती")}</strong>
                  <p>{l("Instructional pacing tailored to individual cognitive and sensory requirements without stigma.", "विद्यार्थ्यांच्या गरजेनुसार लवचिक अध्यापन आणि वैयक्तिक लक्ष.", "विद्यार्थ्यांच्या गरजेनुसार लवचिक अध्यापन आणि वैयक्तिक लक्ष.")}</p>
                </div>
              </div>
            </div>

            <div className="ac-inclusive-visual">
              <div className="editorial-frame">
                <img src="/assets/images/pptx1/image20.jpeg" alt="Inclusive Education support and peer learning in classroom" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. STUDENT JOURNAL — HASTHA DIP (हस्तदीप) ===== */}
      <section className="ac-section bg-parchment">
        <div className="container">
          <div className="ac-pub-spread">
            <div className="ac-pub-media">
              <div className="editorial-frame">
                <img src="/assets/images/pptx2/image32.jpeg" alt="Pages of student handwritten magazine Hastha Dip" loading="lazy" />
              </div>
            </div>

            <div className="ac-pub-text">
              <span className="editorial-eyebrow">
                <Sparkles size={14} aria-hidden />
                {l("STUDENT VOICE & CREATIVITY", "सर्जनशील अभिव्यक्ती", "सर्जनशील अभिव्यक्ती")}
              </span>
              <h2 className="editorial-title">
                {l(
                  "Student Handwritten Journal: 'Hastha Dip' (हस्तदीप)",
                  "विद्यार्थी हस्तलिखित नियतकालिक — 'हस्तदीप'",
                  "विद्यार्थी हस्तलिखित नियतकालिक — 'हस्तदीप'"
                )}
              </h2>
              <div className="editorial-rule editorial-rule--gold" aria-hidden />

              <p className="ac-lead-p">
                {l(
                  "To celebrate budding writers, poets, and calligraphers, our school proudly publishes 'Hastha Dip' — an authentic student-compiled handwritten magazine showcasing original short stories, Marathi poetry, scientific essays, and campus illustrations.",
                  "उदयोन्मुख लेखक, कवी आणि चित्रकारांना व्यासपीठ मिळवून देण्यासाठी शाळा 'हस्तदीप' हे हस्तलिखित नियतकालिक प्रकाशित करते — ज्यात विद्यार्थ्यांचे वैचारिक लेख, कविता आणि चित्रांचा समावेश असतो.",
                  "उदयोन्मुख लेखक, कवी आणि चित्रकारांना व्यासपीठ मिळवून देण्यासाठी शाळा 'हस्तदीप' हे हस्तलिखित नियतकालिक प्रकाशित करते — ज्यात विद्यार्थ्यांचे वैचारिक लेख, कविता आणि चित्रांचा समावेश असतो."
                )}
              </p>

              <div className="editorial-tag editorial-tag--gold">
                {l("100% Student Authored & Curated", "विद्यार्थी संपादन व निर्मिती", "विद्यार्थी संपादन व निर्मिती")}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

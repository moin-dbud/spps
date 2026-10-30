import {
  Monitor, Laptop, Cpu, BookOpen, Compass, Sun,
  QrCode, Accessibility, Droplets, Sprout, Check,
  Building, ShieldCheck,
} from "lucide-react";
import { useI18n } from "../i18n";
import { IMAGE_MANIFEST } from "../data/imageManifest";
import "./Facilities.css";

/* =========================================================
   FACILITIES PAGE — ARCHITECTURAL & INFRASTRUCTURE PORTFOLIO
   P.M. Shri Savitribai Phule School, Babupeth, Chandrapur
   ========================================================= */

export default function Facilities() {
  const { lang } = useI18n();

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  const facilitiesList = [
    {
      id: "smart-classroom",
      index: "01",
      icon: <Monitor size={22} />,
      title: l("Smart Classrooms & Interactive Panels", "स्मार्ट कक्षाएं और इंटरएक्टिव पैनल", "स्मार्ट वर्गखोल्या व डिजिटल पॅनेल्स"),
      image: IMAGE_MANIFEST.smartClassroomScreen?.src || "/assets/images/pptx1/image22.jpeg",
      alt: IMAGE_MANIFEST.smartClassroomScreen?.alt?.[lang] || "Smart Classroom with interactive flat panel",
      tag: "DIGITAL LEARNING",
      desc: l(
        "Modern classrooms equipped with high-definition interactive flat panel displays, animated curriculum modules, and audio-visual instructional aids that turn every lesson into an engaging exploration.",
        "उच्च-परिभाषा इंटरएक्टिव फ्लैट पैनल, मल्टीमीडिया निर्देशात्मक सामग्री और ई-लर्निंग संसाधनों से लैस आधुनिक डिजिटल कक्षाएं।",
        "हाय-डेफिनिशन इंटरॅक्टिव्ह फ्लॅट पॅनेल्स, मल्टिमीडिया शैक्षणिक सामग्री आणि दृकश्राव्य साधनांनी सज्ज आधुनिक स्मार्ट वर्गखोल्या."
      ),
      points: [
        l("High-definition touch panels with multi-point stylus input", "मल्टी-टच इंटरएक्टिव पैनल", "मल्टी-टच परस्परसंवादी डिजिटल पॅनेल्स"),
        l("Curriculum-mapped animated audio-visual modules", "विषयनिहाय डिजिटल ऑडिओ-व्हिज्युअल धडे", "विषयनिहाय डिजिटल ऑडिओ-व्हिज्युअल धडे"),
        l("Significantly higher student engagement & conceptual retention", "छात्रों की रुचि और समझ में वृद्धि", "विद्यार्थ्यांच्या आकलनात व उपस्थितीत लक्षणीय वाढ"),
      ],
    },
    {
      id: "ict-lab",
      index: "02",
      icon: <Laptop size={22} />,
      title: l("ICT Computer Laboratory", "ICT कंप्यूटर प्रयोगशाला", "ICT संगणक प्रयोगशाळा"),
      image: IMAGE_MANIFEST.ictLabTeacher?.src || "/assets/images/pptx1/image24.jpeg",
      alt: IMAGE_MANIFEST.ictLabTeacher?.alt?.[lang] || "ICT Computer Laboratory with student workstations",
      tag: "DIGITAL LITERACY",
      desc: l(
        "A dedicated air-cooled workstation laboratory providing students with hands-on keyboarding, coding fundamentals, software applications, and safe supervised internet exploration.",
        "समर्पित कंप्यूटर वर्कस्टेशन जो छात्रों को प्रारंभिक वर्षों से आवश्यक डिजिटल साक्षरता, कोडिंग मूल बातें और टाइपिंग कौशल सीखने में सक्षम बनाते हैं।",
        "विद्यार्थ्यांना प्राथमिक स्तरापासूनच संगणक साक्षरता, टायपिंग कौशल्ये आणि डिजिटल शिक्षण देणारी अद्ययावत संगणक लॅब."
      ),
      points: [
        l("Dedicated individual student computer terminals", "स्वतंत्र संगणक वर्कस्टेशन", "स्वतंत्र संगणक वर्कस्टेशन"),
        l("Safe, firewall-protected academic internet access", "सुरक्षित व मार्गदर्शित शैक्षणिक इंटरनेट", "सुरक्षित व मार्गदर्शित शैक्षणिक इंटरनेट"),
        l("Educational software for language and mathematics practice", "शैक्षणिक सॉफ्टवेअर्सद्वारे सराव", "शैक्षणिक सॉफ्टवेअर्सद्वारे सराव"),
      ],
    },
    {
      id: "ideal-lab",
      index: "03",
      icon: <Cpu size={22} />,
      title: l("IDEAL Innovation & Tinkering Lab", "IDEAL नवाचार प्रयोगशाला", "IDEAL नवोपक्रम प्रयोगशाळा"),
      image: IMAGE_MANIFEST.idealLabConsoles?.src || "/assets/images/pptx1/image26.jpeg",
      alt: IMAGE_MANIFEST.idealLabConsoles?.alt?.[lang] || "IDEAL Innovation and Tinkering Lab",
      tag: "MAKER INNOVATION",
      desc: l(
        "A specialised experiential maker space designed to encourage problem-solving, collaborative design thinking, electronic tinkering, and experimental ingenuity.",
        "एक व्यावहारिक निर्माता स्थान जो जिज्ञासा, वैज्ञानिक सोच, डिजाइन सोच और सहयोगात्मक नवाचार को बढ़ावा देता है।",
        "विद्यार्थ्यांमध्ये वैज्ञानिक दृष्टिकोन, समस्या निवारण क्षमता आणि नवकल्पनांना वाव देणारी विशेष नवोपक्रम प्रयोगशाळा."
      ),
      points: [
        l("Hands-on DIY engineering and physics experiment kits", "स्वनिर्मित विज्ञान प्रतिकृती किट्स", "स्वनिर्मित विज्ञान प्रतिकृती किट्स"),
        l("Student challenge hackathons and puzzle solving", "समस्या निराकरण व संघकार्य उपक्रम", "समस्या निराकरण व संघकार्य उपक्रम"),
        l("Cultivating scientific inquiry and innovation habits", "संशोधक वृत्ती आणि वैज्ञानिक दृष्टिकोनाचा विकास", "संशोधक वृत्ती आणि वैज्ञानिक दृष्टिकोनाचा विकास"),
      ],
    },
    {
      id: "library",
      index: "04",
      icon: <BookOpen size={22} />,
      title: l("Central Library & Reading Circle", "विद्यालय पुस्तकालय और वाचन कोना", "शालेय ग्रंथालय व वाचन कट्टा"),
      image: IMAGE_MANIFEST.libraryReadingCircle?.src || "/assets/images/pptx1/image29.jpeg",
      alt: IMAGE_MANIFEST.libraryReadingCircle?.alt?.[lang] || "School Library and reading circle",
      tag: "LITERARY HERITAGE",
      desc: l(
        "A curated bilingual sanctuary featuring pictorial encyclopaedias, folk literature, biographies of great leaders, scientific journals, and comfortable reading circles.",
        "संदर्भ पुस्तकों, सचित्र विश्वकोशों, लोक कथाओं, जीवनियों और क्षेत्रीय भाषा साहित्य का समृद्ध संग्रह।",
        "विविध संदर्भ ग्रंथ, माहितीपूर्ण ज्ञानकोश, कथा, चरित्रे आणि बालकवितांचा समृद्ध संग्रह असलेले सुसज्ज ग्रंथालय."
      ),
      points: [
        l("Rich bilingual collection in Marathi and English", "मराठी व इंग्रजी भाषेतील समृद्ध पुस्तके", "मराठी व इंग्रजी भाषेतील समृद्ध पुस्तके"),
        l("Weekly dedicated library hours and book borrowing", "साप्ताहिक वाचन तासिका व पुस्तक देवाणघेवाण", "साप्ताहिक वाचन तासिका व पुस्तक देवाणघेवाण"),
        l("Classroom reading corners in every grade", "प्रत्येक वर्गात स्वतंत्र वाचन कोपरा", "प्रत्येक वर्गात स्वतंत्र वाचन कोपरा"),
      ],
    },
    {
      id: "science-space-lab",
      index: "05",
      icon: <Compass size={22} />,
      title: l("Space & Science Exploration Center", "अंतरिक्ष व विज्ञान प्रयोगशाला", "अंतराळ व विज्ञान प्रयोगशाळा"),
      image: IMAGE_MANIFEST.scienceSpaceLab?.src || "/assets/images/pptx1/image32.jpeg",
      alt: IMAGE_MANIFEST.scienceSpaceLab?.alt?.[lang] || "Space & Science Learning Center with ISRO rockets and astronaut",
      tag: "ASTRONOMY & STEM",
      darkBg: true,
      desc: l(
        "An inspiring scientific pavilion featuring authentic scale replicas of ISRO launch vehicles (PSLV / GSLV), spacesuit astronaut models, celestial globes, and interactive physics apparatus.",
        "इसरो उपग्रह प्रक्षेपण रॉकेट, अंतरिक्ष यात्री मॉडल, ग्रहीय ग्लोब और प्रयोगात्मक उपकरणों से सुसज्ज अंतरिक्ष व विज्ञान केंद्र।",
        "इस्रो उपग्रह प्रक्षेपक (PSLV/GSLV) प्रतिकृती, अंतराळवीर मॉडेल, सूर्यमाला आणि विज्ञानाचे थेट प्रयोग असणारी आधुनिक अंतराळ प्रयोगशाळा."
      ),
      points: [
        l("Authentic models of ISRO launch vehicles & Chandrayaan", "इस्रोचे रॉकेट्स व उपग्रह प्रतिकृतींचे प्रत्यक्ष निरीक्षण", "इस्रोचे रॉकेट्स व उपग्रह प्रतिकृतींचे प्रत्यक्ष निरीक्षण"),
        l("Planetary motion, optics, and mechanics demonstrations", "भौतिकशास्त्र व खगोलशास्त्राचे रंजक प्रयोग", "भौतिकशास्त्र व खगोलशास्त्राचे रंजक प्रयोग"),
        l("Student-curated science exhibitions for the community", "विद्यार्थ्यांच्या सहभागातून विज्ञान प्रदर्शने", "विद्यार्थ्यांच्या सहभागातून विज्ञान प्रदर्शने"),
      ],
    },
    {
      id: "solar-energy",
      index: "06",
      icon: <Sun size={22} />,
      title: l("Rooftop Photovoltaic Solar Grid", "रूफटॉप सौर ऊर्जा प्रणाली", "रूफटॉप सौरऊर्जा यंत्रणा"),
      image: IMAGE_MANIFEST.solarRooftopPanels1?.src || "/assets/images/pptx1/image82.jpeg",
      alt: IMAGE_MANIFEST.solarRooftopPanels1?.alt?.[lang] || "Rooftop photovoltaic solar panel array",
      tag: "CLEAN ENERGY",
      desc: l(
        "A grid-connected rooftop photovoltaic panel array generating clean solar power for school operations, ensuring energy resilience while serving as an on-site educational laboratory.",
        "छत पर स्थापित फोटोवोल्टिक सौर पैनल सरणी जो स्वच्छ नवीकरणीय बिजली पैदा करती है और छात्रों को हरित ऊर्जा की शिक्षा देती है।",
        "शाळेच्या छतावर बसविण्यात आलेली प्रत्यक्ष सौर ऊर्जा पॅनेल यंत्रणा, जी शाळेसाठी अखंडित हरित वीज निर्माण करते."
      ),
      points: [
        l("Self-sufficient green energy generation for campus needs", "शाळेसाठी पर्यावरणपूरक सौर विद्युत निर्मिती", "शाळेसाठी पर्यावरणपूरक सौर विद्युत निर्मिती"),
        l("Live educational demonstration of solar technology", "अपारंपरिक ऊर्जेचे प्रत्यक्ष प्रात्यक्षिक व शिक्षण", "अपारंपरिक ऊर्जेचे प्रत्यक्ष प्रात्यक्षिक व शिक्षण"),
        l("Zero carbon emissions and uninterrupted power", "शाळेच्या वीजबिलात बचत व अखंडित वीजपुरवठा", "शाळेच्या वीजबिलात बचत व अखंडित वीजपुरवठा"),
      ],
    },
    {
      id: "accessibility",
      index: "07",
      icon: <Accessibility size={22} />,
      title: l("Inclusive Barrier-Free Accessibility", "समावेशी दिव्यांग सुलभता", "दिव्यांग सुलभता व अडथळामुक्त परिसर"),
      image: IMAGE_MANIFEST.accessibilityRamp?.src || "/assets/images/pptx1/image35.jpeg",
      alt: IMAGE_MANIFEST.accessibilityRamp?.alt?.[lang] || "Wheelchair tactile gradient ramp for barrier-free access",
      tag: "EQUAL ACCESS",
      desc: l(
        "Engineered tactile non-slip tiled gradient ramps, sturdy bilateral grab rails, and wide level passageways guaranteeing effortless, dignified mobility for children of all physical abilities.",
        "विशेष रूप से निर्मित स्पर्शनीय टाइल ढलान वाले रैम्प, सुरक्षा रेलिंग और बाधा-मुक्त मार्ग जो हर छात्र के लिए गरिमापूर्ण पहुंच सुनिश्चित करते हैं।",
        "टॅक्टाइल टाईल्सयुक्त पक्का रॅम्प, आधार रेलिंग्स आणि अडथळामुक्त मार्ग — प्रत्येक दिव्यांग विद्यार्थ्याला सुलभ वावराची शाश्वती."
      ),
      points: [
        l("Slip-resistant tactile paved ramps for wheelchair transit", "व्हीलचेअर व दिव्यांग विद्यार्थ्यांसाठी पक्का टॅक्टाईल रॅम्प", "व्हीलचेअर व दिव्यांग विद्यार्थ्यांसाठी पक्का टॅक्टाईल रॅम्प"),
        l("Safety handrails extending across verandas and stairs", "व्हरांड्यात व पायऱ्यांजवळ सुरक्षित आधार रेलिंग्स", "व्हरांड्यात व पायऱ्यांजवळ सुरक्षित आधार रेलिंग्स"),
        l("Wheelchair availability and barrier-free circulation", "सुलभ हालचालींसाठी अनुकूल शालेय रचना व व्हीलचेअर्स", "सुलभ हालचालींसाठी अनुकूल शालेय रचना व व्हीलचेअर्स"),
      ],
    },
    {
      id: "water-sanitation",
      index: "08",
      icon: <Droplets size={22} />,
      title: l("Purified Multi-Tap Water & Modern Sanitation", "शुद्ध पेयजल और स्वच्छता", "शुद्ध पिण्याचे पाणी व स्वच्छता"),
      image: IMAGE_MANIFEST.drinkingWaterHandwash?.src || "/assets/images/pptx1/image81.jpeg",
      alt: IMAGE_MANIFEST.drinkingWaterHandwash?.alt?.[lang] || "Multi-tap stainless steel drinking water station",
      tag: "HEALTH & HYGIENE",
      desc: l(
        "A heavy-duty stainless steel multi-tap drinking water station connected to industrial filtration, paired with spacious handwashing stations and sanitized washroom blocks.",
        "छात्रों के लिए शुद्ध जल और स्वच्छ हाथ धोने की सुविधा से युक्त स्टेनलेस स्टील मल्टी-टैप पेयजल स्टेशन।",
        "विद्यार्थ्यांसाठी शुद्ध पिण्याच्या पाण्याचे स्टेनलेस स्टील मल्टि-टॅप युनिट आणि हात धुण्यासाठी स्वच्छ, नियमित निर्जंतुक सोय."
      ),
      points: [
        l("Stainless steel multi-tap clean drinking water unit", "स्टेनलेस स्टीलचे बहु-तोटी शुद्ध पिण्याच्या पाण्याचे युनिट", "स्टेनलेस स्टीलचे बहु-तोटी शुद्ध पिण्याच्या पाण्याचे युनिट"),
        l("Dedicated hygienic handwashing areas with soap points", "आरोग्यदायी सवयींसाठी हात धुण्याची प्रशस्त जागा", "आरोग्यदायी सवयींसाठी हात धुण्याची प्रशस्त जागा"),
        l("Independent, sanitized blocks for boys and girls", "मुला-मुलींसाठी स्वतंत्र, नियमित स्वच्छ स्वच्छतागृहे", "मुला-मुलींसाठी स्वतंत्र, नियमित स्वच्छ स्वच्छतागृहे"),
      ],
    },
    {
      id: "kitchen-garden",
      index: "09",
      icon: <Sprout size={22} />,
      title: l("Student Kitchen Garden (परसबाग)", "विद्यालय पोषण वाटिका (परसबाग)", "शालेय परसबाग (किचन गार्डन)"),
      image: IMAGE_MANIFEST.kitchenGardenCrops?.src || "/assets/images/pptx1/image94.jpeg",
      alt: IMAGE_MANIFEST.kitchenGardenCrops?.alt?.[lang] || "Lush organic brinjal and vegetable crops in school kitchen garden",
      tag: "AGRO-ECOLOGY",
      desc: l(
        "A student-cultivated organic garden on school grounds producing seasonal vegetables such as brinjals, tomatoes, and leafy greens used directly in midday meals.",
        "छात्रों द्वारा पोषित एक सक्रिय जैविक उद्यान, जहाँ मौसमी पत्तेदार सब्जियाँ, टमाटर, बैंगन और औषधीय पौधे उगाए जाते हैं।",
        "विद्यार्थ्यांच्या श्रमदानातून फुललेली सेंद्रिय परसबाग — पालेभाज्या, वांगी, टोमॅटो आणि औषधी वनस्पतींचे प्रत्यक्ष संवर्धन."
      ),
      points: [
        l("Hands-on organic farming, composting, and soil science", "सेंद्रिय शेती व निसर्ग संवर्धनाचे प्रत्यक्ष धडे", "सेंद्रिय शेती व निसर्ग संवर्धनाचे प्रत्यक्ष धडे"),
        l("Harvest directly enriches student nutrition in meals", "शालेय पोषण आहारात परसबागेतील ताज्या भाज्यांचा वापर", "शालेय पोषण आहारात परसबागेतील ताज्या भाज्यांचा वापर"),
        l("Practical commerce lessons through 'School Market'", "शालेय बाजाराच्या माध्यमातून प्रत्यक्ष व्यवहारज्ञान", "शालेय बाजाराच्या माध्यमातून प्रत्यक्ष व्यवहारज्ञान"),
      ],
    },
    {
      id: "qr-learning",
      index: "10",
      icon: <QrCode size={22} />,
      title: l("QR Code–Integrated Digital Curricula", "QR कोड-एकीकृत शिक्षण", "QR कोड-सक्षम डिजिटल अध्ययन"),
      image: IMAGE_MANIFEST.qrCodeScreen?.src || "/assets/images/pptx1/image19.jpeg",
      alt: IMAGE_MANIFEST.qrCodeScreen?.alt?.[lang] || "QR Code linked digital curriculum",
      tag: "SMART CURRICULUM",
      desc: l(
        "Classroom text displays and Balbharati textbooks integrated with quick-response QR codes linking straight to state DIKSHA video lessons and audio simulations.",
        "पाठ्यपुस्तकें और कक्षा बोर्ड QR कोड से जुड़े हैं जो सीधे राज्य ई-लर्निंग सामग्री (DIKSHA / बालभारती) से जुड़ते हैं।",
        "पाठ्यपुस्तके व फलकांवरील QR कोडद्वारे दीक्षा (DIKSHA) व बालभारतीची डिजिटल सामग्री थेट उपलब्ध."
      ),
      points: [
        l("Instant access to high-fidelity conceptual animations", "संकल्पना स्पष्ट करणाऱ्या व्हिडिओ धड्यांची सहज उपलब्धता", "संकल्पना स्पष्ट करणाऱ्या व्हिडिओ धड्यांची सहज उपलब्धता"),
        l("Enables self-paced student revision and independent research", "विद्यार्थ्यांना स्वतःच्या गतीने उजळणीची सोय", "विद्यार्थ्यांना स्वतःच्या गतीने उजळणीची सोय"),
        l("Fully synchronized with SCERT Maharashtra syllabi", "महाराष्ट्र राज्य अभ्यासक्रमाशी सुसंगत", "महाराष्ट्र राज्य अभ्यासक्रमाशी सुसंगत"),
      ],
    },
  ];

  return (
    <div className="facilities-editorial">

      {/* ===== 1. EDITORIAL HEADER ===== */}
      <header className="fc-header bg-parchment-light">
        <div className="container">
          <div className="fc-header__kicker">
            <span className="editorial-tag editorial-tag--gold">
              <Building size={13} aria-hidden />
              <span>{l("CAMPUS INFRASTRUCTURE", "पायाभूत सुविधा संग्रह", "पायाभूत सुविधा संग्रह")}</span>
            </span>
            <span className="fc-header__badge-sub">
              {l("PM SHRI Exemplar Facilities • Municipal Corporation Chandrapur", "पीएम श्री आदर्श पायाभूत सुविधा", "पीएम श्री आदर्श पायाभूत सुविधा")}
            </span>
          </div>

          <h1 className="fc-header__title">
            {l(
              "Architectural Excellence Built for 21st-Century Learning",
              "२१ व्या शतकातील शिक्षणासाठी सज्ज आधुनिक शालेय परिसर",
              "२१ व्या शतकातील शिक्षणासाठी सज्ज आधुनिक शालेय परिसर"
            )}
          </h1>
          <p className="fc-header__lead">
            {l(
              "Every corner of our Babupeth campus is intentionally crafted to stimulate curiosity, ensure dignity, and provide our municipal students with state-of-the-art educational facilities.",
              "बाबूपेठ, चंद्रपूर येथील आमचा परिसर म्हणजे सुरक्षितता, स्वच्छता आणि अत्याधुनिक ज्ञानसाधनेचे एक प्रेरणादायी केंद्र आहे.",
              "बाबूपेठ, चंद्रपूर येथील आमचा परिसर म्हणजे सुरक्षितता, स्वच्छता आणि अत्याधुनिक ज्ञानसाधनेचे एक प्रेरणादायी केंद्र आहे."
            )}
          </p>
        </div>
      </header>

      {/* ===== 2. ALTERNATING ARCHITECTURAL MONOGRAPHS ===== */}
      <div className="fc-portfolio">
        {facilitiesList.map((fac, idx) => {
          const isDark = fac.darkBg;
          const isReversed = idx % 2 === 1;

          return (
            <section
              key={fac.id}
              className={`fc-spread ${isDark ? "bg-forest-deep" : idx % 2 === 0 ? "bg-parchment" : "bg-parchment-light"}`}
              id={fac.id}
            >
              <div className="container">
                <div className={`fc-spread__grid ${isReversed ? "fc-spread__grid--reversed" : ""}`}>

                  {/* Narrative side */}
                  <div className="fc-spread__text">
                    <div className="fc-spread__meta">
                      <span className="fc-spread__index">{fac.index}</span>
                      <span className={`editorial-tag ${isDark ? "editorial-tag--dark" : "editorial-tag--gold"}`}>
                        {fac.tag}
                      </span>
                    </div>

                    <h2 className="fc-spread__title">
                      {fac.title}
                    </h2>

                    <div className={`editorial-rule ${isDark ? "editorial-rule--dark" : "editorial-rule--gold"}`} aria-hidden />

                    <p className="fc-spread__desc">
                      {fac.desc}
                    </p>

                    <div className="fc-spread__points">
                      {fac.points.map((pt, pIdx) => (
                        <div key={pIdx} className="fc-point-item">
                          <Check size={16} className={`fc-point-icon ${isDark ? "ed-icon-gold" : ""}`} />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual side */}
                  <div className="fc-spread__visual">
                    <div className="fc-photo-frame">
                      <img src={fac.image} alt={fac.alt} loading="lazy" />
                      <div className="fc-photo-badge">
                        <span className="fc-badge-icon">{fac.icon}</span>
                        <span className="fc-badge-title">{fac.title}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===== 3. PANORAMIC CAMPUS CLOSING MONOGRAPH ===== */}
      <section className="fc-panoramic bg-parchment-light">
        <div className="container container--wide">
          <div className="fc-panoramic-card">
            <div className="fc-panoramic-img">
              <img
                src={IMAGE_MANIFEST.schoolBuildingPanoramic?.src || "/assets/images/pptx1/image3.jpeg"}
                alt="Panoramic view of PM Shri Savitribai Phule School building and campus"
                loading="lazy"
              />
              <div className="fc-panoramic-overlay">
                <div className="fc-panoramic-info">
                  <span className="editorial-eyebrow">
                    <ShieldCheck size={14} className="ed-icon-gold" aria-hidden />
                    {l("SAFE & NURTURING CAMPUS", "सुरक्षित व बालस्नेही परिसर", "सुरक्षित व बालस्नेही परिसर")}
                  </span>
                  <h3>{l("P.M. Shri Savitribai Phule School Campus Profile", "शाळेचा आधुनिक परिसर", "शाळेचा आधुनिक परिसर")}</h3>
                  <p>Babupeth, Chandrapur, Maharashtra • Ward 18</p>
                  <div className="fc-tags-row">
                    <span className="editorial-tag editorial-tag--dark">CCTV Monitored</span>
                    <span className="editorial-tag editorial-tag--dark">Rooftop Solar Powered</span>
                    <span className="editorial-tag editorial-tag--dark">100% Barrier Free</span>
                    <span className="editorial-tag editorial-tag--dark">RTE & PM SHRI Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

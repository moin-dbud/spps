import {
  Monitor, Laptop, Cpu, BookOpen, Compass, Sun,
  QrCode, Accessibility, Droplets, Sprout, Check,
  Building, ShieldCheck,
} from "lucide-react";
import { useI18n } from "../i18n";
import { IMAGE_MANIFEST } from "../data/imageManifest";
import "./Facilities.css";

export default function Facilities() {
  const { lang } = useI18n();

  const l = (en: string, hi: string, mr: string) =>
    lang === "en" ? en : lang === "hi" ? hi : mr;

  const facilitiesList = [
    {
      id: "smart-classroom",
      icon: <Monitor size={24} />,
      title: l("Smart Classrooms & Interactive Panels", "स्मार्ट कक्षाएं और इंटरएक्टिव पैनल", "स्मार्ट वर्गखोल्या व डिजिटल पॅनेल्स"),
      image: IMAGE_MANIFEST.smartClassroomScreen?.src || "/assets/images/pptx1/image22.jpeg",
      alt: IMAGE_MANIFEST.smartClassroomScreen?.alt?.[lang] || "Smart Classroom with interactive flat panel",
      desc: l(
        "Digital classrooms equipped with high-definition interactive flat panels, multimedia instructional content, and e-learning resources.",
        "उच्च-परिभाषा इंटरएक्टिव फ्लैट पैनल, मल्टीमीडिया निर्देशात्मक सामग्री और ई-लर्निंग संसाधनों से लैस डिजिटल कक्षाएं।",
        "हाय-डेफिनिशन इंटरॅक्टिव्ह फ्लॅट पॅनेल्स, मल्टिमीडिया शैक्षणिक सामग्री आणि ई-लर्निंग साधनांनी सज्ज स्मार्ट वर्गखोल्या."
      ),
      points: [
        l("Audio-visual interactive demonstrations", "दृश्य-श्रव्य इंटरएक्टिव प्रदर्शन", "दृकश्राव्य परस्परसंवादी सादरीकरणे"),
        l("Subject-wise animated educational modules", "विषयवार एनिमेटेड शैक्षणिक मॉड्यूल", "विषयनिहाय डिजिटल ऑडिओ-व्हिज्युअल धडे"),
        l("Enhanced student engagement and retention", "छात्रों की रुचि और समझ में वृद्धि", "विद्यार्थ्यांच्या आकलनात व उपस्थितीत लक्षणीय वाढ"),
      ],
    },
    {
      id: "ict-lab",
      icon: <Laptop size={24} />,
      title: l("ICT Computer Laboratory", "ICT कंप्यूटर प्रयोगशाला", "ICT संगणक प्रयोगशाळा"),
      image: IMAGE_MANIFEST.ictLabTeacher?.src || "/assets/images/pptx1/image24.jpeg",
      alt: IMAGE_MANIFEST.ictLabTeacher?.alt?.[lang] || "ICT Computer Laboratory with student workstations",
      desc: l(
        "Dedicated computer workstations enabling students to acquire essential digital literacy, coding basics, and keyboarding skills from early years.",
        "समर्पित कंप्यूटर वर्कस्टेशन जो छात्रों को प्रारंभिक वर्षों से आवश्यक डिजिटल साक्षरता, कोडिंग मूल बातें और टाइपिंग कौशल सीखने में सक्षम बनाते हैं।",
        "विद्यार्थ्यांना प्राथमिक स्तरापासूनच संगणक साक्षरता, टायपिंग कौशल्ये आणि डिजिटल शिक्षण देणारी अद्ययावत संगणक लॅब."
      ),
      points: [
        l("Hands-on computer operating practice", "कंप्यूटर संचालन का व्यावहारिक अभ्यास", "प्रत्यक्ष संगणक हाताळणीचा सराव"),
        l("Safe supervised internet for research", "शोध के लिए सुरक्षित और पर्यवेक्षित इंटरनेट", "शैक्षणिक संदर्भासाठी सुरक्षित इंटरनेट सुविधा"),
        l("Interactive educational software exercises", "इंटरएक्टिव शैक्षिक सॉफ्टवेयर अभ्यास", "शैक्षणिक सॉफ्टवेअर्सद्वारे सराव"),
      ],
    },
    {
      id: "ideal-lab",
      icon: <Cpu size={24} />,
      title: l("IDEAL Innovation Lab", "IDEAL नवाचार प्रयोगशाला", "IDEAL नवोपक्रम प्रयोगशाळा"),
      image: IMAGE_MANIFEST.idealLabConsoles?.src || "/assets/images/pptx1/image26.jpeg",
      alt: IMAGE_MANIFEST.idealLabConsoles?.alt?.[lang] || "IDEAL Innovation and Tinkering Lab",
      desc: l(
        "An experiential maker space that fosters inquiry, scientific curiosity, design thinking, and collaborative tinkering.",
        "एक व्यावहारिक निर्माता स्थान जो जिज्ञासा, वैज्ञानिक सोच, डिजाइन सोच और सहयोगात्मक नवाचार को बढ़ावा देता है।",
        "विद्यार्थ्यांमध्ये वैज्ञानिक दृष्टिकोन, समस्या निवारण क्षमता आणि नवकल्पनांना वाव देणारी विशेष नवोपक्रम प्रयोगशाळा."
      ),
      points: [
        l("Do-It-Yourself science and engineering kits", "स्वयं-करो (DIY) विज्ञान और इंजीनियरिंग किट", "स्वनिर्मित विज्ञान व अभियांत्रिकी प्रतिकृती किट्स"),
        l("Problem-solving challenges and team hackathons", "समस्या समाधान चुनौतियां और टीम हैकाथॉन", "समस्या निराकरण व संघकार्य उपक्रम"),
        l("Nurturing invention and scientific temperament", "आविष्कार और वैज्ञानिक स्वभाव को प्रोत्साहन", "संशोधक वृत्ती आणि वैज्ञानिक दृष्टिकोनाचा विकास"),
      ],
    },
    {
      id: "library",
      icon: <BookOpen size={24} />,
      title: l("School Library & Reading Corners", "विद्यालय पुस्तकालय और वाचन कोना", "शालेय ग्रंथालय व वाचन कट्टा"),
      image: IMAGE_MANIFEST.libraryReadingCircle?.src || "/assets/images/pptx1/image29.jpeg",
      alt: IMAGE_MANIFEST.libraryReadingCircle?.alt?.[lang] || "School Library and reading circle",
      desc: l(
        "A collection of reference books, pictorial encyclopaedias, folk tales, biographies, and regional language literature.",
        "संदर्भ पुस्तकों, सचित्र विश्वकोशों, लोक कथाओं, जीवनियों और क्षेत्रीय भाषा साहित्य का समृद्ध संग्रह।",
        "विविध संदर्भ ग्रंथ, माहितीपूर्ण ज्ञानकोश, कथा, चरित्रे आणि बालकवितांचा समृद्ध संग्रह असलेले सुसज्ज ग्रंथालय."
      ),
      points: [
        l("Rich bilingual collection in Marathi and English", "मराठी और अंग्रेजी में समृद्ध द्विभाषी संग्रह", "मराठी व इंग्रजी भाषेतील समृद्ध पुस्तके"),
        l("Dedicated weekly library and reading periods", "साप्ताहिक समर्पित पुस्तकालय और पठन कालांश", "साप्ताहिक वाचन तासिका व पुस्तक देवाणघेवाण"),
        l("Fostering independent reading habit", "स्वतंत्र पठन की आदत का विकास", "स्वयंअध्ययन व निरंतर वाचनाची सवय"),
      ],
    },
    {
      id: "science-space-lab",
      icon: <Compass size={24} />,
      title: l("Space & Science Learning Center", "अंतरिक्ष व विज्ञान प्रयोगशाला", "अंतराळ व विज्ञान प्रयोगशाळा"),
      image: IMAGE_MANIFEST.scienceSpaceLab?.src || "/assets/images/pptx1/image32.jpeg",
      alt: IMAGE_MANIFEST.scienceSpaceLab?.alt?.[lang] || "Space & Science Learning Center with ISRO rockets and astronaut",
      desc: l(
        "Dedicated space learning center featuring astronaut replicas, ISRO satellite launch rockets (PSLV/GSLV), planetary models, and experimental apparatus.",
        "इसरो उपग्रह प्रक्षेपण रॉकेट, अंतरिक्ष यात्री मॉडल, ग्रहीय ग्लोब और प्रयोगात्मक उपकरणों से सुसज्ज अंतरिक्ष व विज्ञान केंद्र।",
        "इस्रो उपग्रह प्रक्षेपक (PSLV/GSLV) प्रतिकृती, अंतराळवीर मॉडेल, सूर्यमाला आणि विज्ञानाचे थेट प्रयोग असणारी आधुनिक अंतराळ प्रयोगशाळा."
      ),
      points: [
        l("Authentic models of ISRO launch vehicles & satellites", "इसरो प्रक्षेपण यान और उपग्रहों के वास्तविक मॉडल", "इस्रोचे रॉकेट्स व उपग्रह प्रतिकृतींचे प्रत्यक्ष निरीक्षण"),
        l("Hands-on physics and astronomy demonstrations", "भौतिकी और खगोल विज्ञान के व्यावहारिक प्रदर्शन", "भौतिकशास्त्र व खगोलशास्त्राचे रंजक प्रयोग"),
        l("Student-led experimental showcases and science clubs", "छात्र-नेतृत्व वाले प्रयोगात्मक प्रदर्शन व विज्ञान क्लब", "विद्यार्थ्यांच्या सहभागातून विज्ञान प्रदर्शने"),
      ],
    },
    {
      id: "solar-energy",
      icon: <Sun size={24} />,
      title: l("Rooftop Solar Energy System", "रूफटॉप सौर ऊर्जा प्रणाली", "रूफटॉप सौरऊर्जा यंत्रणा"),
      image: IMAGE_MANIFEST.solarRooftopPanels1?.src || "/assets/images/pptx1/image82.jpeg",
      alt: IMAGE_MANIFEST.solarRooftopPanels1?.alt?.[lang] || "Rooftop photovoltaic solar panel array",
      desc: l(
        "Rooftop photovoltaic solar panel array generating clean renewable electricity and serving as an on-site educational laboratory for sustainability.",
        "छत पर स्थापित फोटोवोल्टिक सौर पैनल सरणी जो स्वच्छ नवीकरणीय बिजली पैदा करती है और छात्रों को हरित ऊर्जा की शिक्षा देती है।",
        "शाळेच्या छतावर बसविण्यात आलेली प्रत्यक्ष सौर ऊर्जा पॅनेल यंत्रणा, जी शाळेसाठी अखंडित हरित वीज निर्माण करते."
      ),
      points: [
        l("Rooftop photovoltaic grid providing clean energy", "स्वच्छ ऊर्जा प्रदान करने वाला फोटोवोल्टिक ग्रिड", "शाळेसाठी पर्यावरणपूरक सौर विद्युत निर्मिती"),
        l("Direct environmental education on renewable energy", "नवीकरणीय ऊर्जा पर प्रत्यक्ष पर्यावरण शिक्षा", "अपारंपरिक ऊर्जेचे प्रत्यक्ष प्रात्यक्षिक व शिक्षण"),
        l("Reduced carbon footprint and power resilience", "कार्बन उत्सर्जन में कमी व निर्बाध विद्युत आपूर्ति", "शाळेच्या वीजबिलात बचत व अखंडित वीजपुरवठा"),
      ],
    },
    {
      id: "qr-learning",
      icon: <QrCode size={24} />,
      title: l("QR Code–Integrated Learning", "QR कोड-एकीकृत शिक्षण", "QR कोड-सक्षम डिजिटल अध्ययन"),
      image: IMAGE_MANIFEST.qrCodeScreen?.src || "/assets/images/pptx1/image19.jpeg",
      alt: IMAGE_MANIFEST.qrCodeScreen?.alt?.[lang] || "QR Code linked digital curriculum",
      desc: l(
        "Textbooks and classroom displays integrated with QR codes linked directly to state e-learning content (DIKSHA / Balbharati).",
        "पाठ्यपुस्तकें और कक्षा बोर्ड QR कोड से जुड़े हैं जो सीधे राज्य ई-लर्निंग सामग्री (DIKSHA / बालभारती) से जुड़ते हैं।",
        "पाठ्यपुस्तके व फलकांवरील QR कोडद्वारे दीक्षा (DIKSHA) व बालभारतीची डिजिटल सामग्री थेट उपलब्ध."
      ),
      points: [
        l("Instant access to supplementary video explainers", "पूरक वीडियो पाठों तक त्वरित पहुंच", "संकल्पना स्पष्ट करणाऱ्या व्हिडिओ धड्यांची सहज उपलब्धता"),
        l("Self-paced revision for learners at home or school", "घर या स्कूल में छात्रों के लिए स्व-गति से पुनरावृत्ति", "विद्यार्थ्यांना स्वतःच्या गतीने उजळणीची सोय"),
        l("Aligned with Maharashtra State Curriculum", "महाराष्ट्र राज्य पाठ्यक्रम के अनुरूप", "महाराष्ट्र राज्य अभ्यासक्रमाशी सुसंगत"),
      ],
    },
    {
      id: "accessibility",
      icon: <Accessibility size={24} />,
      title: l("Inclusive Accessibility (Divyang)", "समावेशी दिव्यांग सुलभता", "दिव्यांग सुलभता व अडथळामुक्त परिसर"),
      image: IMAGE_MANIFEST.accessibilityRamp?.src || "/assets/images/pptx1/image35.jpeg",
      alt: IMAGE_MANIFEST.accessibilityRamp?.alt?.[lang] || "Wheelchair tactile gradient ramp for barrier-free access",
      desc: l(
        "Specially engineered tactile tiled gradient ramps, safety grab rails, and barrier-free passageways ensuring dignified access for every learner.",
        "विशेष रूप से निर्मित स्पर्शनीय टाइल ढलान वाले रैम्प, सुरक्षा रेलिंग और बाधा-मुक्त मार्ग जो हर छात्र के लिए गरिमापूर्ण पहुंच सुनिश्चित करते हैं।",
        "टॅक्टाइल टाईल्सयुक्त पक्का रॅम्प, आधार रेलिंग्स आणि अडथळामुक्त मार्ग — प्रत्येक दिव्यांग विद्यार्थ्याला सुलभ वावराची शाश्वती."
      ),
      points: [
        l("Permanent non-slip tactile tiled ramp for wheelchair access", "व्हीलचेयर पहुंच के लिए पक्का फिसलन-रोधी स्पर्शनीय रैम्प", "व्हीलचेअर व दिव्यांग विद्यार्थ्यांसाठी पक्का टॅक्टाईल रॅम्प"),
        l("Supportive handrails along corridors and verandas", "बरामदों और गलियारों में मजबूत आधार रेलिंग", "व्हरांड्यात व पायऱ्यांजवळ सुरक्षित आधार रेलिंग्स"),
        l("Mobility aids and accessible barrier-free campus layout", "गतिशीलता सहायता और सुलभ बाधा-मुक्त विद्यालय लेआउट", "सुलभ हालचालींसाठी अनुकूल शालेय रचना व व्हीलचेअर्स"),
      ],
    },
    {
      id: "water-sanitation",
      icon: <Droplets size={24} />,
      title: l("Purified Drinking Water & Sanitation", "शुद्ध पेयजल और स्वच्छता", "शुद्ध पिण्याचे पाणी व स्वच्छता"),
      image: IMAGE_MANIFEST.drinkingWaterHandwash?.src || "/assets/images/pptx1/image81.jpeg",
      alt: IMAGE_MANIFEST.drinkingWaterHandwash?.alt?.[lang] || "Multi-tap stainless steel drinking water station",
      desc: l(
        "Stainless steel multi-tap drinking water station with verified water purification and hygienic handwashing facilities for students.",
        "छात्रों के लिए शुद्ध जल और स्वच्छ हाथ धोने की सुविधा से युक्त स्टेनलेस स्टील मल्टी-टैप पेयजल स्टेशन।",
        "विद्यार्थ्यांसाठी शुद्ध पिण्याच्या पाण्याचे स्टेनलेस स्टील मल्टि-टॅप युनिट आणि हात धुण्यासाठी स्वच्छ, नियमित निर्जंतुक सोय."
      ),
      points: [
        l("Stainless steel multi-tap clean drinking water station", "स्टेनलेस स्टील मल्टी-टैप स्वच्छ पेयजल स्टेशन", "स्टेनलेस स्टीलचे बहु-तोटी शुद्ध पिण्याच्या पाण्याचे युनिट"),
        l("Supervised handwashing points promoting hygiene", "स्वच्छता को बढ़ावा देने वाले हाथ धोने के केंद्र", "आरोग्यदायी सवयींसाठी हात धुण्याची प्रशस्त जागा"),
        l("Separate sanitized washroom blocks for boys and girls", "लड़कों और लड़कियों के लिए अलग स्वच्छ शौचालय ब्लॉक", "मुला-मुलींसाठी स्वतंत्र, नियमित स्वच्छ स्वच्छतागृहे"),
      ],
    },
    {
      id: "kitchen-garden",
      icon: <Sprout size={24} />,
      title: l("School Kitchen Garden (परसबाग)", "विद्यालय पोषण वाटिका (परसबाग)", "शालेय परसबाग (किचन गार्डन)"),
      image: IMAGE_MANIFEST.kitchenGardenCrops?.src || "/assets/images/pptx1/image94.jpeg",
      alt: IMAGE_MANIFEST.kitchenGardenCrops?.alt?.[lang] || "Lush organic brinjal and vegetable crops in school kitchen garden",
      desc: l(
        "An active organic garden tended by students, growing seasonal leafy greens, tomatoes, brinjal, and herbal plants on the school grounds.",
        "छात्रों द्वारा पोषित एक सक्रिय जैविक उद्यान, जहाँ मौसमी पत्तेदार सब्जियाँ, टमाटर, बैंगन और औषधीय पौधे उगाए जाते हैं।",
        "विद्यार्थ्यांच्या श्रमदानातून फुललेली सेंद्रिय परसबाग — पालेभाज्या, वांगी, टोमॅटो आणि औषधी वनस्पतींचे प्रत्यक्ष संवर्धन."
      ),
      points: [
        l("Hands-on organic farming and horticulture skills", "जैविक खेती और बागवानी कौशल का व्यावहारिक ज्ञान", "सेंद्रिय शेती व निसर्ग संवर्धनाचे प्रत्यक्ष धडे"),
        l("Fresh harvest supplementing midday meals", "मध्याह्न भोजन में ताजी सब्जियों का समावेश", "शालेय पोषण आहारात परसबागेतील ताज्या भाज्यांचा वापर"),
        l("Entrepreneurial 'School Market' project linkages", "उद्यमिता 'स्कूल मार्केट' परियोजना से जुड़ाव", "शालेय बाजाराच्या माध्यमातून प्रत्यक्ष व्यवहारज्ञान"),
      ],
    },
  ];

  return (
    <div className="facilities-page">
      {/* Header */}
      <section className="page-header">
        <h1 className="page-header__title">
          {l("Campus & Facilities", "परिसर और सुविधाएं", "परिसर आणि सुविधा")}
        </h1>
        <p className="page-header__sub">
          {l(
            "State-of-the-art educational infrastructure designed to nurture modern 21st-century learners in Babupeth, Chandrapur.",
            "बाबूपेठ, चंद्रपुर में 21वीं सदी के छात्रों के पोषण के लिए निर्मित अत्याधुनिक शैक्षिक बुनियादी ढाँचा।",
            "बाबूपेठ, चंद्रपूर येथे २१ व्या शतकातील विद्यार्थ्यांना घडविण्यासाठी सज्ज आधुनिक व सर्वसमावेशक शालेय पायाभूत सुविधा."
          )}
        </p>
      </section>

      {/* Facilities Grid */}
      <section className="section facilities-main">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Building size={14} aria-hidden />
              {l("Learning Environment", "अधिगम वातावरण", "अध्ययन वातावरण")}
            </span>
            <h2 className="section-title">
              {l("Modern Infrastructure Portfolio", "आधुनिक बुनियादी ढांचा पोर्टफोलियो", "आधुनिक पायाभूत सुविधा संग्रह")}
            </h2>
            <div className="divider" aria-hidden />
          </div>

          <div className="facilities-grid">
            {facilitiesList.map((fac) => (
              <article key={fac.id} className="facility-card card">
                <div className="facility-card__img-wrap">
                  <img src={fac.image} alt={fac.alt} loading="lazy" />
                  <div className="facility-card__icon">{fac.icon}</div>
                </div>
                <div className="facility-card__body">
                  <h3 className="facility-card__title">{fac.title}</h3>
                  <p className="facility-card__desc">{fac.desc}</p>
                  <ul className="facility-card__points">
                    {fac.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <Check size={14} className="facility-check" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Campus Overview */}
      <section className="section--sm facilities-overview">
        <div className="container">
          <div className="two-col">
            <div className="two-col__img">
              <img
                src={IMAGE_MANIFEST.schoolBuildingPanoramic?.src || "/assets/images/pptx1/image3.jpeg"}
                alt={IMAGE_MANIFEST.schoolBuildingPanoramic?.alt?.[lang] || "PM Shri Savitribai Phule School building campus"}
                loading="lazy"
              />
            </div>
            <div>
              <span className="section-label">
                <ShieldCheck size={14} aria-hidden />
                {l("Safe Campus", "सुरक्षित परिसर", "सुरक्षित परिसर")}
              </span>
              <h2 className="section-title">
                {l(
                  "Dignified, Child-Centric Campus Environment",
                  "गरिमापूर्ण, बाल-केंद्रित विद्यालय परिसर",
                  "सन्मानजनक व बालस्नेही शालेय परिसर"
                )}
              </h2>
              <div className="divider" aria-hidden />
              <p style={{ color: "var(--clr-neutral-700)", lineHeight: 1.8, marginBottom: "var(--space-4)" }}>
                {l(
                  "Situated in Babupeth, Chandrapur, our campus is designed to be a welcoming sanctuary of knowledge where safety, cleanliness, and intellectual stimulation come together. From rooftop solar panels to wheelchair-accessible ramps, every facility is tailored for student growth.",
                  "बाबूपेठ, चंद्रपुर में स्थित हमारा परिसर ज्ञान का एक ऐसा स्वागतयोग्य केंद्र है जहाँ सुरक्षा, स्वच्छता और बौद्धिक प्रेरणा का सुंदर संगम है। रूफटॉप सोलर से लेकर व्हीलचेयर रॅम्प तक, हर सुविधा छात्र विकास के लिए समर्पित है।",
                  "बाबूपेठ, चंद्रपूर येथे वसलेला आमचा परिसर म्हणजे सुरक्षितता, स्वच्छता आणि ज्ञानसाधनेचे एक प्रेरणादायी केंद्र आहे. रूफटॉप सौरऊर्जेपासून ते दिव्यांग रॅम्पपर्यंत, प्रत्येक सुविधा विद्यार्थ्यांच्या सर्वांगीण विकासासाठी सज्ज आहे."
                )}
              </p>
              <div className="campus-badge-row">
                <div className="badge badge-green">{l("CCTV Monitored", "CCTV निगरानी", "CCTV देखरेख")}</div>
                <div className="badge badge-green">{l("Barrier-Free Access", "बाधा-मुक्त पहुंच", "अडथळामुक्त परिसर")}</div>
                <div className="badge badge-green">{l("Green Solar Campus", "हरित सौर परिसर", "हरित सौर परिसर")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

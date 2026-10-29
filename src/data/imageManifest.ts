/**
 * CENTRAL IMAGE MANIFEST — P.M. SHRI SAVITRIBAI PHULE HIGH SCHOOL, CHANDRAPUR
 * ===========================================================================
 * Verified semantic mapping of every image extracted from:
 *   1. "Presentation 2026-27.pptx" (pptx1)
 *   2. "Upkram 1.pptx" (pptx2)
 *
 * Each image has been audited against its original presentation slide and visual content.
 */

export interface ManifestImage {
  id: string;
  src: string;
  name: string;
  subject: string;
  category: "campus" | "digital" | "academics" | "environment" | "wellbeing" | "sports" | "governance" | "press" | "heritage";
  suitableForPublic: boolean;
  alt: {
    mr: string;
    en: string;
    hi: string;
  };
  recommendedSection: string;
  notes?: string;
}

export const IMAGE_MANIFEST: Record<string, ManifestImage> = {
  // ===== SCHOOL IDENTITY & CAMPUS =====
  schoolBuildingFront: {
    id: "p1_img2",
    src: "/assets/images/pptx1/image2.jpeg",
    name: "School Entrance Facade",
    subject: "Official school building front with yellow PM Shri Savitribai Phule signage and entrance gate",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "पी.एम. श्री सावित्रीबाई फुले हायस्कूल इमारत प्रवेशद्वार",
      en: "Front entrance and facade of P.M. Shri Savitribai Phule High School",
      hi: "पी.एम. श्री सावित्रीबाई फुले हाई स्कूल भवन मुख्य द्वार",
    },
    recommendedSection: "Hero, About, Facilities Overview",
  },

  schoolBuildingPanoramic: {
    id: "p1_img3",
    src: "/assets/images/pptx1/image3.jpeg",
    name: "Modern School Building Panorama",
    subject: "Full front panoramic view of the school building, courtyard, and paved surroundings",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "शाळेची आधुनिक दोन मजली इमारत व भव्य प्रांगण",
      en: "Full panoramic view of the modern school building and paved campus",
      hi: "विद्यालय की आधुनिक दो मंजिला इमारत व भव्य प्रांगण",
    },
    recommendedSection: "About Identity, Campus Profile",
  },

  savitribaiPortrait: {
    id: "p1_img4",
    src: "/assets/images/pptx1/image4.jpeg",
    name: "Krantijyoti Savitribai Phule Portrait",
    subject: "Official portrait of Krantijyoti Savitribai Phule",
    category: "heritage",
    suitableForPublic: true,
    alt: {
      mr: "क्रांतिज्योती सावित्रीबाई फुले यांचे तैलचित्र",
      en: "Portrait of Krantijyoti Savitribai Phule",
      hi: "क्रांतिज्योति सावित्रीबाई फुले का चित्र",
    },
    recommendedSection: "About Tribute, Header/Footer Branding",
  },

  chandrapurMuncipalSeal: {
    id: "p1_img5",
    src: "/assets/images/pptx1/image5.png",
    name: "Chandrapur Municipal Corporation Seal",
    subject: "Official emblem of Chandrapur City Municipal Corporation (चंद्रपूर शहर महानगरपालिका)",
    category: "governance",
    suitableForPublic: true,
    alt: {
      mr: "चंद्रपूर शहर महानगरपालिका अधिकृत बोधचिन्ह",
      en: "Official Emblem of Chandrapur City Municipal Corporation",
      hi: "चंद्रपुर शहर महानगरपालिका आधिकारिक प्रतीक",
    },
    recommendedSection: "Header, Footer, About School Management",
  },

  // ===== DIGITAL LEARNING & LABS =====
  smartClassroomScreen: {
    id: "p1_img22",
    src: "/assets/images/pptx1/image22.jpeg",
    name: "Smart Classroom Digital Display",
    subject: "Students in school uniform seated at desks watching educational content on high-definition interactive panel",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "स्मार्ट वर्गखोलीत इंटरॅक्टिव्ह पॅनेलवर डिजिटल शिक्षण घेणारे विद्यार्थी",
      en: "Students in uniform learning with interactive flat panel display in smart classroom",
      hi: "स्मार्ट कक्षा में इंटरएक्टिव पैनल पर डिजिटल अध्ययन करते छात्र",
    },
    recommendedSection: "Facilities (Smart Classroom), Home Digital Section",
  },

  smartClassroomTeaching: {
    id: "p1_img21",
    src: "/assets/images/pptx1/image21.jpeg",
    name: "Smart Classroom Interactive Teaching",
    subject: "Teacher explaining mathematics on digital touch interactive panel in front of students",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "शिक्षक डिजिटल पॅनेलवर गणित शिकवताना",
      en: "Teacher solving mathematics problems on the smart interactive panel",
      hi: "शिक्षक स्मार्ट पैनल पर गणित का अध्यापन करते हुए",
    },
    recommendedSection: "Academics (Digital Learning), Facilities",
  },

  ictLabTeacher: {
    id: "p1_img23",
    src: "/assets/images/pptx1/image23.jpeg",
    name: "ICT Computer Lab Workstations",
    subject: "Teacher guiding students seated at individual desktop computer workstations",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "ICT संगणक लॅबमध्ये संगणक शिकणारे विद्यार्थी व शिक्षक",
      en: "Teacher guiding students at individual computer workstations in the ICT Lab",
      hi: "ICT कंप्यूटर लैब में छात्रों का मार्गदर्शन करते शिक्षक",
    },
    recommendedSection: "Facilities (ICT Lab)",
  },

  ictLabRow: {
    id: "p1_img24",
    src: "/assets/images/pptx1/image24.jpeg",
    name: "ICT Computer Lab Row",
    subject: "Row of students practicing computer operations on modern desktop monitors",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "संगणक प्रयोगशाळेत संगणकाचा सराव करणारे विद्यार्थी",
      en: "Row of students practicing digital applications in computer lab",
      hi: "कंप्यूटर लैब में कंप्यूटर का व्यावहारिक अभ्यास करते छात्र",
    },
    recommendedSection: "Facilities (ICT Lab), Academics",
  },

  idealLabConsoles: {
    id: "p1_img25",
    src: "/assets/images/pptx1/image25.jpeg",
    name: "IDEAL Innovation & Language Lab",
    subject: "State-of-the-art IDEAL lab with specialized student consoles, audio headsets, and smart board",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "अत्याधुनिक IDEAL इनोव्हेशन व भाषा प्रयोगशाळा",
      en: "State-of-the-art IDEAL innovation and language lab with individual consoles and headsets",
      hi: "अत्याधुनिक IDEAL नवाचार व भाषा प्रयोगशाला",
    },
    recommendedSection: "Facilities (IDEAL Lab)",
  },

  idealLabInstructor: {
    id: "p1_img26",
    src: "/assets/images/pptx1/image26.jpeg",
    name: "IDEAL Lab Session in Progress",
    subject: "Instructor conducting an interactive session in the IDEAL lab with students wearing headsets",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "IDEAL लॅबमध्ये डिजिटल प्रात्यक्षिकाचे सत्र",
      en: "Instructor demonstrating digital modules to students in the IDEAL lab",
      hi: "IDEAL लैब में डिजिटल सत्र का संचालन",
    },
    recommendedSection: "Facilities (IDEAL Lab), Home Digital",
  },

  qrCodeScreen: {
    id: "p1_img27",
    src: "/assets/images/pptx1/image27.jpeg",
    name: "QR Code-Linked Classroom Learning",
    subject: "Interactive screen showing mathematical problem with live QR code for instant student access",
    category: "digital",
    suitableForPublic: true,
    alt: {
      mr: "डिजिटल फलकावर QR कोडद्वारे शैक्षणिक सामग्री उपलब्धता",
      en: "Interactive display generating QR codes for supplementary learning resources",
      hi: "स्मार्ट पैनल पर QR कोड से जुड़ी डिजिटल अध्ययन सामग्री",
    },
    recommendedSection: "Facilities (QR Learning), Academics",
  },

  libraryReadingCircle: {
    id: "p1_img29",
    src: "/assets/images/pptx1/image29.jpeg",
    name: "School Library Reading Activity",
    subject: "Students seated in reading circle reading storybooks and reference texts next to library cupboards",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "शालेय ग्रंथालयात वाचन आनंद घेणारे विद्यार्थी",
      en: "Students reading books and encyclopaedias in the school library reading corner",
      hi: "विद्यालय पुस्तकालय में स्वाध्याय करते छात्र",
    },
    recommendedSection: "Facilities (Library), Academics",
  },

  libraryCupboard: {
    id: "p1_img30",
    src: "/assets/images/pptx1/image30.jpeg",
    name: "School Library Reference Section",
    subject: "Teacher reviewing student reading records beside multi-shelf library book cupboard",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "शालेय ग्रंथालय कपाट व वाचन नोंद वह्या",
      en: "Library book shelves and teacher reading log station",
      hi: "पुस्तकालय संकलन और शिक्षक पठन कक्ष",
    },
    recommendedSection: "Facilities (Library)",
  },

  scienceSpaceLab: {
    id: "p1_img32",
    src: "/assets/images/pptx1/image32.jpeg",
    name: "Space & Science Learning Center",
    subject: "Astronaut model, ISRO rockets (PSLV/GSLV), planetary globes, and science exhibition hall",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "अंतराळ व विज्ञान प्रयोगशाळा — इस्रो रॉकेट्स व अंतराळवीर प्रतिकृती",
      en: "Space and Science Lab featuring astronaut replica, ISRO rockets, and planetary models",
      hi: "अंतरिक्ष व विज्ञान प्रयोगशाला — इसरो रॉकेट एवं अंतरिक्ष यात्री मॉडल",
    },
    recommendedSection: "Facilities (Science & Math Lab), Academics",
    notes: "Previously misassigned to Solar Energy. Corrected to Space & Science Lab.",
  },

  // ===== ACCESSIBILITY & SANITATION (AUDITED & CORRECTED) =====
  accessibilityRamp: {
    id: "p1_img35",
    src: "/assets/images/pptx1/image35.jpeg",
    name: "Divyang Wheelchair Accessibility Ramp",
    subject: "Permanent non-slip tactile tiled ramp leading into school building for wheelchair and barrier-free access",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "दिव्यांग विद्यार्थ्यांसाठी पक्का रॅम्प व अडथळामुक्त प्रवेश मार्ग",
      en: "Tactile tiled accessibility ramp ensuring barrier-free entrance for Divyang students",
      hi: "दिव्यांग छात्रों के लिए बाधा-मुक्त व्हीलचेयर रैम्प मार्ग",
    },
    recommendedSection: "Facilities (Accessibility / Divyang), About",
    notes: "Verified authentic accessibility ramp photograph.",
  },

  accessibilityWheelchairs: {
    id: "p1_img34",
    src: "/assets/images/pptx1/image34.jpeg",
    name: "Student Mobility Wheelchairs",
    subject: "Two dedicated student mobility wheelchairs in school corridor for students with physical needs",
    category: "wellbeing",
    suitableForPublic: true,
    alt: {
      mr: "दिव्यांग विद्यार्थ्यांच्या मदतीसाठी शाळेत उपलब्ध व्हीलचेअर्स",
      en: "Two wheelchairs available at the school for students with mobility needs",
      hi: "दिव्यांग छात्रों की गतिशीलता सहायता हेतु उपलब्ध व्हीलचेयर",
    },
    recommendedSection: "Facilities (Accessibility / Divyang)",
    notes: "Previously misassigned to Drinking Water. Corrected to Accessibility.",
  },

  accessibleSanitation: {
    id: "p1_img33",
    src: "/assets/images/pptx1/image33.jpeg",
    name: "Accessible Western Sanitation Facility",
    subject: "Clean tiled western-style commode with flush tank for accessible sanitation",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "दिव्यांग व विशेष गरजा असणाऱ्यांसाठी सुलभ शौचालय सुविधा",
      en: "Accessible western-style toilet facility with flush and tiled interior",
      hi: "दिव्यांग व सुलभ उपयोग हेतु पश्चिमी शैली का स्वच्छ शौचालय",
    },
    recommendedSection: "Facilities (Accessibility & Sanitation)",
  },

  drinkingWaterHandwash: {
    id: "p1_img81",
    src: "/assets/images/pptx1/image81.jpeg",
    name: "Purified Water & Multi-Tap Handwashing Station",
    subject: "Students in school uniform happily washing hands and drinking at stainless steel multi-tap water station",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "स्टेनलेस स्टील जलकुंभावर स्वच्छ पाणी पिणारे व हात धुवणारे विद्यार्थी",
      en: "Students washing hands and accessing purified drinking water at multi-tap stainless steel facility",
      hi: "स्टेनलेस स्टील वाटर स्टेशन पर हाथ धोते और जल पीते विद्यार्थी",
    },
    recommendedSection: "Facilities (Purified Drinking Water & Sanitation), Home",
    notes: "Extracted from Slide 41 (Jalsamvardhan). Perfectly depicts drinking water and sanitation.",
  },

  rainwaterHarvesting: {
    id: "p1_img80",
    src: "/assets/images/pptx1/image80.jpeg",
    name: "Rooftop Rainwater Harvesting Downpipe",
    subject: "Rainwater harvesting PVC pipe draining clean rooftop water into school garden recharge point",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "छतावरील पावसाचे पाणी साठवणारी जलसंवर्धन यंत्रणा",
      en: "Rooftop rainwater harvesting and drainage recharge pipe into the school garden",
      hi: "छत से वर्षा जल संचयन और पुनर्भरण पाइप प्रणाली",
    },
    recommendedSection: "Facilities (Water Conservation), Environment",
  },

  // ===== SOLAR ENERGY (AUDITED & CORRECTED) =====
  solarRooftopPanels1: {
    id: "p1_img82",
    src: "/assets/images/pptx1/image82.jpeg",
    name: "Rooftop Solar PV Array",
    subject: "Array of rooftop photovoltaic solar panels mounted on school building terrace with open sky and palm trees",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "शाळेच्या छतावर बसविण्यात आलेली सौरऊर्जा पॅनेल्स प्रणाली",
      en: "Photovoltaic solar energy panels mounted on the school building rooftop",
      hi: "विद्यालय की छत पर स्थापित सौर ऊर्जा पैनल प्रणाली",
    },
    recommendedSection: "Facilities (Solar Energy), Environment, Home",
    notes: "Verified from Slide 42 (Saururja). Authentically shows school rooftop solar system.",
  },

  solarRooftopPanels2: {
    id: "p1_img83",
    src: "/assets/images/pptx1/image83.jpeg",
    name: "Rooftop Solar Installation Full View",
    subject: "Multiple rows of elevated solar photovoltaic panels generating clean renewable electricity for the school",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "शाळेसाठी वीजनिर्मिती करणारा छतावरील सौर प्रकल्प",
      en: "Multi-row rooftop solar installation powering the school with clean energy",
      hi: "विद्यालय को स्वच्छ बिजली प्रदान करने वाला सौर ऊर्जा संयंत्र",
    },
    recommendedSection: "Facilities (Solar Energy), Environment",
  },

  // ===== ENVIRONMENT & SUSTAINABILITY =====
  ecoClubInaugurationBanner: {
    id: "p1_img95",
    src: "/assets/images/pptx1/image95.jpeg",
    name: "Eco Club Ribbon Cutting Ceremony",
    subject: "Teachers, guests, and student representatives inaugurating the official Eco Club banner",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "पर्यावरण संवर्धन — ईको क्लबचे अधिकृत उद्घाटन",
      en: "Teachers and students inaugurating the official Eco Club banner",
      hi: "पर्यावरण संरक्षण — इको क्लब का आधिकारिक उद्घाटन",
    },
    recommendedSection: "Activities (Eco Club), Environment",
  },

  ecoClubPlantationDrive: {
    id: "p1_img96",
    src: "/assets/images/pptx1/image96.jpeg",
    name: "Eco Club Tree Plantation Ceremony",
    subject: "Staff and student Eco Club members planting sapling in school compound",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "ईको क्लब सदस्यांद्वारे शालेय परिसरात वृक्षारोपण",
      en: "Staff and student Eco Club members planting trees in the school garden",
      hi: "इको क्लब के सदस्यों द्वारा विद्यालय में वृक्षारोपण",
    },
    recommendedSection: "Activities (Eco Club), Home Environment",
  },

  treePlantationStudents: {
    id: "p1_img85",
    src: "/assets/images/pptx1/image85.jpeg",
    name: "Students Gardening in Hexagonal Beds",
    subject: "Students weeding and tending plants in colorful geometric brick garden beds",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "रंगीबेरंगी वाफ्यांमध्ये झाडांची निगा राखणारे विद्यार्थी",
      en: "Students caring for saplings in hexagonal school garden beds",
      hi: "उद्यान क्यारियों में पौधों की देखभाल करते विद्यार्थी",
    },
    recommendedSection: "Activities, Environment",
  },

  treePlantationMotherChild1: {
    id: "p1_img86",
    src: "/assets/images/pptx1/image86.jpeg",
    name: "Ek Ped Maa Ke Naam — Mother and Daughter",
    subject: "School girl and her mother planting a tree together under 'Ek Ped Maa Ke Naam' initiative",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "‘एक पेड माँ के नाम’ उपक्रमात आई व मुलीचे वृक्षारोपण",
      en: "Mother and daughter planting a tree together under 'Ek Ped Maa Ke Naam' initiative",
      hi: "'एक पेड़ माँ के नाम' अभियान में माँ-बेटी का वृक्षारोपण",
    },
    recommendedSection: "Activities (Plantation), Environment",
  },

  treePlantationMotherChild2: {
    id: "p1_img87",
    src: "/assets/images/pptx1/image87.jpeg",
    name: "Ek Ped Maa Ke Naam — Mother and Son",
    subject: "Student in school tie and shirt with mother planting a sapling together",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "‘एक पेड माँ के नाम’ उपक्रमात आई आणि मुलाचे वृक्षारोपण",
      en: "Student and his mother planting a sapling together",
      hi: "'एक पेड़ माँ के नाम' अभियान में माँ और बेटे का वृक्षारोपण",
    },
    recommendedSection: "Activities (Plantation), Environment",
  },

  kitchenGardenHarvest: {
    id: "p1_img92",
    src: "/assets/images/pptx1/image92.jpeg",
    name: "Fresh Brinjal Harvest from Kitchen Garden",
    subject: "Staff member displaying a basket of freshly picked green brinjals from the school's organic kitchen garden",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "शालेय परसबागेतील सेंद्रिय वांग्यांचे ताजे पीक",
      en: "Fresh organic brinjals harvested from the school's kitchen garden (परसबाग)",
      hi: "विद्यालय पोषण वाटिका से ताजे बैंगन की उपज",
    },
    recommendedSection: "Facilities (Kitchen Garden), Environment, Home",
  },

  schoolMarketStalls: {
    id: "p1_img93",
    src: "/assets/images/pptx1/image93.jpeg",
    name: "School Market (शालेय बाजार) Entrepreneurship",
    subject: "Students running market stalls with weighing scales, selling fresh produce to teachers and parents",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "शालेय बाजार उपक्रम — भाजीपाला विक्री करताना विद्यार्थी",
      en: "School Market activity — students operating weighing scales and learning commerce",
      hi: "शालेय बाजार उपक्रम — सब्जी विक्रय और व्यावहारिक व्यापार सीखते छात्र",
    },
    recommendedSection: "Activities, Academics, Environment",
  },

  kitchenGardenCrops: {
    id: "p1_img94",
    src: "/assets/images/pptx1/image94.jpeg",
    name: "Kitchen Garden Crop Beds",
    subject: "Flourishing organic brinjal plants growing on the school grounds",
    category: "environment",
    suitableForPublic: true,
    alt: {
      mr: "शाळेच्या आवारात डोलणारे परसबागेतील वांग्याचे पीक",
      en: "Lush brinjal crops growing in the school's organic kitchen garden",
      hi: "विद्यालय परिसर में लहलहाती सब्जियों की क्यारियाँ",
    },
    recommendedSection: "Facilities (Kitchen Garden)",
  },

  swachhataFortnight: {
    id: "p1_img84",
    src: "/assets/images/pptx1/image84.jpeg",
    name: "Swachhata Pakhwada Campus Drive",
    subject: "Students in uniform holding brooms and dustbins during campus cleanliness fortnight (GPS stamped Babupeth)",
    category: "wellbeing",
    suitableForPublic: true,
    alt: {
      mr: "स्वच्छता पखवाडा — शालेय परिसर स्वच्छ करताना विद्यार्थी",
      en: "Students with brooms during Swachhata Pakhwada cleanliness drive at the campus",
      hi: "स्वच्छता पखवाड़ा — विद्यालय प्रांगण की सफाई करते छात्र",
    },
    recommendedSection: "Activities (Cleanliness), Wellbeing",
  },

  // ===== NEWSPAPER COVERAGE & CLIPPINGS =====
  pressDeshonnatiTobaccoFree: {
    id: "p1_img99",
    src: "/assets/images/pptx1/image99.jpeg",
    name: "Deshonnati Newspaper Clipping",
    subject: "Newspaper clipping from Deshonnati (24 March 2026) regarding school tobacco-free awareness campaign",
    category: "press",
    suitableForPublic: true,
    alt: {
      mr: "देशोन्नती वृत्तपत्र कात्रण — तंबाखू व्यसनमुक्ती विषयी जनजागृती कार्यक्रम",
      en: "Deshonnati newspaper clipping covering tobacco-free awareness program at the school",
      hi: "देशोन्नती समाचार पत्र कतरन — तंबाखू व्यसनमुक्ति जागरूकता कार्यक्रम",
    },
    recommendedSection: "News Notice Board, Press Coverage",
  },

  pressSakalPraveshotsav: {
    id: "p1_img101",
    src: "/assets/images/pptx1/image101.jpeg",
    name: "Sakal Newspaper Clipping — Praveshotsav",
    subject: "Sakal clipping showing Municipal Commissioner and officials welcoming students and distributing books",
    category: "press",
    suitableForPublic: true,
    alt: {
      mr: "सकाळ वृत्तपत्र कात्रण — मनपा आयुक्त उपस्थितीत शाळा प्रवेशोत्सव",
      en: "Sakal newspaper report on school opening ceremony and book distribution by Municipal Commissioner",
      hi: "सकाल समाचार पत्र कतरन — मनपा आयुक्त द्वारा शालेय प्रवेशोत्सव",
    },
    recommendedSection: "News Notice Board, Press Coverage",
  },

  pressTeacherAward: {
    id: "p1_img102",
    src: "/assets/images/pptx1/image102.jpeg",
    name: "Press Clipping — Teacher Uma Kukudpewar Taluka Award",
    subject: "Newspaper article on teacher Uma Kukudpewar securing 1st rank in taluka in SCERT educational video competition",
    category: "press",
    suitableForPublic: true,
    alt: {
      mr: "वृत्तपत्र कात्रण — शिक्षिका उमा कुकडपवार तालुक्यात प्रथम",
      en: "Press clipping celebrating teacher Uma Kukudpewar ranking 1st in taluka video creation competition",
      hi: "समाचार पत्र कतरन — शिक्षिका उमा कुकडपवार तालुक्यात प्रथम स्थान",
    },
    recommendedSection: "News Notice Board, About Staff",
  },

  pressNavarashtraBagless: {
    id: "p1_img103",
    src: "/assets/images/pptx1/image103.jpeg",
    name: "Navarashtra Newspaper — Bagless Saturday",
    subject: "Navarashtra (16 Sept 2025) report on municipal school Bagless Day (दप्तरविना शाळा) initiative",
    category: "press",
    suitableForPublic: true,
    alt: {
      mr: "नवराष्ट्र वृत्तपत्र कात्रण — मनपाचा दप्तरविना शाळा उपक्रम",
      en: "Navarashtra newspaper feature on the bagless Saturday initiative at Chandrapur municipal school",
      hi: "नवराष्ट्र समाचार पत्र कतरन — दप्तरविहीन विद्यालय पहल",
    },
    recommendedSection: "News Notice Board, Press Coverage",
  },

  pressLokmatBhakriMaking: {
    id: "p1_img104",
    src: "/assets/images/pptx1/image104.jpeg",
    name: "Lokmat Newspaper — Dignity of Labor Experience",
    subject: "Lokmat (27 Apr 2025) report on 200 students learning traditional cooking and appreciating manual labor",
    category: "press",
    suitableForPublic: true,
    alt: {
      mr: "लोकमत वृत्तपत्र कात्रण — भाकरी बनवण्याचा अनुभव व कष्टाचा गोडवा",
      en: "Lokmat newspaper coverage on students learning traditional cooking and dignity of labor",
      hi: "लोकमत समाचार पत्र कतरन — पारंपरिक रोटी निर्माण व श्रम प्रतिष्ठा अनुभव",
    },
    recommendedSection: "News Notice Board, Press Coverage",
  },

  // ===== STUDENT ACHIEVEMENTS & ACTIVITIES =====
  mathExhibitionChandrayaan: {
    id: "p1_img7",
    src: "/assets/images/pptx1/image7.jpeg",
    name: "Students with Chandrayaan Rocket Model",
    subject: "Class 6th students proudly displaying their illuminated Chandrayaan satellite launch vehicle model",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "इयत्ता ६ वी चे विद्यार्थी चंद्रयान रॉकेट प्रतिकृतीसह",
      en: "Class 6th students presenting their handmade Chandrayaan rocket model at exhibition",
      hi: "कक्षा 6 के छात्र चंद्रयान रॉकेट मॉडल के साथ",
    },
    recommendedSection: "Academics, Home, Activities",
  },

  mathExhibitionTeacherModels: {
    id: "p1_img8",
    src: "/assets/images/pptx1/image8.jpeg",
    name: "Mathematics Model Demonstration with Teacher",
    subject: "Teacher Ajay Madot Sir explaining Integer number lines and 2D/3D geometry shapes with students",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "शिक्षक अजय माडोत सर व विद्यार्थी गणितीय मॉडेल्ससह",
      en: "Teacher Ajay Madot Sir and students demonstrating mathematical integer and geometry models",
      hi: "गणित शिक्षक और छात्र पूर्णांक व ज्यामिति मॉडल के साथ",
    },
    recommendedSection: "Academics, Activities (Math Club)",
  },

  scienceExhibitionWorkingModel: {
    id: "p2_img40",
    src: "/assets/images/pptx2/image40.jpeg",
    name: "Science Club Environmental Prototype",
    subject: "Students presenting solar-powered miniature home and water filtration models at science exhibition",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "विज्ञान मंडळ प्रदर्शनात सौर ऊर्जा घर व जलशुद्धीकरण मॉडेल",
      en: "Students displaying solar-powered house and water purification science models",
      hi: "विज्ञान प्रदर्शनी में सौर घर और जल शोधन मॉडल",
    },
    recommendedSection: "Academics, Activities (Science Club)",
  },

  hasthaDipMagazine: {
    id: "p2_img32",
    src: "/assets/images/pptx2/image32.jpeg",
    name: "Hastha Dip (हस्तदीप) Handwritten Magazine",
    subject: "Students presenting handwritten wall and desk magazine containing stories, poems and drawings",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "‘हस्तदीप’ विद्यार्थी हस्तलिखित नियतकालिक",
      en: "'Hastha Dip' student-composed handwritten magazine and artwork showcase",
      hi: "'हस्तदीप' विद्यार्थी हस्तलिखित पत्रिका व कला",
    },
    recommendedSection: "Academics (Student Publications)",
  },

  // ===== TRIPS & EXCURSIONS =====
  excursionMeccaMasjidCharminar: {
    id: "p2_img43",
    src: "/assets/images/pptx2/image43.jpeg",
    name: "Hyderabad Excursion — Charminar & Mecca Masjid",
    subject: "Students and teachers group photo at the historic courtyard in Hyderabad during educational tour",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "हैदराबाद शैक्षणिक सहल — चारमिनार व मक्का मस्जिद परिसरात विद्यार्थी",
      en: "Students and teachers group photo at historic Charminar in Hyderabad",
      hi: "हैदराबाद शैक्षणिक भ्रमण — चारमीनार प्रांगण में छात्र व शिक्षक",
    },
    recommendedSection: "Activities (Excursion), Gallery",
  },

  excursionNehruZoo: {
    id: "p2_img44",
    src: "/assets/images/pptx2/image44.jpeg",
    name: "Hyderabad Excursion — Nehru Zoological Park",
    subject: "Full excursion cohort of students and teachers gathered at the entrance of Nehru Zoological Park",
    category: "campus",
    suitableForPublic: true,
    alt: {
      mr: "हैदराबाद शैक्षणिक सहल — नेहरू प्राणीसंग्रहालय प्रवेशद्वारापाशी विद्यार्थी गट",
      en: "School cohort outside Nehru Zoological Park during Hyderabad educational trip",
      hi: "हैदराबाद शैक्षणिक भ्रमण — नेहरू प्राणी उद्यान के समक्ष छात्र समूह",
    },
    recommendedSection: "Activities (Excursion), Gallery",
  },

  excursionSalarJungMuseum: {
    id: "p2_img46",
    src: "/assets/images/pptx2/image46.jpeg",
    name: "Hyderabad Excursion — Salar Jung Museum",
    subject: "Students observing royal porcelain and artifact exhibits inside Salar Jung Museum",
    category: "academics",
    suitableForPublic: true,
    alt: {
      mr: "सालारजंग संग्रहालयात प्राचीन कलाकृतींचे निरीक्षण करणारे विद्यार्थी",
      en: "Students admiring historical porcelain artifacts at Salar Jung Museum in Hyderabad",
      hi: "सालार जंग संग्रहालय में ऐतिहासिक कलाकृतियों का अवलोकन",
    },
    recommendedSection: "Activities (Excursion), Academics",
  },

  // ===== GOVERNANCE, SAFETY & COMMUNITY =====
  smcStageCelebration: {
    id: "p1_img70",
    src: "/assets/images/pptx1/image70.jpeg",
    name: "School Stage & Management Committee",
    subject: "School cultural stage with Headmaster Shivlal Irpate Sir, SMC members, and student choir",
    category: "governance",
    suitableForPublic: true,
    alt: {
      mr: "शाळेचे सांस्कृतिक व्यासपीठ, मुख्याध्यापक, शाळा व्यवस्थापन समिती (SMC) व विद्यार्थी",
      en: "School cultural stage with Headmaster, SMC members, and student choir",
      hi: "सांस्कृतिक मंच पर मुख्याध्यापक, एसएमसी सदस्य और छात्र",
    },
    recommendedSection: "About (SMC & Governance), Home Community",
  },

  parentsMeetingHall: {
    id: "p1_img72",
    src: "/assets/images/pptx1/image72.jpeg",
    name: "Parents Meeting & Governance Hall",
    subject: "Hall filled with engaged parents attending the School Management Committee parent assembly",
    category: "governance",
    suitableForPublic: true,
    alt: {
      mr: "पालक-शिक्षक सभा व शाळा व्यवस्थापन समिती मेळावा",
      en: "Parents assembled in the school hall for parent-teacher governance meeting",
      hi: "अभिभावक-शिक्षक सम्मेलन और विद्यालय प्रबंधन बैठक",
    },
    recommendedSection: "About (Parent Participation), Home Community",
  },

  pocsoAwarenessBanner: {
    id: "p1_img49",
    src: "/assets/images/pptx1/image49.jpeg",
    name: "POCSO & Personal Safety Banner",
    subject: "Official school banner for POCSO child safety and Good Touch / Bad Touch awareness",
    category: "wellbeing",
    suitableForPublic: true,
    alt: {
      mr: "POCSO वैयक्तिक सुरक्षा व बाल संरक्षण फलक",
      en: "Official school banner for POCSO child protection and personal safety guidance",
      hi: "POCSO व्यक्तिगत सुरक्षा व बाल संरक्षण मार्गदर्शन बैनर",
    },
    recommendedSection: "Home Wellbeing, Activities (Safety)",
  },

  culturalTigerDramaTrophy: {
    id: "p1_img47",
    src: "/assets/images/pptx1/image47.jpeg",
    name: "Tiger Dance Cultural Award",
    subject: "Students face-painted as tigers celebrating their drama trophy with teachers (City of Tigers homage)",
    category: "sports",
    suitableForPublic: true,
    alt: {
      mr: "वाघाच्या वेशभूषेतील विद्यार्थ्यांचा सांस्कृतिक नाटिकेत गौरव",
      en: "Students face-painted as tigers celebrating their cultural drama award",
      hi: "बाघ वेशभूषा में सांस्कृतिक नाटक पुरस्कार प्राप्त करते छात्र",
    },
    recommendedSection: "Activities (Cultural), Gallery",
  },

  kabaddiAtFortGround: {
    id: "p1_img61",
    src: "/assets/images/pptx1/image61.jpeg",
    name: "Kabaddi Tournament at Historic Fort Ground",
    subject: "School students playing competitive Kabaddi match against the historic stone ramparts of Chandrapur Fort",
    category: "sports",
    suitableForPublic: true,
    alt: {
      mr: "ऐतिहासिक चंद्रपूर किल्ला तटबंदीसमोर कबड्डी सामना खेळणारे विद्यार्थी",
      en: "Students competing in Kabaddi tournament before the historic Chandrapur Fort ramparts",
      hi: "ऐतिहासिक चंद्रपुर किला मैदान पर कबड्डी प्रतियोगिता",
    },
    recommendedSection: "Activities (Sports), Gallery, Home",
  },
};

// Aliases for seamless component access
IMAGE_MANIFEST.smartPanelTeacher = IMAGE_MANIFEST.smartClassroomScreen;
IMAGE_MANIFEST.computerLabWorkstations = IMAGE_MANIFEST.ictLabTeacher;
IMAGE_MANIFEST.idealLabTinkering = IMAGE_MANIFEST.idealLabConsoles;
IMAGE_MANIFEST.solarRooftopPanels = IMAGE_MANIFEST.solarRooftopPanels1;
IMAGE_MANIFEST.qrCodeLearningWall = IMAGE_MANIFEST.qrCodeScreen;
IMAGE_MANIFEST.schoolCampusFront = IMAGE_MANIFEST.schoolBuildingPanoramic;
IMAGE_MANIFEST.savitribaiPhulePortrait = IMAGE_MANIFEST.savitribaiPortrait;
IMAGE_MANIFEST.chandrayaanRockets = IMAGE_MANIFEST.mathExhibitionChandrayaan;



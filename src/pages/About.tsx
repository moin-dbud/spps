import "./About.css";
import {
  BookOpen, Users, Building2, Award, Star, Heart,
  GraduationCap, Target, Eye, CheckCircle, Lightbulb,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { IMAGE_MANIFEST } from "../data/imageManifest";

/* =========================================================
   ABOUT PAGE — P.M. Shri Savitribai Phule School, Babupeth, Chandrapur
   ========================================================= */

export default function About() {
  const { lang } = useI18n();
  const { settings } = useSchoolSettings();

  const tx = {
    pageTitle:
      lang === "en"
        ? "About Our School"
        : lang === "hi"
        ? "हमारे विद्यालय के बारे में"
        : "आमच्या शाळेविषयी",
    pageSub:
      lang === "en"
        ? "P.M. Shri Savitribai Phule School, Babupeth, Chandrapur"
        : lang === "hi"
        ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय, बाबूपेठ, चंद्रपुर"
        : "पी.एम. श्री. सावित्रीबाई फुले शाळा, बाबूपेठ, चंद्रपूर",

    /* School identity */
    identityLabel:
      lang === "en" ? "Our School" : lang === "hi" ? "हमारा विद्यालय" : "आमची शाळा",
    identityTitle:
      lang === "en"
        ? "P.M. Shri Savitribai Phule School"
        : lang === "hi"
        ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय"
        : "पी.एम. श्री. सावित्रीबाई फुले शाळा",
    identityBody:
      lang === "en"
        ? "P.M. Shri Savitribai Phule School is a Municipal Corporation school located in the Babupeth area of Chandrapur, Maharashtra. The school is committed to delivering quality, inclusive education to every child, rooted in the values of social justice, curiosity, and lifelong learning.\n\nRecognised under the prestigious P.M. Shri (Prime Minister Schools for Rising India) scheme of the Government of India, the school strives to be a model institution that embodies the principles of the National Education Policy 2020 — preparing students not just academically, but holistically.\n\nWith a dedicated team of trained educators, modern infrastructure, and a nurturing environment, the school is a beacon of learning for children of the Babupeth community."
        : lang === "hi"
        ? "पी.एम. श्री सावित्रीबाई फुले विद्यालय महाराष्ट्र के चंद्रपुर जिले के बाबूपेठ क्षेत्र में स्थित नगर निगम का विद्यालय है। यह विद्यालय सामाजिक न्याय, जिज्ञासा और आजीवन अधिगम के मूल्यों पर आधारित गुणवत्तापूर्ण, समावेशी शिक्षा देने के लिए प्रतिबद्ध है।\n\nभारत सरकार की प्रतिष्ठित पी.एम. श्री (प्रधानमंत्री स्कूल्स फॉर राइजिंग इंडिया) योजना के अंतर्गत मान्यता प्राप्त यह विद्यालय राष्ट्रीय शिक्षा नीति 2020 के सिद्धांतों को मूर्त रूप देने वाली एक आदर्श संस्था बनने का प्रयास करता है।\n\nप्रशिक्षित शिक्षकों की समर्पित टीम, आधुनिक बुनियादी ढाँचे और पोषणकारी वातावरण के साथ यह विद्यालय बाबूपेठ समुदाय के बच्चों के लिए शिक्षा का प्रकाश-स्तंभ है।"
        : "पी.एम. श्री. सावित्रीबाई फुले उच्च प्राथमिक व माध्यमिक शाळा ही महाराष्ट्रातील चंद्रपूर जिल्ह्याच्या बाबूपेठ परिसरातील मनपाची शाळा आहे. सामाजिक न्याय, जिज्ञासा आणि आजीवन शिक्षणाच्या मूल्यांवर आधारित दर्जेदार, समावेशक शिक्षण देण्यास ही शाळा कटिबद्ध आहे.\n\nभारत सरकारच्या प्रतिष्ठित पी.एम. श्री (Prime Minister Schools for Rising India) योजनेंतर्गत मान्यताप्राप्त ही शाळा NEP 2020 च्या तत्त्वांना मूर्त स्वरूप देणारी एक आदर्श शाळा बनण्यास प्रयत्नशील आहे.\n\nप्रशिक्षित शिक्षकांची समर्पित टीम, आधुनिक पायाभूत सुविधा आणि प्रेरणादायक वातावरणामुळे ही शाळा बाबूपेठ समाजातील मुलांसाठी शिक्षणाचा दीपस्तंभ आहे.",

    /* Mission & Vision */
    missionLabel:
      lang === "en"
        ? "Our Purpose"
        : lang === "hi"
        ? "हमारा उद्देश्य"
        : "आमचा उद्देश",
    missionTitle:
      lang === "en"
        ? "Mission & Vision"
        : lang === "hi"
        ? "ध्येय और दृष्टि"
        : "ध्येय आणि दृष्टी",
    missionHead:
      lang === "en"
        ? "Our Mission"
        : lang === "hi"
        ? "हमारा ध्येय"
        : "आमचे ध्येय",
    missionBody:
      lang === "en"
        ? "To provide every child with quality, joyful, and inclusive education that develops their full potential — intellectually, socially, and emotionally — while fostering civic responsibility and a love for lifelong learning."
        : lang === "hi"
        ? "प्रत्येक बच्चे को गुणवत्तापूर्ण, आनंदमय और समावेशी शिक्षा प्रदान करना जो उनकी पूर्ण क्षमता — बौद्धिक, सामाजिक और भावनात्मक — विकसित करे और आजीवन अधिगम के प्रति प्रेम जगाए।"
        : "प्रत्येक मुलाला दर्जेदार, आनंददायी व समावेशक शिक्षण देणे — जे त्यांची बौद्धिक, सामाजिक व भावनिक क्षमता विकसित करेल आणि नागरी जबाबदारी व आजीवन शिक्षणाची आवड जोपासेल.",
    visionHead:
      lang === "en" ? "Our Vision" : lang === "hi" ? "हमारी दृष्टि" : "आमची दृष्टी",
    visionBody:
      lang === "en"
        ? "To be a model institution that exemplifies the ideals of the National Education Policy 2020 — a school where every student thrives, every voice is heard, and every learner is prepared to contribute meaningfully to society and the nation."
        : lang === "hi"
        ? "राष्ट्रीय शिक्षा नीति 2020 के आदर्शों को मूर्त रूप देने वाली एक आदर्श संस्था बनना — जहाँ हर विद्यार्थी प्रगति करे, हर आवाज सुनी जाए और हर शिक्षार्थी समाज और राष्ट्र में सार्थक योगदान के लिए तैयार हो।"
        : "NEP 2020 च्या आदर्शांना मूर्त रूप देणारी एक आदर्श संस्था बनणे — जिथे प्रत्येक विद्यार्थी प्रगती करतो, प्रत्येक आवाज ऐकला जातो आणि प्रत्येक शिकणारा समाज व राष्ट्रासाठी अर्थपूर्ण योगदान देण्यास तयार असतो.",

    /* Savitribai tribute */
    tributeLabel:
      lang === "en"
        ? "Named After"
        : lang === "hi"
        ? "जिनके नाम पर"
        : "ज्यांच्या नावाने",
    tributeTitle:
      lang === "en"
        ? "Savitribai Phule — Pioneer of Education"
        : lang === "hi"
        ? "सावित्रीबाई फुले — शिक्षा की अग्रदूत"
        : "सावित्रीबाई फुले — शिक्षणाची अग्रदूत",
    tributeBody: [
      lang === "en"
        ? "Savitribai Phule (3 January 1831 – 10 March 1897) was a pioneering social reformer, educator, and poet who transformed the lives of countless Indians. She is widely regarded as the first female teacher of modern India."
        : lang === "hi"
        ? "सावित्रीबाई फुले (3 जनवरी 1831 – 10 मार्च 1897) एक अग्रणी समाज सुधारक, शिक्षाविद और कवयित्री थीं जिन्होंने अनगिनत भारतीयों के जीवन को बदल दिया। उन्हें आधुनिक भारत की पहली महिला शिक्षिका माना जाता है।"
        : "सावित्रीबाई फुले (३ जानेवारी १८३१ – १० मार्च १८९७) या एक अग्रगण्य समाजसुधारक, शिक्षणतज्ज्ञ आणि कवयित्री होत्या, ज्यांनी असंख्य भारतीयांचे जीवन बदलले. त्यांना आधुनिक भारताच्या पहिल्या महिला शिक्षिका म्हणून ओळखले जाते.",
      lang === "en"
        ? "Together with her husband, the social reformer Jyotirao Phule, Savitribai founded one of India's first schools for girls in Pune in 1848. Despite fierce opposition and social ostracism, she continued to educate children from all castes and backgrounds — walking to school while people threw dung and stones at her."
        : lang === "hi"
        ? "अपने पति, समाज सुधारक ज्योतिराव फुले के साथ, सावित्रीबाई ने 1848 में पुणे में भारत की पहली बालिका विद्यालयों में से एक की स्थापना की। तीव्र विरोध और सामाजिक बहिष्कार के बावजूद, वे सभी जातियों और पृष्ठभूमि के बच्चों को शिक्षित करती रहीं।"
        : "आपले पती, समाजसुधारक ज्योतिराव फुले यांच्यासह, सावित्रीबाईंनी १८४८ मध्ये पुण्यात भारतातील पहिल्या मुलींच्या शाळांपैकी एक स्थापन केली. तीव्र विरोध व सामाजिक बहिष्कार सहन करत त्यांनी सर्व जाती व पार्श्वभूमीच्या मुलांना शिकवत राहिल्या.",
      lang === "en"
        ? "She championed the rights of women, widows, and marginalised communities, established shelters for destitute women, and is revered as 'Krantijyoti' — the revolutionary flame of knowledge. Her birthday, January 3rd, is celebrated as Balika Din in Maharashtra."
        : lang === "hi"
        ? "उन्होंने महिलाओं, विधवाओं और हाशिए के समुदायों के अधिकारों की वकालत की, असहाय महिलाओं के लिए आश्रय स्थापित किए और उन्हें 'क्रांतिज्योति' — ज्ञान की क्रांतिकारी ज्वाला — के रूप में सम्मानित किया जाता है।"
        : "त्यांनी महिला, विधवा आणि उपेक्षित समाजाच्या हक्कांसाठी लढा दिला, निराधार महिलांसाठी आश्रमशाळा स्थापन केल्या आणि त्यांना 'क्रांतिज्योती' — ज्ञानाची क्रांतिकारी ज्वाला — म्हणून आदरपूर्वक स्मरले जाते. त्यांचा जन्मदिन, ३ जानेवारी, महाराष्ट्रात बालिका दिन म्हणून साजरा केला जातो.",
    ],

    /* School Profile */
    profileLabel:
      lang === "en"
        ? "School Profile"
        : lang === "hi"
        ? "विद्यालय प्रोफ़ाइल"
        : "शाळा प्रोफाइल",
    profileTitle:
      lang === "en"
        ? "School at a Glance"
        : lang === "hi"
        ? "विद्यालय एक दृष्टि में"
        : "शाळा एका दृष्टिक्षेपात",

    /* PM Shri */
    pmshriLabel: "P.M. Shri Programme",
    pmshriTitle:
      lang === "en"
        ? "PM Shri — Model Schools Under NEP 2020"
        : lang === "hi"
        ? "PM Shri — NEP 2020 के अंतर्गत आदर्श विद्यालय"
        : "PM Shri — NEP 2020 अंतर्गत आदर्श शाळा",
    pmshriBody:
      lang === "en"
        ? "PM SHRI (Prime Minister Schools for Rising India) is a flagship scheme of the Government of India launched to develop more than 14,500 schools across the country into model schools. Selected schools receive enhanced support for infrastructure, teacher training, digital tools, and holistic student development — fully aligned with the principles of the National Education Policy 2020."
        : lang === "hi"
        ? "PM SHRI (प्रधानमंत्री स्कूल्स फॉर राइजिंग इंडिया) भारत सरकार की एक प्रमुख योजना है जो देश भर के 14,500 से अधिक विद्यालयों को आदर्श विद्यालय के रूप में विकसित करने के लिए शुरू की गई है। चयनित विद्यालयों को बुनियादी ढाँचे, शिक्षक प्रशिक्षण, डिजिटल उपकरण और समग्र छात्र विकास के लिए बढ़ी हुई सहायता मिलती है — जो NEP 2020 के सिद्धांतों के साथ पूरी तरह से संरेखित है।"
        : "PM SHRI (Prime Minister Schools for Rising India) ही भारत सरकारची एक प्रमुख योजना आहे जी देशभरातील १४,५०० हून अधिक शाळांना आदर्श शाळांमध्ये विकसित करण्यासाठी सुरू करण्यात आली. निवडलेल्या शाळांना पायाभूत सुविधा, शिक्षक प्रशिक्षण, डिजिटल साधने आणि सर्वांगीण विद्यार्थी विकासासाठी वाढीव सहाय्य मिळते — NEP 2020 च्या तत्त्वांशी पूर्णपणे सुसंगत.",

    /* Principal's message */
    principalLabel:
      lang === "en"
        ? "Leadership"
        : lang === "hi"
        ? "नेतृत्व"
        : "नेतृत्व",
    principalTitle:
      lang === "en"
        ? "Principal's Message"
        : lang === "hi"
        ? "प्राचार्य का संदेश"
        : "मुख्याध्यापकांचा संदेश",
    principalQuote:
      lang === "en"
        ? "\"Our school is more than a place of learning — it is a community where every child is seen, valued, and empowered. We believe that quality education, delivered with care and innovation, has the power to transform not just individual lives but entire communities. Together — students, teachers, parents, and society — we are building a brighter tomorrow.\""
        : lang === "hi"
        ? "\"हमारा विद्यालय सीखने की जगह से कहीं अधिक है — यह एक ऐसा समुदाय है जहाँ हर बच्चे को देखा, महत्त्व दिया और सशक्त किया जाता है। हम मानते हैं कि देखभाल और नवाचार के साथ दी गई गुणवत्तापूर्ण शिक्षा में केवल व्यक्तिगत जीवन ही नहीं बल्कि पूरे समुदाय को बदलने की शक्ति है।\""
        : "\"आमची शाळा केवळ शिकण्याची जागा नाही — ती एक समुदाय आहे जिथे प्रत्येक मुलाला पाहिले जाते, महत्त्व दिले जाते आणि सक्षम केले जाते. आमचा विश्वास आहे की काळजी व नवोपक्रमाने दिलेल्या दर्जेदार शिक्षणात केवळ व्यक्तिगत जीवन नव्हे तर संपूर्ण समाज बदलण्याची शक्ती आहे.\"",
    principalName: settings.principal,
    principalRole:
      lang === "en"
        ? "Principal / Head of Institution"
        : lang === "hi"
        ? "प्राचार्य / संस्था प्रमुख"
        : "मुख्याध्यापक / संस्था प्रमुख",

    /* Staff */
    staffLabel:
      lang === "en" ? "Our Team" : lang === "hi" ? "हमारी टीम" : "आमची टीम",
    staffTitle:
      lang === "en"
        ? "Dedicated Teaching Staff"
        : lang === "hi"
        ? "समर्पित शिक्षण स्टाफ"
        : "समर्पित शिक्षण वर्ग",
    staffBody:
      lang === "en"
        ? "The school is fortunate to have a team of dedicated, trained, and passionate educators who go above and beyond to nurture every learner. Our teachers are not just instructors — they are mentors, guides, and role models who inspire students daily. They continuously upgrade their skills through professional development programmes aligned with NEP 2020."
        : lang === "hi"
        ? "विद्यालय को समर्पित, प्रशिक्षित और उत्साही शिक्षकों की एक टीम का सौभाग्य प्राप्त है जो प्रत्येक शिक्षार्थी को प्रोत्साहित करने के लिए हर संभव प्रयास करते हैं। हमारे शिक्षक केवल अनुदेशक नहीं हैं — वे मार्गदर्शक, गुरु और आदर्श हैं जो प्रतिदिन विद्यार्थियों को प्रेरित करते हैं।"
        : "शाळेला समर्पित, प्रशिक्षित व उत्साही शिक्षकांची एक टीम लाभली आहे जी प्रत्येक विद्यार्थ्याला प्रोत्साहित करण्यासाठी सर्वोतोपरी प्रयत्न करतात. आमचे शिक्षक केवळ शिकवणारे नाहीत — ते मार्गदर्शक, गुरू आणि आदर्श आहेत जे विद्यार्थ्यांना रोज प्रेरणा देतात.",

    /* SMC */
    smcLabel:
      lang === "en"
        ? "Governance"
        : lang === "hi"
        ? "प्रशासन"
        : "प्रशासन",
    smcTitle:
      lang === "en"
        ? "School Management Committee"
        : lang === "hi"
        ? "विद्यालय प्रबंधन समिति (SMC)"
        : "शाळा व्यवस्थापन समिती (SMC)",
    smcBody:
      lang === "en"
        ? "The School Management Committee (SMC) plays a vital role in the governance and development of our school. It brings together parents, community members, teachers, and local representatives to collaborate on school improvement, resource allocation, and student welfare. The SMC ensures transparency, accountability, and active community participation in school affairs."
        : lang === "hi"
        ? "विद्यालय प्रबंधन समिति (SMC) हमारे विद्यालय के प्रशासन और विकास में महत्वपूर्ण भूमिका निभाती है। यह अभिभावकों, समुदाय के सदस्यों, शिक्षकों और स्थानीय प्रतिनिधियों को विद्यालय सुधार, संसाधन आवंटन और विद्यार्थी कल्याण पर सहयोग करने के लिए एक साथ लाती है।"
        : "शाळा व्यवस्थापन समिती (SMC) आमच्या शाळेच्या प्रशासन आणि विकासात महत्त्वाची भूमिका बजावते. पालक, समाजातील सदस्य, शिक्षक आणि स्थानीय प्रतिनिधी एकत्र येऊन शाळेच्या सुधारणा, साधनसंपत्तीचे वाटप आणि विद्यार्थी कल्याणासाठी सहकार्य करतात.",
  };

  const profileRows: Array<{ label: string; value: string; icon: React.ReactNode; note?: string }> = [
    {
      label:
        lang === "en" ? "School Name" : lang === "hi" ? "विद्यालय नाम" : "शाळेचे नाव",
      value:
        lang === "en"
          ? settings.name.english
          : lang === "hi"
          ? settings.name.hindi
          : settings.name.marathi,
      icon: <Building2 size={16} />,
    },
    {
      label:
        lang === "en" ? "Location" : lang === "hi" ? "स्थान" : "स्थान",
      value: settings.address.fullAddress,
      icon: <Star size={16} />,
    },
    {
      label:
        lang === "en" ? "Management" : lang === "hi" ? "प्रबंधन" : "व्यवस्थापन",
      value: settings.management,
      icon: <Award size={16} />,
    },
    {
      label:
        lang === "en" ? "Classes" : lang === "hi" ? "कक्षाएँ" : "इयत्ता",
      value: settings.classesServed,
      icon: <BookOpen size={16} />,
    },
    {
      label:
        lang === "en" ? "Medium" : lang === "hi" ? "माध्यम" : "माध्यम",
      value: settings.medium,
      icon: <GraduationCap size={16} />,
    },
    {
      label:
        lang === "en" ? "Academic Year" : lang === "hi" ? "शैक्षणिक वर्ष" : "शैक्षणिक वर्ष",
      value: settings.academicYear,
      icon: <Star size={16} />,
    },
    {
      label:
        lang === "en" ? "Principal" : lang === "hi" ? "प्राचार्य" : "मुख्याध्यापक",
      value: settings.principal,
      icon: <Users size={16} />,
    },
  ];

  const pmshriFeatures = [
    {
      icon: <Target size={22} />,
      title:
        lang === "en"
          ? "Model School Status"
          : lang === "hi"
          ? "आदर्श विद्यालय दर्जा"
          : "आदर्श शाळेचा दर्जा",
      desc:
        lang === "en"
          ? "Selected from across India, PM Shri schools set benchmarks in quality education."
          : lang === "hi"
          ? "पूरे भारत से चुने गए PM Shri विद्यालय गुणवत्तापूर्ण शिक्षा में मानदंड स्थापित करते हैं।"
          : "संपूर्ण भारतातून निवडलेल्या PM Shri शाळा दर्जेदार शिक्षणात मानके प्रस्थापित करतात.",
    },
    {
      icon: <Lightbulb size={22} />,
      title: "NEP 2020",
      desc:
        lang === "en"
          ? "Fully aligned with the National Education Policy 2020 — holistic, competency-based education."
          : lang === "hi"
          ? "राष्ट्रीय शिक्षा नीति 2020 के साथ पूर्ण रूप से संरेखित — समग्र, दक्षता-आधारित शिक्षा।"
          : "NEP 2020 शी पूर्णपणे सुसंगत — सर्वांगीण, क्षमताधारित शिक्षण.",
    },
    {
      icon: <CheckCircle size={22} />,
      title:
        lang === "en"
          ? "Infrastructure Support"
          : lang === "hi"
          ? "बुनियादी ढाँचा सहायता"
          : "पायाभूत सुविधा सहाय्य",
      desc:
        lang === "en"
          ? "Enhanced government funding for smart classrooms, labs, libraries, and accessibility."
          : lang === "hi"
          ? "स्मार्ट कक्षाओं, प्रयोगशालाओं, पुस्तकालयों और पहुँच के लिए बढ़ी हुई सरकारी सहायता।"
          : "स्मार्ट वर्गखोल्या, प्रयोगशाळा, ग्रंथालय आणि सुलभतेसाठी वाढीव सरकारी निधी.",
    },
    {
      icon: <Heart size={22} />,
      title:
        lang === "en"
          ? "Student-Centred Learning"
          : lang === "hi"
          ? "विद्यार्थी-केंद्रित शिक्षण"
          : "विद्यार्थी-केंद्रित शिक्षण",
      desc:
        lang === "en"
          ? "Focus on experiential, joyful, and inquiry-based education for every learner."
          : lang === "hi"
          ? "हर शिक्षार्थी के लिए अनुभवात्मक, आनंदमय और जिज्ञासा-आधारित शिक्षा पर ध्यान।"
          : "प्रत्येक विद्यार्थ्यासाठी अनुभवात्मक, आनंददायी व जिज्ञासाधारित शिक्षणावर लक्ष.",
    },
    {
      icon: <Eye size={22} />,
      title:
        lang === "en"
          ? "Community Participation"
          : lang === "hi"
          ? "समुदाय सहभागिता"
          : "समुदाय सहभाग",
      desc:
        lang === "en"
          ? "Parents, SMC, and the local community are active stakeholders in school growth."
          : lang === "hi"
          ? "अभिभावक, SMC और स्थानीय समुदाय विद्यालय के विकास में सक्रिय भागीदार हैं।"
          : "पालक, SMC आणि स्थानिक समुदाय शाळेच्या वाढीत सक्रिय भागीदार आहेत.",
    },
    {
      icon: <Award size={22} />,
      title:
        lang === "en"
          ? "Teacher Development"
          : lang === "hi"
          ? "शिक्षक विकास"
          : "शिक्षक विकास",
      desc:
        lang === "en"
          ? "Continuous professional development for teachers to deliver the best learning experience."
          : lang === "hi"
          ? "सर्वोत्तम सीखने का अनुभव देने के लिए शिक्षकों का निरंतर व्यावसायिक विकास।"
          : "सर्वोत्तम शिक्षण अनुभव देण्यासाठी शिक्षकांचा सतत व्यावसायिक विकास.",
    },
  ];

  return (
    <div className="about-page">
      {/* ===== PAGE HEADER ===== */}
      <header className="page-header about-page-header">
        <div className="container">
          <div className="about-page-header__badge animate-fadeInUp">
            <Award size={14} aria-hidden />
            <span>P.M. Shri</span>
          </div>
          <h1 className="page-header__title animate-fadeInUp delay-1">{tx.pageTitle}</h1>
          <p className="page-header__sub animate-fadeInUp delay-2">{tx.pageSub}</p>
        </div>
      </header>

      {/* ===== SCHOOL IDENTITY ===== */}
      <section className="section about-identity" aria-labelledby="identity-title">
        <div className="container">
          <div className="about-identity__grid">
            {/* Text */}
            <div className="about-identity__text animate-fadeInUp">
              <span className="section-label">
                <Building2 size={14} aria-hidden />
                {tx.identityLabel}
              </span>
              <h2 className="section-title" id="identity-title">
                {tx.identityTitle}
              </h2>
              <div className="divider" aria-hidden />
              {tx.identityBody.split("\n\n").map((para, i) => (
                <p key={i} className="about-identity__para">
                  {para}
                </p>
              ))}
            </div>
            {/* Image */}
            <div className="about-identity__image-wrap animate-fadeInUp delay-2">
              <div className="about-identity__img-frame">
                <img
                  src="/assets/images/pptx1/image2.jpeg"
                  alt="PM Shri Savitribai Phule School building, Babupeth, Chandrapur"
                  loading="lazy"
                  className="about-identity__img"
                />
                <div className="about-identity__img-badge">
                  <span>
                    {lang === "en"
                      ? "Babupeth, Chandrapur"
                      : lang === "hi"
                      ? "बाबूपेठ, चंद्रपुर"
                      : "बाबूपेठ, चंद्रपूर"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="section about-mission" aria-labelledby="mission-title">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <Target size={14} aria-hidden />
              {tx.missionLabel}
            </span>
            <h2 className="section-title" id="mission-title">
              {tx.missionTitle}
            </h2>
            <div className="divider" aria-hidden />
          </div>
          <div className="grid-2">
            {/* Mission Card */}
            <div className="mission-card mission-card--green animate-fadeInUp">
              <div className="mission-card__icon">
                <Target size={28} />
              </div>
              <h3 className="mission-card__head">{tx.missionHead}</h3>
              <p className="mission-card__body">{tx.missionBody}</p>
            </div>
            {/* Vision Card */}
            <div className="mission-card mission-card--saffron animate-fadeInUp delay-2">
              <div className="mission-card__icon">
                <Eye size={28} />
              </div>
              <h3 className="mission-card__head">{tx.visionHead}</h3>
              <p className="mission-card__body">{tx.visionBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRIBUTE TO SAVITRIBAI PHULE ===== */}
      <section className="section about-tribute" aria-labelledby="tribute-title">
        <div className="container">
          <div className="about-tribute__grid">
            {/* Image side */}
            <div className="about-tribute__img-wrap animate-fadeInUp">
              <div className="about-tribute__img-frame">
                <img
                  src={IMAGE_MANIFEST.savitribaiPortrait?.src || "/assets/images/pptx1/image4.jpeg"}
                  alt={IMAGE_MANIFEST.savitribaiPortrait?.alt?.[lang] || "Savitribai Phule Portrait"}
                  loading="lazy"
                  className="about-tribute__img"
                />
              </div>
              <div className="about-tribute__img-caption">
                <span className="badge badge-saffron">
                  {lang === "en"
                    ? "Krantijyoti"
                    : lang === "hi"
                    ? "क्रांतिज्योती"
                    : "क्रांतिज्योती"}
                </span>
                <p>
                  {lang === "en"
                    ? "3 Jan 1831 – 10 Mar 1897"
                    : lang === "hi"
                    ? "३ जनवरी १८३१ – १० मार्च १८९७"
                    : "३ जानेवारी १८३१ – १० मार्च १८९७"}
                </p>
              </div>
            </div>

            {/* Text side */}
            <div className="about-tribute__content animate-fadeInUp delay-2">
              <span className="section-label">
                <Heart size={14} aria-hidden />
                {tx.tributeLabel}
              </span>
              <h2 className="section-title" id="tribute-title">
                {tx.tributeTitle}
              </h2>
              <div className="divider" aria-hidden />
              {tx.tributeBody.map((para, i) => (
                <p key={i} className="about-tribute__para">
                  {para}
                </p>
              ))}
              <div className="about-tribute__quote">
                <blockquote>
                  {lang === "en"
                    ? '"Determined to educate, undeterred by hardship — Savitribai Phule\'s courage continues to illuminate every classroom."'
                    : lang === "hi"
                    ? '"शिक्षित करने के संकल्प से, कठिनाइयों से अविचलित — सावित्रीबाई फुले का साहस हर कक्षा को प्रकाशित करता है।"'
                    : '"शिक्षित करण्याच्या निश्चयाने, संकटांनी न डगमगता — सावित्रीबाई फुले यांचे धैर्य प्रत्येक वर्गखोलीला उजळवत आहे."'}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCHOOL PROFILE ===== */}
      <section className="section--sm about-profile" aria-labelledby="profile-title">
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-label">
              <BookOpen size={14} aria-hidden />
              {tx.profileLabel}
            </span>
            <h2 className="section-title" id="profile-title">
              {tx.profileTitle}
            </h2>
            <div className="divider" aria-hidden />
          </div>
          <div className="about-profile__grid">
            {profileRows.map((row, i) => (
              <div className="about-profile__row animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="about-profile__icon">{row.icon}</div>
                <div className="about-profile__info">
                  <span className="about-profile__label">{row.label}</span>
                  <span className="about-profile__value">{row.value}</span>
                  {row.note && <span className="about-profile__note">{row.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PM SHRI PROGRAMME ===== */}
      <section className="section about-pmshri" aria-labelledby="pmshri-title">
        <div className="container">
          <div className="about-pmshri__grid">
            <div className="about-pmshri__content">
              <span className="section-label" style={{ color: "rgba(255,255,255,0.8)" }}>
                <Award size={14} aria-hidden />
                {tx.pmshriLabel}
              </span>
              <h2 className="section-title" id="pmshri-title" style={{ color: "white" }}>
                {tx.pmshriTitle}
              </h2>
              <div className="divider" aria-hidden />
              <p className="about-pmshri__body">{tx.pmshriBody}</p>
            </div>
            <div className="about-pmshri__features">
              {pmshriFeatures.map((f, i) => (
                <div className="about-pmshri__feature animate-fadeInUp" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="about-pmshri__feature-icon">{f.icon}</div>
                  <div>
                    <p className="about-pmshri__feature-title">{f.title}</p>
                    <p className="about-pmshri__feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-pmshri__img-row">
            <img
              src="/assets/images/pptx1/image3.jpeg"
              alt="PM Shri school programme activities"
              loading="lazy"
            />
            <img
              src={IMAGE_MANIFEST.mathExhibitionChandrayaan?.src || "/assets/images/pptx1/image7.jpeg"}
              alt="Class 6 students with Chandrayaan satellite launch model"
              loading="lazy"
            />
            <img
              src="/assets/images/pptx1/image40.jpeg"
              alt="Students and community activities"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ===== PRINCIPAL'S MESSAGE ===== */}
      <section className="section about-principal" aria-labelledby="principal-title">
        <div className="container">
          <div className="about-principal__grid">
            {/* Photo */}
            <div className="about-principal__img-wrap animate-fadeInUp">
              <div className="about-principal__img-frame">
                <img
                  src="/assets/images/pptx1/image44.jpeg"
                  alt="Principal of PM Shri Savitribai Phule School"
                  loading="lazy"
                />
              </div>
              <div className="about-principal__identity">
                <p className="about-principal__name">{tx.principalName}</p>
                <p className="about-principal__role">{tx.principalRole}</p>
              </div>
            </div>

            {/* Message */}
            <div className="about-principal__content animate-fadeInUp delay-2">
              <span className="section-label">
                <GraduationCap size={14} aria-hidden />
                {tx.principalLabel}
              </span>
              <h2 className="section-title" id="principal-title">
                {tx.principalTitle}
              </h2>
              <div className="divider" aria-hidden />
              <div className="about-principal__quote-wrap">
                <span className="about-principal__quote-mark">"</span>
                <blockquote className="about-principal__quote">
                  {tx.principalQuote.replace(/^"|"$/g, "")}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEACHING STAFF ===== */}
      <section className="section--sm about-staff" aria-labelledby="staff-title">
        <div className="container">
          <div className="about-staff__grid">
            <div className="about-staff__img-wrap animate-fadeInUp">
              <img
                src="/assets/images/pptx1/image45.jpeg"
                alt="Teaching staff of PM Shri Savitribai Phule School"
                loading="lazy"
              />
            </div>
            <div className="about-staff__content animate-fadeInUp delay-2">
              <span className="section-label">
                <Users size={14} aria-hidden />
                {tx.staffLabel}
              </span>
              <h2 className="section-title" id="staff-title">
                {tx.staffTitle}
              </h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle">{tx.staffBody}</p>
              <ul className="about-staff__points">
                {[
                  lang === "en" ? "Trained & certified educators" : lang === "hi" ? "प्रशिक्षित और प्रमाणित शिक्षक" : "प्रशिक्षित व प्रमाणित शिक्षक",
                  lang === "en" ? "NEP 2020-aligned teaching methods" : lang === "hi" ? "NEP 2020 के अनुरूप शिक्षण पद्धतियाँ" : "NEP 2020 अनुरूप शिक्षण पद्धती",
                  lang === "en" ? "Continuous professional development" : lang === "hi" ? "निरंतर व्यावसायिक विकास" : "सतत व्यावसायिक विकास",
                  lang === "en" ? "Student-centred & inclusive approach" : lang === "hi" ? "विद्यार्थी-केंद्रित और समावेशी दृष्टिकोण" : "विद्यार्थी-केंद्रित व समावेशक दृष्टिकोन",
                ].map((pt, i) => (
                  <li key={i} className="about-staff__point">
                    <CheckCircle size={16} aria-hidden />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCHOOL MANAGEMENT COMMITTEE ===== */}
      <section className="section about-smc" aria-labelledby="smc-title">
        <div className="container">
          <div className="about-smc__grid">
            <div className="about-smc__content animate-fadeInUp">
              <span className="section-label">
                <Users size={14} aria-hidden />
                {tx.smcLabel}
              </span>
              <h2 className="section-title" id="smc-title">
                {tx.smcTitle}
              </h2>
              <div className="divider" aria-hidden />
              <p className="section-subtitle">{tx.smcBody}</p>
              <div className="about-smc__roles">
                {[
                  {
                    role:
                      lang === "en"
                        ? "Parents & Guardians"
                        : lang === "hi"
                        ? "अभिभावक"
                        : "पालक व संरक्षक",
                    desc:
                      lang === "en"
                        ? "Active voices in school decision-making"
                        : lang === "hi"
                        ? "विद्यालय निर्णय में सक्रिय भागीदार"
                        : "शाळेच्या निर्णयांमध्ये सक्रिय सहभाग",
                  },
                  {
                    role:
                      lang === "en"
                        ? "Community Members"
                        : lang === "hi"
                        ? "समुदाय के सदस्य"
                        : "समाजातील सदस्य",
                    desc:
                      lang === "en"
                        ? "Local stakeholders invested in school quality"
                        : lang === "hi"
                        ? "विद्यालय की गुणवत्ता में रुचि रखने वाले स्थानीय हितधारक"
                        : "शाळेच्या दर्जात रस असणारे स्थानिक सहभागी",
                  },
                  {
                    role:
                      lang === "en"
                        ? "Municipal Corporation"
                        : lang === "hi"
                        ? "नगर निगम (मनपा)"
                        : "महानगरपालिका (मनपा)",
                    desc:
                      lang === "en"
                        ? "Government oversight and resource support"
                        : lang === "hi"
                        ? "सरकारी निगरानी और संसाधन सहायता"
                        : "सरकारी देखरेख आणि साधन सहाय्य",
                  },
                ].map((r, i) => (
                  <div className="about-smc__role-card" key={i}>
                    <p className="about-smc__role">{r.role}</p>
                    <p className="about-smc__role-desc">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-smc__img-wrap animate-fadeInUp delay-2">
              <img
                src="/assets/images/pptx1/image46.jpeg"
                alt="School Management Committee meeting"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

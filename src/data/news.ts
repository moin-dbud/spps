export type NewsCategory = "notice" | "event" | "press" | "update";

export interface NewsItem {
  id: string;
  title: string;
  titleMr?: string;
  titleHi?: string;
  excerpt: string;
  excerptMr?: string;
  excerptHi?: string;
  content?: string;
  contentMr?: string;
  contentHi?: string;
  date: string; // ISO date string
  category: NewsCategory;
  image?: string;
  published: boolean;
}

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "news_1",
    title: "Annual Mathematics Model Exhibition 2026",
    titleMr: "वार्षिक गणित मॉडेल प्रदर्शन 2026",
    titleHi: "वार्षिक गणित मॉडल प्रदर्शनी 2026",
    excerpt:
      "Students showcased self-made models on fractions, percentages, area, volume and more at the school's annual mathematics exhibition.",
    excerptMr:
      "शाळेच्या वार्षिक गणित प्रदर्शनात विद्यार्थ्यांनी भिन्न, टक्केवारी, क्षेत्रफळ, घनफळ यावर स्वनिर्मित मॉडेल्स सादर केले.",
    excerptHi:
      "विद्यालय की वार्षिक गणित प्रदर्शनी में छात्रों ने भिन्न, प्रतिशत, क्षेत्रफल, आयतन पर स्व-निर्मित मॉडल प्रस्तुत किए।",
    content:
      "The annual Mathematics Model Exhibition was held with great enthusiasm. Students from upper primary and secondary classes participated by preparing models that demonstrate mathematical concepts including fractions, percentages, area, volume, and geometric shapes. Students confidently explained their models to teachers, parents and visitors. Outstanding models were awarded prizes. The exhibition encouraged students to learn mathematics through hands-on creativity.",
    date: "2026-02-10",
    category: "event",
    image: "/assets/images/pptx2/image16.jpeg",
    published: true,
  },
  {
    id: "news_2",
    title: "Eco Club Inauguration and Plantation Drive",
    titleMr: "पर्यावरण मंडळ उद्घाटन व वृक्षारोपण उपक्रम",
    titleHi: "इको क्लब उद्घाटन और वृक्षारोपण अभियान",
    excerpt:
      "The school's Eco Club was officially inaugurated, followed by a tree plantation drive under 'Ek Ped Maa Ke Naam' initiative.",
    excerptMr:
      "शाळेच्या पर्यावरण मंडळाचे अधिकृत उद्घाटन झाले. 'एक पेड माँ के नाम' उपक्रमांतर्गत वृक्षारोपण कार्यक्रम संपन्न झाला.",
    excerptHi:
      "विद्यालय के इको क्लब का उद्घाटन हुआ। 'एक पेड़ माँ के नाम' अभियान के तहत वृक्षारोपण कार्यक्रम आयोजित हुआ।",
    date: "2026-06-05",
    category: "event",
    image: "/assets/images/pptx2/image10.jpeg",
    published: true,
  },
  {
    id: "news_3",
    title: "Educational Excursion to Hyderabad",
    titleMr: "हैदराबाद शैक्षणिक सहल",
    titleHi: "हैदराबाद शैक्षणिक भ्रमण",
    excerpt:
      "Students visited Charminar, Golconda Fort, Salar Jung Museum, Hussain Sagar Lake, and Birla Mandir — experiencing history, geography and culture.",
    excerptMr:
      "विद्यार्थ्यांनी चारमिनार, गोलकोंडा किल्ला, सालारजंग संग्रहालय, हुसेनसागर तलाव व बिर्ला मंदिराला भेट दिली.",
    excerptHi:
      "विद्यार्थियों ने चारमिनार, गोलकोंडा किला, सालारजंग संग्रहालय, हुसेनसागर झील और बिरला मंदिर का भ्रमण किया।",
    date: "2026-01-20",
    category: "event",
    image: "/assets/images/pptx2/image20.jpeg",
    published: true,
  },
  {
    id: "news_4",
    title: "National Lecture Series — Inspiring Students",
    titleMr: "राष्ट्रीय व्याख्यानमाला — विद्यार्थ्यांसाठी प्रेरणा",
    titleHi: "राष्ट्रीय व्याख्यानमाला — विद्यार्थियों के लिए प्रेरणा",
    excerpt:
      "A National Lecture Series was organised with distinguished speakers inspiring students on topics of knowledge, motivation, patriotism and careers.",
    excerptMr:
      "राष्ट्रीय व्याख्यानमालेत प्रतिष्ठित वक्त्यांनी ज्ञान, प्रेरणा, देशभक्ती व करिअर यावर विद्यार्थ्यांना मार्गदर्शन केले.",
    excerptHi:
      "राष्ट्रीय व्याख्यानमाला में विशिष्ट वक्ताओं ने ज्ञान, प्रेरणा, देशभक्ति और करियर पर मार्गदर्शन दिया।",
    date: "2025-12-15",
    category: "event",
    image: "/assets/images/pptx2/image2.jpeg",
    published: true,
  },
  {
    id: "news_5",
    title: "Swachh Vidyalay — Cleanliness Fortnight",
    titleMr: "स्वच्छ विद्यालय — स्वच्छता पंधरवाडा",
    titleHi: "स्वच्छ विद्यालय — स्वच्छता पखवाड़ा",
    excerpt:
      "The school observed Cleanliness Fortnight with student participation in cleaning, awareness activities, and a plastic-free campus pledge.",
    excerptMr:
      "स्वच्छता पंधरवाड्यानिमित्त विद्यार्थ्यांनी परिसर स्वच्छता, जनजागृती उपक्रम व प्लास्टिकमुक्त परिसर शपथ घेतली.",
    excerptHi:
      "स्वच्छता पखवाड़े में विद्यार्थियों ने परिसर सफाई, जागरूकता गतिविधियों और प्लास्टिकमुक्त परिसर की शपथ ली।",
    date: "2026-07-01",
    category: "event",
    image: "/assets/images/pptx2/image26.jpeg",
    published: true,
  },
  {
    id: "news_6",
    title: "POCSO Awareness Programme for Students",
    titleMr: "विद्यार्थ्यांसाठी POCSO जागरूकता कार्यक्रम",
    titleHi: "विद्यार्थियों के लिए POCSO जागरूकता कार्यक्रम",
    excerpt:
      "A child protection awareness programme on good touch / bad touch was conducted to create a safe and fear-free school environment.",
    excerptMr:
      "विद्यार्थ्यांना Good Touch/Bad Touch बाबत मार्गदर्शन करून सुरक्षित व भयमुक्त शालेय वातावरण निर्माण करण्याचा उपक्रम राबविला.",
    excerptHi:
      "Good Touch/Bad Touch पर जागरूकता कार्यक्रम आयोजित कर सुरक्षित और भयमुक्त विद्यालय वातावरण बनाने का उपक्रम किया गया।",
    date: "2026-03-15",
    category: "event",
    image: "/assets/images/pptx2/image30.jpeg",
    published: true,
  },
  {
    id: "news_7",
    title: "Science Club Exhibition and Prize Distribution",
    titleMr: "विज्ञान मंडळ प्रदर्शन व बक्षीस वितरण",
    titleHi: "विज्ञान क्लब प्रदर्शनी और पुरस्कार वितरण",
    excerpt:
      "The Science Club organised a model exhibition. Students prepared science models and outstanding presentations were awarded prizes.",
    excerptMr:
      "विज्ञान मंडळाने मॉडेल प्रदर्शन आयोजित केले. विद्यार्थ्यांनी विज्ञान मॉडेल्स तयार केले व उत्कृष्ट सादरीकरणासाठी बक्षीसे देण्यात आली.",
    excerptHi:
      "विज्ञान क्लब ने मॉडल प्रदर्शनी आयोजित की। विद्यार्थियों ने विज्ञान मॉडल तैयार किए और उत्कृष्ट प्रस्तुति पर पुरस्कार दिए गए।",
    date: "2026-02-25",
    category: "event",
    image: "/assets/images/pptx2/image18.jpeg",
    published: true,
  },
  {
    id: "news_8",
    title: "Kitchen Garden Produce — School Market Success",
    titleMr: "परसबागेचे उत्पन्न — शालेय बाजाराचे यश",
    titleHi: "किचन गार्डन उपज — शालेय बाजार की सफलता",
    excerpt:
      "Students successfully grew vegetables and herbs in the school kitchen garden (परसबाग) and sold produce at the school market, learning entrepreneurship.",
    excerptMr:
      "विद्यार्थ्यांनी परसबागेत भाजीपाला व औषधी वनस्पती पिकविल्या आणि शालेय बाजारात विक्री केली. उद्योजकतेचे धडे मिळाले.",
    excerptHi:
      "विद्यार्थियों ने परसबाग में सब्जियाँ उगाईं और शालेय बाजार में बेचीं। उद्यमशीलता के गुण सीखे।",
    date: "2026-04-10",
    category: "event",
    image: "/assets/images/pptx2/image36.jpeg",
    published: true,
  },
];


/**
 * SEO & STRUCTURED DATA (JSON-LD) ENGINE
 * =====================================
 * Institutional SEO framework for P.M. Shri Savitribai Phule High School, Chandrapur.
 * Generates standards-compliant Schema.org entities, BreadcrumbLists, Open Graph,
 * and search metadata across English, Marathi, and Hindi.
 */

import { SCHOOL_CONFIG } from "../config/school";

export const SITE_ORIGIN =
  typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost")
    ? window.location.origin
    : SCHOOL_CONFIG.canonicalUrl || "https://pmshrispps-chandrapur.edu.in";

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/images/pptx1/image1.jpeg`;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generates Primary EducationalOrganization / School Schema
 */
export function getSchoolSchema(origin: string = SITE_ORIGIN) {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": `${origin}/#school`,
    name: SCHOOL_CONFIG.name.english,
    alternateName: [
      SCHOOL_CONFIG.name.marathi,
      SCHOOL_CONFIG.name.hindi,
      SCHOOL_CONFIG.name.short,
      "Savitribai Phule High School Chandrapur",
      "P.M. Shri School Chandrapur",
      "Municipal Corporation School Chandrapur",
      "Savitribai Phule School Babupeth",
      "Government School in Babupeth Chandrapur",
      "PM Shri Savitribai Phule School",
    ],
    url: origin,
    logo: {
      "@type": "ImageObject",
      url: `${origin}/assets/images/savitribai-logo.jpg`,
      caption: "P.M. Shri Savitribai Phule High School Crest",
    },
    image: [
      `${origin}/assets/images/pptx1/image1.jpeg`,
      `${origin}/assets/images/pptx1/image2.jpeg`,
      `${origin}/assets/images/pptx2/image32.jpeg`,
    ],
    description:
      "Official website of P.M. Shri Savitribai Phule High School, Municipal Corporation, Chandrapur. Providing holistic, state-of-the-art education in Babupeth, Chandrapur with modern smart classrooms, ICT computer lab, Ideal Science lab, library, sports, and bilingual instruction (Marathi & Semi-English).",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Netaji Chowk Road, Babupeth",
      addressLocality: "Chandrapur",
      addressRegion: "Maharashtra",
      postalCode: "442403",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.951777,
      longitude: 79.318433,
    },
    hasMap: "https://www.google.com/maps?cid=0x3cc7751859db21e8",
    telephone: SCHOOL_CONFIG.contact.phone,
    email: SCHOOL_CONFIG.contact.email,
    sameAs: [
      SCHOOL_CONFIG.social.facebook,
      SCHOOL_CONFIG.social.youtube,
      SCHOOL_CONFIG.social.instagram,
    ].filter(Boolean),
    foundingLocation: {
      "@type": "Place",
      name: "Babupeth, Chandrapur, Maharashtra",
    },
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "Municipal Corporation, Chandrapur (मनपा)",
      url: "https://cmcchandrapur.com",
    },
    educationalCredentialAwarded: "Secondary School Certificate (SSC)",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Academic Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Upper Primary Education (Classes 1 to 7)",
            description: "Foundational and upper-primary schooling following Maharashtra State Board curriculum.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "High School Education (Classes 8 to 10)",
            description: "High school education with Semi-English medium option and vocational-STEM exposure under PM SHRI scheme.",
          },
        },
      ],
    },
  };
}

/**
 * Generates WebSite Schema with SearchAction
 */
export function getWebSiteSchema(origin: string = SITE_ORIGIN) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: origin,
    name: SCHOOL_CONFIG.name.short,
    alternateName: "SPPS Chandrapur",
    description:
      "Official digital gateway of P.M. Shri Savitribai Phule High School, Municipal Corporation, Chandrapur.",
    inLanguage: ["en", "mr", "hi"],
    publisher: {
      "@id": `${origin}/#school`,
    },
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[], origin: string = SITE_ORIGIN) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${origin}/`,
      },
      ...items.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: crumb.name,
        item: `${origin}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`,
      })),
    ],
  };
}


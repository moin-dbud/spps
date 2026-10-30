/**
 * SCHOOL CONFIGURATION
 * =====================
 * Official school information for:
 * P.M. Shri Savitribai Phule High School, Municipal Corporation, Chandrapur
 *
 * This configuration serves as the base reference and is dynamically
 * synced with Admin Settings via SchoolSettingsContext and /api/settings.
 */

export interface SchoolNameConfig {
  marathi: string;
  hindi: string;
  english: string;
  short: string;
}

export interface SchoolAddressConfig {
  line1: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
}

export interface SchoolContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
}

export interface SchoolSocialConfig {
  facebook: string;
  youtube: string;
  instagram: string;
}

export interface SchoolConfigType {
  name: SchoolNameConfig;
  address: SchoolAddressConfig;
  classesServed: string;
  medium: string;
  management: string;
  contact: SchoolContactConfig;
  social: SchoolSocialConfig;
  enquiryFormUrl: string;
  defaultLanguage: "mr" | "hi" | "en";
  canonicalUrl: string;
  principal: string;
  headTeacher: string;
  academicYear: string;
}

export const SCHOOL_CONFIG: SchoolConfigType = {
  /** Official displayed school name across all mediums */
  name: {
    marathi: "पी.एम. श्री. सावित्रीबाई फुले हायस्कूल, महानगरपालिका, चंद्रपूर",
    hindi: "पी.एम. श्री. सावित्रीबाई फुले हाई स्कूल, महानगरपालिका, चंद्रपुर",
    english: "P.M. Shri Savitribai Phule High School, Municipal Corporation, Chandrapur",
    short: "P.M. Shri Savitribai Phule High School",
  },

  /** Verified postal address from municipal records and GPS imagery */
  address: {
    line1: "Near Narsingh Akhada, Netaji Chowk Road",
    area: "Babupeth",
    city: "Chandrapur",
    state: "Maharashtra",
    pincode: "442403",
    fullAddress: "3, Netaji Chowk Rd, Babupeth, Chandrapur, Maharashtra 442403",
  },

  /** Classes served */
  classesServed: "Classes 1–10 (Upper Primary & High School)",

  /** Medium of instruction */
  medium: "Marathi / Semi-English",

  /** School governance & management */
  management: "Municipal Corporation, Chandrapur (मनपा)",

  /** Verified contact information */
  contact: {
    phone: "+91 94045 47528",
    whatsapp: "+91 94045 47528",
    email: "savitribaiphule.school@gmail.com",
  },

  /** Official social links */
  social: {
    facebook: "https://facebook.com/pmshrisavitribaiphulechandrapur",
    youtube: "https://youtube.com/@pmshrisavitribaiphuleschool",
    instagram: "https://instagram.com/pmshrisavitribaiphuleschool",
  },

  /** Google Form embed URL for enquiry page */
  enquiryFormUrl: "",

  /** Default language */
  defaultLanguage: "en",

  /** Canonical production URL */
  canonicalUrl: "https://pmshrispps-chandrapur.edu.in",

  /** Principal name */
  principal: "Shivlal Irpate Sir (शिवलाल इरपाते)",

  /** Head teacher */
  headTeacher: "Ajay Madot Sir (अजय माडोत)",

  /** Academic year */
  academicYear: "2026-27",
};

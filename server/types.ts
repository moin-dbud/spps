import type { ObjectId } from 'mongodb';

export type AdminRole = 'Super Admin' | 'Content Admin';
export type AdminStatus = 'Active' | 'Inactive';

export interface AdminDocument {
  _id?: ObjectId;
  id: string;
  username: string;
  displayName: string;
  passwordHash: string;
  role: AdminRole;
  status: AdminStatus;
  createdAt: string;
  lastLogin: string | null;
}

export interface SettingsDocument {
  _id?: ObjectId;
  key?: string; // default "main"
  name: {
    marathi: string;
    hindi: string;
    english: string;
    short: string;
  };
  address: {
    line1: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
  };
  classesServed: string;
  medium: string;
  management: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  social: {
    facebook: string;
    youtube: string;
    instagram: string;
  };
  enquiryFormUrl: string;
  defaultLanguage: 'en' | 'mr' | 'hi';
  canonicalUrl: string;
  principal: string;
  headTeacher: string;
  academicYear: string;
  updatedAt?: string;
}

export type NewsCategory = 'notice' | 'event' | 'press' | 'update';

export interface NewsDocument {
  _id?: ObjectId;
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
  date: string;
  category: NewsCategory;
  image?: string;
  source?: string;
  published: boolean;
  paperRotation?: string;
  pinColor?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type GalleryCategory =
  | 'all'
  | 'academics'
  | 'events'
  | 'digital'
  | 'environment'
  | 'sports'
  | 'cultural'
  | 'trips'
  | 'newspaper';

export interface GalleryDocument {
  _id?: ObjectId;
  id: string;
  src: string;
  caption: string;
  captionMr?: string;
  captionHi?: string;
  category: GalleryCategory;
  date?: string;
  published: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnquiryDocument {
  _id?: ObjectId;
  id: string;
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  classGrade: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

export interface AuditLogDocument {
  _id?: ObjectId;
  id: string;
  timestamp: string;
  actor: string;
  target: string;
  action: string;
  details?: string;
}

export interface SessionDocument {
  _id?: ObjectId;
  token: string;
  adminId: string;
  username: string;
  role: string;
  displayName: string;
  createdAt: Date;
  expiresAt: Date;
}


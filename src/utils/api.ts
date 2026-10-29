import type { NewsItem } from '../data/news';
import type { GalleryItem } from '../data/gallery';
import type { SchoolConfigType } from '../config/school';

const ADMIN_SECRET = 'spps_admin_secret_2026';
const TOKEN_KEY = 'spps_admin_token';

export function getAdminToken(): string {
  return localStorage.getItem(TOKEN_KEY) || ADMIN_SECRET;
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAdminToken()}`,
    'X-Admin-Token': getAdminToken(),
  };
}

// ================= NEWS API =================
export async function apiFetchNews(): Promise<NewsItem[]> {
  const res = await fetch('/api/news');
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data)) {
    localStorage.setItem('spps_news', JSON.stringify(data));
    return data;
  }
  return [];
}

export async function apiSaveAllNews(items: NewsItem[]): Promise<boolean> {
  // Sync immediately to localStorage
  localStorage.setItem('spps_news', JSON.stringify(items));
  // Dispatch custom storage event for instant tab sync
  window.dispatchEvent(new Event('spps_news_updated'));

  try {
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(items),
    });
    return res.ok;
  } catch (e) {
    console.warn('API sync failed, saved locally:', e);
    return true; // Still persisted in localStorage
  }
}

export async function apiDeleteNews(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ================= GALLERY API =================
export async function apiFetchGallery(): Promise<GalleryItem[]> {
  const res = await fetch('/api/gallery');
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data)) {
    localStorage.setItem('spps_gallery', JSON.stringify(data));
    return data;
  }
  return [];
}

export async function apiSaveAllGallery(items: GalleryItem[]): Promise<boolean> {
  // Sync immediately to localStorage
  localStorage.setItem('spps_gallery', JSON.stringify(items));
  window.dispatchEvent(new Event('spps_gallery_updated'));

  try {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(items),
    });
    return res.ok;
  } catch (e) {
    console.warn('API sync failed, saved locally:', e);
    return true;
  }
}

export async function apiDeleteGallery(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ================= SETTINGS API =================
export async function apiFetchSettings(): Promise<Partial<SchoolConfigType> | null> {
  const res = await fetch('/api/settings');
  if (!res.ok) return null;
  return await res.json();
}

export async function apiSaveSettings(settings: Partial<SchoolConfigType>): Promise<boolean> {
  localStorage.setItem('spps_school_settings', JSON.stringify(settings));
  window.dispatchEvent(new Event('spps_settings_updated'));
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return res.ok;
  } catch (e) {
    console.warn('API sync failed, saved locally:', e);
    return true;
  }
}


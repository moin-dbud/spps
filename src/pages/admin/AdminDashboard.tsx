import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Save,
  RotateCcw,
  Phone,
  Building2,
  MapPin,
  Globe,
} from "lucide-react";
import { SCHOOL_CONFIG } from "../../config/school";
import { useSchoolSettings } from "../../context/SchoolSettingsContext";
import { staticGalleryItems, type GalleryItem, type GalleryCategory } from "../../data/gallery";
import "./AdminDashboard.css";

/* =========================================================
   TYPES
   ========================================================= */
interface NewsItem {
  id: string;
  titleEn: string;
  titleMr: string;
  titleHi: string;
  excerpt: string;
  content: string;
  date: string;
  category: "notice" | "event" | "press" | "update";
  imageUrl: string;
  published: boolean;
}

type AdminTab = "dashboard" | "gallery" | "news" | "settings";

/* =========================================================
   HELPERS
   ========================================================= */
const LS_NEWS = "spps_news";
const LS_GALLERY = "spps_gallery";

function loadNews(): NewsItem[] {
  try {
    return JSON.parse(localStorage.getItem(LS_NEWS) || "[]");
  } catch {
    return [];
  }
}
function saveNews(items: NewsItem[]) {
  localStorage.setItem(LS_NEWS, JSON.stringify(items));
}

function loadAdminGallery(): GalleryItem[] {
  try {
    return JSON.parse(localStorage.getItem(LS_GALLERY) || "[]");
  } catch {
    return [];
  }
}
function saveAdminGallery(items: GalleryItem[]) {
  localStorage.setItem(LS_GALLERY, JSON.stringify(items));
}

const GALLERY_CATEGORIES: GalleryCategory[] = [
  "academics", "events", "digital", "environment",
  "sports", "cultural", "trips", "newspaper",
];

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Auth guard
  useEffect(() => {
    if (localStorage.getItem("spps_admin_auth") !== "true") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("spps_admin_auth");
    navigate("/admin/login", { replace: true });
  }

  /* ---------- shared data state ---------- */
  const [news, setNews] = useState<NewsItem[]>(loadNews);
  const [adminGallery, setAdminGallery] = useState<GalleryItem[]>(loadAdminGallery);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  useEffect(() => {
    // 1. Fetch News from API
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Normalize news items for admin panel
          const normalized: NewsItem[] = data.map((item: any) => ({
            id: item.id || `news_${Date.now()}`,
            titleEn: item.titleEn || item.title || "",
            titleMr: item.titleMr || "",
            titleHi: item.titleHi || "",
            excerpt: item.excerpt || "",
            content: item.content || "",
            date: item.date || new Date().toISOString().slice(0, 10),
            category: item.category || "notice",
            imageUrl: item.imageUrl || item.image || "",
            published: item.published !== undefined ? item.published : true,
          }));
          setNews(normalized);
          localStorage.setItem(LS_NEWS, JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 2. Fetch Gallery from API
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAdminGallery(data);
          localStorage.setItem(LS_GALLERY, JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  async function persistNews(items: NewsItem[]) {
    setNews(items);
    // Convert to canonical NewsItem schema for public view & backend
    const canonical = items.map((item) => ({
      id: item.id,
      title: item.titleEn,
      titleEn: item.titleEn,
      titleMr: item.titleMr,
      titleHi: item.titleHi,
      excerpt: item.excerpt,
      excerptMr: item.titleMr ? item.excerpt : undefined,
      excerptHi: item.titleHi ? item.excerpt : undefined,
      content: item.content,
      date: item.date,
      category: item.category,
      image: item.imageUrl,
      imageUrl: item.imageUrl,
      published: item.published,
    }));

    saveNews(canonical as any);
    localStorage.setItem("spps_news", JSON.stringify(canonical));
    window.dispatchEvent(new Event("spps_news_updated"));

    // Sync to backend API with admin auth
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer spps_admin_secret_2026",
          "X-Admin-Token": "spps_admin_secret_2026",
        },
        body: JSON.stringify(canonical),
      });
      if (res.ok) {
        showFeedback("success", "News & notices saved and synchronized successfully!");
      } else {
        showFeedback("success", "Saved locally (backend requires server sync)");
      }
    } catch {
      showFeedback("success", "Saved to local cache successfully!");
    }
  }

  async function persistGallery(items: GalleryItem[]) {
    setAdminGallery(items);
    saveAdminGallery(items);
    window.dispatchEvent(new Event("spps_gallery_updated"));

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer spps_admin_secret_2026",
          "X-Admin-Token": "spps_admin_secret_2026",
        },
        body: JSON.stringify(items),
      });
      if (res.ok) {
        showFeedback("success", "Gallery saved and synchronized successfully!");
      } else {
        showFeedback("success", "Saved locally (backend requires server sync)");
      }
    } catch {
      showFeedback("success", "Saved to local cache successfully!");
    }
  }

  /* ---------- stats ---------- */
  const allGalleryCount = staticGalleryItems.length + adminGallery.length;
  const publishedNews = news.filter((n) => n.published && n.category !== "notice").length;
  const pendingNotices = news.filter((n) => !n.published && n.category === "notice").length;
  const totalNotices = news.filter((n) => n.category === "notice").length;

  return (
    <div className="admin-layout">
      {/* ─── SIDEBAR ─── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <Shield size={22} />
          <span>{SCHOOL_CONFIG.name.short}</span>
        </div>

        <nav className="admin-sidebar__nav">
          <button
            className={`admin-sidebar__link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button
            className={`admin-sidebar__link ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <Image size={18} />
            Gallery
          </button>
          <button
            className={`admin-sidebar__link ${activeTab === "news" ? "active" : ""}`}
            onClick={() => setActiveTab("news")}
          >
            <Newspaper size={18} />
            News &amp; Notices
          </button>
          <button
            className={`admin-sidebar__link ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <LogOut size={16} />
          Sign Out
        </button>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="admin-content">
        {feedback && (
          <div
            style={{
              padding: "0.75rem 1.25rem",
              marginBottom: "1.5rem",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9375rem",
              fontWeight: 500,
              background: feedback.type === "success" ? "#e6faf0" : "#fef0f0",
              color: feedback.type === "success" ? "#1b693a" : "#c53030",
              border: `1px solid ${feedback.type === "success" ? "#a3e6be" : "#f8b4b4"}`,
              animation: "fadeIn 0.2s ease",
            }}
          >
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}
        {activeTab === "dashboard" && (
          <DashboardOverview
            galleryCount={allGalleryCount}
            publishedNews={publishedNews}
            pendingNotices={pendingNotices}
            totalNotices={totalNotices}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === "gallery" && (
          <GalleryTab
            adminItems={adminGallery}
            onChange={persistGallery}
          />
        )}
        {activeTab === "news" && (
          <NewsTab news={news} onChange={persistNews} />
        )}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD OVERVIEW
   ========================================================= */
function DashboardOverview({
  galleryCount, publishedNews, pendingNotices, totalNotices, onNavigate,
}: {
  galleryCount: number;
  publishedNews: number;
  pendingNotices: number;
  totalNotices: number;
  onNavigate: (tab: AdminTab) => void;
}) {
  return (
    <div className="admin-section">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Welcome back, Admin. Here's a quick overview.</p>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><Image size={22} /></div>
          <div className="admin-stat-card__num">{galleryCount}</div>
          <div className="admin-stat-card__label">Total Gallery Items</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><Newspaper size={22} /></div>
          <div className="admin-stat-card__num">{publishedNews}</div>
          <div className="admin-stat-card__label">Published News</div>
        </div>
        <div className="admin-stat-card admin-stat-card--warn">
          <div className="admin-stat-card__icon"><AlertCircle size={22} /></div>
          <div className="admin-stat-card__num">{pendingNotices}</div>
          <div className="admin-stat-card__label">Pending Notices</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon"><FileText size={22} /></div>
          <div className="admin-stat-card__num">{totalNotices}</div>
          <div className="admin-stat-card__label">Total Notices</div>
        </div>
      </div>

      <h2 className="admin-section-heading">Quick Actions</h2>
      <div className="admin-quick-actions">
        <button className="admin-action-btn" onClick={() => onNavigate("gallery")}>
          <Plus size={16} /> Add Gallery Photo
        </button>
        <button className="admin-action-btn" onClick={() => onNavigate("news")}>
          <Plus size={16} /> Add News Article
        </button>
        <button className="admin-action-btn admin-action-btn--secondary" onClick={() => onNavigate("news")}>
          <Plus size={16} /> Add Notice
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY TAB
   ========================================================= */
const EMPTY_GALLERY: Omit<GalleryItem, "id"> = {
  src: "",
  caption: "",
  captionMr: "",
  captionHi: "",
  category: "events",
  published: true,
  isAdmin: true,
};

function GalleryTab({
  adminItems,
  onChange,
}: {
  adminItems: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}) {
  const [form, setForm] = useState({ ...EMPTY_GALLERY });
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleSave() {
    if (!form.src.trim()) return;
    if (editId) {
      onChange(adminItems.map((item) => (item.id === editId ? { ...form, id: editId } : item)));
      setEditId(null);
    } else {
      const newItem: GalleryItem = {
        ...form,
        id: `admin_${Date.now()}`,
      };
      onChange([...adminItems, newItem]);
      setAdding(false);
    }
    setForm({ ...EMPTY_GALLERY });
  }

  function startEdit(item: GalleryItem) {
    setForm({
      src: item.src,
      caption: item.caption,
      captionMr: item.captionMr || "",
      captionHi: item.captionHi || "",
      category: item.category,
      published: item.published,
      isAdmin: true,
    });
    setEditId(item.id);
    setAdding(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function togglePublish(id: string) {
    onChange(adminItems.map((it) =>
      it.id === id ? { ...it, published: !it.published } : it
    ));
  }

  function handleDelete(id: string) {
    onChange(adminItems.filter((it) => it.id !== id));
    setDeleteId(null);
  }

  const isFormOpen = adding || editId !== null;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Gallery Management</h1>
          <p className="admin-page-sub">
            {staticGalleryItems.length} static items (from source) + {adminItems.length} admin-added
          </p>
        </div>
        <button
          className="admin-action-btn"
          onClick={() => {
            setAdding((v) => !v);
            setEditId(null);
            setForm({ ...EMPTY_GALLERY });
          }}
        >
          <Plus size={16} /> {adding ? "Cancel" : "Add Photo"}
        </button>
      </div>

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="admin-form-card">
          <h3 className="admin-form-card__title">
            {editId ? "Edit Gallery Item" : "New Gallery Item"}
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Image URL *</label>
              <input
                className="admin-form-input"
                type="url"
                placeholder="https://… or /assets/images/…"
                value={form.src}
                onChange={(e) => setForm({ ...form, src: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Caption (English)</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Caption (Marathi)</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.captionMr}
                onChange={(e) => setForm({ ...form, captionMr: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Caption (Hindi)</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.captionHi}
                onChange={(e) => setForm({ ...form, captionHi: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Category</label>
              <select
                className="admin-form-select"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as GalleryCategory })
                }
              >
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-action-btn" onClick={handleSave} disabled={!form.src.trim()}>
              <CheckCircle2 size={15} /> {editId ? "Update Photo" : "Save Photo"}
            </button>
            <button
              className="admin-action-btn admin-action-btn--ghost"
              onClick={() => {
                setAdding(false);
                setEditId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Static items (read-only) */}
      <h2 className="admin-section-heading">
        Static Items ({staticGalleryItems.length})
        <span className="admin-badge admin-badge--static">Source Files</span>
      </h2>
      <div className="admin-gallery-grid">
        {staticGalleryItems.map((item) => (
          <div key={item.id} className="admin-gallery-card admin-gallery-card--static">
            <div className="admin-gallery-card__img-wrap">
              <img src={item.src} alt={item.caption} loading="lazy" />
              <span className="admin-gallery-card__lock"><Lock size={12} /></span>
            </div>
            <div className="admin-gallery-card__body">
              <p className="admin-gallery-card__caption">{item.caption}</p>
              <span className="admin-badge admin-badge--cat">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin-added items */}
      <h2 className="admin-section-heading">
        Admin Added ({adminItems.length})
      </h2>
      {adminItems.length === 0 ? (
        <p className="admin-empty">No admin-added gallery items yet. Click "Add Photo" above.</p>
      ) : (
        <div className="admin-gallery-grid">
          {adminItems.map((item) => (
            <div key={item.id} className="admin-gallery-card">
              <div className="admin-gallery-card__img-wrap">
                <img src={item.src} alt={item.caption} loading="lazy" />
              </div>
              <div className="admin-gallery-card__body">
                <p className="admin-gallery-card__caption">{item.caption || "—"}</p>
                <span className="admin-badge admin-badge--cat">{item.category}</span>
              </div>
              <div className="admin-gallery-card__actions">
                <button
                  className="admin-icon-btn"
                  title="Edit details"
                  onClick={() => startEdit(item)}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="admin-icon-btn"
                  title={item.published ? "Unpublish" : "Publish"}
                  onClick={() => togglePublish(item.id)}
                >
                  {item.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  className="admin-icon-btn admin-icon-btn--danger"
                  title="Delete"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              {deleteId === item.id && (
                <div className="admin-confirm">
                  <span>Delete this item?</span>
                  <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                  <button className="admin-action-btn admin-action-btn--ghost" onClick={() => setDeleteId(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   NEWS & NOTICES TAB
   ========================================================= */
const EMPTY_NEWS: Omit<NewsItem, "id"> = {
  titleEn: "",
  titleMr: "",
  titleHi: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  category: "update",
  imageUrl: "",
  published: true,
};

function NewsTab({
  news,
  onChange,
}: {
  news: NewsItem[];
  onChange: (items: NewsItem[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<NewsItem, "id">>({ ...EMPTY_NEWS });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function startEdit(item: NewsItem) {
    const { id, ...rest } = item;
    setForm(rest);
    setEditId(id);
    setAdding(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSave() {
    if (!form.titleEn.trim()) return;
    if (editId) {
      onChange(news.map((n) => (n.id === editId ? { ...form, id: editId } : n)));
      setEditId(null);
    } else {
      onChange([{ ...form, id: `news_${Date.now()}` }, ...news]);
      setAdding(false);
    }
    setForm({ ...EMPTY_NEWS });
  }

  function handleDelete(id: string) {
    onChange(news.filter((n) => n.id !== id));
    setDeleteId(null);
  }

  function togglePublish(id: string) {
    onChange(news.map((n) => (n.id === id ? { ...n, published: !n.published } : n)));
  }

  const isFormOpen = adding || editId !== null;

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">News &amp; Notices</h1>
          <p className="admin-page-sub">{news.length} total items</p>
        </div>
        <button
          className="admin-action-btn"
          onClick={() => {
            setAdding(true);
            setEditId(null);
            setForm({ ...EMPTY_NEWS });
          }}
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="admin-form-card">
          <h3 className="admin-form-card__title">
            {editId ? "Edit Item" : "New News / Notice"}
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Title (English) *</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Title (Marathi)</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.titleMr}
                onChange={(e) => setForm({ ...form, titleMr: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Title (Hindi)</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.titleHi}
                onChange={(e) => setForm({ ...form, titleHi: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Excerpt</label>
              <input
                className="admin-form-input"
                type="text"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Full Content</label>
              <textarea
                className="admin-form-textarea"
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Date</label>
              <input
                className="admin-form-input"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Category</label>
              <select
                className="admin-form-select"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as NewsItem["category"] })
                }
              >
                <option value="notice">Notice</option>
                <option value="event">Event</option>
                <option value="press">Press</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Image URL</label>
              <input
                className="admin-form-input"
                type="url"
                placeholder="https://…"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Status</label>
              <select
                className="admin-form-select"
                value={form.published ? "published" : "draft"}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.value === "published" })
                }
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="admin-form-actions">
            <button
              className="admin-action-btn"
              onClick={handleSave}
              disabled={!form.titleEn.trim()}
            >
              <CheckCircle2 size={15} /> {editId ? "Save Changes" : "Publish"}
            </button>
            <button
              className="admin-action-btn admin-action-btn--ghost"
              onClick={() => {
                setAdding(false);
                setEditId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* News list */}
      {news.length === 0 ? (
        <p className="admin-empty">No news or notices yet. Click "Add Item" to create one.</p>
      ) : (
        <div className="admin-news-table">
          {news.map((item) => (
            <div key={item.id} className={`admin-news-row ${!item.published ? "admin-news-row--draft" : ""}`}>
              <div className="admin-news-row__main">
                <div className="admin-news-row__meta">
                  <span className={`admin-badge admin-badge--cat admin-badge--${item.category}`}>
                    {item.category}
                  </span>
                  <span className="admin-news-row__date">{item.date}</span>
                  {!item.published && (
                    <span className="admin-badge admin-badge--draft">Draft</span>
                  )}
                </div>
                <h3 className="admin-news-row__title">{item.titleEn}</h3>
                {item.excerpt && (
                  <p className="admin-news-row__excerpt">{item.excerpt}</p>
                )}
              </div>
              <div className="admin-news-row__actions">
                <button
                  className="admin-icon-btn"
                  title="Edit"
                  onClick={() => startEdit(item)}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="admin-icon-btn"
                  title={item.published ? "Unpublish" : "Publish"}
                  onClick={() => togglePublish(item.id)}
                >
                  {item.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  className="admin-icon-btn admin-icon-btn--danger"
                  title="Delete"
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              {deleteId === item.id && (
                <div className="admin-confirm">
                  <span>Permanently delete "{item.titleEn}"?</span>
                  <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                  <button className="admin-action-btn admin-action-btn--ghost" onClick={() => setDeleteId(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SETTINGS TAB (LIVE EDITABLE & PERSISTENT)
   ========================================================= */
function SettingsTab() {
  const { settings, updateSettings, resetToDefaults, isLoading, lastSaved } = useSchoolSettings();

  const [formData, setFormData] = useState({
    nameEn: settings.name.english,
    nameMr: settings.name.marathi,
    nameHi: settings.name.hindi,
    nameShort: settings.name.short,
    management: settings.management,

    phone: settings.contact.phone,
    whatsapp: settings.contact.whatsapp,
    email: settings.contact.email,

    addressLine1: settings.address.line1,
    addressArea: settings.address.area,
    addressCity: settings.address.city,
    addressState: settings.address.state,
    addressPincode: settings.address.pincode,

    principal: settings.principal,
    headTeacher: settings.headTeacher,
    academicYear: settings.academicYear,
    classesServed: settings.classesServed,
    medium: settings.medium,

    facebook: settings.social.facebook,
    youtube: settings.social.youtube,
    instagram: settings.social.instagram,
    enquiryFormUrl: settings.enquiryFormUrl,
    canonicalUrl: settings.canonicalUrl,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Sync state if settings change outside
  useEffect(() => {
    setFormData({
      nameEn: settings.name.english,
      nameMr: settings.name.marathi,
      nameHi: settings.name.hindi,
      nameShort: settings.name.short,
      management: settings.management,

      phone: settings.contact.phone,
      whatsapp: settings.contact.whatsapp,
      email: settings.contact.email,

      addressLine1: settings.address.line1,
      addressArea: settings.address.area,
      addressCity: settings.address.city,
      addressState: settings.address.state,
      addressPincode: settings.address.pincode,

      principal: settings.principal,
      headTeacher: settings.headTeacher,
      academicYear: settings.academicYear,
      classesServed: settings.classesServed,
      medium: settings.medium,

      facebook: settings.social.facebook,
      youtube: settings.social.youtube,
      instagram: settings.social.instagram,
      enquiryFormUrl: settings.enquiryFormUrl,
      canonicalUrl: settings.canonicalUrl,
    });
  }, [settings]);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      name: {
        english: formData.nameEn,
        marathi: formData.nameMr,
        hindi: formData.nameHi,
        short: formData.nameShort,
      },
      management: formData.management,
      contact: {
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
      },
      address: {
        line1: formData.addressLine1,
        area: formData.addressArea,
        city: formData.addressCity,
        state: formData.addressState,
        pincode: formData.addressPincode,
        fullAddress: `${formData.addressLine1}, ${formData.addressArea}, ${formData.addressCity}, ${formData.addressState} ${formData.addressPincode}`.trim(),
      },
      principal: formData.principal,
      headTeacher: formData.headTeacher,
      academicYear: formData.academicYear,
      classesServed: formData.classesServed,
      medium: formData.medium,
      social: {
        facebook: formData.facebook,
        youtube: formData.youtube,
        instagram: formData.instagram,
      },
      enquiryFormUrl: formData.enquiryFormUrl,
      canonicalUrl: formData.canonicalUrl,
    };

    const ok = await updateSettings(updated);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleReset = async () => {
    await resetToDefaults();
    setResetConfirm(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">School Identity &amp; System Settings</h1>
          <p className="admin-page-sub">
            Edit contact numbers, official school names, address, and online configurations. Updates persist across page reloads and devices.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="admin-action-btn admin-action-btn--ghost"
            onClick={() => setResetConfirm(true)}
            title="Reset all settings to verified baseline"
          >
            <RotateCcw size={15} /> Reset Defaults
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="admin-alert-banner success" style={{ background: "#e8f5e9", color: "#1b5e20", border: "1.5px solid #a5d6a7", padding: "12px 18px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <CheckCircle2 size={20} />
          <span><strong>Success!</strong> Settings have been saved and applied across the entire website. (Last synced: {lastSaved || "just now"})</span>
        </div>
      )}

      {resetConfirm && (
        <div className="admin-alert-banner warning" style={{ background: "#fff8e1", color: "#b78103", border: "1.5px solid #ffe082", padding: "14px 18px", borderRadius: "8px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <AlertCircle size={20} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
            <strong>Are you sure?</strong> This will reset all contact and school info back to original verified school defaults.
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="admin-action-btn btn--sm" onClick={handleReset}>Yes, Reset</button>
            <button className="admin-action-btn admin-action-btn--ghost btn--sm" onClick={() => setResetConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="admin-settings-form">
        {/* Card 1: Contact Information */}
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Phone size={18} color="var(--clr-green-700)" /> Contact Information (Displayed in Header, Footer &amp; Contact Page)
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Phone Number *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 94045 47528"
              />
              <span className="admin-field-hint">Clickable tel link generated automatically</span>
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">WhatsApp Number *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 94045 47528"
              />
              <span className="admin-field-hint">Direct chat link: wa.me/919404547528</span>
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Official Email Address *</label>
              <input
                className="admin-form-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="savitribaiphule.school@gmail.com"
              />
              <span className="admin-field-hint">Used for admissions and inquiries</span>
            </div>
          </div>
        </div>

        {/* Card 2: Official School Names */}
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Building2 size={18} color="var(--clr-green-700)" /> Official School Identity &amp; Display Names
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Official Name (English) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Official Name (मराठी) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameMr}
                onChange={(e) => setFormData({ ...formData, nameMr: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Official Name (हिंदी) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameHi}
                onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Short Name / Footer Brand</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.nameShort}
                onChange={(e) => setFormData({ ...formData, nameShort: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Management / Governing Authority</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.management}
                onChange={(e) => setFormData({ ...formData, management: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Card 3: School Address */}
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={18} color="var(--clr-green-700)" /> Campus Postal Address
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Street / Landmark</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Area / Locality</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressArea}
                onChange={(e) => setFormData({ ...formData, addressArea: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">City</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressCity}
                onChange={(e) => setFormData({ ...formData, addressCity: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">State</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressState}
                onChange={(e) => setFormData({ ...formData, addressState: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Postal PIN Code *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.addressPincode}
                onChange={(e) => setFormData({ ...formData, addressPincode: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Card 4: Academic & Leadership Info */}
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={18} color="var(--clr-green-700)" /> Academic Profile &amp; Leadership
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Principal Name &amp; Title</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.principal}
                onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Head Teacher</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.headTeacher}
                onChange={(e) => setFormData({ ...formData, headTeacher: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Classes Served</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.classesServed}
                onChange={(e) => setFormData({ ...formData, classesServed: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Medium of Instruction</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.medium}
                onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Academic Year</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Card 5: Social Media & Enquiry Links */}
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Globe size={18} color="var(--clr-green-700)" /> Social Media &amp; Web Portals
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Facebook Page URL</label>
              <input
                className="admin-form-input"
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">YouTube Channel URL</label>
              <input
                className="admin-form-input"
                type="url"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                placeholder="https://youtube.com/@..."
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Instagram Profile URL</label>
              <input
                className="admin-form-input"
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Google Form Enquiry Embed URL</label>
              <input
                className="admin-form-input"
                type="url"
                value={formData.enquiryFormUrl}
                onChange={(e) => setFormData({ ...formData, enquiryFormUrl: e.target.value })}
                placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="admin-form-actions" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            type="submit"
            className="admin-action-btn"
            disabled={isLoading}
            style={{ padding: "0.85rem 1.75rem", fontSize: "1rem" }}
          >
            <Save size={18} /> {isLoading ? "Saving Settings..." : "Save All Settings"}
          </button>
          {lastSaved && (
            <span style={{ fontSize: "0.875rem", color: "var(--clr-neutral-500)" }}>
              Last saved at {lastSaved}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

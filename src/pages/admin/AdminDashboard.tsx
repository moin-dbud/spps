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
  Users,
  UserCheck,
  UserX,
  KeyRound,
  History,
  Search,
  X,
  User,
  Menu,
} from "lucide-react";
import { SCHOOL_CONFIG } from "../../config/school";
import { useSchoolSettings } from "../../context/SchoolSettingsContext";
import { staticGalleryItems, type GalleryItem, type GalleryCategory } from "../../data/gallery";
import {
  getCurrentAdmin,
  apiGetCurrentUser,
  apiLogout,
  apiFetchAdmins,
  apiCreateAdmin,
  apiUpdateAdmin,
  apiFetchAuditLogs,
  apiClearAuditLogs,
  apiDeleteAdmin,
  apiUpdateProfile,
  apiChangePassword,
  apiGetDashboardStats,
  type AdminUser,
  type AdminRole,
  type AuditLog,
  type DashboardStats,
} from "../../utils/api";
import "./AdminDashboard.css";
import "./AdminAccounts.css";

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

type AdminTab = "dashboard" | "gallery" | "news" | "settings" | "accounts" | "profile" | "audit";

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
   MAIN ADMIN DASHBOARD
   ========================================================= */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [currentAdmin, setCurrentAdminState] = useState<AdminUser | null>(getCurrentAdmin);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Auth guard & verify session on server
  useEffect(() => {
    if (localStorage.getItem("spps_admin_auth") !== "true") {
      navigate("/admin/login", { replace: true });
      return;
    }
    apiGetCurrentUser().then((user) => {
      if (user) {
        setCurrentAdminState(user);
      } else {
        // Session invalid or expired
        apiLogout().then(() => navigate("/admin/login", { replace: true }));
      }
    });
  }, [navigate]);

  async function handleLogout() {
    await apiLogout();
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
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
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

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("spps_admin_token") || "spps_admin_secret_2026"}`,
        },
        body: JSON.stringify(canonical),
      });
      if (res.ok) {
        showFeedback("success", "News & notices saved and synchronized successfully!");
      } else {
        showFeedback("success", "Saved to local cache successfully!");
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
          "Authorization": `Bearer ${localStorage.getItem("spps_admin_token") || "spps_admin_secret_2026"}`,
        },
        body: JSON.stringify(items),
      });
      if (res.ok) {
        showFeedback("success", "Gallery saved and synchronized successfully!");
      } else {
        showFeedback("success", "Saved to local cache successfully!");
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
  const isSuperAdmin = currentAdmin?.role === "Super Admin";

  /* ---------- DB dashboard stats ---------- */
  const [dbStats, setDbStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "dashboard") {
      setStatsLoading(true);
      apiGetDashboardStats()
        .then((s) => setDbStats(s))
        .finally(() => setStatsLoading(false));
    }
  }, [activeTab]);

  const TAB_TITLES: Record<AdminTab, string> = {
    dashboard: "Dashboard",
    gallery: "Gallery Management",
    news: "News & Notices",
    settings: "School Settings",
    accounts: "Admin Management",
    audit: "Audit Logs",
    profile: "My Profile",
  };

  const handleNavSelect = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* ─── MOBILE ADMIN HEADER (Sticky on < 768px) ─── */}
      <header className="admin-mobile-header" role="banner">
        <div className="admin-mobile-header__title-wrap">
          <span className="admin-mobile-header__badge">Admin</span>
          <h1 className="admin-mobile-header__title">{TAB_TITLES[activeTab] || "Admin"}</h1>
        </div>
        <button
          className="admin-mobile-header__toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close admin navigation" : "Open admin navigation"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ─── MOBILE DRAWER MENU ─── */}
      {mobileMenuOpen && (
        <div
          className="admin-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Admin Navigation"
        >
          {/* User info */}
          {currentAdmin && (
            <div className="admin-mobile-drawer__user">
              <div className="admin-sidebar__avatar">
                {currentAdmin.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="admin-mobile-drawer__user-text">
                <p className="admin-sidebar__user-name">{currentAdmin.displayName}</p>
                <p className="admin-sidebar__user-role">{currentAdmin.role}</p>
              </div>
            </div>
          )}

          <nav className="admin-mobile-drawer__nav" aria-label="Mobile admin menu">
            <button
              className={`admin-sidebar__link ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => handleNavSelect("dashboard")}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
            <button
              className={`admin-sidebar__link ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => handleNavSelect("gallery")}
            >
              <Image size={18} />
              Gallery Management
            </button>
            <button
              className={`admin-sidebar__link ${activeTab === "news" ? "active" : ""}`}
              onClick={() => handleNavSelect("news")}
            >
              <Newspaper size={18} />
              News &amp; Notices
            </button>
            <button
              className={`admin-sidebar__link ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => handleNavSelect("settings")}
            >
              <Settings size={18} />
              School Settings
            </button>

            {isSuperAdmin && (
              <button
                className={`admin-sidebar__link ${activeTab === "accounts" ? "active" : ""}`}
                onClick={() => handleNavSelect("accounts")}
              >
                <Users size={18} />
                Admin Management
              </button>
            )}

            {isSuperAdmin && (
              <button
                className={`admin-sidebar__link ${activeTab === "audit" ? "active" : ""}`}
                onClick={() => handleNavSelect("audit")}
              >
                <History size={18} />
                Audit Logs
              </button>
            )}

            <button
              className={`admin-sidebar__link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => handleNavSelect("profile")}
            >
              <User size={18} />
              My Profile
            </button>
          </nav>

          <div className="admin-mobile-drawer__footer">
            <button
              className="admin-sidebar__link"
              style={{ color: "#f87171" }}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <Shield size={22} />
          <span>{SCHOOL_CONFIG.name.short}</span>
        </div>

        {/* Current user badge */}
        {currentAdmin && (
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-info">
              <div className="admin-sidebar__avatar">
                {currentAdmin.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="admin-sidebar__user-name">{currentAdmin.displayName}</p>
                <p className="admin-sidebar__user-role">{currentAdmin.role}</p>
              </div>
            </div>
          </div>
        )}

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
            School Settings
          </button>

          {/* Super Admin Only Menu Items */}
          {isSuperAdmin && (
            <button
              className={`admin-sidebar__link ${activeTab === "accounts" ? "active" : ""}`}
              onClick={() => setActiveTab("accounts")}
            >
              <Users size={18} />
              Admin Management
            </button>
          )}

          {isSuperAdmin && (
            <button
              className={`admin-sidebar__link ${activeTab === "audit" ? "active" : ""}`}
              onClick={() => setActiveTab("audit")}
            >
              <History size={18} />
              Audit Logs
            </button>
          )}

          {/* Profile link for all admins */}
          <button
            className={`admin-sidebar__link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            My Profile
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
            isSuperAdmin={isSuperAdmin}
            dbStats={dbStats}
            statsLoading={statsLoading}
            currentAdmin={currentAdmin}
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
        {activeTab === "accounts" && isSuperAdmin && (
          <AdminManagementTab
            currentAdmin={currentAdmin}
            onNotify={showFeedback}
          />
        )}
        {activeTab === "profile" && (
          <MyProfileTab
            admin={currentAdmin}
            onProfileUpdate={(updated) => {
              setCurrentAdminState(updated);
              showFeedback("success", "Profile updated successfully!");
            }}
            onNotify={showFeedback}
          />
        )}
        {activeTab === "audit" && isSuperAdmin && (
          <AuditLogsTab onNotify={showFeedback} />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD OVERVIEW
   ========================================================= */
function DashboardOverview({
  galleryCount,
  publishedNews,
  pendingNotices,
  totalNotices,
  onNavigate,
  isSuperAdmin,
  dbStats,
  statsLoading,
  currentAdmin,
}: {
  galleryCount: number;
  publishedNews: number;
  pendingNotices: number;
  totalNotices: number;
  onNavigate: (tab: AdminTab) => void;
  isSuperAdmin: boolean;
  dbStats: DashboardStats | null;
  statsLoading: boolean;
  currentAdmin: AdminUser | null;
}) {
  const { settings } = useSchoolSettings();

  // Use DB values with local fallback
  const totalAdmins = dbStats?.totalAdmins ?? null;
  const dbGallery = dbStats?.totalGallery ?? galleryCount;
  const dbPublishedNews = dbStats?.publishedNews ?? publishedNews;
  const dbPendingNotices = dbStats?.pendingNotices ?? pendingNotices;
  const dbTotalNotices = dbStats?.totalNotices ?? totalNotices;
  const dbTotalNews = dbStats?.totalNews ?? (publishedNews + pendingNotices);
  const recentNews = dbStats?.recentNews ?? [];

  // Chart data: content breakdown
  const chartTotal = dbTotalNews || 1;
  const categoryData = [
    { label: "Notices", count: dbTotalNotices, color: "#10b981" },
    { label: "News", count: dbPublishedNews, color: "#3b82f6" },
    { label: "Pending", count: dbPendingNotices, color: "#f59e0b" },
    { label: "Gallery", count: dbGallery, color: "#8b5cf6" },
  ];

  // Donut: published vs draft
  const publishedPct = dbTotalNews > 0 ? Math.round(((dbPublishedNews + (dbStats?.publishedNotices ?? 0)) / dbTotalNews) * 100) : 0;
  const draftPct = 100 - publishedPct;

  const donutStyle = {
    background: `conic-gradient(#10b981 0% ${publishedPct}%, #e5e7eb ${publishedPct}% 100%)`,
  } as React.CSSProperties;

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Welcome back, {currentAdmin?.displayName || "Admin"}. Here's your school overview.</p>

      {/* ── 5-stat grid ── */}
      <div className="admin-stats-grid--5">
        <div className="admin-stat-card admin-stat-card--blue">
          <div className="admin-stat-card__icon"><Users size={22} /></div>
          <div className="admin-stat-card__num">
            {statsLoading ? <span className="admin-stat-loading" /> : (totalAdmins ?? "—")}
          </div>
          <div className="admin-stat-card__label">Total Admins</div>
        </div>
        <div className="admin-stat-card admin-stat-card--purple">
          <div className="admin-stat-card__icon"><Image size={22} /></div>
          <div className="admin-stat-card__num">
            {statsLoading ? <span className="admin-stat-loading" /> : dbGallery}
          </div>
          <div className="admin-stat-card__label">Gallery Items</div>
        </div>
        <div className="admin-stat-card admin-stat-card--green">
          <div className="admin-stat-card__icon"><Newspaper size={22} /></div>
          <div className="admin-stat-card__num">
            {statsLoading ? <span className="admin-stat-loading" /> : dbPublishedNews}
          </div>
          <div className="admin-stat-card__label">Published News</div>
        </div>
        <div className="admin-stat-card admin-stat-card--amber">
          <div className="admin-stat-card__icon"><AlertCircle size={22} /></div>
          <div className="admin-stat-card__num">
            {statsLoading ? <span className="admin-stat-loading" /> : dbPendingNotices}
          </div>
          <div className="admin-stat-card__label">Pending Notices</div>
        </div>
        <div className="admin-stat-card admin-stat-card--teal">
          <div className="admin-stat-card__icon"><FileText size={22} /></div>
          <div className="admin-stat-card__num">
            {statsLoading ? <span className="admin-stat-loading" /> : dbTotalNotices}
          </div>
          <div className="admin-stat-card__label">Total Notices</div>
        </div>
      </div>

      {/* ── Charts + Recent News + Info ── */}
      <div className="admin-dashboard-grid">

        {/* Content Breakdown Bar Chart */}
        <div className="admin-chart-card">
          <p className="admin-chart-card__title">Content Breakdown</p>
          <div className="admin-chart-bars">
            {categoryData.map((bar) => (
              <div key={bar.label} className="admin-chart-bar-row">
                <span className="admin-chart-bar-label">{bar.label}</span>
                <div className="admin-chart-bar-track">
                  <div
                    className="admin-chart-bar-fill"
                    style={{
                      width: `${Math.max(4, Math.round((bar.count / chartTotal) * 100))}%`,
                      background: bar.color,
                    }}
                  />
                </div>
                <span className="admin-chart-bar-count">{bar.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Published vs Draft Donut */}
        <div className="admin-chart-card">
          <p className="admin-chart-card__title">Publication Status</p>
          <div className="admin-donut-wrap">
            <div
              className="admin-donut"
              style={donutStyle}
              title={`${publishedPct}% published`}
            />
            <div className="admin-donut-legend">
              <div className="admin-donut-legend-item">
                <span className="admin-donut-legend-dot" style={{ background: "#10b981" }} />
                <span>Published — <strong>{publishedPct}%</strong></span>
              </div>
              <div className="admin-donut-legend-item">
                <span className="admin-donut-legend-dot" style={{ background: "#e5e7eb" }} />
                <span>Draft — <strong>{draftPct}%</strong></span>
              </div>
              <div className="admin-donut-legend-item" style={{ marginTop: "0.5rem" }}>
                <span className="admin-donut-legend-dot" style={{ background: "#3b82f6" }} />
                <span>Total content: <strong>{dbTotalNews}</strong></span>
              </div>
              {dbStats?.totalEnquiries != null && (
                <div className="admin-donut-legend-item">
                  <span className="admin-donut-legend-dot" style={{ background: "#f59e0b" }} />
                  <span>Enquiries: <strong>{dbStats.totalEnquiries}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent News/Notices */}
        <div className="admin-chart-card">
          <p className="admin-chart-card__title">Recent Content</p>
          {recentNews.length === 0 ? (
            <p style={{ fontSize: "0.875rem", color: "var(--clr-neutral-500)" }}>
              {statsLoading ? "Loading…" : "No content yet."}
            </p>
          ) : (
            <div className="admin-recent-news-list">
              {recentNews.map((item, i) => (
                <div key={item.id} className="admin-recent-news-item">
                  <span className="admin-recent-news-item__num">#{i + 1}</span>
                  <div className="admin-recent-news-item__body">
                    <p className="admin-recent-news-item__title">{item.title}</p>
                    <div className="admin-recent-news-item__meta">
                      <span className="admin-badge admin-badge--cat">{item.category}</span>
                      <span>{item.date}</span>
                      <span className={`admin-badge ${item.published ? "admin-badge--pub" : "admin-badge--draft"}`}>
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* School Info Panel */}
        <div className="admin-chart-card">
          <p className="admin-chart-card__title">School At a Glance</p>
          <div className="admin-info-panel">
            <div className="admin-info-row">
              <span className="admin-info-row__key">School</span>
              <span className="admin-info-row__val">{settings?.name?.english || SCHOOL_CONFIG.name.english}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-row__key">Management</span>
              <span className="admin-info-row__val">{settings?.management || SCHOOL_CONFIG.management}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-row__key">City</span>
              <span className="admin-info-row__val">{settings?.address?.city || SCHOOL_CONFIG.address.city}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-row__key">Contact</span>
              <span className="admin-info-row__val">{settings?.contact?.phone || SCHOOL_CONFIG.contact.phone}</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-row__key">Logged in as</span>
              <span className="admin-info-row__val">{currentAdmin?.displayName} ({currentAdmin?.role})</span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-row__key">Last login</span>
              <span className="admin-info-row__val">
                {currentAdmin?.lastLogin
                  ? new Date(currentAdmin.lastLogin).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                  : "—"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Quick Actions ── */}
      <h2 className="admin-section-heading">Quick Actions</h2>
      <div className="admin-quick-actions">
        <button className="admin-action-btn" onClick={() => onNavigate("gallery")}>
          <Plus size={16} /> Add Gallery Photo
        </button>
        <button className="admin-action-btn" onClick={() => onNavigate("news")}>
          <Plus size={16} /> Post Notice / News
        </button>
        <button className="admin-action-btn admin-action-btn--ghost" onClick={() => onNavigate("settings")}>
          <Settings size={16} /> Edit School Info
        </button>
        {isSuperAdmin && (
          <button className="admin-action-btn admin-action-btn--ghost" onClick={() => onNavigate("accounts")}>
            <Users size={16} /> Manage Admin Accounts
          </button>
        )}
        <button className="admin-action-btn admin-action-btn--ghost" onClick={() => onNavigate("profile")}>
          <User size={16} /> Update My Profile
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MY PROFILE TAB
   ========================================================= */
function MyProfileTab({
  admin,
  onProfileUpdate,
  onNotify,
}: {
  admin: AdminUser | null;
  onProfileUpdate: (updated: AdminUser) => void;
  onNotify: (type: "success" | "error", msg: string) => void;
}) {
  const [username, setUsername] = useState(admin?.username || "");
  const [displayName, setDisplayName] = useState(admin?.displayName || "");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (admin) {
      setUsername(admin.username);
      setDisplayName(admin.displayName);
    }
  }, [admin]);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || username.length < 3) {
      onNotify("error", "Username must be at least 3 characters.");
      return;
    }
    setSavingProfile(true);
    const res = await apiUpdateProfile({ username: username.trim(), displayName: displayName.trim() });
    setSavingProfile(false);
    if (res.success && res.admin) {
      onProfileUpdate(res.admin);
    } else {
      onNotify("error", res.error || "Failed to update profile.");
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPassword) {
      onNotify("error", "Please provide your current password.");
      return;
    }
    if (newPassword.length < 6) {
      onNotify("error", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      onNotify("error", "New passwords do not match.");
      return;
    }
    setSavingPassword(true);
    const res = await apiChangePassword(currentPassword, newPassword);
    setSavingPassword(false);
    if (res.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onNotify("success", "Password updated successfully!");
    } else {
      onNotify("error", res.error || "Failed to change password.");
    }
  }

  if (!admin) return <div>Loading profile…</div>;

  return (
    <div className="admin-section">
      <h1 className="admin-page-title">My Profile</h1>
      <p className="admin-page-sub">Manage your administrator account details and credentials.</p>

      {/* Account Info Badge */}
      <div className="admin-form-card" style={{ marginBottom: "2rem" }}>
        <h3 className="admin-form-card__title">Account Identity</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <label className="admin-form-label">Role</label>
            <div>
              <span className={`badge-role ${admin.role === "Super Admin" ? "badge-role--super" : "badge-role--content"}`}>
                <Shield size={12} /> {admin.role}
              </span>
            </div>
          </div>
          <div>
            <label className="admin-form-label">Status</label>
            <div>
              <span className="badge-status badge-status--active">
                <CheckCircle2 size={12} /> {admin.status}
              </span>
            </div>
          </div>
          <div>
            <label className="admin-form-label">Account Created</label>
            <div style={{ fontSize: "0.875rem", color: "var(--clr-neutral-600)" }}>
              {new Date(admin.createdAt).toLocaleDateString()}
            </div>
          </div>
          {admin.lastLogin && (
            <div>
              <label className="admin-form-label">Last Login</label>
              <div style={{ fontSize: "0.875rem", color: "var(--clr-neutral-600)" }}>
                {new Date(admin.lastLogin).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {/* Update Profile Form */}
        <div className="admin-form-card">
          <h3 className="admin-form-card__title">Profile Details</h3>
          <form onSubmit={handleProfileSubmit}>
            <div className="admin-form-field" style={{ marginBottom: "1rem" }}>
              <label className="admin-form-label">Username</label>
              <input
                className="admin-form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-field" style={{ marginBottom: "1.5rem" }}>
              <label className="admin-form-label">Display Name</label>
              <input
                className="admin-form-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <button className="admin-action-btn" type="submit" disabled={savingProfile}>
              <Save size={16} /> {savingProfile ? "Saving…" : "Save Profile Details"}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="admin-form-card">
          <h3 className="admin-form-card__title">Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="admin-form-field" style={{ marginBottom: "1rem" }}>
              <label className="admin-form-label">Current Password *</label>
              <input
                className="admin-form-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-field" style={{ marginBottom: "1rem" }}>
              <label className="admin-form-label">New Password (min 6 chars) *</label>
              <input
                className="admin-form-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-field" style={{ marginBottom: "1.5rem" }}>
              <label className="admin-form-label">Confirm New Password *</label>
              <input
                className="admin-form-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="admin-action-btn" type="submit" disabled={savingPassword}>
              <KeyRound size={16} /> {savingPassword ? "Updating…" : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN MANAGEMENT TAB (Super Admin Only)
   ========================================================= */
function AdminManagementTab({
  currentAdmin,
  onNotify,
}: {
  currentAdmin: AdminUser | null;
  onNotify: (type: "success" | "error", msg: string) => void;
}) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Create admin modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newRole, setNewRole] = useState<AdminRole>("Content Admin");
  const [creating, setCreating] = useState(false);

  // Reset password modal state
  const [resetModalUser, setResetModalUser] = useState<AdminUser | null>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState("");
  const [resetting, setResetting] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    const data = await apiFetchAdmins();
    setAdmins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  async function handleCreateAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (!newUsername.trim() || newUsername.length < 3) {
      onNotify("error", "Username must be at least 3 characters.");
      return;
    }
    if (newPassword.length < 6) {
      onNotify("error", "Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== newConfirmPassword) {
      onNotify("error", "Passwords do not match.");
      return;
    }

    setCreating(true);
    const res = await apiCreateAdmin({
      username: newUsername.trim(),
      displayName: newDisplayName.trim() || newUsername.trim(),
      password: newPassword,
      role: newRole,
    });
    setCreating(false);

    if (res.success && res.admin) {
      setIsCreateOpen(false);
      setNewUsername("");
      setNewDisplayName("");
      setNewPassword("");
      setNewConfirmPassword("");
      onNotify("success", `Account "${res.admin.username}" created successfully!`);
      fetchList();
    } else {
      onNotify("error", res.error || "Failed to create administrator account.");
    }
  }

  async function toggleStatus(admin: AdminUser) {
    if (admin.id === currentAdmin?.id && admin.role === "Super Admin") {
      onNotify("error", "You cannot deactivate your own Super Admin account.");
      return;
    }

    const newStatus = admin.status === "Active" ? "Inactive" : "Active";
    if (newStatus === "Inactive") {
      const ok = window.confirm(`Are you sure you want to deactivate ${admin.username}? They will lose dashboard access immediately.`);
      if (!ok) return;
    }

    const res = await apiUpdateAdmin(admin.id, { status: newStatus });
    if (res.success) {
      onNotify("success", `Account status changed to ${newStatus}.`);
      fetchList();
    } else {
      onNotify("error", res.error || "Failed to change status.");
    }
  }

  async function toggleRole(admin: AdminUser) {
    if (admin.id === currentAdmin?.id) {
      onNotify("error", "You cannot change your own role.");
      return;
    }
    const newRole = admin.role === "Super Admin" ? "Content Admin" : "Super Admin";
    const ok = window.confirm(`Change ${admin.username}'s role to ${newRole}?`);
    if (!ok) return;

    const res = await apiUpdateAdmin(admin.id, { role: newRole });
    if (res.success) {
      onNotify("success", `Role updated to ${newRole}.`);
      fetchList();
    } else {
      onNotify("error", res.error || "Failed to change role.");
    }
  }

  async function handleDeleteAdmin(admin: AdminUser) {
    if (admin.id === currentAdmin?.id) {
      onNotify("error", "You cannot delete your own account while logged in.");
      return;
    }
    const ok = window.confirm(`Are you sure you want to PERMANENTLY delete administrator "@${admin.username}" (${admin.displayName})? This cannot be undone.`);
    if (!ok) return;

    const res = await apiDeleteAdmin(admin.id);
    if (res.success) {
      onNotify("success", `Administrator "@${admin.username}" has been deleted.`);
      fetchList();
    } else {
      onNotify("error", res.error || "Failed to delete administrator account.");
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetModalUser) return;
    if (resetPasswordVal.length < 6) {
      onNotify("error", "New password must be at least 6 characters.");
      return;
    }

    setResetting(true);
    const res = await apiUpdateAdmin(resetModalUser.id, { newPassword: resetPasswordVal });
    setResetting(false);

    if (res.success) {
      setResetModalUser(null);
      setResetPasswordVal("");
      onNotify("success", `Password for ${resetModalUser.username} reset successfully.`);
    } else {
      onNotify("error", res.error || "Failed to reset password.");
    }
  }

  // Filtered list
  const filtered = admins.filter((a) => {
    const matchSearch =
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.displayName.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || a.role === roleFilter;
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Admin Management</h1>
          <p className="admin-page-sub">Manage school website administrators, permissions, and status.</p>
        </div>
        <button className="admin-action-btn" onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-toolbar__filters">
          <div className="admin-search-input">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by username or name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin-form-select"
            style={{ width: "auto" }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Content Admin">Content Admin</option>
          </select>
          <select
            className="admin-form-select"
            style={{ width: "auto" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--clr-neutral-500)" }}>
            Loading administrators…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
            <Users size={36} color="var(--clr-neutral-400)" style={{ margin: "0 auto 1rem" }} />
            <p style={{ fontWeight: 600, color: "var(--clr-neutral-700)" }}>No matching administrator accounts found.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((adm) => (
                <tr key={adm.id}>
                  <td data-label="Administrator">
                    <div>
                      <strong style={{ display: "block" }}>{adm.displayName}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--clr-neutral-500)" }}>@{adm.username}</span>
                    </div>
                  </td>
                  <td data-label="Role">
                    <span className={`badge-role ${adm.role === "Super Admin" ? "badge-role--super" : "badge-role--content"}`}>
                      {adm.role}
                    </span>
                  </td>
                  <td data-label="Status">
                    <span className={`badge-status ${adm.status === "Active" ? "badge-status--active" : "badge-status--inactive"}`}>
                      {adm.status === "Active" ? <UserCheck size={12} /> : <UserX size={12} />}
                      {adm.status}
                    </span>
                  </td>
                  <td data-label="Created">
                    {new Date(adm.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Last Login">
                    {adm.lastLogin ? new Date(adm.lastLogin).toLocaleDateString() : "Never"}
                  </td>
                  <td data-label="Actions" style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        className="admin-icon-btn"
                        title="Reset Password"
                        onClick={() => {
                          setResetModalUser(adm);
                          setResetPasswordVal("");
                        }}
                      >
                        <KeyRound size={15} />
                      </button>
                      <button
                        className="admin-icon-btn"
                        title={adm.role === "Super Admin" ? "Demote to Content Admin" : "Promote to Super Admin"}
                        onClick={() => toggleRole(adm)}
                        disabled={adm.id === currentAdmin?.id}
                      >
                        <Shield size={15} />
                      </button>
                      <button
                        className={`admin-icon-btn ${adm.status === "Active" ? "admin-icon-btn--danger" : ""}`}
                        title={adm.status === "Active" ? "Deactivate Account" : "Activate Account"}
                        onClick={() => toggleStatus(adm)}
                        disabled={adm.id === currentAdmin?.id}
                      >
                        {adm.status === "Active" ? <UserX size={15} /> : <UserCheck size={15} />}
                      </button>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        title="Delete Administrator"
                        onClick={() => handleDeleteAdmin(adm)}
                        disabled={adm.id === currentAdmin?.id}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CREATE ADMIN MODAL */}
      {isCreateOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Create Administrator Account</h3>
              <button
                className="admin-icon-btn"
                style={{ color: "white" }}
                onClick={() => setIsCreateOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateAdmin}>
              <div className="admin-modal__body">
                <div className="admin-form-field">
                  <label className="admin-form-label">Username *</label>
                  <input
                    className="admin-form-input"
                    type="text"
                    placeholder="e.g. joshi_teacher"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Display Name *</label>
                  <input
                    className="admin-form-input"
                    type="text"
                    placeholder="e.g. Ramesh Joshi"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Role</label>
                  <select
                    className="admin-form-select"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as AdminRole)}
                  >
                    <option value="Content Admin">Content Admin (News &amp; Gallery)</option>
                    <option value="Super Admin">Super Admin (Full Access)</option>
                  </select>
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Password * (min 6 characters)</label>
                  <input
                    className="admin-form-input"
                    type="password"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Confirm Password *</label>
                  <input
                    className="admin-form-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="admin-modal__footer">
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--ghost"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn" disabled={creating}>
                  {creating ? "Creating…" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {resetModalUser && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Reset Password: {resetModalUser.username}</h3>
              <button
                className="admin-icon-btn"
                style={{ color: "white" }}
                onClick={() => setResetModalUser(null)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleResetPassword}>
              <div className="admin-modal__body">
                <p style={{ fontSize: "0.875rem", color: "var(--clr-neutral-600)" }}>
                  Enter a new password for <strong>{resetModalUser.displayName}</strong>.
                </p>
                <div className="admin-form-field">
                  <label className="admin-form-label">New Password (min 6 characters) *</label>
                  <input
                    className="admin-form-input"
                    type="password"
                    placeholder="Enter new password"
                    value={resetPasswordVal}
                    onChange={(e) => setResetPasswordVal(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="admin-modal__footer">
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--ghost"
                  onClick={() => setResetModalUser(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-action-btn" disabled={resetting}>
                  {resetting ? "Resetting…" : "Set New Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   AUDIT LOGS TAB
   ========================================================= */
function AuditLogsTab({
  onNotify,
}: {
  onNotify: (type: "success" | "error", msg: string) => void;
}) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    apiFetchAuditLogs().then((res) => {
      setLogs(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  async function handleClearLogs() {
    const ok = window.confirm("Are you sure you want to clear all audit logs? This action will archive and clear the historical log trail.");
    if (!ok) return;

    setClearing(true);
    const res = await apiClearAuditLogs();
    setClearing(false);

    if (res.success) {
      if (res.logs) setLogs(res.logs);
      onNotify("success", "Audit logs cleared successfully.");
    } else {
      onNotify("error", res.error || "Failed to clear audit logs.");
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Security &amp; Audit Logs</h1>
          <p className="admin-page-sub">Chronological history of sensitive administrative actions.</p>
        </div>
        <button
          className="admin-action-btn admin-action-btn--danger"
          onClick={handleClearLogs}
          disabled={clearing || logs.length === 0}
        >
          <Trash2 size={16} /> {clearing ? "Clearing…" : "Clear Audit Logs"}
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>Loading audit logs…</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>No audit log entries recorded yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Target</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((item) => (
                <tr key={item.id}>
                  <td data-label="Timestamp" style={{ fontSize: "0.8125rem", color: "var(--clr-neutral-500)" }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td data-label="Actor">
                    <strong>{item.actor}</strong>
                  </td>
                  <td data-label="Target">
                    <code>{item.target}</code>
                  </td>
                  <td data-label="Action">
                    <span style={{ fontWeight: 600, color: "var(--clr-green-800)" }}>{item.action}</span>
                  </td>
                  <td data-label="Details" style={{ fontSize: "0.8125rem" }}>
                    {item.details || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
                  setForm({
                    ...form,
                    category: e.target.value as NewsItem["category"],
                  })
                }
              >
                <option value="notice">Official Notice</option>
                <option value="event">School Event</option>
                <option value="press">Press Coverage</option>
                <option value="update">General Update</option>
              </select>
            </div>
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Image URL (Optional)</label>
              <input
                className="admin-form-input"
                type="url"
                placeholder="https://… or /assets/images/…"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-action-btn" onClick={handleSave} disabled={!form.titleEn.trim()}>
              <CheckCircle2 size={15} /> Save Item
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

      <div className="admin-news-list">
        {news.map((item) => (
          <div key={item.id} className="admin-news-item">
            <div className="admin-news-item__main">
              <div className="admin-news-item__meta">
                <span className="admin-badge admin-badge--cat">{item.category}</span>
                <span className="admin-news-item__date">{item.date}</span>
                <span className={`admin-badge ${item.published ? "admin-badge--pub" : "admin-badge--draft"}`}>
                  {item.published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="admin-news-item__title">{item.titleEn}</h3>
              {item.excerpt && <p className="admin-news-item__excerpt">{item.excerpt}</p>}
            </div>
            <div className="admin-news-item__actions">
              <button className="admin-icon-btn" title="Edit" onClick={() => startEdit(item)}>
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
                <span>Delete this notice?</span>
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
    </div>
  );
}

/* =========================================================
   SETTINGS TAB
   ========================================================= */
function SettingsTab() {
  const { settings, updateSettings, resetToDefaults, isLoading, lastSaved } = useSchoolSettings();

  const [formData, setFormData] = useState({
    nameEnglish: settings.name.english,
    nameMarathi: settings.name.marathi,
    nameHindi: settings.name.hindi,
    nameShort: settings.name.short,
    management: settings.management,
    addressLine1: settings.address.line1,
    addressArea: settings.address.area,
    addressCity: settings.address.city,
    addressState: settings.address.state,
    addressPincode: settings.address.pincode,
    fullAddress: settings.address.fullAddress,
    phone: settings.contact.phone,
    whatsapp: settings.contact.whatsapp,
    email: settings.contact.email,
    classesServed: settings.classesServed || "",
    medium: settings.medium,
    academicYear: settings.academicYear,
    facebook: settings.social.facebook || "",
    youtube: settings.social.youtube || "",
    instagram: settings.social.instagram || "",
    enquiryFormUrl: settings.enquiryFormUrl || "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      nameEnglish: settings.name.english,
      nameMarathi: settings.name.marathi,
      nameHindi: settings.name.hindi,
      nameShort: settings.name.short,
      management: settings.management,
      addressLine1: settings.address.line1,
      addressArea: settings.address.area,
      addressCity: settings.address.city,
      addressState: settings.address.state,
      addressPincode: settings.address.pincode,
      fullAddress: settings.address.fullAddress,
      phone: settings.contact.phone,
      whatsapp: settings.contact.whatsapp,
      email: settings.contact.email,
      classesServed: settings.classesServed || "",
      medium: settings.medium,
      academicYear: settings.academicYear,
      facebook: settings.social.facebook || "",
      youtube: settings.social.youtube || "",
      instagram: settings.social.instagram || "",
      enquiryFormUrl: settings.enquiryFormUrl || "",
    });
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateSettings({
      name: {
        english: formData.nameEnglish,
        marathi: formData.nameMarathi,
        hindi: formData.nameHindi,
        short: formData.nameShort,
      },
      management: formData.management,
      address: {
        line1: formData.addressLine1,
        area: formData.addressArea,
        city: formData.addressCity,
        state: formData.addressState,
        pincode: formData.addressPincode,
        fullAddress: formData.fullAddress,
      },
      contact: {
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
      },
      classesServed: formData.classesServed,
      medium: formData.medium,
      academicYear: formData.academicYear,
      social: {
        facebook: formData.facebook,
        youtube: formData.youtube,
        instagram: formData.instagram,
      },
      enquiryFormUrl: formData.enquiryFormUrl,
    });

    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all school settings to official defaults?")) {
      await resetToDefaults();
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header" style={{ marginBottom: "20px" }}>
        <div>
          <h1 className="admin-page-title">School Configuration &amp; Settings</h1>
          <p className="admin-page-sub">
            Update institutional identity, official contacts, social links, and enquiry forms in real-time.
          </p>
        </div>
        <button
          type="button"
          className="admin-action-btn admin-action-btn--ghost"
          onClick={handleReset}
          disabled={isLoading}
        >
          <RotateCcw size={16} /> Reset to Defaults
        </button>
      </div>

      {savedSuccess && (
        <div
          style={{
            background: "#e6faf0",
            border: "1px solid #a3e6be",
            color: "#1b693a",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CheckCircle2 size={18} />
          <strong>Settings successfully saved and synchronized across the website!</strong>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Building2 size={18} color="var(--clr-green-700)" /> School Name &amp; Governance
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Official Name (English) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameEnglish}
                onChange={(e) => setFormData({ ...formData, nameEnglish: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Short Display Name (Navbar) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameShort}
                onChange={(e) => setFormData({ ...formData, nameShort: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Official Name (Marathi) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameMarathi}
                onChange={(e) => setFormData({ ...formData, nameMarathi: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Official Name (Hindi) *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.nameHindi}
                onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
              />
            </div>
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Management / Governing Authority *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.management}
                onChange={(e) => setFormData({ ...formData, management: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Phone size={18} color="var(--clr-green-700)" /> Contact Information
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Official Phone Number *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">WhatsApp Helpline Number *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Official Email Address *</label>
              <input
                className="admin-form-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={18} color="var(--clr-green-700)" /> School Campus Address
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Street / Landmark</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Locality / Area</label>
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
              <label className="admin-form-label">Pincode</label>
              <input
                className="admin-form-input"
                type="text"
                value={formData.addressPincode}
                onChange={(e) => setFormData({ ...formData, addressPincode: e.target.value })}
              />
            </div>
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-form-label">Full Display Address *</label>
              <input
                className="admin-form-input"
                type="text"
                required
                value={formData.fullAddress}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-card" style={{ marginBottom: "24px" }}>
          <h3 className="admin-form-card__title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={18} color="var(--clr-green-700)" /> Academic Profiles
          </h3>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Classes / Grades Served</label>
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

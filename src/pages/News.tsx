import { useState, useMemo, useEffect } from "react";
import {
  Calendar, Search, X, Newspaper, ExternalLink,
  Sparkles, ChevronRight, FileText, CheckCircle2
} from "lucide-react";
import { useI18n } from "../i18n";
import { DEFAULT_NEWS, type NewsItem } from "../data/news";
import "./News.css";

export default function News() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS);

  // Fetch live notices from backend API or localStorage fallback
  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      // 1. Try backend API
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setNewsList(data);
            localStorage.setItem("spps_news", JSON.stringify(data));
            return;
          }
        }
      } catch (e) {
        // Fall back to localStorage
      }

      // 2. Fall back to localStorage
      try {
        const stored = localStorage.getItem("spps_news");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && isMounted) {
            setNewsList(parsed);
            return;
          }
        }
      } catch (e) {
        console.warn("Could not read news cache:", e);
      }
    };

    fetchNews();

    // Listen for live update events dispatched from admin tab or other components
    const handleNewsUpdate = () => {
      fetchNews();
    };
    window.addEventListener("spps_news_updated", handleNewsUpdate);
    window.addEventListener("storage", handleNewsUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("spps_news_updated", handleNewsUpdate);
      window.removeEventListener("storage", handleNewsUpdate);
    };
  }, []);

  const l = (en?: string, hi?: string, mr?: string) => {
    if (lang === "en") return en || mr || hi || "";
    if (lang === "hi") return hi || mr || en || "";
    return mr || hi || en || "";
  };

  const categories = [
    { id: "all", label: l("All Notices & Press", "सभी सूचनाएं व प्रेस", "सर्व सूचना व वृत्तपत्र कात्रणे") },
    { id: "press", label: l("Newspaper Clippings", "वृत्तपत्र कात्रण (प्रेस)", "वृत्तपत्र प्रसिद्धी (कात्रणे)") },
    { id: "notice", label: l("Official Circulars", "शासकीय परिपत्रके / सूचना", "शासकीय परिपत्रके व सूचना") },
    { id: "event", label: l("Events & Milestones", "आयोजन व उपक्रम", "शालेय कार्यक्रम व उपक्रम") },
  ];

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      if (!item.published) return false;
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const title = l(item.title, item.titleHi, item.titleMr).toLowerCase();
      const excerpt = l(item.excerpt, item.excerptHi, item.excerptMr).toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || title.includes(q) || excerpt.includes(q);
      return matchCategory && matchSearch;
    });
  }, [newsList, selectedCategory, searchQuery, lang]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="news-page">
      {/* Header */}
      <section className="page-header news-header">
        <div className="container">
          <div className="news-header__badge">
            <Sparkles size={14} />
            <span>
              {lang === "en"
                ? "Official School Board & Press Archive"
                : lang === "hi"
                ? "आधिकारिक सूचना पट्ट एवं प्रेस अभिलेखागार"
                : "शासकीय सूचना फलक व वृत्तपत्र प्रसिद्धी"}
            </span>
          </div>
          <h1 className="page-header__title">{t.news.title}</h1>
          <p className="page-header__sub">{t.news.subtitle}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section news-section">
        <div className="container">
          {/* Controls: Search and Categories */}
          <div className="news-controls">
            <div className="news-search-box">
              <Search size={18} className="news-search-icon" />
              <input
                type="text"
                placeholder={t.news.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="news-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="news-clear-search"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-bar" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* REALISTIC RED SCHOOL NOTICE BOARD */}
          <div className="notice-board-container">
            <div className="notice-board-frame">
              {/* Wooden Frame Corners / Brass Brackets */}
              <div className="frame-corner top-left" />
              <div className="frame-corner top-right" />
              <div className="frame-corner bottom-left" />
              <div className="frame-corner bottom-right" />

              {/* Board Header Plate */}
              <div className="notice-board-header-plate">
                <div className="plate-screw left" />
                <span className="plate-text">
                  {lang === "en"
                    ? "NOTICE BOARD • सूचना फलक"
                    : lang === "hi"
                    ? "सूचना पट्ट • दैनिक समाचार"
                    : "शासकीय सूचना फलक • वृत्तपत्र प्रसिद्धी"}
                </span>
                <div className="plate-screw right" />
              </div>

              {/* Maroon/Deep-Red Felt Surface */}
              <div className="notice-board-felt">
                {filteredNews.length === 0 ? (
                  <div className="empty-board">
                    <Newspaper size={48} className="empty-board__icon" />
                    <h3 className="empty-board__title">
                      {lang === "en"
                        ? "No notices matching your criteria."
                        : lang === "hi"
                        ? "इस श्रेणी में कोई सूचना उपलब्ध नहीं है।"
                        : "या श्रेणीत कोणतीही सूचना उपलब्ध नाही."}
                    </h3>
                    <p>
                      {lang === "en"
                        ? "Try clearing filters or checking other categories."
                        : "कृपया अन्य वर्ग निवडा किंवा शोध शब्द बदला."}
                    </p>
                  </div>
                ) : (
                  <div className="notice-grid">
                    {filteredNews.map((item, index) => {
                      const itemTitle = l(item.title, item.titleHi, item.titleMr);
                      const itemExcerpt = l(item.excerpt, item.excerptHi, item.excerptMr);
                      const isPress = item.category === "press";
                      const rotationStyle = (item as any).paperRotation || (index % 2 === 0 ? "-0.8deg" : "1deg");
                      const pinColor = (item as any).pinColor || (isPress ? "gold" : "red");

                      return (
                        <article
                          key={item.id}
                          className={`board-pin-item ${isPress ? "board-pin-item--press" : "board-pin-item--circular"}`}
                          style={{ "--rotate-deg": rotationStyle } as React.CSSProperties}
                          onClick={() => setActiveModalItem(item)}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveModalItem(item);
                            }
                          }}
                        >
                          {/* Pushpin at top */}
                          <div className={`pushpin pushpin--${pinColor}`}>
                            <div className="pushpin-head" />
                            <div className="pushpin-shadow" />
                          </div>

                          {/* Newspaper Clipping view */}
                          {isPress && item.image ? (
                            <div className="clipping-card">
                              <div className="clipping-header">
                                <span className="clipping-source">
                                  {(item as any).source || (lang === "en" ? "Newspaper Clipping" : "वृत्तपत्र प्रसिद्धी")}
                                </span>
                                <span className="clipping-date">{item.date}</span>
                              </div>
                              <div className="clipping-preview-wrapper">
                                <img
                                  src={item.image}
                                  alt={itemTitle}
                                  className="clipping-thumb-contain"
                                  loading="lazy"
                                />
                                <div className="clipping-hover-overlay">
                                  <span>{lang === "en" ? "Click to view article" : "वाचण्यासाठी क्लिक करा"}</span>
                                </div>
                              </div>
                              <div className="clipping-footer">
                                <h3 className="clipping-headline">{itemTitle}</h3>
                                <p className="clipping-caption">{itemExcerpt}</p>
                              </div>
                            </div>
                          ) : (
                            /* Official Paper Circular View */
                            <div className="circular-card">
                              <div className="circular-topbar">
                                <span className="circular-badge">
                                  <FileText size={12} />
                                  {item.category.toUpperCase()}
                                </span>
                                <span className="circular-date">
                                  <Calendar size={12} />
                                  {item.date}
                                </span>
                              </div>
                              {item.image && (
                                <div className="circular-image-preview">
                                  <img
                                    src={item.image}
                                    alt={itemTitle}
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <h3 className="circular-title">{itemTitle}</h3>
                              <p className="circular-body">{itemExcerpt}</p>
                              <div className="circular-meta">
                                <span className="circular-dept">
                                  {(item as any).source || (lang === "en" ? "Principal's Office" : "मुख्याध्यापक कार्यालय")}
                                </span>
                                <span className="circular-readmore">
                                  {t.common.readMore} <ChevronRight size={14} />
                                </span>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL POPUP */}
      {activeModalItem && (
        <div
          className="news-modal-overlay"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="news-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="news-modal__close"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close details"
            >
              <X size={22} />
            </button>

            {/* If press item, show large object-contain zoomable view */}
            {activeModalItem.image && (
              <div className="news-modal__image-wrap">
                <img
                  src={activeModalItem.image}
                  alt={l(activeModalItem.title, activeModalItem.titleHi, activeModalItem.titleMr)}
                  className="news-modal__image"
                />
                <a
                  href={activeModalItem.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-open-image-btn"
                >
                  <ExternalLink size={14} />
                  {lang === "en" ? "Open Full Resolution Image" : "पूर्ण आकाराचे छायाचित्र पहा"}
                </a>
              </div>
            )}

            <div className="news-modal__body">
              <div className="news-modal__meta">
                <span className="badge badge-green">
                  {activeModalItem.category.toUpperCase()}
                </span>
                {(activeModalItem as any).source && (
                  <span className="modal-source-pill">
                    {(activeModalItem as any).source}
                  </span>
                )}
                <span className="modal-date-text">
                  <Calendar size={14} />
                  {activeModalItem.date}
                </span>
              </div>

              <h2 className="news-modal__title">
                {l(activeModalItem.title, activeModalItem.titleHi, activeModalItem.titleMr)}
              </h2>

              <div className="news-modal__content">
                <p className="news-modal__lead">
                  {l(activeModalItem.excerpt, activeModalItem.excerptHi, activeModalItem.excerptMr)}
                </p>
                {activeModalItem.content && (
                  <div className="news-modal__fulltext">
                    {l(
                      activeModalItem.content,
                      activeModalItem.contentHi || activeModalItem.content,
                      activeModalItem.contentMr || activeModalItem.content
                    )}
                  </div>
                )}
              </div>

              <div className="news-modal__footer">
                <button
                  type="button"
                  className="btn btn-primary btn--sm"
                  onClick={() => setActiveModalItem(null)}
                >
                  <CheckCircle2 size={16} />
                  {lang === "en" ? "Close" : "बंद करा"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

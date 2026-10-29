import { useState, useEffect, useMemo, useCallback } from "react";
import {
  X, ChevronLeft, ChevronRight, Image as ImageIcon,
  Eye,
} from "lucide-react";
import { useI18n } from "../i18n";
import { staticGalleryItems, type GalleryItem, type GalleryCategory } from "../data/gallery";
import "./Gallery.css";

export default function Gallery() {
  const { lang, t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [adminGalleryItems, setAdminGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem("spps_gallery");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Fetch live gallery items from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setAdminGalleryItems(data);
            localStorage.setItem("spps_gallery", JSON.stringify(data));
            return;
          }
        }
      } catch (e) {
        // Fall back to localStorage
      }
    };

    fetchGallery();

    const handleGalleryUpdate = () => {
      fetchGallery();
      try {
        const stored = localStorage.getItem("spps_gallery");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && isMounted) {
            setAdminGalleryItems(parsed);
          }
        }
      } catch {}
    };

    window.addEventListener("spps_gallery_updated", handleGalleryUpdate);
    window.addEventListener("storage", handleGalleryUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("spps_gallery_updated", handleGalleryUpdate);
      window.removeEventListener("storage", handleGalleryUpdate);
    };
  }, []);

  // Combine static presentation items with any admin additions
  const allItems = useMemo(() => {
    return [...staticGalleryItems, ...adminGalleryItems].filter((i) => i.published);
  }, [adminGalleryItems]);

  const l = (en?: string, hi?: string, mr?: string) => {
    if (lang === "en") return en || mr || hi || "";
    if (lang === "hi") return hi || mr || en || "";
    return mr || hi || en || "";
  };

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: "all", label: t.gallery.categories.all },
    { id: "academics", label: t.gallery.categories.academics },
    { id: "events", label: t.gallery.categories.events },
    { id: "digital", label: t.gallery.categories.digital },
    { id: "environment", label: t.gallery.categories.environment },
    { id: "sports", label: t.gallery.categories.sports },
    { id: "cultural", label: t.gallery.categories.cultural },
    { id: "trips", label: t.gallery.categories.trips },
    { id: "newspaper", label: t.gallery.categories.newspaper },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <div className="gallery-page">
      {/* Header */}
      <section className="page-header">
        <h1 className="page-header__title">{t.gallery.title}</h1>
        <p className="page-header__sub">{t.gallery.subtitle}</p>
      </section>

      {/* Main Content */}
      <section className="section gallery-section">
        <div className="container">
          {/* Category Filter Bar */}
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photo Count */}
          <div className="gallery-count-bar">
            <span>
              {lang === "en"
                ? `Showing ${filteredItems.length} photographs`
                : lang === "hi"
                ? `${filteredItems.length} चित्र प्रदर्शित`
                : `${filteredItems.length} छायाचित्रे उपलब्ध`}
            </span>
          </div>

          {/* Gallery Masonry Grid */}
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <ImageIcon className="empty-state__icon" size={48} />
              <h3 className="empty-state__title">{t.gallery.noImages}</h3>
              <p>{t.common.noContent}</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredItems.map((item, index) => {
                const itemCaption = l(item.caption, item.captionHi, item.captionMr);
                return (
                  <div
                    key={item.id}
                    className="gallery-item-card"
                    onClick={() => openLightbox(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${itemCaption}`}
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                  >
                    <div className="gallery-item-card__img-wrap">
                      <img src={item.src} alt={itemCaption} loading="lazy" />
                      <div className="gallery-item-card__overlay">
                        <span className="gallery-item-card__caption">{itemCaption}</span>
                        <div className="gallery-item-card__badge">
                          <Eye size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label={t.gallery.lightboxClose}
          >
            <X size={24} />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label={t.gallery.lightboxPrev}
              >
                <ChevronLeft size={30} />
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label={t.gallery.lightboxNext}
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].src}
              alt={l(
                filteredItems[lightboxIndex].caption,
                filteredItems[lightboxIndex].captionHi,
                filteredItems[lightboxIndex].captionMr
              )}
              className="lightbox__img"
            />
            <div className="lightbox__caption">
              <span>
                {l(
                  filteredItems[lightboxIndex].caption,
                  filteredItems[lightboxIndex].captionHi,
                  filteredItems[lightboxIndex].captionMr
                )}
              </span>
              <span className="lightbox__counter">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

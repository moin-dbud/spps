import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n";
import { SITE_ORIGIN, DEFAULT_OG_IMAGE } from "../utils/seo";
import { SCHOOL_CONFIG } from "../config/school";

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

function updateMetaTag(attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
  noindex = false,
}: SEOProps) {
  const { lang } = useI18n();
  const location = useLocation();

  const path = canonicalPath || location.pathname;
  const canonicalUrl = `${SITE_ORIGIN}${path === "/" ? "" : path}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Root HTML Language Attribute
    document.documentElement.lang = lang || "en";

    // 3. Primary Meta Tags
    updateMetaTag("name", "description", description);
    updateLinkTag("canonical", canonicalUrl);

    // 4. Search Engine Crawl Directives
    if (noindex) {
      updateMetaTag("name", "robots", "noindex, nofollow");
      updateMetaTag("name", "googlebot", "noindex, nofollow");
    } else {
      updateMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      updateMetaTag("name", "googlebot", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    }

    // 5. Open Graph Meta Tags
    const localeMap: Record<string, string> = {
      en: "en_IN",
      mr: "mr_IN",
      hi: "hi_IN",
    };
    const currentLocale = localeMap[lang] || "en_IN";

    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", canonicalUrl);
    updateMetaTag("property", "og:site_name", SCHOOL_CONFIG.name.short);
    updateMetaTag("property", "og:image", ogImage);
    updateMetaTag("property", "og:locale", currentLocale);

    // 6. Twitter / X Card Meta Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage);

    // 7. Local Geo Metadata (Chandrapur, Maharashtra)
    updateMetaTag("name", "geo.region", "IN-MH");
    updateMetaTag("name", "geo.placename", "Babupeth, Chandrapur");
    updateMetaTag("name", "geo.position", "19.951777;79.318433");
    updateMetaTag("name", "ICBM", "19.951777, 79.318433");

    // 8. Inject Dynamic JSON-LD Structured Data
    const scriptId = "page-structured-data";
    let scriptTag = document.getElementById(scriptId);

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, canonicalUrl, ogImage, ogType, schema, noindex, lang]);

  // React 19 Document Metadata Hoisting (for SSR / initial hydration)
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}


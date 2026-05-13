import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

/**
 * MetaComponent
 *
 * Props:
 *   meta: {
 *     title?:       string  // page <title>
 *     description?: string  // <meta name="description">
 *     canonical?:   string  // <link rel="canonical" href="...">
 *     ogImage?:     string  // <meta property="og:image"> + <meta property="twitter:image">
 *   }
 *
 * Notes:
 *   - title / description are managed declaratively via react-helmet-async.
 *   - canonical / ogImage / twitter:image are managed imperatively in a useEffect:
 *     the tag is created if missing, otherwise its existing href/content is updated.
 *   - Tags are intentionally NOT removed on unmount — the next route's MetaComponent
 *     will overwrite them, which avoids a flash of missing tags between route changes.
 *   - Each field is only touched when its corresponding prop is provided, so a page
 *     that omits e.g. ogImage will leave whatever value index.html (or a previous
 *     route) set in place.
 */
export default function MetaComponent({ meta }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Canonical link
    if (meta?.canonical) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute("href", meta.canonical);
      } else {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        canonicalEl.setAttribute("href", meta.canonical);
        document.head.appendChild(canonicalEl);
      }
    }

    // Open Graph image + Twitter image (kept in sync)
    if (meta?.ogImage) {
      const ensureMeta = (selector, attrName, attrValue) => {
        let el = document.querySelector(selector);
        if (el) {
          el.setAttribute("content", meta.ogImage);
        } else {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrValue);
          el.setAttribute("content", meta.ogImage);
          document.head.appendChild(el);
        }
      };

      ensureMeta('meta[property="og:image"]', "property", "og:image");
      ensureMeta('meta[property="twitter:image"]', "property", "twitter:image");
    }

    // No cleanup: tags persist between routes and are overwritten by the next page.
  }, [meta?.canonical, meta?.ogImage]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
      </Helmet>
    </HelmetProvider>
  );
}

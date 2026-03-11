import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  OWNER_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL
} from "../config";

const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: COMPANY_NAME,
  url: SITE_URL,
  founder: OWNER_NAME,
  email: SUPPORT_EMAIL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      availableLanguage: ["English"]
    }
  ]
});

export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/prompts?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: absoluteUrl(item.to)
  }))
});

export const buildItemListSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(item.url),
    name: item.title
  }))
});

export const buildWebPageSchema = ({
  title,
  description,
  path = "/",
  type = "WebPage"
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name: title,
  description,
  url: absoluteUrl(path),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL
  },
  inLanguage: "en"
});

export const buildArticleSchema = ({
  title,
  description,
  path = "/",
  image,
  datePublished,
  dateModified,
  keywords = []
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  mainEntityOfPage: absoluteUrl(path),
  ...(image ? { image: [absoluteUrl(image)] } : {}),
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified || datePublished ? { dateModified: dateModified || datePublished } : {}),
  ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
  author: {
    "@type": "Person",
    name: OWNER_NAME
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL
  },
  inLanguage: "en"
});

export const buildFaqSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
});

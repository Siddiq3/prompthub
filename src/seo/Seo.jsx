import { Helmet } from "react-helmet-async";
import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  FALLBACK_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL
} from "../config";
import { getDefaultOgImage } from "../lib/content";
import { buildOrganizationSchema } from "./schema";

const toAbsoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

function Seo({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  noindex = false,
  schema = []
}) {
  const appContext = useContext(AppContext);
  const dynamicDefaultImage = useMemo(
    () => getDefaultOgImage(appContext?.prompts || [], FALLBACK_OG_IMAGE),
    [appContext?.prompts]
  );
  const canonical = toAbsoluteUrl(path);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const resolvedImage = toAbsoluteUrl(image || dynamicDefaultImage);
  const imageAlt = title || SITE_NAME;
  const schemas = [buildOrganizationSchema(), ...schema];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,follow" : "index,follow"} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;

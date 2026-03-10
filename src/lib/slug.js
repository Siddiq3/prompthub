export const slugify = (value = "") =>
  String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

export const titleFromSlug = (value = "") =>
  String(value)
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export const encodePathSegment = (value = "") => encodeURIComponent(String(value).trim());

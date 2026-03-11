import { slugify, titleFromSlug } from "./slug.js";

export const PRIMARY_CATEGORY_ORDER = [
  "Portrait",
  "Kids",
  "Fashion",
  "Wedding",
  "Sports",
  "Cinematic",
  "Beauty",
  "Street"
];

const CATEGORY_TAG_SLUGS = new Set(PRIMARY_CATEGORY_ORDER.map((name) => slugify(name)));

const SUBJECT_TAG_SLUGS = new Set(["women", "men", "girls", "boys", "kids"]);
const KIDS_SUBJECT_TAG_SLUGS = new Set(["boys", "girls", "kids"]);

const KIDS_SUBJECT_TAGS = new Set([
  "boys",
  "cousins",
  "family",
  "girls",
  "kids",
  "newborn",
  "siblings"
]);

const NON_DISCOVERY_TAG_SLUGS = new Set([
  "boys",
  "cousins",
  "eid-mubarak-prompt",
  "family",
  "girls",
  "kids",
  "men",
  "newborn",
  "ramadan-festival-prompt",
  "ramazan-festival-prompt",
  "siblings",
  "women"
]);

const CATEGORY_COPY = {
  Beauty: {
    description:
      "Beauty prompts center on close-up makeup, skin detail, premium styling, and polished cosmetic photography ideas.",
    intro:
      "Beauty is the right category when the face, makeup, and close framing matter more than the wider environment or wardrobe."
  },
  Cinematic: {
    description:
      "Cinematic prompts focus on mood, narrative framing, dramatic lighting, and film-inspired visual storytelling.",
    intro:
      "Use cinematic prompts when atmosphere and story lead the image, even if the scene also includes portrait or fashion cues."
  },
  Fashion: {
    description:
      "Fashion prompts help creators explore editorial styling, wardrobe direction, campaign visuals, and modern lookbook aesthetics.",
    intro:
      "Fashion is the primary category for prompts led by clothing, styling, pose direction, and campaign presentation."
  },
  Kids: {
    description:
      "Kids photo prompts help generate joyful and playful AI images of children in natural, festive, family, or studio settings.",
    intro:
      "Kids prompts are grouped around children as the main subject so child-focused scenes do not get buried inside broader fashion or family browsing paths."
  },
  Portrait: {
    description:
      "Portrait prompts help you generate realistic headshots, expressive close-ups, and subject-led portraits with clearer visual focus.",
    intro:
      "Portrait prompts are used when a person is the main focus and the goal is expression, framing, and lighting rather than event coverage."
  },
  Sports: {
    description:
      "Sports prompts bring motion, intensity, action, and peak-moment storytelling into AI photo generation workflows.",
    intro:
      "Sports prompts are best for dynamic athlete-led images where movement and performance are more important than styling alone."
  },
  Street: {
    description:
      "Street prompts emphasize urban atmosphere, documentary-style scenes, candid framing, and location-driven visual character.",
    intro:
      "Street prompts work best when the environment and urban mood are a major part of the image, not just the styling."
  },
  Wedding: {
    description:
      "Wedding prompts collect romantic couple portraits, ceremony details, candid celebrations, and bridal storytelling setups.",
    intro:
      "Wedding prompts belong here when the ceremony, couple moment, or celebration context is the main reason to browse the image idea."
  }
};

const getCategoryFallback = (name) => ({
  description: `${name} AI photo prompts and creative image generation ideas.`,
  intro: `Browse ${name.toLowerCase()} prompts when ${name.toLowerCase()} is the primary subject or theme, then use tags as secondary refinements.`
});

const dedupeBySlug = (items = []) => {
  const seen = new Set();

  return items.filter((item) => {
    const slug = slugify(item);

    if (!slug || seen.has(slug)) {
      return false;
    }

    seen.add(slug);
    return true;
  });
};

export const formatTagLabel = (value = "") => titleFromSlug(slugify(value)) || String(value || "").trim();

export const getCategoryMeta = (value = "") => {
  const normalized = PRIMARY_CATEGORY_ORDER.find((name) => slugify(name) === slugify(value)) || value || "General";
  const copy = CATEGORY_COPY[normalized] || getCategoryFallback(normalized);

  return {
    name: normalized,
    slug: slugify(normalized),
    description: copy.description,
    intro: copy.intro
  };
};

export const derivePrimaryCategory = ({ category, tags = [] }) => {
  const normalizedTags = dedupeBySlug(tags).map((tag) => slugify(tag));
  const normalizedCategory = getCategoryMeta(category).name;

  if (normalizedCategory !== "Kids" && normalizedTags.some((tag) => KIDS_SUBJECT_TAGS.has(tag))) {
    return "Kids";
  }

  return normalizedCategory;
};

export const getDiscoveryTags = (tags = []) =>
  dedupeBySlug(tags).filter((tag) => {
    const slug = slugify(tag);
    return slug && !CATEGORY_TAG_SLUGS.has(slug);
  });

export const getSubjectTags = (tags = [], category = "") => {
  const normalizedCategory = getCategoryMeta(category).name;
  const allowedTags = normalizedCategory === "Kids" ? KIDS_SUBJECT_TAG_SLUGS : SUBJECT_TAG_SLUGS;

  return dedupeBySlug(tags).filter((tag) => allowedTags.has(slugify(tag)));
};

export const getStyleTags = (tags = []) =>
  getDiscoveryTags(tags).filter((tag) => !NON_DISCOVERY_TAG_SLUGS.has(slugify(tag)));

export const sortCategoriesByPriority = (items = []) =>
  [...items].sort((left, right) => {
    const leftIndex = PRIMARY_CATEGORY_ORDER.findIndex((name) => name === left.name);
    const rightIndex = PRIMARY_CATEGORY_ORDER.findIndex((name) => name === right.name);

    if (leftIndex !== -1 || rightIndex !== -1) {
      if (leftIndex === -1) return 1;
      if (rightIndex === -1) return -1;
      if (leftIndex !== rightIndex) return leftIndex - rightIndex;
    }

    return left.name.localeCompare(right.name);
  });

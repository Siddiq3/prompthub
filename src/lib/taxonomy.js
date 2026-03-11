import { slugify, titleFromSlug } from "./slug.js";

export const PRIMARY_CATEGORY_ORDER = [
  "Portrait",
  "Kids",
  "Fashion",
  "Ramadan & Eid",
  "Wedding",
  "Sports",
  "Cinematic",
  "Beauty",
  "Street"
];

const CATEGORY_TAG_SLUGS = new Set(PRIMARY_CATEGORY_ORDER.map((name) => slugify(name)));

const SUBJECT_TAG_SLUGS = new Set(["women", "men", "girls", "boys", "kids"]);
const KIDS_SUBJECT_TAG_SLUGS = new Set(["boys", "girls", "kids"]);

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
      "Beauty prompts focus on close framing, makeup detail, polished styling, and the kind of portrait work where face and finish matter most.",
    intro:
      "Choose Beauty when the image is really about makeup, skin detail, and a polished close-up rather than the wider setting or wardrobe."
  },
  Cinematic: {
    description:
      "Cinematic prompts lean into mood, story, dramatic light, and frames that feel closer to a film still than a simple portrait.",
    intro:
      "Use Cinematic when atmosphere carries the image and the scene needs a sense of story, even if it also borrows from portrait or fashion styling."
  },
  Fashion: {
    description:
      "Fashion prompts bring together wardrobe, pose, styling, and editorial direction for lookbooks, campaigns, and polished portrait work.",
    intro:
      "Fashion is the right fit when clothing, styling, and presentation lead the image more than the location or event itself."
  },
  Kids: {
    description:
      "Kids prompts center on children in playful, festive, family, or studio scenes where their age and energy are the main focus of the image.",
    intro:
      "This category keeps child-focused prompts together so parents, photographers, and creators do not have to dig through broader fashion or family sections to find them."
  },
  "Ramadan & Eid": {
    description:
      "Ramadan and Eid prompts bring together festive portraits, family moments, modest fashion, prayer scenes, and celebration-focused photo ideas.",
    intro:
      "Choose this category when the season, celebration, or cultural setting is what defines the image, not just the clothing or portrait style."
  },
  Portrait: {
    description:
      "Portrait prompts are built around expression, framing, and a clear subject focus, from simple headshots to more expressive close-up work.",
    intro:
      "Portrait works best when the person is the main point of attention and the image depends more on expression and framing than on an event or setting."
  },
  Sports: {
    description:
      "Sports prompts capture movement, energy, and the feeling of a decisive moment, whether the scene is training, action, or celebration.",
    intro:
      "Use Sports when motion and performance are the real focus and the image needs to feel active rather than simply styled."
  },
  Street: {
    description:
      "Street prompts highlight city atmosphere, candid framing, and everyday scenes where the location has as much personality as the subject.",
    intro:
      "Street is the better choice when the environment shapes the image and the urban setting matters as much as the person or styling."
  },
  Wedding: {
    description:
      "Wedding prompts cover couple portraits, ceremony moments, bridal styling, and the small emotional details that make wedding images feel personal.",
    intro:
      "Choose Wedding when the ceremony, relationship, or celebration is what gives the image its purpose and emotional tone."
  }
};

const getCategoryFallback = (name) => ({
  description: `${name} prompts collected around a clear subject or visual theme.`,
  intro: `Browse ${name.toLowerCase()} prompts when that is the main subject or mood you want to start from, then use tags to refine the result.`
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
  return getCategoryMeta(category).name;
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

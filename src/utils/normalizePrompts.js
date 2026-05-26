import { normalizeImageUrl } from "./imageUrl.js";

const parseTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const pickString = (value, fallback = "") => {
  if (value === null || value === undefined) {
    return fallback;
  }
  return String(value).trim() || fallback;
};

const pickBoolean = (value, fallback = false) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (["true", "1", "yes"].includes(normalized)) {
      return true;
    }

    if (["false", "0", "no"].includes(normalized)) {
      return false;
    }
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  return fallback;
};

const parseBadges = (badges) => {
  if (!Array.isArray(badges)) return [];

  return badges
    .filter(Boolean)
    .map((badge) => {
      const label = String(badge).trim();
      const normalized = label.toLowerCase();
      let type = "popular";

      if (normalized.includes("trending")) type = "trending";
      else if (normalized.includes("new")) type = "new";
      else if (normalized.includes("featured")) type = "featured";
      else if (normalized.includes("premium")) type = "premium";
      else if (normalized.includes("creator")) type = "creator-pick";
      else if (normalized.includes("viral")) type = "viral";

      return {
        type,
        label,
      };
    })
    .filter(Boolean);
};

const parseFaqItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && (item.question || item.answer))
    .map((item) => ({
      question: pickString(item.question),
      answer: pickString(item.answer),
    }))
    .filter((item) => item.question || item.answer);
};

const pickImageValue = (raw = {}) => {
  const candidates = [
    raw?.previewImage,
    raw?.preview_image,
    raw?.image,
    raw?.imageUrl,
    raw?.imageURL,
    raw?.thumbnail,
    raw?.thumbnailUrl,
    raw?.coverImage,
    raw?.cover,
    raw?.photo,
    raw?.img,
  ];

  const found = candidates.find(
    (candidate) => candidate !== null && candidate !== undefined && String(candidate).trim()
  );

  return found || "";
};

const normalizeModel = (value) => {
  const rawModel = pickString(value).toLowerCase();

  if (rawModel.includes("gemini")) return "Gemini";
  if (rawModel.includes("chatgpt") || rawModel.includes("gpt")) return "ChatGPT";

  if (
    rawModel.includes("midjourney") ||
    rawModel.includes("dall") ||
    rawModel.includes("flux") ||
    rawModel.includes("stable") ||
    rawModel.includes("adobe") ||
    rawModel.includes("firefly")
  ) {
    return "ChatGPT";
  }

  return pickString(value, "ChatGPT");
};

const normalizePrompt = (raw, index) => {
  const id = pickString(raw?.id, `prompt-${index + 1}`);
  const title = pickString(raw?.title, "Untitled Prompt");
  const normalizedModel = normalizeModel(raw?.model);
  const normalizedModelLabel = normalizeModel(raw?.modelLabel || raw?.model);

  return {
    id,
    title,
    sourceIndex: index,
    prompt: pickString(raw?.prompt),
    negativePrompt: pickString(raw?.negativePrompt),
    tags: parseTags(raw?.tags),
    displayTags: parseTags(raw?.displayTags) || parseTags(raw?.tags),
    category: pickString(raw?.category, "General"),
    occasion: pickString(raw?.occasion),
    audience: pickString(raw?.audience),
    model: normalizedModel,
    modelLabel: normalizedModelLabel,
    aspectRatio: pickString(raw?.aspectRatio, "Flexible"),
    createdAt: pickString(raw?.createdAt, new Date().toISOString()),
    updatedAt: pickString(raw?.updatedAt, raw?.createdAt),
    previewImage: normalizeImageUrl(pickImageValue(raw)),
    badges: parseBadges(raw?.badges),
    seo: {
      metaTitle: pickString(raw?.seo?.metaTitle),
      metaDescription: pickString(raw?.seo?.metaDescription),
      keywords: parseTags(raw?.seo?.keywords),
    },
    seoIntro: pickString(raw?.seoIntro),
    intro: pickString(raw?.intro),
    about_paragraphs: Array.isArray(raw?.about_paragraphs)
      ? raw.about_paragraphs.map((paragraph) => pickString(paragraph)).filter(Boolean)
      : [],
    how_it_works: pickString(raw?.how_it_works),
    who_is_it_for: pickString(raw?.who_is_it_for),
    prompt_tips: Array.isArray(raw?.prompt_tips)
      ? raw.prompt_tips.map((tip) => pickString(tip)).filter(Boolean)
      : [],
    what_is_paragraph: pickString(raw?.what_is_paragraph),
    author: pickString(raw?.author),
    compatibleModels: parseTags(raw?.compatibleModels),
    howToSteps: Array.isArray(raw?.howToSteps)
      ? raw.howToSteps.map((step) => pickString(step)).filter(Boolean)
      : [],
    tips: Array.isArray(raw?.tips) ? raw.tips.map((tip) => pickString(tip)).filter(Boolean) : [],
    faq: parseFaqItems(raw?.faq),
    faqItems: parseFaqItems(raw?.faqItems),
    relatedSlugs: Array.isArray(raw?.relatedSlugs)
      ? raw.relatedSlugs.map((slug) => pickString(slug)).filter(Boolean)
      : [],
    wordCount: Number.isFinite(raw?.wordCount) ? raw.wordCount : 0,
    copies: Number.isFinite(raw?.copies) ? raw.copies : 0,
    isTrending: pickBoolean(raw?.isTrending, false),
  };
};

export const normalizePrompts = (payload) => {
  if (Array.isArray(payload)) {
    return payload.map(normalizePrompt);
  }

  if (payload && Array.isArray(payload.prompts)) {
    return payload.prompts.map(normalizePrompt);
  }

  return [];
};

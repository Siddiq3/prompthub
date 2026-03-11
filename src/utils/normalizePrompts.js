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
    raw?.img
  ];

  const found = candidates.find(
    (candidate) => candidate !== null && candidate !== undefined && String(candidate).trim()
  );

  return found || "";
};

const normalizePrompt = (raw, index) => {
  const id = pickString(raw?.id, `prompt-${index + 1}`);
  const title = pickString(raw?.title, "Untitled Prompt");

  return {
    id,
    title,
    sourceIndex: index,
    prompt: pickString(raw?.prompt),
    negativePrompt: pickString(raw?.negativePrompt),
    tags: parseTags(raw?.tags),
    category: pickString(raw?.category, "General"),
    model: pickString(raw?.model, "Any Model"),
    aspectRatio: pickString(raw?.aspectRatio, "Flexible"),
    createdAt: pickString(raw?.createdAt, new Date().toISOString()),
    featured: pickBoolean(raw?.featured, false),
    previewImage: normalizeImageUrl(pickImageValue(raw))
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

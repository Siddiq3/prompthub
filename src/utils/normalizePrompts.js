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

const normalizePrompt = (raw, index) => {
  const id = pickString(raw?.id, `prompt-${index + 1}`);
  const title = pickString(raw?.title, "Untitled Prompt");

  return {
    id,
    title,
    prompt: pickString(raw?.prompt),
    negativePrompt: pickString(raw?.negativePrompt),
    tags: parseTags(raw?.tags),
    category: pickString(raw?.category, "General"),
    model: pickString(raw?.model, "Any Model"),
    aspectRatio: pickString(raw?.aspectRatio, "Flexible"),
    createdAt: pickString(raw?.createdAt, new Date().toISOString()),
    previewImage: pickString(raw?.previewImage)
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

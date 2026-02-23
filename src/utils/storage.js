const hasWindow = () => typeof window !== "undefined";

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const getJson = (key, fallback) => {
  if (!hasWindow()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  return safeParse(raw, fallback);
};

export const setJson = (key, value) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getCopyCounts = () => {
  const value = getJson("copyCounts", {});
  return value && typeof value === "object" ? value : {};
};

export const incrementCopyCount = (id) => {
  const counts = getCopyCounts();
  const next = {
    ...counts,
    [id]: (counts[id] || 0) + 1
  };
  setJson("copyCounts", next);
  return next;
};

export const getSavedPrompts = () => {
  const value = getJson("savedPrompts", []);
  return Array.isArray(value) ? value : [];
};

export const toggleSavedPrompt = (id) => {
  const saved = getSavedPrompts();
  const exists = saved.includes(id);
  const next = exists ? saved.filter((savedId) => savedId !== id) : [...saved, id];
  setJson("savedPrompts", next);
  return next;
};

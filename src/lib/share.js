import { SITE_NAME, SITE_URL } from "../config";

const copyText = async (value) => {
  if (!value) return false;

  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }
};

export const getPromptShareUrl = (prompt) => new URL(prompt.url, SITE_URL).toString();

export const sharePromptLink = async (prompt, notify) => {
  const url = getPromptShareUrl(prompt);
  const payload = {
    title: `${prompt.title} | ${SITE_NAME}`,
    text: prompt.shortDescription || prompt.title,
    url
  };

  if (navigator.share) {
    try {
      await navigator.share(payload);
      notify?.("Prompt link shared");
      return true;
    } catch (error) {
      if (error?.name === "AbortError") {
        return false;
      }
    }
  }

  const copied = await copyText(url);

  if (copied) {
    notify?.("Prompt link copied");
    return true;
  }

  notify?.("Sharing failed. Please try again.", "error");
  return false;
};

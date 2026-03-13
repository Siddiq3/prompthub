export const GITHUB_BOOTSTRAP_URL =
  "https://raw.githubusercontent.com/Siddiq3/promtdata/main/latest.json";

export const GITHUB_VERSION_URL = GITHUB_BOOTSTRAP_URL;

export const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/Siddiq3/promtdata/main/promptdata.json";

export const DEFAULT_PREVIEW_BASE_URL =
  "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@main/previews/";

export const buildPromptDataUrl = (version = "") => {
  const url = new URL(GITHUB_RAW_URL);

  if (version) {
    url.searchParams.set("v", String(version));
  }

  return url.toString();
};

export const fetchPromptDataManifest = async () => {
  const response = await fetch(GITHUB_BOOTSTRAP_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load manifest: ${response.status}`);
  }

  return response.json();
};

export const resolvePromptDataUrl = async () => {
  try {
    const manifest = await fetchPromptDataManifest();
    return manifest?.dataset?.cdnUrl || GITHUB_RAW_URL;
  } catch {
    return GITHUB_RAW_URL;
  }
};

export const resolvePreviewBaseUrl = async () => {
  try {
    const manifest = await fetchPromptDataManifest();
    return manifest?.previews?.cdnBaseUrl || DEFAULT_PREVIEW_BASE_URL;
  } catch {
    return DEFAULT_PREVIEW_BASE_URL;
  }
};

export const SITE_NAME = "PhotoPromptsHub";
export const SITE_DOMAIN = "photopromptshub.in";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  "PhotoPromptsHub is a hand-organized library of AI photo prompts, example images, and practical ideas for creators using Midjourney, DALL·E, Flux, Stable Diffusion, and similar tools.";
export const SITE_TAGLINE = "Find AI photo prompts worth trying";
export const OWNER_NAME = "Siddiq Kolimi";
export const COMPANY_NAME = "PhotoPromptsHub (Independent Project)";
export const SUPPORT_EMAIL = "photopromptshub@gmail.com";
export const CONTACT_EMAIL = "photopromptshub@gmail.com";
export const COUNTRY = "India";
export const STATE = "Telangana";
export const FALLBACK_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

export const HOME_FAQS = [
  {
    question: "What is PhotoPromptsHub?",
    answer:
      "PhotoPromptsHub is a prompt library for people who want a clearer way to browse visual ideas. Instead of scrolling through a messy feed, you can open prompt pages, compare categories, and copy prompts that already have useful context around them."
  },
  {
    question: "Which AI image tools are covered?",
    answer:
      "The library currently includes prompts labeled for Midjourney, DALL·E, Flux, and Stable Diffusion. You can browse by model if you already know your tool, or start with categories if you are still exploring ideas."
  },
  {
    question: "How do I find the latest or trending AI photo prompts?",
    answer:
      "The homepage highlights both trending picks and the newest additions, and the `/latest` and `/trending` pages give you those lists directly. If you want something more specific, category pages and collections are the quickest next step."
  },
  {
    question: "Can I browse prompts by category, style, or model?",
    answer:
      "Yes. Categories help you start with the main subject, tags help you narrow the look, and model collections help when you want prompts grouped around a specific tool or creative angle."
  },
  {
    question: "Are the prompts free to browse and copy?",
    answer:
      "Yes. You can browse the library freely, open the detail pages, and copy prompt text directly from the site. Most people will still want to adjust the wording a little to match their subject, styling, or model settings."
  },
  {
    question: "Why does the site include contact, privacy, terms, and DMCA pages?",
    answer:
      "Those pages make the site easier to trust. They explain who runs PhotoPromptsHub, how to get in touch, and what to do if you have a privacy, policy, or content-removal question."
  }
];

export const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029VbCfYa9002TAlsIdh71m";

export const TELEGRAM_CHANNEL_URL =
  "https://t.me/photopromptshub";

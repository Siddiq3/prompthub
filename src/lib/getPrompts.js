const GITHUB_PROMPT_CONTENT_URL =
  "https://api.github.com/repos/Siddiq3/promtdata/contents/promptdata.json";
const GITHUB_BOOTSTRAP_API_URL =
  "https://api.github.com/repos/Siddiq3/promtdata/contents/latest.json";

const getGithubHeaders = () => {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "Missing required environment variable GITHUB_TOKEN. Add it in Vercel and do not expose it to the browser."
    );
  }

  if (token.startsWith("ggithub_pat_")) {
    throw new Error(
      "Invalid GITHUB_TOKEN: it looks like the token starts with 'ggithub_pat_'. Remove the extra leading 'g' so it starts with 'github_pat_'."
    );
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "PhotoPromptsHub",
  };
};

const decodeGithubResponse = async (response, url) => {
  const text = await response.text();

  if (!text) {
    throw new Error(`Empty response from GitHub for ${url}`);
  }

  try {
    return JSON.parse(text);
  } catch (rawError) {
    try {
      const metadata = JSON.parse(text);
      if (metadata && typeof metadata.content === "string") {
        const decoded = Buffer.from(metadata.content, "base64").toString("utf-8");
        return JSON.parse(decoded);
      }
    } catch (parseError) {
      throw new Error(
        `Could not parse GitHub response from ${url}: ${rawError.message} / ${parseError.message}`
      );
    }
  }
};

const fetchGithubFile = async (url, signal) => {
  const response = await fetch(url, {
    headers: getGithubHeaders(),
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return decodeGithubResponse(response, url);
};

export const buildPromptDataUrl = (version = "") => {
  const url = new URL(GITHUB_PROMPT_CONTENT_URL);

  if (version) {
    url.searchParams.set("ref", String(version));
  }

  return url.toString();
};

export const fetchPromptData = async (version = "", signal) => {
  const url = version ? buildPromptDataUrl(version) : GITHUB_PROMPT_CONTENT_URL;
  return fetchGithubFile(url, signal);
};

export const fetchPromptVersion = async (signal) => {
  const payload = await fetchGithubFile(GITHUB_BOOTSTRAP_API_URL, signal);

  if (!payload || typeof payload.version !== "string" || !payload.version.trim()) {
    throw new Error("Invalid latest.json format returned from GitHub.");
  }

  return payload.version.trim();
};

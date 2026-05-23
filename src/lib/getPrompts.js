const GITHUB_PROMPT_CONTENT_URL =
  "https://raw.githubusercontent.com/Siddiq3/promtdata/main/promptdata.json";

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
    Authorization: `token ${token}`,
    Accept: "application/json",
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
    throw new Error(`Could not parse GitHub response from ${url}: ${rawError.message}`);
  }
};

const fetchGithubFile = async (url, signal) => {
  const response = await fetch(url, {
    headers: getGithubHeaders(),
    signal,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return decodeGithubResponse(response, url);
};

export const fetchPromptData = async (signal) => {
  return fetchGithubFile(GITHUB_PROMPT_CONTENT_URL, signal);
};


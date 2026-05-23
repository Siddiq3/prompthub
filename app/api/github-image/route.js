const GITHUB_TOKEN = process.env.GITHUB_TOKEN?.trim();

const isAllowedPath = (path) => {
  if (!path) return false;
  if (path.includes("..")) return false;
  if (!/^previews\/[a-zA-Z0-9._\-/]+$/.test(path)) return false;
  return true;
};

const getGithubHeaders = () => {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing required environment variable GITHUB_TOKEN for GitHub image proxy.");
  }

  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "PhotoPromptsHub",
  };
};

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const ref = url.searchParams.get("ref") || "main";

    const decodedPath = decodeURIComponent(path);
    const decodedRef = decodeURIComponent(ref);

    if (!isAllowedPath(decodedPath)) {
      return new Response("Invalid image path.", { status: 400 });
    }

    if (!/^[a-zA-Z0-9._\-]+$/.test(decodedRef)) {
      return new Response("Invalid ref value.", { status: 400 });
    }

    const githubUrl = `https://raw.githubusercontent.com/Siddiq3/promtdata/${decodedRef}/${decodedPath}`;
    const response = await fetch(githubUrl, {
      headers: getGithubHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response(`GitHub image fetch failed with status ${response.status}`, {
        status: 502,
      });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("/api/github-image error:", error);
    return new Response("Image proxy error", { status: 500 });
  }
}

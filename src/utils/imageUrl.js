const toTrimmedString = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

const toHttpsUrl = (value) => {
  if (/^http:\/\//i.test(value)) {
    return `https://${value.slice(7)}`;
  }

  return value;
};

const stripQueryHash = (value) => {
  const [withoutQuery] = value.split("?");
  const [withoutHash] = withoutQuery.split("#");
  return withoutHash;
};

const toRawFromGithubBlob = (value) => {
  const clean = stripQueryHash(value);
  const match = clean.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i);

  if (!match) {
    return "";
  }

  const [, owner, repo, ref, path] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
};

const toRawFromJsDelivr = (value) => {
  const clean = stripQueryHash(value);
  const match = clean.match(/^https?:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)@([^/]+)\/(.+)$/i);

  if (!match) {
    return "";
  }

  const [, owner, repo, ref, path] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`;
};

const toJsDelivrFromRaw = (value) => {
  const clean = stripQueryHash(value);
  const match = clean.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);

  if (!match) {
    return "";
  }

  const [, owner, repo, ref, path] = match;
  return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${ref}/${path}`;
};

const toGoogleDriveDirect = (value) => {
  try {
    const url = new URL(value);
    if (!url.hostname.endsWith("drive.google.com")) {
      return "";
    }

    const fileMatch = url.pathname.match(/^\/file\/d\/([^/]+)/);
    const idFromQuery = url.searchParams.get("id");
    const id = fileMatch?.[1] || idFromQuery;

    if (!id) {
      return "";
    }

    return `https://drive.google.com/uc?export=view&id=${id}`;
  } catch {
    return "";
  }
};

export const normalizeImageUrl = (value) => {
  const trimmed = toTrimmedString(value);

  if (!trimmed) {
    return "";
  }

  const httpsUrl = toHttpsUrl(trimmed);

  return toGoogleDriveDirect(httpsUrl) || toRawFromGithubBlob(httpsUrl) || httpsUrl;
};

export const getImageCandidates = (value) => {
  const primary = normalizeImageUrl(value);

  if (!primary) {
    return [];
  }

  return [
    primary,
    toRawFromJsDelivr(primary),
    toJsDelivrFromRaw(primary),
    toRawFromGithubBlob(primary),
    toGoogleDriveDirect(primary)
  ]
    .map(toTrimmedString)
    .filter(Boolean)
    .filter((candidate, index, list) => list.indexOf(candidate) === index);
};

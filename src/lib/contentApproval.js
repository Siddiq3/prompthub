const APPROVED_STATUSES = new Set(["approved", "published", "reviewed", "human-approved"]);
const HUMAN_SOURCES = new Set(["human", "editor", "owner", "manual"]);

export const normalizeApprovalStatus = (value) => {
  const status = String(value || "").trim().toLowerCase();

  if (!status) return "";
  if (APPROVED_STATUSES.has(status)) return "approved";
  if (["reject", "rejected", "blocked"].includes(status)) return "rejected";
  if (["draft", "pending", "needs-review", "needs review", "review"].includes(status)) return "pending";

  return status;
};

export const normalizeContentSource = (value) => {
  const source = String(value || "").trim().toLowerCase();

  if (!source) return "";
  return HUMAN_SOURCES.has(source) ? "human" : source;
};

export const hasApprovalMetadata = (item = {}) =>
  Boolean(
    item.approvalStatus ||
      item.contentSource ||
      item.isHumanWritten === true ||
      item.isHumanWritten === false ||
      item.approved === true ||
      item.approved === false ||
      item.humanApproved === true ||
      item.humanApproved === false ||
      item.approvedBy ||
      item.approvedAt
  );

export const isHumanApprovedContent = (item = {}) => {
  if (!hasApprovalMetadata(item)) {
    return false;
  }

  const source = normalizeContentSource(item.contentSource);
  const status = normalizeApprovalStatus(item.approvalStatus);
  const isHuman =
    item.isHumanWritten === true ||
    item.humanApproved === true ||
    source === "human";
  const isApproved =
    status === "approved" ||
    item.approved === true ||
    item.humanApproved === true;

  return isHuman && isApproved;
};

export const getApprovalNotice = (item = {}) =>
  isHumanApprovedContent(item)
    ? "Human-written and editor-approved"
    : "Editorial notes hidden until human approval";

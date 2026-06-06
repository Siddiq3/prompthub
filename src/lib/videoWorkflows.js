import { normalizeImageUrl } from "../utils/imageUrl.js";
import { normalizeApprovalStatus, normalizeContentSource } from "./contentApproval.js";

const VIDEO_WORKFLOW_DATA = [
  {
    id: "v0001",
    type: "video-workflow",
    title: "IPL Stadium Crowd Cam AI Video Prompt - Realistic Sports Broadcast Workflow",
    description:
      "Create realistic IPL stadium crowd-cam AI videos with authentic live sports broadcast aesthetics. This workflow uses ChatGPT for generating realistic cricket stadium crowd visuals and Google Flow Veo for creating cinematic crowd footage with natural camera movement, stadium atmosphere, TV broadcast compression, and realistic audience reactions. Easily customize team names like CSK, RCB, MI, KKR, SRH, or DC for different IPL match styles.",
    workflowTitle: "ChatGPT to Google Flow IPL Sports Broadcast Workflow",
    category: "Sports Broadcast Video",
    tags: [
      "ipl",
      "cricket",
      "sports-broadcast",
      "crowd-cam",
      "stadium-video",
      "google-flow",
      "veo",
      "sports-video",
      "live-match",
      "tv-broadcast",
      "realistic-video",
      "ipl-reel",
      "viral-sports-video",
    ],
    toolsUsed: ["ChatGPT", "Google Flow", "Veo"],
    aspectRatio: "16:9",
    duration: "10-12 seconds",
    resolution: "1080p",
    createdAt: "2026-05-25T22:00:00Z",
    updatedAt: "2026-05-25T22:00:00Z",
    previewImage: "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@main/video-preview/v0001.webp",
    previewVideo: "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@main/video-clips/v0001.mp4",
    slug: "ipl-stadium-crowd-cam-ai-video-prompt-realistic",
    approvalStatus: "approved",
    contentSource: "human",
    isHumanWritten: true,
    approvedBy: "SiddiqKolimi",
    approvedAt: "2026-05-25T22:00:00Z",
    aliases: ["ipl-stadium-crowd-cam-ai-video-v0001"],
    badges: ["🔥 Viral", "🏏 IPL Style"],
    workflowSteps: [
      {
        step: 1,
        title: "Generate IPL Stadium Crowd Image",
        platform: "ChatGPT",
        model: "GPT Image",
        prompt:
          "Realistic sports broadcast screenshot-style video of the person from the reference image sitting in the crowd of a Indian IPL match CSK vs MI. Keep base score card Natural candid crowd-cam feeling, realistic stadium lighting, documentary broadcast style, blurred crowd background, telephoto sports camera look.",
        tips: [
          "Replace CSK vs MI with any IPL teams like RCB vs DC or KKR vs SRH",
          "Upload a clean selfie with visible face",
          "Generate multiple image versions before selecting the final stadium image",
        ],
      },
      {
        step: 2,
        title: "Generate Realistic IPL Crowd Cam Video",
        platform: "Google Flow",
        model: "Veo",
        prompt:
          "Use reference image as identity only. Preserve exact face, hair, skin texture, and proportions. No beautifying or stylizing. Realistic live sports broadcast footage, 10-12 seconds, 16:9, 1080p. Multi shot from diff angles Candid crowd-cam at a live stadium game with having a diet coke, Adjusting hairs, blinking shallow depth of field, handheld broadcast shake, autofocus breathing, realistic TV compression, natural crowd movement, authentic sports broadcast.",
        tips: [
          "Upload the image generated from Step 1",
          "Keep realistic rendering enabled",
          "Use cinematic camera motion settings if available",
          "Works best for cricket stadium crowd scenes",
        ],
      },
    ],
    seo: {
      metaTitle: "IPL Crowd Cam AI Video Prompt - Realistic Cricket Stadium Broadcast Workflow",
      metaDescription:
        "Generate realistic IPL stadium crowd-cam AI videos using ChatGPT and Google Flow Veo. Create authentic cricket match broadcast footage with natural crowd reactions, cinematic TV camera movement, and realistic live sports atmosphere for viral AI reels.",
      keywords: [
        "ipl ai video prompt",
        "rcb ai video prompt",
        "csk ai crowd cam prompt",
        "mi stadium ai video",
        "cricket ai video workflow",
        "sports broadcast ai prompt",
        "google flow veo prompt",
        "cricket stadium ai video",
        "crowd cam ai video",
        "live sports ai workflow",
        "realistic stadium crowd video",
        "viral cricket ai reel",
        "ipl reel prompt",
        "stadium audience ai video",
      ],
    },
    modelLabel: "ChatGPT + Google Flow",
    copies: 0,
    isTrending: true,
    displayTags: ["ipl", "sports-video", "crowd-cam"],
    seoIntro:
      "Generate realistic IPL crowd-cam AI videos with this professional ChatGPT and Google Flow workflow. Create authentic cricket stadium broadcast footage featuring natural audience reactions, handheld sports camera movement, realistic TV compression, and cinematic live match atmosphere. This workflow can be customized for any IPL teams including RCB, CSK, MI, KKR, SRH, RR, or DC.",
    author: "SiddiqKolimi",
    compatibleModels: ["ChatGPT", "Google Flow", "Veo"],
    howToSteps: [
      "Copy the ChatGPT stadium image prompt",
      "Replace the IPL team names if needed",
      "Upload your selfie or reference image",
      "Generate a realistic cricket stadium crowd image",
      "Copy the Google Flow video prompt",
      "Upload the generated image into Google Flow",
      "Render the final IPL crowd-cam broadcast video",
    ],
    tips: [
      "You can replace team names with any IPL teams",
      "Use high-quality selfie images for better face consistency",
      "Generate multiple image variations before video rendering",
      "Use realistic rendering settings instead of animated styles",
      "Works best with sports stadium and crowd scenes",
    ],
    faqItems: [
      {
        question: "Can I use different IPL teams in this workflow?",
        answer:
          "Yes, simply replace the team names inside the ChatGPT prompt with teams like RCB, MI, KKR, SRH, RR, or DC.",
      },
      {
        question: "Which AI tools are used in this workflow?",
        answer:
          "This workflow uses ChatGPT for stadium image generation and Google Flow Veo for realistic sports broadcast video rendering.",
      },
    ],
    relatedSlugs: ["v0002", "v0003"],
    wordCount: 322,
  },
];

const FALLBACK_BADGE_TYPES = ["trending", "featured", "viral", "new"];

const normalizeBadge = (badge, index = 0) => {
  if (!badge) return null;

  if (typeof badge === "object") {
    return {
      type: badge.type || FALLBACK_BADGE_TYPES[index % FALLBACK_BADGE_TYPES.length],
      label: badge.label || String(badge.type || "Featured"),
      icon: badge.icon,
    };
  }

  const value = String(badge).trim();
  const parts = value.split(/\s+/);
  const icon = parts.length > 1 ? parts[0] : undefined;
  const label = parts.length > 1 ? parts.slice(1).join(" ") : value;

  return {
    type: FALLBACK_BADGE_TYPES[index % FALLBACK_BADGE_TYPES.length],
    label,
    icon,
  };
};

const normalizeStep = (step, index = 0) => ({
  stepNumber: step.stepNumber || step.step || index + 1,
  title: step.title || `Step ${index + 1}`,
  platform: step.platform || "",
  model: step.model || "",
  prompt: step.prompt || "",
  tips: Array.isArray(step.tips) ? step.tips : [],
});

export const normalizeVideoWorkflow = (workflow, index = 0) => {
  const badges = Array.isArray(workflow.badges)
    ? workflow.badges.map(normalizeBadge).filter(Boolean)
    : [];
  const steps = Array.isArray(workflow.steps)
    ? workflow.steps.map(normalizeStep)
    : Array.isArray(workflow.workflowSteps)
      ? workflow.workflowSteps.map(normalizeStep)
      : [];
  const rawTags = Array.isArray(workflow.tags)
    ? workflow.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];
  const displayTags = Array.isArray(workflow.displayTags)
    ? workflow.displayTags.map((tag) => String(tag).trim()).filter(Boolean)
    : rawTags;
  const model = Array.isArray(workflow.toolsUsed) && workflow.toolsUsed.length > 0
    ? workflow.toolsUsed.find((tool) => /chatgpt|gemini/i.test(String(tool))) || workflow.toolsUsed[0]
    : "";

  return {
    ...workflow,
    type: "video-workflow",
    sourceIndex: Number.isFinite(workflow.sourceIndex) ? workflow.sourceIndex : index,
    model,
    prompt: workflow.description || workflow.seoIntro || "",
    negativePrompt: "",
    rawCategory: workflow.category || "",
    rawTags,
    displayTags,
    styleTags: displayTags,
    subjectTags: [],
    createdTimestamp: Number.isFinite(new Date(workflow.createdAt).getTime())
      ? new Date(workflow.createdAt).getTime()
      : 0,
    thumbnail: normalizeImageUrl(workflow.thumbnail || workflow.previewImage || ""),
    previewImage: normalizeImageUrl(workflow.previewImage || workflow.thumbnail || ""),
    previewVideo: normalizeImageUrl(workflow.previewVideo || ""),
    approvalStatus: normalizeApprovalStatus(workflow.approvalStatus),
    contentSource: normalizeContentSource(workflow.contentSource),
    isHumanWritten: workflow.isHumanWritten === true || normalizeContentSource(workflow.contentSource) === "human",
    badges,
    trendingBadges: workflow.isTrending ? badges : badges.slice(0, 2),
    steps,
    relatedWorkflowSlugs: workflow.relatedWorkflowSlugs || workflow.relatedSlugs || [],
  };
};

const sortByCreatedAtDesc = (items) =>
  [...items].sort((a, b) => {
    const timeDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (timeDiff !== 0) return timeDiff;
    return (b.sourceIndex || 0) - (a.sourceIndex || 0);
  });

export async function getVideoWorkflows() {
  return sortByCreatedAtDesc(VIDEO_WORKFLOW_DATA.map(normalizeVideoWorkflow));
}

export async function getVideoWorkflowBySlug(slug) {
  const workflows = await getVideoWorkflows();
  return workflows.find(
    (workflow) =>
      workflow.slug === slug ||
      workflow.id === slug ||
      (Array.isArray(workflow.aliases) && workflow.aliases.includes(slug))
  );
}

export async function getAllVideoWorkflowSlugs() {
  const workflows = await getVideoWorkflows();
  return workflows.map((workflow) => workflow.slug).filter(Boolean);
}

export async function getRelatedVideoWorkflows(currentWorkflow, limit = 3) {
  const workflows = await getVideoWorkflows();
  const relatedKeys = currentWorkflow.relatedWorkflowSlugs || [];
  const explicitRelated = relatedKeys
    .map((key) => workflows.find((workflow) => workflow.slug === key || workflow.id === key))
    .filter(Boolean);
  const fallbackRelated = workflows.filter((workflow) => workflow.slug !== currentWorkflow.slug);

  return sortByCreatedAtDesc([...explicitRelated, ...fallbackRelated]).slice(0, limit);
}

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaCopy, FaCheck, FaTwitter, FaPinterest, FaWhatsapp, FaLink } from "react-icons/fa";
import AdSlot from "@/src/components/AdSlot";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import SmartImage from "@/src/components/SmartImage";
import PromptCard from "@/src/components/PromptCard";
import { formatTagLabel } from "@/src/lib/taxonomy";
import { usePromptData } from "@/src/hooks/usePromptData";

export default function PromptDetailsPage({ params }) {
  const { slug } = params;
  const { prompt, relatedPrompts, loading } = usePromptData(slug);
  const [copied, setCopied] = useState(false);

  if (loading) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  if (!prompt) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Prompts", href: "/prompts" },
    { label: prompt.category, href: `/category/${encodeURIComponent(prompt.category.toLowerCase())}` },
    { label: prompt.title, href: `/prompt/${slug}` },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/prompt/${slug}` : "";
    const text = `Check out this ${prompt.modelLabel} prompt: ${prompt.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?description=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      copy: null
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank");
    }
  };

  // Extract parameters from prompt text for breakdown
  const getParameterBreakdown = () => {
    const params = [];
    const promptLower = (prompt.prompt || "").toLowerCase();
    
    // Common Midjourney/Stable Diffusion parameters
    const paramPatterns = [
      { pattern: /--ar\s+[\d:]+/i, label: "Aspect Ratio", description: "Controls the width-to-height ratio of the generated image" },
      { pattern: /--niji/i, label: "Niji Mode", description: "Anime/illustration style (Midjourney)" },
      { pattern: /--style\s+\w+/i, label: "Style", description: "Specific style preset or artistic direction" },
      { pattern: /--quality\s+\d/i, label: "Quality", description: "Detail level of the image (1=low, 2=normal)" },
      { pattern: /negative prompt:/i, label: "Negative Prompt", description: "Elements to exclude from the image" },
    ];

    paramPatterns.forEach(({ pattern, label, description }) => {
      if (pattern.test(promptLower)) {
        params.push({ label, description });
      }
    });

    return params;
  };

  const getToolInstructions = () => {
    const platform = prompt.modelLabel || "";
    
    const instructions = {
      "Midjourney": [
        "Open your Midjourney Discord server and navigate to the #general or #newbies channel",
        "Type /imagine in the chat and paste the prompt when prompted",
        "Wait 1-2 minutes for Midjourney to generate 4 variations",
        "Click U1, U2, U3, or U4 to upscale your favorite variation",
        "Use V1, V2, V3, V4 to create variations of your chosen image",
        "Experiment with parameters like --ar for different aspect ratios"
      ],
      "DALL-E": [
        "Go to chat.openai.com and select the DALL-E mode in GPT-4 or visit dall-e.openai.com",
        "Paste the prompt into the text field",
        "Click 'Generate' to create 4 variations",
        "Edit the prompt and regenerate for different results",
        "Use 'Open in editor' to modify specific areas of the image",
        "Download your favorite image once satisfied"
      ],
      "Flux": [
        "Visit flux.ai or use the Flux API through their platform",
        "Paste the prompt in the text input field",
        "Click 'Generate' to process the prompt",
        "Wait for the image to render (usually 10-30 seconds)",
        "Adjust parameters if needed and regenerate",
        "Download the final image in high resolution"
      ],
      "Stable Diffusion": [
        "Use a web interface like Hugging Face Spaces, Automatic1111, or Replicate",
        "Paste the prompt in the positive prompt field",
        "Add any negative prompt if provided",
        "Adjust settings: Steps (20-50), CFG Scale (7-15), Sampler type",
        "Click 'Generate' to create the image",
        "Download or save your result"
      ],
      "Adobe Firefly": [
        "Go to firefly.adobe.com or use it within Adobe Creative Cloud apps",
        "Paste the prompt in the text generation field",
        "Click 'Generate' to create 4 variations",
        "Select your favorite variation",
        "Use 'Generative Fill' or 'Generative Expand' for further editing",
        "Download the final image in your desired format"
      ]
    };

    return instructions[platform] || instructions["Midjourney"];
  };

  const parameters = getParameterBreakdown();
  const toolInstructions = getToolInstructions();

  return (
    <div className="w-full">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {/* Hero Section with Image */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
          <SmartImage
            src={prompt.previewImage}
            alt={prompt.title}
            priority={true}
            className="w-full h-full object-cover"
            imageClassName="w-full h-full"
            aspectClassName=""
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title and Model Badge */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              {prompt.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                {
                  "Midjourney": "bg-purple-600",
                  "DALL-E": "bg-pink-600",
                  "Stable Diffusion": "bg-blue-600",
                  "Flux": "bg-orange-600",
                  "Adobe Firefly": "bg-red-600",
                }[prompt.modelLabel] || "bg-slate-600"
              }`}>
                {prompt.modelLabel}
              </span>
              {prompt.aspectRatio && (
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {prompt.aspectRatio}
                </span>
              )}
              {prompt.category && (
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {prompt.category}
                </span>
              )}
            </div>
          </div>

          {/* Prompt Text Code Block */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Prompt Text
            </h2>
            <div className="relative">
              <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 border border-slate-700 overflow-auto">
                <pre className="text-slate-100 font-mono text-sm whitespace-pre-wrap break-words">
                  {prompt.prompt}
                </pre>
              </div>
              <button
                onClick={handleCopy}
                className={`absolute top-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {copied ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Negative Prompt */}
          {prompt.negativePrompt && (
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Negative Prompt
              </h2>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
                <pre className="text-red-900 dark:text-red-100 font-mono text-sm whitespace-pre-wrap break-words">
                  {prompt.negativePrompt}
                </pre>
              </div>
            </div>
          )}

          <AdSlot slot="prompt_content" />

          {/* Parameter Breakdown */}
          {parameters.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Parameter Breakdown
              </h2>
              <div className="grid gap-3">
                {parameters.map((param, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {param.label}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {param.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Use Section */}
          <div className="space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-blue-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              How to Use This Prompt
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              Step-by-step guide for {prompt.modelLabel}:
            </p>
            <ol className="space-y-3">
              {toolInstructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 pt-0.5">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tags Section */}
          {prompt.displayTags && prompt.displayTags.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {prompt.displayTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/prompts?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                  >
                    #{formatTagLabel(tag)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Share & Info */}
        <div className="space-y-6">
          {/* Share Section */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Share</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
                Twitter/X
              </button>
              <button
                onClick={() => handleShare("pinterest")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
              >
                <FaPinterest className="w-4 h-4" />
                Pinterest
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("copy")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {copied ? <FaCheck /> : <FaLink />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Details Box */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Details</h3>
            
            {prompt.modelLabel && (
              <div>
                <dt className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  AI Platform
                </dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-white">
                  {prompt.modelLabel}
                </dd>
              </div>
            )}

            {prompt.category && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <dt className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Category
                </dt>
                <dd className="mt-1">
                  <Link
                    href={`/category/${encodeURIComponent(prompt.category.toLowerCase())}`}
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {prompt.category}
                  </Link>
                </dd>
              </div>
            )}

            {prompt.aspectRatio && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <dt className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Aspect Ratio
                </dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-white">
                  {prompt.aspectRatio}
                </dd>
              </div>
            )}

            {prompt.bestFor && prompt.bestFor.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <dt className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Best For
                </dt>
                <dd className="mt-2 space-y-1">
                  {prompt.bestFor.map((item) => (
                    <div key={item.label} className="text-sm text-slate-700 dark:text-slate-300">
                      • {item.label}
                    </div>
                  ))}
                </dd>
              </div>
            )}
          </div>

          <AdSlot slot="prompt_sidebar" />
        </div>
      </div>

      {/* Related Prompts Section */}
      {relatedPrompts && relatedPrompts.length > 0 && (
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              You Might Also Like
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore related prompts
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPrompts.slice(0, 6).map((relatedPrompt) => (
              <PromptCard
                key={relatedPrompt.id}
                prompt={relatedPrompt}
                priority={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

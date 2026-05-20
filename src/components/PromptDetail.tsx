'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiCopy, FiHeart, FiShare2, FiArrowLeft, FiEye } from 'react-icons/fi';
import { Prompt, RelatedPrompts } from '@/src/types';
import {
  getPromptUrl,
  getCategoryUrl,
  copyToClipboard,
  sharePrompt,
  isPromptSaved,
  savePrompt,
  unsavePrompt,
  getBadgeColor,
  getBadgeIcon,
  formatDate,
  getImageDimensions,
  formatCount,
  trackPromptCopy,
  trackPromptSave,
  trackPromptShare,
  trackPromptView,
  getPromptViewCount,
} from '@/src/utils/prompts';
import PromptCard from '@/src/components/PromptCard';

interface PromptDetailProps {
  prompt: Prompt;
  relatedPrompts: RelatedPrompts;
}

export default function PromptDetail({ prompt, relatedPrompts }: PromptDetailProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'success'>('idle');
  const [negativeCopyState, setNegativeCopyState] = useState<'idle' | 'copying' | 'success'>('idle');
  const [isSaved, setIsSaved] = useState(isPromptSaved(prompt.id));
  const [viewCount, setViewCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const imageDims = getImageDimensions(prompt.aspectRatio);

  // Track view on component mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    const newViewCount = getPromptViewCount(prompt.id) + 1;
    setViewCount(newViewCount);
    trackPromptView(prompt);
  }, [prompt.id, prompt]);

  const handleCopyPrompt = async () => {
    setCopyState('copying');
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      setCopyState('success');
      trackPromptCopy(prompt);
      showNotification('✓ Copied!', `${prompt.title} is ready to use`);
      setTimeout(() => setCopyState('idle'), 2000);
    } else {
      setCopyState('idle');
    }
  };

  const handleCopyNegativePrompt = async () => {
    setNegativeCopyState('copying');
    const success = await copyToClipboard(prompt.negativePrompt);
    if (success) {
      setNegativeCopyState('success');
      showNotification('✓ Copied!', 'Negative prompt copied');
      setTimeout(() => setNegativeCopyState('idle'), 2000);
    } else {
      setNegativeCopyState('idle');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      savePrompt(prompt.id);
      trackPromptSave(prompt);
      showNotification('❤️ Saved!', 'Added to your collection');
    } else {
      unsavePrompt(prompt.id);
    }
  };

  const handleShare = async () => {
    const success = await sharePrompt(prompt);
    if (success) {
      trackPromptShare(prompt);
      showNotification('Shared!', '');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* ===== BREADCRUMB ===== */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap mb-4">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href={getCategoryUrl(prompt.category)} className="hover:text-white transition">
              {prompt.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white line-clamp-1 max-w-[180px]">{prompt.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ===== MAIN CONTENT (LEFT) ===== */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800"
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: prompt.aspectRatio,
                }}
              >
                <Image
                  src={prompt.previewImage}
                  alt={prompt.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges overlay */}
                <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-3">
                  {(prompt.badges ?? []).map((badge, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getBadgeColor(badge.type)} backdrop-blur`}
                    >
                      <span className="text-lg">{getBadgeIcon(badge.type)}</span>
                      {badge.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Title & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight break-words hyphens-auto">{prompt.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-semibold">{prompt.model}</span>
                  <span>•</span>
                  <span>{prompt.category}</span>
                  <span>•</span>
                  <span>{prompt.aspectRatio}</span>
                </div>
                <div>
                  <span>📅 {formatDate(prompt.createdAt)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-2xl font-bold text-white">{prompt.copies || 0}</div>
                  <div className="text-xs text-slate-400">copies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{prompt.saves || 0}</div>
                  <div className="text-xs text-slate-400">saved</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-3"
            >
              <motion.button
                onClick={handleCopyPrompt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${
                  copyState === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FiCopy className="w-5 h-5" />
                {copyState === 'idle' && 'Copy Prompt'}
                {copyState === 'copying' && 'Copying...'}
                {copyState === 'success' && 'Copied!'}
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white transition-all"
              >
                <FiShare2 className="w-5 h-5" />
                Share
              </motion.button>
            </motion.div>

            {/* Prompt Section */}
            <PromptSection
              title="Prompt"
              content={prompt.prompt}
              onCopy={handleCopyPrompt}
              copyState={copyState}
            />

            {/* Negative Prompt Section */}
            {prompt.negativePrompt && (
              <PromptSection
                title="Negative Prompt (Optional)"
                content={prompt.negativePrompt}
                onCopy={handleCopyNegativePrompt}
                copyState={negativeCopyState}
                variant="negative"
              />
            )}

            {/* Tags Section */}
            {prompt.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${tag}`}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium hover:bg-blue-600/30 transition cursor-pointer"
                      >
                        #{tag}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ===== SIDEBAR (RIGHT) ===== */}
          <div className="space-y-6">
            {/* Save Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6"
            >
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all"
                style={{
                  background: isSaved ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                }}
              >
                <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save Prompt'}
              </motion.button>
              <p className="text-xs text-slate-400 text-center mt-2">
                {isSaved ? 'Added to your collection' : 'Save for later'}
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Stats
              </h3>
              <div className="space-y-3">
                <StatItem icon={<FiEye className="w-4 h-4" />} label="Views" value={formatCount(viewCount)} />
                <StatItem icon={<FiCopy className="w-4 h-4" />} label="Copies" value={formatCount(prompt.copies || 0)} />
                <StatItem icon={<FiHeart className="w-4 h-4" />} label="Saves" value={formatCount(prompt.saves || 0)} />
              </div>
            </motion.div>

            {/* Model Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Details
              </h3>
              <div className="space-y-3">
                <DetailItem label="Model" value={prompt.model} />
                <DetailItem label="Category" value={prompt.category} />
                <DetailItem label="Aspect Ratio" value={prompt.aspectRatio} />
                <DetailItem label="Size" value={`${imageDims.width}x${imageDims.height}`} />
              </div>
            </motion.div>

            {/* Related Prompts */}
            {relatedPrompts.byCategory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6"
              >
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Similar Category
                </h3>
                <div className="space-y-2">
                  {relatedPrompts.byCategory.slice(0, 3).map((p) => (
                    <Link key={p.id} href={getPromptUrl(p.slug)}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="p-2 rounded-lg hover:bg-slate-700/50 transition cursor-pointer text-sm text-slate-300 hover:text-white truncate"
                      >
                        {p.title}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ===== RELATED PROMPTS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-black text-white mb-8">Related Prompts</h2>

          {relatedPrompts.byCategory.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-slate-300 mb-4">By Category</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPrompts.byCategory.slice(0, 3).map((p) => (
                  <PromptCard key={p.id} prompt={p} />
                ))}
              </div>
            </div>
          )}

          {relatedPrompts.byTags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-slate-300 mb-4">By Tags</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPrompts.byTags.slice(0, 3).map((p) => (
                  <PromptCard key={p.id} prompt={p} />
                ))}
              </div>
            </div>
          )}

          {relatedPrompts.byModel.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-300 mb-4">By Model</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPrompts.byModel.slice(0, 3).map((p) => (
                  <PromptCard key={p.id} prompt={p} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile sticky CTA removed - single copy button remains inside content */}
    </div>
  );
}

// ===== PROMPT SECTION COMPONENT =====
function PromptSection({
  title,
  content,
  onCopy,
  copyState,
  variant = 'normal',
}: {
  title: string;
  content: string;
  onCopy: () => void;
  copyState: 'idle' | 'copying' | 'success';
  variant?: 'normal' | 'negative';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-gradient-to-br ${
        variant === 'negative'
          ? 'from-red-900/20 to-red-950/20 border-red-700/30'
          : 'from-slate-800/50 to-slate-900/50 border-slate-700/50'
      } backdrop-blur border rounded-2xl p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <motion.button
          onClick={onCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            copyState === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copyState === 'idle' && '📋 Copy'}
          {copyState === 'copying' && '⏳'}
          {copyState === 'success' && '✓'}
        </motion.button>
      </div>

      <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        {content.split(' ').length} words • {content.length} characters
      </p>
    </motion.div>
  );
}

// ===== DETAIL ITEM COMPONENT =====
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
      <div className="flex items-center gap-2">
        <div className="text-slate-400">{icon}</div>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
      <p className="text-white font-bold">{value}</p>
    </div>
  );
}

// ===== NOTIFICATION =====
function showNotification(title: string, message: string) {
  // TODO: Integrate with your toast system
  console.log(`${title}: ${message}`);
}

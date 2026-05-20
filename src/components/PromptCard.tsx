'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiCopy, FiHeart, FiShare2, FiZoomIn } from 'react-icons/fi';
import { Prompt } from '@/src/types';
import { 
  getPromptUrl, 
  copyToClipboard, 
  sharePrompt, 
  isPromptSaved,
  savePrompt,
  unsavePrompt,
  getBadgeColor,
  getBadgeIcon,
  trackPromptCopy,
  trackPromptSave,
  trackPromptShare,
} from '@/src/utils/prompts';

interface PromptCardProps {
  prompt: Prompt;
  variant?: 'grid' | 'list' | 'carousel';
}

export default function PromptCard({ prompt, variant = 'grid' }: PromptCardProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'success'>('idle');
  const [isSaved, setIsSaved] = useState(isPromptSaved(prompt.id));
  const [showModal, setShowModal] = useState(false);

  const handleCopy = async () => {
    setCopyState('copying');
    const success = await copyToClipboard(prompt.prompt);
    
    if (success) {
      setCopyState('success');
      trackPromptCopy(prompt);
      
      // Haptic feedback
      navigator.vibrate?.([10, 20, 10, 20, 20]);
      
      // Show toast
      showNotification('✓ Prompt copied!', 'Ready to use in ' + prompt.model);
      
      setTimeout(() => setCopyState('idle'), 2000);
    } else {
      setCopyState('idle');
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
      showNotification('Removed from saved', '');
    }
    navigator.vibrate?.(50);
  };

  const handleShare = async () => {
    const success = await sharePrompt(prompt);
    if (success) {
      trackPromptShare(prompt);
      showNotification('Shared!', 'Prompt copied to clipboard');
    }
  };

  if (variant === 'list') {
    return <PromptCardList prompt={prompt} onCopy={handleCopy} onSave={handleSave} onShare={handleShare} copyState={copyState} isSaved={isSaved} />;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-2xl"
      >
        {/* ===== IMAGE SECTION ===== */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-slate-900 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {/* Main image */}
          <div className="relative w-full aspect-square">
            <Image
              src={prompt.previewImage}
              alt={prompt.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* Gradient overlay - appears on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
            {(prompt.badges ?? []).map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                whileHover={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getBadgeColor(badge.type)} backdrop-blur`}
              >
                <span>{getBadgeIcon(badge.type)}</span>
                <span>{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Category label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 px-3 py-1.5 bg-blue-600/90 backdrop-blur rounded-full text-xs font-bold text-white"
          >
            {prompt.category}
          </motion.div>

          {/* Zoom icon on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur rounded-full text-white"
          >
            <FiZoomIn className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* ===== CONTENT SECTION ===== */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <Link href={getPromptUrl(prompt.slug)}>
            <motion.h3
              whileHover={{ color: '#60A5FA' }}
              className="text-sm font-bold text-white line-clamp-2 transition-colors duration-200 cursor-pointer"
            >
              {prompt.title}
            </motion.h3>
          </Link>

          {/* Description preview */}
          <p className="text-xs text-slate-400 line-clamp-2">
            {prompt.prompt.substring(0, 80)}...
          </p>

          {/* Model & Tags */}
          <div className="flex flex-wrap gap-1">
            <span className="text-xs px-2 py-0.5 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300">
              {prompt.model}
            </span>
            {prompt.tags.slice(0, 1).map((tag) => (
              <Link key={tag} href={`/tag/${tag}`}>
                <span className="text-xs px-2 py-0.5 bg-slate-700/30 border border-slate-600/30 rounded-full text-slate-300 hover:bg-slate-700/50 transition">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="border-t border-slate-700/50 px-4 py-3 flex items-center justify-between gap-2">
          {/* Copy button - MAIN CTA */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold text-xs overflow-hidden transition-all duration-300 flex items-center justify-center gap-1.5 ${
              copyState === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <FiCopy className="w-4 h-4" />
            <span className="hidden sm:inline">
              {copyState === 'idle' && 'Copy'}
              {copyState === 'copying' && '⏳'}
              {copyState === 'success' && '✓'}
            </span>
          </motion.button>

          {/* Save button */}
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
            title={isSaved ? 'Remove from saved' : 'Save prompt'}
          >
            {isSaved ? (
              <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />
            ) : (
              <FiHeart className="w-5 h-5 text-slate-400 hover:text-red-400" />
            )}
          </motion.button>

          {/* Share button */}
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
            title="Share prompt"
          >
            <FiShare2 className="w-5 h-5 text-slate-400 hover:text-blue-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Image Modal */}
      {showModal && <ImageModal prompt={prompt} onClose={() => setShowModal(false)} />}
    </>
  );
}

// ===== LIST VIEW VARIANT =====
function PromptCardList({
  prompt,
  onCopy,
  onSave,
  onShare,
  copyState,
  isSaved,
}: {
  prompt: Prompt;
  onCopy: () => void;
  onSave: () => void;
  onShare: () => void;
  copyState: 'idle' | 'copying' | 'success';
  isSaved: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900">
        <Image
          src={prompt.previewImage}
          alt={prompt.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Link href={getPromptUrl(prompt.slug)}>
          <h3 className="text-sm font-bold text-white hover:text-blue-400 transition line-clamp-1">
            {prompt.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{prompt.prompt}</p>
        <div className="flex gap-2 mt-2">
          <span className="text-xs px-2 py-0.5 bg-purple-600/20 rounded text-purple-300">
            {prompt.model}
          </span>
          <span className="text-xs px-2 py-0.5 bg-blue-600/20 rounded text-blue-300">
            {prompt.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 items-center">
        <motion.button
          onClick={onCopy}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
            copyState === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copyState === 'idle' ? '📋' : copyState === 'copying' ? '⏳' : '✓'}
        </motion.button>
        <motion.button
          onClick={onSave}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 hover:bg-slate-700/50 rounded transition"
        >
          {isSaved ? (
            <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />
          ) : (
            <FiHeart className="w-5 h-5 text-slate-400" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ===== IMAGE MODAL =====
function ImageModal({ prompt, onClose }: { prompt: Prompt; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
      >
        <Image
          src={prompt.previewImage}
          alt={prompt.title}
          fill
          className="object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white p-2 rounded-full transition"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ===== NOTIFICATION =====
function showNotification(title: string, message: string) {
  // TODO: Integrate with your existing toast system
  console.log(`${title}: ${message}`);
}

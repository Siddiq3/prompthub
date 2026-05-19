"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiCopy, FiHeart, FiShare2 } from "react-icons/fi";

/**
 * HIGH-DOPAMINE PROMPT CARD
 * 
 * Feedback layers:
 * 1. Visual: Animation + color change
 * 2. Haptic: Vibration (mobile)
 * 3. Audio: Success sound
 * 4. Confirmation: Toast notification + particle effects
 * 
 * Psychology: Completion cycle triggers dopamine spike
 */

export default function DopaminePromptCard({ prompt, position = 0 }) {
  const [isSaved, setIsSaved] = useState(false);
  const [copyState, setCopyState] = useState("idle"); // idle, copying, success
  const [saveCount, setSaveCount] = useState(prompt.saves || 0);
  const [showParticles, setShowParticles] = useState(false);

  // Recommendation card every 8-10 cards
  const showRecommendation = position > 0 && (position + 1) % 9 === 0;

  if (showRecommendation) {
    return <RecommendationCard />;
  }

  const handleCopy = async () => {
    try {
      setCopyState("copying");

      // Copy to clipboard
      await navigator.clipboard.writeText(prompt.prompt);

      // Haptic feedback
      navigator.vibrate?.([10, 20, 10, 20, 20]);

      // Success state
      setCopyState("success");

      // Particle burst
      setShowParticles(true);

      // Play success sound (optional - you can add later)
      playSuccessSound();

      // Show toast notification
      showNotification("✓ Prompt copied!", "Ready to use in Midjourney");

      // Reset after 2 seconds
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      setCopyState("idle");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(c => isSaved ? c - 1 : c + 1);
    navigator.vibrate?.(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: (position % 4) * 0.05
      }}
      className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
    >
      {/* ===== IMAGE SECTION ===== */}
      <motion.div
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-square overflow-hidden bg-slate-900"
      >
        {/* Main image */}
        <img
          src={prompt.previewImage}
          alt={prompt.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay - appears on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
        />

        {/* Difficulty badge - animated entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          whileHover={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="absolute top-3 left-3 px-3 py-1 bg-blue-600/90 backdrop-blur rounded-full text-xs font-bold text-white z-10"
        >
          Easy to Use
        </motion.div>

        {/* Trending badge */}
        {prompt.isTrending && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-3 right-3 px-3 py-1 bg-orange-600/90 backdrop-blur rounded-full text-xs font-bold text-white z-10 flex items-center gap-1"
          >
            <span>🔥</span> Trending
          </motion.div>
        )}

        {/* Quick action buttons - appear on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 z-20"
        >
          <QuickCopyButton prompt={prompt} onCopy={handleCopy} />
          <QuickSaveButton isSaved={isSaved} onSave={handleSave} />
        </motion.div>
      </motion.div>

      {/* ===== CONTENT SECTION ===== */}
      <Link href={`/prompt/${prompt.slug}`} className="block">
        <div className="p-4 space-y-3 cursor-pointer">
          {/* Title */}
          <motion.h3
            whileHover={{ color: "#60A5FA" }}
            className="text-lg font-bold text-white line-clamp-2 transition-colors duration-200"
          >
            {prompt.title}
          </motion.h3>

          {/* Description preview */}
          <p className="text-sm text-slate-400 line-clamp-2">
            {prompt.prompt.substring(0, 80)}...
          </p>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300">
              {prompt.model || "Midjourney"}
            </span>
            {prompt.category && (
              <span className="text-xs px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300">
                {prompt.category}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ===== ACTION BUTTONS SECTION ===== */}
      <div className="border-t border-slate-700/50 px-4 py-3 flex items-center justify-between gap-2">
        {/* Social proof */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 text-sm text-slate-400"
        >
          <span className="text-blue-400">👤</span>
          <span>{saveCount.toLocaleString()}</span>
        </motion.div>

        {/* Copy button - MAIN CTA */}
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-3 py-2 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 flex items-center gap-2 ${
            copyState === "success"
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <FiCopy className="w-4 h-4" />
          <span>
            {copyState === "idle" && "Copy"}
            {copyState === "copying" && "⏳"}
            {copyState === "success" && "✓"}
          </span>

          {/* Ripple effect */}
          {copyState === "success" && (
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 2 }}
              transition={{ duration: 0.5 }}
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Hover shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: 0.2, pointerEvents: "none" }}
          />
        </motion.button>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
        >
          <motion.div
            animate={isSaved ? { scale: [0.8, 1.3, 1], rotate: [0, -20, 0] } : {}}
            transition={{ type: "spring", damping: 10 }}
          >
            {isSaved ? (
              <FiHeart className="w-5 h-5 fill-red-500 text-red-500" />
            ) : (
              <FiHeart className="w-5 h-5 text-slate-400" />
            )}
          </motion.div>

          {/* Floating heart */}
          {isSaved && (
            <motion.div
              className="absolute pointer-events-none text-red-500"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -40, opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ left: "50%", top: "50%" }}
            >
              ❤️
            </motion.div>
          )}
        </motion.button>

        {/* Share button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-300"
        >
          <FiShare2 className="w-5 h-5 text-slate-400" />
        </motion.button>
      </div>

      {/* ===== PARTICLE EFFECTS ===== */}
      <AnimatePresence>
        {showParticles && <CopyParticles />}
      </AnimatePresence>

      {/* ===== CARD HOVER LIFT ===== */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      />
    </motion.div>
  );
}

/**
 * Quick Copy Button - Overlay on image
 */
function QuickCopyButton({ prompt, onCopy }) {
  return (
    <motion.button
      onClick={onCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-200"
    >
      <FiCopy className="w-4 h-4" />
      Copy
    </motion.button>
  );
}

/**
 * Quick Save Button - Overlay on image
 */
function QuickSaveButton({ isSaved, onSave }) {
  return (
    <motion.button
      onClick={onSave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-200 ${
        isSaved
          ? "bg-red-600/80 text-white"
          : "bg-white/20 text-white hover:bg-white/30 backdrop-blur"
      }`}
    >
      {isSaved ? (
        <>
          <span>❤️</span>
          Saved
        </>
      ) : (
        <>
          <FiHeart className="w-4 h-4" />
          Save
        </>
      )}
    </motion.button>
  );
}

/**
 * Recommendation Card - Shows every 8-10 cards
 */
function RecommendationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", damping: 20 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur border border-purple-500/30 p-6 col-span-1 md:col-span-2 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-purple-300 font-semibold mb-2">✨ Recommendations</p>
        <h3 className="text-xl font-bold text-white mb-2">You might love these too</h3>
        <p className="text-sm text-slate-300">Explore similar prompts based on your browsing</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold whitespace-nowrap"
      >
        Explore →
      </motion.button>
    </motion.div>
  );
}

/**
 * Particle effects on copy success
 */
function CopyParticles() {
  const particles = Array.from({ length: 12 });

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-lg"
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: Math.cos((i / particles.length) * Math.PI * 2) * 80,
            y: Math.sin((i / particles.length) * Math.PI * 2) * 80,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ left: "50%", top: "50%", marginLeft: "-10px", marginTop: "-10px" }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
}

/**
 * Success sound playback (optional)
 */
function playSuccessSound() {
  try {
    // Using Web Audio API or native notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (err) {
    // Silent fail if Audio API not available
    console.debug("Audio feedback unavailable");
  }
}

/**
 * Notification system (integrate with your toast system)
 */
function showNotification(title, message) {
  // TODO: Integrate with your existing toast/notification system
  console.log(`📬 ${title}: ${message}`);
}

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { getImageCandidates } from "../utils/imageUrl";

const getInitials = (title = "Prompt") =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "PP";

function SmartImage({
  src,
  alt,
  title,
  className = "",
  imageClassName = "",
  aspectClassName = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1280px) 29vw, (min-width: 768px) 46vw, 92vw",
  children
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use only the primary image candidate (most reliable, pre-validated)
  const imageCandidates = useMemo(() => getImageCandidates(src), [src]);
  const primaryImage = imageCandidates[0] || "";
  const showFallback = !primaryImage || imageError;

  const handleError = () => {
    setImageError(true);
  };

  const handleLoadingComplete = () => {
    setImageLoaded(true);
  };

  // Fallback UI with initials
  const FallbackUI = () => (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700">
      <span className="text-3xl font-bold text-white opacity-60">
        {getInitials(title)}
      </span>
    </div>
  );

  if (showFallback) {
    return (
      <div className={`relative overflow-hidden rounded-[1.5rem] bg-slate-200 ${aspectClassName} ${className}`}>
        <FallbackUI />
        {children}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] bg-slate-200 ${aspectClassName} ${className}`}>
      {primaryImage && (
        <Image
          src={primaryImage}
          alt={alt || title}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onError={handleError}
          onLoadingComplete={handleLoadingComplete}
          placeholder="empty"
        />
      )}
      
      {/* Skeleton loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-600" />
      )}
      
      {children}
    </div>
  );
}

export default SmartImage;


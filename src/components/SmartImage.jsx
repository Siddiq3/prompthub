import { useEffect, useMemo, useState } from "react";
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
  const [imageAttempt, setImageAttempt] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageCandidates = useMemo(() => getImageCandidates(src), [src]);
  const activeImage = imageCandidates[imageAttempt] || "";
  const hasImageCandidates = imageCandidates.length > 0;
  const isImageExhausted = hasImageCandidates && imageAttempt >= imageCandidates.length;
  const showSkeleton = hasImageCandidates && !imageLoaded && !isImageExhausted;
  const showFallback = !hasImageCandidates || isImageExhausted;

  useEffect(() => {
    setImageAttempt(0);
    setImageLoaded(false);
  }, [src, title]);

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] bg-slate-200 ${aspectClassName} ${className}`}>
      {activeImage && (
        <img
          src={activeImage}
          alt={alt || title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          sizes={sizes}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageLoaded(false);
            setImageAttempt((prev) => prev + 1);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} ${imageClassName}`}
        />
      )}

      {showSkeleton && <div className="skeleton-shimmer absolute inset-0" />}

      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,#e0e7ff,transparent_60%),linear-gradient(135deg,#f8fafc,#ffffff)] text-4xl font-semibold text-brand-ink">
          {getInitials(title)}
        </div>
      )}

      {children}
    </div>
  );
}

export default SmartImage;

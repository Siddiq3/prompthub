'use client';

import { useState } from 'react';
import { Film, ImageOff, Play } from 'lucide-react';
import type { VideoWorkflow } from '@/src/types';

interface VideoWorkflowMediaProps {
  workflow: VideoWorkflow;
  variant?: 'card' | 'hero';
  className?: string;
}

const ASPECT_RATIO_MAP: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-video',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '3:2': 'aspect-[3/2]',
  '2:3': 'aspect-[2/3]',
  '21:9': 'aspect-[21/9]',
};

const getAspectValue = (aspectRatio = '') => {
  const match = String(aspectRatio).match(/(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)/);

  if (!match) return 9 / 16;

  const width = Number(match[1]);
  const height = Number(match[2]);

  return width > 0 && height > 0 ? width / height : 9 / 16;
};

const getAspectClass = (aspectRatio = '') => ASPECT_RATIO_MAP[aspectRatio] || 'aspect-[9/16]';

export default function VideoWorkflowMedia({
  workflow,
  variant = 'card',
  className = '',
}: VideoWorkflowMediaProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const thumbnail = workflow.thumbnail || workflow.previewImage || '';
  const hasImage = Boolean(thumbnail) && !imageFailed;
  const hasVideo = Boolean(workflow.previewVideo) && !videoFailed;
  const isHero = variant === 'hero';
  const isHorizontal = getAspectValue(workflow.aspectRatio) > 1;
  const mediaFitClass = !isHero && isHorizontal ? 'object-contain' : 'object-cover';

  const containerClass = [
    'relative overflow-hidden bg-slate-950',
    isHero ? `${getAspectClass(workflow.aspectRatio)} max-h-[760px] w-full` : 'h-full w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <FallbackPreview workflow={workflow} variant={variant} />

      {hasImage && !isHero && isHorizontal ? (
        <img
          src={thumbnail}
          alt=""
          loading="lazy"
          aria-hidden="true"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl saturate-125"
        />
      ) : null}

      {hasImage ? (
        <img
          src={thumbnail}
          alt={workflow.title}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className={[
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            mediaFitClass,
            isHero && hasVideo && videoReady ? 'opacity-0' : 'opacity-100',
            !isHero && !isHorizontal ? 'transition-transform group-hover:scale-105' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ) : null}

      {hasVideo ? (
        <video
          className={[
            'absolute inset-0 h-full w-full transition-opacity duration-300',
            mediaFitClass,
            isHero
              ? videoReady
                ? 'opacity-100'
                : 'opacity-0'
              : videoReady
                ? 'opacity-0 group-hover:opacity-100'
                : 'opacity-0',
          ]
            .filter(Boolean)
            .join(' ')}
          controls={isHero}
          controlsList={isHero ? 'nodownload' : undefined}
          disablePictureInPicture
          preload={isHero ? 'metadata' : 'none'}
          muted={!isHero}
          loop={!isHero}
          playsInline
          aria-label={`${workflow.title} preview`}
          onLoadedMetadata={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          onContextMenu={isHero ? (event) => event.preventDefault() : undefined}
        >
          <source src={workflow.previewVideo} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

function FallbackPreview({
  workflow,
  variant,
}: {
  workflow: VideoWorkflow;
  variant: 'card' | 'hero';
}) {
  const isHero = variant === 'hero';

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.35),transparent_34%),linear-gradient(135deg,#111827,#312e81_48%,#064e3b)] p-5 text-white">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold backdrop-blur">
          <Film className="h-3.5 w-3.5" />
          Video Workflow
        </span>
        <ImageOff className="h-4 w-4 text-white/70" />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-2xl backdrop-blur">
          <Play className="ml-1 h-7 w-7 fill-white text-white" />
        </div>
      </div>

      <div>
        <p className={isHero ? 'text-lg font-bold leading-7' : 'line-clamp-2 text-sm font-bold leading-5'}>
          {workflow.workflowTitle || workflow.title}
        </p>
        <p className="mt-2 text-xs font-semibold text-white/75">
          {workflow.duration} · {workflow.aspectRatio}
        </p>
      </div>
    </div>
  );
}

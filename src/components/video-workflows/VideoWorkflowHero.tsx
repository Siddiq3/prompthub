import { Clock, Maximize2, Wrench } from 'lucide-react';
import type { VideoWorkflow } from '@/src/types';
import VideoWorkflowMedia from './VideoWorkflowMedia';

interface VideoWorkflowHeroProps {
  workflow: VideoWorkflow;
}

export default function VideoWorkflowHero({ workflow }: VideoWorkflowHeroProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <VideoWorkflowMedia workflow={workflow} variant="hero" />
      </div>

      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
          🎬 Video Workflow
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {workflow.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">{workflow.description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MetaItem icon={<Clock className="h-4 w-4" />} label="Duration" value={workflow.duration} />
          <MetaItem icon={<Maximize2 className="h-4 w-4" />} label="Aspect" value={workflow.aspectRatio} />
          <MetaItem icon={<Wrench className="h-4 w-4" />} label="Tools" value={workflow.toolsUsed.join(' + ')} />
        </div>

        <div className="flex flex-wrap gap-2">
          {workflow.trendingBadges?.map((badge) => (
            <span
              key={`${badge.type}-${badge.label}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {badge.icon || '•'} {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{value}</p>
    </div>
  );
}

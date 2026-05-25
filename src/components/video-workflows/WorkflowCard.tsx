import Link from 'next/link';
import { Clock, Film, ListChecks, Wrench } from 'lucide-react';
import type { VideoWorkflow } from '@/src/types';
import VideoWorkflowMedia from './VideoWorkflowMedia';

interface WorkflowCardProps {
  workflow: VideoWorkflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link href={`/video-prompts/${workflow.slug}`} prefetch={true} className="block h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[9/16] overflow-hidden bg-slate-100">
          <VideoWorkflowMedia workflow={workflow} variant="card" className="absolute inset-0" />

          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
            <Film className="h-3.5 w-3.5" />
            Video Workflow
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            {workflow.trendingBadges?.slice(0, 2).map((badge) => (
              <span
                key={`${workflow.id}-${badge.type}-${badge.label}`}
                className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-900 shadow-sm backdrop-blur"
              >
                {badge.icon || '•'} {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="line-clamp-2 text-[14px] font-semibold text-slate-900 transition group-hover:text-[#7C3AED]">
            {workflow.title}
          </h3>

          <p className="line-clamp-2 text-[12px] leading-5 text-slate-600">
            {workflow.description}
          </p>

          <div className="grid gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{workflow.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate">{workflow.toolsUsed.join(' + ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ListChecks className="h-3.5 w-3.5 text-slate-400" />
              <span>{workflow.steps.length} workflow steps</span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {workflow.badges?.slice(0, 2).map((badge) => (
              <span
                key={`${workflow.id}-${badge.type}`}
                className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700"
              >
                {badge.icon || '•'} {badge.label}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

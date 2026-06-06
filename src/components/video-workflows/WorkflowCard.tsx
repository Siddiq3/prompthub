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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <VideoWorkflowMedia workflow={workflow} variant="card" className="absolute inset-0" />

          <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2271b1] shadow-sm">
            <Film className="h-3.5 w-3.5" />
            Video Workflow
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            {workflow.trendingBadges?.slice(0, 2).map((badge) => (
              <span
                key={`${workflow.id}-${badge.type}-${badge.label}`}
                className="rounded bg-white/95 px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm"
              >
                {badge.icon || '•'} {badge.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2271b1]">
            Workflow
          </p>
          <h3 className="line-clamp-2 text-xl font-bold leading-7 text-slate-950 transition group-hover:text-[#2271b1]">
            {workflow.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-7 text-slate-600">
            {workflow.description}
          </p>

          <div className="grid gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
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
                className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
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

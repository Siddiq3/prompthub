import { ArrowRight } from 'lucide-react';
import type { VideoWorkflowStep } from '@/src/types';

interface WorkflowTimelineProps {
  steps: VideoWorkflowStep[];
}

export default function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-2xl font-semibold text-slate-900">Workflow Timeline</h2>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {steps.map((step, index) => (
          <div key={step.stepNumber} className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
              Step {step.stepNumber}: {step.title}
            </div>
            {index < steps.length - 1 ? (
              <ArrowRight className="hidden h-4 w-4 text-slate-400 sm:block" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

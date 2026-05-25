import { Lightbulb } from 'lucide-react';
import type { VideoWorkflowStep } from '@/src/types';
import CopyPromptButton from './CopyPromptButton';

interface WorkflowStepCardProps {
  step: VideoWorkflowStep;
}

export default function WorkflowStepCard({ step }: WorkflowStepCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step {step.stepNumber}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{step.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
            <span className="rounded-full bg-slate-100 px-3 py-1">{step.platform}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{step.model}</span>
          </div>
        </div>
        <CopyPromptButton text={step.prompt} label={`Copy Step ${step.stepNumber} Prompt`} />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-950 p-4">
        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-100">
          {step.prompt}
        </p>
      </div>

      {step.tips?.length ? (
        <div className="mt-5 rounded-xl bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <Lightbulb className="h-4 w-4" />
            Tips
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950">
            {step.tips.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span aria-hidden="true">-</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

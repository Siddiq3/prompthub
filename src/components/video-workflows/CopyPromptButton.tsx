'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyPromptButtonProps {
  text: string;
  label: string;
}

export default function CopyPromptButton({ text, label }: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
        copied
          ? 'bg-emerald-600 text-white'
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

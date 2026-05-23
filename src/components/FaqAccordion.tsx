"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqItems: FaqItem[];
}

export default function FaqAccordion({ faqItems }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={`${item.question}-${index}`} className="border-b border-slate-100 last:border-none">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-slate-900"
            >
              <span>{item.question}</span>
              <span className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                ▼
              </span>
            </button>
            {isOpen ? (
              <div className="pb-4 text-sm leading-7 text-slate-600">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

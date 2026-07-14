"use client";

import {
    QUESTIONS,
    CATEGORY_LABELS,
    RESULT_CONTENT,
    getSeverity,
} from "./assessmentConfig";
import type { Category } from "./assessmentConfig";

interface AssessmentResultProps {
    answers: (number | null)[];
}

export default function AssessmentResult({ answers }: AssessmentResultProps) {
    // Calculate scores per category
    const scores: Record<Category, number> = {
        anxiety: 0,
        depression: 0,
        stress: 0,
    };

    QUESTIONS.forEach((q, idx) => {
        scores[q.category] += answers[idx] ?? 0;
    });

    const categories: Category[] = ["anxiety", "depression", "stress"];

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-950 md:text-2xl">
                    Your Results
                </h2>
                <p className="mt-2 text-slate-600 md:text-lg">
                    Based on your responses, here is an overview of your wellbeing across
                    three dimensions.
                </p>
            </div>

            {categories.map((cat) => {
                const severity = getSeverity(scores[cat]);
                const content = RESULT_CONTENT[cat][severity];

                return (
                    <div
                        key={cat}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                        {/* Header band */}
                        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800 md:text-xl">
                                {content.title}:{" "}
                                <span className={content.colorClass}>
                                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                </span>
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Score: {scores[cat]} / 9 &middot;{" "}
                                {CATEGORY_LABELS[cat]}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col items-center gap-5 p-6 md:p-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={content.imageUrl}
                                alt={`${CATEGORY_LABELS[cat]} ${severity}`}
                                className="h-40 w-auto object-contain md:h-52"
                            />

                            <div className="flex flex-col gap-3 text-center">
                                <p className="text-base font-semibold text-slate-800 md:text-lg">
                                    {content.boldText}
                                </p>
                                {content.paragraphs.map((para, i) => (
                                    <p
                                        key={i}
                                        className="text-sm leading-relaxed text-slate-600 md:text-base"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

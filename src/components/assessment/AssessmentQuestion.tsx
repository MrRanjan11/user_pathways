"use client";

import { ANSWER_OPTIONS } from "./assessmentConfig";
import type { Question } from "./assessmentConfig";

interface AssessmentQuestionProps {
    question: Question;
    selectedValue: number | null;
    onSelect: (value: number) => void;
}

export default function AssessmentQuestion({
    question,
    selectedValue,
    onSelect,
}: AssessmentQuestionProps) {
    return (
        <div className="flex flex-col gap-5">
            {/* Question text */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
                <p className="text-lg font-semibold text-blue-950 md:text-xl">
                    {question.id}. {question.text}
                </p>
            </div>

            {/* Answer options */}
            <div className="flex flex-col gap-3">
                {ANSWER_OPTIONS.map((option) => {
                    const isSelected = selectedValue === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => onSelect(option.value)}
                            className={`flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all md:px-6 md:py-5 ${isSelected
                                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                                }`}
                        >
                            {/* Radio indicator */}
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${isSelected
                                        ? "border-blue-600 bg-blue-600"
                                        : "border-gray-300"
                                    }`}
                            >
                                {isSelected && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                )}
                            </span>

                            {/* Label */}
                                <span
                                    className={`text-base font-medium md:text-lg ${isSelected ? "text-blue-700" : "text-slate-700"
                                        }`}
                                >
                                    {option.label}
                                </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

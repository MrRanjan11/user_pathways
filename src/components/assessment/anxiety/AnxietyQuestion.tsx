"use client";

import { ANSWER_OPTIONS } from "./anxietyConfig";

interface AnxietyQuestionProps {
    index: number; // 0-indexed
    total: number;
    text: string;
    selectedValue: number | null;
    onSelect: (value: number) => void;
}

export default function AnxietyQuestion({
    index,
    total,
    text,
    selectedValue,
    onSelect,
}: AnxietyQuestionProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm md:p-8">
                <p className="text-base font-semibold text-blue-950 md:text-lg">
                    {index + 1}. {text}
                </p>
            </div>

            <div
                className="flex flex-col gap-3"
                role="radiogroup"
                aria-label={`Question ${index + 1} of ${total}`}
            >
                {ANSWER_OPTIONS.map((option) => {
                    const isSelected = selectedValue === option.value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => onSelect(option.value)}
                            className={`flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all md:px-6 md:py-5 ${
                                isSelected
                                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                            }`}
                        >
                            <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                    isSelected
                                        ? "border-blue-600 bg-blue-600"
                                        : "border-gray-300"
                                }`}
                            >
                                {isSelected && (
                                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                )}
                            </span>

                            <span
                                className={`text-[15px] font-medium md:text-base ${
                                    isSelected ? "text-blue-700" : "text-slate-700"
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

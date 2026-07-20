"use client";

import { INTRO_HEADING, INTRO_PARAGRAPHS } from "./anxietyConfig";

interface AnxietyIntroProps {
    onStart: () => void;
}

export default function AnxietyIntro({ onStart }: AnxietyIntroProps) {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm md:p-8">
                <h2 className="text-lg font-bold text-blue-950 md:text-xl">
                    {INTRO_HEADING}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                    {INTRO_PARAGRAPHS.map((para, i) => (
                        <p
                            key={i}
                            className="whitespace-pre-line text-slate-600 leading-relaxed text-[15px] md:text-base"
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onStart}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 active:scale-[0.99] md:px-10 md:py-4 md:text-lg"
                >
                    Start Assessment
                </button>
            </div>
        </div>
    );
}

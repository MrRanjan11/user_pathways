"use client";

import { INTRO_TEXT } from "./assessmentConfig";

interface AssessmentIntroProps {
    onNext: () => void;
}

export default function AssessmentIntro({ onNext }: AssessmentIntroProps) {
    return (
        <div className="flex w-full flex-col gap-6">
            {/* Instruction card – matches DescriptionContent styling */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-950 md:text-2xl">
                    Before You Begin
                </h2>
                <p className="mt-4 whitespace-pre-line text-slate-600 leading-relaxed md:text-lg">
                    {INTRO_TEXT}
                </p>
            </div>

            {/* Next button */}
            <div className="flex justify-end">
                <button
                    onClick={onNext}
                    className="rounded-xl bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/30 md:py-4 md:px-10 md:text-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

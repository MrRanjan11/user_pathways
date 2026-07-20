"use client";

import { useEffect, useRef } from "react";
import { QUESTIONS, RESULT_CONTENT, getSeverity, LANDING_PAGE_URL } from "./anxietyConfig";

interface AnxietyResultProps {
    answers: (number | null)[];
}

export default function AnxietyResult({ answers }: AnxietyResultProps) {
    const topRef = useRef<HTMLDivElement>(null);

    const totalScore = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
    const severity = getSeverity(totalScore);
    const content = RESULT_CONTENT[severity];

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div ref={topRef} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm md:p-8 animate-fade-in-up">
                <h2 className="text-lg font-bold text-blue-950 md:text-xl">
                    Your Results
                </h2>
                <p className="mt-2 text-slate-600 text-[15px] md:text-base">
                    Your total anxiety score is{" "}
                    <span className="font-semibold text-blue-600">{totalScore}</span>{" "}
                    out of {QUESTIONS.length * 3}.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 animate-fade-in-up delay-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={content.imageUrl}
                    alt={content.title}
                    className="mx-auto h-40 w-auto object-contain md:h-52 animate-zoom-in delay-200"
                />

                <h4
                    style={{ fontSize: 14, fontWeight: 400 }}
                    className="mt-6 text-center animate-fade-in-up delay-300"
                >
                    Your assessment results suggest that you are suffering from{" "}
                    <b>{content.title}</b>.{" "}
                    {severity === "low"
                        ? "MantraCare can help you connect with a therapist based on your needs."
                        : "It is important that you schedule an appointment with a therapist. MantraCare can help you connect with a therapist based on your needs."}
                </h4>

                {/* Landing page CTA */}
                <div className="mt-6 flex justify-center px-2 animate-fade-in-up delay-400">
                    <a
                        href={LANDING_PAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-center text-[15px] font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 active:scale-[0.99] md:py-4 md:text-base"
                    >
                        {severity === "low" ? "Learn More" : "Book a Therapist"}
                    </a>
                </div>

                <h4
                    style={{ fontSize: 14, fontWeight: 400 }}
                    className="mt-4 text-center animate-fade-in-up delay-400"
                >
                    Research suggests that methods such as meditation, yoga and deep
                    breathing help improve mental health. To practice these methods,
                    download free{" "}
                    <a
                        href="https://play.google.com/store/apps/details?id=org.mantracare.therapy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 underline"
                    >
                        TherapyMantra app
                    </a>
                    .
                </h4>
            </div>
        </div>
    );
}

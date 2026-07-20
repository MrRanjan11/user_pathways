"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { QUESTIONS, getSeverity } from "./anxietyConfig";
import AnxietyIntro from "./AnxietyIntro";
import AnxietyProgress from "./AnxietyProgress";
import AnxietyQuestion from "./AnxietyQuestion";
import AnxietyNavigation from "./AnxietyNavigation";
import AnxietyResult from "./AnxietyResult";
import { ensureAssessmentTable, saveAssessmentResult } from "@/lib/assessmentDb";

type Step = "intro" | "question" | "result";

export default function AnxietyFlow() {
    const searchParams = useSearchParams();

    const [step, setStep] = useState<Step>("intro");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(
        new Array(QUESTIONS.length).fill(null)
    );
    const [attemptedNext, setAttemptedNext] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const webhookFiredRef = useRef(false);
    const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );
    const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );

    useEffect(() => {
        // Ensure DB table exists (idempotent, non-blocking)
        ensureAssessmentTable().catch((err) =>
            console.warn("Failed to ensure assessment table:", err)
        );

        return () => {
            if (advanceTimerRef.current) {
                clearTimeout(advanceTimerRef.current);
            }
            if (transitionTimerRef.current) {
                clearTimeout(transitionTimerRef.current);
            }
        };
    }, []);

    // Smoothly fade out, swap the question, then fade back in.
    const goToQuestion = useCallback((target: number) => {
        if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current);
        }
        setIsTransitioning(true);
        transitionTimerRef.current = setTimeout(() => {
            setQuestionIndex(target);
            transitionTimerRef.current = setTimeout(() => {
                setIsTransitioning(false);
                transitionTimerRef.current = undefined;
            }, 20);
        }, 220);
    }, []);

    const handleStart = useCallback(() => {
        setStep("question");
        setQuestionIndex(0);
        setAttemptedNext(false);
    }, []);

    const handleSelect = useCallback(
        (value: number) => {
            setAnswers((prev) => {
                const next = [...prev];
                next[questionIndex] = value;
                return next;
            });
            setAttemptedNext(false);

            // Auto-advance to the next question after a short delay, but never
            // auto-submit the final question.
            if (questionIndex < QUESTIONS.length - 1) {
                if (advanceTimerRef.current) {
                    clearTimeout(advanceTimerRef.current);
                }
                advanceTimerRef.current = setTimeout(() => {
                    goToQuestion(Math.min(questionIndex + 1, QUESTIONS.length - 1));
                    advanceTimerRef.current = undefined;
                }, 400);
            }
        },
        [questionIndex, goToQuestion]
    );

    const cancelAutoAdvance = useCallback(() => {
        if (advanceTimerRef.current) {
            clearTimeout(advanceTimerRef.current);
            advanceTimerRef.current = undefined;
        }
    }, []);

    const handleNext = useCallback(() => {
        cancelAutoAdvance();
        if (answers[questionIndex] === null) {
            setAttemptedNext(true);
            return;
        }
        setAttemptedNext(false);
        goToQuestion(Math.min(questionIndex + 1, QUESTIONS.length - 1));
    }, [answers, questionIndex, cancelAutoAdvance, goToQuestion]);

    const handlePrevious = useCallback(() => {
        cancelAutoAdvance();
        setAttemptedNext(false);
        goToQuestion(Math.max(questionIndex - 1, 0));
    }, [questionIndex, cancelAutoAdvance, goToQuestion]);

    const fireWebhook = useCallback(
        async (score: number) => {
            if (webhookFiredRef.current) return;
            webhookFiredRef.current = true;

            const activityId = searchParams.get("activity_id") ?? "";
            const upaId = searchParams.get("upa_id") ?? "";
            const userId = searchParams.get("user_id") ?? "";

            try {
                await fetch("https://api.mantracare.org/webhook/assessment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        activity_id: activityId,
                        upa_id: upaId,
                        score: String(score),
                        user_id: userId,
                    }),
                });
            } catch (err) {
                // Log webhook failures silently; never block the result screen.
                console.warn("Assessment webhook failed (non-blocking):", err);
            }
        },
        [searchParams]
    );

    const handleSubmit = useCallback(async () => {
        if (answers.some((a) => a === null)) {
            setAttemptedNext(true);
            return;
        }

        setSubmitting(true);
        const score = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
        const severity = getSeverity(score);
        const userId = sessionStorage.getItem("user_id") ?? searchParams.get("user_id") ?? "unknown";

        // Save to DB in parallel
        saveAssessmentResult({
            userId,
            assessmentType: "anxiety",
            responses: { raw: answers },
            results: { score, severity },
            metadata: {
                activityId: searchParams.get("activity_id"),
                upaId: searchParams.get("upa_id"),
            },
        }).catch((err) => console.error("Failed to save to DB:", err));

        // Trigger webhook in parallel with rendering the result (fire and forget).
        void fireWebhook(score);
        setSubmitting(false);
        setStep("result");
    }, [answers, fireWebhook, searchParams]);

    if (step === "intro") {
        return <AnxietyIntro onStart={handleStart} />;
    }

    if (step === "result") {
        return <AnxietyResult answers={answers} />;
    }

    const isFirst = questionIndex === 0;
    const isLast = questionIndex === QUESTIONS.length - 1;
    const hasAnswer = answers[questionIndex] !== null;

    return (
        <div className="flex flex-col gap-6">
            <AnxietyProgress
                current={questionIndex + 1}
                total={QUESTIONS.length}
            />

            <div
                key={questionIndex}
                className={`transition-all duration-300 ease-out ${isTransitioning
                    ? "translate-x-3 opacity-0"
                    : "translate-x-0 opacity-100 animate-fade-slide-in"
                    }`}
            >
                <AnxietyQuestion
                    index={questionIndex}
                    total={QUESTIONS.length}
                    text={QUESTIONS[questionIndex].text}
                    selectedValue={answers[questionIndex]}
                    onSelect={handleSelect}
                />
            </div>

            <AnxietyNavigation
                showPrevious={!isFirst}
                isLastQuestion={isLast}
                canProceed={hasAnswer && !submitting}
                showValidation={attemptedNext}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

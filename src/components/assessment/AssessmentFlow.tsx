"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QUESTIONS, getSeverity, ANSWER_OPTIONS } from "./assessmentConfig";
import type { Category } from "./assessmentConfig";
import AssessmentIntro from "./AssessmentIntro";
import AssessmentProgress from "./AssessmentProgress";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentNavigation from "./AssessmentNavigation";
import AssessmentResult from "./AssessmentResult";
import { ensureAssessmentTable, saveAssessmentResult } from "@/lib/assessmentDb";

type Step = "intro" | "question" | "result";

export default function AssessmentFlow() {
    const searchParams = useSearchParams();

    const [step, setStep] = useState<Step>("intro");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(
        new Array(QUESTIONS.length).fill(null)
    );
    const [submitting, setSubmitting] = useState(false);
    const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        // Ensure DB table exists (idempotent, non-blocking)
        ensureAssessmentTable().catch((err) =>
            console.warn("Failed to ensure assessment table:", err)
        );

        return () => {
            if (advanceTimerRef.current) {
                clearTimeout(advanceTimerRef.current);
            }
        };
    }, []);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleIntroNext = useCallback(() => {
        setStep("question");
        setQuestionIndex(0);
    }, []);

    const handleSelect = useCallback(
        (value: number) => {
            setAnswers((prev) => {
                const next = [...prev];
                next[questionIndex] = value;
                return next;
            });

            if (questionIndex < QUESTIONS.length - 1) {
                if (advanceTimerRef.current) {
                    clearTimeout(advanceTimerRef.current);
                }
                advanceTimerRef.current = setTimeout(() => {
                    setQuestionIndex((i) => i + 1);
                    advanceTimerRef.current = undefined;
                }, 300);
            }
        },
        [questionIndex]
    );

    const handleNext = useCallback(() => {
        if (questionIndex < QUESTIONS.length - 1) {
            setQuestionIndex((i) => i + 1);
        }
    }, [questionIndex]);

    const handlePrevious = useCallback(() => {
        if (questionIndex > 0) {
            setQuestionIndex((i) => i - 1);
        }
    }, [questionIndex]);

    const handleSubmit = useCallback(async () => {
        setSubmitting(true);

        // Calculate scores
        const scores: Record<Category, number> = {
            anxiety: 0,
            depression: 0,
            stress: 0,
        };
        QUESTIONS.forEach((q, idx) => {
            scores[q.category] += answers[idx] ?? 0;
        });

        // Determine severities
        const severities = {
            anxiety: getSeverity(scores.anxiety),
            depression: getSeverity(scores.depression),
            stress: getSeverity(scores.stress),
        };

        // Log for debugging
        console.log("Assessment Scores:", scores);
        console.log("Severities:", severities);

        const upaId = searchParams.get("upa_id") ?? "";
        const activityId = searchParams.get("activity_id") ?? "";
        const userId = sessionStorage.getItem("user_id") ?? searchParams.get("user_id") ?? "unknown";

        const detailedResponses = answers.map((val, idx) => ({
            question: QUESTIONS[idx].text,
            category: QUESTIONS[idx].category,
            value: val,
            label: ANSWER_OPTIONS.find(o => o.value === val)?.label ?? "Unknown"
        }));

        // Save to DB in parallel
        saveAssessmentResult({
            userId,
            assessmentType: "dass",
            responses: { detailed: detailedResponses, raw: answers },
            results: { scores, severities },
            metadata: { activityId, upaId },
        }).catch((err) => console.error("Failed to save to DB:", err));

        try {
            await fetch("https://api.mantracare.org/webhook/assessment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    upa_id: upaId,
                    activity_id: activityId,
                    user_id: userId,
                    scores,
                    severities,
                }),
            });
        } catch (err) {
            console.warn("Webhook failed (non-blocking):", err);
        }

        setSubmitting(false);
        setStep("result");
    }, [answers, searchParams]);

    // ── Render ────────────────────────────────────────────────────────────────

    if (step === "intro") {
        return <AssessmentIntro onNext={handleIntroNext} />;
    }

    if (step === "result") {
        return <AssessmentResult answers={answers} />;
    }

    // Question step
    const currentQuestion = QUESTIONS[questionIndex];
    const isFirst = questionIndex === 0;
    const isLast = questionIndex === QUESTIONS.length - 1;
    const hasAnswer = answers[questionIndex] !== null;

    return (
        <div className="flex flex-col gap-6">
            <AssessmentProgress
                current={questionIndex + 1}
                total={QUESTIONS.length}
            />

            <div key={questionIndex} className="animate-fade-slide-in">
                <AssessmentQuestion
                    question={currentQuestion}
                    selectedValue={answers[questionIndex]}
                    onSelect={handleSelect}
                />
            </div>

            <AssessmentNavigation
                showPrevious={!isFirst}
                isLastQuestion={isLast}
                canProceed={hasAnswer && !submitting}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

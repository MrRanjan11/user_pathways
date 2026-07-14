// ─── DASS Assessment Configuration ───────────────────────────────────────────
// All questions, options, severity thresholds, and result content are defined
// here so they can be modified without changing assessment logic.

export type Category = "anxiety" | "depression" | "stress";
export type Severity = "mild" | "moderate" | "severe";

export interface AnswerOption {
    label: string;
    value: number;
}

export interface Question {
    id: number;
    text: string;
    category: Category;
}

export interface SeverityRange {
    min: number;
    max: number;
}

export interface ResultContent {
    title: string;
    colorClass: string;
    imageUrl: string;
    boldText: string;
    paragraphs: string[];
}

// ─── Answer options (same for all questions) ─────────────────────────────────
export const ANSWER_OPTIONS: AnswerOption[] = [
    { label: "Not at all", value: 0 },
    { label: "Sometimes", value: 1 },
    { label: "Often", value: 2 },
    { label: "Almost always", value: 3 },
];

// ─── Questions ───────────────────────────────────────────────────────────────
// Q1–3: Anxiety, Q4–6: Depression, Q7–9: Stress
export const QUESTIONS: Question[] = [
    { id: 1, text: "I was about to panic", category: "anxiety" },
    { id: 2, text: "I felt my heart beating fast even though I had not made any physical effort", category: "anxiety" },
    { id: 3, text: "I was afraid for no reason", category: "anxiety" },
    { id: 4, text: "I felt that nothing could make me feel excited", category: "depression" },
    { id: 5, text: "I felt sad and depressed", category: "depression" },
    { id: 6, text: "I could not get enthusiastic about anything", category: "depression" },
    { id: 7, text: "I had a hard time relaxing", category: "stress" },
    { id: 8, text: "I felt restless", category: "stress" },
    { id: 9, text: "I found it difficult to calm down after something upset me", category: "stress" },
];

// ─── Severity thresholds (configurable) ──────────────────────────────────────
export const SEVERITY_THRESHOLDS: Record<Severity, SeverityRange> = {
    mild: { min: 0, max: 3 },
    moderate: { min: 4, max: 6 },
    severe: { min: 7, max: 9 },
};

export function getSeverity(score: number): Severity {
    if (score <= SEVERITY_THRESHOLDS.mild.max) return "mild";
    if (score <= SEVERITY_THRESHOLDS.moderate.max) return "moderate";
    return "severe";
}

// ─── Category display labels ────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<Category, string> = {
    anxiety: "Anxiety",
    depression: "Depression",
    stress: "Stress",
};

// ─── Result content per category × severity ──────────────────────────────────
export const RESULT_CONTENT: Record<Category, Record<Severity, ResultContent>> = {
    anxiety: {
        mild: {
            title: "Anxiety Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Mild.png",
            boldText: "You may be feeling a little more tense or worried than usual.",
            paragraphs: [
                "This level of anxiety is often manageable with small lifestyle adjustments, stress relief techniques, or talking things through with someone.",
                "If it lingers or starts to affect your focus, it might be worth exploring further.",
            ],
        },
        moderate: {
            title: "Anxiety Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Moderate.png",
            boldText: "Your anxiety may be interfering with your daily activities.",
            paragraphs: [
                "You might be feeling regularly nervous, on edge, or having physical symptoms like restlessness or trouble sleeping.",
                "A mental health professional can help you understand where this is coming from and how to manage it.",
            ],
        },
        severe: {
            title: "Anxiety Level",
            colorClass: "red",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Severe.png",
            boldText: "Your score suggests a high level of anxiety.",
            paragraphs: [
                "You may be experiencing persistent worry, difficulty relaxing, or physical symptoms like a racing heart or shallow breathing.",
                "A mental health professional can help you understand where this is coming from and how to manage it.",
            ],
        },
    },
    depression: {
        mild: {
            title: "Depression Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Mild.png",
            boldText: "You may be experiencing mild symptoms of low mood.",
            paragraphs: [
                "This level is often manageable through self-care, staying connected with loved ones, and maintaining healthy routines.",
                "If these feelings persist or worsen, consider reaching out to a mental health professional.",
            ],
        },
        moderate: {
            title: "Depression Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Moderate.png",
            boldText: "Your mood may be significantly affecting your daily life.",
            paragraphs: [
                "You might be feeling a persistent lack of motivation, changes in sleep or appetite, or difficulty finding enjoyment in things you used to love.",
                "A mental health professional can help you understand where this is coming from and how to manage it.",
            ],
        },
        severe: {
            title: "Depression Level",
            colorClass: "red",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Severe.png",
            boldText: "Your score suggests a high level of depression.",
            paragraphs: [
                "You may be experiencing deep sadness, hopelessness, withdrawal from activities, or difficulty functioning day-to-day.",
                "A mental health professional can help you understand where this is coming from and how to manage it.",
            ],
        },
    },
    stress: {
        mild: {
            title: "Stress Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Mild.png",
            boldText: "You may be dealing with a mild level of stress.",
            paragraphs: [
                "This is common and often manageable with relaxation techniques, regular breaks, and healthy boundaries.",
                "If it starts to build up, consider proactive steps to manage it before it escalates.",
            ],
        },
        moderate: {
            title: "Stress Level",
            colorClass: "orange",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Moderate.png",
            boldText: "Your stress levels may be impacting your wellbeing.",
            paragraphs: [
                "You might be feeling overwhelmed, irritable, or physically tense on a regular basis.",
                "A mental health professional can help you develop effective coping strategies tailored to your situation.",
            ],
        },
        severe: {
            title: "Stress Level",
            colorClass: "red",
            imageUrl: "https://therapymantra.co/wp-content/uploads/2025/08/Severe.png",
            boldText: "Your score suggests a high level of stress.",
            paragraphs: [
                "You may be feeling constantly overwhelmed, unable to relax, or experiencing physical symptoms like headaches, muscle tension, or fatigue.",
                "A mental health professional can help you understand where this is coming from and how to manage it.",
            ],
        },
    },
};

// ─── Intro text ──────────────────────────────────────────────────────────────
export const INTRO_TEXT =
    "Please read each statement and select a number (0, 1, 2, or 3) that indicates how much the statement applied to you over the past week. There are no right or wrong answers. Please do not spend too much time on any statement.";

// ─── Anxiety Assessment Configuration ─────────────────────────────────────────
// Single-dimension (anxiety) assessment modelled on the DASS Anxiety scale.
// One cumulative score drives the result band (Low / Mild / Moderate / Severe).

export interface AnswerOption {
    label: string;
    value: number;
}

export interface Question {
    id: number;
    text: string;
}

export type AnxietySeverity = "low" | "mild" | "moderate" | "severe";

// ─── Answer options (same for every question) ─────────────────────────────────
export const ANSWER_OPTIONS: AnswerOption[] = [
    { label: "Not At All", value: 0 },
    { label: "Several Days", value: 1 },
    { label: "More Than Half the days", value: 2 },
    { label: "Nearly Everyday", value: 3 },
];

// ─── Questions (DASS anxiety items) ───────────────────────────────────────────
export const QUESTIONS: Question[] = [
    { id: 1, text: "Feeling nervous, anxious, or on edge" },
    { id: 2, text: "Not being able to stop or control worrying" },
    { id: 3, text: "Worrying too much about different things" },
    { id: 4, text: "Trouble relaxing" },
    { id: 5, text: "Being so restless that it's hard to sit still" },
    { id: 6, text: "Becoming easily annoyed or irritable" },
    { id: 7, text: "Feeling afraid as if something awful might happen" },
];

// ─── Severity bands (single total score, 0–42) ─────────────────────────────────
export function getSeverity(score: number): AnxietySeverity {
    if (score <= 4) return "low";
    if (score <= 9) return "mild";
    if (score <= 14) return "moderate";
    return "severe";
}

// ─── Result content per severity band ──────────────────────────────────────────
export interface ResultContent {
    title: string;
    imageUrl: string;
    boldText: string;
    paragraphs: string[];
}

export const RESULT_CONTENT: Record<AnxietySeverity, ResultContent> = {
    low: {
        title: "Low Anxiety Issues",
        imageUrl: "https://mymindtest.com/wp-content/uploads/2024/10/low.png",
        boldText:
            "Your assessment results suggest that you are suffering from Low Anxiety Issues.",
        paragraphs: [
            "MantraCare can help you connect with a therapist based on your needs.",
            "Research suggests that methods such as meditation, yoga and deep breathing help improve mental health. To practice these methods, download free TherapyMantra app.",
        ],
    },
    mild: {
        title: "Mild Anxiety Issues",
        imageUrl: "https://mymindtest.com/wp-content/uploads/2024/10/Mild.png",
        boldText:
            "Your assessment results suggest that you are suffering from Mild Anxiety Issues.",
        paragraphs: [
            "It is important that you schedule an appointment with a therapist. MantraCare can help you connect with a therapist based on your needs.",
            "Research suggests that methods such as meditation, yoga and deep breathing help improve mental health. To practice these methods, download free TherapyMantra app.",
        ],
    },
    moderate: {
        title: "Moderate Anxiety Issues",
        imageUrl: "https://mymindtest.com/wp-content/uploads/2024/10/Moderate.png",
        boldText:
            "Your assessment results suggest that you are suffering from Moderate Anxiety Issues.",
        paragraphs: [
            "It is important that you schedule an appointment with a therapist. MantraCare can help you connect with a therapist based on your needs.",
            "Research suggests that methods such as meditation, yoga and deep breathing help improve mental health. To practice these methods, download free TherapyMantra app.",
        ],
    },
    severe: {
        title: "Severe Anxiety Issues",
        imageUrl: "https://mymindtest.com/wp-content/uploads/2024/10/severe.png",
        boldText:
            "Your assessment results suggest that you are suffering from Severe Anxiety Issues.",
        paragraphs: [
            "It is important that you schedule an appointment with a therapist. MantraCare can help you connect with a therapist based on your needs.",
            "Research suggests that methods such as meditation, yoga and deep breathing help improve mental health. To practice these methods, download free TherapyMantra app.",
        ],
    },
};

// ─── Configurable landing page (CTA on result screens) ─────────────────────────
export const LANDING_PAGE_URL = "https://therapymantra.co/";

// ─── Intro text ────────────────────────────────────────────────────────────────
export const INTRO_HEADING = "Anxiety Assessment";

export const INTRO_PARAGRAPHS: string[] = [
    "This scale is here to help you better understand what you might be feeling and how anxiety may be affecting your well-being. It’s meant to offer some clarity and guidance.",
    "Take your time to go through each statement and select the response that feels most accurate for you. Be honest with yourself—there are no right or wrong answers. This is simply a tool to help you understand your experience better.",
];

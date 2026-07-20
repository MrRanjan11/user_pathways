import sql from "./db";

/**
 * Ensures the `assessment_results` table exists.
 * Called once at app startup (idempotent).
 */
export async function ensureAssessmentTable(): Promise<void> {
    await sql`
        CREATE TABLE IF NOT EXISTS assessment_results (
            id              SERIAL PRIMARY KEY,
            user_id         TEXT NOT NULL,
            assessment_type TEXT NOT NULL,
            responses       JSONB NOT NULL,
            results         JSONB NOT NULL,
            metadata        JSONB DEFAULT '{}'::jsonb,
            created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `;
}

export interface SaveAssessmentPayload {
    userId: string;
    assessmentType: "anxiety" | "dass";
    responses: Record<string, unknown>;
    results: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}

/**
 * Saves a completed assessment to the database.
 * Non-blocking – callers should fire-and-forget.
 */
export async function saveAssessmentResult(
    payload: SaveAssessmentPayload
): Promise<void> {
    const { userId, assessmentType, responses, results, metadata = {} } = payload;

    await sql`
        INSERT INTO assessment_results (user_id, assessment_type, responses, results, metadata)
        VALUES (
            ${userId},
            ${assessmentType},
            ${JSON.stringify(responses)}::jsonb,
            ${JSON.stringify(results)}::jsonb,
            ${JSON.stringify(metadata)}::jsonb
        )
    `;
}

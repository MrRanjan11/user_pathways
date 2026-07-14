import type { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import AssessmentFlow from "@/components/assessment/AssessmentFlow";

export const metadata: Metadata = {
    title: "Emotional Well-Being Assessment",
    description:
        "Take a quick 9-question assessment to evaluate your anxiety, depression, and stress levels.",
};

export default function DassAssessmentPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">
                {/* Header */}
                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="Emotional Well-Being Assessment" />
                </div>

                {/* Assessment (client component, wrapped in Suspense for useSearchParams) */}
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-16">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                        </div>
                    }
                >
                    <AssessmentFlow />
                </Suspense>
            </div>
        </main>
    );
}

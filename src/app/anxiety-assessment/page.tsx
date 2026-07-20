import type { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import AnxietyFlow from "@/components/assessment/anxiety/AnxietyFlow";

export const metadata: Metadata = {
    title: "Anxiety Assessment",
    description:
        "Take a quick anxiety assessment to understand how anxiety may be affecting your well-being.",
};

export default function AnxietyAssessmentPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">
                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="Anxiety Assessment" />
                </div>

                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-16">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                        </div>
                    }
                >
                    <AnxietyFlow />
                </Suspense>
            </div>
        </main>
    );
}

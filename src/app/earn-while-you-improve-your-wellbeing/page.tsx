import type { Metadata } from "next";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import DescriptionContent from "@/components/how-it-works/DescriptionContent";

export const metadata: Metadata = {
    title: "Earn While You Improve Your Wellbeing",
    description: "Complete activities, earn points, and redeem them for wellness services across Mantra.",
};

export default function EarnWhileYouImproveWellbeingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">

                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="Earn While You Improve Your Wellbeing" />
                </div>

                <DescriptionContent
                    title="Earn While You Improve Your Wellbeing"
                    description="Your wellbeing comes first—that's our only goal. When you start, you choose a pathway based on your condition, and we assign you a 60-day personalized plan. Every day, new guided activities are added to support your progress.

Complete activities, earn points, and redeem them for wellness services across Mantra—therapy, yoga, fitness, coaching, doctor consultations, and more.

Keep going. Every small step counts. 🌱"
                />
            </div>
        </main>
    );
}

import type { Metadata } from "next";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import DescriptionContent from "@/components/how-it-works/DescriptionContent";

export const metadata: Metadata = {
    title: "Create Your Personalized Wellbeing Plan",
    description: "Learn how to build a personalized recovery plan tailored to your needs with Mantra.",
};

export default function CreatePersonalizedWellbeingPlanPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">

                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="Create Your Personalized Wellbeing Plan" />
                </div>

                <DescriptionContent
                    title="Create Your Personalized Wellbeing Plan"
                    description="Mantra lets you build a personalized recovery plan tailored to your needs. Simply go to Pathways and select your condition—such as depression, stress, anxiety, ADHD, OCD, or more.

Each plan is expert-designed by psychologists after in-depth research and includes daily guided activities to support your recovery. Just return to the app each day, complete your activities, and track your progress.

98% of users found these plans helpful, helping them recover and move toward a happier, healthier life. 💙"
                />
            </div>
        </main>
    );
}

import type { Metadata } from "next";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import DescriptionContent from "@/components/how-it-works/DescriptionContent";

export const metadata: Metadata = {
    title: "How can Therapy Help",
    description: "Discover how therapy helps you understand emotions, gain clarity, and learn healthier ways to cope.",
};

export default function HowCanTherapyHelpPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">

                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="How can Therapy Help" />
                </div>

                <DescriptionContent
                    title="How can Therapy Help"
                    description="Therapy helps you understand your emotions, gain clarity, and learn healthier ways to cope—without judgment. With the right support, it helps you manage stress and anxiety, break negative thought patterns, regulate emotions, and feel more in control of your life.

At TherapyMantra, our certified therapists use evidence-based approaches like CBT and DBT, along with regular check-ins, practical tools, and personalized action plans, to help you move beyond talking—towards real, lasting change.

We believe mental health care should be accessible to all. That's why we offer affordable plans, financial aid, and an option to take sessions with psychology trainees at up to 1/10th the cost. 💙"
                />
            </div>
        </main>
    );
}

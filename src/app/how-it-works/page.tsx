import type { Metadata } from "next";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import VideoEmbed from "@/components/how-it-works/VideoEmbed";

export const metadata: Metadata = {
    title: "How It Works",
    description: "Step by step app walkthrough",
};

export default function HowItWorksPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">

                {/* Header Row: Back button is on the far left, title is centered */}
                <div className="grid grid-cols-[3rem_1fr_3rem] items-center">
                    <div className="flex justify-start">
                        <BackButton />
                    </div>
                    <div className="flex justify-center flex-1">
                        <HowItWorksHeading />
                    </div>
                    <div className="flex justify-end"></div>
                </div>

                <VideoEmbed />
            </div>
        </main>
    );
}

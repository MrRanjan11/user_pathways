import type { Metadata } from "next";
import BackButton from "@/components/how-it-works/BackButton";
import HowItWorksHeading from "@/components/how-it-works/HowItWorksHeading";
import VideoEmbed from "@/components/how-it-works/VideoEmbed";

export const metadata: Metadata = {
    title: "How to Book a Session with Your Expert",
    description: "Step by step guide on how to book a session with an expert",
};

export default function BookSessionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 md:py-12 lg:py-16">
            <div className="flex w-full max-w-[750px] flex-col gap-6 md:gap-10">

                {/* Header Row: Back button is on the far left, title is directly next to it */}
                <div className="flex w-full items-center gap-4">
                    <BackButton />
                    <HowItWorksHeading title="How to Book a Session with Your Expert" />
                </div>

                <VideoEmbed
                    videoId="qVDdQS5oUUo"
                    caption=""
                />
            </div>
        </main>
    );
}

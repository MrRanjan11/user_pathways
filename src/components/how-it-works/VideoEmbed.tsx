export default function VideoEmbed({
    videoId = "oEI40KlZtIw",
    caption = "Step by step app walkthrough"
}: {
    videoId?: string;
    caption?: string;
}) {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="w-full max-w-[750px] overflow-hidden rounded-2xl shadow-2xl">
                <div className="aspect-video w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Video Embed"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0"
                    />
                </div>
            </div>
            {caption && (
                <p className="text-center text-sm text-blue-600 md:text-base">
                    {caption}
                </p>
            )}
        </div>
    );
}

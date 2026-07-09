export default function HowItWorksHeading({ title = "How It Works" }: { title?: string }) {
    return (
        <h1 className="text-left text-2xl font-bold tracking-tight text-blue-950 md:text-3xl lg:text-4xl">
            {title}
        </h1>
    );
}

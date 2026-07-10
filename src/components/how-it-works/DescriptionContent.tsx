"use client";

export default function DescriptionContent({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
        <h2 className="text-xl font-bold text-blue-950 md:text-2xl">{title}</h2>
        <p className="mt-4 whitespace-pre-line text-slate-600 leading-relaxed md:text-lg">{description}</p>
      </div>
    </div>
  );
}

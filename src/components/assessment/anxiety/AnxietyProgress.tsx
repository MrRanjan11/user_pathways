"use client";

interface AnxietyProgressProps {
    current: number; // 1-indexed question number
    total: number;
}

export default function AnxietyProgress({
    current,
    total,
}: AnxietyProgressProps) {
    const pct = (current / total) * 100;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                <span>
                    Question <span className="text-blue-600">{current}</span> of {total}
                </span>
                <span className="text-blue-600">{Math.round(pct)}%</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

"use client";

interface AssessmentProgressProps {
    current: number; // 1-indexed
    total: number;
}

export default function AssessmentProgress({
    current,
    total,
}: AssessmentProgressProps) {
    const pct = (current / total) * 100;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                <span>
                    Question <span className="text-blue-600">{current}</span> of {total}
                </span>
                <span className="text-blue-600">{Math.round(pct)}%</span>
            </div>

            {/* Track */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

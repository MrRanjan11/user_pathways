"use client";

interface AssessmentNavigationProps {
    showPrevious: boolean;
    isLastQuestion: boolean;
    canProceed: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export default function AssessmentNavigation({
    showPrevious,
    isLastQuestion,
    canProceed,
    onPrevious,
    onNext,
    onSubmit,
}: AssessmentNavigationProps) {
    return (
        <div className="flex flex-col gap-3 pt-2">
            {showPrevious ? (
                <div className="flex flex-row gap-3">
                    {/* Previous */}
                    <button
                        onClick={onPrevious}
                        className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base font-medium text-slate-600 transition-all hover:scale-[1.01] hover:border-blue-200 hover:bg-blue-50/40 active:scale-[0.99] cursor-pointer md:px-6 md:py-4 md:text-lg"
                    >
                        Previous
                    </button>

                    {/* Next / Submit */}
                    {isLastQuestion ? (
                        <button
                            onClick={onSubmit}
                            disabled={!canProceed}
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer md:px-6 md:py-4 md:text-lg"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={onNext}
                            disabled={!canProceed}
                            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer md:px-6 md:py-4 md:text-lg"
                        >
                            Next
                        </button>
                    )}
                </div>
            ) : (
                /* First question - Next/Submit full width */
                isLastQuestion ? (
                    <button
                        onClick={onSubmit}
                        disabled={!canProceed}
                        className="w-full rounded-xl bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer md:px-10 md:py-4 md:text-lg"
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        disabled={!canProceed}
                        className="w-full rounded-xl bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer md:px-10 md:py-4 md:text-lg"
                    >
                        Next
                    </button>
                )
            )}
        </div>
    );
}

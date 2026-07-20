"use client";

interface AnxietyNavigationProps {
    showPrevious: boolean;
    isLastQuestion: boolean;
    canProceed: boolean;
    showValidation: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export default function AnxietyNavigation({
    showPrevious,
    isLastQuestion,
    canProceed,
    showValidation,
    onPrevious,
    onNext,
    onSubmit,
}: AnxietyNavigationProps) {
    const gradientBtn =
        "rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-[15px] font-medium text-white shadow-lg transition-all hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:px-6 md:py-4 md:text-base";

    const outlineBtn =
        "rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-600 transition-all hover:scale-[1.01] hover:border-blue-200 hover:bg-blue-50/40 active:scale-[0.99] md:px-6 md:py-4 md:text-base";

    return (
        <div className="flex flex-col gap-2 pt-2">
            {showValidation && !canProceed && (
                <p
                    role="alert"
                    className="text-center text-sm font-medium text-red-500"
                >
                    Please select an answer before continuing.
                </p>
            )}

            {showPrevious ? (
                <div className="flex flex-row gap-3">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className={`${outlineBtn} w-1/2`}
                    >
                        Previous
                    </button>

                    {isLastQuestion ? (
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={!canProceed}
                            className={`${gradientBtn} w-1/2`}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onNext}
                            disabled={!canProceed}
                            className={`${gradientBtn} w-1/2`}
                        >
                            Next
                        </button>
                    )}
                </div>
            ) : isLastQuestion ? (
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canProceed}
                    className={`${gradientBtn} w-full`}
                >
                    Submit
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`${gradientBtn} w-full`}
                >
                    Next
                </button>
            )}
        </div>
    );
}

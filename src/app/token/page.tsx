export default function TokenPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center shadow-lg md:max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Authentication Required</h1>
                <p className="mt-2 text-slate-600">
                    We couldn't verify your session. Please access this app through the MantraCare portal to re-authenticate securely.
                </p>
            </div>
        </div>
    );
}

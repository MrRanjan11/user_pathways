import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

      <div className="w-full max-w-4xl text-left">
        {/* Subtle badge */}
        <div className="mb-6 flex max-w-fit items-center justify-start space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
          <p className="text-sm font-semibold text-blue-600">
            Welcome to User Pathways
          </p>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Navigate Your App's <span className="text-blue-600">Journey Simply</span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-lg text-slate-600 sm:text-xl md:mt-6">
          Explore comprehensive guides, step-by-step walkthroughs, and seamless navigational flows
          to maximize your product's potential and empower users effortlessly.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-start gap-4 sm:flex-row sm:flex-wrap">

          <div className="w-full sm:w-auto rounded-md shadow">
            <Link
              href="/how-it-works"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-8 md:text-lg transition-all shadow-lg hover:shadow-blue-500/30"
            >
              See How It Works
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/how-to-book-a-session-with-your-expert"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border-2 border-blue-100 bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 md:py-4 md:px-8 md:text-lg transition-all"
            >
              Book a Session
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 md:py-4 md:px-8 md:text-lg transition-all"
            >
              Explore Features
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/create-your-personalized-wellbeing-plan"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border-2 border-blue-100 bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 md:py-4 md:px-8 md:text-lg transition-all"
            >
              Create Your Wellbeing Plan
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/how-can-therapy-help"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border-2 border-blue-100 bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 md:py-4 md:px-8 md:text-lg transition-all"
            >
              How can Therapy Help
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <Link
              href="/earn-while-you-improve-your-wellbeing"
              className="flex w-full whitespace-nowrap items-center justify-center rounded-xl border-2 border-blue-100 bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 md:py-4 md:px-8 md:text-lg transition-all"
            >
              Earn While You Improve
            </Link>
          </div>

        </div>
      </div>

    </main>
  );
}

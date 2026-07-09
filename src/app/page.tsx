import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

      <div className="w-full max-w-4xl text-center">
        {/* Subtle badge */}
        <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
          <p className="text-sm font-semibold text-blue-600">
            Welcome to User Pathways
          </p>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Navigate Your App's</span>
          <span className="block text-blue-600">Journey Simply</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl md:mt-8">
          Explore comprehensive guides, step-by-step walkthroughs, and seamless navigational flows
          to maximize your product's potential and empower users effortlessly.
        </p>

        {/* Action Buttons */}
        <div className="mx-auto mt-10 max-w-md sm:flex sm:justify-center sm:gap-4 md:max-w-none">

          <div className="rounded-md shadow">
            <Link
              href="/how-it-works"
              className="flex w-full items-center justify-center rounded-xl border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg transition-all shadow-lg hover:shadow-blue-500/30"
            >
              See How It Works
            </Link>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-xl border-2 border-blue-100 bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 md:py-4 md:px-10 md:text-lg transition-all"
            >
              Explore Features
            </Link>
          </div>

        </div>
      </div>

    </main>
  );
}

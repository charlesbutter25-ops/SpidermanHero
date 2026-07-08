import { useState } from "react";
import { DistanceResponse } from "@shared/api";

export default function Index() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DistanceResponse | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: origin.trim(),
          destination: destination.trim(),
        }),
      });

      const data = (await response.json()) as DistanceResponse;

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to calculate distance");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-foreground overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground flex items-center gap-3">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 6l6 6m0 0l6-6m-6 6v12m0 0l-6-6m6 6l6-6"
                />
              </svg>
              Distance Calculator
            </h1>
            <p className="text-slate-400">
              Calculate the distance and travel time between two locations
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Calculator Card */}
            <div className="bg-card border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-8">
                <form onSubmit={handleCalculate} className="space-y-6">
                  {/* Origin Input */}
                  <div>
                    <label htmlFor="origin" className="block text-sm font-semibold mb-2 text-foreground">
                      Starting Location
                    </label>
                    <input
                      id="origin"
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g., New York, NY or 123 Main St, Boston"
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-foreground placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Arrow Divider */}
                  <div className="flex justify-center">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Destination Input */}
                  <div>
                    <label htmlFor="destination" className="block text-sm font-semibold mb-2 text-foreground">
                      Destination
                    </label>
                    <input
                      id="destination"
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g., Los Angeles, CA or 456 Oak Ave, Denver"
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-foreground placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !origin.trim() || !destination.trim()}
                    className="w-full py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="opacity-25"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        Calculate Distance
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Error Message */}
              {error && (
                <div className="px-8 pb-8">
                  <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Results */}
              {result?.success && result.data && (
                <div className="px-8 pb-8">
                  <div className="bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/30 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Distance Card */}
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm text-slate-400 mb-1">Distance</p>
                        <p className="text-3xl font-bold text-primary">
                          {result.data.distance.text}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {(result.data.distance.value / 1000).toFixed(1)} km
                        </p>
                      </div>

                      {/* Duration Card */}
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm text-slate-400 mb-1">Estimated Travel Time</p>
                        <p className="text-3xl font-bold text-amber-500">
                          {result.data.duration.text}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {Math.round(result.data.duration.value / 60)} minutes
                        </p>
                      </div>
                    </div>

                    {/* Route Summary */}
                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <p className="text-sm text-slate-400 mb-3">Route Summary</p>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <span className="text-primary font-semibold">From:</span>
                          <span className="text-foreground">{result.data.origin}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-amber-500 font-semibold">To:</span>
                          <span className="text-foreground">{result.data.destination}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setResult(null);
                        setOrigin("");
                        setDestination("");
                      }}
                      className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Calculate Another Route
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                {
                  icon: "📍",
                  title: "Accurate Results",
                  desc: "Powered by Google Distance Matrix API",
                },
                {
                  icon: "⚡",
                  title: "Fast Calculations",
                  desc: "Get results instantly",
                },
                {
                  icon: "🌍",
                  title: "Global Coverage",
                  desc: "Works for locations worldwide",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card border border-slate-700/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors backdrop-blur-sm"
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-700/50 mt-12">
          <div className="max-w-2xl mx-auto text-center text-sm text-slate-400">
            <p>
              Data provided by{" "}
              <span className="font-semibold text-foreground">Google Distance Matrix API</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

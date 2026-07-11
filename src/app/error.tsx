"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh min-h-screen bg-blood-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="text-5xl">💥</div>
        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
        <p className="text-sm text-white/50">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all min-h-[48px]"
          style={{ backgroundColor: "var(--vibe-primary)" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

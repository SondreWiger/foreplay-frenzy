import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh min-h-screen bg-blood-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="text-5xl">🔍</div>
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-white/50">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="block w-full py-3 px-6 rounded-xl font-semibold text-white bg-blood-600 hover:bg-blood-500 text-center transition-all min-h-[48px] leading-[48px]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

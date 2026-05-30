import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center text-center px-4">
      <div>
        <div className="text-6xl mb-4">🪔</div>
        <h1 className="font-playfair text-3xl font-semibold text-charcoal mb-2">Page not found</h1>
        <p className="text-warmgray mb-6">This path doesn't exist in our traditions.</p>
        <Link href="/dashboard" className="bg-saffron-500 text-white px-6 py-3 rounded-lg hover:bg-saffron-600 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-[var(--geowags-red)] rounded-full border-t-transparent animate-spin" />
        </div>

        {/* Logo */}
        <span className="text-xl font-display font-bold text-[var(--geowags-red)]">
          GEOWAGS
        </span>

        {/* Loading text */}
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}


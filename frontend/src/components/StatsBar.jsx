export default function StatsBar({ brews }) {
  if (brews.length === 0) return null;

  const totalBrews = brews.length;

  const avgRatio =
    brews.reduce((sum, b) => sum + b.waterAmount / b.coffeeAmount, 0) / totalBrews;

  const methodCounts = brews.reduce((counts, b) => {
    counts[b.method] = (counts[b.method] || 0) + 1;
    return counts;
  }, {});
  const topMethod = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="grid grid-cols-3 divide-x divide-[#EDE3D0]/15 bg-[#2B1B12] rounded-xl border border-[#EDE3D0]/10 overflow-hidden">
      <div className="px-4 py-3 sm:px-6 sm:py-4 text-center">
        <div className="font-mono text-2xl sm:text-3xl text-[#D4A24C] font-bold">
          {totalBrews}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#EDE3D0]/50 mt-1">
          Brews logged
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:py-4 text-center">
        <div className="font-mono text-2xl sm:text-3xl text-[#D4A24C] font-bold">
          1:{avgRatio.toFixed(1)}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#EDE3D0]/50 mt-1">
          Avg ratio
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:py-4 text-center">
        <div className="font-serif text-lg sm:text-xl text-[#D4A24C] leading-tight">
          {topMethod}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#EDE3D0]/50 mt-1">
          Go-to method
        </div>
      </div>
    </div>
  );
}
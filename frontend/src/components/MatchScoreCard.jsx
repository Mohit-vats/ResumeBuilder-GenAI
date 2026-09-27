function getScoreLabel(score) {
  if (score >= 80) return "Strong match";
  if (score >= 60) return "Good match";
  if (score >= 40) return "Partial match";
  return "Needs work";
}

export default function MatchScoreCard({ score = 0 }) {
  const clamped = Math.min(100, Math.max(0, Math.round(score)));

  return (
    <div className="rounded-lg border border-[#1B212B] bg-[#0F131A]/60 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-[#8B94A3]">Match score</p>
          <p className="mt-1 font-serif text-5xl text-[#E7E9EC]">
            {clamped}
            <span className="text-xl text-[#5C6472]">/100</span>
          </p>
          <p className="mt-2 text-sm text-[#E8AA3C]">{getScoreLabel(clamped)}</p>
        </div>

        <div className="w-full sm:w-56">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1B212B]">
            <div
              className="h-full rounded-full bg-[#E8AA3C] transition-all duration-500"
              style={{ width: `${clamped}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

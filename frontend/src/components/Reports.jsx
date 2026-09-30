import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInterview from "../features/ai/hooks/useInterview";
import SectionHeading from "./SectionHeading";

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function Reports() {
  const { reports, getInterviewReports } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    getInterviewReports().catch((error) => {
      console.error("Could not load recent reports", error);
    });
  }, []);

  const recentReports = reports.slice(0, 5);

  return (
    <section className="mx-auto max-w-2xl px-6 pb-16" aria-label="Recent reports">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          title="Recent reports"
          description="Pick up where you left off with your latest resume reviews."
        />
        {reports.length > 5 && (
          <span className="shrink-0 text-xs text-[#8B94A3]">Latest 5</span>
        )}
      </div>

      {recentReports.length === 0 ? (
        <div className="mt-5 rounded-lg border border-dashed border-[#252C37] px-5 py-8 text-center">
          <p className="text-sm text-[#E7E9EC]">Your reports will show up here.</p>
          <p className="mt-1 text-sm text-[#8B94A3]">Compare a resume with a job description to get started.</p>
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-[#1B212B] overflow-hidden rounded-lg border border-[#1B212B] bg-[#0F131A]/60">
          {recentReports.map((report) => (
            <li key={report._id}>
              <button
                type="button"
                onClick={() => navigate(`/report/${report._id}`)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#151B24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8AA3C]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-[#E7E9EC]">
                    {report.title || "Resume review"}
                  </span>
                  <span className="mt-1 block text-xs text-[#8B94A3]">
                    {formatDate(report.createdAt)}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  {Number.isFinite(Number(report.matchScore)) && (
                    <span className="text-sm text-[#E8AA3C]">{Math.round(report.matchScore)}%</span>
                  )}
                  <span aria-hidden="true" className="text-[#5C6472]">→</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

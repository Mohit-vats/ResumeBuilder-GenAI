import SectionHeading from "./SectionHeading";
import SeverityBadge from "./SeverityBadge";

export default function SkillGapList({ skillGaps = [] }) {
  if (!skillGaps.length) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <SectionHeading
        title="Skill gaps"
        description="Areas the job description asks for that your background doesn't clearly cover yet."
      />
      <ul className="mt-5 divide-y divide-[#1B212B] rounded-lg border border-[#1B212B] bg-[#0F131A]/40">
        {skillGaps.map((gap, i) => (
          <li key={i} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <span className="text-sm text-[#E7E9EC]">{gap.skill}</span>
            <SeverityBadge severity={gap.severity} />
          </li>
        ))}
      </ul>
    </section>
  );
}

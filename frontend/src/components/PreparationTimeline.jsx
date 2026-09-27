import { useState } from "react";
import SectionHeading from "./SectionHeading";

function DayTask({ task }) {
  const [done, setDone] = useState(false);

  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={done}
        onChange={() => setDone((d) => !d)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#232A36] bg-[#0F131A] accent-[#E8AA3C]"
      />
      <span className={done ? "text-[#5C6472] line-through" : "text-[#8B94A3]"}>{task}</span>
    </label>
  );
}

export default function PreparationTimeline({ preparationPlan = [] }) {
  if (!preparationPlan.length) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <SectionHeading
        title="Preparation plan"
        description="A day-by-day plan to close the gaps above before your interview."
      />
      <ol className="mt-5 space-y-6">
        {preparationPlan.map((day, idx) => (
          <li key={day.day} className="flex gap-4">
            <div className="flex w-10 shrink-0 flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#232A36] font-serif text-sm text-[#E7E9EC]">
                {day.day}
              </span>
              {idx < preparationPlan.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-[#1B212B]" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm font-medium text-[#E7E9EC]">{day.focus}</p>
              <div className="mt-2 space-y-2">
                {day.tasks.map((task, i) => (
                  <DayTask key={i} task={task} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

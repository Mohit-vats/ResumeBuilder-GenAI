import SectionHeading from "./SectionHeading";
import QuestionAccordion from "./QuestionAccordion";

export default function QuestionSection({ title, description, questions = [] }) {
  if (!questions.length) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <SectionHeading title={title} description={description} />
      <div className="mt-5 rounded-lg border border-[#1B212B] bg-[#0F131A]/40 px-5">
        {questions.map((q, i) => (
          <QuestionAccordion key={i} {...q} />
        ))}
      </div>
    </section>
  );
}

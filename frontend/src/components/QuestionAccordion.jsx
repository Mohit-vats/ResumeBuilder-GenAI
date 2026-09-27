export default function QuestionAccordion({ question, intention, answer }) {
  return (
    <details className="group border-b border-[#1B212B] py-4 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <div>
          <p className="text-sm text-[#E7E9EC]">{question}</p>
          <p className="mt-1 text-xs text-[#5C6472]">{intention}</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="mt-1 h-4 w-4 shrink-0 text-[#5C6472] transition-transform duration-150 group-open:rotate-180"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <p className="mt-3 pr-8 text-sm leading-relaxed text-[#8B94A3]">{answer}</p>
    </details>
  );
}

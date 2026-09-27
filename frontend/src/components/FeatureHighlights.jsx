const FEATURES = [
  {
    title: "Line-by-line match",
    description: "See exactly which requirements your resume covers, and which it doesn't.",
  },
  {
    title: "Plain-language feedback",
    description: "No vague scores — clear notes on what to change and why.",
  },
  {
    title: "Private by default",
    description: "Your documents are used for this comparison only, not stored.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <div className="grid grid-cols-1 divide-y divide-[#1B212B] border-y border-[#1B212B] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="px-6 py-6 first:pl-0 last:pr-0 sm:py-0">
            <h3 className="text-sm font-medium text-[#E7E9EC]">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8B94A3]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

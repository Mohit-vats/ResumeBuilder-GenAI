export default function SectionHeading({ title, description }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-[#E7E9EC]">{title}</h2>
      {description && <p className="mt-1.5 text-sm text-[#8B94A3]">{description}</p>}
    </div>
  );
}

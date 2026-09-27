const STYLES = {
  high: "border-red-500/40 text-red-400",
  medium: "border-[#E8AA3C]/40 text-[#E8AA3C]",
  low: "border-[#232A36] text-[#8B94A3]",
};

const LABELS = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export default function SeverityBadge({ severity = "low" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${
        STYLES[severity] || STYLES.low
      }`}
    >
      {LABELS[severity] || severity}
    </span>
  );
}

export default function TextAreaField({
  id,
  label,
  required = false,
  optional = false,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-[#E7E9EC]">
        <span>
          {label}
          {required && (
            <span className="ml-1 text-[#E8AA3C]" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-normal text-[#5C6472]">Optional</span>}
      </label>

      <textarea
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        className={`mt-2 w-full resize-y rounded-md border bg-[#0F131A] px-3.5 py-3 text-sm text-[#E7E9EC] placeholder:text-[#5C6472] focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500/60 focus:ring-red-500/60"
            : "border-[#232A36] focus:border-[#E8AA3C]/60 focus:ring-[#E8AA3C]/40"
        }`}
        {...props}
      />

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

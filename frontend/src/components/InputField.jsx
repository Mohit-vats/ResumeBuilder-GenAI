const InputField = ({
  label,
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id || name}
        className="mb-2 block text-sm font-medium text-[#B7BFCC]"
      >
        {label}
      </label>

      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-[#252C37] bg-[#0B0E14] px-4 py-3
          text-[#E7E9EC] placeholder-[#626B79] outline-none transition
          focus:border-[#E8AA3C] focus:ring-2 focus:ring-[#E8AA3C]/15"
      />
    </div>
  );
};

export default InputField;

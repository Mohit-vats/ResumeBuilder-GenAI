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
        className="mb-2 block text-sm font-medium text-gray-700"
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
        className="w-full rounded-lg border border-gray-300 px-4 py-3
          text-gray-900 placeholder-gray-400 outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

export default InputField;
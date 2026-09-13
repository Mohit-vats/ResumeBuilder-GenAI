const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full rounded-lg bg-blue-600 px-4 py-3
        font-semibold text-white

        transition-all duration-150
        hover:bg-blue-700
        hover:shadow-md

        active:scale-95
        active:bg-blue-800

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2

        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
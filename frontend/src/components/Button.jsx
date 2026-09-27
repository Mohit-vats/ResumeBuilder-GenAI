export default function Button({
  children,
  type = "button",
  variant = "primary",
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14] focus-visible:ring-[#E8AA3C] disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-[#E8AA3C] text-[#0B0E14] hover:bg-[#F0B959]",
    ghost: "border border-[#232A36] bg-transparent text-[#E7E9EC] hover:border-[#3A4453]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

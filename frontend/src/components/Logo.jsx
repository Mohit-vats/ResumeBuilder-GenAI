export default function Logo({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="4" width="16" height="21" rx="2" stroke="#8B94A3" strokeWidth="1.6" />
      <rect
        x="11"
        y="8"
        width="16"
        height="21"
        rx="2"
        fill="#0B0E14"
        stroke="#E8AA3C"
        strokeWidth="1.6"
      />
      <path
        d="M15.5 18.5L18 21L23 15.5"
        stroke="#E8AA3C"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

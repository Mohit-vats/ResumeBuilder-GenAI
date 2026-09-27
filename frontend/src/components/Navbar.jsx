import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-[#1B212B] bg-[#0B0E14]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-serif text-lg text-[#E7E9EC]">Aligned</span>
        </a>
        <a
          href="#compare"
          className="text-sm text-[#8B94A3] transition-colors hover:text-[#E7E9EC]"
        >
          Start a comparison
        </a>
      </div>
    </header>
  );
}

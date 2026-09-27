import Logo from "./Logo";
import Button from "./Button";

export default function Navbar({ isAuthenticated = false, user, onLogout }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#1B212B] bg-[#0B0E14]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-serif text-lg text-[#E7E9EC]">Aligned</span>
        </a>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#8B94A3] sm:inline">
              {user?.name || user?.email}
            </span>
            <Button variant="ghost" className="px-4 py-2 text-xs" onClick={onLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm text-[#8B94A3] transition-colors hover:text-[#E7E9EC]"
            >
              Log in
            </a>
            <Button href="/register" variant="primary" className="px-4 py-2 text-xs">
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

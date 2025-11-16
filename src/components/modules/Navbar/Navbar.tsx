"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// sheet component removed for mobile dropdown replacement
import { LogOut, Menu, User } from "lucide-react";
import { Logo } from "./logo";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const publicNavItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
  ];

  const navItems = session
    ? [...publicNavItems, { name: "Dashboard", href: "/dashboard" }]
    : publicNavItems;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-2 sm:top-4 left-2 right-2 sm:left-4 sm:right-6 z-50 pointer-events-auto">
      <div
        className={`relative max-w-screen-xl w-full mx-auto rounded-lg md:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-lg transition-all duration-300 overflow-visible md:overflow-hidden ${
          scrolled
            ? "backdrop-blur-md bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 border border-gray-800/40"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo and name */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Logo />
            <div className="hidden sm:block truncate">
              <div className="font-bold text-white text-sm sm:text-base">
                Md. Abu Sufian
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400">
                Full Stack Developer
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-4 sm:gap-6 text-gray-300">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base ${
                  pathname === item.href ? "text-white" : "hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500 text-black font-medium text-sm sm:text-base"
          >
            Hire Me
          </Link>

          {session ? (
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-gray-200 hover:text-white text-sm"
              >
                <User className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  {session.user?.name || "Account"}
                </span>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/10 text-sm"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-500 text-cyan-300 hover:bg-white/5 transition text-sm sm:text-base"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          {/* Mobile Menu (dropdown panel instead of sheet) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-full border border-white/10 text-gray-200 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </Button>

            {mobileOpen && (
              <div
                id="mobile-menu"
                className="absolute top-full right-0 mt-2 w-[min(18rem,90vw)] bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 border border-gray-800/40 rounded-lg shadow-lg z-50"
              >
                <div className="p-3">
                  <div className="text-gray-100 text-lg font-semibold mb-2">
                    Menu
                  </div>
                  <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        className={`px-3 py-2 rounded text-gray-300 hover:bg-white/5 ${
                          pathname === item.href ? "text-white" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="px-3 py-2 rounded text-gray-300 hover:bg-white/5"
                    >
                      Hire Me
                    </Link>

                    <div className="mt-3 border-t border-gray-800/50 pt-3">
                      {session ? (
                        <button
                          onClick={() => {
                            handleLogout();
                            closeMobile();
                          }}
                          className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-gray-300"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          href="/login"
                          onClick={closeMobile}
                          className="block px-3 py-2 rounded hover:bg-white/5 text-gray-300"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-black/80 backdrop-blur-xl border border-white/10 z-50 shadow-2xl shadow-black/50 transition-all duration-300 hover:shadow-3xl hover:shadow-black/60">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                  pathname === item.href
                    ? "text-white bg-white/15 shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                    pathname === item.href ? "w-8 opacity-100" : "w-0 opacity-0"
                  }`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions + Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          <Button className="hidden md:block rounded-full px-6 py-2 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
            <Link href="/login" className="block w-full text-center">
              Login
            </Link>
          </Button>

          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 rounded-full"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 bg-black/95 backdrop-blur-xl border-white/10"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4 text-lg font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                      pathname === item.href
                        ? "text-white bg-white/15 shadow-lg"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="rounded-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Link href="/login" className="block w-full text-center">
                    Login
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

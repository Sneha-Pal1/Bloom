"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/tips", label: "Tips" },
  { href: "/routines", label: "Routines" },
  { href: "/shop", label: "Shop" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/80 sticky top-0 z-50 border-b border-white/20">
      <Link href="/" className="flex items-center justify-center">
        <div className="relative">
          <Heart className="h-8 w-8 text-purple-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
        </div>
        <span className="ml-2 text-xl font-semibold text-gray-800">Bloom</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-all duration-300 relative group ${
              isActive(item.href)
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            {item.label}
            {isActive(item.href) && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            )}
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
        ))}

        {isAuthenticated ? (
          <div className="flex items-center gap-3 ml-2">
            <Link href="/dashboard">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                <User className="h-4 w-4 text-purple-600" />
              </div>
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Button
            onClick={() => setShowAuthModal(true)}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-full px-6 py-2 text-sm transition-all duration-300 bg-transparent hover:shadow-lg transform hover:scale-105"
          >
            Login / Sign Up
          </Button>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="ml-auto md:hidden p-2 text-gray-600 hover:text-purple-500 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-white/20 md:hidden">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-purple-500 hover:bg-purple-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-500 py-2 px-3 rounded-lg hover:bg-purple-50 transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

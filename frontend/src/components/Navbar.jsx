import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, UtensilsCrossed, User, LogOut, LayoutDashboard, Calendar, Settings as SettingsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/pages", label: "Pages" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <span className="font-serif text-2xl font-bold bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent dark:from-white dark:to-neutral-300">
            Bistro Bliss
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-900 text-white font-semibold shadow-xs dark:bg-white dark:text-neutral-900"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white font-semibold shadow-xs dark:bg-white dark:text-neutral-900"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`
                }
              >
                My Bookings
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white font-semibold shadow-xs dark:bg-white dark:text-neutral-900"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`
                }
              >
                Profile
              </NavLink>
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-neutral-900 text-white font-semibold shadow-xs dark:bg-white dark:text-neutral-900"
                        : "text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-50 dark:hover:bg-amber-950/30"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="default" className="rounded-full px-5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900">
            <Link to="/book-table">Book A Table</Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border text-foreground font-semibold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="right" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-semibold text-foreground">{user.name || "User"}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                  <Badge variant={user.role === "admin" ? "destructive" : "secondary"} className="mt-1">
                    {user.role}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-bookings")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  My Bookings
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="rounded-full px-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-4">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white font-semibold"
                      : "text-muted-foreground hover:bg-accent"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user && (
              <>
                <NavLink
                  to="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive ? "bg-neutral-900 text-white" : "text-muted-foreground hover:bg-accent"
                    }`
                  }
                >
                  My Bookings
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive ? "bg-neutral-900 text-white" : "text-muted-foreground hover:bg-accent"
                    }`
                  }
                >
                  Profile
                </NavLink>
                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isActive ? "bg-neutral-900 text-white" : "text-amber-600 hover:bg-amber-50"
                      }`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                )}
              </>
            )}
          </div>

          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <Button asChild className="w-full rounded-lg bg-neutral-900 text-white">
              <Link to="/book-table" onClick={() => setMobileMenuOpen(false)}>
                Book A Table
              </Link>
            </Button>

            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-lg text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Logout ({user.name || user.email})
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="w-full rounded-lg">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild variant="default" className="w-full rounded-lg">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
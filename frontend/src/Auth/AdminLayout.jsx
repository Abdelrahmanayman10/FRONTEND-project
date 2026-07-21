import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LayoutDashboard, Users as UsersIcon, Calendar, Utensils, Settings as SettingsIcon, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/users", label: "Users Management", icon: UsersIcon },
    { to: "/admin/bookings", label: "Reservations", icon: Calendar },
    { to: "/admin/menu", label: "Menu Catalog", icon: Utensils },
    { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 text-neutral-100 flex flex-col justify-between p-5 border-r border-neutral-800 shrink-0">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-none text-white">Bistro Admin</h2>
                <span className="text-xs text-neutral-400">Control Panel</span>
              </div>
            </div>
            <Link to="/" className="text-neutral-400 hover:text-white transition-colors" title="Back to site">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white text-neutral-900 font-semibold shadow-sm"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    }`
                  }
                >
                  <IconComponent className="w-4 h-4 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="pt-6 border-t border-neutral-800 space-y-3 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "Admin"}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-neutral-400 truncate">{user?.email}</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full rounded-lg bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

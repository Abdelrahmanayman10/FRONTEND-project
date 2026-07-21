import React from "react";
import { useUsers } from "@/api/useUsers";
import { useAdminBookings } from "@/api/useBookings";
import { useMenu } from "@/api/useMenu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, Utensils, DollarSign, TrendingUp, Activity } from "lucide-react";

export default function Dashboard() {
  const { data: users = [] } = useUsers();
  const { data: bookings = [] } = useAdminBookings();
  const { data: menuItems = [] } = useMenu();

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const acceptedBookings = bookings.filter((b) => b.status === "accepted").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Real-time metrics and system activity log for Bistro Bliss.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Active user accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Reservations
            </CardTitle>
            <Calendar className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">{bookings.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingBookings} pending approval
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Menu Dishes
            </CardTitle>
            <Utensils className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">{menuItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active menu items listed
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Confirmed Tables
            </CardTitle>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">{acceptedBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Accepted dining reservations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="border-border/60 shadow-md bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-lg text-foreground border-b border-border pb-3">
          <Activity className="w-5 h-5 text-primary" />
          Recent System Activity
        </div>

        <div className="space-y-3">
          {bookings.slice(0, 5).map((booking, idx) => (
            <div
              key={booking._id || idx}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/40 text-sm"
            >
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground">{booking.name}</span>
                <p className="text-xs text-muted-foreground">
                  Reserved for {booking.date} at {booking.time} ({booking.totalPerson})
                </p>
              </div>
              <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                {booking.status}
              </span>
            </div>
          ))}
          {bookings.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent booking activities.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

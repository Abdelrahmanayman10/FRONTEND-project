import React from "react";
import { useAdminBookings, useUpdateBookingStatus } from "@/api/useBookings";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X, RotateCcw, Calendar, ShieldAlert } from "lucide-react";

export default function AdminBookings() {
  const { data: bookings = [], isLoading, isError, error } = useAdminBookings();
  const updateStatusMutation = useUpdateBookingStatus();

  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "warning";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Manage Reservations
        </h1>
        <p className="text-muted-foreground text-sm">
          Review, accept, or decline customer table booking requests.
        </p>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <Card className="p-6 border-border/60">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="p-8 text-center border-destructive/30 bg-destructive/5 space-y-3">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <p className="text-destructive font-medium">
            {error?.message || "Failed to load reservations."}
          </p>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !isError && bookings.length === 0 && (
        <Card className="p-12 text-center border-border/60 space-y-4 bg-card">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-bold font-serif">No Reservations Found</h3>
          <p className="text-sm text-muted-foreground">
            When customers submit table bookings, they will appear here.
          </p>
        </Card>
      )}

      {/* Bookings Table */}
      {!isLoading && !isError && bookings.length > 0 && (
        <Card className="border-border/60 shadow-xl overflow-hidden rounded-2xl bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-center">Guests</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id || booking.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground font-semibold">
                    {(booking._id || booking.id).slice(-8).toUpperCase()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {booking.user?.email || "Guest User"}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">{booking.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{booking.phone}</TableCell>
                  <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                  <TableCell className="text-sm">{booking.time}</TableCell>
                  <TableCell className="text-center font-medium">{booking.totalPerson}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getBadgeVariant(booking.status)} className="capitalize px-3 py-1">
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {booking.status === "pending" ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="default"
                          size="xs"
                          disabled={updateStatusMutation.isPending}
                          onClick={() => handleUpdateStatus(booking._id || booking.id, "accepted")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          size="xs"
                          disabled={updateStatusMutation.isPending}
                          onClick={() => handleUpdateStatus(booking._id || booking.id, "rejected")}
                          className="rounded-lg"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="xs"
                        disabled={updateStatusMutation.isPending}
                        onClick={() => handleUpdateStatus(booking._id || booking.id, "pending")}
                        className="rounded-lg"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

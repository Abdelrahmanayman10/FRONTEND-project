import React from "react";
import { Link } from "react-router-dom";
import { useMyBookings } from "@/api/useBookings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Plus, Utensils, Clock, Users } from "lucide-react";

export default function MyBookings() {
  const { data: bookings = [], isLoading, isError, error } = useMyBookings();

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
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              My Table Bookings
            </h1>
            <p className="text-muted-foreground text-sm">
              View status and details of your table reservations.
            </p>
          </div>

          <Button asChild className="rounded-full bg-neutral-900 text-white shadow-md hover:bg-neutral-800 dark:bg-white dark:text-neutral-900">
            <Link to="/book-table" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Book Another Table
            </Link>
          </Button>
        </div>

        {/* Loading State */}
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
            <p className="text-destructive font-medium">
              {error?.message || "Failed to load bookings."}
            </p>
          </Card>
        )}

        {/* Empty Bookings State */}
        {!isLoading && !isError && bookings.length === 0 && (
          <Card className="p-12 text-center border-border/60 space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <Utensils className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold font-serif">No Bookings Found</CardTitle>
              <p className="text-muted-foreground text-sm">
                You haven't made any restaurant reservations yet.
              </p>
            </div>
            <Button asChild className="rounded-full bg-neutral-900 text-white">
              <Link to="/book-table">Book a Table Now</Link>
            </Button>
          </Card>
        )}

        {/* Table Listing */}
        {!isLoading && !isError && bookings.length > 0 && (
          <Card className="border-border/60 shadow-xl overflow-hidden rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reservation ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-center">Guests</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id || booking.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground font-semibold">
                      {(booking._id || booking.id).slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">{booking.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{booking.phone}</TableCell>
                    <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                    <TableCell className="text-sm">{booking.time}</TableCell>
                    <TableCell className="text-center font-medium">{booking.totalPerson}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getBadgeVariant(booking.status)} className="capitalize px-3 py-1">
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}

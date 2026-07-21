import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { useCreateBooking } from "@/api/useBookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, User as UserIcon, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function BookTable() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createBookingMutation = useCreateBooking();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPerson, setTotalPerson] = useState("1 Person");

  // Autofill name and phone if user is logged in
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!date || !time || !name || !phone || !totalPerson) {
      toast.error("Missing Fields", "Please fill in all reservation fields.");
      return;
    }

    createBookingMutation.mutate(
      { name, phone, date, time, totalPerson },
      {
        onSuccess: () => {
          navigate("/my-bookings");
        },
      }
    );
  };

  if (!user) {
    return (
      <div className="py-24 bg-background min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8 border-border shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
            <CalendarIcon className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold font-serif">Reservation Required</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              To book a table at Bistro Bliss, please log in or create an account to manage your reservations.
            </CardDescription>
          </div>
          <Button onClick={() => navigate("/login")} className="w-full rounded-full bg-neutral-900 text-white">
            Log In to Book Table
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Reserve Your Spot
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Book A Table
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Experience exceptional dining with effortless online table reservations. Instant confirmation guaranteed.
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-6 sm:p-10 border-border/60 shadow-xl bg-card rounded-2xl mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 font-medium">
                  <CalendarIcon className="w-4 h-4 text-primary" /> Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-primary" /> Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                  <UserIcon className="w-4 h-4 text-primary" /> Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-primary" /> Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 123-456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Total Persons */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="totalPerson" className="flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4 text-primary" /> Total Guests
                </Label>
                <select
                  id="totalPerson"
                  value={totalPerson}
                  onChange={(e) => setTotalPerson(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring dark:bg-input/30"
                >
                  <option value="1 Person">1 Person</option>
                  <option value="2 People">2 People</option>
                  <option value="3 People">3 People</option>
                  <option value="4 People">4 People</option>
                  <option value="5+ People">5+ People</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={createBookingMutation.isPending}
              className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-md dark:bg-white dark:text-neutral-900"
            >
              {createBookingMutation.isPending ? "Submitting Reservation..." : "Confirm Reservation"}
            </Button>
          </form>
        </Card>

        {/* Map Preview */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.903167473759!2d-74.1637551!3d40.8530333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f6f4e6cd14df%3A0xbaa0ff7f40a99a9c!2sPassaic%2C%20NJ!5e0!3m2!1sen!2sus!4v1673900000000!5m2!1sen!2sus"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

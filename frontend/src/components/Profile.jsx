import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useUpdateProfile } from "@/api/useAuth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Key, Save } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function Profile() {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Password Mismatch", "New passwords do not match.");
      return;
    }

    const updateData = { name, email, phone, address };
    if (password) {
      updateData.password = password;
    }

    updateProfileMutation.mutate(updateData, {
      onSuccess: () => {
        setPassword("");
        setConfirmPassword("");
      },
    });
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Card className="border-border/60 shadow-xl bg-card rounded-2xl overflow-hidden">
          <CardHeader className="bg-muted/40 p-6 sm:p-8 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 text-2xl font-bold font-serif">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-bold font-serif text-foreground">
                    {user?.name || "Account Profile"}
                  </CardTitle>
                  <Badge variant={user?.role === "admin" ? "destructive" : "secondary"}>
                    {user?.role || "user"}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {user?.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                    <User className="w-4 h-4 text-primary" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 rounded-lg"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                    <Mail className="w-4 h-4 text-primary" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 rounded-lg"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 font-medium">
                    <Phone className="w-4 h-4 text-primary" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 rounded-lg"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address" className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                  </Label>
                  <textarea
                    id="address"
                    rows={3}
                    placeholder="Enter your street address, city, zip code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent p-3 text-sm shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring dark:bg-input/30"
                  ></textarea>
                </div>
              </div>

              <hr className="border-border my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-base text-foreground">
                  <Key className="w-4 h-4 text-primary" />
                  Change Password (Optional)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-md dark:bg-white dark:text-neutral-900"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateProfileMutation.isPending ? "Saving Profile..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

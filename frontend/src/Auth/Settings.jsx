import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function Settings() {
  const [siteName, setSiteName] = useState("Bistro Bliss");
  const [currency, setCurrency] = useState("USD ($)");
  const [contactEmail, setContactEmail] = useState("yummy@bistrobliss.com");
  const [tableCapacity, setTableCapacity] = useState("50");

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings Saved", "System preferences updated successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          System Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          Configure restaurant metadata, currency, and operational defaults.
        </p>
      </div>

      {/* Settings Form Card */}
      <Card className="max-w-2xl border-border/60 shadow-xl bg-card rounded-2xl p-6 sm:p-8 space-y-6">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center gap-2 text-xl font-serif font-bold text-foreground">
            <SettingsIcon className="w-5 h-5 text-primary" />
            General Preferences
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="font-medium">
                Restaurant / Brand Name
              </Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="font-medium">
                Default Currency Symbol
              </Label>
              <Input
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="font-medium">
                Notification Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tableCapacity" className="font-medium">
                Maximum Table Capacity
              </Label>
              <Input
                id="tableCapacity"
                type="number"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-md dark:bg-white dark:text-neutral-900"
            >
              <Save className="w-4 h-4 mr-2" /> Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

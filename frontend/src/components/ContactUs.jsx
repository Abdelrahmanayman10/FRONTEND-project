import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Phone, Clock, MapPin, Send, Mail } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Missing Fields", "Please complete all contact form fields.");
      return;
    }

    toast.success("Message Sent!", "Thank you for contacting Bistro Bliss. We will respond shortly.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Have questions, feedback, or special event inquiries? Fill out the form below or reach us directly.
          </p>
        </div>

        {/* Contact Form Card */}
        <Card className="p-6 sm:p-10 border-border/60 shadow-xl bg-card rounded-2xl mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="subject" className="font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Inquiry Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message" className="font-medium">
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-input bg-transparent p-3 text-sm shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring dark:bg-input/30"
                ></textarea>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-md dark:bg-white dark:text-neutral-900"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </Card>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-border/60 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">+20 123 456 789</p>
          </Card>

          <Card className="p-6 text-center border-border/60 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Hours</h3>
            <p className="text-xs text-muted-foreground">Mon-Fri: 8:00 AM - 10:00 PM</p>
            <p className="text-xs text-muted-foreground">Sat-Sun: 9:00 AM - 11:00 PM</p>
          </Card>

          <Card className="p-6 text-center border-border/60 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Address</h3>
            <p className="text-sm text-muted-foreground">123 Main Street, Alexandria</p>
          </Card>
        </div>
      </div>
    </section>
  );
}

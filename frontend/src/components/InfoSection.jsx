import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import cookingImg from "../assets/cooking.jpg";

const stats = [
  { value: "3", label: "Locations" },
  { value: "1995", label: "Founded" },
  { value: "65+", label: "Staff Members" },
  { value: "100%", label: "Satisfied Customers" },
];

const InfoSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text & Stats */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Heritage & Excellence
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                A little information <br /> for our valuable guests
              </h2>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              At Bistro Bliss, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.
            </p>

            {/* Stats 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <Card key={idx} className="border-border/60 text-center p-4 bg-background shadow-xs hover:border-primary/40 transition-colors">
                  <CardContent className="p-2 space-y-1">
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-neutral-100 dark:bg-neutral-800">
              <img
                src={cookingImg}
                alt="Chef preparing delicious dish"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;

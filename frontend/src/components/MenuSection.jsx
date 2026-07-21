import React from "react";
import { Link } from "react-router-dom";
import { Coffee, UtensilsCrossed, Wine, Cake, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: Coffee,
    title: "Breakfast",
    text: "Start your day with our organic farm-fresh eggs, artisanal breads, and freshly brewed coffees.",
  },
  {
    icon: UtensilsCrossed,
    title: "Main Dishes",
    text: "Exquisite hand-crafted main courses featuring prime steaks, seafood, and fresh pasta.",
  },
  {
    icon: Wine,
    title: "Drinks",
    text: "Refreshing handcrafted mocktails, fine wines, and specialty artisanal beverages.",
  },
  {
    icon: Cake,
    title: "Desserts",
    text: "Decadent cakes, creamy gelato, and handcrafted pastries made fresh daily by our pastry chefs.",
  },
];

export default function MenuSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-3 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            Browse Our Menu
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Explore our carefully curated categories designed to satisfy every palate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-border/60 hover:-translate-y-1">
                <CardHeader className="text-center pt-8 pb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </CardDescription>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline pt-2 group"
                  >
                    Explore Menu
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

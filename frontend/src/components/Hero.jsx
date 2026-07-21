import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar } from "lucide-react";
import leftImg from "../assets/hero-left.jpg";
import rightImg from "../assets/hero-right.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      {/* Background Hero Images */}
      <img
        src={leftImg}
        alt="Hero Left"
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1/4 max-w-sm h-4/5 object-cover rounded-r-3xl shadow-xl opacity-90 hover:opacity-100 transition-opacity"
      />
      <img
        src={rightImg}
        alt="Hero Right"
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/4 max-w-sm h-4/5 object-cover rounded-l-3xl shadow-xl opacity-90 hover:opacity-100 transition-opacity"
      />

      {/* Hero Central Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20">
          <Utensils className="w-3.5 h-3.5" />
          Welcome to Bistro Bliss
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
          Best food for <br />
          <span className="bg-linear-to-r from-primary via-red-600 to-amber-600 bg-clip-text text-transparent">
            your taste
          </span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
          Discover delectable cuisine and unforgettable moments in our welcoming culinary haven. Prepared with organic, fresh ingredients daily.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-md bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900">
            <Link to="/book-table" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book A Table
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-2">
            <Link to="/menu">Explore Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

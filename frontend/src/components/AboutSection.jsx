import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import foodImg from "../assets/food.jpg";

export default function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with Contact Card Overlay */}
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-neutral-100 dark:bg-neutral-800">
              <img
                src={foodImg}
                alt="Healthy delicious food"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Contact Card Overlay */}
            <div className="static sm:absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm mt-4 sm:mt-0 bg-background/95 backdrop-blur-md border border-border shadow-2xl p-5 rounded-xl space-y-3">
              <h3 className="font-semibold text-base text-foreground border-b border-border pb-2">
                Come and visit us
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>(414) 857 - 0107</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>happytummy@restaurant.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="space-y-6 lg:pl-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                We provide healthy food for your family
              </h2>
            </div>
            
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Our mission is to bring delicious, nutritious meals to your table. We use only the freshest farm-to-table organic ingredients to ensure every bite is both healthy, satisfying, and memorable.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Whether you are looking for a romantic dinner or a family gathering, our warm atmosphere and chef-crafted dishes create timeless experiences.
            </p>

            <div className="pt-2">
              <Button asChild size="lg" className="rounded-full px-8 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900">
                <Link to="/about" className="inline-flex items-center gap-2">
                  More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

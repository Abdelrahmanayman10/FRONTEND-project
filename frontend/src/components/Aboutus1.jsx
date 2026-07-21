import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import food22Img from "../assets/food2.2.jpg";

export default function Aboutus1() {
  return (
    <section className="py-20 bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image & Overlay */}
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-neutral-100 dark:bg-neutral-800">
              <img
                src={food22Img}
                alt="Delicious food presentation"
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

          {/* Right Text */}
          <div className="space-y-6 lg:pl-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                A Little Bit About Us
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                We provide healthy food for your family.
              </h2>
            </div>
            
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in our city's rich culinary culture, we aim to honor our local roots while infusing a global palate.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              At Bistro Bliss, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Card } from "@/components/ui/card";
import app1 from "../assets/app1.jpg";
import app2 from "../assets/app2.jpg";
import app3 from "../assets/app3.jpg";
import app4 from "../assets/app4.jpg";
import app5 from "../assets/app5.jpg";
import app6 from "../assets/app6.jpg";
import app7 from "../assets/app7.jpg";
import app8 from "../assets/app8.jpg";
import app9 from "../assets/app9.jpg";

const apps = [
  { name: "Uber Eats", img: app1 },
  { name: "Grubhub", img: app2 },
  { name: "Postmates", img: app3 },
  { name: "DoorDash", img: app4 },
  { name: "Foodpanda", img: app5 },
  { name: "Deliveroo", img: app6 },
  { name: "Instacart", img: app7 },
  { name: "Just Eat", img: app8 },
  { name: "DiDi Food", img: app9 },
];

const OrderApps = () => {
  return (
    <section className="py-16 bg-muted/40 border-t border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Left Text */}
          <div className="space-y-4 lg:col-span-1 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Delivery Partners
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              You can order through apps
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Order your favorite Bistro Bliss dishes directly from your preferred food delivery apps with fast, real-time tracking.
            </p>
          </div>

          {/* Right Logos Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {apps.map((app, index) => (
                <Card
                  key={index}
                  className="p-4 flex items-center justify-center bg-background hover:shadow-md transition-all duration-200 border-border/60 hover:border-primary/40 h-20"
                >
                  <img
                    src={app.img}
                    alt={app.name}
                    className="max-h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                    {app.name}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderApps;

import React from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

const testimonials = [
  {
    quote: "The best restaurant",
    text: "Last night, we dined at Bistro Bliss and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
    name: "Sophie Robson",
    location: "Los Angeles, CA",
    img: person1,
  },
  {
    quote: "Simply delicious",
    text: "Bistro Bliss exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
    name: "Matt Cannon",
    location: "San Diego, CA",
    img: person2,
  },
  {
    quote: "One of a kind restaurant",
    text: "The culinary experience at Bistro Bliss is second to none. The atmosphere is vibrant, the food – nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
    name: "Andy Smith",
    location: "San Francisco, CA",
    img: person3,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Read real stories and feedback from diners who have visited Bistro Bliss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between p-6 border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card text-left"
            >
              <CardHeader className="p-0 pb-4 space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">
                  "{item.quote}"
                </h3>
              </CardHeader>

              <CardContent className="p-0 pb-6 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </CardContent>

              <CardFooter className="p-0 pt-4 border-t border-border/50 flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

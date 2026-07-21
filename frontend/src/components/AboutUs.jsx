import React, { useState } from "react";
import { Play, Utensils, ShoppingBag, Clock, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import coverImg from "../assets/cover.jpg";

const AboutUs = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-12 bg-background">
      {/* Hero Banner Video Preview */}
      <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden rounded-3xl shadow-xl max-w-7xl mx-auto px-4 sm:px-6">
        <img
          src={coverImg}
          alt="Bistro Bliss Atmosphere"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <button
            onClick={() => setVideoOpen(true)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-primary flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-all duration-300 group cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5 group-hover:text-red-600 transition-colors" />
          </button>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Feel the authentic & <br /> original taste from us
          </h2>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-2xl bg-black border-neutral-800 p-0 overflow-hidden">
          <DialogHeader className="p-4 bg-neutral-900 text-white">
            <DialogTitle>Bistro Bliss Culinary Experience</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full flex items-center justify-center bg-neutral-950 text-neutral-400 p-8 text-center">
            <div className="space-y-2">
              <Play className="w-12 h-12 mx-auto text-primary animate-pulse" />
              <p className="text-sm font-medium">Bistro Bliss Promotional Video Showcase</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
                <Utensils className="w-7 h-7" />
              </div>
              <CardTitle className="text-xl font-bold">Multi Cuisine</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Enjoy an expansive selection of traditional and contemporary dishes crafted by world-class chefs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <CardTitle className="text-xl font-bold">Easy To Order</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Seamless online table reservation and takeaway ordering with instant digital confirmation.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="p-0 space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
                <Clock className="w-7 h-7" />
              </div>
              <CardTitle className="text-xl font-bold">Fast Delivery</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                Hot, fresh food delivered directly to your doorstep in eco-friendly insulated packaging.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

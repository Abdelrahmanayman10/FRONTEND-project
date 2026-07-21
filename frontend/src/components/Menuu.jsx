import React, { useState } from "react";
import { useMenu } from "@/api/useMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";

const categories = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];

export default function Menuu() {
  const { data: menuItems = [], isLoading, isError, error } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Fresh & Culinary
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Our Special Menu
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We consider all the drivers of taste to bring you fresh, organic, and beautifully presented dishes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 h-10 transition-all ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900"
                  : "hover:bg-accent"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <Utensils className="w-6 h-6" />
            </div>
            <p className="text-destructive font-medium">
              {error?.message || "Could not load menu items from server."}
            </p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!isLoading && !isError && (
          <>
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No items found in category "{selectedCategory}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item._id || item.id}
                    className="overflow-hidden flex flex-col justify-between border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                      <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-xs shadow-xs font-semibold">
                        {item.category}
                      </Badge>
                    </div>

                    <CardHeader className="p-4 pb-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">
                          {item.name}
                        </CardTitle>
                        <span className="font-serif text-xl font-bold text-primary">
                          ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 flex-1">
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {item.description || "Made with fresh organic ingredients, house spices, and crafted by expert chefs."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";

import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import blog4 from "../assets/blog4.jpg";

export default function ReadMoreArticles() {
  const articles = [
    { id: 1, title: "How to prepare a delicious gluten free sushi", image: blog1, date: "Jan 3, 2026" },
    { id: 2, title: "Exclusive baking lessons from the pastry king", image: blog2, date: "Aug 10, 2025" },
    { id: 3, title: "How to prepare the perfect fries in an air fryer", image: blog3, date: "Aug 8, 2025" },
    { id: 4, title: "How to prepare delicious chicken tenders", image: blog4, date: "Aug 5, 2025" },
  ];

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link & Header */}
        <div className="mb-10 flex flex-col items-center text-center space-y-4">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link to="/pages" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </Button>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Featured Articles & Guides
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Explore deeper insights into culinary arts, healthy lifestyle, and gourmet preparation.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden flex flex-col justify-between border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{article.date}</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground line-clamp-2 leading-snug">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-xs text-muted-foreground line-clamp-3">
                  Comprehensive chef step-by-step guides, temperature controls, and secret ingredient pairings.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

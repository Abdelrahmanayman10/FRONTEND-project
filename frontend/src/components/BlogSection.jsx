import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import blog4 from "../assets/blog4.jpg";
import blog5 from "../assets/blog5.jpg";
import blog6 from "../assets/blog6.jpg";
import blog7 from "../assets/blog7.jpg";
import blog8 from "../assets/blog8.jpg";
import blog9 from "../assets/blog9.jpg";
import blog10 from "../assets/blog10.jpg";
import blog11 from "../assets/blog11.jpg";
import blog12 from "../assets/blog12.jpg";

export default function BlogSection() {
  const posts = [
    { id: 1, title: "How to prepare a delicious gluten free sushi", image: blog1, date: "Jan 3, 2026" },
    { id: 2, title: "Exclusive baking lessons from the pastry king", image: blog2, date: "Aug 10, 2025" },
    { id: 3, title: "How to prepare the perfect fries in an air fryer", image: blog3, date: "Aug 8, 2025" },
    { id: 4, title: "How to prepare delicious chicken tenders", image: blog4, date: "Aug 5, 2025" },
    { id: 5, title: "5 great cooking gadgets you can buy to save time", image: blog5, date: "Aug 1, 2025" },
    { id: 6, title: "The secret tips & tricks to prepare a perfect burger", image: blog6, date: "Jul 29, 2025" },
    { id: 7, title: "7 delicious cheesecake recipes you can prepare", image: blog7, date: "Jul 25, 2025" },
    { id: 8, title: "5 great pizza restaurants you should visit in this city", image: blog8, date: "Jul 20, 2025" },
    { id: 9, title: "5 great cooking gadgets you can buy to save time", image: blog9, date: "Jul 15, 2025" },
    { id: 10, title: "How to prepare a delicious gluten free sushi", image: blog10, date: "Jul 12, 2025" },
    { id: 11, title: "Top 20 simple and quick desserts for kids", image: blog11, date: "Jul 8, 2025" },
    { id: 12, title: "Top 20 simple and quick desserts for kids", image: blog12, date: "Jul 5, 2025" },
  ];

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Articles & Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Our Culinary Blog
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Discover latest updates, master recipes, and behind-the-scenes stories from our executive chefs.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden flex flex-col justify-between border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>

              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Learn professional tips, ingredient selection guides, and culinary techniques from our experts.
                </p>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" size="sm" className="w-full rounded-full group/btn">
                  <Link to="/ReadMoreArticles" className="flex items-center justify-center gap-1.5">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

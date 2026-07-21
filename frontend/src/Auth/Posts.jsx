import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

const sample = [
  { id: 1, title: "How to Cook the Perfect Steak", date: "Aug 10, 2025" },
  { id: 2, title: "10 Quick Pasta Recipes", date: "Aug 5, 2025" },
];

export default function Posts() {
  const [posts, setPosts] = useState(sample);
  const [title, setTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setPosts((p) => [{ id: Date.now(), title, date: new Date().toLocaleDateString() }, ...p]);
    setTitle("");
    toast.success("Post Created", "Sample blog post added.");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this post?")) return;
    setPosts((p) => p.filter((x) => x.id !== id));
    toast.success("Post Removed", "Post removed from list.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Manage Blog Posts
        </h1>
        <p className="text-muted-foreground text-sm">
          Sample blog post management interface.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-3 max-w-xl">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New blog post title..."
          className="h-11 rounded-lg"
        />
        <Button type="submit" className="h-11 rounded-lg bg-neutral-900 text-white">
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </form>

      <Card className="p-4 border-border/60 shadow-lg bg-card rounded-2xl divide-y divide-border">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="xs" className="rounded-lg">
                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button variant="destructive" size="xs" onClick={() => handleDelete(p.id)} className="rounded-lg">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

import React, { useState } from "react";
import { useMenu, useCreateMenuItem, useUpdateMenuItem, useDeleteMenuItem } from "@/api/useMenu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Edit2, Trash2, ShieldAlert, Utensils } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function AdminMenu() {
  const { data: menuItems = [], isLoading, isError, error } = useMenu();
  const createMutation = useCreateMenuItem();
  const updateMutation = useUpdateMenuItem();
  const deleteMutation = useDeleteMenuItem();

  // Form state
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setImg("");
    setCategory("Breakfast");
    setDescription("");
  };

  const handleEditClick = (item) => {
    setEditingId(item._id || item.id);
    setName(item.name);
    setPrice(item.price.toString());
    setImg(item.img);
    setCategory(item.category);
    setDescription(item.description || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !img || !category) {
      toast.error("Missing Fields", "Please complete all required fields.");
      return;
    }

    const payload = {
      name,
      price: parseFloat(price),
      img,
      category,
      description,
    };

    if (editingId) {
      updateMutation.mutate(
        { id: editingId, ...payload },
        {
          onSuccess: () => resetForm(),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => resetForm(),
      });
    }
  };

  const handleDelete = (id, itemName) => {
    if (!confirm(`Are you sure you want to delete "${itemName}"?`)) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          Manage Menu Items
        </h1>
        <p className="text-muted-foreground text-sm">
          Add, edit, or remove menu offerings displayed to customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (4 cols) */}
        <Card className="lg:col-span-5 p-6 border-border/60 shadow-xl bg-card rounded-2xl">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl font-serif font-bold text-foreground">
              {editingId ? "Edit Menu Item" : "Add New Item"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  Item Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Pepperoni Pizza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-10 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="font-medium">
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 14.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="h-10 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="img" className="font-medium">
                  Image URL / Asset Path *
                </Label>
                <Input
                  id="img"
                  type="text"
                  placeholder="e.g. /src/assets/food111.jpg or URL"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  required
                  className="h-10 rounded-lg"
                />
                <span className="text-xs text-muted-foreground block">
                  Supports relative asset paths or web URLs.
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="font-medium">
                  Category *
                </Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring dark:bg-input/30"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Main Dishes">Main Dishes</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-medium">
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Ingredients, preparation method..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-input bg-transparent p-3 text-sm shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring dark:bg-input/30"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
                >
                  {editingId ? "Update Item" : "Add Menu Item"}
                </Button>

                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* List Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {isLoading && (
            <Card className="p-6 border-border/60">
              <div className="space-y-3">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          )}

          {isError && (
            <Card className="p-8 text-center border-destructive/30 bg-destructive/5 space-y-3">
              <ShieldAlert className="w-6 h-6 text-destructive mx-auto" />
              <p className="text-destructive font-medium">
                {error?.message || "Failed to load menu items."}
              </p>
            </Card>
          )}

          {!isLoading && !isError && menuItems.length === 0 && (
            <Card className="p-12 text-center border-border/60 space-y-4 bg-card">
              <Utensils className="w-12 h-12 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-bold font-serif">No Menu Items Listed</h3>
              <p className="text-sm text-muted-foreground">
                Add your first dish using the form on the left.
              </p>
            </Card>
          )}

          {!isLoading && !isError && menuItems.length > 0 && (
            <Card className="border-border/60 shadow-xl overflow-hidden rounded-2xl bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item._id || item.id}>
                      <TableCell>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-neutral-100 border border-border"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=80&h=80&q=80";
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-primary">
                        ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                      </TableCell>
                      <TableCell className="text-right space-x-1.5">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => handleEditClick(item)}
                          className="rounded-lg"
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="xs"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleDelete(item._id || item.id, item.name)}
                          className="rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

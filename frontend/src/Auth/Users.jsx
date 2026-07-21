import React from "react";
import { useUsers, useToggleUserRole, useDeleteUser } from "@/api/useUsers";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users as UsersIcon, ShieldAlert, Trash2, UserCog } from "lucide-react";
import { toast } from "@/components/ui/toast";

export default function Users() {
  const { data: users = [], isLoading, isError, error } = useUsers();
  const toggleRoleMutation = useToggleUserRole();
  const deleteUserMutation = useDeleteUser();

  const handleToggleRole = (id, currentRole, name) => {
    toggleRoleMutation.mutate(id);
  };

  const handleDelete = (id, name) => {
    if (!confirm(`Are you sure you want to delete user "${name}"?`)) return;
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
          User Administration
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage user accounts, privileges, and access roles.
        </p>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <Card className="p-6 border-border/60">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="p-8 text-center border-destructive/30 bg-destructive/5 space-y-3">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <p className="text-destructive font-medium">
            {error?.message || "Failed to load user accounts."}
          </p>
        </Card>
      )}

      {/* Users Table */}
      {!isLoading && !isError && (
        <Card className="border-border/60 shadow-xl overflow-hidden rounded-2xl bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone / Address</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id || user.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground font-semibold">
                    {(user._id || user.id).slice(-8).toUpperCase()}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">{user.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {user.phone || "—"} {user.address ? `• ${user.address}` : ""}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={user.role === "admin" ? "destructive" : "secondary"} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      disabled={toggleRoleMutation.isPending}
                      onClick={() => handleToggleRole(user._id || user.id, user.role, user.name)}
                      className="rounded-lg"
                    >
                      <UserCog className="w-3.5 h-3.5 mr-1" />
                      Toggle Role
                    </Button>
                    <Button
                      variant="destructive"
                      size="xs"
                      disabled={deleteUserMutation.isPending}
                      onClick={() => handleDelete(user._id || user.id, user.name)}
                      className="rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

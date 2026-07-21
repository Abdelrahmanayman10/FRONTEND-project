import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLogin } from "@/api/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        },
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-muted/20 p-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-border bg-card rounded-2xl overflow-hidden">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-serif font-bold tracking-tight text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Sign in to your Bistro Bliss account to manage bookings & profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="password font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-md dark:bg-white dark:text-neutral-900"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loginMutation.isPending ? "Signing In..." : "Log In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pt-2 pb-6 bg-muted/30 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

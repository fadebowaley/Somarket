"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={showLogin ? "default" : "outline"}
              onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button
              variant={!showLogin ? "default" : "outline"}
              onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </div>
          {showLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

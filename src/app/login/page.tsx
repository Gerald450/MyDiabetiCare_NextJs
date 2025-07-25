'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, provider, db } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);

    const demoEmail = "demo@mydiabeticare.com";
    const demoPass = "demo123";

    if (email === demoEmail && password === demoPass) {
      alert("Login successful!");
      router.push("/profile");
    } else {
      alert("Invalid email or password.");
    }

    setIsLoggingIn(false);
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      const userRef = doc(db, "patients", userData.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: userData.uid,
          name: userData.displayName,
          email: userData.email,
        });
      }

      router.push("/profile");
    } catch (err) {
      console.error("Error signing in: ", err);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/bg2.png')" }}
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Login to MyDiabetiCare
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="border-t w-full border-gray-200"></div>
            </div>
            <div className="relative text-sm text-gray-500 bg-white px-4">
              or
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full"
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

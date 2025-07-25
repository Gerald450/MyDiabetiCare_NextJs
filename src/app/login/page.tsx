'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {auth, provider, db} from '../../lib/firebase';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const demoEmail = "demo@mydiabeticare.com";
    const demoPass = "demo123";

    if (email === demoEmail && password === demoPass) {
      alert("Login successful!");
      window.location.href = "/index";
    } else {
      alert("Invalid email or password.");
    }
  }

  //authentication
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {

    try {
        const result = await signInWithPopup(auth, provider);
        const userData = result.user;

        const userRef = doc(db, 'patients', userData.uid);
        const userSnap = await getDoc(userRef)
        

        if(!userSnap.exists()){
            await setDoc(userRef, {
                ...userSnap.data(),
                id: userData.uid,
                name: userData.displayName,
                email: userData.email,
            })
        }

        }catch(err){
            console.error('Error signing in: ', err)
        }
  }
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg2.png')" }}
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login to MyDiabetiCare
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="text-center">
            <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

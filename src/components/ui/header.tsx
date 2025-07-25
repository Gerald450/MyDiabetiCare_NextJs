"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <header className="bg-gray-100 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            MyDiabetiCare
          </Link>
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              {!user ? (
                <li>
                  <Link href="/login">Login/Sign Up</Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              )}
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
              <li>
                <Link href="/glucoseMonitoring">Glucose Monitoring</Link>
              </li>
              <li>
                <Link href="/diet+ExerciseTrack">Diet & Exercise Tracking</Link>
              </li>
              <li>
                <Link
                  href="https://kyle-muchipi.github.io/Telehealth/index.html"
                  target="_blank"
                >
                  Telehealth
                </Link>
              </li>
              <li>
                <Link href="/virtuadoc">VirtuaDoc</Link>
              </li>
              <li>
                <Link href="/medManagement">Medication Management</Link>
              </li>
              <li>
                <Link href="/ehrReports">Reports</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

import React from "react";
import Link from "next/link";


export default function Header(){
    return (
        <div>
        <header className="bg-gray-100 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">MyDiabetiCare</Link>
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/login">Login/Sign Up</Link></li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><Link href="/glucoseMonitoring">Glucose Monitoring</Link></li>
              <li><Link href="/diet+ExerciseTrack">Diet & Exercise Tracking</Link></li>
              <li><Link href="https://kyle-muchipi.github.io/Telehealth/index.html" target="_blank">Telehealth</Link></li>
              <li><Link href="/virtuadoc">VirtuaDoc</Link></li>
              <li><Link href="/medManagement">Medication Management</Link></li>
              <li><Link href="/ehrReports">Reports</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
    )
}
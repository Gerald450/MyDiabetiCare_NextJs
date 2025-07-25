'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {useState, useEffect} from 'react'
import { Separator } from "@/components/ui/separator";
import {auth, provider, db} from '../../lib/firebase';
import { onAuthStateChanged } from "firebase/auth";


export default function Profile() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [profile, setProfile] = useState(null)


 //stay same on refresh
    useEffect(() => {
        const user = auth.currentUser;
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if (user){
                setUserName(user.displayName)
                setEmail(user.email);
                setProfile(user.photoURL);
        }

    })
    return () => unsubscribe();
    
  }, []);

 




  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
  <div className="max-w-2xl mx-auto">
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        {/* Profile Picture */}
        <img
          src={profile}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md mb-4 object-cover"
        />

        {/* Title */}
        <CardTitle className="text-2xl font-semibold text-gray-800">
          My Profile
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal and diabetes-related information
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <ProfileItem label="Name" value={userName} />
        <Separator />
        <ProfileItem label="Email" value={email} />
        <Separator />
        <ProfileItem label="Date of Birth" value="January 15, 1985" />
        <Separator />
        <ProfileItem label="Diabetes Type" value="Type II" />
        <Separator />
        <ProfileItem label="Diagnosis Date" value="April 10, 2019" />
        <Separator />
        <ProfileItem
          label="Last Blood Glucose Reading"
          value="112 mg/dL (May 18, 2025)"
        />
        <Separator />
        <ProfileItem label="Primary Physician" value="Dr. Bianca Godwins" />
      </CardContent>
    </Card>
  </div>
</div>

  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-sm text-gray-600">{label}</Label>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  );
}

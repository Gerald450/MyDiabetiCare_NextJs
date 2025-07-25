'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {useState, useEffect} from 'react'
import { Separator } from "@/components/ui/separator";
import {auth, provider, db} from '../../lib/firebase';
import firebase from "firebase/compat/app";

export default function Profile() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [profile, setProfile] = useState(null)



    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
        setUserName(user.displayName);
        setEmail(user.email);
        setProfile(user.photoURL);
        }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              My Profile
            </CardTitle>
            <img  src={profile}/>
            <p className="text-center text-sm text-gray-500 mt-1">
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

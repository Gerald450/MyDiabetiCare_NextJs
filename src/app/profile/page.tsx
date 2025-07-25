'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [profile, setProfile] = useState<string | null>("/default-profile.png");

  // Editable fields
  const [dob, setDob] = useState("");
  const [diabetesType, setDiabetesType] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [glucoseReading, setGlucoseReading] = useState("");
  const [physician, setPhysician] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName || "Unknown");
        setEmail(user.email || "N/A");
        setProfile(user.photoURL || "/default-profile.png");

        const ref = doc(db, "patients", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setDob(data.dob || "");
          setDiabetesType(data.diabetesType || "");
          setDiagnosisDate(data.diagnosisDate || "");
          setGlucoseReading(data.glucoseReading || "");
          setPhysician(data.physician || "");

          setOriginalData(data);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!userId) return;

    const ref = doc(db, "patients", userId);
    await setDoc(
      ref,
      {
        dob,
        diabetesType,
        diagnosisDate,
        glucoseReading,
        physician,
      },
      { merge: true }
    );

    alert("Profile updated successfully!");
    setEditMode(false);
    setOriginalData({ dob, diabetesType, diagnosisDate, glucoseReading, physician });
  };

  const handleCancel = () => {
    // revert to original values
    const { dob, diabetesType, diagnosisDate, glucoseReading, physician } = originalData as any;
    setDob(dob);
    setDiabetesType(diabetesType);
    setDiagnosisDate(diagnosisDate);
    setGlucoseReading(glucoseReading);
    setPhysician(physician);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <img
              src={profile || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md mb-4 object-cover"
            />
            <CardTitle className="text-2xl font-semibold text-gray-800">My Profile</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Manage your personal and diabetes-related information
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem label="Name" value={userName} />
            <Separator />
            <ProfileItem label="Email" value={email} />
            <Separator />
            <EditableItem label="Date of Birth" value={dob} setValue={setDob} editMode={editMode} placeholder="e.g June 17, 2004" />
            <Separator />
            <EditableItem label="Diabetes Type" value={diabetesType} setValue={setDiabetesType} editMode={editMode} placeholder="e.g Type II" />
            <Separator />
            <EditableItem label="Diagnosis Date" value={diagnosisDate} setValue={setDiagnosisDate} editMode={editMode} placeholder="e.g June 1, 2018" />
            <Separator />
            <EditableItem label="Last Blood Glucose Reading" value={glucoseReading} setValue={setGlucoseReading} editMode={editMode} placeholder="e.g 112 mg/dL (May 18, 2025)" />
            <Separator />
            <EditableItem label="Primary Physician" value={physician} setValue={setPhysician} editMode={editMode} placeholder="e.g Dr. Bianca Godwins" />
            <Separator />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              {!editMode ? (
                <Button onClick={() => setEditMode(true)} variant="outline">Edit</Button>
              ) : (
                <>
                  <Button onClick={handleCancel} variant="ghost">Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </>
              )}
            </div>
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

function EditableItem({
  label,
  value,
  setValue,
  editMode,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  editMode: boolean;
  placeholder:string;
}) {
  return (
    <div>
      <Label className="text-sm text-gray-600">{label}</Label>
      {editMode ? (
        <Input value={value} placeholder={placeholder}  onChange={(e) => setValue(e.target.value)} className="mt-1" />
      ) : (
        <p className="text-base font-medium text-gray-900">{value}</p>
      )}
    </div>
  );
}

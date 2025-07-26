'use client';

import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Chart from "chart.js/auto";

export default function GlucoseMonitoring() {
  const [glucoseLevel, setGlucoseLevel] = useState<number | "">("");
  const [userId, setUserId] = useState<string | null>(null);
  const [readings, setReadings] = useState<{ time: string; level: number }[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const readingsRef = collection(db, "glucoseReadings", userId, "entries");
    const q = query(readingsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          time: d.timestamp.toDate().toLocaleTimeString(),
          level: d.level,
        };
      });
      setReadings(data);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!chartRef.current || !readings.length) return;

    // Destroy existing chart before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: readings.map((r) => r.time),
        datasets: [
          {
            label: "Glucose Level (mg/dL)",
            data: readings.map((r) => r.level),
            borderColor: "#0078D7",
            backgroundColor: "rgba(0, 120, 215, 0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 50,
            max: 400,
            title: { display: true, text: "Glucose Level (mg/dL)" },
          },
          x: {
            title: { display: true, text: "Time" },
          },
        },
      },
    });

    chartInstanceRef.current = newChart;
  }, [readings]);

  async function handleAddReading() {
    if (!userId || glucoseLevel === "" || glucoseLevel <= 0) {
      alert("Please enter a valid glucose level.");
      return;
    }

    const reading = {
      level: glucoseLevel,
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, "glucoseReadings", userId, "entries"), reading);
    setGlucoseLevel("");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-blue-700">
              Glucose Monitoring
            </CardTitle>
            <p className="text-center text-gray-500">
              Track and visualize your glucose levels
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Glucose Level (mg/dL):
              </label>
              <Input
                type="number"
                value={glucoseLevel}
                onChange={(e) =>
                  setGlucoseLevel(e.target.value === "" ? "" : parseFloat(e.target.value))
                }
                placeholder="Enter glucose level"
              />
              <Button className="w-full mt-3" onClick={handleAddReading}>
                Add Reading
              </Button>
            </div>
            <Separator />
            <div className="mt-6" style={{ height: "300px" }}>
              <canvas ref={chartRef} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

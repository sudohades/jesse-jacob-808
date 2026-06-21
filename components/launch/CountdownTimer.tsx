"use client";

import { useState, useEffect } from "react";
import { SITE_LAUNCH } from "@/lib/config/launch";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const launchDate = new Date(SITE_LAUNCH.launchDate);
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by not rendering until client-side
  if (!isClient) {
    return null;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="
            flex
            flex-col
            items-center
            rounded-xl
            border
            border-[rgba(255,255,255,0.08)]
            bg-[rgba(15,15,15,0.6)]
            backdrop-blur-md
            p-4
            sm:p-6
          "
        >
          <span className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-xs uppercase tracking-wider text-[var(--text-muted)] sm:text-sm">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

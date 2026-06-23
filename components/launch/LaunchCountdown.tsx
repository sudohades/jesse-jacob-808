"use client";

import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/feature-flags/launch";

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const remaining = getTimeRemaining();
      
      if (!remaining) {
        setIsVisible(false);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      setIsVisible(true);
      return {
        hours: remaining.hours,
        minutes: remaining.minutes,
        seconds: remaining.seconds,
      };
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
  if (!isClient || !isVisible) {
    return null;
  }

  const timeUnits = [
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="fixed top-4 right-4 z-50 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,15,0.85)] backdrop-blur-xl p-4 shadow-2xl">
      <div className="mb-2 text-xs uppercase tracking-wider text-[var(--text-muted)]">
        Launching In
      </div>
      <div className="flex gap-3">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center"
          >
            <span className="text-2xl font-bold text-[var(--text-primary)]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

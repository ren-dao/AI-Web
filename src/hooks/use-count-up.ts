"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  /** Target number to count up to */
  end: number;
  /** Duration in ms (default: 1500) */
  duration?: number;
  /** Whether to only start when scrolled into view (default: true) */
  startOnView?: boolean;
  /** Delay before starting in ms (default: 0) */
  delay?: number;
}

export function useCountUp({
  end,
  duration = 1500,
  startOnView = true,
  delay = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) {
      const timer = setTimeout(() => setHasStarted(true), delay);
      return () => clearTimeout(timer);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setHasStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, delay]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

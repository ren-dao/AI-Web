"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts in ms (default: 0) */
  delay?: number;
  /** Threshold for intersection observer (default: 0.1) */
  threshold?: number;
}

export function FadeInSection({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

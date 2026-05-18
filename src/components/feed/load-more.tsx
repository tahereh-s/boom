"use client";

import { useEffect, useRef } from "react";

export default function LoadMore({ onVisible }: any) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onVisible]);

  return <div ref={ref} className="h-10" />;
}
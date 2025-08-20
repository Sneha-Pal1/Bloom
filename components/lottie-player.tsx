"use client";

import React from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  src: string; // URL or public path to Lottie JSON
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  height?: number;
  width?: number;
}

export function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  className,
  height = 180,
  width,
}: LottiePlayerProps) {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;

    const loadAnimation = async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to load animation JSON");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        console.error("Lottie load error:", err);
        if (mounted) setData(null);
      }
    };

    loadAnimation();
    return () => {
      mounted = false;
    };
  }, [src]);

  if (!data) {
    return (
      <div
        className={`flex items-center justify-center ${className || ""}`}
        style={{ height, width }}
      >
        <p className="text-gray-500 text-sm">Loading animation...</p>
      </div>
    );
  }

  return (
    <Lottie
      animationData={data}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ height, width }}
    />
  );
}

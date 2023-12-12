"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Hero() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const heroStyle = {
    backgroundImage: 'url("/images/background1.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "22vh",
  };

  return (
    <div className="absolute w-full overflow-hidden" style={heroStyle}>
      <div
        className={clsx(
          isDark
            ? "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-transparent to-transparent"
            : "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-transparent to-transparent"
        )}
      />
    </div>
  );
}

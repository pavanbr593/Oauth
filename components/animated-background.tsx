"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client to avoid hydration mismatch
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-10" />
      
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          // Use seeded random values based on index
          const xPos = (i * 17 % 100);
          const yPos = (i * 23 % 100);
          const scale = 0.5 + (i % 10) / 10;
          const width = 100 + (i * 31 % 400);
          const height = 100 + (i * 37 % 400);
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
              initial={{
                x: `${xPos}%`,
                y: `${yPos}%`,
                scale: scale,
              }}
              animate={{
                x: `${(xPos + 30) % 100}%`,
                y: `${(yPos + 40) % 100}%`,
                scale: scale + 0.1,
              }}
              transition={{
                duration: 10 + (i % 10),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                filter: "blur(40px)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

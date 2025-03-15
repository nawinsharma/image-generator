"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black opacity-80" />

      {isClient && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
            animate={{
              x: mousePosition.x - 200,
              y: mousePosition.y - 200,
            }}
            transition={{ type: "spring", damping: 20 }}
          />

          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
            animate={{
              x: mousePosition.x - 300,
              y: mousePosition.y - 100,
            }}
            transition={{ type: "spring", damping: 25, delay: 0.1 }}
          />
        </>
      )}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM0NDQ0NjYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjkuNSIvPjxwYXRoIGQ9Ik01OS41IDMwLjVIM00zMCAuNXYyOSIvPjwvZz48L3N2Zz4=')]" />
    </div>
  );
}

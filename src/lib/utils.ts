import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomFuturisticPrompt(): string {
  const prompts = [
    "A futuristic city with floating buildings and flying vehicles",
    "A cybernetic being with glowing circuits in a neon-lit alley",
    "A space station orbiting a distant planet with multiple moons",
    "An advanced AI interface displaying holographic data",
    "Robots and humans working together in a high-tech laboratory"
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}
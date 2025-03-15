'use client';

import { useState } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { AnimatedHeading } from '@/components/AnimatedText';
import PromptForm from '@/components/PromptForm';
import ImageDisplay from '@/components/ImageDisplay';
import { motion } from 'framer-motion';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (promptText: string) => {
    setIsLoading(true);
    setError(null);
    setPrompt(promptText);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(`${data.imageUrl}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 flex flex-col items-center z-10 w-full max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedHeading className="mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="gradient-text font-bold">AI Image Generator</span>
          </AnimatedHeading>
          
          <AnimatedHeading 
            size="h3" 
            className="flex justify-center items-center text-neutral-300 font-normal max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            Transform your ideas into stunning visuals
          </AnimatedHeading>
        </motion.div>
        
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-md w-full max-w-2xl"
          >
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="currentColor" />
              </svg>
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          </motion.div>
        )}
        
        <motion.div
          className="flex justify-center items-center w-full mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageDisplay 
            imageUrl={imageUrl} 
            alt={prompt} 
            isLoading={isLoading} 
          />
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center text-neutral-400 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Create beautiful AI-generated images with just a prompt
      </motion.div>
    </main>
  );
}

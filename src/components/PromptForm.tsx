'use client';

import { useState, useRef, FormEvent } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { getRandomFuturisticPrompt } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };
  
  const handleRandomPrompt = () => {
    const randomPrompt = getRandomFuturisticPrompt();
    setPrompt(randomPrompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <motion.div 
            className="absolute -inset-px rounded-lg"
            animate={{ 
              boxShadow: isFocused 
                ? "0 0 0 2px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)" 
                : "0 0 0 0 rgba(168, 85, 247, 0)" 
            }}
            transition={{ duration: 0.2 }}
          />
          
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-h-32 w-full text-lg bg-white/5 backdrop-blur-sm border-neutral-700 text-white placeholder:text-neutral-400 focus:border-purple-500"
            placeholder="Describe the image you want to generate..."
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex-1 gap-2 cursor-pointer font-medium"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                />
              ) : (
                <motion.svg
                  key="icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              )}
            </AnimatePresence>
            {isLoading ? "Generating..." : "Generate Image"}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={handleRandomPrompt}
            disabled={isLoading}
            className="bg-black/30 cursor-pointer border-neutral-700 text-white hover:bg-black/50 hover:text-purple-200"
          >
            Random Idea
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
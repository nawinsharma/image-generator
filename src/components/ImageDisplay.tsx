'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  alt: string;
  isLoading: boolean;
}

export default function ImageDisplay({ imageUrl, alt, isLoading }: ImageDisplayProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div 
      className="w-full max-w-2xl mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-neutral-700 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className="absolute w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <motion.div 
                  className="absolute w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <motion.div 
                  className="text-white text-lg font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Generating
                </motion.div>
              </div>
            </motion.div>
          ) : imageUrl ? (
            <motion.div 
              key="image"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isImageLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={imageUrl}
                alt={alt || "Generated image"}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
              
              {/* Overlay with subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-purple-500 opacity-70" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-blue-500 opacity-70" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-blue-500 opacity-70" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-purple-500 opacity-70" />
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 text-neutral-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
              <motion.p 
                className="text-lg"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Your AI-generated masterpiece will appear here
              </motion.p>
              <motion.p 
                className="text-sm text-neutral-500 mt-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Describe something amazing in the prompt box above
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Download and share buttons */}
      {imageUrl && isImageLoaded && (
        <motion.div 
          className="mt-4 flex justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V16M12 16L8 12M12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download
          </motion.a>
          
          <motion.button 
            onClick={() => {
              if (imageUrl) {
                navigator.clipboard.writeText(imageUrl)
                  .then(() => alert('Image URL copied to clipboard!'))
                  .catch(err => console.error('Could not copy URL: ', err));
              }
            }}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="currentColor" strokeWidth="2" />
            </svg>
            Copy URL
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
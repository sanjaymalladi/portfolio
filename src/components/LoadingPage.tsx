import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingPageProps {
  onComplete: () => void;
}

const greetings = [
  { text: "Hello", language: "English" },
  { text: "Bonjour", language: "French" },
  { text: "你好", language: "Chinese" },
  { text: "Hola", language: "Spanish" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Olá", language: "Portuguese" },
  { text: "Привет", language: "Russian" },
  { text: "مرحبا", language: "Arabic" }
];

const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < greetings.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoaded(true);
          setTimeout(onComplete, 500);
        }, 1000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [currentIndex, onComplete]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
        >
          <div className="w-full max-w-md flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key={currentIndex}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-2 text-foreground">
                {greetings[currentIndex].text}
              </h1>
              <p className="text-foreground/80 text-lg font-medium">
                {greetings[currentIndex].language}
              </p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
            className="h-[2px] bg-neon-purple absolute bottom-10 left-0"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingPage;

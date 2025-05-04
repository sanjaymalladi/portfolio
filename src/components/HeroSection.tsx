import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import { cn } from "@/lib/utils";

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="container relative mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main content container */}
          <div className="relative w-full max-w-7xl mx-auto pt-12">
            {/* Background text */}
            <div className="absolute inset-0 flex flex-col items-center z-10 pt-4 sm:pt-8">
              <h1 className={cn(
                "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-bold tracking-tighter mix-blend-difference leading-none",
                theme === 'dark' ? "text-white" : "text-gray-900"
              )}>
                <span className="block">Ai enthusiast</span>
                <div className="flex items-center justify-center">
                  <span className="block">&</span>
                  <span className="block ml-2 sm:ml-4">Developer</span>
                </div>
              </h1>
            </div>

            {/* Centered content with image */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Image container with gradient fade */}
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="relative">
                  <img 
                    src="/hero.png"
                    alt="AI Developer Illustration" 
                    className="w-full h-auto object-contain"
                  />
                  {/* Gradient fade overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 md:h-40 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                
                {/* Floating logos */}
                <motion.div 
                  className="absolute top-12 sm:top-20 -right-4 sm:-right-8 rounded-full p-1 sm:p-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center backdrop-blur-sm bg-white/10"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="/logos/pytorch-icon-1694x2048-jgwjy3ne.png" 
                    alt="PyTorch Logo" 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute top-24 sm:top-40 -left-4 sm:-left-8 rounded-full p-1 sm:p-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center backdrop-blur-sm bg-white/10"
                  animate={{ y: [0, 15, 0], rotate: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <img 
                    src="/logos/gradio-color.png" 
                    alt="Gradio Logo" 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-24 sm:bottom-40 right-0 rounded-full p-1 sm:p-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center backdrop-blur-sm bg-white/10"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <img 
                    src="/logos/gemini_icon-logo_brandlogos.net_bqzeu-512x512.png" 
                    alt="Gemini Logo" 
                    className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                  />
                </motion.div>
              </div>

              {/* Buttons below image */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] px-6 sm:px-8 py-2 sm:py-3 text-white rounded-md text-sm sm:text-lg"
                >
                  <a href="#projects">View Projects</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-lg"
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

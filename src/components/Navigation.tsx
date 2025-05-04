import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Home, Search, Heart, User, Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Search },
    { id: 'about', label: 'About', icon: Heart },
    { id: 'contact', label: 'Contact', icon: User }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 p-0"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar Navigation */}
      <nav className={cn(
        "fixed left-0 top-0 h-full z-40 w-16 md:w-20 flex flex-col backdrop-blur-md border-r border-border",
        "bg-background/50",
        "transition-all duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="pt-4 px-4">
          <div className="flex items-center justify-center w-10 h-10 mx-auto">
            <img 
              src="/web-app-manifest-512x512.png" 
              alt="Logo" 
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 flex-1 justify-center px-4">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full h-10 p-0 flex items-center justify-center relative",
                  activeSection === item.id ? "text-neon-purple" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.label}</span>
                <span className={cn(
                  "absolute left-full ml-2 px-2 py-1 text-xs rounded-md whitespace-nowrap",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "bg-background/80 backdrop-blur-sm border border-border"
                )}>
                  {item.label}
                </span>
              </Button>
              {activeSection === item.id && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-neon-purple" />
              )}
            </div>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="px-4 pb-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-10 p-0 flex items-center justify-center"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sanjaymalladi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Github className="w-4 h-4 stroke-[1.5px]" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/sanjaymalladi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin className="w-4 h-4 stroke-[1.5px]" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:malladisanjay29@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Mail className="w-4 h-4 stroke-[1.5px]" />
              <span className="sr-only">Email</span>
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Sanjay Malladi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

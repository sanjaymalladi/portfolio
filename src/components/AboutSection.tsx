import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container">
        <h2 className="heading mb-4 text-center">About Me</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Chemical Engineering student at NIT Andhra Pradesh and Data Science student at IIT Madras, passionate about leveraging AI to solve real-world challenges.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From Chemistry to Code
            </h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Currently contributing as an AI Intern at Prosapiens HR Solutions, where I develop software and AI-powered solutions 
                to streamline recruitment processes. My unique background in Chemical Engineering provides an analytical approach to problem-solving.
              </p>
              
              <p>
                I've published research in the field of Nanocomposites/Nanomaterials for Biofuel Production and conducted 
                CO2 hydrogenation research at IIT BHU. This interdisciplinary experience enhances my approach to AI development.
              </p>
              
              <p>
                Beyond technical work, I've demonstrated leadership as Sponsorship Lead at TEDx NIT Andhra Pradesh, 
                Technical Head at Graphic Cafe, and Joint Secretary of the Chemical Engineering Association.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-secondary/30 border border-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-2 text-neon-purple">Skills & Expertise</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">AI/ML Development</span>
                      <span className="text-sm">95%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Python & Data Science</span>
                      <span className="text-sm">90%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Web Development</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Chemical Engineering</span>
                      <span className="text-sm">90%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-2 text-neon-blue">Education</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">B.Tech in Chemical Engineering</h5>
                    <p className="text-sm text-muted-foreground">National Institute of Technology, Andhra Pradesh</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium">B.Sc in Data Science</h5>
                    <p className="text-sm text-muted-foreground">Indian Institute of Technology, Madras</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

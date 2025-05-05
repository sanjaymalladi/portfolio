import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Brain, Terminal, Beaker } from 'lucide-react';

const AboutSection: React.FC = () => {
  const skills = {
    programming: {
      icon: Code2,
      title: "Programming",
      skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Pandas", "NumPy"]
    },
    aiml: {
      icon: Brain,
      title: "AI/ML",
      skills: ["Natural Language Processing", "Computer Vision", "Data Analysis", "Machine Learning"]
    },
    frameworks: {
      icon: Terminal,
      title: "Frameworks & Tools",
      skills: ["Flask", "Streamlit", "FastAPI", "Git", "Jupyter", "Power BI"]
    },
    chemical: {
      icon: Beaker,
      title: "Chemical Engineering",
      skills: ["Process Design", "Gas Chromatography", "X-ray Diffraction", "Catalyst Characterization"]
    }
  };

  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container">
        <h2 className="heading mb-4 text-center">About Me</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Highly motivated Chemical Engineering student at NIT Andhra Pradesh and Data Science student at IIT Madras, adept at leveraging AI and machine learning to address real-world challenges.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Experience & Achievements
            </h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Currently contributing as an AI Intern at Prosapiens HR Solutions, where I develop software and AI-powered solutions 
                to streamline recruitment processes. My unique background in Chemical Engineering provides an analytical approach to problem-solving.
              </p>
              
              <p>
                I've published a book chapter on "Nanocomposites/Nanomaterials and the Risk Management of Biofuels Production" 
                and conducted CO2 hydrogenation research at IIT BHU using Ni/MgAl2O3 catalysts, performing product analysis with 
                Gas Chromatography and catalyst characterization with X-ray Diffraction.
              </p>
              
              <p>
                In leadership roles, I served as Sponsorship Lead at TEDx NIT Andhra Pradesh (securing 80% of event budget), 
                Technical Head at Graphic Cafe (increasing digital engagement by 30%), and Joint Secretary of the Chemical 
                Engineering Association (improving participation by 20%).
              </p>
          </div>
          
            <Card className="mt-6 bg-secondary/30 border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300">
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
          
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(skills).map(([key, category]) => (
              <Card key={key} className="bg-secondary/30 border border-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-neon-purple/20">
                      <category.icon className="w-5 h-5 text-neon-purple" />
                    </div>
                    <h4 className="text-lg font-semibold text-neon-purple">{category.title}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-secondary/50 border border-neon-purple/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  problem: string;
  technologies: string[];
  role: string;
  impact: string;
  link: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Heat GPT (Only Local)",
    description: "A chatbot to interact with heat exchanger data locally with a static dashboard for data overview.",
    problem: "Engineers need efficient ways to analyze and interact with heat exchanger data without manual data processing.",
    technologies: ["Python", "LangChain", "Local LLMs", "Data Visualization", "Dashboard Development"],
    role: "Developed the chatbot interface and dashboard, implemented data processing pipeline.",
    impact: "Streamlined heat exchanger data analysis process, making it more accessible and interactive.",
    link: "#",
    image: "/projects/heat-gpt.png"
  },
  {
    title: "AI Teaching Assistant",
    description: "An AI-powered assistant for teaching Data Structures and Algorithms using the Socratic method.",
    problem: "Students need personalized guidance and interactive learning experiences for complex programming concepts.",
    technologies: ["Python", "Gemini API", "Streamlit", "DSA", "Educational Design"],
    role: "Designed the interactive question-answering flows and implemented adaptive learning models.",
    impact: "Enhanced learning experience through personalized guidance and interactive problem-solving.",
    link: "https://askalgo.vercel.app/",
    image: "/projects/ai-teaching.png"
  },
  {
    title: "Career AI (In Progress)",
    description: "A personalized career recommendation tool using machine learning and NLP techniques.",
    problem: "Students and professionals need data-driven guidance for career decisions and skill development.",
    technologies: ["Machine Learning", "NLP", "Python", "Data Analysis", "Recommendation Systems"],
    role: "Building the recommendation engine and implementing skill tracking functionality.",
    impact: "Work in progress - Aiming to provide personalized career guidance based on individual skills and market trends.",
    link: "#",
    image: "/projects/career-ai.png"
  },
  {
    title: "AI Notes Maker",
    description: "An AI system to generate concise, context-aware notes from academic resources using local LLMs.",
    problem: "Students need efficient ways to create and organize study materials from various academic sources.",
    technologies: ["Local LLMs", "NLP", "Python", "Semantic Analysis", "Document Processing"],
    role: "Created the note generation system and implemented chat functionality with notes.",
    impact: "Automated the note-taking process while maintaining context and enabling interactive learning.",
    link: "https://huggingface.co/spaces/sanjaymalladi/AI_Document_Chat_Assistant",
    image: "/projects/ai-notes.png"
  }
];

const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="heading mb-4 text-center">Projects</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Case studies of AI applications I've built to solve real-world problems.
          Each project demonstrates my expertise in different AI technologies and development practices.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setHoveredProject(project.title)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Card className="bg-secondary/30 border border-border hover:border-neon-purple/50 transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neon-purple mb-1">Problem</h4>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neon-purple mb-1">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-secondary py-1 px-2 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neon-purple mb-1">Role & Contribution</h4>
                    <p className="text-sm text-muted-foreground">{project.role}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-neon-purple mb-1">Impact</h4>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-2">
                  <Button variant="default" className="w-full bg-neon-purple hover:bg-neon-purple/80">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                      View Project
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Image Preview */}
              {hoveredProject === project.title && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute -right-4 top-0 w-80 bg-background/80 backdrop-blur-sm z-50 rounded-lg overflow-hidden shadow-xl border border-border p-2"
                >
                  <div className="relative w-full aspect-auto">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

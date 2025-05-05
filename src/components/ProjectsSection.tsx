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
    description: "Developing an AI-powered assistant for teaching Data Structures and Algorithms using the Socratic method and Gemini API.",
    problem: "Students need personalized guidance and interactive learning experiences for complex programming concepts.",
    technologies: ["Python", "Gemini API", "Streamlit", "DSA", "Educational Design"],
    role: "Designed interactive question-answering flows with adaptive learning models.",
    impact: "Enhanced learning experience through personalized guidance and interactive problem-solving.",
    link: "#",
    image: "/projects/ai-teaching.png"
  },
  {
    title: "Career AI (In Progress)",
    description: "A personalized career recommendation tool using machine learning and NLP techniques.",
    problem: "Students and professionals need data-driven guidance for career decisions and skill development.",
    technologies: ["Machine Learning", "NLP", "Python", "Data Analysis", "Recommendation Systems"],
    role: "Building the recommendation engine and implementing skill tracking functionality.",
    impact: "Work in progress - Focuses on skill tracking and tailored growth suggestions.",
    link: "#",
    image: "/projects/career-ai.png"
  },
  {
    title: "AI Notes Maker",
    description: "Created an AI system to generate concise, context-aware notes from academic resources using local LLMs.",
    problem: "Students need efficient ways to create and organize study materials from various academic sources.",
    technologies: ["Local LLMs", "NLP", "Python", "Semantic Analysis", "Document Processing"],
    role: "Integrated semantic analysis and natural language processing for summarization and chat functionality with notes.",
    impact: "Automated the note-taking process while maintaining context and enabling interactive learning.",
    link: "https://huggingface.co/spaces/sanjaymalladi/AI_Document_Chat_Assistant",
    image: "/projects/ai-notes.png"
  },
  {
    title: "Virtual Try-On using AI",
    description: "Utilized ComfyUI and the Segment Anything Model (SAM) to implement a virtual try-on feature.",
    problem: "Users need a way to visualize how different outfits would look on them without physically trying them on.",
    technologies: ["ComfyUI", "SAM", "Image Processing", "AI Models"],
    role: "Implemented the virtual try-on system using advanced AI models and image segmentation.",
    impact: "Allows users to visualize different outfits on a segmented image of themselves.",
    link: "https://www.notion.so/sanjaymalladi/Assignment-1-Advanced-Image-Generation-Techniques-Submission-Template-1bb6bc66ed7280bc96b7db09b3113886?pvs=4",
    image: "/projects/virtual-tryon.png"
  },
  {
    title: "AI-Generated Ramp Walk Video",
    description: "Leveraged image-to-video models (WAN 2.1) and a trained LoRA to generate a ramp walk video.",
    problem: "Creating realistic fashion videos requires extensive resources and production time.",
    technologies: ["WAN 2.1", "LoRA Training", "Video Generation", "AI Models", "ComfyUI"],
    role: "Trained and implemented the video generation system with realistic details.",
    impact: "Generated videos showcasing subjects performing ramp walks with seamless outfit changes.",
    link: "https://www.notion.so/sanjaymalladi/MID-Capstone-Project-Template-1db6bc66ed7280599920db05b90cbeab?pvs=4",
    image: "/projects/rampwalk.gif"
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="heading mb-4 text-center">Projects</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A showcase of AI applications and technical projects demonstrating expertise in various domains.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-secondary/30 dark:bg-black/40 border border-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300 flex flex-col hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] group"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover object-top rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
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
                      <span 
                        key={i} 
                        className="text-xs bg-secondary dark:bg-black/60 py-1 px-2 rounded-full border border-neon-purple/10"
                      >
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
              
              <CardFooter>
                <Button 
                  variant="default" 
                  className="w-full bg-neon-purple hover:bg-neon-purple/80 transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    View Project
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

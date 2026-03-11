import { useEffect, useState } from "react";

// Arrow icon component
const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

// Bauhaus Composition Box - Abstract geometric art element
const BauhausCompositionBox = () => (
  <div className="grid grid-cols-12 grid-rows-12 gap-0 border-4 border-bauhaus-ink aspect-square w-full max-w-md">
    {/* Red block - top left */}
    <div className="col-span-5 row-span-4 bg-bauhaus-red border-r-4 border-b-4 border-bauhaus-ink" />

    {/* Yellow block - top right */}
    <div className="col-span-7 row-span-4 bg-bauhaus-yellow border-b-4 border-bauhaus-ink" />

    {/* White block with circular inset - bottom left */}
    <div className="col-span-8 row-span-8 bg-white border-r-4 border-bauhaus-ink relative flex items-center justify-center">
      <div className="w-3/4 aspect-square rounded-full bg-bauhaus-blue overflow-hidden border-4 border-bauhaus-ink">
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)"
          }}
        />
      </div>
    </div>

    {/* Grey/Yellow stack - right side */}
    <div className="col-span-4 row-span-4 bg-bauhaus-ink" />
    <div className="col-span-4 row-span-4 bg-bauhaus-yellow" />
  </div>
);

// Social Card Component
const SocialCard = ({
  bgColor,
  label,
  href,
  iconBg = "white",
}: {
  bgColor: string;
  label: string;
  href: string;
  iconBg?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`bauhaus-card ${bgColor} p-6 relative group cursor-pointer`}
  >
    <div
      className={`w-12 h-12 rounded-full border-4 border-bauhaus-ink mb-4 flex items-center justify-center`}
      style={{ backgroundColor: iconBg }}
    >
      <span className="font-outfit font-black text-lg">{label[0]}</span>
    </div>
    <p className="bauhaus-subheader text-bauhaus-ink">{label}</p>
    <div className="absolute top-4 right-4 rotate-45 transition-transform duration-200 ease-bauhaus group-hover:rotate-0">
      <ArrowIcon />
    </div>
  </a>
);

// Project Card Component
const ProjectCard = ({
  title,
  description,
  tags,
  bgColor = "bg-white",
  href,
  hrefLabel = "GitHub",
  demoUrl,
  demoLabel = "Live Demo",
}: {
  title: string;
  description: string;
  tags: string[];
  bgColor?: string;
  href?: string;
  hrefLabel?: string;
  demoUrl?: string;
  demoLabel?: string;
}) => {
  const isDarkCard = bgColor === "bg-bauhaus-blue" || bgColor === "bg-bauhaus-red";
  const textClass = isDarkCard ? "text-white" : "text-bauhaus-ink";
  const bodyClass = isDarkCard ? "text-white/90" : "text-bauhaus-ink/80";
  const tagClass = isDarkCard
    ? "px-3 py-1 border-2 border-white/80 text-white text-sm font-outfit font-bold uppercase"
    : "px-3 py-1 border-2 border-bauhaus-ink text-sm font-outfit font-bold uppercase";
  return (
  <div className={`bauhaus-card ${bgColor} p-6 relative`}>
    <h3 className={`font-outfit font-black text-2xl uppercase mb-2 ${textClass}`}>{title}</h3>
    <p className={`bauhaus-body mb-4 ${bodyClass}`}>{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className={tagClass}
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex gap-3">
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`bauhaus-btn text-sm py-2 px-4 inline-flex items-center gap-2 ${isDarkCard ? "bg-white text-bauhaus-ink" : ""}`}
        >
          {hrefLabel}
          <ArrowIcon className="w-4 h-4" />
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`bauhaus-btn text-sm py-2 px-4 inline-flex items-center gap-2 ${isDarkCard ? "bg-white text-bauhaus-blue" : "bg-bauhaus-blue text-white"}`}
        >
          {demoLabel}
          <ArrowIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  </div>
  );
};

const PortfolioLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(20);

  const dotStyle: React.CSSProperties = {
    color: "transparent",
    backgroundImage: "radial-gradient(#111 1.3px, transparent 1.4px)",
    backgroundSize: "7px 7px",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  };

  useEffect(() => {
    let loadingInterval: number | null = null;
    let doneTimeout: number | null = null;

    loadingInterval = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.ceil(Math.random() * 8));
        if (next >= 100) {
          if (loadingInterval) window.clearInterval(loadingInterval);
          doneTimeout = window.setTimeout(onComplete, 220);
        }
        return next;
      });
    }, 140);

    return () => {
      if (loadingInterval) window.clearInterval(loadingInterval);
      if (doneTimeout) window.clearTimeout(doneTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-white">
      <div className="text-right px-4">
        <div
          className="text-[clamp(64px,16vw,210px)] leading-none font-outfit font-black tabular-nums"
          style={dotStyle}
        >
          {String(progress).padStart(3, "0")}%
        </div>
        <p className="text-[10px] md:text-xs font-outfit uppercase tracking-[0.22em] text-bauhaus-ink/65 mt-1">
          [/SM26]
        </p>
      </div>
    </div>
  );
};

const experienceItems = [
  {
    role: "Workflow Engineer",
    org: "ShopOS",
    type: "Self-employed",
    period: "Jun 2025 - Present",
    highlight: "Building AI workflow systems for creative and e-commerce use cases.",
    accent: "bg-bauhaus-blue text-white",
    chip: "AI ENGINEERING",
  },
  {
    role: "Summer Research Intern",
    org: "College of Control Science and Engineering, Zhejiang University",
    type: "Internship",
    period: "May 2025 - Jun 2025",
    highlight: "Contributed to applied research workflows in control systems and intelligent engineering.",
    accent: "bg-bauhaus-red text-white",
    chip: "RESEARCH",
  },
  {
    role: "Technical Head",
    org: "Graphic Cafe - Media Cell of NIT Andhra",
    type: "Full-time",
    period: "Oct 2024 - May 2025",
    highlight: "Led technical execution and event systems for campus media initiatives.",
    accent: "bg-bauhaus-yellow text-bauhaus-ink",
    chip: "LEADERSHIP",
  },
  {
    role: "Sponsorship Lead",
    org: "TEDx NIT Andhra Pradesh",
    type: "Full-time",
    period: "May 2024 - Nov 2024",
    highlight: "Drove sponsor outreach and partnership execution for flagship TEDx events.",
    accent: "bg-white text-bauhaus-ink",
    chip: "PARTNERSHIPS",
  },
  {
    role: "Summer Intern",
    org: "Indian Institute of Technology (BHU), Varanasi",
    type: "Internship",
    period: "May 2024 - Jul 2024",
    highlight: "Worked on catalyst characterization and analysis including X-ray diffraction and TPR.",
    accent: "bg-bauhaus-blue text-white",
    chip: "CHEM + DATA",
  },
];


const navItems = ["About", "Experience", "Projects", "Education", "Contact"];

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const scrollToSection = (item: string) => {
    document
      .getElementById(item.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {showLoader && <PortfolioLoader onComplete={() => setShowLoader(false)} />}
      <div
        className={`min-h-screen font-outfit relative z-10 transition-opacity duration-500 ${showLoader ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
      {/* Top Label Row */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bauhaus-offwhite border-b-4 border-bauhaus-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Colored circles - no name in nav */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-bauhaus-red border-2 sm:border-4 border-bauhaus-ink" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-bauhaus-yellow border-2 sm:border-4 border-bauhaus-ink" />
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-bauhaus-blue border-2 sm:border-4 border-bauhaus-ink" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="bauhaus-btn text-sm py-2 px-4"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bauhaus-btn text-sm py-2 px-3"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-4 border-bauhaus-ink bg-bauhaus-offwhite">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="bauhaus-btn text-sm py-3 px-4 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <p className="bauhaus-subheader text-bauhaus-blue">
                CREATIVE DEVELOPER
              </p>
              <h1 className="bauhaus-headline">
                SANJAY
                <br />
                MALLADI
              </h1>
            </div>

            {/* Status blocks */}
            <div className="flex flex-wrap gap-4">
              <div className="bauhaus-container bg-bauhaus-yellow p-4">
                <p className="bauhaus-subheader text-sm">STATUS</p>
                <p className="font-outfit font-bold text-lg">AVAILABLE</p>
              </div>
              <div className="bauhaus-container bg-white p-4">
                <p className="bauhaus-subheader text-sm">FOCUS</p>
                <p className="font-outfit font-bold text-lg">GENAI & WEB</p>
              </div>
            </div>

            <p className="bauhaus-body max-w-lg">
              GenAI Engineer building intelligent systems. Specializing in
              ComfyUI, LLMs, and full-stack development. Creating tools that
              bridge creativity and technology.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bauhaus-btn bg-bauhaus-red text-white"
            >
              Get In Touch
              <ArrowIcon className="inline-block ml-2 -mt-1" />
            </button>
          </div>

          {/* Right side - Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="border-4 border-bauhaus-ink overflow-hidden bg-white">
                <img
                  src="/assests/main.png"
                  alt="Sanjay Malladi"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative Bauhaus elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-bauhaus-red border-4 border-bauhaus-ink -z-10" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-bauhaus-blue border-4 border-bauhaus-ink -z-10" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-bauhaus-yellow border-4 border-bauhaus-ink -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bauhaus-divider" />

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Label */}
          <div className="lg:col-span-4">
            <p className="bauhaus-subheader text-bauhaus-red sticky top-32">
              ABOUT ME
            </p>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-outfit font-black text-4xl uppercase">
              Building The Future With AI
            </h2>
            <p className="bauhaus-body">
              I'm a ComfyUI Engineer at ShopOS, where I develop AI-powered tools
              for creative workflows. With 53+ repositories and a passion for
              generative AI, I bridge the gap between complex machine learning
              systems and practical applications.
            </p>
            <p className="bauhaus-body">
              My expertise spans across Python, TypeScript, React, and various
              AI/ML frameworks. I believe in building systems that are not only
              powerful but also intuitive and accessible.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {["Python", "TypeScript", "React", "ComfyUI", "LLMs", "Full-Stack", "GenAI", "APIs"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="border-4 border-bauhaus-ink p-3 text-center font-outfit font-bold uppercase"
                  >
                    {skill}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bauhaus-divider" />

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-bauhaus-offwhite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="bauhaus-subheader text-bauhaus-ink sticky top-32">
              EXPERIENCE
            </p>
          </div>

          <div className="lg:col-span-8 space-y-5">
            {experienceItems.map((item) => (
              <div key={`${item.role}-${item.org}`} className="bauhaus-card bg-white p-0 overflow-hidden">
                <div className="grid md:grid-cols-12">
                  <div className={`md:col-span-4 p-5 border-b-4 md:border-b-0 md:border-r-4 border-bauhaus-ink ${item.accent}`}>
                    <p className="text-xs font-outfit font-bold uppercase tracking-widest mb-3">{item.chip}</p>
                    <h3 className="font-outfit font-black text-xl uppercase leading-tight">{item.role}</h3>
                  </div>
                  <div className="md:col-span-8 p-5 bg-white">
                    <p className="font-outfit font-bold text-lg leading-tight">{item.org}</p>
                    <p className="text-sm uppercase tracking-wider text-bauhaus-ink/60 mt-1">
                      {item.type} - {item.period}
                    </p>
                    <p className="bauhaus-body mt-3 text-bauhaus-ink/80">{item.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bauhaus-divider" />

      {/* Selected Work Section - moved up */}
      <section id="projects" className="py-20 px-6 bg-bauhaus-offwhite">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Label */}
          <div className="lg:col-span-4">
            <p className="bauhaus-subheader text-bauhaus-blue sticky top-32">
              SELECTED WORK
            </p>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bauhaus-card bg-white p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="bauhaus-subheader text-sm text-bauhaus-blue">GITHUB PRESENCE</p>
                  <div className="mt-2 text-4xl font-outfit font-black">57 REPOS</div>
                  <p className="bauhaus-body text-bauhaus-ink/70 mt-2">
                    Built across hackathons, experiments, and fun side projects.
                  </p>
                </div>
                <div className="flex flex-col sm:items-end justify-end gap-3">
                  <a
                    href="https://github.com/sanjaymalladi?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bauhaus-btn text-sm py-2 px-4 inline-flex items-center gap-2"
                  >
                    View All Repositories
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/sanjaymalladi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bauhaus-btn bg-bauhaus-blue text-white text-sm py-2 px-4 inline-flex items-center gap-2"
                  >
                    View Commit Activity
                    <ArrowIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            <ProjectCard
              title="AI Avatar Explainer Video"
              description="Create AI avatar explainer videos for free using ComfyUI and open-source tools. Only human input: the script. Everything else—voice, avatar, visuals—is automated."
              tags={["ComfyUI", "Open Source", "AI Avatar", "Video"]}
              bgColor="bg-bauhaus-blue"
            />
            <ProjectCard
              title="India Demographic Insights"
              description="Built an interactive geospatial analytics dashboard to visualize Aadhaar demographic trends across Indian states, with map-based drilldowns and expert analytics views."
              tags={["Next.js", "React", "TypeScript", "Geospatial Analytics", "Hackathon"]}
              bgColor="bg-white"
              href="https://github.com/sanjaymalladi/aadhaar-data-analysis"
              demoUrl="https://aadhaar-data-analysis.vercel.app/"
              demoLabel="View Demo"
            />
            <ProjectCard
              title="AI Ramp Walk"
              description="Generative video pipeline using WAN 2.1 and LoRA to create realistic fashion runway clips with smooth outfit transitions."
              tags={["Generative Video", "LoRA", "WAN 2.1", "ComfyUI"]}
              bgColor="bg-bauhaus-red"
              href="https://www.notion.so/sanjaymalladi/MID-Capstone-Project-Template-1db6bc66ed7280599920db05b90cbeab"
              hrefLabel="Notion Doc"
            />
            <ProjectCard
              title="Heat GPT"
              description="Under-NDA project in collaboration with my Summer Research Intern position at the College of Control Science and Engineering, Zhejiang University. Focused on heat exchanger analysis with an LLM-assisted local workflow."
              tags={["NDA", "Research Collaboration", "LLM", "Heat Exchangers"]}
              bgColor="bg-white"
            />
            <ProjectCard
              title="InfluencerFlow"
              description="AI-powered influencer discovery and outreach platform for seamless creator collaborations."
              tags={["JavaScript", "AI", "Platform", "Hackathon", "Finalist"]}
              bgColor="bg-bauhaus-blue"
              href="https://github.com/sanjaymalladi/influencerflow"
              demoUrl="https://influencerflow.vercel.app/"
            />
            <ProjectCard
              title="Cluely for Brands"
              description="AI-Powered Product Photography Generator – Transform your product images into stunning brand-specific marketing content."
              tags={["TypeScript", "GenAI", "Marketing", "Hackathon"]}
              bgColor="bg-white"
              href="https://github.com/sanjaymalladi/cluely-for-brands"
              demoUrl="https://cluely-for-brands.vercel.app/"
            />
            <ProjectCard
              title="AskAlgo"
              description="A Socratic method AI tutor for data structures and algorithms using Gemini AI."
              tags={["JavaScript", "FastAPI", "Gemini", "Hackathon"]}
              bgColor="bg-bauhaus-yellow"
              href="https://github.com/sanjaymalladi/AskAlgo"
              demoUrl="https://askalgo.vercel.app/"
            />
            <ProjectCard
              title="Local Video Generator"
              description="A modern web application that converts text descriptions into animated educational videos using AI."
              tags={["Python", "AI", "Video"]}
              bgColor="bg-white"
              href="https://github.com/sanjaymalladi/local-video-generator"
            />
            <ProjectCard
              title="Echosphere"
              description="A modern social audio platform that allows users to join or create audio chat rooms."
              tags={["TypeScript", "Social", "Audio", "Hackathon", "Finalist"]}
              bgColor="bg-bauhaus-red"
              href="https://github.com/sanjaymalladi/echosphere"
              demoUrl="https://echo-sphere-plan.vercel.app/"
            />
            <ProjectCard
              title="imgshift"
              description="A Python library for universal image format conversion with a focus on SVG support and minimal dependencies."
              tags={["Python", "Library", "Images"]}
              bgColor="bg-white"
              href="https://github.com/sanjaymalladi/imgshift"
            />
            <ProjectCard
              title="SanjayAI"
              description="An intelligent tool designed to fetch and summarize research papers from arXiv."
              tags={["Python", "NLP", "Research"]}
              bgColor="bg-bauhaus-blue"
              href="https://github.com/sanjaymalladi/SanjayAi"
              demoUrl="https://sanjayai.streamlit.app/"
            />
            <ProjectCard
              title="Career AI"
              description="A modern career management platform with AI-powered resume analysis and job matching."
              tags={["TypeScript", "Next.js", "AI", "Hackathon"]}
              bgColor="bg-white"
              href="https://github.com/sanjaymalladi/career-ai"
              demoUrl="https://portfolio-ai-gamma.vercel.app"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bauhaus-divider" />

      {/* Education Section - moved down */}
      <section id="education" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Label */}
          <div className="lg:col-span-4">
            <p className="bauhaus-subheader text-bauhaus-yellow sticky top-32">
              EDUCATION
            </p>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* NIT Andhra Pradesh */}
            <div className="bauhaus-card bg-white p-6">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-outfit font-black text-xl uppercase">
                    B.Tech Chemical Engineering
                  </h3>
                  <p className="bauhaus-body text-bauhaus-ink/70">
                    National Institute of Technology, Andhra Pradesh
                  </p>
                </div>
                <span className="px-3 py-1 bg-bauhaus-red text-white text-sm font-outfit font-bold uppercase">
                  2021 – 2025
                </span>
              </div>
            </div>

            {/* IIT Madras */}
            <div className="bauhaus-card bg-bauhaus-blue p-6">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-outfit font-black text-xl uppercase text-white">
                    B.Sc Data Science
                  </h3>
                  <p className="bauhaus-body text-white/80">
                    Indian Institute of Technology, Madras
                  </p>
                </div>
                <span className="px-3 py-1 bg-white text-bauhaus-ink text-sm font-outfit font-bold uppercase">
                  2022 – 2024
                </span>
              </div>
            </div>

            {/* High School */}
            <div className="bauhaus-card bg-white p-6">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-outfit font-black text-xl uppercase">
                    High School
                  </h3>
                  <p className="bauhaus-body text-bauhaus-ink/70">
                    Sasi Educational Institute
                  </p>
                </div>
                <span className="px-3 py-1 bg-bauhaus-yellow text-bauhaus-ink text-sm font-outfit font-bold uppercase">
                  2016 – 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bauhaus-divider" />

      {/* Contact/Social Grid */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="bauhaus-subheader text-bauhaus-red mb-4">
              GET IN TOUCH
            </p>
            <h2 className="font-outfit font-black text-4xl uppercase">
              Let's Work Together
            </h2>
          </div>

          {/* Social grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SocialCard
              bgColor="bg-bauhaus-yellow"
              label="GITHUB"
              href="https://github.com/sanjaymalladi"
              iconBg="white"
            />
            <SocialCard
              bgColor="bg-bauhaus-blue"
              label="LINKEDIN"
              href="https://linkedin.com/in/sanjaymalladi"
              iconBg="white"
            />
            <SocialCard
              bgColor="bg-bauhaus-red"
              label="EMAIL"
              href="mailto:malladisanjay29@gmail.com"
              iconBg="white"
            />
            <SocialCard
              bgColor="bg-white"
              label="INSTAGRAM"
              href="https://instagram.com/mrsanjaymalladi"
              iconBg="#F0F0F0"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-bauhaus-ink py-8 px-6 bg-bauhaus-offwhite">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-bauhaus-red border-2 border-bauhaus-ink" />
            <div className="w-4 h-4 rounded-full bg-bauhaus-yellow border-2 border-bauhaus-ink" />
            <div className="w-4 h-4 rounded-full bg-bauhaus-blue border-2 border-bauhaus-ink" />
          </div>
          <p className="bauhaus-body text-sm">
            © 2024 SANJAY MALLADI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;

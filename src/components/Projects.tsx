"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { 
  ExternalLink,
  Github,
  Code,
  Globe,
  Database,
  MonitorCog,
  Monitor,
  CloudCheck,
  Server,
  Rocket,
  Star,
  Clock,
  CheckCircle,
  RectangleEllipsis,
  Play
} from 'lucide-react';

// TypeScript interfaces
interface TechStack {
  name: string;
  color: string;
  bgColor: string;
}

interface Project {
  id: number;
  position : number;
  title: string;
  description: string;
  image?: string;
  liveDemo?: string;
  sourceCode?: string;
  techStack: TechStack[];
  category: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

interface FilterCategory {
  name: string;
  icon: React.ReactNode;
}

// Import projects data from separate file
import { projectsData as importedProjects } from '../data/projects.js';


// Cast the imported data to Project type
const projectsData = importedProjects as unknown as Project[];

// Import the filter categories and map them to include icons
const filterCategories: FilterCategory[] = [
  { name: "All", icon: <Globe className="w-4 h-4" /> },
  { name: "Web Apps", icon: <Monitor className="w-4 h-4" /> },
  { name: "Full Stack", icon: <Server className="w-4 h-4" /> },
  { name: "IOT", icon: <MonitorCog className="w-4 h-4" /> },
  { name: "DevOps", icon: <CloudCheck className="w-4 h-4" /> },
  { name: "Freelance", icon: <Rocket className="w-4 h-4" /> }
];

const ProjectShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [displayCount, setDisplayCount] = useState<number>(6); // Number of projects to show initially
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter projects dynamically based on active filter
const filteredProjects = React.useMemo(() => {
  const base =
    activeFilter === 'All'
      ? [...projectsData]
      : projectsData.filter(
          (project: Project) => project.category === activeFilter
        );

  return base.sort(
    (a, b) => (a.position ?? 999) - (b.position ?? 999)
  );
}, [activeFilter]);

  // Get subset of projects to display
  const displayedProjects = React.useMemo(() => {
    return filteredProjects.slice(0, displayCount);
  }, [filteredProjects, displayCount]);

  // Calculate stats dynamically from data
  const projectStats = {
    total: projectsData.length,
    completed: projectsData.filter((p: Project) => p.status === 'completed').length,
    featured: projectsData.filter((p: Project) => p.featured).length,
    techStacks: [...new Set(projectsData.flatMap((p: Project) => p.techStack.map((t: TechStack) => t.name)))].length
  };

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Intersection Observer for individual cards
  useEffect(() => {
    // Reset visible cards when display count changes
    setVisibleCards(new Set());
    
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, [filteredProjects, displayCount]);

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Reset visible cards when filter changes
  useEffect(() => {
    setVisibleCards(new Set());
    cardRefs.current = [];
  }, [activeFilter]);

  // Utility functions with proper typing
  const getStatusIcon = (status: Project['status']): React.ReactNode => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'planned':
        return <Play className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Project['status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  // Image error handler with proper typing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    const fallback = target.nextElementSibling as HTMLElement;
    if (target && fallback) {
      target.style.display = 'none';
      fallback.style.display = 'flex';
    }
  };

  return (
    <section 
      id='projects'
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 px-6 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
                      rgba(139, 92, 246, 0.15), 
                      rgba(236, 72, 153, 0.1), 
                      rgba(6, 182, 212, 0.1),
                      transparent 60%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
            My Projects 🚀
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            A collection of projects that showcase my passion for frontend, full-stack development, 
            and building creative solutions that solve real-world problems.
          </p>
          
          {/* Dynamic Stats */}
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2 text-center">
              <div className="text-purple-400"><Code className="w-5 h-5" /></div>
              <div>
                <div className="text-2xl font-bold text-white">{projectStats.total}+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-center">
              <div className="text-purple-400"><Database className="w-5 h-5" /></div>
              <div>
                <div className="text-2xl font-bold text-white">{projectStats.techStacks}</div>
                <div className="text-sm text-gray-400">Tech Stacks</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-center">
              <div className="text-purple-400"><Star className="w-5 h-5" /></div>
              <div>
                <div className="text-2xl font-bold text-white">{projectStats.featured}</div>
                <div className="text-sm text-gray-400">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
            {filterCategories.map((tab: FilterCategory) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveFilter(tab.name);
                  setDisplayCount(6); // Reset to initial count when changing filters
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === tab.name
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - DYNAMIC RENDERING */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project: Project, index: number) => (
            <div
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
              className={`group relative transition-all duration-700 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${(index % 6) * 100}ms` // Reset animation delay every 6 items
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  Featured
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute -top-2 -left-2 z-10 flex items-center space-x-1 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-700/50">
                {getStatusIcon(project.status)}
                <span className="text-xs text-gray-300">{getStatusLabel(project.status)}</span>
              </div>

              {/* Project Card */}
              <Tilt glareEnable={true}
                    glareMaxOpacity={0.4} 
                    glareColor="#87BAC9"
                    tiltMaxAngleX={10} 
                    tiltMaxAngleY={10}
                    transitionSpeed={2500} 
                    gyroscope={true} >
              <div className="relative h-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group-hover:bg-white/15">
                
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                <div className="relative z-10">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-800/50 aspect-video">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={handleImageError}
                      />
                    )}
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.map((tech: TechStack, techIndex: number) => (
                        <span
                          key={techIndex}
                          className={`${tech.bgColor} ${tech.color} px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform duration-200`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 border border-purple-500 hover:border-purple-400 px-4 py-2 rounded-xl text-purple-400 hover:text-white hover:bg-purple-500/20 font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                        >
                          <Github className="w-4 h-4" />
                          <span>Learn More</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </Tilt>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedProjects.length < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Load More Projects</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try selecting a different category or add some projects to your data file</p>
          </div>
        )}

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">
              Interested in collaborating? Let&apos;s build something amazing together!
            </span>
          </div>
        </div>

        {/* Floating Dev Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-purple-500/20 text-4xl animate-pulse">&lt;/&gt;</div>
          <div className="absolute top-40 right-20 text-cyan-500/20 text-3xl animate-pulse delay-500">&#123; &#125;</div>
          <div className="absolute bottom-40 left-20 text-pink-500/20 text-5xl animate-pulse delay-1000">&lt;&gt;</div>
          <div className="absolute bottom-20 right-10 text-blue-500/20 text-3xl animate-pulse delay-700">&#91;&#93;</div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
// data/projects.js
export const projectsData = [
  {
    id: 1,
    title: "ExpenseLedger",
    description: "A comprehensive budget tracking system built with PHP & MySQL to manage income, expenses, and savings with detailed analytics and reporting features.",
    image: "/projects/expenseledger.png", // Replace with your actual image path
    liveDemo: "https://expenseledger-demo.com",
    sourceCode: "https://github.com/yourusername/expenseledger",
    techStack: [
      { name: "PHP", color: "text-purple-400", bgColor: "bg-purple-500/20" },
      { name: "MySQL", color: "text-blue-400", bgColor: "bg-blue-500/20" },
      { name: "Bootstrap", color: "text-violet-400", bgColor: "bg-violet-500/20" },
      { name: "JavaScript", color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
    ],
    category: "Full Stack",
    featured: true,
    status: "completed" // completed | in-progress | planned
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with React, Next.js, and Stripe integration. Features include cart management, user authentication, and payment processing.",
    image: "/projects/ecommerce.png",
    liveDemo: "https://ecommerce-demo.com",
    sourceCode: "https://github.com/yourusername/ecommerce-platform",
    techStack: [
      { name: "React", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
      { name: "Next.js", color: "text-white", bgColor: "bg-gray-700/20" },
      { name: "Stripe", color: "text-purple-400", bgColor: "bg-purple-500/20" },
      { name: "Tailwind", color: "text-teal-400", bgColor: "bg-teal-500/20" }
    ],
    category: "Web Apps",
    featured: true,
    status: "completed"
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "Intuitive project management tool with real-time collaboration, task tracking, and team analytics built during my internship at TechCorp.",
    image: "/projects/task-management.png",
    liveDemo: "https://task-manager-demo.com",
    sourceCode: "https://github.com/yourusername/task-manager",
    techStack: [
      { name: "Vue.js", color: "text-green-400", bgColor: "bg-green-500/20" },
      { name: "Node.js", color: "text-lime-400", bgColor: "bg-lime-500/20" },
      { name: "MongoDB", color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
      { name: "Socket.io", color: "text-gray-400", bgColor: "bg-gray-500/20" }
    ],
    category: "Internship",
    featured: false,
    status: "completed"
  },
  {
    id: 4,
    title: "Portfolio Website v3",
    description: "Personal portfolio website showcasing my projects and skills with modern animations, glassmorphism design, and responsive layout.",
    image: "/projects/portfolio.png",
    liveDemo: "https://your-portfolio.com",
    sourceCode: "https://github.com/yourusername/portfolio-v3",
    techStack: [
      { name: "React", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
      { name: "Next.js", color: "text-white", bgColor: "bg-gray-700/20" },
      { name: "Framer Motion", color: "text-pink-400", bgColor: "bg-pink-500/20" },
      { name: "Tailwind", color: "text-teal-400", bgColor: "bg-teal-500/20" }
    ],
    category: "Web Apps",
    featured: false,
    status: "completed"
  },
  {
    id: 5,
    title: "Restaurant Booking System",
    description: "Full-stack restaurant reservation system with table management, menu display, customer reviews, and real-time availability checking.",
    image: "/projects/restaurant-booking.png",
    liveDemo: "https://restaurant-booking-demo.com",
    sourceCode: "https://github.com/yourusername/restaurant-booking",
    techStack: [
      { name: "React", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
      { name: "Express", color: "text-gray-400", bgColor: "bg-gray-500/20" },
      { name: "PostgreSQL", color: "text-blue-400", bgColor: "bg-blue-500/20" },
      { name: "Redux", color: "text-purple-400", bgColor: "bg-purple-500/20" }
    ],
    category: "Full Stack",
    featured: true,
    status: "completed"
  },
  {
    id: 6,
    title: "Local Business Website",
    description: "Custom business website with CMS integration, SEO optimization, and mobile-first responsive design for a local bakery client.",
    image: "/projects/bakery-website.png",
    liveDemo: "https://sweetbakery-demo.com",
    sourceCode: "https://github.com/yourusername/bakery-website",
    techStack: [
      { name: "WordPress", color: "text-blue-400", bgColor: "bg-blue-500/20" },
      { name: "PHP", color: "text-purple-400", bgColor: "bg-purple-500/20" },
      { name: "CSS3", color: "text-blue-300", bgColor: "bg-blue-300/20" },
      { name: "jQuery", color: "text-blue-500", bgColor: "bg-blue-600/20" }
    ],
    category: "Freelance",
    featured: false,
    status: "completed"
  },
  {
    id: 7,
    title: "Weather Analytics App",
    description: "Real-time weather monitoring application with data visualization, forecasting, and location-based alerts using OpenWeather API.",
    image: "/projects/weather-app.png",
    liveDemo: "https://weather-analytics-demo.com",
    sourceCode: "https://github.com/yourusername/weather-analytics",
    techStack: [
      { name: "React", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
      { name: "Chart.js", color: "text-orange-400", bgColor: "bg-orange-500/20" },
      { name: "OpenWeather API", color: "text-sky-400", bgColor: "bg-sky-500/20" },
      { name: "Tailwind", color: "text-teal-400", bgColor: "bg-teal-500/20" }
    ],
    category: "Web Apps",
    featured: false,
    status: "completed"
  },
  {
    id: 8,
    title: "AI Content Generator",
    description: "AI-powered content creation tool with OpenAI integration, template management, and export functionality for marketers and writers.",
    image: "/projects/ai-content-generator.png",
    liveDemo: "https://ai-content-demo.com",
    sourceCode: "https://github.com/yourusername/ai-content-generator",
    techStack: [
      { name: "Next.js", color: "text-white", bgColor: "bg-gray-700/20" },
      { name: "OpenAI API", color: "text-green-400", bgColor: "bg-green-500/20" },
      { name: "Prisma", color: "text-indigo-400", bgColor: "bg-indigo-500/20" },
      { name: "TypeScript", color: "text-blue-400", bgColor: "bg-blue-500/20" }
    ],
    category: "Full Stack",
    featured: true,
    status: "in-progress"
  },
  {
    id: 9,
    title: "Fitness Tracker Mobile App",
    description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features built with React Native.",
    image: "/projects/fitness-tracker.png",
    liveDemo: "https://fitness-tracker-demo.com",
    sourceCode: "https://github.com/yourusername/fitness-tracker",
    techStack: [
      { name: "React Native", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
      { name: "Expo", color: "text-purple-400", bgColor: "bg-purple-500/20" },
      { name: "Firebase", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
      { name: "Redux", color: "text-purple-400", bgColor: "bg-purple-500/20" }
    ],
    category: "Mobile Apps",
    featured: false,
    status: "completed"
  },
  {
    id: 10,
    title: "Cryptocurrency Dashboard",
    description: "Real-time crypto portfolio tracker with price alerts, market analysis, and trading insights using CoinGecko API and advanced charting.",
    image: "/projects/crypto-dashboard.png",
    liveDemo: "https://crypto-dashboard-demo.com",
    sourceCode: "https://github.com/yourusername/crypto-dashboard",
    techStack: [
      { name: "Vue.js", color: "text-green-400", bgColor: "bg-green-500/20" },
      { name: "D3.js", color: "text-orange-400", bgColor: "bg-orange-500/20" },
      { name: "CoinGecko API", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
      { name: "Vuetify", color: "text-blue-400", bgColor: "bg-blue-500/20" }
    ],
    category: "Web Apps",
    featured: true,
    status: "completed"
  }
];

// Filter categories for the filter tabs
export const filterCategories = [
  { name: "All", icon: "🌐" },
  { name: "Web Apps", icon: "💻" },
  { name: "Full Stack", icon: "🔧" },
  { name: "Mobile Apps", icon: "📱" },
  { name: "Internship", icon: "👥" },
  { name: "Freelance", icon: "🚀" }
];

// Utility functions for data manipulation
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectsByCategory = (category) => {
  if (category === "All") return projectsData;
  return projectsData.filter(project => project.category === category);
};

export const getProjectsByStatus = (status) => {
  return projectsData.filter(project => project.status === status);
};

export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id);
};

// Tech stack color utility (for consistency)
export const getTechStackColors = (techName) => {
  const techColors = {
    "React": { color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    "Next.js": { color: "text-white", bgColor: "bg-gray-700/20" },
    "Vue.js": { color: "text-green-400", bgColor: "bg-green-500/20" },
    "Node.js": { color: "text-lime-400", bgColor: "bg-lime-500/20" },
    "PHP": { color: "text-purple-400", bgColor: "bg-purple-500/20" },
    "Python": { color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    "JavaScript": { color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    "TypeScript": { color: "text-blue-400", bgColor: "bg-blue-500/20" },
    "MySQL": { color: "text-blue-400", bgColor: "bg-blue-500/20" },
    "PostgreSQL": { color: "text-blue-400", bgColor: "bg-blue-500/20" },
    "MongoDB": { color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
    "Tailwind": { color: "text-teal-400", bgColor: "bg-teal-500/20" },
    "Bootstrap": { color: "text-violet-400", bgColor: "bg-violet-500/20" },
    "Firebase": { color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    "Stripe": { color: "text-purple-400", bgColor: "bg-purple-500/20" },
    // Add more as needed
    default: { color: "text-gray-400", bgColor: "bg-gray-500/20" }
  };
  
  return techColors[techName] || techColors.default;
};
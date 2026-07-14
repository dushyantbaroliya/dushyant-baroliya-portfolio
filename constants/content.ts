import type {
  NavItem,
  Project,
  SkillCategory,
  SocialLink,
  StatementSegment,
  TechLogo,
} from "@/types";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiFramer,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiDocker,
  SiFigma,
  SiLinux,
  SiMysql,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Dushyant Baroliya",
  initials: "DB",
  url: "https://dushyantbaroliya.com",
  email: "dushyantbaroliya2@gmail.com",
  location: "India",
  timeZone: "Asia/Kolkata",
  resumeUrl: "/files/Dushyant-Baroliya-Resume.pdf",
  description:
    "Portfolio of Dushyant Baroliya, mechanical engineering student and full stack developer building AI-powered products and finance-driven applications.",
} as const;

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/dushyantbaroliya", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dushyant-baroliya/",
    icon: FaLinkedinIn,
  },
  { label: "X", href: "https://x.com/dushyantbaroliya", icon: FaXTwitter },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  titleLines: [
    { text: "FullStack", tone: "text-tech-light" },
    { text: "AI & Quant", tone: "text-tech-medium" },
    { text: "Developer", tone: "text-tech-dark" },
  ],
  rotatingTitles: [
    "Mechanical Engineering Enthusiast",
    "AI & Finance Enthusiast",
    "Full Stack Developer",
    "Quantitative Finance Enthusiast",
  ],
  description: [
    { text: "I enjoy building " },
    { text: "beautiful software", bold: true },
    { text: ", " },
    { text: "AI-powered products", bold: true },
    { text: ", and " },
    { text: "finance-driven applications", bold: true },
    { text: ". I love turning " },
    { text: "complex ideas", bold: true },
    { text: " into " },
    { text: "elegant experiences", bold: true },
    { text: "." },
  ] satisfies StatementSegment[],
} as const;

/* ------------------------------------------------------------------ */
/* Statements (scroll-revealed manifestos)                             */
/* ------------------------------------------------------------------ */

export const PROJECTS_STATEMENT: StatementSegment[] = [
  { text: "What is an " },
  { text: "idea", bold: true },
  { text: " without " },
  { text: "execution", bold: true },
  { text: " but a spark that never becomes light, full of promise, yet destined to " },
  { text: "fade", bold: true },
  { text: " before it ever " },
  { text: "leaves the mind", bold: true },
  { text: "?" },
];

export const ABOUT_STATEMENT: StatementSegment[] = [
  { text: "I'm a " },
  { text: "mechanical engineer", bold: true },
  { text: " who fell in love with " },
  { text: "software", bold: true },
  { text: ", building " },
  { text: "AI products", bold: true },
  { text: ", " },
  { text: "quant tools", bold: true },
  { text: ", and interfaces that make complexity feel " },
  { text: "effortless", bold: true },
  { text: "." },
];

export const PROJECTS_INTRO = {
  label: "/ Projects",
  blurb: [
    { text: "These projects trace how I turn ideas into execution, blending " },
    { text: "engineering with imagination", bold: true },
    { text: "." },
  ] satisfies StatementSegment[],
  chips: [
    "Web Development",
    "AI Products",
    "Quantitative Finance",
    "Full Stack",
    "Machine Learning",
    "Data Visualization",
    "Experiments",
  ],
} as const;

export const ABOUT_INTRO = {
  label: "/ About",
  blurb: [
    {
      text: "A constant learner drawn to startups and systems thinking, I care about elegant frontend design as much as the ",
    },
    { text: "backend architecture", bold: true },
    { text: " beneath it. Here are the skills, expertise, and tools I use to bring ideas to life." },
  ] satisfies StatementSegment[],
  chips: ["Languages", "Frameworks", "Databases", "Tools", "AI / ML", "Startups"],
} as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const PROJECTS: Project[] = [
  {
    id: "ai-operating-system",
    category: "AI Product",
    title: "AI Operating System",
    description:
      "A unified AI workspace that orchestrates agents, files, and tools into a single operating layer, built for people who think faster than they type.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/ai-operating-system",
  },
  {
    id: "personal-finance-dashboard",
    category: "FinTech",
    title: "Personal Finance Dashboard",
    description:
      "A privacy-first dashboard that turns raw transactions into clear insight: budgets, trends, and net-worth tracking in one elegant view.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Recharts", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/personal-finance-dashboard",
  },
  {
    id: "algorithm-visualizer",
    category: "Web App",
    title: "Algorithm Visualizer",
    description:
      "An interactive playground that animates sorting, graphs, and pathfinding step by step, making abstract algorithms feel tangible.",
    stack: ["TypeScript", "React", "Framer Motion", "Canvas API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/algorithm-visualizer",
  },
  {
    id: "quant-trading-simulator",
    category: "Quant Finance",
    title: "Quant Trading Simulator",
    description:
      "A backtesting engine and paper-trading sandbox for exploring quantitative strategies with real market data and honest risk metrics.",
    stack: ["Python", "Pandas", "NumPy", "FastAPI", "PostgreSQL", "Next.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/quant-trading-simulator",
  },
  {
    id: "developer-portfolio",
    category: "Website",
    title: "Developer Portfolio",
    description:
      "The site you are looking at: a pixel-obsessed, motion-driven portfolio engineered for speed, accessibility, and a little delight.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/developer-portfolio",
  },
  {
    id: "machine-learning-projects",
    category: "Machine Learning",
    title: "Machine Learning Projects",
    description:
      "A growing collection of ML experiments, from predictive models to computer vision, documented and open for anyone to learn from.",
    stack: ["Python", "PyTorch", "scikit-learn", "Jupyter", "NumPy"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/dushyantbaroliya/machine-learning-projects",
  },
];

/* ------------------------------------------------------------------ */
/* Tech logo wall                                                      */
/* ------------------------------------------------------------------ */

export const TECH_LOGOS: TechLogo[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "C++", icon: SiCplusplus },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Firebase", icon: SiFirebase },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "Figma", icon: SiFigma },
  { name: "Linux", icon: SiLinux },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", icon: SiMysql, color: "#4479A1" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#663399" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Firebase", icon: SiFirebase, color: "#DD2C00" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "VS Code", icon: TbBrandVscode, color: "#02A9F7" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Contact / footer                                                    */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  statement: [
    { text: "Have an " },
    { text: "idea worth building", bold: true },
    { text: "? Great products begin where " },
    { text: "curiosity", bold: true },
    { text: " meets " },
    { text: "craft", bold: true },
    { text: ", and momentum does the rest." },
  ] satisfies StatementSegment[],
  blurb: [
    {
      text: "Feel free to download my resume or reach out to talk software, AI, or markets. I'm open to internships, collaborations, and ambitious side quests. ",
    },
    { text: "Let's build something remarkable together!", bold: true },
  ] satisfies StatementSegment[],
} as const;

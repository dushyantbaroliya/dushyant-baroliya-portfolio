import type { IconType } from "react-icons";

/** A run of statement text; bold runs render emphasized. */
export interface StatementSegment {
  text: string;
  bold?: boolean;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  /** Optional real screenshot; falls back to a styled placeholder. */
  image?: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  /** Brand color revealed on hover. */
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TechLogo {
  name: string;
  icon: IconType;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

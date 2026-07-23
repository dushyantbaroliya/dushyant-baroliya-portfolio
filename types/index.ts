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
  /** Live demo URL. Omit for unshipped / in-progress work. */
  liveUrl?: string;
  /** Public source URL. Omit for private / in-progress work. */
  githubUrl?: string;
  /** Optional short badge, e.g. "In Progress". Marks work that isn't shipped yet. */
  status?: string;
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

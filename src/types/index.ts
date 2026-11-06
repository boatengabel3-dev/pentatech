/**
 * TEAM PENTATECH Official Website & CMS
 * Core Data Models & Type Definitions
 */

export type ProjectStatus =
  | 'In Development'
  | 'Active R&D'
  | 'Prototype'
  | 'Field Testing'
  | 'Production'
  | 'Archived';

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus | string;
  summary: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  leadArchitect: string;
  completionYear: string;
  tags: string[];
  isFeatured: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface InnovationCategory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  iconName?: string;
  order: number;
  tags?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department:
    | 'Robotics & Hardware'
    | 'AI & Computational Systems'
    | 'Energy & Infrastructure'
    | 'Operations & Ecosystem'
    | 'Executive Leadership'
    | string;
  bio: string;
  avatarUrl: string;
  isPublished: boolean;
  socials: {
    linkedin?: string;
    github?: string;
    x?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  year: string;
  issuer: string;
  recognitionPosition?: string; // e.g. "1st Place", "4th Place"
  badgeTier?: 'gold' | 'silver' | 'bronze' | 'finalist';
  description: string;
  certificateUrl?: string;
  date?: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Technical Summit' | 'Maker Workshop' | 'Research Symposium' | string;
  date: string;
  location: string;
  description: string;
  status: 'Upcoming' | 'Registration Open' | 'Sold Out' | 'Concluded' | string;
  bannerUrl: string;
  registrationLink?: string;
}

export interface Partner {
  id: string;
  name: string;
  tier: 'Strategic Partner' | 'Academic & Research' | 'Industry Partner' | 'Venture & Grants' | string;
  logoUrl: string;
  website: string;
  description: string;
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  primaryTrack:
    | 'Software Engineering'
    | 'Hardware & Robotics'
    | 'AI & Data Science'
    | 'Clean Energy'
    | 'Product & Design'
    | string;
  yearsOfExperience: string;
  portfolioUrl: string;
  githubUrl?: string;
  motivation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'Hero' | 'Projects' | 'Team' | 'Events' | 'Logos' | 'Achievements' | string;
  dimensions: string;
  fileSize: string;
  uploadedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isEnabled: boolean;
  isExternal?: boolean;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  socials: {
    x: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  theme: {
    goldAccent: 'Classic Gold' | 'Bright Amber' | 'Deep Bronze';
    buttonStyle: 'gold-solid' | 'gold-outline' | 'minimal-glow';
    showParticleNetwork: boolean;
  };
  homepageHero: {
    headline: string;
    highlightWord: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    backgroundStyle: '3d-particles' | 'architectural-image' | 'hybrid';
  };
  sectionsVisibility: {
    introduction: boolean;
    innovation: boolean;
    projects: boolean;
    community: boolean;
    achievements: boolean;
    events: boolean;
    partnerships: boolean;
    ctaBanner: boolean;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Lead Editor' | 'Operations Manager';
  avatar: string;
  lastLogin: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

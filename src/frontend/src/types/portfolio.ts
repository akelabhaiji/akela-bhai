export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "website" | "landing" | "business" | "ui-ux";
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  feedback: string;
  rating: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

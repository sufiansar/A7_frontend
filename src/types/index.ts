export interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  published: boolean;
}

export interface BlogUpdateData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
}

export interface ProjectUpdateData {
  title: string;
  description: string;
  excerpt: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: string;
  imageUrl?: string;
}

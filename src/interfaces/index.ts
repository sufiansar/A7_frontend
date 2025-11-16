export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
  authorId: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  published: boolean;
  coverImage?: File;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  coverImage?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  imageUrls?: string[];
  featured: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  authorId: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  excerpt?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status?: string;
  imageFile?: File;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: string;
  category?: string;
  iconUrl?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  userId: string;
}

export interface SkillFormData {
  name: string;
  level?: string;
  category?: string;
  iconFile?: File;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  error: string;
}

export interface PageParams {
  id: string;
}

export interface DynamicPageProps {
  params: Promise<PageParams>;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface UserSession {
  user: SessionUser;
  accessToken?: string;
}

// Type aliases for easier use
export type Project = ProjectItem;
export type Skill = SkillItem;

import { getProjectById } from "@/actions/createApi";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  authorId: string;
}

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getProjectByIdWithApi(id: string): Promise<Project | null> {
  try {
    const project = await getProjectById(id);
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const project = await getProjectByIdWithApi(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {project.title}
              </h1>

              {/* Status Badge */}
              {project.status && (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.status === "completed"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : project.status === "in-progress"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  {project.status}
                </span>
              )}

              {/* Featured Badge */}
              {project.featured && (
                <span className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <time dateTime={project.createdAt}>
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span className="text-blue-400">By {project.author.name}</span>
            </div>

            {/* Project Links */}
            <div className="flex gap-4 mb-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View Code
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>

            {project.imageUrl && (
              <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Project Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">
              About This Project
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          </section>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Project Details */}
          <section className="grid md:grid-cols-2 gap-8 mb-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Project Status
              </h3>
              <p className="text-gray-400">
                {project.status || "Not specified"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Created</h3>
              <p className="text-gray-400">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Last Updated
              </h3>
              <p className="text-gray-400">
                {new Date(project.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Author</h3>
              <p className="text-gray-400">{project.author.name}</p>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <Link
              href="/projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← All Projects
            </Link>

            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/actions/createApi";

export const revalidate = 60;

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

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              All{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Explore my portfolio of web applications, mobile apps, and
              software solutions
            </p>
            <div className="text-gray-500">
              No projects available at the moment. Check back later!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-26 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            All{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Explore my portfolio of web applications, mobile apps, and software
            solutions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500"
            >
              {/* Image Section */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={
                    project.imageUrl ||
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
                  }
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

                {/* Status Badge */}
                {project.status && (
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : project.status === "in-progress"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-500/20 border border-gray-500/30 text-gray-400 text-xs font-medium rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 line-clamp-2">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.excerpt || project.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {project.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium">
                        {project.author.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </div>
                    )}
                    {project.liveUrl && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

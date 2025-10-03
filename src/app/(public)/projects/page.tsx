import Link from "next/link";
import Image from "next/image";
import { getProjectsPublic } from "@/actions/projectApi";
import { ProjectItem } from "@/interfaces";
import { Github, ExternalLink } from "lucide-react";

export const revalidate = 60;

export default async function ProjectShowcase() {
  const projects = await getProjectsPublic();

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
          {projects.map((project: ProjectItem) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={
                    project.imageUrl ||
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
                  }
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

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

                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies
                    .slice(0, 3)
                    .map((tech: string, index: number) => (
                      <span
                        key={`${tech}-${index}`}
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

                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 line-clamp-2">
                  {project.title}
                </h2>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.excerpt || project.description}
                </p>

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

                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <Github className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                    {project.liveUrl && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
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

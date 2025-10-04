import { getProjectById, getProjectsPublic } from "@/actions/projectApi";
import { ProjectItem, DynamicPageProps } from "@/interfaces";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

export const revalidate = 60;

async function getProjectByIdWithApi(id: string): Promise<ProjectItem | null> {
  try {
    const project = await getProjectById(id);
    return project;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const projects = await getProjectsPublic();

    return projects.map((project: ProjectItem) => ({
      id: project.id,
    }));
  } catch (error) {
    console.error("Error generating static params for projects:", error);
    return [];
  }
}

export default async function ProjectDetailView({ params }: DynamicPageProps) {
  const { id } = await params;

  const project = await getProjectByIdWithApi(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {project.title}
              </h1>

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

            <div className="flex gap-4 mb-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
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
                  <ExternalLink className="w-5 h-5 mr-2" />
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

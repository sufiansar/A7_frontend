import Link from "next/link";
import { ChevronRight, Code2 } from "lucide-react";
import { Project } from "@/interfaces";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export const ProjectsSection = ({
  projects,
  showViewAll = true,
  title = "Featured Projects",
  subtitle = "Some of my recent work and learning projects",
}: ProjectsSectionProps) => {
  return (
    <section className="relative py-20">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400">
            No projects available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {projects.length > 0 && showViewAll && (
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-medium rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25"
            >
              <Code2 className="w-5 h-5 mr-2" />
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

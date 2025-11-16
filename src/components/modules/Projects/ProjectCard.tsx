import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink, Github, Star } from "lucide-react";
import { Project } from "@/interfaces";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <div
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
      style={{}}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={
            (project.imageUrls && project.imageUrls[0]) ||
            project.imageUrl ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
          }
          alt={project.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        {project.featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 line-clamp-1 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
          {project.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies &&
            project.technologies
              .slice(0, 3)
              .map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
        </div>

        {/* Gallery thumbnails */}
        {project.imageUrls && project.imageUrls.length > 1 && (
          <div className="flex gap-2 mb-4">
            {project.imageUrls.slice(0, 4).map((url: string, i: number) => (
              <div
                key={i}
                className="w-16 h-12 rounded overflow-hidden relative"
              >
                <Image
                  src={url}
                  fill
                  unoptimized
                  className="object-cover"
                  alt={`Project thumbnail ${i + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.id}`}
            className="text-emerald-400 hover:text-emerald-300 font-medium text-sm flex items-center"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>

          <div className="flex space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

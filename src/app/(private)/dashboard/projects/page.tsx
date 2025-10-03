"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProjects, deleteProject } from "@/actions/projectApi";
import { ProjectItem } from "@/interfaces";
import { useRouter } from "next/navigation";
import {
  Plus,
  FolderOpen,
  ExternalLink,
  Github,
  Edit,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";

export default function ProjectManagementDashboard() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    project: { id: string; title: string } | null;
  }>({
    isOpen: false,
    project: null,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    setDeleteModal({
      isOpen: true,
      project: { id, title },
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.project) return;

    const { id, title } = deleteModal.project;
    setDeleting(id);
    setDeleteModal({ isOpen: false, project: null });

    const loadingToast = toast.loading("Deleting project...");

    try {
      const result = await deleteProject(id);

      toast.dismiss(loadingToast);

      if (result.success) {
        setProjects(projects.filter((project) => project.id !== id));
        toast.success("Project deleted successfully! 🗑️");
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
    } finally {
      setDeleting(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, project: null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <Link
            href="/dashboard/projects/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Project
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">
              Total Projects
            </h3>
            <p className="text-2xl font-bold text-white">{projects.length}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Featured</h3>
            <p className="text-2xl font-bold text-green-400">
              {projects.filter((project) => project.featured).length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">With Live URL</h3>
            <p className="text-2xl font-bold text-blue-400">
              {projects.filter((project) => project.liveUrl).length}
            </p>
          </div>
        </div>


        {projects.length === 0 ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first project.
            </p>
            <Link
              href="/dashboard/projects/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Project
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Technologies
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Created
                    </th>
                    <th className="text-right p-4 text-gray-300 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-700 hover:bg-gray-750"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {project.imageUrl && (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h3 className="text-white font-medium line-clamp-1">
                              {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies
                            .slice(0, 2)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 2 && (
                            <span className="text-gray-400 text-xs">
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          {project.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          {project.liveUrl && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Live
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2 justify-end">

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                              title="View Live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}


                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                              title="View GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}


                          <Link
                            href={`/dashboard/projects/edit/${project.id}`}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>


                          <button
                            onClick={() =>
                              handleDelete(project.id, project.title)
                            }
                            disabled={deleting === project.id}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === project.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Delete Project
                  </h3>
                  <p className="text-gray-400 text-sm">
                    This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={cancelDelete}
                  className="ml-auto text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-300">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    &quot;{deleteModal.project?.title}&quot;
                  </span>
                  ? This will permanently remove the project and all its data.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

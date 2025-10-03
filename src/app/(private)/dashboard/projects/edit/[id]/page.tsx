"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProjectById, updateProject } from "@/actions/projectApi";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export default function EditProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const project = await getProjectById(projectId);

      if (project) {
        setFormData({
          title: project.title || "",
          description: project.description || "",
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : "",
          liveUrl: project.liveUrl || "",
          githubUrl: project.githubUrl || "",
          featured: project.featured || false,
        });
        setCurrentImageUrl(project.imageUrl || "");
      } else {
        toast.error("Project not found");
        router.push("/dashboard/projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("excerpt", formData.description.substring(0, 200));
      formDataToSend.append("technologies", formData.technologies);
      formDataToSend.append("liveUrl", formData.liveUrl);
      formDataToSend.append("githubUrl", formData.githubUrl);
      formDataToSend.append("featured", String(formData.featured));
      formDataToSend.append("status", "active");

      if (projectImageFile) {
        formDataToSend.append("file", projectImageFile);
      }

      const result = await updateProject(projectId, formDataToSend);

      if (result?.success !== false) {
        toast.success("Project updated successfully! 🎉");
        router.push("/dashboard/projects");
      } else {
        toast.error(result?.error || "Failed to update project");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading project...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Edit{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Project
              </span>
            </h1>
            <p className="text-gray-400 mt-2">Update your project details</p>
          </div>

          <Link
            href="/dashboard/projects"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>


        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="grid gap-6">

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title..."
                />
              </div>


              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your project..."
                />
              </div>


              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label
                    htmlFor="technologies"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Technologies *
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, MongoDB"
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    Separate technologies with commas
                  </p>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Image
                  </label>
                  <ImageUpload
                    onImageChange={setProjectImageFile}
                    initialImage={currentImageUrl}
                    className="w-full"
                  />
                </div>
              </div>


              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label
                    htmlFor="liveUrl"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Live URL
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>


                <div>
                  <label
                    htmlFor="githubUrl"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>


              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-sm text-gray-300"
                >
                  Mark as featured project
                </label>
              </div>


              <div className="flex gap-4 pt-6 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Update Project
                    </>
                  )}
                </button>

                <Link
                  href="/dashboard/projects"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

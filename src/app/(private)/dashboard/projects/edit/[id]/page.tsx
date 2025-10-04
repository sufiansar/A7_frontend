"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProjectById, updateProject } from "@/actions/projectApi";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    } catch {
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
            <Button
              variant="ghost"
              asChild
              className="mb-4 text-gray-400 hover:text-white p-0"
            >
              <Link href="/dashboard/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">
              Edit{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Project
              </span>
            </h1>
            <p className="text-gray-400 mt-2">Update your project details</p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter project title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="technologies" className="text-gray-300">
                    Technologies *
                  </Label>
                  <Input
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="React, Node.js, MongoDB"
                  />
                  <p className="text-gray-400 text-sm">
                    Separate technologies with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Project Image</Label>
                  <ImageUpload
                    onImageChange={setProjectImageFile}
                    initialImage={currentImageUrl}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl" className="text-gray-300">
                    Live URL
                  </Label>
                  <Input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="text-gray-300">
                    GitHub URL
                  </Label>
                  <Input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: checked as boolean,
                    }))
                  }
                  className="border-gray-600"
                />
                <Label htmlFor="featured" className="text-gray-300">
                  Mark as featured project
                </Label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Update Project
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Link href="/dashboard/projects">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

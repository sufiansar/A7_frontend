"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { createProject } from "@/actions/projectApi";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      const result = await createProject(formDataToSend);

      if (result?.success) {
        toast.success("Project created successfully!");
        router.push("/dashboard/projects");
      } else {
        toast.error(result?.error || "Failed to create project");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
              Create{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                New Project
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Showcase your work and projects
            </p>
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
                    placeholder="live project URL"
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
                    placeholder="GitHub repository URL"
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Create Project
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

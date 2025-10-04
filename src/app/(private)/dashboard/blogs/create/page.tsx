"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Plus } from "lucide-react";

import ImageUpload from "@/components/ImageUpload";
import { createBlog } from "@/actions/blogApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    published: false,
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("excerpt", formData.excerpt);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("published", String(formData.published));

      if (coverImageFile) {
        formDataToSend.append("file", coverImageFile);
      }

      const result = await createBlog(formDataToSend);

      if (result?.success) {
        toast.success("Blog created successfully!");
        router.push("/dashboard/blogs");
      } else {
        toast.error(result?.error || "Failed to create blog");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
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
              <Link href="/dashboard/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">
              Create{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                New Blog
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Write and publish your blog post
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Blog Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter blog title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-gray-300">
                  Excerpt
                </Label>
                <Input
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Brief description of the blog post..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={12}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-vertical"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-gray-300">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="React, Next.js, TypeScript"
                  />
                  <p className="text-sm text-gray-400">
                    Separate tags with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Cover Image</Label>
                  <ImageUpload
                    onImageChange={setCoverImageFile}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      published: checked as boolean,
                    }))
                  }
                  className="border-gray-600"
                />
                <Label htmlFor="published" className="text-gray-300">
                  Publish this blog post
                </Label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Blog
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Link href="/dashboard/blogs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

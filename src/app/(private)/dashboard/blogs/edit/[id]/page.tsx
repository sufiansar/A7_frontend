"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { getBlogById, updateBlog } from "@/actions/blogApi";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  published: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    coverImage: "",
    published: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        if (blogData) {
          setBlog(blogData);
          setFormData({
            title: blogData.title || "",
            content: blogData.content || "",
            excerpt: blogData.excerpt || "",
            tags: blogData.tags?.join(", ") || "",
            coverImage: blogData.coverImage || "",
            published: blogData.published || false,
          });
        } else {
          setError("Blog not found");
        }
      } catch {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : [];

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("content", formData.content.trim());
      formDataToSend.append("excerpt", formData.excerpt.trim());
      formDataToSend.append("tags", tagsArray.join(","));
      formDataToSend.append("published", formData.published.toString());

      if (coverImageFile) {
        formDataToSend.append("file", coverImageFile);
      }

      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const result = await updateBlog(id, formDataToSend);

      if (result) {
        toast.success("Blog updated successfully! ✨");
        router.push("/dashboard/blogs");
      } else {
        toast.error("Failed to update blog");
        setError("Failed to update blog");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("An error occurred while updating the blog");
      setError("An error occurred while updating the blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error && !blog) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link
            href="/dashboard/blogs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
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
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <p className="text-gray-400 mt-2">Update your blog post details</p>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Blog Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-400">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter blog title"
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
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Cover Image</Label>
                <ImageUpload
                  onImageChange={setCoverImageFile}
                  initialImage={formData.coverImage}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-gray-300">
                  Tags
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="React, Next.js, TypeScript (comma separated)"
                />
                <p className="text-sm text-gray-400">
                  Separate tags with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-vertical"
                  placeholder="Write your blog content here..."
                />
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
                  disabled={submitting}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Blog
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getBlogs, deleteBlog } from "@/actions/createApi";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  authorId: string;
}

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeleting(id);

    // Show loading toast
    const loadingToast = toast.loading("Deleting blog...");

    try {
      const result = await deleteBlog(id);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully! 🗑️");
      } else {
        toast.error(result.error || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>

          <Link
            href="/dashboard/blogs/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Blog
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Total Blogs</h3>
            <p className="text-2xl font-bold text-white">{blogs.length}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Published</h3>
            <p className="text-2xl font-bold text-green-400">
              {blogs.filter((blog) => blog.published).length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm font-medium">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {blogs.filter((blog) => !blog.published).length}
            </p>
          </div>
        </div>

        {/* Blogs Table */}
        {blogs.length === 0 ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first blog post.
            </p>
            <Link
              href="/dashboard/blogs/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Title
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Status
                    </th>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      Tags
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
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="border-b border-gray-700 hover:bg-gray-750"
                    >
                      <td className="p-4">
                        <div>
                          <h3 className="text-white font-medium line-clamp-1">
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-gray-400 text-xs">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2 justify-end">
                          {/* View Button */}
                          <Link
                            href={`/blogs/${blog.id}`}
                            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            title="View"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </Link>

                          {/* Edit Button */}
                          <Link
                            href={`/dashboard/blogs/edit/${blog.id}`}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
                            disabled={deleting === blog.id}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === blog.id ? (
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
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
      </div>
    </div>
  );
}

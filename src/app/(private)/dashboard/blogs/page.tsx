"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getBlogs, deleteBlog } from "@/actions/blogApi";
import { BlogPost } from "@/interfaces";
import {
  Plus,
  FileText,
  Eye,
  Edit,
  Trash2,
  Loader2,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

export default function BlogManagementDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    blog: { id: string; title: string } | null;
  }>({
    isOpen: false,
    blog: null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteModal({
      isOpen: true,
      blog: { id, title: "" },
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.blog) return;

    const { id } = deleteModal.blog;
    setDeleting(id);
    setDeleteModal({ isOpen: false, blog: null });

    const loadingToast = toast.loading("Deleting blog...");

    try {
      const result = await deleteBlog(id);

      toast.dismiss(loadingToast);

      if (result.success) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully! 🗑️");
      } else {
        toast.error(result.error || "Failed to delete blog");
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
    } finally {
      setDeleting(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, blog: null });
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">
              Manage{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>
          </div>

          <Link
            href="/dashboard/blogs/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Blog
          </Link>
        </div>

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

        {blogs.length === 0 ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
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
              <Plus className="w-5 h-5" />
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
                          <Link
                            href={`/blogs/${blog.id}`}
                            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/dashboard/blogs/edit/${blog.id}`}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={deleting === blog.id}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === blog.id ? (
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
      </div>

      {deleteModal.isOpen && deleteModal.blog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-mx-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Blog</h3>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                &quot;{deleteModal.blog.title}&quot;
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

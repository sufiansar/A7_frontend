import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/actions/createApi";

export const revalidate = 60;

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

export default async function BlogsPage() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              All{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Explore our latest articles and insights on web development,
              programming, and modern technologies
            </p>
            <div className="text-gray-500">
              No blogs available at the moment. Check back later!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-26 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            All{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our latest articles and insights on web development,
            programming, and modern technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: Blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              {/* Image Section */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={
                    blog.coverImage ||
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
                  }
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 line-clamp-2">
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Author and Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {blog.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium">
                        {blog.author.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="text-blue-400 text-sm font-medium">
                    Read More
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

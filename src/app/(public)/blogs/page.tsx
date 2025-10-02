// app/blogs/page.tsx
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

const dummyBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    excerpt: "Learn the basics of Next.js and why it’s so powerful.",
    content: "Full blog content for Getting Started with Next.js...",
    author: { name: "Md. Abu Sufian" },
    createdAt: new Date("2025-01-01"),
    tags: ["nextjs", "react"],
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "2",
    title: "Prisma with PostgreSQL",
    slug: "prisma-postgresql",
    excerpt: "A quick guide to setting up Prisma with PostgreSQL.",
    content: "Full blog content for Prisma with PostgreSQL...",
    author: { name: "Ayesha" },
    createdAt: new Date("2025-02-10"),
    tags: ["prisma", "database"],
    coverImage: "https://placehold.co/600x400",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            All Blogs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore our latest articles and insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
            >
              <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="font-medium">By {blog.author.name}</span>
                    <span>{blog.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
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

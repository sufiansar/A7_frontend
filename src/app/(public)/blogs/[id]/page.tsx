import { getBlogById } from "@/actions/createApi";
import { notFound } from "next/navigation";
import Link from "next/link";

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

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getBlogByIdWithApi(id: string): Promise<Blog | null> {
  try {
    const blog = await getBlogById(id);
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  const blog = await getBlogByIdWithApi(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blogs
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span className="text-blue-400">By {blog.author.name}</span>
            </div>

            {blog.coverImage && (
              <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          <article className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </article>

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <Link
              href="/blogs"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← All Blogs
            </Link>

            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Home →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR every 60 seconds

const dummyBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    content: "This is the full blog post content about Next.js...",
    excerpt: "Learn the basics of Next.js and why it’s so powerful.",
    author: { name: "Md. Abu Sufian" },
    createdAt: new Date("2025-01-01"),
    tags: ["nextjs", "react"],
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "2",
    title: "Prisma with PostgreSQL",
    slug: "prisma-postgresql",
    content: "This is the full blog post content about Prisma...",
    excerpt: "A quick guide to setting up Prisma with PostgreSQL.",
    author: { name: "Ayesha" },
    createdAt: new Date("2025-02-10"),
    tags: ["prisma", "database"],
    coverImage: "https://placehold.co/600x400",
  },
];

export async function generateStaticParams() {
  return dummyBlogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = dummyBlogs.find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-8">
        By {blog.author.name} on {blog.createdAt.toLocaleDateString()}
      </p>
      <div className="prose prose-lg max-w-none">{blog.content}</div>

      {blog.tags.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold">Tags:</p>
          <div className="flex gap-2 mt-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

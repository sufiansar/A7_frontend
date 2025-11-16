import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogPost } from "@/interfaces";
import { BlogCard } from "./BlogCard";

interface BlogsSectionProps {
  blogs: BlogPost[];
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export const BlogsSection = ({
  blogs,
  showViewAll = true,
  title = "Latest Blogs",
  subtitle = "Thoughts, tutorials, and insights from my learning journey",
}: BlogsSectionProps) => {
  return (
    <section className="relative py-20 pb-0">
      <div className="relative max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-400">
            No blogs available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: BlogPost, index: number) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}

        {blogs.length > 0 && showViewAll && (
          <div className="text-center mt-12">
            <Link
              href="/blogs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-full hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
            >
              View All Blogs
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

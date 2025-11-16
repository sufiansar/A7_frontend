import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { BlogPost } from "@/interfaces";

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

export const BlogCard = ({ blog, index }: BlogCardProps) => {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
      style={{}}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={
            blog.coverImage ||
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&h=600&fit=crop"
          }
          alt={blog.title}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags &&
            blog.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
              <span
                key={`${tag}-${tagIndex}`}
                className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium rounded-full"
              >
                #{tag}
              </span>
            ))}
        </div>

        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 line-clamp-2 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-400 font-medium flex items-center">
            Read More
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

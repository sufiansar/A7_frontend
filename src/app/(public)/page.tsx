import HeroSection from "@/components/HeroSection";
import { getBlogsPublic } from "@/actions/blogApi";
import { BlogPost } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default async function HomePage() {
  const allBlogs = await getBlogsPublic();

  const blogs = allBlogs.slice(0, 3);

  return (
    <>
      <HeroSection />
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-12 text-4xl md:text-5xl font-bold text-white">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blogs
            </span>
          </h2>

          {blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              No blogs available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: BlogPost) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={
                        blog.coverImage ||
                        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=800&h=600&fit=crop"
                      }
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags &&
                        blog.tags
                          .slice(0, 2)
                          .map((tag: string, index: number) => (
                            <span
                              key={`${tag}-${index}`}
                              className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {blogs.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/blogs"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                View All Blogs
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

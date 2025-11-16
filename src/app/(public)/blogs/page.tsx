import { getBlogsPublic } from "@/actions/blogApi";
import { BlogsSection } from "@/components/modules/Blogs";

export default async function BlogShowcase() {
  const blogs = await getBlogsPublic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <BlogsSection
        blogs={blogs}
        showViewAll={false}
        title="All Blogs"
        subtitle="Explore my latest articles and insights on web development, programming, and modern technologies"
      />
    </div>
  );
}

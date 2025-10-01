import BlogCard from "@/components/Blogcard";
import HeroSection from "@/components/HeroSection";

const blogs = [
  {
    id: "cmg7ijnlt000316c25dogx4qt",
    title: "Authentication in Express with JWT",
    slug: "authentication-in-express-with-jwt",
    excerpt: "Implement secure authentication in your Express apps.",
    coverImage:
      "https://res.cloudinary.com/duru0tyla/image/upload/v1759294540/portfolio/1olxt5ppchd-1759294537861-jwt.jpg",
    tags: ["ExpressJS", "JWT", "Authentication"],
    published: false,
  },
];
export default function Home() {
  return (
    <>
      <HeroSection />
      <h2 className="text-center my-5 text-4xl">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </>
  );
}

import HeroSection from "@/components/HeroSection";
import { getBlogsPublic } from "@/actions/blogApi";
import { getProjectsPublic } from "@/actions/projectApi";
import { getSkillsPublic } from "@/actions/skillApi";
import { SkillsSection } from "@/components/modules/Skills";
import { ProjectsSection } from "@/components/modules/Projects";
import { BlogsSection } from "@/components/modules/Blogs";
// Reuse page components as sections
import AboutSection from "@/app/(public)/about/page";
import ContactSection from "@/app/(public)/contact/page";

export default async function HomePage() {
  const [allBlogs, allProjects, allSkills] = await Promise.all([
    getBlogsPublic(),
    getProjectsPublic(),
    getSkillsPublic(),
  ]);

  const blogs = allBlogs.slice(0, 3);
  const projects = allProjects.slice(0, 3);
  // Show all skills on home page
  const skills = allSkills;

  return (
    <>
      <HeroSection />
      <SkillsSection skills={skills} showViewAll={false} />
      <ProjectsSection projects={projects} />
      <BlogsSection blogs={blogs} />
      <AboutSection />
      <ContactSection />
    </>
  );
}

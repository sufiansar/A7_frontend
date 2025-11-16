import { getProjectsPublic } from "@/actions/projectApi";
import { ProjectsSection } from "@/components/modules/Projects";

export default async function ProjectShowcase() {
  const projects = await getProjectsPublic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <ProjectsSection
        projects={projects}
        showViewAll={false}
        title="All Projects"
        subtitle="Explore my portfolio of web applications, mobile apps, and software solutions"
      />
    </div>
  );
}

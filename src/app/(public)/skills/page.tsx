import { getSkillsPublic } from "@/actions/skillApi";
import { SkillsSection } from "@/components/modules/Skills";

export default async function SkillsShowcase() {
  const skillsData = await getSkillsPublic();
  const skills = Array.isArray(skillsData) ? skillsData : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <SkillsSection
        skills={skills}
        showViewAll={false}
        title="My Skills"
        subtitle="Discover the technologies and tools I work with to build amazing projects"
      />

      {/* Stats Section */}
      {skills.length > 0 && (
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20">
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {skills.length}+
                </div>
                <div className="text-gray-400 text-sm">Total Skills</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {
                    [
                      ...new Set(
                        skills.map((skill) => skill.category).filter(Boolean)
                      ),
                    ].length
                  }
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {
                    skills.filter(
                      (skill) =>
                        skill.level?.toLowerCase() === "expert" ||
                        skill.level?.toLowerCase() === "advanced"
                    ).length
                  }
                </div>
                <div className="text-gray-400 text-sm">Advanced+</div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  Always
                </div>
                <div className="text-gray-400 text-sm">Learning</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

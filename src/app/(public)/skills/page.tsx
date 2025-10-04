import { getSkillsPublic } from "@/actions/skillApi";
import { SkillItem } from "@/interfaces";
import Image from "next/image";

export default async function SkillsShowcase() {
  const skillsData = await getSkillsPublic();
  const skills = Array.isArray(skillsData) ? skillsData : [];

  if (!skills || skills.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto py-26 px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Discover the technologies and tools I work with to build amazing
              projects
            </p>
            <div className="text-gray-500">
              No skills available at the moment. Check back later!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-26 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Discover the technologies and tools I work with to build amazing
            projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill: SkillItem) => (
            <div
              key={skill.id}
              className="group bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                {skill.iconUrl ? (
                  <Image
                    src={skill.iconUrl}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {skill.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-blue-400 transition-colors">
                {skill.name}
              </h3>

              {skill.level && (
                <div className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      skill.level.toLowerCase() === "expert"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : skill.level.toLowerCase() === "advanced"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : skill.level.toLowerCase() === "intermediate"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {skills.length}+
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {
                  skills.filter(
                    (skill: SkillItem) =>
                      skill.level?.toLowerCase() === "expert" ||
                      skill.level?.toLowerCase() === "advanced"
                  ).length
                }
                +
              </div>
              <div className="text-gray-400">Advanced Skills</div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">
                Always
              </div>
              <div className="text-gray-400">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

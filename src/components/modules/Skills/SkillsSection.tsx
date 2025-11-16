import Link from "next/link";
import { ChevronRight, Award } from "lucide-react";
import { Skill } from "@/interfaces";
import { SkillCard } from "./SkillCard";

interface SkillsSectionProps {
  skills: Skill[];
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export const SkillsSection = ({
  skills,
  showViewAll = true,
  title = "My Skills",
  subtitle = "Technologies and tools I'm passionate about learning and mastering",
}: SkillsSectionProps) => {
  // Flat skills list — no category grouping here (home & skills pages show simple grid)

  return (
    <section className="relative py-20">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {skills.length === 0 ? (
          <div className="text-center text-gray-400">
            No skills available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill: Skill, index: number) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        )}

        {skills.length > 0 && showViewAll && (
          <div className="text-center mt-16">
            <Link
              href="/skills"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
            >
              <Award className="w-5 h-5 mr-2" />
              View All Skills
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

import Image from "next/image";
import { Code2, Star, Zap, Award, Target } from "lucide-react";
import { Skill } from "@/interfaces";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard = ({ skill, index }: SkillCardProps) => {
  const getLevelIcon = (level: string) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return <Award className="w-4 h-4 text-yellow-400" />;
      case "advanced":
        return <Star className="w-4 h-4 text-blue-400" />;
      case "intermediate":
        return <Zap className="w-4 h-4 text-green-400" />;
      case "beginner":
        return <Target className="w-4 h-4 text-purple-400" />;
      default:
        return <Code2 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return "border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20";
      case "advanced":
        return "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20";
      case "intermediate":
        return "border-green-500/30 bg-green-500/10 hover:bg-green-500/20";
      case "beginner":
        return "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20";
      default:
        return "border-gray-500/30 bg-gray-500/10 hover:bg-gray-500/20";
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        skill.level
          ? getLevelColor(skill.level)
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Floating particles effect */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div
        className="absolute top-4 right-4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ animationDelay: "200ms" }}
      ></div>

      <div className="relative z-10">
        {/* Icon Section */}
        <div className="flex items-center justify-center mb-4">
          {skill.iconUrl ? (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 p-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src={skill.iconUrl}
                alt={skill.name}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-bold text-white text-center mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
          {skill.name}
        </h3>

        {/* Level Badge */}
        {skill.level && (
          <div className="flex items-center justify-center gap-2 mb-3">
            {getLevelIcon(skill.level)}
            <span className="text-sm font-medium text-white/80 capitalize">
              {skill.level}
            </span>
          </div>
        )}

        {/* Skill Level Indicator - Dots instead of progress bar */}
        {skill.level && (
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((dot) => {
              const isActive =
                (skill.level?.toLowerCase() === "beginner" && dot <= 2) ||
                (skill.level?.toLowerCase() === "intermediate" && dot <= 3) ||
                (skill.level?.toLowerCase() === "advanced" && dot <= 4) ||
                (skill.level?.toLowerCase() === "expert" && dot <= 5);

              return (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/30"
                      : "bg-white/20"
                  }`}
                  style={{
                    animationDelay: `${dot * 100}ms`,
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                  }}
                ></div>
              );
            })}
          </div>
        )}

        {/* Hover effect overlay */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

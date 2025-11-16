import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { timelineData } from "@/helpers/timeline";
import {
  ArrowRight,
  Download,
  GraduationCap,
  Code2,
  Target,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Elements (non-interactive) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden></div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative group order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30 rounded-3xl blur-2xl opacity-40"></div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/40 rounded-full"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/40 rounded-full"
                style={{}}
              ></div>
              <div
                className="absolute top-8 -left-6 w-4 h-4 bg-emerald-500/40 rounded-full"
                style={{}}
              ></div>

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105">
                <Image
                  src="/images/profile.jpg"
                  alt="Md. Abu Sufian - CSE Student"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-2xl object-cover shadow-2xl"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                Graduate — Completed
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Me
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-white font-semibold">Md. Abu Sufian</span>
                , a passionate Computer Science & Engineering graduate from{" "}
                <span className="text-purple-400">
                  Dhaka International University
                </span>
                . I&apos;m on a journey to master web development and create
                meaningful digital solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                  <Code2 className="w-5 h-5 mr-2" />
                  View My Projects
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="group px-8 py-3 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Let&apos;s Connect
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <GraduationCap className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:bg-white/10 transform hover:scale-105">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      B.Sc. in Computer Science & Engineering
                    </h3>
                    <p className="text-purple-400 font-medium">
                      Dhaka International University
                    </p>
                    <p className="text-gray-400 mt-1">
                      Graduate • Class of 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">
                      80%
                    </div>
                    <div className="text-xs text-gray-400">Current CGPA</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Focusing on software development, algorithms, data structures,
                  and modern web technologies.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">
                Technologies I&apos;m Learning
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-emerald-400" />
                  Frontend Development
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "React", level: 85, color: "blue" },
                    { name: "Next.js", level: 80, color: "purple" },
                    { name: "TypeScript", level: 75, color: "indigo" },
                    { name: "Tailwind CSS", level: 90, color: "cyan" },
                    { name: "JavaScript", level: 85, color: "yellow" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative px-4 py-2 bg-white/10 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-white/20 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer"
                    >
                      <span>{skill.name}</span>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {skill.level}% proficient
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  Backend & Database
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Node.js", level: 70 },
                    { name: "Express.js", level: 75 },
                    { name: "Prisma", level: 65 },
                    { name: "PostgreSQL", level: 70 },
                    { name: "MongoDB", level: 80 },
                    { name: "REST APIs", level: 85 },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative px-4 py-2 bg-white/10 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                    >
                      <span>{skill.name}</span>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {skill.level}% proficient
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            {
              number: "15+",
              label: "Practice Projects",
              icon: Code2,
              color: "blue",
            },
            {
              number: "2+",
              label: "Years Learning",
              icon: GraduationCap,
              color: "purple",
            },
            {
              number: "20+",
              label: "Technologies",
              icon: Target,
              color: "emerald",
            },
            {
              number: "100%",
              label: "Passion for Code",
              icon: Heart,
              color: "pink",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-3 group">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Journey Story */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            My Learning{" "}
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              As a Computer Science & Engineering graduate from{" "}
              <span className="text-purple-400 font-semibold">
                Dhaka International University
              </span>
              , I&apos;ve discovered my passion for web development and creating
              digital solutions that matter. My journey started with curiosity
              about how websites work and has evolved into building full-stack
              web applications.
            </p>
            <p className="text-lg">
              Currently, I&apos;m focusing on mastering modern web technologies
              like <span className="text-yellow-400">JavaScript</span>,
              <span className="text-blue-400">React</span>,
              <span className="text-purple-400"> Next.js</span>, and{" "}
              <span className="text-emerald-400">Node.js</span>. Each project I
              work on teaches me something new and helps me grow as a developer.
              I believe in learning by doing and constantly challenging myself
              with new technologies and concepts.
            </p>
            <p className="text-lg">
              Having completed my degree, I&apos;m excited to apply my knowledge
              in real-world projects and contribute to meaningful software
              solutions that can make a difference.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Key milestones in my learning and development journey
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500 rounded-full"></div>

            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex items-center group">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full border-4 border-gray-900 z-10 group-hover:scale-125 transition-transform"></div>

                  <div
                    className={`w-5/12 ${
                      item.side === "right" ? "ml-auto" : ""
                    }`}
                    style={{}}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/50">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Connect
            </span>{" "}
            and Build Together
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I&apos;m always eager to learn from others, collaborate on exciting
            projects, and discuss new technologies. Let&apos;s connect and
            explore opportunities to create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="group bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Get In Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="group px-8 py-4 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                <Code2 className="w-5 h-5 mr-2" />
                See My Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

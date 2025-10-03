import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative group order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-50"></div>

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
                <Image
                  src="/images/profile.jpg"
                  alt="Md. Abu Sufian - CSE Student"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-2xl object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Final Year CSE Student
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Me
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Hi, I&apos;m Md. Abu Sufian, a final year Computer Science &
                Engineering student at Dhaka International University. I&apos;m
                passionate about web development and currently learning modern
                technologies to build my skills.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25">
                  View My Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black backdrop-blur-sm bg-white/10"
                >
                  Let&apos;s Connect
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Education</h2>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white">
                B.Sc. in Computer Science & Engineering
              </h3>
              <p className="text-purple-400 font-medium">
                Dhaka International University
              </p>
              <p className="text-gray-400 mt-1">
                Final Year • Expected Graduation: 2025
              </p>
              <p className="text-gray-400 mt-3">
                Currently completing my Bachelor&apos;s degree in CSE, focusing
                on software development, algorithms, and modern web
                technologies.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">
              Technologies I&apos;m Learning
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/10 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300">
                  Backend & Database
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Node.js",
                    "Express.js",
                    "Prisma",
                    "PostgreSQL",
                    "MongoDB",
                    "REST APIs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/10 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: "10+", label: "Practice Projects" },
            { number: "1+", label: "Years Learning" },
            { number: "15+", label: "Technologies" },
            { number: "100%", label: "Passion for Code" },
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            My Learning Journey
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed">
            <p>
              As a final year CSE student at Dhaka International University,
              I&apos;ve discovered my passion for web development and creating
              digital solutions. My journey started with basic programming
              concepts and has evolved into building full-stack web
              applications.
            </p>
            <p>
              Currently, I&apos;m focusing on mastering modern web technologies
              like React, Next.js, and Node.js. Each project I work on teaches
              me something new and helps me grow as a developer. I believe in
              learning by doing and constantly challenging myself with new
              technologies and concepts.
            </p>
            <p>
              As I prepare to graduate and enter the professional world,
              I&apos;m excited to apply my knowledge in real-world projects and
              contribute to meaningful software solutions.
            </p>
          </div>
        </div>

        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connect
            </span>{" "}
            and Learn Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I&apos;m always eager to learn from others, collaborate on projects,
            and discuss new technologies. Let&apos;s connect and explore
            opportunities together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25">
                Get In Touch
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-full border-2 border-white/70 text-white hover:bg-white hover:text-black backdrop-blur-sm bg-white/10"
              >
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

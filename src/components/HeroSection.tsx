"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { delay150, delay300, fadeInUp, float } from "@/lib/animations";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-20 sm:top-40 left-1/2 w-30 sm:w-60 h-30 sm:h-60 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:30px_30px] sm:bg-[size:50px_50px]"></div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 min-h-screen flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 animate-fadeInUp">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8">
          {/* Badge */}
          <div
            className={`inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium border border-gray-700 ${fadeInUp}`}
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Final Year CSE Student
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${fadeInUp} ${delay150}`}
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
                Md. Abu Sufian
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full"></span>
            </span>
          </h1>

          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light ${fadeInUp} ${delay300}`}
          >
            CSE Student & Aspiring Web Developer
          </h2>

          <p
            className={`text-gray-500 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0 ${fadeInUp} delay-500`}
          >
            Final year Computer Science student at Dhaka International
            University, passionate about learning modern web technologies and
            building my skills to create amazing digital experiences.
          </p>
          <div
            className={`flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 ${fadeInUp}`}
            style={{ animationDelay: "0.7s" }}
          >
            <Link href="/projects" className="w-full sm:w-auto">
              <Button className="w-full group relative bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 overflow-hidden border border-gray-700">
                <span className="relative z-10 flex items-center">
                  View My Projects
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-white/50 text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-white/10"
              >
                <span className="flex items-center">
                  Let&apos;s Connect
                  <Send className="w-5 h-5 ml-2 group-hover:rotate-45 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8 pt-6 sm:pt-8 ${fadeInUp}`}
            style={{ animationDelay: "0.9s" }}
          >
            <div className="text-center md:text-left min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-300">
                10+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Practice Projects
              </div>
            </div>
            <div className="text-center md:text-left min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-300">
                2+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Years Learning
              </div>
            </div>
            <div className="text-center md:text-left min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-300">
                15+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Technologies
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className={`flex-1 relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] ${float} ${delay150}`}
        >
          <div className="relative w-full h-full group">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-black/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>

            {/* Image container */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900/30 to-black/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-1 sm:p-2 border border-gray-800">
              <Image
                src="/images/Saly-16.png"
                alt="Md. Abu Sufian - CSE Student"
                fill
                className="object-cover rounded-xl sm:rounded-2xl transition-all duration-700 group-hover:scale-105"
              />

              {/* Floating elements */}
              <div
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 sm:w-8 h-6 sm:h-8 bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 sm:w-6 h-4 sm:h-6 bg-gray-700 rounded-full animate-bounce"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute top-4 sm:top-8 -left-2 sm:-left-4 w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full animate-bounce"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

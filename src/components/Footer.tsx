"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-black via-gray-900 to-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Md. Abu Sufian</h2>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Full Stack Developer passionate about creating exceptional digital
              experiences through modern web technologies and innovative
              solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Available for freelance projects
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                Home
              </Link>
              <Link
                href="/projects"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                Projects
              </Link>
              <Link
                href="/blogs"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                Blogs
              </Link>
              <Link
                href="/skills"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                Skills
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                About
              </Link>
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-purple-500"></div>
                Dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Let&apos;s Connect
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Ready to bring your ideas to life? Let&apos;s work together!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="mailto:your.email@example.com"
                  target="_blank"
                  className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20"
                >
                  <Mail className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">
                    Email
                  </span>
                </Link>
                <Link
                  href="https://linkedin.com/in/sufiansar" //github.com/sufiansar"
                  target="_blank"
                  className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20"
                >
                  <Github className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">
                    GitHub
                  </span>
                </Link>
                <Link
                  href="https://linkedin.com/in/sufiansar"
                  target="_blank"
                  className="group flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20"
                >
                  <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">
                    LinkedIn
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} Md. Abu Sufian. All rights
                reserved.
              </p>
              <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <p>Designed & Built with passion</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <Link href="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span className="flex items-center gap-1">
                Made with <span className="text-red-500">❤️</span> using Next.js
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-600">
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Next.js
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              React
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              Prisma
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

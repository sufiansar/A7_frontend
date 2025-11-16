"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Download,
  Eye,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
} from "lucide-react";

const HeroSection = () => {
  const phrases = [
    "I'm a React specialist",
    "I'm a Next.js expert",
    "I'm a Node.js developer",
    "I'm a TypeScript enthusiast",
    "I build with Tailwind CSS",
    "I'm a Full Stack Developer",
    "I'm a Problem Solver",
  ];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [wordsShown, setWordsShown] = useState(0);

  useEffect(() => {
    const current = phrases[index];
    const words = current.split(" ");

    // reset
    setWordsShown(0);
    setVisible(true);

    let wordTimer: ReturnType<typeof setTimeout> | null = null;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

    const showNext = (i: number) => {
      if (i <= words.length) {
        setWordsShown(i);
        wordTimer = setTimeout(() => showNext(i + 1), 220);
      } else {
        // full sentence shown: pause, then fade and advance
        pauseTimer = setTimeout(() => {
          setVisible(false);
          fadeTimer = setTimeout(() => {
            setIndex((s) => (s + 1) % phrases.length);
          }, 350);
        }, 1200);
      }
    };

    showNext(1);

    return () => {
      if (wordTimer) clearTimeout(wordTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section className="relative min-h-screen text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left px-4 lg:px-0">
          <div className="inline-block mb-6 px-6 py-4 rounded-md bg-black/40 border border-gray-800 text-cyan-300 font-semibold shadow-md text-lg tracking-tight">
            Hello!
          </div>

          <div className="mb-2 text-xl text-gray-300 font-medium">I am</div>

          <h1 className="font-extrabold leading-tight mb-2 tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
              Md. Abu
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              Sufian
            </span>
          </h1>

          <div className="text-2xl font-semibold mb-4 tracking-wide text-gray-200 flex items-center gap-3 justify-center lg:justify-start">
            <div className="relative h-10 w-full max-w-xl overflow-hidden">
              <div
                aria-hidden
                className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {(() => {
                  const words = phrases[index].split(" ");
                  const visibleWords = words.slice(0, wordsShown).join(" ");
                  return (
                    <div className="h-10 flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 font-bold whitespace-nowrap">
                        {visibleWords}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed mb-8 tracking-wide">
            Passionate about creating innovative web solutions with modern
            technologies. I specialize in building scalable applications that
            deliver exceptional user experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button
              onClick={() => {
                // Open the resume folder/link in a new tab (provided by the user)
                window.open(
                  "https://drive.google.com/drive/folders/1ZSGjrQ1XLcnTtCmDFtIjGXtx_5-kZX-x?usp=sharing",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg text-base font-semibold"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </Button>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-cyan-500 text-cyan-300 hover:bg-white/5 transition text-base"
            >
              <Eye className="w-5 h-5" />
              <span>View Projects</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href="https://github.com/sufiansar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition"
            >
              <Github className="w-5 h-5 text-white/90" />
            </a>
            <a
              href="https://www.linkedin.com/in/sufian32"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition"
            >
              <Linkedin className="w-5 h-5 text-blue-300" />
            </a>
            <a
              href="https://x.com/Sufian_32"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition"
            >
              <Twitter className="w-5 h-5 text-sky-400" />
            </a>
            <a
              href="https://www.facebook.com/sufian.asr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition"
            >
              <Facebook className="w-5 h-5 text-blue-400" />
            </a>
            <a
              href="mailto:sufiancodecrush@gmail.com"
              className="inline-flex items-center gap-3 px-3 py-2 rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition max-w-full"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-white/90 flex-shrink-0" />
              <span className="hidden sm:block text-sm text-purple-300 truncate max-w-[12rem] sm:max-w-[18rem]">
                sufiancodecrush@gmail.com
              </span>
            </a>
            <a
              href="tel:+8801981600560"
              className="inline-flex items-center gap-3 px-3 py-2 rounded-full border border-white/8 bg-white/3 hover:bg-white/6 transition max-w-full"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4 text-white/90 flex-shrink-0" />
              <span className="hidden sm:block text-sm text-gray-300 truncate max-w-[10rem] sm:max-w-[14rem]">
                +88 01981600560
              </span>
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl overflow-hidden border border-gray-800 bg-black/30">
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[520px]">
              <Image
                src="/programming-animation.gif"
                alt="Developer Illustration"
                fill
                className="object-cover"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export const timelineData: TimelineItem[] = [
  {
    year: "2021",
    title: "Started CSE Journey",
    description:
      "Began Computer Science & Engineering at Dhaka International University, exploring the fundamentals of programming and computer science.",
    side: "left",
  },
  {
    year: "2022",
    title: "Core Programming",
    description:
      "Mastered C and C++ programming languages, learned data structures, algorithms, and object-oriented programming concepts.",
    side: "right",
  },
  {
    year: "2023",
    title: "Web Development Discovery",
    description:
      "Discovered my passion for web development. Started learning HTML, CSS, JavaScript, and building my first web projects.",
    side: "left",
  },
  {
    year: "2024",
    title: "Modern Tech Stack",
    description:
      "Dived deep into React, Next.js, Node.js, and modern web development frameworks. Built multiple full-stack projects.",
    side: "right",
  },
  {
    year: "2025",
    title: "Final Year & Beyond",
    description:
      "Currently in final year, actively seeking internships, building portfolio projects, and preparing for my professional career.",
    side: "left",
  },
];

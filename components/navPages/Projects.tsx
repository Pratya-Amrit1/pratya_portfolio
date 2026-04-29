import { Heart } from "lucide-react";
import React, { JSX, useState } from "react";
import dynamic from "next/dynamic";
import ProjectCard from "../ProjectCard";
import { jetbrainsMono } from "@/app/font";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiNextdotjs, SiPostgresql, SiTailwindcss, SiVite } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

// Lazy load modal — only needed on click
const ProjectModal = dynamic(() => import("../ProjectModal"), { ssr: false });

export const techIconMap: Record<string, JSX.Element> = {
  react: <FaReact className="text-cyan-300" />,
  node: <FaNodeJs className="text-green-500" />,
  express: <SiExpress className="text-white" />,
  mongo: <SiMongodb className="text-green-400" />,
  ts: <SiTypescript className="text-blue-500" />,
  next: <SiNextdotjs className="text-white" />,
  postgres: <SiPostgresql className="text-sky-500" />,
  js: <IoLogoJavascript className="text-yellow-400" />,
  tailwind: <SiTailwindcss className="text-cyan-400" />,
  vite: <SiVite className="text-purple-500" />
};

const projects = [
  {
    title: "OwlOps",
    description: "A privacy-first, self-hosted uptime monitoring tool with real-time SSE streaming and live latency charts",
    thumbnail: "/owlops.webp",
    techStack: ["ts", "next"],
    gradient: "#14f195, rgb(13, 1, 60)",
    github: "https://github.com/Pratya-Amrit1/owlops-web",
    live: "https://owlops-web-c1gz.vercel.app/",
  },
  {
    title: "Call-Me",
    description: "Call me is easy one to one video calls directly using webrtc",
    thumbnail: "/callme.webp",
    techStack: ["js", "node", "express"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "https://github.com/Pratya-Amrit1/call-me-conferencing-main/tree/main",
    live: "https://cme.mirotalk.com/",
  },
  {
    title: "PokeDetail",
    description: "A sleek Pokémon encyclopedia to browse, search, sort and explore every Pokémon's stats, types and abilities",
    thumbnail: "/pokedetail.webp",
    techStack: ["react", "js"],
    gradient: "#ff7e5f, #0b1020",
    github: "https://github.com/Pratya-Amrit1/pokemon-app",
    live: "https://pokedetail.vercel.app/",
  },
  {
    title: "QuickFavi",
    description: "A fast Chrome Extension that lets you instantly download the highest resolution favicon of the active tab",
    thumbnail: "/quickfavi.webp",
    techStack: ["react", "vite", "tailwind", "js"],
    gradient: "#818cf8, rgb(13, 1, 60)",
    github: "https://github.com/Pratya-Amrit1/quickfavi",
    live: "",
  },
  
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div id="projects" className={`  ${jetbrainsMono.className} flex flex-col gap-10 items-center justify-center px-4 pb-20 w-full max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex gap-2 text-[#e8390d]">
          Made with <Heart />
        </p>
        <h1 className="text-4xl md:text-6xl text-center font-bold">
          My Projects
        </h1>
      </div>

      {/* Cards */}
      <div className={`${jetbrainsMono.className} flex flex-col gap-6 w-full `}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal — lazy loaded, only rendered on click */}
      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

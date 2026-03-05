"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "VR Zone Landing Page",
    category: "Web Design",
    location: "Cape Town",
    price: "",
    description:
      "A modern, responsive Landing page for a VR Gaming Store featuring an online store and subscription service.",
    services: ["Web Design", "E-commerce"],
    image: "/vr-zone.png",
    year: "2026",
    url: "https://www.figma.com/proto/AK1jZduc3Q487gdsgSSUTo/VR-ZONE?page-id=0%3A1&node-id=1-2&t=8z8xsTwG8fQMjxwE-1",
  },
  {
    id: 2,
    title: "The Closet",
    category: "Fullstack",
    location: "Cape Town",
    price: "",
    description:
      "The Closet is a frontend-focused e-commerce prototype that prioritizes visual hierarchy and interaction design. Built with Next.js and Tailwind, it features a dynamic glass-morph navbar, meticulous use of gold accents against a monochrome foundation, and responsive product filtering.",
    services: ["Fullstack Development", "E-commerce"],
    image: "/the_closet.png",
    year: "2026",
    url: "https://the-closetsa.netlify.app/",
  },
  {
    id: 3,
    title: "Game Award",
    category: "Fullstack",
    location: "Cape Town",
    price: "",
    description:
      "A gaming Award site showing the best games of the year with a voting system and dynamic content.",
    services: ["Frontend Devlopment", "Dashboard"],
    image: "/1_WCcOiB4VKaf8Stvsw276ZQ.png",
    year: "2025",
    url: "https://awardssite.netlify.app/",
  },
];

const categories = ["All", "Web Design", "Fullstack", "E-commerce"];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-wide" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">
            Selected projects showcasing our approach to web development for any business.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground hover:bg-foreground/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="card-project border border-border"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-foreground/10">
                      {project.id.toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ExternalLink className="text-background" size={32} />
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.location} • {project.year}
                    </p>
                  </div>
                  <span className="text-lg font-semibold">{project.price}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="text-xs px-3 py-1 bg-secondary text-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity inline-block">
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            More projects coming soon as we grow.
          </p>
          <a href="#contact" className="btn-outline inline-block">
            Start Your Project
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/80"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-background max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                  <p className="text-muted-foreground">
                    {selectedProject.location} • {selectedProject.year}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-secondary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="aspect-video bg-secondary mb-6 flex items-center justify-center overflow-hidden">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-foreground/10">
                    {selectedProject.id.toString().padStart(2, "0")}
                  </span>
                )}
              </div>

              <p className="text-lg mb-6">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.services.map((service) => (
                  <span
                    key={service}
                    className="text-sm px-4 py-2 bg-secondary text-foreground"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border gap-4">
                <span className="text-2xl font-bold">{selectedProject.price}</span>
                <div className="flex gap-3">
                  <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    View Project →
                  </a>
                  <a href="#contact" className="btn-primary">
                    Start Similar Project
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;

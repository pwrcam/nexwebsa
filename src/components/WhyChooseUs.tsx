"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const technologies = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "PostgreSQL", level: 75 },
  { name: "MongoDB", level: 80 },
  { name: "Express", level: 85 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Git", level: 90 },
  { name: "Flutter", level: 75 },
  { name: "Bootstrap", level: 95 },
  { name: "Python", level: 89 },
  { name: "Supabase", level: 85 },
];

const testimonials = [
  {
    name: "Johan Botha",
    company: "Small Business Owner",
    text: "Working with NexWeb was refreshing. They listened, understood our needs, and delivered a website that our customers love.",
    rating: 5,
  },
  {
    name: "Nomvula Sithole",
    company: "Startup Founder",
    text: "As a fellow startup, they understood our budget constraints and still delivered quality work. Highly recommend for other SA businesses.",
    rating: 5,
  },
  {
    name: "Peter Williams",
    company: "Local Consultant",
    text: "The team's enthusiasm and dedication really shows in their work. They went above and beyond to ensure we were happy.",
    rating: 5,
  },
];

const usps = [
  {
    title: "Fresh Perspectives",
    description: "Latest technologies and modern approaches without legacy constraints",
  },
  {
    title: "Modern Tech Stack",
    description: "MERN/PERN stack expertise: React, Node.js, MongoDB, PostgreSQL",
  },
  {
    title: "Personalized Attention",
    description: "Direct collaboration with our team—no corporate layers or delays",
  },
  {
    title: "Competitive Pricing",
    description: "Startup-friendly rates in ZAR, designed for SA business budgets",
  },
  {
    title: "Local Understanding",
    description: "Cape Town-based team that knows the local market and its needs",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide" ref={ref}>
        {/* USPs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="section-title mb-4">Why Choose NexWeb</h2>
          <p className="section-subtitle mb-12">
            What makes us the right choice for your web development needs.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 border border-border hover:border-foreground transition-colors"
              >
                <h3 className="text-lg font-bold mb-2">{usp.title}</h3>
                <p className="text-muted-foreground text-sm">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <h3 className="text-2xl font-bold mb-8">Technologies We Use</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="bg-background p-4 border border-border group hover:border-foreground transition-all"
              >
                <p className="font-semibold mb-2">{tech.name}</p>
                <div className="h-1 bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tech.level}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                    className="h-full bg-foreground"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8">What People Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-background p-8 border border-border"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-foreground"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

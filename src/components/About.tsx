"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      title: "Fresh Perspective",
      description:
        "We bring the latest technologies and modern approaches without legacy baggage.",
    },
    {
      title: "Up-to-Date Skills",
      description:
        "We're trained in the most current frameworks and best practices in web development.",
    },
    {
      title: "Passionate Approach",
      description:
        "Every project is an opportunity to prove ourselves and deliver exceptional results.",
    },
    {
      title: "Local Understanding",
      description:
        "Based in Cape Town, we understand the South African business landscape and its unique needs.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-foreground text-background">
      <div className="container-wide" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              About Us
            </h2>

            <div className="space-y-6 text-background/80">
              <p className="text-xl">
                NexWeb started with a simple belief: that fresh talent and
                genuine passion can deliver exceptional web experiences.
              </p>
              <p>
                Based in Cape Town, we're a team of fullstack
                developers with 4+ years of professional experience. What we
                lack in years, we make up for with dedication, current skills,
                and an eagerness to prove ourselves through our work.
              </p>
              <p>
                We understand the business landscape because we're
                part of it. We know the challenges businesses face when
                establishing their digital presence, and we've designed our
                services and pricing to be accessible and transparent.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="mt-12 p-8 border border-background/20">
              <p className="text-sm uppercase tracking-widest text-background/60 mb-4">
                Our Mission
              </p>
              <p className="text-2xl font-medium">
                "Empowering businesses with modern web solutions."
              </p>
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8">Why We're Different</h3>

            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="flex gap-6">
                  <span className="text-4xl font-bold text-background/20 group-hover:text-background/40 transition-colors">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                    <p className="text-background/70">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-background/20"
        >
          {[
            { number: "3+", label: "Year Experience" },
            { number: "15+", label: "Projects Delivered" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "24hr", label: "Response Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
              <p className="text-sm text-background/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

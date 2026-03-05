"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Dylan Pearson",
    role: "CEO | Full-Stack Developer",
    bio: "Passionate about building scalable web applications. Specializes in React and Node.js with a focus on clean, maintainable code.",
    skills: ["React", "Node.js", "TypeScript", "Figma"],
    avatar: "DP",
  },
  {
    name: "Buhle Magodla",
    role: "COO | Full-stack Developer",
    bio: "Creating user-centered designs that balance aesthetics with functionality. Believes great design should be invisible yet impactful.",
    skills: ["Figma", "UI Design", "C#", "React"],
    avatar: "BM",
  },
  {
    name: "Cameron Jacobs",
    role: "CTO | Frontend Developer",
    bio: "Frontend enthusiast with UI/UX skills. Loves translating design concepts into modern, responsive web applications.",
    skills: ["WordPress", "Flutter", "React", "Vue.js"],
    avatar: "CJ",
  },
  {
    name: "Raeesa Samaai",
    role: "UI/UX Designer",
    bio: "Passionate about creating intuitive and visually appealing user experiences. Specializes in designing interfaces that are both beautiful and functional.",
    skills: ["Figma", "UI Design", "Prototyping", "User Research"],
    avatar: "RS",
  },
  {
    name: "Zoë Petersen",
    role: "Backend Developer",
    bio: "Backend developer with a passion for building robust and scalable web applications. Specializes in Node.js, Python and database design.",
    skills: ["PHP", "MongoDB", "Node.js", "Python"],
    avatar: "ZP",
  },
  {
    name: "Dredan Hendricks",
    role: "Backend Developer",
    bio: "Backend developer with a passion for building robust and scalable server-side applications. Specializes in Node.js and database design.",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    avatar: "DH",
  },
  {
    name: "Ay-Yoob Dawood",
    role: "Full-Stack Developer",
    bio: "Full-stack developer with a passion for building robust and scalable web applications. Specializes in React, Node.js, and database design.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    avatar: "AD",
  },
  {
    name: "Brayn Meyer",
    role: "Backend Developer",
    bio: "Full-stack developer with a passion for building robust and scalable web applications. Specializes in React, Node.js, and database design.",
    skills: ["PHP", "Node.js", "Python", "MongoDB"],
    avatar: "BM",
  },
  {
    name: "Aashiq Benny",
    role: "QA | Frontend developer",
    bio: "Full-stack developer with a passion for building robust and scalable web applications. Specializes in React, Node.js, and database design.",
    skills: ["React", "Node.js", "Python", "Vue.js"],
    avatar: "AB",
  },
  {
    name: "Nieshaan de Beer",
    role: "QA | Backend developer",
    bio: "Full-stack developer with a passion for building robust and scalable web applications. Specializes in React, Node.js, and database design.",
    skills: ["React", "Node.js", "Python", "PHP"],
    avatar: "NDB",
  },
  {
    name: "Emanuel Kiddo",
    role: "Head of Business Development",
    bio: "I coordinate Business meetings with existing and potential clients, as well as marketing and sourcing client. I ensure the smooth running of the administration of the business.",
    skills: ["Public Relations", "Marketing", "Communication", "Business Administration"],
    avatar: "EK",
  },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="section-padding">
      <div className="container-wide" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Meet Our Cape Town Team</h2>
          <p className="section-subtitle mx-auto">
            Developers with dedication. Serving businesses with fresh
            perspectives and modern tech skills.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-team border border-border hover:border-foreground"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 bg-foreground text-background flex items-center justify-center text-2xl font-bold">
                {member.avatar}
              </div>

              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {member.role}
              </p>

              <p className="text-sm text-muted-foreground mb-6">{member.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 bg-secondary text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {/* <a
                  href="www.linkedin.com/in/cameron-ashwinjacobs"
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-secondary p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">We Believe in Partnership</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We don't just build websites—we partner with you to understand your
            business and create solutions that truly serve your goals. Your
            success is our success.
          </p>
          <a href="#contact" className="btn-primary inline-block">
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

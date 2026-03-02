import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[15%] left-[10%] w-32 h-32 border-2 border-foreground/10 animate-float"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute top-[25%] right-[15%] w-24 h-24 bg-foreground/5 rotate-45 animate-float-reverse"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="absolute bottom-[20%] left-[20%] w-16 h-16 border border-foreground/10 rounded-full animate-float-slow"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-[30%] right-[10%] w-20 h-20 border-2 border-foreground/5 animate-float"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute top-[60%] left-[5%] w-12 h-12 bg-foreground/3 rotate-12 animate-float-reverse"
        />
      </div>

      {/* Content */}
      <div className="container-wide px-6 md:px-12 lg:px-24 pt-20 relative z-10">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm md:text-base font-medium tracking-wider uppercase text-muted-foreground mb-6"
          >
            Cape Town Web Development Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            Building Digital
            <br />
            Foundations for
            <br />
            Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4"
          >
            Where passion meets professional execution.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mb-12"
          >
            We're a team of dedicated fullstack developers
            transforming ideas into functional, beautiful web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => handleNavClick("#portfolio")}
              className="btn-primary"
            >
              View Our Work
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-outline"
            >
              Discuss Your Project
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            {/* <span className="text-xs uppercase tracking-widest">Scroll</span> */}
            {/* <ArrowDown size={20} /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

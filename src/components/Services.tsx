import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { LayoutGrid, Layers, Code, Settings } from "lucide-react";

const services = [
  {
    icon: LayoutGrid,
    title: "Web Design",
    description: "Custom designs tailored to your business and audience",
    details: [
      "Responsive layouts",
      "Brand-aligned aesthetics",
      "User-focused design",
    ],
  },
  {
    icon: Layers,
    title: "Prototyping & UX",
    description: "Interactive prototypes before development",
    details: ["Wireframing", "User testing", "Iterative design"],
  },
  {
    icon: Code,
    title: "Fullstack Development",
    description: "Modern MERN/PERN stack solutions",
    details: ["React & Node.js", "Database design", "API development"],
  },
  {
    icon: Settings,
    title: "Website Maintenance",
    description: "Ongoing support and updates",
    details: ["Security updates", "Performance optimization", "Content changes"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn about your business and goals",
  },
  {
    number: "02",
    title: "Design",
    description: "Creating mockups you can visualize",
  },
  {
    number: "03",
    title: "Develop",
    description: "Building with modern technologies",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-wide" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Modern web solutions designed for businesses ready to
            establish their digital presence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-service bg-background group"
            >
              <service.icon
                size={40}
                strokeWidth={1.5}
                className="mb-6 transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* How We Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-12">How We Work</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-6xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors">
                    {step.number}
                  </span>
                  <div className="pt-4">
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

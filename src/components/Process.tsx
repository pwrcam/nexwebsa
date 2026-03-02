import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Palette, Code, Rocket, HeadphonesIcon } from "lucide-react";

const processSteps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Discovery",
    subtitle: "Meet in Cape Town / Virtual",
    description:
      "We start by understanding your business, goals, and target audience. We'll discuss your vision and create a clear project roadmap.",
    duration: "1-2 days",
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    subtitle: "Prototypes & Mockups",
    description:
      "We create wireframes and visual designs for your review. You'll see exactly how your site will look before any code is written.",
    duration: "3-5 days",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    subtitle: "Modern Tech Stack",
    description:
      "Using React, Node.js, and modern databases, we build your site with clean code and best practices for performance and security.",
    duration: "5-15 days",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    subtitle: "Hosting & Deployment",
    description:
      "We deploy your site to reliable hosting, set up your domain, and ensure everything runs smoothly. Full training included.",
    duration: "1-2 days",
  },
  {
    icon: HeadphonesIcon,
    number: "05",
    title: "Support",
    subtitle: "Ongoing Maintenance",
    description:
      "Our relationship doesn't end at launch. We offer ongoing support packages to keep your site secure and up-to-date.",
    duration: "Ongoing",
  },
];

const pricingPackages = [
  {
    name: "Starter",
    price: "R 10,000 - R 20,000",
    description: "Perfect for small businesses starting their web journey",
    features: [
      "5-page responsive website",
      "Basic SEO setup",
      "Contact form",
      "Mobile-friendly design",
      "1 month support",
    ],
  },
  {
    name: "Business",
    price: "R 25,000 - R 50,000",
    description: "For growing businesses needing more functionality",
    features: [
      "10-15 page website",
      "Custom design",
      "CMS integration",
      "Advanced SEO",
      "E-commerce ready",
      "3 months support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R 40,000+",
    description: "Full-scale solutions for established businesses",
    features: [
      "Unlimited pages",
      "Custom functionality",
      "API integrations",
      "Advanced security",
      "Priority support",
      "6 months support",
    ],
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-secondary">
      <div className="container-wide" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            A transparent, step-by-step approach that keeps you informed and in
            control throughout your project.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-16 pb-16 last:pb-0 border-l-2 border-border ml-4"
            >
              {/* Step Number Circle */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-foreground text-background flex items-center justify-center text-xs font-bold">
                {step.number}
              </div>

              <div className="bg-background p-8 border border-border hover:border-foreground transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <step.icon size={24} strokeWidth={1.5} />
                  <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {step.duration}
                  </span>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-4">Transparent Pricing</h3>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            No hidden costs. We believe in honest pricing that
            businesses can plan around.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className={`bg-background p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${
                  pkg.popular ? "border-foreground" : "border-border"
                }`}
              >
                {pkg.popular && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wider bg-foreground text-background px-3 py-1 mb-4">
                    Most Popular
                  </span>
                )}
                <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                <p className="text-3xl font-bold mb-4">{pkg.price}</p>
                <p className="text-muted-foreground mb-6">{pkg.description}</p>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block text-center py-4 font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "border-2 border-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Layout,
  Mail,
  Monitor,
  Palette,
  Phone,
  Quote,
  Send,
  Star,
} from "lucide-react";
import { Linkedin } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiGithub, SiInstagram, SiX } from "react-icons/si";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import type { Project, Service, Testimonial } from "./types/portfolio";

// ─── Data ────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    id: 1,
    title: "Website Design",
    description:
      "Stunning, conversion-focused websites tailored to your brand identity and business goals.",
    icon: "Monitor",
    features: [
      "Custom responsive design",
      "Performance optimized",
      "SEO-ready structure",
    ],
  },
  {
    id: 2,
    title: "Landing Pages",
    description:
      "High-converting landing pages that turn visitors into customers with compelling CTAs.",
    icon: "Layout",
    features: ["A/B testing ready", "Fast load times", "Clear call-to-actions"],
  },
  {
    id: 3,
    title: "Business Websites",
    description:
      "Professional multi-page websites that establish authority and drive real business results.",
    icon: "Building2",
    features: [
      "Multi-page architecture",
      "Contact integrations",
      "Analytics-ready",
    ],
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Beautiful user interfaces backed by thoughtful UX research and tested interaction patterns.",
    icon: "Palette",
    features: [
      "User journey mapping",
      "Wireframing & prototyping",
      "Design system creation",
    ],
  },
];

const projects: Project[] = [
  {
    id: 1,
    title: "NexaCloud SaaS Platform",
    description:
      "Modern SaaS dashboard with dark theme, clean data visualization, and seamless onboarding.",
    image: "/assets/generated/project-saas-website.dim_800x500.jpg",
    tags: ["SaaS", "Dashboard", "React"],
    category: "website",
  },
  {
    id: 2,
    title: "LuxCart E-Commerce",
    description:
      "Premium e-commerce experience with dark aesthetics, product cards, and smooth checkout.",
    image: "/assets/generated/project-ecommerce.dim_800x500.jpg",
    tags: ["E-Commerce", "UI Design", "Conversion"],
    category: "business",
  },
  {
    id: 3,
    title: "Stratix Consulting",
    description:
      "Corporate website for a consulting firm — clean, professional, and brand-forward.",
    image: "/assets/generated/project-business.dim_800x500.jpg",
    tags: ["Business", "Corporate", "Design"],
    category: "business",
  },
  {
    id: 4,
    title: "Flow Mobile App UI",
    description:
      "Full UI/UX design for a productivity mobile app with dark mode-first approach.",
    image: "/assets/generated/project-ux-app.dim_800x500.jpg",
    tags: ["UI/UX", "Mobile", "Figma"],
    category: "ui-ux",
  },
  {
    id: 5,
    title: "LaunchKit Landing Page",
    description:
      "High-converting SaaS landing page with gradient hero, feature grid, and social proof.",
    image: "/assets/generated/project-landing.dim_800x500.jpg",
    tags: ["Landing Page", "SaaS", "Conversion"],
    category: "landing",
  },
  {
    id: 6,
    title: "Aria Personal Brand",
    description:
      "Elegant personal branding site with portfolio gallery and premium minimal aesthetics.",
    image: "/assets/generated/project-portfolio-brand.dim_800x500.jpg",
    tags: ["Personal Brand", "Portfolio", "Design"],
    category: "website",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Founder",
    company: "TechStart India",
    photo: "https://i.pravatar.cc/150?img=11",
    feedback:
      "Akela redesigned our entire platform UI. The result was jaw-dropping — modern, fast, and our conversion rate went up by 40%. Truly exceptional work.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "CEO",
    company: "BrandFlow Agency",
    photo: "https://i.pravatar.cc/150?img=47",
    feedback:
      "Working with Akela was effortless. He understood our vision instantly and delivered a website that perfectly represents our premium brand positioning.",
    rating: 5,
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Product Manager",
    company: "NexaDev Solutions",
    photo: "https://i.pravatar.cc/150?img=15",
    feedback:
      "The landing page Akela built for our product launch drove 3x more sign-ups than expected. Clean design, perfect performance, zero complaints.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Creative Director",
    company: "Pixel Studio",
    photo: "https://i.pravatar.cc/150?img=44",
    feedback:
      "Incredibly talented designer who truly understands modern web standards. The UI/UX work Akela delivered for our app was beyond what we imagined.",
    rating: 5,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    url: "https://linkedin.com/in/akelajiofficial",
    label: "LinkedIn",
  },
  { icon: SiGithub, url: "https://github.com/akelabhaiji", label: "GitHub" },
  { icon: SiX, url: "https://x.com/akelajiofficial", label: "X" },
  {
    icon: SiInstagram,
    url: "https://instagram.com/akelajiofficial",
    label: "Instagram",
  },
  {
    icon: SiFacebook,
    url: "https://facebook.com/akelajiofficial",
    label: "Facebook",
  },
];

const serviceIconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={24} />,
  Layout: <Layout size={24} />,
  Building2: <Building2 size={24} />,
  Palette: <Palette size={24} />,
};

// ─── Shared Animation Wrapper ─────────────────────────────────────────────────

function FadeInSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial: Record<string, number | string> = { opacity: 0 };
  if (direction === "up") initial.y = 24;
  if (direction === "down") initial.y = -24;
  if (direction === "left") initial.x = 24;
  if (direction === "right") initial.x = -24;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-background"
      data-ocid="hero.section"
    >
      {/* Background radial gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none hero-orb-primary" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none hero-orb-secondary" />

      <div className="container-custom relative z-10 flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-primary"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for Freelance Projects
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tighter text-foreground leading-[0.95]"
        >
          Akela Bhai
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-body"
        >
          I build{" "}
          <span className="text-gradient font-semibold">
            modern, fast, high-converting
          </span>{" "}
          websites
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gradient font-semibold px-8 py-3.5 rounded-xl text-base flex items-center gap-2 group"
            data-ocid="hero.hire_me_button"
          >
            Hire Me
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-xl text-base font-semibold border border-border hover:border-primary/40 text-foreground transition-all duration-200 hover:bg-primary/5"
            data-ocid="hero.view_work_button"
          >
            View My Work
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-3 mt-2"
        >
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex items-center gap-8 mt-4 pt-6 border-t border-border"
        >
          {[
            { value: "50+", label: "Projects Done" },
            { value: "30+", label: "Happy Clients" },
            { value: "3+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-1.5 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────

function AboutSection() {
  const skills = [
    "React & Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "UI/UX Design",
    "Performance Optimization",
    "SEO Best Practices",
    "Responsive Design",
  ];

  return (
    <section
      id="about"
      className="section-padding bg-muted/30"
      data-ocid="about.section"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <FadeInSection
            direction="right"
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "var(--gradient-primary)",
                  transform: "rotate(3deg) scale(1.02)",
                  opacity: 0.2,
                  borderRadius: "1rem",
                }}
              />
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border shadow-elevated">
                <img
                  src="https://i.ibb.co/1G7Jc35m/100008591.jpg"
                  alt="Akela Bhai — Freelance Web Designer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2.5 shadow-subtle flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">
                  Open to Work
                </span>
              </div>
            </div>
          </FadeInSection>

          {/* Content */}
          <FadeInSection direction="left" delay={0.1}>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                  About Me
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
                  Crafting digital experiences that{" "}
                  <span className="text-gradient">convert & inspire</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  I am Akela Bhai, a web designer who creates modern, fast, and
                  high-converting websites for businesses and personal brands.
                  With a sharp eye for design and a deep understanding of user
                  behavior, I translate your vision into digital experiences
                  that don't just look great — they perform.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base mt-3">
                  Every project I take on is treated as a long-term investment
                  in your brand's success. I combine strategic thinking with
                  pixel-perfect execution to deliver websites that stand out in
                  today's competitive digital landscape.
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-gradient font-semibold px-7 py-3 rounded-xl text-sm flex items-center gap-2 justify-center group"
                  data-ocid="about.get_started_button"
                >
                  Get Started
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <a
                  href="mailto:contact@akelabhai.com"
                  className="px-7 py-3 rounded-xl text-sm font-semibold border border-border hover:border-primary/40 text-foreground transition-all duration-200 hover:bg-primary/5 text-center flex items-center gap-2 justify-center"
                  data-ocid="about.email_button"
                >
                  <Mail size={14} />
                  Send Email
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Services ────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding bg-background"
      data-ocid="services.section"
    >
      <div className="container-custom">
        <FadeInSection className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            What I Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Services built for{" "}
            <span className="text-gradient">real results</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            From concept to launch, I provide end-to-end design solutions that
            drive growth and delight users.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <FadeInSection key={service.id} delay={i * 0.1} direction="up">
              <div
                className="bg-card border border-border rounded-2xl p-7 card-hover group h-full"
                data-ocid={`services.item.${service.id}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-primary bg-primary/10">
                  {serviceIconMap[service.icon]}
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2
                        size={13}
                        className="text-primary shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="text-center mt-10">
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gradient font-semibold px-8 py-3.5 rounded-xl inline-flex items-center gap-2 group"
            data-ocid="services.cta_button"
          >
            Start a Project
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─── Section: Portfolio ───────────────────────────────────────────────────────

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const filters = ["all", "website", "landing", "business", "ui-ux"];

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="section-padding bg-muted/30"
      data-ocid="portfolio.section"
    >
      <div className="container-custom">
        <FadeInSection className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            A curated selection of projects that demonstrate my expertise in web
            design and digital experiences.
          </p>
        </FadeInSection>

        {/* Filter Tabs */}
        <FadeInSection
          delay={0.1}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                activeFilter === filter
                  ? "btn-gradient"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              data-ocid={`portfolio.filter_${filter}_tab`}
            >
              {filter === "all"
                ? "All Projects"
                : filter === "ui-ux"
                  ? "UI/UX"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </FadeInSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl overflow-hidden card-hover group"
              data-ocid={`portfolio.item.${project.id}`}
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    View Project
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-1.5">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Testimonials ────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding bg-background"
      data-ocid="testimonials.section"
    >
      <div className="container-custom">
        <FadeInSection className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            What clients <span className="text-gradient">say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Don't just take my word for it — here's what clients say about
            working with me.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <FadeInSection key={t.id} delay={i * 0.1} direction="up">
              <div
                className="bg-card border border-border rounded-2xl p-6 card-hover relative"
                data-ocid={`testimonials.item.${t.id}`}
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-5 text-primary/20">
                  <Quote size={32} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={`star-${t.id}-${idx}`}
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                  "{t.feedback}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Contact ─────────────────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((res) => setTimeout(res, 1200));
    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-muted/30"
      data-ocid="contact.section"
    >
      <div className="container-custom">
        <FadeInSection className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Let's Talk
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ready to build something{" "}
            <span className="text-gradient">amazing?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Have a project in mind? I'd love to hear about it. Reach out and
            let's create something great together.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <FadeInSection direction="right" className="lg:col-span-2 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-display font-bold text-foreground mb-1 text-lg">
                  Contact Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get in touch directly or use the form.
                </p>
              </div>

              <a
                href="mailto:contact@akelabhai.com"
                className="flex items-center gap-3 group"
                data-ocid="contact.email_link"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    contact@akelabhai.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+916352783691"
                className="flex items-center gap-3 group"
                data-ocid="contact.phone_link"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">
                    +91 63527 83691
                  </p>
                </div>
              </a>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  Connect on social
                </p>
                <div className="flex gap-2 flex-wrap">
                  {socialLinks.map(({ icon: Icon, url, label }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-200"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Contact Form */}
          <FadeInSection direction="left" delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
              data-ocid="contact.form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-xs font-medium text-muted-foreground mb-1.5 block"
                    htmlFor="contact-name"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rohan Mehta"
                    required
                    className="input-field"
                    data-ocid="contact.name_input"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium text-muted-foreground mb-1.5 block"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rohan@example.com"
                    required
                    className="input-field"
                    data-ocid="contact.email_input"
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                  htmlFor="contact-phone"
                >
                  Phone{" "}
                  <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-field"
                  data-ocid="contact.phone_input"
                />
              </div>

              <div>
                <label
                  className="text-xs font-medium text-muted-foreground mb-1.5 block"
                  htmlFor="contact-message"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project — what you need, your timeline, and your budget..."
                  rows={4}
                  required
                  className="input-field resize-none"
                  data-ocid="contact.message_textarea"
                />
              </div>

              {sent && (
                <div
                  className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-2.5"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 size={16} />
                  Message sent! I'll get back to you within 24 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-gradient w-full font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                data-ocid="contact.submit_button"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="dark">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

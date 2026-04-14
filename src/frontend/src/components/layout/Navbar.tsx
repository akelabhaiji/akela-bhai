import { Menu, X } from "lucide-react";
import { Linkedin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SiFacebook, SiGithub, SiInstagram, SiX } from "react-icons/si";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Linkedin,
    url: "https://linkedin.com/in/akelajiofficial",
    label: "LinkedIn",
  },
  { icon: SiGithub, url: "https://github.com/akelabhaiji", label: "GitHub" },
  { icon: SiX, url: "https://x.com/akelajiofficial", label: "X (Twitter)" },
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

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    const sections = [
      "hero",
      "about",
      "services",
      "portfolio",
      "testimonials",
      "contact",
    ];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToSection(href), 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/90 backdrop-blur-md border-b border-border shadow-subtle"
            : "bg-transparent"
        }`}
        data-ocid="navbar"
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 md:h-18">
            <button
              type="button"
              onClick={() => scrollToSection("#hero")}
              className="text-xl font-display font-bold text-foreground hover:text-primary transition-colors duration-200 tracking-tight"
              data-ocid="navbar.logo_link"
              aria-label="Go to top"
            >
              Akela Bhai<span className="text-gradient">.</span>
            </button>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className={`nav-link ${
                      activeSection === link.href.replace("#", "")
                        ? "active text-foreground"
                        : ""
                    }`}
                    data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                {socialLinks.slice(0, 3).map(({ icon: Icon, url, label }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5 rounded-md hover:bg-muted"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="btn-gradient text-sm font-semibold px-5 py-2.5 rounded-lg"
                data-ocid="navbar.hire_me_button"
              >
                Hire Me
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-ocid="navbar.mobile_menu_toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border flex flex-col md:hidden"
              data-ocid="navbar.mobile_drawer"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="text-lg font-display font-bold">
                  Akela Bhai<span className="text-gradient">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  data-ocid="navbar.mobile_close_button"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-5">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick(link.href)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          activeSection === link.href.replace("#", "")
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => handleNavClick("#contact")}
                    className="btn-gradient w-full text-center font-semibold px-5 py-3 rounded-lg block"
                    data-ocid="navbar.mobile_hire_button"
                  >
                    Hire Me
                  </button>
                </div>
              </nav>

              <div className="p-5 border-t border-border">
                <div className="flex items-center gap-3 justify-center">
                  {socialLinks.map(({ icon: Icon, url, label }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

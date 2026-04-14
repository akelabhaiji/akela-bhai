import { ArrowUp, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiGithub, SiInstagram, SiX } from "react-icons/si";

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

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => scrollToSection("#hero")}
              className="text-2xl font-display font-bold hover:opacity-80 transition-opacity"
            >
              Akela<span className="text-gradient">.</span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              I build modern, fast, and high-converting websites for businesses
              and personal brands.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-200"
                  data-ocid={`footer.social_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_link`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 group"
                    data-ocid={`footer.${link.label.toLowerCase()}_link`}
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 block h-px gradient-primary rounded" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@akelabhai.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  data-ocid="footer.email_link"
                >
                  <span className="w-8 h-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail size={14} />
                  </span>
                  contact@akelabhai.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+916352783691"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  data-ocid="footer.phone_link"
                >
                  <span className="w-8 h-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Phone size={14} />
                  </span>
                  +91 63527 83691
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <MapPin size={14} />
                </span>
                India · Remote Available
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} Akela Bhai. All rights reserved. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            aria-label="Back to top"
            data-ocid="footer.back_to_top_button"
          >
            Back to top
            <ArrowUp
              size={13}
              className="group-hover:-translate-y-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

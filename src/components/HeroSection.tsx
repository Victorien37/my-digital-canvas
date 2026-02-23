import { motion } from "framer-motion";
import { Github, Linkedin, Download, Mail, Phone, MapPin } from "lucide-react";
import profileImg from "@/assets/profile-placeholder.jpg";

const HeroSection = () => {
  return (
    <section id="presentation" className="section-padding pt-28 md:pt-36">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left Column - 30% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-[30%] flex flex-col items-center md:items-start gap-6"
          >
            <div className="relative group">
              <div className="w-44 h-44 rounded-2xl overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <img
                  src={profileImg}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs">✓</span>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-heading text-xl font-bold text-foreground">Jean Dupont</h2>
              <p className="text-primary font-medium text-sm mt-1">Développeur Web Full-Stack</p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <span>jean.dupont@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <span>+33 6 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>Paris, France</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="/cv.pdf"
                download
                className="p-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Télécharger CV"
              >
                <Download size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column - 70% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-[70%] flex flex-col justify-center"
          >
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-widest mb-3">
              Bienvenue sur mon portfolio
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Développeur Web{" "}
              <span className="gradient-text">Full-Stack</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Passionné par le développement web depuis plus de 5 ans, je conçois et développe
              des applications web modernes, performantes et accessibles. Spécialisé en React,
              TypeScript et Node.js, j'aime transformer des idées complexes en interfaces
              élégantes et intuitives.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Me contacter
              </a>
              <a
                href="#projets"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                Voir mes projets
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

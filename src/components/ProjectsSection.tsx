import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const ProjectsSection = () => {
  const { t } = useLanguage();
  const { data } = usePortfolio();

  return (
    <section id="projets" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-card card-shadow border border-border hover:card-shadow-hover hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  <ExternalLink size={14} />
                  {t.projects.viewProject}
                </a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={14} />
                    {t.projects.sourceCode}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./SectionTitle";
import CrtModal from "./CrtModal";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import type { SubProject } from "@/hooks/usePortfolioData";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const [showAll, setShowAll] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<SubProject | null>(null);

  const items = data.experiences;
  const visibleItems = showAll ? items : items.slice(0, 3);
  const selected = selectedIdx !== null ? items[selectedIdx] : null;

  return (
    <section id="experiences" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="relative mt-12 max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {visibleItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-16 md:pl-20 cursor-pointer"
                onClick={() => setSelectedIdx(i)}
              >
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

                <div className="p-5 rounded-xl bg-card card-shadow hover:card-shadow-hover transition-shadow duration-300 border border-border hover:border-primary/30">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.company}</h3>
                      <p className="text-primary text-sm font-medium">{item.role}</p>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {item.startYear} — {item.endYear}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.projects.map((project, j) => (
                      <button
                        key={j}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {items.length > 3 && !showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-accent transition-colors"
              >
                {t.experience.showMore}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Experience detail modal */}
      <CrtModal open={selected !== null} onClose={() => setSelectedIdx(null)}>
        {selected && (
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">{selected.company}</h3>
              <p className="text-primary font-medium mt-1">{selected.role}</p>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mt-2">
                {selected.startYear} — {selected.endYear}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{selected.description}</p>
            <div>
              <p className="text-xs font-medium text-foreground mb-2">{t.experience.projects}</p>
              <div className="flex flex-wrap gap-2">
                {selected.projects.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedIdx(null); setSelectedProject(p); }}
                    className="text-xs px-2.5 py-1 rounded-md bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CrtModal>

      {/* Sub-project detail modal */}
      <CrtModal open={selectedProject !== null} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">{selectedProject.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{selectedProject.description}</p>
            {selectedProject.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink size={14} />
                {t.projects.viewProject}
              </a>
            )}
          </div>
        )}
      </CrtModal>
    </section>
  );
};

export default ExperienceSection;

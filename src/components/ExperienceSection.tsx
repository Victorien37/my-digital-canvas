import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface TimelineItem {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  projects: string[];
}

const experiences: TimelineItem[] = [
  {
    company: "Tech Innovate",
    role: "Développeur Full-Stack Senior",
    startYear: "2022",
    endYear: "Présent",
    projects: ["Plateforme SaaS B2B", "Dashboard Analytics"],
  },
  {
    company: "Digital Agency",
    role: "Développeur Front-End",
    startYear: "2020",
    endYear: "2022",
    projects: ["E-commerce marketplace", "Application mobile hybride"],
  },
  {
    company: "StartupLab",
    role: "Développeur React",
    startYear: "2019",
    endYear: "2020",
    projects: ["MVP application de gestion"],
  },
  {
    company: "WebStudio",
    role: "Développeur Junior",
    startYear: "2018",
    endYear: "2019",
    projects: ["Sites vitrines", "Blog CMS"],
  },
];

const ExperienceSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experiences" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle title="Expériences" subtitle="Mon parcours professionnel" />

        <div className="relative mt-12 max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {visibleItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

                <div className="p-5 rounded-xl bg-card card-shadow hover:card-shadow-hover transition-shadow duration-300 border border-border">
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
                      <span
                        key={j}
                        className="text-xs px-2.5 py-1 rounded-md bg-accent text-accent-foreground"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {experiences.length > 3 && !showAll && (
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
                Voir plus
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

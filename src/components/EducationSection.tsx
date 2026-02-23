import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface EducationItem {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
  projects: string[];
}

const educationData: EducationItem[] = [
  {
    school: "Université Paris-Saclay",
    degree: "Master Informatique — Génie Logiciel",
    startYear: "2016",
    endYear: "2018",
    projects: ["Mémoire: Architecture microservices", "Projet IoT"],
  },
  {
    school: "Université Paris-Saclay",
    degree: "Licence Informatique",
    startYear: "2013",
    endYear: "2016",
    projects: ["Application de gestion de bibliothèque"],
  },
  {
    school: "Lycée Victor Hugo",
    degree: "Baccalauréat Scientifique",
    startYear: "2010",
    endYear: "2013",
    projects: ["Mention Très Bien"],
  },
  {
    school: "Formation en ligne",
    degree: "Certifications AWS & Docker",
    startYear: "2021",
    endYear: "2022",
    projects: ["AWS Solutions Architect", "Docker Certified Associate"],
  },
];

const EducationSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? educationData : educationData.slice(0, 3);

  return (
    <section id="formation" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle title="Formation" subtitle="Mon parcours académique" />

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
                className="relative pl-16 md:pl-20"
              >
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

                <div className="p-5 rounded-xl bg-card card-shadow hover:card-shadow-hover transition-shadow duration-300 border border-border">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{item.school}</h3>
                      <p className="text-primary text-sm font-medium">{item.degree}</p>
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

          {educationData.length > 3 && !showAll && (
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

export default EducationSection;

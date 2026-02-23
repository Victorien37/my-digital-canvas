import { motion } from "framer-motion";
import {
  Code2, Layout, Server, Database, Globe, Palette,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: <Code2 size={22} />,
    title: "Front-End",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: <Server size={22} />,
    title: "Back-End",
    skills: ["Node.js", "Express", "NestJS", "Python", "REST API"],
  },
  {
    icon: <Database size={22} />,
    title: "Base de données",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    icon: <Layout size={22} />,
    title: "Outils & DevOps",
    skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel"],
  },
];

const languages = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "Courant (C1)" },
  { name: "Espagnol", level: "Intermédiaire (B1)" },
];

const interests = ["Open Source", "UI/UX Design", "Veille technologique", "Photographie", "Randonnée"];

const SkillsSection = () => {
  return (
    <section id="competences" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle title="Compétences" subtitle="Mes domaines d'expertise" />

        <div className="mt-12 flex flex-col lg:flex-row gap-10">
          {/* Skills grid - left */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card card-shadow border border-border hover:card-shadow-hover transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent text-primary">{cat.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right sidebar - languages & interests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <div className="p-5 rounded-xl bg-card card-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent text-primary">
                  <Globe size={22} />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Langues</h3>
              </div>
              <div className="flex flex-col gap-3">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{lang.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card card-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent text-primary">
                  <Palette size={22} />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Centres d'intérêt</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

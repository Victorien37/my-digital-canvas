import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, Globe, Palette } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [<Code2 size={22} />, <Server size={22} />, <Database size={22} />, <Layout size={22} />];

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="competences" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="mt-12 flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.skills.categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card card-shadow border border-border hover:card-shadow-hover transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent text-primary">{icons[i]}</div>
                  <h3 className="font-heading font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            <div className="p-5 rounded-xl bg-card card-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent text-primary"><Globe size={22} /></div>
                <h3 className="font-heading font-semibold text-foreground">{t.skills.languages}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {t.skills.languagesList.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{lang.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card card-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent text-primary"><Palette size={22} /></div>
                <h3 className="font-heading font-semibold text-foreground">{t.skills.interests}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.skills.interestsList.map((interest, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
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

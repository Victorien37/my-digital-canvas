import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-card card-shadow border border-border">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.name}</label>
                  <input id="name" type="text" placeholder={t.contact.namePlaceholder} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.email}</label>
                  <input id="email" type="email" placeholder={t.contact.emailPlaceholder} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.message}</label>
                <textarea id="message" rows={4} placeholder={t.contact.messagePlaceholder} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                <Send size={16} />
                {t.contact.send}
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              {t.contact.directEmail}{" "}
              <a href="mailto:jean.dupont@email.com" className="text-primary hover:underline font-medium">jean.dupont@email.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

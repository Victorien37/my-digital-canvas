import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import SectionTitle from "./SectionTitle";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionTitle title="Restons en Contact" subtitle="N'hésitez pas à me contacter" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-card card-shadow border border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Votre message..."
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
                Envoyer
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Ou écrivez-moi directement à{" "}
              <a href="mailto:jean.dupont@email.com" className="text-primary hover:underline font-medium">
                jean.dupont@email.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

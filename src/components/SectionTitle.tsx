import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-2">{subtitle}</p>
      <div className="w-16 h-1 rounded-full bg-primary mx-auto mt-4" />
    </motion.div>
  );
};

export default SectionTitle;

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "TaskFlow",
    description: "Application de gestion de tâches avec drag & drop, notifications en temps réel et collaboration d'équipe.",
    link: "https://taskflow.app",
    github: "https://github.com",
    tags: ["React", "Node.js", "WebSocket"],
  },
  {
    title: "DevBlog",
    description: "Blog technique avec système de commentaires, recherche full-text et génération statique.",
    link: "https://devblog.dev",
    github: "https://github.com",
    tags: ["Next.js", "MDX", "PostgreSQL"],
  },
  {
    title: "WeatherViz",
    description: "Visualisation de données météorologiques avec graphiques interactifs et prédictions ML.",
    link: "https://weatherviz.io",
    tags: ["React", "D3.js", "Python"],
  },
  {
    title: "CodeSnippets",
    description: "Gestionnaire de snippets de code avec coloration syntaxique et partage en un clic.",
    link: "https://codesnippets.dev",
    github: "https://github.com",
    tags: ["TypeScript", "Tailwind", "Supabase"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projets" className="section-padding">
      <div className="container mx-auto">
        <SectionTitle title="Projets Personnels" subtitle="Ce que je construis en dehors du travail" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, i) => (
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
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <ExternalLink size={14} />
                  Voir le projet
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={14} />
                    Code source
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

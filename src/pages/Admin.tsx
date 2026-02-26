import { useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Trash2, Plus, Save, RotateCcw, ArrowLeft, GripVertical } from "lucide-react";
import type { ExperienceItem, EducationItem, SkillCategory, LanguageItem, ProjectItem, HeroData, SubProject } from "@/hooks/usePortfolioData";

type Tab = "hero" | "experiences" | "education" | "skills" | "projects";

const tabLabels: Record<Tab, Record<string, string>> = {
  hero: { fr: "Présentation", en: "About", pt: "Apresentação" },
  experiences: { fr: "Expériences", en: "Experiences", pt: "Experiências" },
  education: { fr: "Formation", en: "Education", pt: "Formação" },
  skills: { fr: "Compétences", en: "Skills", pt: "Competências" },
  projects: { fr: "Projets", en: "Projects", pt: "Projetos" },
};

const Admin = () => {
  const { data, updateData, resetData } = usePortfolio();
  const { locale } = useLanguage();
  const [tab, setTab] = useState<Tab>("hero");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              <ArrowLeft size={18} />
            </a>
            <h1 className="font-heading font-bold text-foreground text-lg">Administration</h1>
          </div>
          <button
            onClick={resetData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {(Object.keys(tabLabels) as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {tabLabels[t][locale] || tabLabels[t].en}
            </button>
          ))}
        </div>

        {tab === "hero" && <HeroEditor data={data.hero} onChange={hero => updateData(d => ({ ...d, hero }))} />}
        {tab === "experiences" && <ExperienceEditor items={data.experiences} onChange={experiences => updateData(d => ({ ...d, experiences }))} />}
        {tab === "education" && <EducationEditor items={data.education} onChange={education => updateData(d => ({ ...d, education }))} />}
        {tab === "skills" && (
          <SkillsEditor
            categories={data.skillCategories}
            languages={data.languagesList}
            interests={data.interestsList}
            onChangeCategories={skillCategories => updateData(d => ({ ...d, skillCategories }))}
            onChangeLanguages={languagesList => updateData(d => ({ ...d, languagesList }))}
            onChangeInterests={interestsList => updateData(d => ({ ...d, interestsList }))}
          />
        )}
        {tab === "projects" && <ProjectsEditor items={data.projects} onChange={projects => updateData(d => ({ ...d, projects }))} />}
      </div>
    </div>
  );
};

// --- Field helpers ---
const Field = ({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    {textarea ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
    ) : (
      <input value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
    )}
  </div>
);

const TagsInput = ({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) => {
  const [input, setInput] = useState("");
  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
            {tag}
            <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="hover:text-destructive">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())} placeholder="Ajouter..." className="flex-1 px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <button onClick={add} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">+</button>
      </div>
    </div>
  );
};

const SubProjectsEditor = ({ label, value, onChange }: { label: string; value: SubProject[]; onChange: (v: SubProject[]) => void }) => {
  const update = (i: number, key: keyof SubProject, val: string) => {
    const next = [...value];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const add = () => onChange([...value, { name: "", description: "", link: "" }]);
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="space-y-3">
        {value.map((p, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border space-y-2 relative group">
            <button onClick={() => remove(i)} className="absolute top-2 right-2 p-1 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={12} />
            </button>
            <input value={p.name} onChange={e => update(i, "name", e.target.value)} placeholder="Nom du projet" className="w-full px-2.5 py-1.5 rounded-md bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <textarea value={p.description} onChange={e => update(i, "description", e.target.value)} placeholder="Description..." rows={2} className="w-full px-2.5 py-1.5 rounded-md bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <input value={p.link} onChange={e => update(i, "link", e.target.value)} placeholder="Lien (optionnel)" className="w-full px-2.5 py-1.5 rounded-md bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-1 px-3 py-1.5 rounded-lg border border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-primary text-xs font-medium flex items-center gap-1.5 transition-colors w-fit">
        <Plus size={12} /> Ajouter un projet
      </button>
    </div>
  );
};

const Card = ({ children, onDelete }: { children: React.ReactNode; onDelete?: () => void }) => (
  <div className="p-5 rounded-xl bg-card border border-border relative group">
    {onDelete && (
      <button onClick={onDelete} className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100">
        <Trash2 size={16} />
      </button>
    )}
    {children}
  </div>
);

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button onClick={onClick} className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-primary text-sm font-medium flex items-center justify-center gap-2 transition-colors">
    <Plus size={16} /> {label}
  </button>
);

// --- Section Editors ---

const HeroEditor = ({ data, onChange }: { data: HeroData; onChange: (d: HeroData) => void }) => {
  const set = (key: keyof HeroData, val: string) => onChange({ ...data, [key]: val });
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nom" value={data.name} onChange={v => set("name", v)} />
        <Field label="Rôle" value={data.role} onChange={v => set("role", v)} />
      </div>
      <Field label="Description" value={data.description} onChange={v => set("description", v)} textarea />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Email" value={data.email} onChange={v => set("email", v)} />
        <Field label="Téléphone" value={data.phone} onChange={v => set("phone", v)} />
        <Field label="Localisation" value={data.location} onChange={v => set("location", v)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="LinkedIn URL" value={data.linkedin} onChange={v => set("linkedin", v)} />
        <Field label="GitHub URL" value={data.github} onChange={v => set("github", v)} />
      </div>
    </div>
  );
};

const ExperienceEditor = ({ items, onChange }: { items: ExperienceItem[]; onChange: (items: ExperienceItem[]) => void }) => {
  const update = (i: number, key: keyof ExperienceItem, val: any) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const add = () => onChange([...items, { company: "", role: "", startYear: "", endYear: "", projects: [], description: "" }]);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {items.map((item, i) => (
        <Card key={i} onDelete={() => remove(i)}>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Entreprise" value={item.company} onChange={v => update(i, "company", v)} />
              <Field label="Poste" value={item.role} onChange={v => update(i, "role", v)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Début" value={item.startYear} onChange={v => update(i, "startYear", v)} />
              <Field label="Fin" value={item.endYear} onChange={v => update(i, "endYear", v)} />
            </div>
            <Field label="Description" value={item.description} onChange={v => update(i, "description", v)} textarea />
            <SubProjectsEditor label="Projets" value={item.projects} onChange={v => update(i, "projects", v)} />
          </div>
        </Card>
      ))}
      <AddButton onClick={add} label="Ajouter une expérience" />
    </div>
  );
};

const EducationEditor = ({ items, onChange }: { items: EducationItem[]; onChange: (items: EducationItem[]) => void }) => {
  const update = (i: number, key: keyof EducationItem, val: any) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const add = () => onChange([...items, { school: "", degree: "", startYear: "", endYear: "", projects: [], description: "" }]);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {items.map((item, i) => (
        <Card key={i} onDelete={() => remove(i)}>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="École" value={item.school} onChange={v => update(i, "school", v)} />
              <Field label="Diplôme" value={item.degree} onChange={v => update(i, "degree", v)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Début" value={item.startYear} onChange={v => update(i, "startYear", v)} />
              <Field label="Fin" value={item.endYear} onChange={v => update(i, "endYear", v)} />
            </div>
            <Field label="Description" value={item.description} onChange={v => update(i, "description", v)} textarea />
            <SubProjectsEditor label="Projets" value={item.projects} onChange={v => update(i, "projects", v)} />
          </div>
        </Card>
      ))}
      <AddButton onClick={add} label="Ajouter une formation" />
    </div>
  );
};

const SkillsEditor = ({
  categories, languages, interests,
  onChangeCategories, onChangeLanguages, onChangeInterests,
}: {
  categories: SkillCategory[]; languages: LanguageItem[]; interests: string[];
  onChangeCategories: (c: SkillCategory[]) => void;
  onChangeLanguages: (l: LanguageItem[]) => void;
  onChangeInterests: (i: string[]) => void;
}) => {
  const updateCat = (i: number, key: keyof SkillCategory, val: any) => {
    const next = [...categories];
    next[i] = { ...next[i], [key]: val };
    onChangeCategories(next);
  };
  const addCat = () => onChangeCategories([...categories, { title: "", skills: [] }]);
  const removeCat = (i: number) => onChangeCategories(categories.filter((_, j) => j !== i));

  const updateLang = (i: number, key: keyof LanguageItem, val: string) => {
    const next = [...languages];
    next[i] = { ...next[i], [key]: val };
    onChangeLanguages(next);
  };
  const addLang = () => onChangeLanguages([...languages, { name: "", level: "" }]);
  const removeLang = (i: number) => onChangeLanguages(languages.filter((_, j) => j !== i));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="font-heading font-semibold text-foreground mb-4">Catégories de compétences</h2>
        <div className="space-y-4">
          {categories.map((cat, i) => (
            <Card key={i} onDelete={() => removeCat(i)}>
              <div className="space-y-3">
                <Field label="Titre" value={cat.title} onChange={v => updateCat(i, "title", v)} />
                <TagsInput label="Compétences" value={cat.skills} onChange={v => updateCat(i, "skills", v)} />
              </div>
            </Card>
          ))}
          <AddButton onClick={addCat} label="Ajouter une catégorie" />
        </div>
      </div>

      <div>
        <h2 className="font-heading font-semibold text-foreground mb-4">Langues</h2>
        <div className="space-y-3">
          {languages.map((lang, i) => (
            <Card key={i} onDelete={() => removeLang(i)}>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Langue" value={lang.name} onChange={v => updateLang(i, "name", v)} />
                <Field label="Niveau" value={lang.level} onChange={v => updateLang(i, "level", v)} />
              </div>
            </Card>
          ))}
          <AddButton onClick={addLang} label="Ajouter une langue" />
        </div>
      </div>

      <div>
        <h2 className="font-heading font-semibold text-foreground mb-4">Centres d'intérêt</h2>
        <TagsInput label="" value={interests} onChange={onChangeInterests} />
      </div>
    </div>
  );
};

const ProjectsEditor = ({ items, onChange }: { items: ProjectItem[]; onChange: (items: ProjectItem[]) => void }) => {
  const update = (i: number, key: keyof ProjectItem, val: any) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const add = () => onChange([...items, { title: "", description: "", link: "", github: "", tags: [] }]);
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {items.map((item, i) => (
        <Card key={i} onDelete={() => remove(i)}>
          <div className="space-y-3">
            <Field label="Titre" value={item.title} onChange={v => update(i, "title", v)} />
            <Field label="Description" value={item.description} onChange={v => update(i, "description", v)} textarea />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Lien" value={item.link} onChange={v => update(i, "link", v)} />
              <Field label="GitHub (optionnel)" value={item.github || ""} onChange={v => update(i, "github", v)} />
            </div>
            <TagsInput label="Tags" value={item.tags} onChange={v => update(i, "tags", v)} />
          </div>
        </Card>
      ))}
      <AddButton onClick={add} label="Ajouter un projet" />
    </div>
  );
};

export default Admin;

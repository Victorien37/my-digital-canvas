import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/LanguageContext";

// Types for portfolio data
export interface SubProject {
  name: string;
  description: string;
  link: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  projects: SubProject[];
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
  projects: SubProject[];
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  link: string;
  github?: string;
  tags: string[];
}

export interface HeroData {
  name: string;
  role: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  hero: HeroData;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  languagesList: LanguageItem[];
  interestsList: string[];
  projects: ProjectItem[];
}

const STORAGE_KEY = "portfolio_data";

function getStoredData(locale: Locale): Partial<PortfolioData> | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${locale}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredData(locale: Locale, data: PortfolioData) {
  localStorage.setItem(`${STORAGE_KEY}_${locale}`, JSON.stringify(data));
}

export function usePortfolioData() {
  const { t, locale } = useLanguage();

  const getDefaults = useCallback((): PortfolioData => ({
    hero: {
      name: t.hero.name,
      role: t.hero.role,
      description: t.hero.description,
      email: "jean.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      location: "Paris, France",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    experiences: t.experience.items.map(i => ({ ...i, projects: [...i.projects] })) as ExperienceItem[],
    education: t.education.items.map(i => ({ ...i, projects: [...i.projects] })) as EducationItem[],
    skillCategories: t.skills.categories.map(c => ({ ...c, skills: [...c.skills] })) as SkillCategory[],
    languagesList: t.skills.languagesList.map(l => ({ ...l })) as LanguageItem[],
    interestsList: [...t.skills.interestsList] as string[],
    projects: t.projects.items.map(p => ({ ...p, tags: [...p.tags] })) as ProjectItem[],
  }), [t]);

  const [data, setData] = useState<PortfolioData>(() => {
    const stored = getStoredData(locale);
    return stored ? { ...getDefaults(), ...stored } : getDefaults();
  });

  useEffect(() => {
    const stored = getStoredData(locale);
    setData(stored ? { ...getDefaults(), ...stored } : getDefaults());
  }, [locale, getDefaults]);

  const updateData = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const next = updater(prev);
      setStoredData(locale, next);
      return next;
    });
  }, [locale]);

  const resetData = useCallback(() => {
    localStorage.removeItem(`${STORAGE_KEY}_${locale}`);
    setData(getDefaults());
  }, [locale, getDefaults]);

  return { data, updateData, resetData };
}

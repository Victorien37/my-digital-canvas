import { Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Jean Dupont — {t.footer.madeWith}
          <Heart size={14} className="text-primary" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;

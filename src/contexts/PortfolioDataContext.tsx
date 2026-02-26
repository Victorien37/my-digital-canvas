import { createContext, useContext, type ReactNode } from "react";
import { usePortfolioData, type PortfolioData } from "@/hooks/usePortfolioData";

interface PortfolioDataContextType {
  data: PortfolioData;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  resetData: () => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const value = usePortfolioData();
  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioDataProvider");
  return ctx;
};

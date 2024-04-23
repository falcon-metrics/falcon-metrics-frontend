import React, { createContext, useContext, useMemo, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  activeAccordions: string[];
  setActiveAccordions: (value: any) => void;
  toggleAccordion: (value: any, open: boolean) => void;
};

const defaultContextValue: ContextType = {
  activeAccordions: [],
  setActiveAccordions: (value: any) => {
    return value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleAccordion: (value: any, open: boolean) => {
    return value;
  },
};

export const AccordionKeys = {
  RoadmapKey: "portfolio-roadmap",
  PortfolioAnalysisKey: "portfolio-analysis",
  PortfolioBoardKey: "portfolio-board",
};

const BaseAccordionContext = createContext(defaultContextValue);

export const useBaseAccordionContext = () => {
  return useContext(BaseAccordionContext);
};

export const BaseAccordionProvider = ({ children }: Props) => {
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);

  const toggleAccordion = (accordionId: string, open: boolean) => {
    if (!open) {
      setActiveAccordions(activeAccordions.filter((id) => id !== accordionId));
    } else {
      const updatedArray = [...activeAccordions, accordionId];
      setActiveAccordions(updatedArray);
    }
  };

  const contextValue: ContextType = useMemo(() => {
    return { activeAccordions, setActiveAccordions, toggleAccordion };
  }, [activeAccordions, setActiveAccordions, toggleAccordion]);

  return (
    <BaseAccordionContext.Provider value={contextValue}>
      {children}
    </BaseAccordionContext.Provider>
  );
};

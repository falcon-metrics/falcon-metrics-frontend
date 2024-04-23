import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ObeyaRoom } from 'core/api/ApiClient/ObeyaGoalsClient';
import { useInitiatives } from "views/LeanPortfolio/hooks/useInitiatives";
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { usePortfolioAnalysis } from "views/LeanPortfolio/hooks/usePortfolioAnalysis";
import useDashboardContexts from 'views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts';
import { PortfolioAnalysisData } from '../interfaces/PortfolioAnalysis';
import { Context } from 'views/Dashboard/views/AnalyticsDashboard/interfaces/Context';
import { PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY, useDateRangeContext } from './DateRangeContext';

type Props = {
    children: React.ReactNode;
}

type ContextType = {
    contextId: string | undefined;
    obeyaRoomData: ObeyaRoom[];
    portfolioAnalysisData: PortfolioAnalysisData | undefined;
    contexts: Context[] | undefined;
    selectedContexts: string[];
    childContexts: any[];
    showChildren: boolean;
    setSelectedContexts: (contexts: string[]) => void;
    setChildContexts: (contexts: any[]) => void;
    setShowChildren: (show: boolean) => void;
    repopulatePortfolioAnalysis: any;
    isPortfolioAnalysisLoading: boolean;
};

const defaultContextValue: ContextType = {
    contextId: "",
    obeyaRoomData: [],
    portfolioAnalysisData: undefined,
    contexts: [],
    selectedContexts: [],
    childContexts: [],
    showChildren: false,
    setSelectedContexts: (contexts: string[]) => { return contexts; },
    setChildContexts: (contexts: any[]) => { return contexts; },
    setShowChildren: (show: boolean) => { return show; },
    repopulatePortfolioAnalysis: () => { return false; },
    isPortfolioAnalysisLoading: false

};

const PortfolioBoardPageContext = createContext(defaultContextValue);

const PortfolioBoardPageContextProvider = ({ children }: Props) => {
    const {
        otherApiQueryParameters: { contextId },
    } = useFilterPanelContext();

    const { appliedDateRange } = useDateRangeContext();

    const { obeyaRoomData } = useInitiatives();

    const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
    const [childContexts, setChildContexts] = useState<any[]>([]);
    const [showChildren, setShowChildren] = useState(false);

    // Retrieve the stored date range from localStorage
    const storedDateRange = localStorage.getItem(PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY);
    const initialDateRange = storedDateRange ? JSON.parse(storedDateRange) : [appliedDateRange[0].toISOString(), appliedDateRange[1].toISOString()];

    const params = {
        contextId,
        filterStartDate: initialDateRange[0],
        filterEndDate: initialDateRange[1],
        includeChildren: showChildren
    }

    const { data: portfolioAnalysisData, repopulatePortfolioAnalysis, isLoading: isPortfolioAnalysisLoading } = usePortfolioAnalysis({ params });
    const { contexts } = useDashboardContexts();
    const contextValue: ContextType = useMemo(() => {
        return {
            contextId,
            obeyaRoomData,
            portfolioAnalysisData,
            contexts,
            selectedContexts,
            childContexts,
            showChildren,
            setSelectedContexts,
            setChildContexts,
            setShowChildren,
            repopulatePortfolioAnalysis,
            isPortfolioAnalysisLoading
        }
    }, [contextId,
        obeyaRoomData,
        portfolioAnalysisData,
        contexts,
        selectedContexts,
        childContexts,
        showChildren,
        setSelectedContexts,
        setChildContexts,
        setShowChildren,
        repopulatePortfolioAnalysis,
        isPortfolioAnalysisLoading]);

    useEffect(() => {
        let selectedKeys: string[] = [];

        for (const context0 of contexts ?? []) {
            if (context0.id === contextId && context0.displayName === "All") {
                selectedKeys = ["", "", ""];
                break;
            }

            if (context0.id === contextId && context0.displayName !== "All") {
                selectedKeys = [context0.id, "", ""];
                setChildContexts(
                    context0.children?.flatMap((level1) => [
                        level1.id,
                        ...(level1.children?.map((level2) => level2.id) ?? []),
                    ]) ?? []
                );
                break;
            }

            for (const context1 of context0.children ?? []) {
                if (context1.id === contextId) {
                    selectedKeys = [context0.id, context1.id, ""];
                    setChildContexts(context1.children?.map((item) => item.id) ?? []);
                    break;
                }

                for (const context2 of context1.children ?? []) {
                    if (context2.id === contextId) {
                        selectedKeys = [context0.id, context1.id, context2.id];
                        break;
                    }
                }

                if (selectedKeys.length > 0) {
                    break;
                }
            }

            if (selectedKeys.length > 0) {
                break;
            }
        }

        setSelectedContexts(selectedKeys);
    }, [contextId, contexts]);

    return (
        <PortfolioBoardPageContext.Provider value={contextValue}>
            {children}
        </PortfolioBoardPageContext.Provider>
    );
};

const usePortfolioBoardPageContext = () => {
    const context = useContext(PortfolioBoardPageContext);
    if (!context) {
        throw new Error(
            'usePortfolioBoardPageContext must be used within a PortfolioBoardPageContextProvider'
        );
    }
    return context;
};

export { PortfolioBoardPageContextProvider, usePortfolioBoardPageContext };

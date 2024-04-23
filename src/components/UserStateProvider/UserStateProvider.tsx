import { makeAutoObservable } from "mobx";
import { computedFn } from "mobx-utils";
import { createContext, useState } from "react";
import { BaseRoutes } from "utils/routes";


type AccordionState = { isOpen: boolean; selectedTab?: string; };
class UserStateStore {
    private _contextSelectedKeys: string[];
    private _topNavTab: string | undefined;
    private _leftNavTab: string | undefined;
    private accordionStates: Map<string, AccordionState>;
    private _contextId: string;
    constructor() {
        makeAutoObservable(this);
        this.accordionStates = new Map<string, AccordionState>();
        this._contextSelectedKeys = [];
        this._topNavTab = undefined;
        this._contextId = '';
    }

    get contextSelectedKeys() {
        return this._contextSelectedKeys;
    }
    set contextSelectedKeys(contextSelectedKeys: string[]) {
        this._contextSelectedKeys = contextSelectedKeys;
    }

    get topNavTab() {
        return this._topNavTab;
    }

    set topNavTab(tab) {
        this._topNavTab = tab;
    }

    get leftNavTab() {
        return this._leftNavTab;
    }

    set leftNavTab(tab) {
        this._leftNavTab = tab;
    }

    get contextId() {
        return this._contextId;
    }

    set contextId(contextId) {
        this._contextId = contextId;
    }

    isOpen = computedFn((name: string) => {
        return (this.accordionStates.get(name)?.isOpen);
    });

    getSelectedTab = computedFn((name: string) => {
        return this.accordionStates.get(name)?.selectedTab;
    });

    setIsOpen(name: string, isOpen: boolean) {
        if (!this.accordionStates.has(name)) {
            this.accordionStates.set(name, { isOpen });
        }
        const value = this.accordionStates.get(name);
        if (value) {
            value.isOpen = isOpen;
        }
    }
    setSelectedTab(name: string, selectedTab: string) {
        if (!this.accordionStates.has(name)) {
            this.accordionStates.set(name, { isOpen: true, selectedTab });
        }

        const value = this.accordionStates.get(name);
        if (value) {
            value.selectedTab = selectedTab;
        }
    }
}

const store = new UserStateStore();

// Might be better to use a factory to create these contexts instead of creating them separately
/**
 * Context to store the last state of the accordions
 * 
 * It is initially empty. The title of the accordion is used as the key
 */

const defaultAccordionsContextValue = store;


export const AccordionsContext = createContext(defaultAccordionsContextValue);


const defaultSelectedContextIdContextValue: {
    contextId: string;
    setContextId: (contextId: string) => void;
    contextSelectedKeys: string[],
    setSelectedKeys: (contextSelectedKeys: string[]) => void;
} = {
    contextId: '',
    contextSelectedKeys: [],
    setSelectedKeys: (_contextSelectedKeys: string[]) => { /* Do nothing */ },
    setContextId: (_contextId) => { /* Do nothing */ }
};
export const SelectedContextIdContext = createContext(defaultSelectedContextIdContextValue);
const defaultSelectedTabContextValue: {
    tab: string | undefined;
    setTab: (tab: string) => void;
} = {
    tab: undefined,
    setTab: (_tab) => { /* Do nothing */ }
};
export const SelectedTabContext = createContext(defaultSelectedTabContextValue);


const defaultSelectedLeftNavValue: {
    tab: BaseRoutes | undefined;
    setTab: (tab: BaseRoutes) => void;
} = {
    tab: BaseRoutes.AnalyticsDashboard,
    setTab: (_tab) => { /* Do nothing */ }
};
export const SelectedLeftNavContext = createContext(defaultSelectedLeftNavValue);


const defaultSelectedTabInAccordionContextValue: {
    selectedTab: Partial<Record<string, any>>;
    setSelectedTab: (key: string, value: any) => void;
} = {
    selectedTab: {},
    setSelectedTab: (_key, _value) => { /* Do nothing */ }
};
export const SelectedTabInAccordionContext = createContext(defaultSelectedTabInAccordionContextValue);

/**
 * This is a wrapper around the App component to keep track
 * of the user state when moving across different screens
 * of the app.
 * 
 * When you switch between the dashboard, wizard, settings, 
 * goverance obeya, the the selected context and the state of the 
 * accordions (open or close) should be saved 
 * 
 */
export const UserStateProviderWrapper = (component: () => JSX.Element) => {
    // The current implementation uses an empty string for initial state in the 
    // ContextNavigation.data component. Therefore, using the same here
    const [context, setContext] = useState<string>('');
    const [contextSelectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [tab, setTab] = useState<string | undefined>(undefined);
    const [leftNavTab, setLeftNavTab] = useState<BaseRoutes | undefined>(undefined);
    const [selectedTabInAccordion, setSelectedTabInAccordion] = useState({});

    return (
        <AccordionsContext.Provider value={store}>
            <SelectedContextIdContext.Provider value={{
                contextId: context,
                setContextId: (contextId: string) => setContext(contextId),

                contextSelectedKeys,
                setSelectedKeys: (selectedKeys: string[]) => setSelectedKeys(selectedKeys),
            }}>
                <SelectedTabContext.Provider value={{
                    tab,
                    setTab: (tab: string) => setTab(tab)
                }}>
                    <SelectedLeftNavContext.Provider value={{
                        setTab: (route) => setLeftNavTab(route),
                        tab: leftNavTab
                    }}>
                        <SelectedTabInAccordionContext.Provider value={{
                            selectedTab: selectedTabInAccordion,
                            setSelectedTab: (key, value) => {
                                setSelectedTabInAccordion({
                                    ...selectedTabInAccordion,
                                    [key]: value
                                });
                            }
                        }}>
                            {component()}
                        </SelectedTabInAccordionContext.Provider>
                    </SelectedLeftNavContext.Provider>
                </SelectedTabContext.Provider>
            </SelectedContextIdContext.Provider>
        </AccordionsContext.Provider >
    );
};
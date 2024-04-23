import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";

export const findContextAndParentDisplayNamesById = (id: string, contexts: Context[]) => {
    for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i];
        const result = findContextAndParentDisplaynamesRecursively(id, context);

        if (result) {
            return result;
        }
    }

    return null; // Context not found in any entity
};

const findContextAndParentDisplaynamesRecursively = (id: string, context: Context, parentNames: string[] = []) => {
    if (context.id === id) {
        return [context.displayName, ...parentNames]; // Found the matching context, return the result
    }

    if (context.children) {
        for (let i = 0; i < context.children.length; i++) {
            const child = context.children[i];
            const result = findContextAndParentDisplaynamesRecursively(id, child, [context.displayName, ...parentNames]);

            if (result) {
                return result; // Context found, return the result
            }
        }
    }

    return null; // Context not found in this context or its children
};

export const findContextById = (id: string, contexts: Context[]) => {
    for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i];
        const result = findContextRecursively(id, context);

        if (result) {
            return result;
        }
    }

    return null; // Context not found in any entity
};

const findContextRecursively = (id: string, context: Context) => {
    if (context.id === id) {
        return context; // Found the matching context, return the result
    }

    if (context.children) {
        for (let i = 0; i < context.children.length; i++) {
            const child = context.children[i];
            const result = findContextRecursively(id, child);

            if (result) {
                return result; // Context found, return the result
            }
        }
    }
    return null; // Context not found in this context or its children
};

export const getAllContextIdsUnderContext = (context: Context, parentIds: string[] = []) => {
    let result = [...parentIds, context.id];
    if (context.children) {
        for (let i = 0; i < context.children.length; i++) {
            const child = context.children[i];
            result = [...result, ...getAllContextIdsUnderContext(child, result)];
        }
    }
    return result;
};

export const findContextAndParentIds = (id: string, contexts: Context[]) => {
    for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i];
        const result = findContextAndParentIdsRecursively(id, context);

        if (result) {
            return result;
        }
    }

    return null; // Context not found in any entity
};

const findContextAndParentIdsRecursively = (id: string, context: Context, parentNames: string[] = []) => {
    if (context.id === id) {
        return [context.id, ...parentNames]; // Found the matching context, return the result
    }

    if (context.children) {
        for (let i = 0; i < context.children.length; i++) {
            const child = context.children[i];
            const result = findContextAndParentIdsRecursively(id, child, [context.id, ...parentNames]);

            if (result) {
                return result; // Context found, return the result
            }
        }
    }

    return null; // Context not found in this context or its children
};

export const metricTypes = [
    {
        id: 'fitness-criteria',
        displayName: 'Fitness Criteria (KPIs) with a Threshold'
    },
    {
        id: 'health-indicator',
        displayName: 'Health Indicator with a Healthy Range'
    },
    {
        id: 'improvement-driver',
        displayName: 'Improvement Driver with a Target'
    },
    {
        id: 'vanity-metric',
        displayName: 'Vanity metric'
    }
];
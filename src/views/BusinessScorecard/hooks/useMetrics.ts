import fetch from 'core/api/fetch';
import useSWR, { KeyedMutator } from 'swr';
import { MetricsEntry } from '../interfaces/interfaces';

export const defaultResource = '/business_scorecard/metrics';

const fetchMetrics = (url: string) => {
    return fetch.get(`${url}`);
};

export const updateMetrics = (data: MetricsEntry[], currentData: MetricsEntry[]) => {
    const requestBody: any = {
        addElements: [],
        updateElements: [],
        deleteElements: []
    };
    data.forEach(metric => {
        const matchingElement = currentData.find(i => i.id === metric.id);
        if (!matchingElement) {
            requestBody.addElements.push(metric);
        } else if (JSON.stringify(matchingElement) !== JSON.stringify(metric)) {
            requestBody.updateElements.push(metric);
        }
    });
    currentData.forEach(metric => {
        if (!data.find(i => i.id === metric.id)) {
            requestBody.deleteElements.push(metric);
        }
    });
    return fetch.patch(defaultResource, requestBody);
};

type MetricsResponse = {
    data: MetricsEntry[];
};

export function useMetrics(
    resource = defaultResource,
): {
    data: MetricsEntry[] | undefined;
    isValidating: boolean;
    isLoadingMetrics: boolean;
    updateMetrics: (data: MetricsEntry[], currentData: MetricsEntry[]) => Promise<any>;
    mutate: KeyedMutator<MetricsResponse>;
} {
    const { data, isValidating, mutate } = useSWR<MetricsResponse>(
        resource,
        fetchMetrics,
        { revalidateOnFocus: false },
    );

    let response: MetricsEntry[] | undefined = [];

    if (data?.data && data?.data?.length > 0) {
        response = data?.data;
    }

    return {
        data: response,
        isValidating,
        mutate,
        isLoadingMetrics: !data?.data,
        updateMetrics,
    };
}

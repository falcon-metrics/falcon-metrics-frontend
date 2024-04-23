import fetch, { useCustomSWR } from "core/api/fetch";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";
import { WorkItemTypeMapData } from "../views/BottleneckFinder/interfaces";

const bottleneckFinderFetcher = async (uri: string) => {
    return fetch.get<WorkItemTypeMapData[]>(uri);
};
export function useBottleneckFinderData(
    disabled = false
) {
    const { queryParamsString } = useFilterPanelContext();
    const endpoint = '/value-stream-management/continuous-improvements/bottleneck-finder';
    const url = `${endpoint}?${queryParamsString}`;

    const { data: response, error: swrError, isValidating, mutate } = useCustomSWR<any>(
        disabled ? null : url,
        bottleneckFinderFetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    let errorMessage: string | null = null;
    if (response && typeof ((response as any).message) === 'string') {
        errorMessage = ((response as any).message);
    } else if (response && response.data && (response.data as any).errorMessage) {
        errorMessage = ((response.data as any).errorMessage);
    } else if (response && response.data && (response.data as any).message) {
        errorMessage = ((response.data as any).message);
    } else if (response && (response as any).errorMessage) {
        errorMessage = (response as any).errorMessage;
    }

    let error: Error | undefined;
    if (errorMessage) {
        error = new Error(errorMessage);
    } else if (swrError) {
        error = ((typeof swrError === 'object' && swrError instanceof Error) ? swrError : new Error("Data Fetch Error: " + JSON.stringify(swrError)));
    }

    const isEmptyData = response && !errorMessage && !swrError && typeof response.data === 'object' && Object.keys(response.data).length === 0;

    return {
        data: response && !errorMessage ? response.data : null,
        error,
        isLoading: isValidating,
        update: mutate,
        isEmptyData,
    };
}
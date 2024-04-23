import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { Perspective } from '../interfaces/interfaces';

export const defaultResource = '/business_scorecard/perspectives';

const fetchPerspectives = (url: string) => {
    return fetch.get(`${url}`);
};

export const updatePerspectives = (data: Perspective[], currentData: Perspective[]) => {

    const requestBody: any = {
        addElements: [],
        updateElements: [],
        deleteElements: []
    };
    data.forEach(perspective => {
        const matchingElement = currentData.find(i => i.id === perspective.id);
        if (!matchingElement) {
            requestBody.addElements.push(perspective);
        } else if (JSON.stringify(matchingElement) !== JSON.stringify(perspective)) {
            requestBody.updateElements.push(perspective);
        }
    });
    currentData.forEach(perspective => {
        if (!data.find(i => i.id === perspective.id)) {
            requestBody.deleteElements.push(perspective);
        }
    });
    return fetch.patch(defaultResource, requestBody);
};

export function usePerspectives(
    resource = defaultResource,
): {
    data: any | undefined;
    isValidating: boolean;
    isLoadingPerspectives: boolean;
    updatePerspectives: (data: Perspective[], currentData: Perspective[]) => Promise<any>;
    mutate: any;
} {
    const { data, isValidating, mutate } = useSWR(
        resource,
        fetchPerspectives,
        { revalidateOnFocus: false },
    );

    let response: Perspective[] | undefined = [];

    if (data?.data && data?.data?.length > 0) {
        response = data?.data;
    }

    return {
        data: response,
        isValidating,
        mutate,
        isLoadingPerspectives: !data?.data,
        updatePerspectives,
    };
}


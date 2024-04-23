import fetch from 'core/api/fetch';
import useSWR, { KeyedMutator } from 'swr';
import { RelationshipEntity } from '../interfaces/interfaces';
import _ from 'lodash';

export const defaultResource = '/relationships';

const fetchRelationships = (url: string, entityType: string, entityId: string) => {
    return fetch.get(`${defaultResource}`, {
        params: {
            entityId,
            entityType
        }
    });
};

export const updateRelationships = (data: RelationshipEntity[], currentData: RelationshipEntity[]) => {
    const currentIds = currentData.map(i => i.id);
    data.forEach(relationship => {
        if (!currentIds.includes(relationship.id)) {
            const requestBody = _.cloneDeep(relationship);
            requestBody.fromName = undefined;
            requestBody.toName = undefined;
            fetch.post(defaultResource, requestBody);
        }
    });
    const newIds = data.map(i => i.id);
    currentData.forEach(relationship => {
        if (!newIds.includes(relationship.id)) {
            fetch.delete(defaultResource, {
                params: {
                    relationshipId: relationship.id
                }
            });
        }
    });
};

type RelationshipsResponse = {
    data: RelationshipEntity[];
};

export function useRelationships(
    entityType: string,
    entityId: string,
    resource = defaultResource,
): {
    data: RelationshipEntity[] | undefined;
    isValidating: boolean;
    isLoadingRelationships: boolean;
    updateRelationships: (data: RelationshipEntity[], currentData: RelationshipEntity[]) => void;
    mutate: KeyedMutator<RelationshipsResponse>;
} {
    const { data, isValidating, mutate } = useSWR<RelationshipsResponse>(
        resource + "/" + entityId + "/" + entityType,
        url => fetchRelationships(url, entityType, entityId),
        { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false }
    );


    let response: RelationshipEntity[] | undefined = [];

    if (data?.data && data?.data?.length > 0) {
        response = data?.data;
    }

    return {
        data: response,
        isValidating,
        mutate,
        isLoadingRelationships: !data?.data,
        updateRelationships,
    };
}

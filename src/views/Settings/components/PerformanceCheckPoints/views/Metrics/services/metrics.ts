import fetch from 'core/api/fetch';

export const postMetrics = (resource: string, data) => {
    return fetch.post(resource, data);
};

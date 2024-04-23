import fetch from 'core/api/fetch';

const resource = '/obeya/predictive-analysis';
const getRequest = (url: string) => fetch.get(`${url}`);
export function usePredctiveAnalysis(obeyaRoomId) {
    const getPredictiveAnalysis = async () => {
    const response = await getRequest(`${resource}?obeyaRoomId=${obeyaRoomId}`);
    if(response.data) return response.data;
    if(response.status !== 200 && response.status !== 201) throw Error(response.statusText )
    }
    return {
        getPredictiveAnalysis
    }

}
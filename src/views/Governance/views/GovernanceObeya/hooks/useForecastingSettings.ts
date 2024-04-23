import { SettingsData, SettingsDataRequest } from "../views/GovernanceObeyaHome/views/PredictiveAnalysis/types";
const resource = '/obeya/predictive-analysis/settings';
import fetch from 'core/api/fetch';
const postRequest = (url: string, data) => fetch.post(`${url}`, data);
export function useForecastingSettings(obeyaRoomId) {
    const postAndMutateSettings = async (settingsData: SettingsData) => {
    const settingsRequestData: SettingsDataRequest = {
        ...settingsData,
        roomId: obeyaRoomId,
    }
    const response = await postRequest(resource, settingsRequestData);
    if(response.data) return response.data;
    if(response.status !== 200 && response.status !== 201) throw Error(response.statusText )
    }
    return {
        postAndMutateSettings
    }

}
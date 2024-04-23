import fetch from 'core/api/fetch';
import { ThresholdNotificationSubscription, ThresholdNotificationSubscriptionRequest } from '../views/GovernanceObeyaHome/views/Subscription/types';

const resource = '/notification/subscription/threshold';
const postRequest = (url: string, data) => fetch.post(`${url}`, data);
const getRequest = (url: string) => fetch.get(`${url}`);
export function useThresholdSubscription() {
    const postAndMutate = async (subscriptionData: ThresholdNotificationSubscriptionRequest) => {
    const response = await postRequest(resource, subscriptionData);
    if(response.data) return response.data;
    if(response.status !== 200 && response.status !== 201) throw Error(response.statusText )
    };

    const getSubscription = async(obeyaRoomId) =>{
        const response = await getRequest(`${resource}?obeyaRoomId=${obeyaRoomId}`);
        if(response.data) return response.data;
        if(response.status !== 200 && response.status !== 201) throw Error(response.statusText )
    }
    const inactivateSubscription = async (subscriptionData: ThresholdNotificationSubscription) =>{
        const response = await postRequest(`${resource}/inactivate`, subscriptionData);
        if(response.data) return response.data;
        if(response.status !== 200 && response.status !== 201) throw Error(response.statusText )
    }
    return {
        postAndMutate,
        getSubscription,
        inactivateSubscription,
    }

}
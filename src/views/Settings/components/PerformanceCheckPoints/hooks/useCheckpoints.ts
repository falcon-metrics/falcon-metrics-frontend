import { AxiosResponse } from 'axios';
import fetch, { useCustomSWR } from 'core/api/fetch';
import { StringUnitLength } from 'luxon';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

import { CheckpointItem } from '../interfaces';

const defaultResource = 'checkpoints-views';

const fetchInsightsView = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

const postCheckpointView = (data) => {
  return fetch.post(defaultResource, data);
};

const patchCheckpointView = (data) => {
  return fetch.patch(defaultResource, data);
};

const removeCheckpointView = (id) => {
  return fetch.delete(`${defaultResource}/${id}`);
};

export function useCheckpoints(
  resource = defaultResource,
): {
  data: CheckpointItem[];
  isValidating: boolean;
  isLoadingCheckpoints: boolean;
  error?: unknown;
  mutate: any;
  postCheckpointView: (data: {}) => Promise<AxiosResponse<any>>;
  removeCheckpointView: (id?: number) => Promise<AxiosResponse<any>>;
  widgetInfo?: WidgetInformation[];
  patchCheckpointView: (data: {}) => Promise<AxiosResponse<any>>;
} {
  const { data: response, error, isValidating, mutate } = useCustomSWR<any>(
    resource,
    fetchInsightsView,
  );

  return {
    data: response?.data?.checkpoints || [],
    mutate,
    isValidating,
    isLoadingCheckpoints: !response?.data,
    error,
    postCheckpointView,
    removeCheckpointView,
    widgetInfo: response?.data?.widgetInfo || [],
    patchCheckpointView
  };
}

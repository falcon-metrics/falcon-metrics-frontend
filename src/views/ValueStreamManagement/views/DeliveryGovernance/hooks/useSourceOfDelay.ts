import fetch, { useCustomSWR } from 'core/api/fetch';
import { useFilterPanelContext } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { parseSourcesOfDelayData } from '../utils/parsing/parseSourceOfDelay';

function sourceOfDelayAccordionFetcher(uri: string) {
  return fetch.get(uri);
};


const roundActiveTime = (arr: { activeTime?: number; }[]) => {
  arr.forEach(item => {
    let activeTime = item.activeTime ?? 0;
    if (activeTime > 0) {
      activeTime = Math.round(activeTime / 86400);
    }
    item.activeTime = activeTime;
  });
};

export function useSourceOfDelayAndWaste(
  disabled = false,
  query?: string
) {
  const { queryParamsString } = useFilterPanelContext();
  let url = `/value-stream-management/delivery-governance/source-of-delay-and-waste?${queryParamsString}`;
  if (query) {
    url = url + '&query=' + query;
  }
  const { data: response, error, isValidating, mutate } = useCustomSWR<any>(
    disabled ? null : url,
    (params) => sourceOfDelayAccordionFetcher(params),
  );

  const isEmptyData = !isValidating && response && response.data && typeof response.data === 'object' && Object.keys(response.data).length === 0;

  const parsed = parseSourcesOfDelayData(response?.data);
  roundActiveTime(parsed?.discardedAfterStart?.items ?? []);

  return {
    data: response && !isEmptyData ? parsed : null,
    error,
    isLoading: isValidating,
    isEmptyData,
    update: mutate,
  };
}

import fetch from 'core/api/fetch';
import { find } from 'lodash';
import { useState } from 'react';
import useSWR from 'swr';

export interface FilterColor {
  displayName: string;
  colorHex: string;
  tags: string;
}

const key = '/normalization/filter-colors';

function useNormalizationColors() {
  const [fetchingData, setFetchingData] = useState(true)
  const { data: filterColors = [], ...SWRProperties } = useSWR<FilterColor[]>(
    key,
    () => fetch.get(key).then(({ data }) => {
      setFetchingData(false);
      return data
    }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: true,
    }
  );
  const getColorByDisplayName = (displayName: string) =>
    find(filterColors, { displayName })?.colorHex
  return {
    filterColors,
    ...SWRProperties,
    getColorByDisplayName,
    fetchingData
  };
}

export default useNormalizationColors;

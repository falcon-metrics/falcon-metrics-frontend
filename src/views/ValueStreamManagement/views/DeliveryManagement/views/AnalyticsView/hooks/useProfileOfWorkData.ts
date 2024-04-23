import { StringUnitLength } from 'luxon';
import fetch, { useCustomSWR } from 'core/api/fetch';
import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { AppliedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext';
import { getFilterUrlSearchParams } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';
import { parseProfileOfWorkData } from '../utils/parsing/parseProfileOfWorkData';
import { isProfileOfWorkDataEmpty } from '../utils/validation/isProfileOfWorkDataEmpty';
import { ProfileOfWorkData } from '../interfaces/profileOfWork';

const fetchProfileOfWorkData = (url: StringUnitLength) => {
  return fetch.get(`${url}`);
};

export interface ProfileOfWorkResponseData {
  profileOfWorkData: ProfileOfWorkData;
  isValidating: boolean;
  isEmpty: boolean;
  error?: unknown;
  update: () => void;
};

export const useProfileOfWorkData = (
  appliedFilters: AppliedFilters,
  apiQueryParameters: ApiQueryParameters,
  disabled = false,
): ProfileOfWorkResponseData => {
  const allQueryParametersString = getFilterUrlSearchParams({
    ...appliedFilters,
    ...apiQueryParameters
  });
  const endpoint =
    '/value-stream-management/delivery-management/profile-of-work';
  const url = `${endpoint}?${allQueryParametersString}`;

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useCustomSWR<any>(
    disabled ? null : url,
    fetchProfileOfWorkData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const parsedProfileOfWorkData: ProfileOfWorkData = parseProfileOfWorkData(response?.data);

  const isEmpty: boolean = isProfileOfWorkDataEmpty(parsedProfileOfWorkData);

  return {
    profileOfWorkData: parsedProfileOfWorkData,
    isValidating,
    isEmpty,
    error,
    update: mutate,
  };
};

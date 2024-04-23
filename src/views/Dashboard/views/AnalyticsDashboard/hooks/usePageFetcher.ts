import { useCallback, useRef } from 'react';
import { APIClient, ApiQueryParameters } from 'core/api/ApiClient/ApiClient';

export function usePageFetcher<T>(client: APIClient<T>) {
  const clientRef = useRef(client);
  return useCallback(
    (demoDataIsSelected: boolean, filters: ApiQueryParameters) =>
      clientRef.current.getData(demoDataIsSelected, filters),
    [],
  );
}

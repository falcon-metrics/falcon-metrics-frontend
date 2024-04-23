import fetch from "core/api/fetch";
import useSWR from "swr";

export const addDashboardData = (data) => {
  return fetch.post("/custom-dashboard", data);
};

export const updateDashboardData = (data) => {
  return fetch.patch(`/custom-dashboard`, data);
};

export function useCustomDashboardData(
  userId: string,
  dashboardId = "",
  disabled = false
) {
  const dataFetcher = (uri: string) => {
    return fetch.get(uri);
  };

  const { data: response, error: swrError, isValidating, mutate } = useSWR<any>(
    disabled && !userId
      ? null
      : `/custom-dashboard?userId=${userId}&dashboardId=${dashboardId}`,
    dataFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  let errorMessage: string | null = null;
  if (swrError) {
    errorMessage = swrError.message;
  } else if (response?.data) {
    const received: any = response.data;
    if (typeof received.message === "string") {
      errorMessage = received.message;
    } else if (typeof received.errorMessage === "string") {
      errorMessage = received.errorMessage;
    } else if (typeof received.error === "string") {
      errorMessage = received.error;
    } else if (typeof received.error === "object") {
      if (typeof received.error.message === "string") {
        errorMessage = received.error.message;
      } else {
        errorMessage = `Received an error object from the backend with keys ${Object.keys(
          received.error
        ).join(",")}`;
      }
    }
  }

  const isEmptyData =
    !isValidating &&
    response &&
    response.data &&
    typeof response.data === "object" &&
    Object.keys(response.data).length === 0;

  return {
    data: !isEmptyData && response ? response.data : null,
    error: errorMessage ? new Error(errorMessage) : null,
    isLoading: isValidating,
    isEmptyData,
    mutate,
    addDashboardData,
    updateDashboardData,
  };
}

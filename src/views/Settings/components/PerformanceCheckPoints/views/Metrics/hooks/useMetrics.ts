import fetch from 'core/api/fetch';
import useSWR from 'swr';
import { METRICS_CONFIG } from 'views/ValueStreamManagement/views/DeliveryGovernance/views/PerformanceCheckpointAccordion/metrics_config';

import { MetricItem, MetricConfigResponse, MetricsConfig } from '../interfaces';
import { AxiosResponse } from 'axios';

export const defaultResource = 'metrics-config';

const fetchMetrics = (url: string): Promise<AxiosResponse<MetricConfigResponse>> => {
  return fetch.get(`${url}`);
};

export function useMetrics(
  resource = defaultResource,
): {
  data: MetricsConfig;
  isValidating: boolean;
  isLoadingMetrics: boolean;
  error?: unknown;
  mutate: any;
  metricsToDisplayOnPerfCheckpoints: string[] | undefined,
  metricsToDisplayOnBenchmarking: string[] | undefined,
} {
  const { data: response, error, isValidating, mutate } = useSWR(
    resource,
    fetchMetrics,
    { revalidateOnFocus: false },
  );
  const defaultMetrics: MetricItem[] = METRICS_CONFIG.map((metric, index) => ({
    ...metric,
    id: index,
    display_on_benchmarking: false,
    display_on_checkpoints: false
  }));

  const data = response?.data || {
    savedMetrics: {
      metrics: [],
      customViews: [],
    },
    defaultCustomViews: []
  };
  const res: MetricsConfig = { ...data, defaultMetrics };

  // Why is the data structured this way? Its not readable. And the cases used for the properties are inconsistent
  // TODO: Refactor this
  let metricsToDisplayOnPerfCheckpoints: string[] | undefined;
  let metricsToDisplayOnBenchmarking: string[] | undefined;
  if (data.savedMetrics && data.savedMetrics.metrics && data.savedMetrics.metrics.length) {
    metricsToDisplayOnPerfCheckpoints = data.savedMetrics.metrics
      .filter(m => m.display_on_checkpoints === true)
      .map(m => m.columnName);
    metricsToDisplayOnBenchmarking = data.savedMetrics.metrics
      .filter(m => m.display_on_benchmarking === true)
      .map(m => m.columnName);
  }

  return {
    data: res,
    metricsToDisplayOnPerfCheckpoints,
    metricsToDisplayOnBenchmarking,
    mutate,
    isValidating,
    isLoadingMetrics: !response?.data,
    error,
  };
}

import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';

export interface ScatterplotBaseProps<T> {
  data: Array<T>;
  targetForPredictability?: number;
  maximum?: number;
  percentile50th?: number;
  percentile85th?: number;
  percentile95th?: number;
  lowerOutliers?: Array<number>;
  upperOutliers?: Array<number>;
  filters?: ApiQueryParameters;
}

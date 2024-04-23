export type Distribution = {
  average: number;
  modes: number[];
  minimum: number;
  maximum: number;
  percentile50th: number;
  percentile85th: number;
  percentile95th: number;
  percentile98th: number;
  targetForPredictability: number;
};

export const emptyDistributionFactory = (): Distribution => ({
  minimum: 0,
  maximum: 0,
  modes: [],
  average: 0,
  percentile50th: 0,
  percentile85th: 0,
  percentile95th: 0,
  percentile98th: 0,
  targetForPredictability: 0,
});

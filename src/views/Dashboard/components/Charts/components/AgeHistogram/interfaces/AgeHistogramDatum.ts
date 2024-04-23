export type AgeHistogramDatum = {
  ageInDays: number;
  workItems: Array<{
    id: string;
  }>;
};

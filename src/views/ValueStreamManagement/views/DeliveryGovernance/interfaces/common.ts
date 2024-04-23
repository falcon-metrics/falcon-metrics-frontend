export const INDICATOR_PATTERNS = ['neutral', 'bad', 'average', 'good'] as const;
export type IndicatorPattern = typeof INDICATOR_PATTERNS[number];

export type DistributionRecords = {
  [normalizedDisplayName: string]: number;
};

export type HistoricalTabEntry = {
  dateStart: string;
  dateEnd: string;
  values: DistributionRecords;
}

export type HistoricalTabData = HistoricalTabEntry[];

export type DistributionHistoricalWidgetData = {
  distribution: DistributionRecords;
  historical: HistoricalTabData;
  widgetInfo?: WidgetInformation[];
}

export type WidgetInformation = {
  name: string;
  whatIsThisTellingMe: string;
  howDoIReadThis?: string;
  whyIsThisImportant?: string;
  referenceGuide?: string;
  howIsItCalculated?: string;
}

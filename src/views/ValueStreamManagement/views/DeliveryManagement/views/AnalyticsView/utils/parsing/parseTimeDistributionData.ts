import {
    parseNumber,
    parseNumberOrNullProperty,
    parseNumberOrUndefinedProperty,
    parseNumberProperty,
    parseString,
    parseTextOrUndefinedProperty,
    parseTextProperty,
} from 'views/ValueStreamManagement/utils/parsing';
import { isNumber, isObject, isObjectArray } from 'views/ValueStreamManagement/utils/validation';
import { BoxPlot, DistributionStatistics, ScatterplotDatumWithDates, TimeDistributionData } from '../../interfaces/timeDistribution';
import { HistogramDatum } from '../../views/TimeDistributionSection/components/ItemTimeHistogram/ItemTimeHistogram';

const emptyDistributionStatistics = {
    minimum: null,
    maximum: null,
    modes: null,
    average: null,
    percentile50th: null,
    percentile85th: null,
    percentile95th: null,
    percentile98th: null,
    targetForPredictability: null,
}

const parseModes = (distributionData: object): number[] | null => {
    const modes = distributionData['modes'];

    if (!Array.isArray(modes)) {
        return null;
    }

    const isNumberArray: boolean = modes.every(isNumber);
    if (!isNumberArray) {
        return null;
    }

    const parsedModes: number[] = modes.map(parseNumber);

    return parsedModes;
}

const parseDistributionStatistics = (distributionData: unknown): DistributionStatistics => {
    if (!isObject(distributionData)) {
        return emptyDistributionStatistics;
    }

    const parsedStatistics: DistributionStatistics = {
        minimum: parseNumberOrNullProperty(distributionData, 'minimum'),
        maximum: parseNumberOrNullProperty(distributionData, 'maximum'),
        modes: parseModes(distributionData),
        average: parseNumberOrNullProperty(distributionData, 'average'),
        percentile50th: parseNumberOrNullProperty(
            distributionData,
            'percentile50th'
        ),
        percentile85th: parseNumberOrNullProperty(
            distributionData,
            'percentile85th'
        ),
        percentile95th: parseNumberOrNullProperty(
            distributionData,
            'percentile95th'
        ),
        percentile98th: parseNumberOrNullProperty(
            distributionData,
            'percentile98th'
        ),
        targetForPredictability: parseNumberOrNullProperty(distributionData, 'targetForPredictability'),
    }

    return parsedStatistics;
}

const parseWorkItemEntry = (entry: object): { id: string } => {
    const id: unknown = entry['id'];

    const parsedId = id
        ? { id: parseString(id) }
        : { id: '' };

    return parsedId;
}

const parseWorkItemEntries = (entries: unknown): Array<{ id: string }> => {
    if (!isObjectArray(entries)) {
        return[];
    }

    const parsedEntries: Array<{
        id: string
    }> =entries.map(parseWorkItemEntry);

    return parsedEntries;
}

const parseHistogramDatum = (entry: object): HistogramDatum => {
    const workItems: unknown = entry['workItems'];
    const parsedWorkItems: Array<{ id: string; }> = workItems
        ? parseWorkItemEntries(workItems)
        : [];

    const parsedHistogramDatum: HistogramDatum = {
        ageInDays: parseNumberProperty(entry, 'ageInDays'),
        workItems: parsedWorkItems,
    };
    
    return parsedHistogramDatum;
}

const parseHistogramData = (histogramData: unknown): HistogramDatum[] => {
    if (!isObjectArray(histogramData)) {
        return [];
    }

    const parsedHistogramData: HistogramDatum[] = histogramData.map(parseHistogramDatum);

    return parsedHistogramData;

}

const parseBoxPlot = (boxplotData: unknown): BoxPlot | null => {
    if (!isObject(boxplotData)) {
        return null;
    }

    const lowerOutliers: unknown = boxplotData['lowerOutliers'];
    const parsedLowerOutliers: number[] = Array.isArray(lowerOutliers)
        ? lowerOutliers.map(parseNumber)
        : [];
    
    const upperOutliers: unknown = boxplotData['upperOutliers'];
    const parsedUpperOutliers: number[] = Array.isArray(upperOutliers)
        ? upperOutliers.map(parseNumber)
        : [];

    const parsedBoxPlot: BoxPlot = {
        median: parseNumberProperty(boxplotData, 'median'),
        quartile1st: parseNumberProperty(boxplotData, 'quartile1st'),
        quartile3rd: parseNumberProperty(boxplotData, 'quartile3rd'),
        interQuartileRange: parseNumberProperty(boxplotData, 'interQuartileRange'),
        lowerWhisker: parseNumberProperty(boxplotData, 'lowerWhisker'),
        upperWhisker: parseNumberProperty(boxplotData, 'upperWhisker'),
        lowerOutliers: parsedLowerOutliers,
        upperOutliers: parsedUpperOutliers,
    };

    return parsedBoxPlot;
}

const parseScatterPlotDatum = (entry: object): ScatterplotDatumWithDates => {
    const parsedDatum: ScatterplotDatumWithDates = {
        workItemId: parseTextProperty(entry, 'workItemId'),
        title: parseTextProperty(entry, 'title'),
        workItemType: parseTextProperty(entry, 'workItemType'),
        arrivalDateNoTime: parseTextOrUndefinedProperty(
            entry,
            'arrivalDateNoTime',
        ),
        commitmentDateNoTime: parseTextOrUndefinedProperty(
            entry,
            'commitmentDateNoTime',
        ),
        departureDateNoTime: parseTextOrUndefinedProperty(
            entry,
            'departureDateNoTime',
        ),
        leadTimeInWholeDays: parseNumberOrUndefinedProperty(
            entry,
            'leadTimeInWholeDays',
        ),
        wipAgeInWholeDays: parseNumberOrUndefinedProperty(
            entry,
            'wipAgeInWholeDays',
        ),
        inventoryAgeInWholeDays: parseNumberOrUndefinedProperty(
            entry,
            'inventoryAgeInWholeDays',
        ),
        arrivalDate: parseTextOrUndefinedProperty(
            entry,
            'arrivalDate',
        ),
        commitmentDate: parseTextOrUndefinedProperty(
            entry,
            'commitmentDate',
        ),
        departureDate: parseTextOrUndefinedProperty(
            entry,
            'departureDate',
        ),
    };

    return parsedDatum;
}

const parseScatterplot = (scatterplotData: unknown): ScatterplotDatumWithDates[] => {
    if (!isObjectArray(scatterplotData)) {
        return [];
    }

    const parsedScatterplot: ScatterplotDatumWithDates[] = scatterplotData.map(
        parseScatterPlotDatum,
    );

    return parsedScatterplot;
}

export const parseTimeDistributionData = (data: unknown): TimeDistributionData => {
    const emptyData: TimeDistributionData = {
      distribution: emptyDistributionStatistics,
      histogram: [],
      boxPlot: null,
      scatterplot: [],
    };

    if (!isObject(data)) {
        return emptyData;
    }

    const distribution: unknown = data['distribution'];
    const parsedDistribution: DistributionStatistics = distribution
        ? parseDistributionStatistics(distribution)
        : emptyDistributionStatistics;
    
    const histogram: unknown = data['histogram'];
    const parsedHistogram: HistogramDatum[] = histogram
        ? parseHistogramData(histogram)
        : [];
    
    const boxPlot: unknown = data['boxPlot'];
    const parsedBoxPlot: BoxPlot | null = boxPlot
        ? parseBoxPlot(boxPlot)
        : null;
    
    const scatterplot: unknown = data['scatterplot'];
    const parsedScatterplot: ScatterplotDatumWithDates[] = scatterplot
        ? parseScatterplot(scatterplot)
        : [];

    const timeDistributionData: TimeDistributionData = {
        distribution: parsedDistribution,
        histogram: parsedHistogram,
        boxPlot: parsedBoxPlot,
        scatterplot: parsedScatterplot,
    }

    return timeDistributionData;
}

import { DateTime } from 'luxon';
import {
    parseString,
    parseNumber
} from 'views/ValueStreamManagement/utils/parsing';
import { isObject } from 'views/ValueStreamManagement/utils/validation';
import {
    RunChartData,
    TimeSeries,
    TimeSeriesEntry
} from '../../interfaces/runChart';

const parseTimeSeriesEntry = (entry: unknown): TimeSeriesEntry => {
    if (!Array.isArray(entry)) {
        throw new Error('Run Chart time series entry contains invalid element.');
    }

    if (entry.length !== 2) {
        throw new Error('Run Chart time series entry contains invalid element.');
    }

    const [dateString, count] = entry;

    const parsedDateString: string = parseString(dateString);
    const parsedDateTime: DateTime = DateTime.fromISO(parsedDateString).toLocal();

    if (!parsedDateTime.isValid) {
        throw new Error('Run Chart time series entry contains entry with invalid date.');
    }

    const parsedCount: number = parseNumber(count);

    const parsedEntry: TimeSeriesEntry = [parsedDateTime, parsedCount];

    return parsedEntry;
};

export const parseTimeSeriesEntries = (entries: unknown): TimeSeries => {
    const emptyArray: TimeSeriesEntry[] = [];
    if (!Array.isArray(entries)) {
        return emptyArray;
    }

    const parsedEntries: TimeSeriesEntry[] = entries.map(
        (entry) => parseTimeSeriesEntry(entry)
    );

    return parsedEntries;
};

// May throw errors when given invalid data. Handle appropriately.
export const parseRunChartData = (data: unknown): RunChartData => {
    if (!isObject(data)) {
        return {
            newItemsData: [],
            totalItemsData: [],
        };
    }

    const newItemsData = data['newItemsData'];
    const parsedNewItemsData: TimeSeries = newItemsData
        ? parseTimeSeriesEntries(newItemsData)
        : [];

    const totalItemsData = data['totalItemsData'];
    const parsedTotalitemsData: TimeSeries = totalItemsData
        ? parseTimeSeriesEntries(totalItemsData)
        : [];

    return {
        newItemsData: parsedNewItemsData,
        totalItemsData: parsedTotalitemsData,
    };
};

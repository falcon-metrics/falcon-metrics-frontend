import { DateTime } from 'luxon';
import { DATE_STYLE } from 'styles/theme';
import round from 'lodash/round';

export const DEFAULT_DATE_FORMAT = 'dd MMM yyyy';
export const DEFAULT_MONTH_YEAR_FORMAT = 'LLL yyyy';
export const DEFAULT_DATE_TIME_FORMAT = 'dd MMM yyyy h:mm a';

export function formatDate(date) {
  if (date && typeof date === 'string' && !date.includes("-")) return date;
  return DateTime.fromISO(date).toFormat(DEFAULT_DATE_FORMAT);
}

export function formatStringDate(date, format?: string) {
  if (date && typeof date === 'string' && !date.includes("-")) return date;

  const parsedDate = DateTime.fromFormat(date, format ?? 'MMM-dd yyyy');
  return parsedDate.toFormat(DEFAULT_DATE_FORMAT);
}

export function formatStringDateArray(dates, format?: string) {
  if (!Array.isArray(dates)) {
    return [];
  }

  const formattedDates = dates.map(dateString => {
    if (typeof dateString !== 'string') {
      return '';
    }

    return formatStringDate(dateString, format);
  });

  return formattedDates;
}

export function formatDateTime(date) {
  return DateTime.fromISO(date).toFormat(DEFAULT_DATE_TIME_FORMAT);
}

export function formatTimeFrameForDisplay(days: number): string {
  let response = '';

  switch (true) {
    case days === 1:
      response = round(days, 1) + ' day';
      break;
    case days < 30:
      response = round(days, 1) + ' days';
      break;
    case days === 30:
      response = round(days / 30, 1) + ' month';
      break;
    case days > 30:
      response = round(days / 30, 1) + ' months';
      break;
    default:
      break;
  }

  return response;
}

export function subtractDaysFromDate(
  originalDate: Date,
  numOfDays: number,
): Date {
  return DateTime.fromJSDate(originalDate)
    .minus({ days: numOfDays })
    .toJSDate();
}

export function fromIsoToLocale(isoDateString: string): string {
  if (!isoDateString) {
    return '';
  }

  const dateTime = DateTime.fromISO(isoDateString);
  if (dateTime.invalidReason) {
    return '';
  }

  return dateTime.toLocaleString(DATE_STYLE);
}

export function fromUtcToLocalTimezone(utcIsoDateTime: string): string {
  const dateTime = DateTime.fromISO(utcIsoDateTime);
  if (dateTime.invalidReason) {
    return '';
  }
  return dateTime.toLocal().toISODate();
}

export const monthAbbreviations = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const mapOfMonths: { [key: string]: any; } = monthAbbreviations.reduce(
  (acc, month, index: number) => {
    acc = { ...acc, [index + 1]: month };
    return acc;
  },
  {},
);

export function sortByDate<T>(list: T[], key: string, orderBy = 'asc') {
  const sortedList = list.sort((a, b) => {
    const aValue = a?.[key] ? DateTime.fromISO(a?.[key]).toMillis() : 0;
    const bValue = b?.[key] ? DateTime.fromISO(b?.[key]).toMillis() : 0;
    return aValue - bValue;
  });
  return orderBy === 'asc' ? sortedList : sortedList.reverse();
}

export const minutesToMiliseconds = (minutes: number) => minutes * 60 * 1000;

export function isIsoDate(str: string) {
  if (!/\d{4}-\d{2}-\d{2}/.test(str)) return false;
  const date = new Date(str);
  const jsDate = date.toISOString();
  const datePart = jsDate.split('T')[0];
  return datePart === str;
}

import { DateTime } from 'luxon';
import { DEFAULT_DATE_FORMAT } from 'utils/dateTime';

/**
 * Ignore the timestamp and timezone. Return a new UTC datetime of the same date
 */
export const getUTCDate = (d: DateTime) => {
  const format = DEFAULT_DATE_FORMAT;
  return DateTime
    .fromFormat(d.toFormat(format), format, { zone: 'utc' });
};

export const createDateFromString = (dateString: string) => {
  // setZone to use the original timezone instead of the local timezone
  // This is so that the date remains the same
  const format = 'yyyy-MM-dd';
  const d = DateTime.fromISO(dateString, { setZone: true });
  // Get rid of the timestamp, keep only the date
  const dStr = d.toFormat(format);
  // Build the date object with the date string 
  return DateTime.fromFormat(dStr, format).toJSDate();
};

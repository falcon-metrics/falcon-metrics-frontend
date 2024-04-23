import { DateTime } from "luxon";
import { daysToIntervalString } from "utils/daysToIntervalString";

export const calculateTimeSinceLastEdit = (updatedAt) => {
    if (updatedAt) {
      const endDate = DateTime.fromJSDate(new Date());
      const startDate = updatedAt
        ? DateTime.fromISO(updatedAt)
        : DateTime.fromJSDate(new Date());
      const { days } = endDate.diff(startDate, ["days"]).toObject();
      return daysToIntervalString(days ?? 0);
    }
    return ""; 
  };
  
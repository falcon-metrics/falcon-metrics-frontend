import { isString } from "lodash";
import { DateTime } from "luxon";
import { DATE_STYLE } from "styles/theme";

export const dateFormatter = (value: DateTime) => {
    if (isString(value) && isNaN(Number(value))) {
      const dateTime = DateTime.fromISO(value);
  
      if (isString(value) && !dateTime.invalidReason) {
        return dateTime.toLocaleString(DATE_STYLE);
      }
    }
    return value;
  };
  
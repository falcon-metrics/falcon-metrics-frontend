import { DateTime } from 'luxon';

import { EventInfo } from '../../hooks/useEvents';

export const sortEventsByAsc = (events: EventInfo[]) => {
  return events.sort((data1: EventInfo, data2: EventInfo): any => { 
    const dateA = DateTime.fromISO(data1.efective_date as string).toSeconds();
    const dateB = DateTime.fromISO(data2.efective_date as string).toSeconds();

    if (dateA === dateB) {
      return 0;
    }
    return dateA - dateB;
  });
};

export const sortEventsByDesc = (events: EventInfo[]) => {
  return events.sort((data1: EventInfo, data2: EventInfo): any => {
    const dateA = DateTime.fromISO(data1.efective_date as string).toSeconds();
    const dateB = DateTime.fromISO(data2.efective_date as string).toSeconds();
    if (dateB === dateA) {
      return 0;
    }
    return dateB - dateA;
  });
};

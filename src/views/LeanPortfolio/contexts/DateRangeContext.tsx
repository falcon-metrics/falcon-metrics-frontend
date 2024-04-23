import { DateTime } from 'luxon';
import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
}

type ContextType = {
  defaultStartDate: Date;
  defaultEndDate: Date;
  selectedDateRange: Date[];
  appliedDateRange: Date[];
  setSelectedDateRange: (range: Date[]) => void;
  setAppliedDateRange: (range: Date[]) => void;
  setDateRange: (range: Date[]) => void;
};

export const PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY = 'portfolio-analysis-daterange-filter';
export const FOCUS_DATERANGE_FILTER_KEY = 'obeya-focus-daterange-filter';

const defaultStartDate = DateTime.now().minus({ days: 90 }).toJSDate();
const defaultEndDate = DateTime.now().toJSDate();

const defaultContextValue: ContextType = {
  defaultStartDate,
  defaultEndDate,
  selectedDateRange: [defaultStartDate, defaultEndDate],
  setSelectedDateRange: (range: Date[]) => { return range; },
  appliedDateRange: [defaultStartDate, defaultEndDate],
  setAppliedDateRange: (range: Date[]) => { return range; },
  setDateRange: (range: Date[]) => { return range; }
};

const DateRangeContext = createContext(defaultContextValue);

const DateRangeProvider = ({ children }: Props) => {

  // Retrieve the stored date range from localStorage
  const [selectedDateRange, setSelectedDateRange] = useState<Date[]>(() => {
    const storedDateRange = localStorage.getItem(PORTFOLIO_ANALYSIS_DATERANGE_FILTER_KEY);
    return storedDateRange ? JSON.parse(storedDateRange) : [defaultStartDate.toISOString(), defaultEndDate.toISOString()];
  });

  const [appliedDateRange, setAppliedDateRange] = useState<Date[]>([]);

  const setDateRange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const contextValue: ContextType = {
    defaultStartDate,
    defaultEndDate,
    selectedDateRange,
    appliedDateRange,
    setSelectedDateRange,
    setAppliedDateRange,
    setDateRange
  };

  return (
    <DateRangeContext.Provider value={contextValue}>
      {children}
    </DateRangeContext.Provider>
  );
};

const useDateRangeContext = () => {
  return useContext(DateRangeContext);
};

export { DateRangeProvider, useDateRangeContext };


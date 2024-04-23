import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import { AnalyticsDashboardPageIndexes } from '../interfaces/PageIndexes';

const filtersLimitedToCertainPages: Partial<
  Record<keyof ApiQueryParameters, Array<AnalyticsDashboardPageIndexes>>
> = {
  currentDataAggregation: [AnalyticsDashboardPageIndexes.summary],
  delayedItemsSelection: [
    AnalyticsDashboardPageIndexes.inventory,
    AnalyticsDashboardPageIndexes.WIP,
  ],
};

export function getIsKeyInPage(k: string, page: AnalyticsDashboardPageIndexes) {
  const pagesToWhichFilterIsLimited = filtersLimitedToCertainPages[k];
  return (
    !pagesToWhichFilterIsLimited || pagesToWhichFilterIsLimited.includes(page)
  );
}

export const getFiltersExcludedForPage = (
  page: AnalyticsDashboardPageIndexes,
) => {
  return Object.keys(filtersLimitedToCertainPages).filter((k) => {
    return !getIsKeyInPage(k, page);
  });
};

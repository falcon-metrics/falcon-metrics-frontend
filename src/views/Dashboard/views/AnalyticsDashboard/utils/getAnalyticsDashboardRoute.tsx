import { BaseRoutes, ValueStreamManagementIndexes } from 'utils/routes';
import { AnalyticsDashboardPageIndexes } from '..';

export const getAnalyticsDashboardRoute = (
  tab: AnalyticsDashboardPageIndexes | ':tab',
) => `${BaseRoutes.AnalyticsDashboard}/${tab}`;

export const getValueStreamManagementRoute = (tab: ValueStreamManagementIndexes | ":tab") =>
  `${BaseRoutes.ValueStreamManagement}/${tab}`;

export const getMainDashboardRoute = (
  tab: AnalyticsDashboardPageIndexes | ValueStreamManagementIndexes |  ':tab',
  isOldDashboard: boolean,
) =>  isOldDashboard ? `${BaseRoutes.AnalyticsDashboard}/${tab}` : `${BaseRoutes.ValueStreamManagement}/${tab}`;

import { useRouteMatch } from 'react-router';
import { defaultIndex } from '../components/AnalyticsDashboardRouter';
import { AnalyticsDashboardPageIndexes } from '..';
import { getAnalyticsDashboardRoute, getValueStreamManagementRoute } from '../utils/getAnalyticsDashboardRoute';
import { ValueStreamManagementIndexes } from 'utils/routes';

export const useAnalyticsDashboardTab = () => {
  const { params: { tab = defaultIndex } = {} } =
    useRouteMatch<{ tab: AnalyticsDashboardPageIndexes }>(
      getAnalyticsDashboardRoute(':tab'),
    ) ?? {};
  return tab;
};

export const useValueStreamManagement = () => {
  const { params: { tab = ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance } = {} } =
    useRouteMatch<{ tab: ValueStreamManagementIndexes }>(
      getValueStreamManagementRoute(':tab'),
    ) ?? {};
  return tab;
};
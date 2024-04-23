import { useRouteMatch } from 'react-router';
import { getValueStreamManagementRoute, ValueStreamManagementIndexes } from 'utils/routes';

export const defaultIndex = ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance;

export const useValueStreamManagementTab = function () {
  const { params: { tab = defaultIndex } = {} } =
    useRouteMatch<{ tab: ValueStreamManagementIndexes }>(
      getValueStreamManagementRoute(':tab'),
    ) ?? {};
  return tab;
}
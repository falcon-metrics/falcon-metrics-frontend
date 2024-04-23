import { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import memo from 'utils/typescript/memo';

import useFilterPanelContext from '../../../Platform/views/FilterPanel/contexts/FilterPanelContext';
import { useAnalyticsDashboardTab } from '../../hooks/useAnalyticsDashboardTab';
import { PageProps } from '../../interfaces/PageProps';
import { getMainDashboardRoute } from '../../utils/getAnalyticsDashboardRoute';
import {
  AnalyticsDashboardPages,
  defaultIndex,
} from './interfaces/AnalyticsDashboardPages';
import useUserInfo from 'hooks/fetch/useUserInfo';
import { BaseRoutes, ValueStreamManagementIndexes } from 'utils/routes';
import { ValueStreamManagementPages } from 'views/ValueStreamManagement/ValueStreamManagementRoute';
import { useValueStreamManagementTab } from 'views/ValueStreamManagement/hooks/useValueStreamManagementTab';
import { SelectedTabContext } from 'components/UserStateProvider/UserStateProvider';

interface AnalyticsDashboardRouterProps {
  demoDataIsSelected: boolean;
}

const AnalyticsDashboardRouter = ({
  demoDataIsSelected,
}: AnalyticsDashboardRouterProps) => {
  const { userInfo } = useUserInfo();
  const isOldDashboard = userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;

  const analyticsDashboardTab = useAnalyticsDashboardTab();
  const valuestreamManagementTab = useValueStreamManagementTab();
  const tab = isOldDashboard ? analyticsDashboardTab : valuestreamManagementTab;

  const sendTelemetry = useSendTelemetry();
  const [oldTab, setOldTab] = useState(tab);
  useEffect(() => {
    if (oldTab !== tab) {
      sendTelemetry('AnalyticsPageNavigation', `${oldTab} -> ${tab}`);
      setOldTab(tab);
    }
  }, [sendTelemetry, tab, oldTab]);

  const { apiQueryParameters } = useFilterPanelContext();

  const pageProps: PageProps = {
    filters: apiQueryParameters,
    demoDataIsSelected,
  };

  const { tab: savedTab } = useContext(SelectedTabContext);

  let useIndex = isOldDashboard ? defaultIndex : ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance;
  if (savedTab !== undefined) {
    useIndex = savedTab as any;
  }
  const mapOver = isOldDashboard ? AnalyticsDashboardPages : ValueStreamManagementPages;

  return (
    <Switch>
      {mapOver.map(([_, pageIndex, Component]) => (
        <Route
          key={pageIndex}
          path={getMainDashboardRoute(pageIndex, isOldDashboard)}
          render={() => <Component {...pageProps} />}
        />
      ))}
      <Route
        render={() => (
          <Redirect to={getMainDashboardRoute(useIndex, isOldDashboard)} />
        )}
      />
    </Switch>
  );
};

export default memo(AnalyticsDashboardRouter);

import { useCallback, useContext } from "react";
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import Link from "@material-ui/core/Link";
import useUserInfo from "hooks/fetch/useUserInfo";
import { BaseRoutes, getAnalyticsDashboardRoute, getValueStreamManagementRoute, ValueStreamManagementIndexes } from "utils/routes";
import { AnalyticsDashboardPageIndexes } from "views/Dashboard/views/AnalyticsDashboard";
import { useHistory } from "react-router-dom";


const DashboardLink = () => {
  const { contextId, setContextId } = useContext(SelectedContextIdContext);
  const { userInfo } = useUserInfo();
  const history = useHistory();


  const isOldDashboard = userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;
  const { contexts } = useDashboardContexts();
  const analyticsDashboardUrl = isOldDashboard ?
    getAnalyticsDashboardRoute(AnalyticsDashboardPageIndexes.summary) :
    getValueStreamManagementRoute(ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance);
  const goToPath = useCallback(() => history.push(analyticsDashboardUrl), [analyticsDashboardUrl]);

  if ((contexts || [])?.find(context => context.id === contextId)?.obeyaId) {
    return (
      <Link
        color="primary"
        onClick={() => {
          setContextId('');
          goToPath();
          location.reload();
        }}
      >
        Go to main Flow Analytics
      </Link>
    );
  }
  return (
    <></>
  );

};
export default DashboardLink;
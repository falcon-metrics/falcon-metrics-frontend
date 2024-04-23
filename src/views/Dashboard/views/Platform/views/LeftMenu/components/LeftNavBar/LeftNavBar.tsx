import { TelemetryNavigationActions } from "core/api/telemetry/types";
import {
  BaseRoutes,
  getAnalyticsDashboardRoute,
  getValueStreamManagementRoute,
  ValueStreamManagementIndexes,
} from "utils/routes";
import useUserInfo from "hooks/fetch/useUserInfo";
import LeftNavBarButton from "./components/LeftNavBarButton/LeftNavBarButton";
import { AnalyticsDashboardPageIndexes } from "views/Dashboard/views/AnalyticsDashboard";

const LeftNavBar = () => {
  const { userInfo } = useUserInfo();

  const isOldDashboard =
    userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;

  const analyticsDashboardUrl = isOldDashboard
    ? getAnalyticsDashboardRoute(AnalyticsDashboardPageIndexes.summary)
    : getValueStreamManagementRoute(
      ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance
    );

  return (
    <nav className="left-menu-container">
      <ul>
        {/* {isInRole(...BETA_ROLES) && ( */}
        <LeftNavBarButton
          iconAltText="Loupe"
          text="Loupe"
          iconName="loupeIcon"
          path={BaseRoutes.LeanPortfolio}
          prefix={BaseRoutes.LeanPortfolio}
          telemetryAction={TelemetryNavigationActions.accessLeanPortfolio}
        />
        <LeftNavBarButton
          iconAltText="Delivery Icon"
          text="Flow Analytics"
          iconName="deliveryIcon"
          path={analyticsDashboardUrl}
          prefix={analyticsDashboardUrl}
          telemetryAction={TelemetryNavigationActions.accessAnalyticsDashboard}
        />
        {/* <LeftNavBarButton
          iconAltText="Governance Obeya"
          text="Governance Obeya"
          iconName="dash_mono_72"
          path={BaseRoutes.InitiativeSocialFeed}
          prefix={BaseRoutes.InitiativeSocialFeed}
          telemetryAction={TelemetryNavigationActions.accessGovernanceObeya}
        /> */}
      </ul>
    </nav>
  );
};

export default LeftNavBar;

import React, { useEffect } from "react";

import classNames from "classnames";
import useAuthentication from "hooks/useAuthentication";
import useProfile from "hooks/useProfile";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import useSWR, { SWRConfig } from "swr";
import { BaseRoutes } from "utils/routes";
import DoesNotSupportResolution from "views/Dashboard/views/Platform/views/DoesNotSupportResolution";
import LeftMenu from "views/Dashboard/views/Platform/views/LeftMenu";
import zingchart from "zingchart";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserStateProviderWrapper from "components/UserStateProvider";
import useUserInfo from "hooks/fetch/useUserInfo";
import { initializeIcons } from "@fluentui/react";
import { UserProfile } from "components/UserProfile";

initializeIcons();

const Signup = React.lazy(() => import("views/Signup"));
const Dashboard = React.lazy(() => import("views/Dashboard"));
const SetupWizard = React.lazy(() => import("views/SetupWizard"));
const OrganizationSettings = React.lazy(() => import("views/Settings"));
const InitiativeSocialFeed = React.lazy(() => import("views/Governance"));
const LeanPortfolio = React.lazy(() => import("views/LeanPortfolio"));
// const NorthStar = React.lazy(() => import('views/NorthStar'));

const VerifyYourEmail = React.lazy(
  () => import("views/Signup/VerifyYourEmailPage")
);
const BillingCheckout = React.lazy(() => import("views/BillingCheckout"));
const Unavailable = React.lazy(() => import("views/UnavailablePage"));

declare global {
  interface Window {
    token: string;
    api: string;
  }
}

function App() {
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const { getApiToken } = useAuthentication();

  const organisation = profile?.app_metadata?.user_organisation;
  const shouldShowWidget = useMediaQuery("(min-width: 998px)");

  zingchart.ASYNC = true;
  zingchart.LICENSE = ["your_license_key"];

  const { data: token } = useSWR("/token", getApiToken, { suspense: true });

  useEffect(() => {
    if (token) window.token = token;
  }, [token]);

  if (token) {
    window.token = token;
  }
  const { userInfo } = useUserInfo();

  if (!organisation) return <Signup />;
  if (!profile?.email_verified) return <VerifyYourEmail />;

  const routeWithoutDashboard = [
    "/datasources",
    "/organization-settings",
    "/unavailable",
    "/billing",
  ];
  const isNoDashboard = routeWithoutDashboard.some((currentPath) =>
    pathname.includes(currentPath)
  );

  if (isNoDashboard) {
    return (
      <Switch>
        <Route path="/datasources" component={SetupWizard} />
        <Route path="/organization-settings" component={OrganizationSettings} />
        <Route path="/unavailable" component={Unavailable} />
        <Route path="/billing" component={BillingCheckout} />
      </Switch>
    );
  }

  const isOldDashboard =
    userInfo?.analyticsDashboardUrl === BaseRoutes.AnalyticsDashboard;

  const analyticsDashboardUrl = isOldDashboard
    ? BaseRoutes.AnalyticsDashboard
    : BaseRoutes.ValueStreamManagement;

  return (
    <DashboardRouter
      shouldShowWidget={shouldShowWidget}
      analyticsDashboardUrl={analyticsDashboardUrl}
    />
  );
}

const DashboardRouter = ({
  shouldShowWidget,
  analyticsDashboardUrl,
}: {
  shouldShowWidget: boolean;
  analyticsDashboardUrl: string;
}) => (
  <Box className={classNames({ "app-container": shouldShowWidget })}>
    <SWRConfig
      value={{
        // Refresh every hour. Esentially, do not refresh automatically
        refreshInterval: 60 * 60 * 1000,
      }}
    >
      <DoesNotSupportResolution />
      {shouldShowWidget && (
        <>
          <LeftMenu />
          <Box className="app-right-column">
            <Box className="content-container">
              <Switch>
                <Route path={analyticsDashboardUrl} component={Dashboard} />

                <Route
                  path={BaseRoutes.InitiativeSocialFeed}
                  component={InitiativeSocialFeed}
                />
                <Route
                  path={BaseRoutes.ValueStreamManagement}
                  component={Dashboard}
                />
                <Route
                  path={BaseRoutes.LeanPortfolio}
                  component={LeanPortfolio}
                />
                {/* <Route path={BaseRoutes.NorthStar} component={NorthStar} /> */}
                <Route path={BaseRoutes.Profile} component={UserProfile} />
                <Redirect to={analyticsDashboardUrl} />
              </Switch>
            </Box>
          </Box>
        </>
      )}
    </SWRConfig>
  </Box>
);

export const getTemporaryPage = (pageTitle) => () => (
  <Box className="content-container">
    <Box className="widget-title">{pageTitle}</Box>
  </Box>
);

export default withAuthenticationRequired(
  () => UserStateProviderWrapper(App) as any
);

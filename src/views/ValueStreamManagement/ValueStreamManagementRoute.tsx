import { ComponentType } from "react";

import { Route, Switch } from "react-router-dom";
import {
  getValueStreamManagementRoute,
  ValueStreamManagementIndexes,
} from "utils/routes";
import { PageProps } from "views/Dashboard/views/AnalyticsDashboard/interfaces/PageProps";

import ValueStreamManagementContinuousImprovements from "./views/ContinuousImprovements";
import ValueStreamManagementDeliveryGovernance from "./views/DeliveryGovernance";
import ValueStreamManagementDeliveryManagement from "./views/DeliveryManagement";
import CustomDashboardPage from "./views/CustomDashboard/CustomDashboardPage";

export const ValueStreamManagementPages: Array<
  [string, ValueStreamManagementIndexes, ComponentType<PageProps>]
> = [
  [
    "Dashboard",
    ValueStreamManagementIndexes.CustomDashboard,
    CustomDashboardPage,
  ],
  [
    "Delivery Governance",
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryGovernance,
    ValueStreamManagementDeliveryGovernance,
  ],
  [
    "Delivery Management",
    ValueStreamManagementIndexes.ValueStreamManagementDeliveryManagement,
    ValueStreamManagementDeliveryManagement,
  ],
  [
    "Continuous Improvements",
    ValueStreamManagementIndexes.ValueStreamManagementContinuousImprovements,
    ValueStreamManagementContinuousImprovements,
  ],
];

const ValueStreamManagementRoute = () => (
  <Switch>
    {ValueStreamManagementPages.map(([, pageIndex, Component]) => (
      <Route
        exact
        key={pageIndex}
        path={getValueStreamManagementRoute(pageIndex)}
        component={Component}
      />
    ))}
  </Switch>
);

export default ValueStreamManagementRoute;

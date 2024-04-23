import { AnalyticsDashboardPageIndexes } from "views/Dashboard/views/AnalyticsDashboard";

export enum BaseRoutes {
  AnalyticsDashboard = "/analytics-dashboard",
  Dashboard = "/dashboard",
  InitiativeSocialFeed = "/vmo/initiative",
  ValueStreamManagement = "/value-stream-management",
  LeanPortfolio = "/vmo",
  NorthStar = "/vmo/north-star",
  Strategy = "/strategy",
  Profile = "/profile"
}

export const InitiativeSocialFeedHome = "";

export enum LeanPortfolioIndices {
  LeanPortfolioHome = "",
  NorthStar = "north-star",
  NorthStarEdit = "strategic-driver/:id",
  Scorecard = "business-score-card",
  Strategy = "strategy",
  Strategies = "strategies",
  LinkMap = "link-map",
}

export enum NorthStarIndexes {
  NorthStarHome = "",
  NorthStarEdit = "strategic-driver/:id",
}

export const getAnalyticsDashboardRoute = (
  tab: AnalyticsDashboardPageIndexes | ":tab"
) => `${BaseRoutes.AnalyticsDashboard}/${tab}`;

export const getPage = (page: BaseRoutes | ":page") => `/${page}`;

export const getLeanPortfolioRoute = (tab: LeanPortfolioIndices | ":tab") =>
  `${BaseRoutes.LeanPortfolio}/${tab}`;

export const getNorthStarRoute = (tab: NorthStarIndexes | ":tab") =>
  `${BaseRoutes.NorthStar}/${tab}`;

export enum ValueStreamManagementIndexes {
  CustomDashboard = "dashboard",
  ValueStreamManagementDeliveryGovernance = "delivery-governance",
  ValueStreamManagementDeliveryManagement = "delivery-management",
  ValueStreamManagementContinuousImprovements = "continuous-improvements",
}

export const getValueStreamManagementRoute = (
  tab: ValueStreamManagementIndexes | ":tab"
) => `${BaseRoutes.ValueStreamManagement}/${tab}`;

export const OBEYA_ROLES = ["administrator", "beta", "governance_obeya"];

export const OBEYA_ROLES_ALLOW_ACCESS = [
  "administrator",
  "powerUser",
  "user_admin",
];

export const ALPHA_ROLE = ["alpha"];
export const BETA_ROLES = ["beta"];

export const ALL_ROLES = [
  "administrator",
  "powerUser",
  "user_admin",
  "beta",
  "standardUser",
  "trial",
  "governance_obeya",
  "alpha"
];

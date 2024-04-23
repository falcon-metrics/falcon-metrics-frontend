export type TelemetryActions =
  | 'ContextSelection'
  | 'Signup'
  | 'SignOut'
  | 'DatasourcesManaging'
  | 'ApplyFilter'
  | 'PageNavigation'
  | 'CreateDatasource'
  | 'EnabledDatasource'
  | 'DisabledDatasource'
  | 'EditDatasource'
  | 'DeleteDatasource'
  | 'SummaryPageNavigation'
  | 'AnalyticsPageNavigation'
  | 'AccessedDatasource'
  | 'AccessedProjects'
  | 'AccessedWorkItemTypes'
  | 'AccessedBoardsAndAggregations'
  | 'AccessedCustomFields'
  | 'AccessedDatasourceSettings'
  | 'AccessedOrganizationSettings'
  | 'AccessedNormalization'
  | 'ConfiguredDatasource'
  | 'ConfiguredDatasourceSettings'
  | 'ConfiguredProjects'
  | 'ConfiguredNormalization'
  | 'ConfiguredCustomFields'
  | 'ConfiguredOrganizationSettings'
  | 'ConfiguredWorkItemTypes'
  | 'ConfiguredBoardsAndAggregations'
  | 'AccessedSummaryPage'
  | 'ConfirmedSummaryPage'
  | 'FinishedCreateDatasource'
  | 'AccessObeyaHomePage'
  | 'SelectObeyaRoom'
  | 'CreateOKR'
  | 'RemoveOKR'
  | 'EditOKR'
  | 'AddKeyResult'
  | 'DeleteKeyResult'
  | 'AccessObeyaRooms'
  | 'DeleteObeyaRoom'
  | 'AccessNewObeyaRoomForm'
  | 'AccessEditObeyaRoomForm'
  | 'CreateObeyaRoom'
  | 'EditObeyaRoom'
  | 'CreateDependency'
  | 'UpdateDependency'
  | 'UpdateRisk'
  | 'CreateRisk'
  | 'ConfiguredCardTypes'
  | 'AccessedCardTypes'
  | 'ConfiguredWorkflows'
  | 'AccessedWorkflows'
  | TelemetryNavigationActions
  | TelemetryValueStreamManagementNavigationActions
  | AccordionActions
  | PredictiveAnalysisTelemetryAction
  | DrillDownTelemetryAction
  | ExtendedCardDetailsTelemetryAction;

export enum TelemetryNavigationActions {
  accessValueStreamManagement = 'AccessValueStreamManagement',
  accessAnalyticsDashboard = 'AccessAnalyticsDashboard',
  accessGovernanceObeya = 'AccessGovernanceObeya',
  accessLeanPortfolio = 'AccessLeanPortfolio',
  accessNorthStar = 'AccessNorthStar',
  accessStrategy = 'AccessStrategy'
}
export enum TelemetryValueStreamManagementNavigationActions {
  accessDeliveryGovernance = 'AccessValueDeliveryGovernance',
  accessDeliveryManagement = 'AccessDeliveryManagement',
  accessContinuousImprovements = 'AccessContinuousImprovements'
}
export enum AccordionActions {
  openAccordion = 'OpenAccordion',
  closeAccordion = 'closeAccordion',
}
export enum PredictiveAnalysisTelemetryAction {
  accessWhen = 'AccessWhenAnalysis',
  accessHowMany = 'AccessHowManyAnalysis',
  accessSettings = 'AccessForecastingSettings',
  updateSettings = 'UpdateForecastingSettings',
};
export enum DrillDownTelemetryAction {
  accessFitnessCriteriaDrillDown = 'AccessFitnessCriteriaDrillDown',
}

export enum ExtendedCardDetailsTelemetryAction {
  accessExtendedCardDetails = 'AccessExtendedCardDetails',
}

export type Feature = {
  page?: string;
  widget?: string;
  item?: string;
};
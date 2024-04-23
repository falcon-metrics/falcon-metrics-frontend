import { useEffect, useMemo } from 'react';
import { Box } from '@material-ui/core';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import {
  ChartSizes
} from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import {
  ErrorMessageInfo,
} from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage';
import { DEFAULT_EMPTY_DATA_TEXT } from 'views/ValueStreamManagement/utils/constants';
import { ProfileOfWorkData } from '../../interfaces/profileOfWork';
import { areWorkItemGroupsEmpty } from '../../utils/validation/isProfileOfWorkDataEmpty';
import AssignedToPanel from './views/AssignedToPanel';
import StaticDonutChart from './components/StaticDonutChart';
import DonutChartSection from './components/DonutChartSection';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import useNormalizationColors from 'hooks/fetch/useNormalizationColors';
import { DistributionHistoryDonutTabView } from './components/DistributionHistoryDonutTabView';
import { fixedNormalizationCategoriesDisplayNameRecord } from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';
import React from 'react';

export interface ProfileOfWorkProps {
  data: ProfileOfWorkData;
  isValidating: boolean;
  currentDataAggregation: string,
  changeLoading?: (_: boolean) => void;
}

const ProfileOfWorkSection = ({
  data,
  isValidating,
  changeLoading,
  currentDataAggregation,
}: ProfileOfWorkProps) => {
  useEffect(() => {
    if (changeLoading) {
      changeLoading(isValidating ?? false);
    }
  }, [isValidating]);

  // Missing Data Messages
  const noWorkItemTypeDataMessages: ErrorMessageInfo[] = [new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidating && areWorkItemGroupsEmpty(data.systemFields.workItemType),
  )];

  const noStartStatusMessages: ErrorMessageInfo[] = [new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidating && areWorkItemGroupsEmpty(data.systemFields.startStatus),
  )];

  const noStageWorkflowDataMessages: ErrorMessageInfo[] = [new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidating && areWorkItemGroupsEmpty(data.systemFields.stageOfWorkflow),
  )];

  const assignedToWidgetInfo = data.assignedToWidgetInfo;
  const workItemTypeWidgetInfo = data.workItemTypeWidgetInfo;
  const stageOfWorkflowWidgetInfo = data.stageOfWorkflowWidgetInfo;
  const workItemsWidgetInfo = data.workItemsWidgetInfo;
  const customFieldsWidgetInfo = data.customFieldWidgetInfo;
  const normalisationWidgetInfo = data.normalisedWidgetInfo;

  const { getColorByDisplayName } = useNormalizationColors();

  const customFieldList = Object.keys(data.customFields).map(key => data.customFields[key]);

  // Generate the display names of the normalisation field list
  const normalisationFieldList = useMemo(() => {
    if (!data || !data.normalisationFields) {
      return [];
    }
    return Object.keys(data.normalisationFields).map(
      normalisedCategoryId => {
        let displayName: string;
        if (fixedNormalizationCategoriesDisplayNameRecord[normalisedCategoryId]) {
          displayName = fixedNormalizationCategoriesDisplayNameRecord[normalisedCategoryId];
        } else {
          displayName = normalisedCategoryId.split('-').join(' ');
        }
        return {
          displayName,
          distribution: data.normalisationFields[normalisedCategoryId].distribution,
          historical: data.normalisationFields[normalisedCategoryId].historical,
        };
      }
    );
  }, [data, data.normalisationFields, isValidating]);

  return (
    <Box className="full-width-chart">
      <DonutChartSection
        title="Work Items"
        id="basic-charts"
        isValidating={isValidating}
        widgetInfo={workItemsWidgetInfo}
      >
        <AssignedToPanel
          data={data.systemFields.assignedTo}
          unassignedColor="#E1523E"
          label="Number of Work Items"
          size={ChartSizes.large}
          isValidating={isValidating}
          widgetInfo={assignedToWidgetInfo}
        />
        <DashboardCard
          title="Work Item Type"
          size={ChartSizes.small}
          key="work-item-type-chart"
          errorMessagesInfo={noWorkItemTypeDataMessages}
          isLoading={isValidating}
          hideDefaultLoadingAnimation={true}
        >
          <StaticDonutChart
            data={data.systemFields.workItemType}
            isValidating={isValidating}
          />
          {!isValidating && workItemTypeWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={workItemTypeWidgetInfo} /> : <></>}
        </DashboardCard>
        <DashboardCard
          title="Stage Of Workflow"
          size={ChartSizes.small}
          key="stage-of-workflow-chart"
          errorMessagesInfo={noStageWorkflowDataMessages}
          isLoading={isValidating}
          hideDefaultLoadingAnimation={true}
        >
          <StaticDonutChart
            data={data.systemFields.stageOfWorkflow}
            isValidating={isValidating}
          />
          {!isValidating && stageOfWorkflowWidgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={stageOfWorkflowWidgetInfo} /> : <></>}
        </DashboardCard>
        <DashboardCard
          title="Start status"
          size={ChartSizes.small}
          key="start-status-chart"
          errorMessagesInfo={noStartStatusMessages}
          isLoading={isValidating}
          hideDefaultLoadingAnimation={true}
        >
          <StaticDonutChart
            data={data.systemFields.startStatus}
            isValidating={isValidating}
          />
        </DashboardCard>
      </DonutChartSection>
      <DonutChartSection
        title="Custom Fields"
        id="custom-fields"
        isValidating={isValidating}
        widgetInfo={customFieldsWidgetInfo}
      >{
          customFieldList.map((field, index) =>
            <DistributionHistoryDonutTabView
              key={index}
              displayName={field.displayName}
              distribution={field.distribution}
              historical={field.historical}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={undefined}
            />
          )
        }</DonutChartSection>
      <DonutChartSection
        title="Custom Views Fields"
        id="normalisation-fields"
        isValidating={isValidating}
        widgetInfo={normalisationWidgetInfo}
      >{
          normalisationFieldList.map((field, index) =>
            <DistributionHistoryDonutTabView
              key={index}
              displayName={field.displayName}
              distribution={field.distribution}
              historical={field.historical}
              currentDataAggregation={currentDataAggregation}
              getColorByDisplayName={getColorByDisplayName}
            />
          )
        }</DonutChartSection>
    </Box>
  );
};

export default React.memo(ProfileOfWorkSection);

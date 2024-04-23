import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart/SkeletonBarChart';
import { TimeInStageOption } from "../../../../hooks/useFlowAnalysisData";
import TimeInStageGraph from './components/TimeInStageGraph';
import IndicatorNoDataPanel from 'views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/components/IndicatorNoDataPanel/IndicatorNoDataPanel';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { daysToIntervalString } from 'utils/daysToIntervalString';

const VerticalLineWrapper = styled(Box)({
  flexGrow: 1,
  flexSrhink: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: '17px 0',
});

const VerticalLine = styled(Box)({
  background: '#E7E8E8',
  width: '1px',
});

const ChoicesContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
  padding: '0 1vw',
});

const perspectiveOptions: IChoiceGroupOption[] = [
  { key: 'proposed', text: 'Upcoming Work' },
  { key: 'inprogress', text: 'Work In Progress' },
  { key: 'completed', text: 'Completed Work' },
];

const stepTypeOptions: IChoiceGroupOption[] = [
  { key: 'all', text: 'All' },
  { key: 'active', text: 'Active' },
  { key: 'queue', text: 'Queue' },
];

const stepCategoryOptions: IChoiceGroupOption[] = [
  { key: 'proposed', text: 'Proposed' },
  { key: 'inprogress', text: 'In Process' },
  { key: 'completed', text: 'Completed' },
];

type Props = {
  timeInStageData?: TimeInStageOption[];
  error?: Error;
  isLoading?: boolean;
  isEmpty?: boolean;
  telemetryAction?: string;
  telemetrySource?: string;
};

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const TimeInStageWrapper = ({
  timeInStageData,
  error,
  isLoading,
  isEmpty,
  telemetryAction,
  telemetrySource
}: Props) => {
  const [perspective, setPerspective] = useState<'proposed' | 'inprogress' | 'completed'>('completed');
  const [stepType, setStepType] = useState<'all' | 'queue' | 'active'>('queue');
  const [stepCategory, setStepCategory] = useState<'proposed' | 'inprogress' | 'completed'>('inprogress');

  const onPerspectiveChange = useCallback(
    (_, option?: IChoiceGroupOption) => option && setPerspective(option.key as any),
    [setPerspective]
  );
  const onStepTypeChange = useCallback(
    (_, option?: IChoiceGroupOption) => option && setStepType(option.key as any),
    [setStepType]
  );
  const onStepCategoryChange = useCallback(
    (_, option?: IChoiceGroupOption) => option && setStepCategory(option.key as any),
    [setStepCategory]
  );

  // Get stage entries as record (to remove duplicates when selecting more than one configuration)
  const stageEntries = useMemo(() => {
    const selectedPerspectiveList = [perspective];
    const selectedStepType = (stepType === 'all') ? ['active', 'queue'] : [stepType];
    const selectedStepCategory = [stepCategory];

    const entries: Record<string, number> = {};
    if (!timeInStageData) {
      return entries;
    }
    for (const option of timeInStageData) {
      if (
        !selectedPerspectiveList.includes(option.perspective) ||
        !selectedStepType.includes(option.stepType) ||
        !selectedStepCategory.includes(option.stepCategory)
      ) {
        continue;
      }
      option.stages.forEach(stage => {
        entries[stage.state] = (entries[stage.state] ?? 0) + stage.timeInStateDays;
      });
    }

    return entries;
  }, [timeInStageData, perspective, stepType, stepType, stepCategory]);

  // Group some timeInStageData into 'others' category to avoid making the visual too full
  const sectionedData = useMemo(() => {
    if (!timeInStageData || Object.keys(stageEntries).length === 0) {
      return [];
    }
    const originalList = Object
    .keys(stageEntries)
    .map(workflowStage => ({
      text: workflowStage,
      value: stageEntries[workflowStage],
      percentile85: ""
    }))
    .sort((a, b) => b.value - a.value);

  for (const option of timeInStageData) {
    option.stages.forEach(stage => {
      const existingStage = originalList.find(item => item.text === stage.state);
      const unit = stage.percentile85 > 1 ? "days" : "day";
      if (existingStage) {
        existingStage.percentile85 = `${stage.percentile85.toFixed(2)} ${unit}`;
      }
    });
  }
  
    const sectionedData: any[] = [];
    const others: any[] = [];
    const total = originalList.reduce((prev, curr) => prev + curr.value, 0);
    let othersTotal = 0;


    // Separate the original list into 2 parts
    for (const { text, value, percentile85 } of originalList) {
      // Separate the list only if the length of the original list of greater than 4
      if (originalList.length > 4 && value / total < 0.1) {
        othersTotal += value;
        others.push({ text, value, percentile85 });
      } else {
        sectionedData.push({ text, value, percentile85 });
      }
    }

    if (othersTotal > 0) {
      const description = others
        .map(({ value, text }) => {
          const percentage = (value / total) * 100;
          // Round to 2 decimal places. 
          const roundedPercentage = Math.round(percentage * 100) / 100;
          return {
            text,
            value,
            percentage: roundedPercentage
          };
        })
        .map(({ value, text, percentage }) => `${daysToIntervalString(value)} ${text} (${percentage}%)`)
        .join('\n');
      sectionedData.push({
        text: 'Others',
        value: othersTotal,
        description
      });
    }

    return sectionedData;
  }, [stageEntries]);


  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Time in Stage tab`, { page: "Flow Analysis - Time in Stage" });
  }, [sendTelemetry]);

  let content: JSX.Element;

  if (error) {
    if (isDevelopmentEnv) {
      content = (<Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>Error: {error.message}</div>
      </Box>);
    } else {
      content = (<Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>There was an error while fetching timeInStageData for this widget</div>
      </Box>);
    }
  } else if (isLoading) {
    content = <SkeletonBarChart />;
  } else if (isEmpty || !sectionedData || sectionedData.length === 0) {
    content = <IndicatorNoDataPanel />;
  } else {
    content = <TimeInStageGraph data={sectionedData}></TimeInStageGraph>;
  }

  return (
    <Box>
      <ChoicesContainer>
        <ChoiceGroup
          label="Perspective"
          defaultSelectedKey={perspective}
          options={perspectiveOptions}
          onChange={onPerspectiveChange}
        ></ChoiceGroup>
        <VerticalLineWrapper><VerticalLine /></VerticalLineWrapper>
        <ChoiceGroup
          label="Step Type"
          defaultSelectedKey={stepType}
          options={stepTypeOptions}
          onChange={onStepTypeChange}
        ></ChoiceGroup>
        <VerticalLineWrapper><VerticalLine /></VerticalLineWrapper>
        <ChoiceGroup
          label="Step Category"
          defaultSelectedKey={stepCategory}
          options={stepCategoryOptions}
          onChange={onStepCategoryChange}
        ></ChoiceGroup>
      </ChoicesContainer>
      <Box>{content}</Box>
    </Box>
  );
};

export default TimeInStageWrapper;
import Box from '@material-ui/core/Box';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import 'components/Charts/components/DashboardCard/DashboardCardSizes.css';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import { WorkItemTypesClient } from 'core/api/ApiClient/WorkItemTypesClient';
import { useCustomSWR } from 'core/api/fetch';
import { useCallback, useState } from 'react';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import NoDataPanel from 'views/ValueStreamManagement/components/NoDataPanel';
import { useCumulativeFlowDiagramData } from '../../hooks/useCumulativeFlowDiagramData';
import { CFDSummaryTab } from './components/CFDSummaryTab';
import { FlowItemTypeSelector } from './components/FlowItemTypeSelector';
import { CumulativeFlowDiagramContent } from './CumulativeFlowDiagramContent';


export const useWorkItemTypes = () => {
  const workItemTypesClient = new WorkItemTypesClient();
  const fetcher = () => workItemTypesClient.get();
  let workItemTypes = [{ key: '', text: 'All' }];
  const { data, isValidating, error } = useCustomSWR(WorkItemTypesClient.resource, fetcher);

  if (data !== undefined && Array.isArray(data)) {
    ;
    workItemTypes = [
      ...workItemTypes,
      ...data.map((type) => ({ key: type.id, text: type.name }))
    ];
  }
  return { workItemTypes, isLoading: isValidating, error };
};


const CumulativeFlowDiagramAccordionContent = () => {

  const { workItemTypes: workItemTypeList, isLoading: isLoadingWorkItemTypes } = useWorkItemTypes();
  const [flowItemType, setFlowItemType] = useState<string | undefined>(undefined);
  const [includeCompleted, setIncludeCompleted] = useState<boolean>(true);

  const cfdFilters = {};
  if (flowItemType) {
    cfdFilters['cfdFlowItemType'] = flowItemType;
  }
  if (includeCompleted) {
    cfdFilters['cfdIncludeCompleted'] = includeCompleted;
  }
  const { data, error, isLoading: isLoadingCFDData, isEmpty } = useCumulativeFlowDiagramData(cfdFilters);
  const isLoading = isLoadingWorkItemTypes || isLoadingCFDData;

  const onSelectWorkflow = useCallback(
    (workflowKey: string) => {
      if (workflowKey === null || workflowKey === undefined || workflowKey === '') {
        setFlowItemType('');
      } else if (
        workItemTypeList.find(
          (workItemType) => workItemType.key === workflowKey
        )
      ) {
        setFlowItemType(workflowKey);
      } else {
        console.warn('User selected missing workflow: ', workflowKey);
      }
    },
    [setFlowItemType, workItemTypeList, workItemTypeList.length]
  );

  const onCompletedCheckboxChange = useCallback(
    (event) => {
      setIncludeCompleted(event.target.checked);
    },
    [setIncludeCompleted]
  );
  const widgetInfo = data?.widgetInfo;

  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid">
        <DashboardCard
          title="Cumulative Flow Diagram"
          contentId="flow-cumulative-flow"
          size={ChartSizes.fixed4}
        >
          <Box marginBottom="10px" display="flex" justifyContent="space-around">
            <Box
              padding="13px 12px"
              marginLeft="100px"
              width="610px"
              height="321px"
              boxShadow={flowItemType ? '0px 2px 11px 0px #dcdcdc' : ''}
            >
              {flowItemType !== null ? <CFDSummaryTab
                isLoading={isLoading}
                data={error || !data ? {} : data.summaryData}
              /> : null}
            </Box>
            <Box
              display="flex"
              marginRight="100px"
              flexDirection="column"
              padding="13px 12px"
              width="511px"
              height="321px"
              boxShadow="0px 2px 11px 0px #dcdcdc"
            >
              <FlowItemTypeSelector
                startingFlowItemType={flowItemType}
                selectFlowItemType={onSelectWorkflow}
                workflowOptions={workItemTypeList}
                onCompletedCheckboxChange={onCompletedCheckboxChange}
                includeCompleted={includeCompleted}
              />
            </Box>
          </Box>
          {
            isEmpty && !isLoading ? <Box height={500} display="flex" alignItems="center"><NoDataPanel /></Box> : (
              <CumulativeFlowDiagramContent
                data={data}
                error={error}
                isLoading={isLoading}
              />
            )
          }

          {!isLoading && widgetInfo?.length !== 0 ?
            <ExtendedTooltip maxWidth="md" content={widgetInfo} /> : <></>}

        </DashboardCard>
      </Box>
    </Box>
  );
};

export default CumulativeFlowDiagramAccordionContent;

import { ObjectConstraint } from 'components/UI/BaseDataGrid';
import { ChartConfigFlags } from 'components/Charts/components/DefaultDashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard from 'views/Dashboard/components/Charts/components/DefaultDashboardCard';
import {
  WorkItemInfo,
  getWorkItemListTitle,
  WorkItemList,
  Props as WorkItemListProps,
} from '../WorkItemList';

type Props<T extends ObjectConstraint> = {
  workItemList?: WorkItemInfo<T>[];
  additionalColumns: any;
} & Pick<WorkItemListProps<T>, 'additionalColumns' | 'excludedColumns'> &
  ChartConfigFlags;

function WorkItemListCard<T extends ObjectConstraint>({
  workItemList = [],
  additionalColumns = [],
  excludedColumns = [],
  ...chartConfigFlags
}: Props<T>) {
  return (
    <DefaultDashboardCard<WorkItemListProps<T>, WorkItemListProps<T>['data']>
      {...chartConfigFlags}
      title={getWorkItemListTitle(workItemList, 'Work Items')}
      contentId={'dashboard-item-list'}
      Component={WorkItemList}
      data={workItemList}
      additionalProps={{
        additionalColumns,
        excludedColumns,
      }}
      size={ChartSizes.full}
    />
  );
}

export default WorkItemListCard;

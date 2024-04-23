import Box from '@material-ui/core/Box';

import { WorkflowColors } from '../../../../../../utils/constants';
import { KanbanDisplayGroup } from '../../../../hooks/usePaginatedKanbanBoard';

import WorkflowListHeader from '../WorkflowListHeader';

import { useStyles } from './WorkflowCategoryHeaders.styles';

export interface Props {
  stateCategory: string;
  stateGroups: KanbanDisplayGroup[];
  statusColor: WorkflowColors;
  textColor: string;
}

const WorkflowCategoryHeaders = ({
  stateCategory,
  stateGroups,
  statusColor,
  textColor,
}: Props) => {
  const classes = useStyles();

  return (
    <>
    {stateGroups.map(({ groupName, numDisplayedItems, totalItems}, index) => {
      return (
        <Box
          className={classes.header}
          key={`${stateCategory}-header-container-${index}`}
        >
          <WorkflowListHeader
            titleColumn={groupName}
            statusColor={statusColor}
            textColor={textColor}
            total={`${numDisplayedItems}/${totalItems}`}
            key={`${stateCategory}-header-${index}`}
          />
        </Box>
      )
    })
    }
    </>
  )
}

export default WorkflowCategoryHeaders;

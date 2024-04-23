import Box from '@material-ui/core/Box';

import { KanbanBoardItem } from '../../../../interfaces/kanbanBoard';
import WorkflowList from '../WorkflowList';
import { useStyles } from './WorkflowCategoryColumns.styles';

export interface Props {
  stateCategory: string;
  stateGroups: Array<KanbanBoardItem[]>;
}

const WorkflowCategoryColumns = ({
  stateCategory,
  stateGroups,
}: Props) => {
  const classes = useStyles();

  return(
    <>
    {stateGroups.map((group, index) => {
        return (
          <Box
            key={`proposed-group-box-${index}`}
            className={classes.cardColumn}
          >
            <WorkflowList
              stateCategory={stateCategory}
              data={group}
              key={`proposed-group-list-${index}`}
            />
          </Box>
        )
      })
    }
    </>
  );
}

export default WorkflowCategoryColumns;

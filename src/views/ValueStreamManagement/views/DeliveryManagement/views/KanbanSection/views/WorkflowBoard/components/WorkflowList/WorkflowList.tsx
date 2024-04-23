import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

import memo from 'utils/typescript/memo';
import WorkFlowCard from '../WorkflowCard';
import { useStyles } from './WorkflowList.styles';

export type Data = {
  name?: string;
  title?: string;
  id?: string;
};

export interface Props {
  stateCategory: string,
  data?: Array<Data> | any;
  id?: string;
}

const WorkflowList = memo(
  ({
    stateCategory,
    data = [],
  }: Props) => {
    const classes = useStyles();
    return (
      <List className={classes.root}>
        <>
          {data.map((item, index) => {
            return (
              <Box
                className={classes.cardContainer}
                key={index}
              >
                <ListItem key={index} className={classes.listItem}>
                  <WorkFlowCard
                    arrivalDateTime={item?.arrivalDateTime}
                    commitmentDateTime={item?.commitmentDateTime}
                    departureDateTime={item?.departureDateTime}
                    workItemId={item.workItemId}
                    stateCategory={stateCategory}
                    title={item.title}
                    state={item.state}
                    workItemType={item.workItemType}
                    flagged={item.flagged}
                  />
                </ListItem>
              </Box>
            );
          })}
        </>
      </List>
    );
  },
);

export default WorkflowList;

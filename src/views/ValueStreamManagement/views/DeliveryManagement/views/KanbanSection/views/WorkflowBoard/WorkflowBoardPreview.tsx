import { memo } from "react";
import { AppBar, Box } from "@material-ui/core";

import { WorkflowColors } from "../../../../utils/constants";

import { KanbanBoardItem } from "../../interfaces/kanbanBoard";
import {
  KanbanDisplayGroup,
} from "../../hooks/usePaginatedKanbanBoard";

import WorkflowCategoryColumns from "./components/WorkflowCategoryColumns";
import WorkflowCategoryHeaders from "./components/WorkflowCategoryHeaders";
import { useStyles } from "./WorkflowBoard.styles";

const previewData: any = {
  paginatedProposed: [
    {
      groupName: "Upcoming Work",
      displayedItems: [
        {
          workItemId: "FLO-5678",
          title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          workItemType: "Ready to Start",
          state: "Bug",
          changedDate: "2024-03-13T03:28:28.664Z",
          arrivalDateTime: "2024-03-13T14:28:28.709+11:00",
          isBlocked: false,
          isStale: false,
          isDelayed: false,
          isExpedited: false,
          isUnassigned: true,
          flagged: false,
        },
      ],
      numDisplayedItems: 1,
      totalItems: 1,
    },
  ],
  paginatedInProgress: [
    {
      groupName: "Work in Process",
      displayedItems: [
        {
          workItemId: "FLO-3214",
          title: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
          workItemType: "Feature",
          state: "Waiting",
          changedDate: "2024-03-18T04:37:41.265Z",
          arrivalDateTime: "2024-03-15T15:53:00.851+11:00",
          commitmentDateTime: "2024-03-18T15:37:41.297+11:00",
          isBlocked: false,
          isStale: false,
          isDelayed: false,
          isExpedited: false,
          isUnassigned: false,
          flagged: false,
        },
      ],
      numDisplayedItems: 1,
      totalItems: 1,
    },
  ],
  paginatedCompleted: [
    {
      groupName: "Completed Work",
      displayedItems: [
        {
          workItemId: "FLO-1234",
          title: "Excepteur sint occaecat cupidatat non proident",
          workItemType: "Bug",
          state: "Done",
          changedDate: "2024-03-20T08:31:27.833Z",
          arrivalDateTime: "2024-03-20T00:18:22.209+11:00",
          commitmentDateTime: "2024-03-20T00:18:28.135+11:00",
          departureDateTime: "2024-03-20T19:31:27.914+11:00",
          isBlocked: false,
          isStale: false,
          isDelayed: false,
          isAboveSle: false,
          isExpedited: false,
          isUnassigned: false,
          flagged: false,
        },
      ],
      numDisplayedItems: 1,
      totalItems: 1,
    },
  ],
};


const WorkflowBoardPreview = memo(() => {
  const classes = useStyles();
  const {
    paginatedProposed,
    paginatedInProgress,
    paginatedCompleted,
  } = previewData;

  const retrieveDisplayedItems = ({ displayedItems }: KanbanDisplayGroup) =>
    displayedItems;

  const [itemsProposedStates, itemsInProgressStates, itemsCompletedStates]: [
    Array<KanbanBoardItem[]>,
    Array<KanbanBoardItem[]>,
    Array<KanbanBoardItem[]>
  ] = [
    paginatedProposed.map(retrieveDisplayedItems),
    paginatedInProgress.map(retrieveDisplayedItems),
    paginatedCompleted.map(retrieveDisplayedItems),
  ];

  return (
    <Box className={classes.container}>
      <>
        <AppBar
          position="sticky"
          classes={{
            root: classes.navigationSection,
            colorPrimary: classes.navigationSectionColor,
          }}
        >
          <Box className={classes.headersContainer}>
            <WorkflowCategoryHeaders
              stateCategory="proposed"
              stateGroups={paginatedProposed}
              statusColor={WorkflowColors.proposed}
              textColor="#404040"
            />
            <WorkflowCategoryHeaders
              stateCategory="inProgress"
              stateGroups={paginatedInProgress}
              statusColor={WorkflowColors.inProgress}
              textColor="#FFFFFF"
            />
            <WorkflowCategoryHeaders
              stateCategory="completed"
              stateGroups={paginatedCompleted}
              statusColor={WorkflowColors.completed}
              textColor="#FFFFFF"
            />
          </Box>
        </AppBar>
        <Box className={classes.boardContainer}>
          <Box className={classes.columnsContainer}>
            <WorkflowCategoryColumns
              stateCategory="proposed"
              stateGroups={itemsProposedStates}
            />
            <WorkflowCategoryColumns
              stateCategory="inProgress"
              stateGroups={itemsInProgressStates}
            />
            <WorkflowCategoryColumns
              stateCategory="completed"
              stateGroups={itemsCompletedStates}
            />
          </Box>
        </Box>
      </>
    </Box>
  );
});

export default WorkflowBoardPreview;

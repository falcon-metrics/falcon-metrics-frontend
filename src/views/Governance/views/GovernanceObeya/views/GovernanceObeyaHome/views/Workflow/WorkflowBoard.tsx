import { memo, useCallback, useMemo, useState } from "react";

import SpinnerFullSize from "components/SpinnerFullSize";
import { flatten, groupBy, intersectionBy, uniq, uniqBy } from "lodash";
import { sortByDate } from "utils/dateTime";
import { WorkflowColors } from "views/Governance/utils/constants";
import { useBoardPagination } from "views/Governance/views/GovernanceObeya/hooks/useBoardPagination";
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";
import IterationDropdown from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/components/IterationDropdown";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import WorkflowListHeader from "./components/WorkflowListHeader/WorkflowListHeader";
import { useStyles } from "./styles";
import WorkflowList from "./WorkflowList";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { ObeyaWorkflowItem } from "./interfaces/ObeyaWorkflowItem";

type Props = {
  obeyaRoomId?: string;
  isLoadingObeyaData?: boolean;
  scopeBoards?: any;
  objectives?: any;
};

const allWorkItemTypes = 'All';

const levels = ['Portfolio', 'Team', 'Individual Contributor'];

const allOption = {
  key: 'All',
  text: 'All',
};

enum OKRFiltersType {
  objective = 'objective',
  kr = 'keyResult',
}

const WORK_ITEM_ID = 'workItemId';

const filterByWorItemTypeOrLevel = (workItems: ObeyaWorkflowItem[], workItemTypeOrLevel: string) => {
  return workItems.filter((w: ObeyaWorkflowItem) => {
    if (levels.includes(workItemTypeOrLevel)) {
      return w?.flomatikaWorkItemTypeLevel === workItemTypeOrLevel;
    }
    return w?.workItemType === workItemTypeOrLevel;
  });
};

const WorkflowBoard = memo(({ isLoadingObeyaData, scopeBoards, objectives }: Props) => {
  const [selectedBoard, setCurrentBoard] = useState<string>('0');
  const [selectedWorkItemType, setCurrentWorkItemType] = useState<string>();
  const [selectedObjectiveFilter, setCurrentObjectiveFilter] = useState<string>();
  const [filterTypeObjectiveOrKr, setFilterTypeObjectiveOrKr] = useState<string>();
  const [searchString, setSearchString] = useState<string>('');
  const [currentString, setCurrentString] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const classes = useStyles();

  // const currentBoard = data?.scopeBoards?.[selectedBoard] || [];
  const currentBoard = useMemo(() => scopeBoards?.[selectedBoard] || [], [
    scopeBoards,
    selectedBoard,
  ]);

  const proposedOfCurrentBoard = uniqBy(currentBoard?.proposed, WORK_ITEM_ID);
  const inProgressdOfCurrentBoard = uniqBy(
    currentBoard?.inProgress,
    WORK_ITEM_ID
  );
  const completedOfCurrentBoard = uniqBy(currentBoard?.completed, WORK_ITEM_ID);

  const searchStringExists =
    searchString !== undefined && searchString !== null && searchString !== "";

  const searchFilteredProposedOfCurrentBoard = searchStringExists
    ? proposedOfCurrentBoard.filter((item) => {
      return (
        item["title"]?.toLowerCase().includes(searchString.toLowerCase()) ||
        item["workItemId"]?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
    : proposedOfCurrentBoard;
  const searchFilteredInProgressdOfCurrentBoard = searchStringExists
    ? inProgressdOfCurrentBoard.filter((item) => {
      return (
        item["title"]?.toLowerCase().includes(searchString.toLowerCase()) ||
        item["workItemId"]?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
    : inProgressdOfCurrentBoard;
  const searchFilteredCompletedOfCurrentBoard = searchStringExists
    ? completedOfCurrentBoard.filter((item) => {
      return (
        item["title"]?.toLowerCase().includes(searchString.toLowerCase()) ||
        item["workItemId"]?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
    : completedOfCurrentBoard;

  const currentObjective: OKRObjective | null =
    objectives?.find(
      (objective) => objective?.objectiveId === selectedObjectiveFilter
    ) || null;

  const selectedObjective: OKRObjective | null =
    selectedObjectiveFilter &&
      filterTypeObjectiveOrKr === OKRFiltersType.objective
      ? currentObjective
      : null;

  const selectedkeyResult =
    selectedObjectiveFilter && filterTypeObjectiveOrKr === OKRFiltersType.kr
      ? objectives.reduce((acc: any, objective: any) => {
        const kr = objective.keyResults.find(
          (kr) => kr.keyResultId === selectedObjectiveFilter
        );
        if (kr) {
          acc.push(kr);
        }
        return acc;
      }, [])
      : [];

  const allKeyResultsOfObjective =
    selectedObjective?.keyResults &&
      filterTypeObjectiveOrKr === OKRFiltersType.objective
      ? selectedObjective?.keyResults
      : selectedkeyResult;

  const {
    completedWorkItemsOfKrs,
    proposedWorkItemsOfKrs,
    inProgressWorkItemsOfKrs,
  } = (allKeyResultsOfObjective || []).reduce(
    (acc: any, objective: any) => {
      if (objective?.completedItems) {
        acc.completedWorkItemsOfKrs.push(objective.completedItems);
      }
      if (objective?.proposedItems) {
        acc.proposedWorkItemsOfKrs.push(objective.proposedItems);
      }
      if (objective?.inProgressItems) {
        acc.inProgressWorkItemsOfKrs.push(objective.inProgressItems);
      }
      return acc;
    },
    {
      completedWorkItemsOfKrs: [],
      proposedWorkItemsOfKrs: [],
      inProgressWorkItemsOfKrs: [],
    }
  );

  const objectiveKeys = (objectives || []).map((okr) => okr?.objectiveId);
  const filterByObjectiveOkr = (optionKey) => {
    setCurrentObjectiveFilter(optionKey);
    if (optionKey === "All") {
      setFilterTypeObjectiveOrKr("");
    } else {
      if (objectiveKeys.includes(optionKey)) {
        setFilterTypeObjectiveOrKr(OKRFiltersType.objective);
      } else {
        setFilterTypeObjectiveOrKr(OKRFiltersType.kr);
      }
    }
  };

  const hasSelectedObjectiveOrKr =
    selectedObjective || selectedkeyResult.length;
  const rawProposed: any = hasSelectedObjectiveOrKr
    ? intersectionBy(
      flatten(proposedWorkItemsOfKrs),
      searchFilteredProposedOfCurrentBoard,
      WORK_ITEM_ID
    )
    : searchFilteredProposedOfCurrentBoard;

  const rawInProgress: any = hasSelectedObjectiveOrKr
    ? intersectionBy(
      flatten(inProgressWorkItemsOfKrs),
      searchFilteredInProgressdOfCurrentBoard,
      WORK_ITEM_ID
    )
    : searchFilteredInProgressdOfCurrentBoard;

  const rawCompleted: any = hasSelectedObjectiveOrKr
    ? intersectionBy(
      flatten(completedWorkItemsOfKrs),
      searchFilteredCompletedOfCurrentBoard,
      WORK_ITEM_ID
    )
    : searchFilteredCompletedOfCurrentBoard;

  // const objectives = objectives || [];

  const headerObjectiveKeys = objectives?.reduce(
    (acc: string[], objective: OKRObjective) => {
      if (objective?.objectiveId) {
        acc.push(objective?.objectiveId);
      }
      return acc;
    },
    []
  );

  const objectivesOptions: any = sortByDate(objectives, "createdAt", "asc").reduce(
    (acc: any, objective: any) => {
      if (objective?.objectiveId && objective?.objectiveDescription) {
        acc.push({
          key: objective?.objectiveId,
          text: objective?.objectiveDescription,
        });
      }
      if (objective?.keyResults) {
        objective?.keyResults.forEach((kr) => {
          if (kr && kr?.keyResultDescription) {
            acc.push({
              key: kr?.keyResultId,
              text: kr?.keyResultDescription,
            });
          }
        });
      }
      return acc;
    },
    []
  );

  const objectivesAndKRsOptions: any = [allOption, ...objectivesOptions];

  const typesOfLevel: { [key: string]: ObeyaWorkflowItem[] } | {} =
    groupBy(
      [...rawProposed, ...rawInProgress, ...rawCompleted],
      "flomatikaWorkItemTypeLevel"
    ) || {};

  const headerKeys = Object.keys(typesOfLevel).filter((level) =>
    levels.includes(level)
  );

  const boardItemsWithLevel: { [level: string]: string[] } = {
    Portfolio: [],
    Team: [],
    "Individual Contributor": [],
  };

  headerKeys.forEach((levelType: string) => {
    const workItemsByLevel = typesOfLevel[levelType];
    boardItemsWithLevel[levelType] = [
      ...boardItemsWithLevel[levelType],
      levelType,
      ...Object.keys(groupBy(workItemsByLevel, "workItemType")),
    ];
  });

  const workItemTypeOptions = uniq([
    ...boardItemsWithLevel.Portfolio,
    ...boardItemsWithLevel.Team,
    ...boardItemsWithLevel["Individual Contributor"],
  ]).map((workItemType: string) => ({
    key: workItemType,
    text: workItemType,
  }));

  const workItemTypesAndLevelsOptions = [allOption, ...workItemTypeOptions];

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Additional optimizations: Use useMemo to memoize computed values
  const completedByWorkItemType = useMemo(() =>
    selectedWorkItemType && selectedWorkItemType !== allWorkItemTypes
      ? filterByWorItemTypeOrLevel(rawCompleted, selectedWorkItemType)
      : rawCompleted,
    [rawCompleted, selectedWorkItemType, allWorkItemTypes]
  );
  const inProgressByWorkItemType = useMemo(() =>
    selectedWorkItemType && selectedWorkItemType !== allWorkItemTypes
      ? filterByWorItemTypeOrLevel(rawInProgress, selectedWorkItemType)
      : rawInProgress,
    [rawInProgress, selectedWorkItemType, allWorkItemTypes]
  );
  const proposedByWorkItemType = useMemo(() =>
    selectedWorkItemType && selectedWorkItemType !== allWorkItemTypes
      ? filterByWorItemTypeOrLevel(rawProposed, selectedWorkItemType)
      : rawProposed,
    [rawProposed, selectedWorkItemType, allWorkItemTypes]
  );

  const {
    getProposedCountLabel,
    paginatedProposedItems,
    paginatedCompletedItems,
    getCompletedCountLabel,
    getInProgressCountLabel,
    paginatedInProgressItems,
    loadMoreItems,
    resetPagination,
  } = useBoardPagination(
    selectedWorkItemType,
    filterTypeObjectiveOrKr === undefined || filterTypeObjectiveOrKr === ""
      ? ""
      : filterTypeObjectiveOrKr + selectedObjectiveFilter,
    completedByWorkItemType,
    inProgressByWorkItemType,
    proposedByWorkItemType,
    setIsLoadingMore
  );

  const emptyOption = {
    key: currentBoard?.contextName ?? "",
    text: currentBoard?.contextName ?? "",
  };

  const placeholderOptions = (scopeBoards || [emptyOption]).map(
    (board: any, key) => ({
      key: String(key),
      text: board?.contextName ?? board?.contextId ?? "",
    })
  );

  const onSelectBoard = useCallback((boardKey) => {
    boardKey && setCurrentBoard(boardKey);
    resetPagination();
  }, [setCurrentBoard, resetPagination]);

  const onFilterByWorkItemType = useCallback((workItemType) => {
    if (workItemType) {
      setCurrentWorkItemType(workItemType);
    }
  }, [setCurrentWorkItemType]);


  const completdCountValue = getCompletedCountLabel();
  const inProgressCountValues = getInProgressCountLabel();
  const proposedCountLabel = getProposedCountLabel();

  const [paginatedCompletedCount, totalOfCompleted] = completdCountValue.split(
    "/"
  );
  const [
    paginatedInProgressCount,
    totalOfInProgress,
  ] = inProgressCountValues.split("/");
  const [paginatedProposedCount, totalOfproposed] = proposedCountLabel.split(
    "/"
  );

  const shouldHideLoadMore =
    paginatedCompletedCount === totalOfCompleted &&
    paginatedInProgressCount === totalOfInProgress &&
    paginatedProposedCount === totalOfproposed;

  const proposedSortedItems = useMemo(
    () => sortByDate(paginatedProposedItems, "arrivalDate", "desc"),
    [paginatedProposedItems]
  );
  const inProgressSortedItems = useMemo(
    () => sortByDate(paginatedInProgressItems, "commitmentDate", "desc"),
    [paginatedInProgressItems]
  );
  const sortedCompletedItems = useMemo(
    () => sortByDate(paginatedCompletedItems, "departureDate", "desc"),
    [paginatedCompletedItems]
  );

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard
        title={""}
        size={ChartSizes.full}
        fullScreen={true}
        useModalOpenProps={true}
        isModalOpenProps={isModalOpen}
        setIsModalOpenProps={setIsModalOpen}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={3}
        >
          <div className={classes.dropdownContainer}>
            <IterationDropdown
              label="Select Board"
              placeholder=""
              selectedKey={selectedBoard || ""}
              options={placeholderOptions}
              onContextChange={onSelectBoard}
            />
            <IterationDropdown
              label="Flow item types"
              placeholder="All"
              selectedKey={selectedWorkItemType}
              options={workItemTypesAndLevelsOptions}
              onContextChange={onFilterByWorkItemType}
              headerKeys={headerKeys}
            />
            <IterationDropdown
              customDropdownStyles={{ width: 460 }}
              label="Objectives and Key Results"
              placeholder="All"
              selectedKey={selectedObjectiveFilter}
              options={objectivesAndKRsOptions}
              onContextChange={filterByObjectiveOkr}
              headerKeys={headerObjectiveKeys}
            />
          </div>
          <div className={classes.wrapperSearch}>
            <TextField
              fullWidth
              placeholder="Search by title or ID"
              inputProps={{ maxLength: 250 }}
              name="search"
              onChange={(event) => {
                setCurrentString(event?.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearchString(currentString);
                }
              }}
              InputProps={{
                endAdornment:
                  currentString !== "" ? (
                    <>
                      <ClearIcon
                        className={classes.cursorPointer}
                        onClick={() => {
                          setCurrentString("");
                          setSearchString("");
                        }}
                      />
                      <SearchIcon
                        className={classes.cursorPointer}
                        onClick={() => {
                          setSearchString(currentString);
                        }}
                      />
                    </>
                  ) : (
                    <SearchIcon
                      className={classes.cursorPointer}
                      onClick={() => {
                        setSearchString(currentString);
                      }}
                    />
                  ),
                style: { fontFamily: "Open Sans" },
              }}
              value={currentString}
            />
          </div>
        </Box>
        <Box display="flex" flexGrow={1} flexDirection="column">
          <Box flexGrow={1}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Grid item xs={4}>
                <WorkflowListHeader
                  titleColumn="To do"
                  statusColor={WorkflowColors.proposed}
                  textColor="#000"
                  total={proposedCountLabel}
                />
              </Grid>
              <Grid item xs={4}>
                <WorkflowListHeader
                  titleColumn="In Progress"
                  statusColor={WorkflowColors.inprogress}
                  total={inProgressCountValues}
                />
              </Grid>
              <Grid item xs={4}>
                <WorkflowListHeader
                  titleColumn="Done"
                  statusColor={WorkflowColors.completed}
                  total={completdCountValue}
                />
              </Grid>
            </Grid>
          </Box>
          {isLoadingObeyaData ? (
            <SpinnerFullSize />
          ) : (
            <Box
              flexGrow={1}
              flexDirection="column"
              className={
                classes.boardContainer +
                (isModalOpen ? " " + classes.boardContainerFullScreen : " ")
              }
            >
              <Box display="flex">
                <WorkflowList data={proposedSortedItems} />
                <WorkflowList
                  data={inProgressSortedItems}
                  enableLoadButton={!shouldHideLoadMore}
                  isLoadingMore={isLoadingMore || isLoadingObeyaData}
                  onLoadMore={loadMoreItems}
                />
                <WorkflowList data={sortedCompletedItems} />
              </Box>
            </Box>
          )}
        </Box>
      </DashboardCard>
    </Box>
  );
});

export default WorkflowBoard;

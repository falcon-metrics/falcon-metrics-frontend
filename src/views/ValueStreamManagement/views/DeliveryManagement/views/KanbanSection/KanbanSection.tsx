import { useState } from "react";
import { debounce } from "lodash";
import { Box } from "@material-ui/core";

import { ApiQueryParameters } from "core/api/ApiClient/ApiClient";
import ExpandableDashboardCard from "components/Charts/components/ExpandableDashboardCard";
import { AppliedFilters } from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/useFilterPanelContext";

import WorkflowBoard from "./views/WorkflowBoard";
import KanbanSelectionPanel from "./views/KanbanSelectionPanel";
import { useKanbanBoardData } from "./hooks/useKanbanBoardData";
import usePaginatedKanbanBoard, {
  KanbanStateSet,
} from "./hooks/usePaginatedKanbanBoard";
import { useStyles } from "./KanbanSection.styles";
import { processKanbanData } from "./utils/processKanbanData";
import ExtendedTooltip from "views/ValueStreamManagement/components/ExtendedTooltip";

export interface KanbanSectionProps {
  appliedFilters: AppliedFilters;
  apiQueryParameters: ApiQueryParameters;
  disableExpand?: boolean;
  isDashboardEdit?: boolean;
}

export type ItemSelectionOptions = {
  includeBlocked: boolean;
  includeStale: boolean;
  includeAboveSle: boolean;
  includeExpedited: boolean;
  includeUnassigned: boolean;
  includeDelayed: boolean;
  includeDiscardedAfter: boolean;
  includeDiscardedBefore: boolean;
};

const KanbanSection = ({
  appliedFilters,
  apiQueryParameters,
  disableExpand,
  isDashboardEdit,
}: KanbanSectionProps) => {
  const classes = useStyles();

  const [selectionOperator, setSelectionOperator] = useState("and");
  const [
    selectionOptions,
    setSelectionOptions,
  ] = useState<ItemSelectionOptions>({
    includeBlocked: false,
    includeStale: false,
    includeAboveSle: false,
    includeExpedited: false,
    includeUnassigned: false,
    includeDelayed: false,
    includeDiscardedAfter: false,
    includeDiscardedBefore: false,
  });

  // Debounced update to Kanban selection filters
  const setSelectionOptionsDebounced = debounce(setSelectionOptions, 2000, {
    leading: false,
    trailing: true,
  });

  const { kanbanBoardData, widgetInfo, isValidating } = useKanbanBoardData(
    appliedFilters,
    apiQueryParameters,
    selectionOperator,
    selectionOptions
  );
  const statesByCategory: KanbanStateSet = processKanbanData(kanbanBoardData);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const {
    paginatedStates,
    maxDisplayedItems,
    loadMore,
  } = usePaginatedKanbanBoard(
    statesByCategory,
    isValidating ?? false,
    setIsLoadingMore
  );

  return (
    <ExpandableDashboardCard title="Smart Board" disableExpand={disableExpand}>
      <Box className={classes.container}>
        <KanbanSelectionPanel
          selectionOperator={selectionOperator}
          selectionOptions={selectionOptions}
          setSelectionOperator={setSelectionOperator}
          setSelectionOptions={setSelectionOptionsDebounced}
          isValidating={isValidating ?? false}
        />
        <WorkflowBoard
          paginatedStates={paginatedStates}
          isValidating={isValidating ?? false}
          loadMore={loadMore}
          isLoadingMore={isLoadingMore}
          maxDisplayedItems={maxDisplayedItems}
        />

        {!isDashboardEdit &&
          !isValidating &&
          (widgetInfo?.length !== 0 ? (
            <ExtendedTooltip maxWidth="xl" content={widgetInfo} />
          ) : (
            <></>
          ))}
      </Box>
    </ExpandableDashboardCard>
  );
};

export default KanbanSection;
